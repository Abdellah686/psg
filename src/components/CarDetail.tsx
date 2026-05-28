import React from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Car } from '../App'

type CarDetailProps = {
  cars: Car[]
}

function CarDetail({ cars }: CarDetailProps) {
  const { id } = useParams<{ id: string }>()
  const carId = Number(id)
  const car = cars.find((item) => item.id === carId)

  if (!car) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Car not found</h1>
          <p className="mt-4 text-slate-600">The requested car does not exist or the ID is invalid.</p>
          <Link to="/cars" className="mt-6 inline-flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Back to cars
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Car detail</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{car.make} {car.model}</h1>
            <p className="mt-2 text-sm text-slate-600">ID: {car.id}</p>
          </div>
          <Link to="/cars" className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200">
            Back to cars
          </Link>
        </div>

        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="h-72 w-full rounded-3xl object-cover"
          onError={(event) => {
            event.currentTarget.src = 'https://via.placeholder.com/900x480?text=Car+image+not+available'
          }}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Make</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{car.make}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Model</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{car.model}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Year</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{car.year}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Color</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{car.color}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
