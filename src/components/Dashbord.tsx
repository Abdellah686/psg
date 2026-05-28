import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Activity } from '../App'

type StatsCard = {
  label: string
  value: string
  description: string
}

type DashbordProps = {
  onAddCar: (carData: {
    make: string
    model: string
    year: number
    color: string
    image: string
  }) => void
  onLogout: () => void
  carCount: number
  activities: Activity[]
}

function Dashbord({ onAddCar, onLogout, carCount, activities }: DashbordProps) {
  const recentCars = activities.slice(-4).reverse()
  const navigate = useNavigate()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('2025')
  const [color, setColor] = useState('')
  const [image, setImage] = useState('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80')

  const stats: StatsCard[] = [
    { label: 'Total cars', value: `${carCount}`, description: 'All vehicles in your fleet' },
    { label: 'Active cars', value: `${carCount}`, description: 'Vehicles currently available' },
    { label: 'Average year', value: '2023', description: 'Mean manufacturing year' },
    { label: 'Colors', value: '4', description: 'Unique colors in the garage' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Fleet overview</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Track your cars, review status, and keep your fleet running smoothly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Add new car
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
              >
                Log out
              </button>
            </div>
          </div>
        </header>

        {showCreateForm && (
          <section id="create-car" className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Create a new car</h2>
                <p className="mt-1 text-sm text-slate-500">Fill in the details and add the car to your list.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              onAddCar({
                make: make || 'New Make',
                model: model || 'New Model',
                year: Number(year) || 2025,
                color: color || 'Unknown',
                image,
              })
              navigate('/cars')
            }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Make</span>
              <input
                value={make}
                onChange={(event) => setMake(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. Audi"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Model</span>
              <input
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. e-tron"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Year</span>
              <input
                value={year}
                onChange={(event) => setYear(event.target.value)}
                type="number"
                min="2000"
                max="2030"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Color</span>
              <input
                value={color}
                onChange={(event) => setColor(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. Quantum Gray"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Upload image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = () => {
                      if (typeof reader.result === 'string') {
                        setImage(reader.result)
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Image URL</span>
              <input
                value={image}
                onChange={(event) => {
                  setImage(event.target.value)
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                placeholder="https://..."
              />
            </label>
            <div className="sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Preview</span>
              <div className="mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                <img
                  src={image}
                  alt="Preview"
                  className="h-52 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/900x480?text=Preview+not+available'
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="sm:col-span-2 inline-flex justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Create car and view list
            </button>
          </form>
        </section>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent vehicle activity</h2>
                <p className="mt-1 text-sm text-slate-500">Latest updates for your cars.</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">Updated now</span>
            </div>

            <div className="mt-6 space-y-4">
              {recentCars.map((activity) => (
                <div key={activity.id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{activity.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{activity.status}</p>
                      <p className="text-xs text-slate-500">{activity.timestamp}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-indigo-600" style={{ width: `${activity.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Fleet health</h2>
                <p className="mt-1 text-sm text-slate-500">Keep an eye on maintenance and availability.</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">Maintenance due</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">1 car</p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">Currently available</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">3 cars</p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">Upcoming service</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">2 events</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashbord