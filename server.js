import express from 'express'
import cors from 'cors'
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
  image TEXT NOT NULL
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

const initialCars = [
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    color: 'Midnight Silver',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
  },
  {
    make: 'BMW',
    model: 'i4',
    year: 2023,
    color: 'Alpine White',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    color: 'Blue Crush',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
  },
  {
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    color: 'Race Red',
    image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=900&q=80',
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
  const insertCar = db.prepare('INSERT INTO cars (make, model, year, color, image) VALUES (?, ?, ?, ?, ?)')
  const insertActivity = db.prepare('INSERT INTO activities (title, status, progress, timestamp, description) VALUES (?, ?, ?, ?, ?)')

  for (const car of initialCars) {
    insertCar.run(car.make, car.model, car.year, car.color, car.image)
  }

  for (const activity of initialActivities) {
    insertActivity.run(activity.title, activity.status, activity.progress, activity.timestamp, activity.description)
  }
}

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

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
  const cars = db.prepare('SELECT id, make, model, year, color, image FROM cars ORDER BY id').all()
  res.json(cars)
})

app.post('/api/cars', (req, res) => {
  const { make, model, year, color, image } = req.body
  if (!make || !model || !year || !color || !image) {
    return res.status(400).json({ message: 'Make, model, year, color, and image are required.' })
  }

  try {
    const insertCar = db.prepare('INSERT INTO cars (make, model, year, color, image) VALUES (?, ?, ?, ?, ?)')
    const carResult = insertCar.run(make, model, Number(year), color, image)
    const newCar = db.prepare('SELECT id, make, model, year, color, image FROM cars WHERE id = ?').get(carResult.lastInsertRowid)

    const timestamp = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    const activityTitle = `${make} ${model} added`
    const insertActivity = db.prepare('INSERT INTO activities (title, status, progress, timestamp, description) VALUES (?, ?, ?, ?, ?)')
    const activityResult = insertActivity.run(activityTitle, 'Added', 100, timestamp, 'New car added to fleet')
    const newActivity = db.prepare('SELECT id, title, status, progress, timestamp, description FROM activities WHERE id = ?').get(activityResult.lastInsertRowid)

    res.status(201).json({ car: newCar, activity: newActivity })
  } catch (error) {
    res.status(500).json({ message: 'Unable to create car.' })
  }
})

app.get('/api/activities', (req, res) => {
  const activities = db.prepare('SELECT id, title, status, progress, timestamp, description FROM activities ORDER BY id').all()
  res.json(activities)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
