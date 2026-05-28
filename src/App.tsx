
import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashbord from './components/Dashbord'
import Cars from './components/Cars'
import CarDetail from './components/CarDetail'

export type Car = {
  id: number
  make: string
  model: string
  year: number
  color: string
  image: string
}

export type Activity = {
  id: number
  title: string
  status: string
  progress: number
  timestamp: string
  description: string
}

type UserRole = 'admin' | 'user' | null

type User = {
  id: number
  name: string
  email: string
  password: string
}

const initialCars: Car[] = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    color: 'Midnight Silver',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    make: 'BMW',
    model: 'i4',
    year: 2023,
    color: 'Alpine White',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    color: 'Blue Crush',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    color: 'Race Red',
    image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=900&q=80',
  },
]

const initialUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@gmail.com', password: '1234' },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => sessionStorage.getItem('psg_logged_in') === 'true')
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => sessionStorage.getItem('psg_current_user') || null)
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    const role = sessionStorage.getItem('psg_user_role')
    return role === 'admin' || role === 'user' ? role : null
  })

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('psg_users')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as User[]
        const hasAdmin = parsed.some((user) => user.email.toLowerCase() === 'admin@gmail.com')
        return hasAdmin ? parsed : [...initialUsers, ...parsed]
      } catch {
        return initialUsers
      }
    }
    return initialUsers
  })

  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem('psg_cars')
    if (saved) {
      try {
        return JSON.parse(saved) as Car[]
      } catch {
        return initialCars
      }
    }
    return initialCars
  })

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('psg_activities')
    if (saved) {
      try {
        return JSON.parse(saved) as Activity[]
      } catch {
        return [
          { id: 1, title: 'Tesla Model 3 added', status: 'Ready', progress: 92, timestamp: 'Today · 09:00 AM', description: 'New car added to fleet' },
          { id: 2, title: 'BMW i4 added', status: 'Inspection', progress: 78, timestamp: 'Today · 08:40 AM', description: 'New car added to fleet' },
          { id: 3, title: 'Toyota Corolla added', status: 'Available', progress: 100, timestamp: 'Today · 08:10 AM', description: 'New car added to fleet' },
          { id: 4, title: 'Ford Mustang added', status: 'Maintenance', progress: 60, timestamp: 'Today · 07:50 AM', description: 'New car added to fleet' },
        ]
      }
    }
    return [
      { id: 1, title: 'Tesla Model 3 added', status: 'Ready', progress: 92, timestamp: 'Today · 09:00 AM', description: 'New car added to fleet' },
      { id: 2, title: 'BMW i4 added', status: 'Inspection', progress: 78, timestamp: 'Today · 08:40 AM', description: 'New car added to fleet' },
      { id: 3, title: 'Toyota Corolla added', status: 'Available', progress: 100, timestamp: 'Today · 08:10 AM', description: 'New car added to fleet' },
      { id: 4, title: 'Ford Mustang added', status: 'Maintenance', progress: 60, timestamp: 'Today · 07:50 AM', description: 'New car added to fleet' },
    ]
  })

  useEffect(() => {
    localStorage.setItem('psg_cars', JSON.stringify(cars))
  }, [cars])

  useEffect(() => {
    localStorage.setItem('psg_activities', JSON.stringify(activities))
  }, [activities])

  useEffect(() => {
    localStorage.setItem('psg_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    sessionStorage.setItem('psg_logged_in', String(isLoggedIn))
    if (currentUserEmail) {
      sessionStorage.setItem('psg_current_user', currentUserEmail)
    } else {
      sessionStorage.removeItem('psg_current_user')
    }
    if (currentUserRole) {
      sessionStorage.setItem('psg_user_role', currentUserRole)
    } else {
      sessionStorage.removeItem('psg_user_role')
    }
  }, [isLoggedIn, currentUserEmail, currentUserRole])

  const handleLogin = (email: string, role: UserRole) => {
    setIsLoggedIn(true)
    setCurrentUserEmail(email)
    setCurrentUserRole(role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUserEmail(null)
    setCurrentUserRole(null)
  }

  const handleSignUp = (userData: Omit<User, 'id'>) => {
    const nextId = users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1
    setUsers((prevUsers) => [...prevUsers, { id: nextId, ...userData }])
    setIsLoggedIn(true)
    setCurrentUserEmail(userData.email)
    setCurrentUserRole('user')
  }

  const addCar = (carData: Omit<Car, 'id'>) => {
    const nextId = cars.length ? Math.max(...cars.map((car) => car.id)) + 1 : 1
    const newCar = { id: nextId, ...carData }
    setCars((prevCars) => [...prevCars, newCar])
    setActivities((prevActivities) => [
      ...prevActivities,
      {
        id: prevActivities.length ? Math.max(...prevActivities.map((activity) => activity.id)) + 1 : 1,
        title: `${newCar.make} ${newCar.model} added`,
        status: 'Added',
        progress: 100,
        timestamp: new Date().toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        description: 'New car added to fleet',
      },
    ])
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              currentUserRole === 'admin' ? (
                <Navigate to="/dashbord" replace />
              ) : (
                <Navigate to="/cars" replace />
              )
            ) : (
              <Login users={users} onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              currentUserRole === 'admin' ? (
                <Navigate to="/dashbord" replace />
              ) : (
                <Navigate to="/cars" replace />
              )
            ) : (
              <Signup onSignUp={handleSignUp} />
            )
          }
        />
        <Route
          path="/cars"
          element={
            isLoggedIn ? <Cars cars={cars} onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/cars/:id"
          element={
            isLoggedIn ? <CarDetail cars={cars} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/dashbord"
          element={
            isLoggedIn && currentUserRole === 'admin' ? (
              <Dashbord onAddCar={addCar} onLogout={handleLogout} carCount={cars.length} activities={activities} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
