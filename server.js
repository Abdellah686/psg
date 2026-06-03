import express from 'express'
import cors from 'cors'
import http from 'http'
import { WebSocketServer } from 'ws'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, 'psg.db')
const db = new Database(dbPath)

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT NOT NULL,
  image TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  description TEXT NOT NULL
);
`)

const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, name, email, password) VALUES (?, ?, ?, ?)')
insertUser.run(1, 'Admin User', 'admin@gmail.com', '1234')

const tableInfo = db.prepare("PRAGMA table_info(cars)").all()
if (!tableInfo.some((column) => column.name === 'price')) {
  db.prepare('ALTER TABLE cars ADD COLUMN price INTEGER NOT NULL DEFAULT 0').run()
}

const initialCars = [
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    color: 'Midnight Silver',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    price: 359,
  },
  {
    make: 'BMW',
    model: 'i4',
    year: 2023,
    color: 'Alpine White',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
    price: 329,
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    color: 'Blue Crush',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
    price: 199,
  },
  {
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    color: 'Race Red',
    image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=900&q=80',
    price: 279,
  },
]

const initialActivities = [
  { title: 'Tesla Model 3 added', status: 'Ready', progress: 92, timestamp: 'Today · 09:00 AM', description: 'New car added to fleet' },
  { title: 'BMW i4 added', status: 'Inspection', progress: 78, timestamp: 'Today · 08:40 AM', description: 'New car added to fleet' },
  { title: 'Toyota Corolla added', status: 'Available', progress: 100, timestamp: 'Today · 08:10 AM', description: 'New car added to fleet' },
  { title: 'Ford Mustang added', status: 'Maintenance', progress: 60, timestamp: 'Today · 07:50 AM', description: 'New car added to fleet' },
]

const carsCount = db.prepare('SELECT COUNT(*) AS count FROM cars').get().count
if (carsCount === 0) {
  const insertCar = db.prepare('INSERT INTO cars (make, model, year, color, image, price) VALUES (?, ?, ?, ?, ?, ?)')
  const insertActivity = db.prepare('INSERT INTO activities (title, status, progress, timestamp, description) VALUES (?, ?, ?, ?, ?)')

  for (const car of initialCars) {
    insertCar.run(car.make, car.model, car.year, car.color, car.image, car.price)
  }

  for (const activity of initialActivities) {
    insertActivity.run(activity.title, activity.status, activity.progress, activity.timestamp, activity.description)
  }
}

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '20mb' }))

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const getCars = () => db.prepare('SELECT id, make, model, year, color, image, price FROM cars ORDER BY id').all()
const getActivities = () => db.prepare('SELECT id, title, status, progress, timestamp, description FROM activities ORDER BY id').all()

const broadcast = (payload) => {
  const message = JSON.stringify(payload)
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message)
    }
  })
}

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'sync', cars: getCars(), activities: getActivities() }))
})

app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT id, name, email, password FROM users').all()
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' })
  }

  try {
    const insert = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
    const result = insert.run(name, email.toLowerCase(), password)
    const user = db.prepare('SELECT id, name, email, password FROM users WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json(user)
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ message: 'A user with that email already exists.' })
    }
    res.status(500).json({ message: 'Unable to create user.' })
  }
})

app.get('/api/cars', (req, res) => {
  const cars = db.prepare('SELECT id, make, model, year, color, image, price FROM cars ORDER BY id').all()
  res.json(cars)
})

app.post('/api/cars', (req, res) => {
  const { make, model, year, color, image, price } = req.body
  if (!make || !model || !year || !color || !image || price == null) {
    return res.status(400).json({ message: 'Make, model, year, color, image, and price are required.' })
  }

  const existingCar = db.prepare(
    'SELECT id, make, model, year, color, image, price FROM cars WHERE make = ? AND model = ? AND year = ? AND color = ? AND image = ? AND price = ?'
  ).get(make, model, Number(year), color, image, Number(price))

  if (existingCar) {
    return res.status(200).json({ car: existingCar, activity: null })
  }

  try {
    const insertCar = db.prepare('INSERT INTO cars (make, model, year, color, image, price) VALUES (?, ?, ?, ?, ?, ?)')
    const carResult = insertCar.run(make, model, Number(year), color, image, Number(price))
    const newCar = db.prepare('SELECT id, make, model, year, color, image, price FROM cars WHERE id = ?').get(carResult.lastInsertRowid)

    const timestamp = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    const activityTitle = `${make} ${model} added`
    const insertActivity = db.prepare('INSERT INTO activities (title, status, progress, timestamp, description) VALUES (?, ?, ?, ?, ?)')
    const activityResult = insertActivity.run(activityTitle, 'Added', 100, timestamp, 'New car added to fleet')
    const newActivity = db.prepare('SELECT id, title, status, progress, timestamp, description FROM activities WHERE id = ?').get(activityResult.lastInsertRowid)

    broadcast({ type: 'sync', cars: getCars(), activities: getActivities() })
    res.status(201).json({ car: newCar, activity: newActivity })
  } catch (error) {
    res.status(500).json({ message: 'Unable to create car.' })
  }
})

app.delete('/api/cars/:id', (req, res) => {
  const carId = Number(req.params.id)
  const car = db.prepare('SELECT id, make, model, year, color, image, price FROM cars WHERE id = ?').get(carId)

  if (!car) {
    return res.status(404).json({ message: 'Car not found.' })
  }

  try {
    db.prepare('DELETE FROM cars WHERE id = ?').run(carId)

    const timestamp = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    const activityTitle = `${car.make} ${car.model} removed`
    const insertActivity = db.prepare('INSERT INTO activities (title, status, progress, timestamp, description) VALUES (?, ?, ?, ?, ?)')
    const activityResult = insertActivity.run(activityTitle, 'Removed', 50, timestamp, 'Car removed from fleet')
    const newActivity = db.prepare('SELECT id, title, status, progress, timestamp, description FROM activities WHERE id = ?').get(activityResult.lastInsertRowid)

    broadcast({ type: 'sync', cars: getCars(), activities: getActivities() })
    res.json({ message: 'Car deleted successfully.', activity: newActivity })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete car.' })
  }
})

app.get('/api/activities', (req, res) => {
  const activities = db.prepare('SELECT id, title, status, progress, timestamp, description FROM activities ORDER BY id').all()
  res.json(activities)
})

const port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
