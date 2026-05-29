
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

const initialActivities: Activity[] = [
  { id: 1, title: 'Tesla Model 3 added', status: 'Ready', progress: 92, timestamp: 'Today · 09:00 AM', description: 'New car added to fleet' },
  { id: 2, title: 'BMW i4 added', status: 'Inspection', progress: 78, timestamp: 'Today · 08:40 AM', description: 'New car added to fleet' },
  { id: 3, title: 'Toyota Corolla added', status: 'Available', progress: 100, timestamp: 'Today · 08:10 AM', description: 'New car added to fleet' },
  { id: 4, title: 'Ford Mustang added', status: 'Maintenance', progress: 60, timestamp: 'Today · 07:50 AM', description: 'New car added to fleet' },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => sessionStorage.getItem('psg_logged_in') === 'true')
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => sessionStorage.getItem('psg_current_user') || null)
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    const role = sessionStorage.getItem('psg_user_role')
    return role === 'admin' || role === 'user' ? role : null
  })

  const [isLoading, setIsLoading] = useState(true)
  const [serverError, setServerError] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [activities, setActivities] = useState<Activity[]>(initialActivities)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, carsRes, activitiesRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/cars'),
          fetch('/api/activities'),
        ])

        if (!usersRes.ok || !carsRes.ok || !activitiesRes.ok) {
          throw new Error('Failed to load backend data')
        }

        const [usersData, carsData, activitiesData] = await Promise.all([
          usersRes.json(),
          carsRes.json(),
          activitiesRes.json(),
        ])

        setUsers(usersData)
        setCars(carsData)
        setActivities(activitiesData)
      } catch (error) {
        console.error(error)
        setServerError('Unable to connect to the backend. Using fallback local data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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

  const handleSignUp = async (userData: Omit<User, 'id'>) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorBody = await response.json()
        throw new Error(errorBody.message || 'Unable to create account.')
      }

      const newUser = await response.json()
      setUsers((prevUsers) => [...prevUsers, newUser])
      setIsLoggedIn(true)
      setCurrentUserEmail(newUser.email)
      setCurrentUserRole('user')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to create account.')
    }
  }

  const addCar = async (carData: Omit<Car, 'id'>) => {
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      })

      if (!response.ok) {
        const errorBody = await response.json()
        throw new Error(errorBody.message || 'Unable to save car.')
      }

      const result = await response.json()
      setCars((prevCars) => [...prevCars, result.car])
      setActivities((prevActivities) => [...prevActivities, result.activity])
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to save car.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-lg font-semibold">Loading fleet data…</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {serverError ? (
        <div className="mx-auto my-4 max-w-3xl rounded-3xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-900 shadow-sm">
          <p className="text-sm font-medium">{serverError}</p>
        </div>
      ) : null}
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
