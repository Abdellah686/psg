import { Link } from 'react-router-dom'

type Car = {
  id: number
  make: string
  model: string
  year: number
  color: string
  image: string
}

type CarsProps = {
  cars: Car[]
  onLogout: () => void
}

function Cars({ cars, onLogout }: CarsProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My Cars</h1>
            <p className="mt-2 text-sm text-slate-600">A quick overview of the vehicles in your fleet.</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            Log out
          </button>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/cars/${car.id}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="h-full w-full object-cover transition duration-500 ease-in-out group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/900x480?text=Car+image+not+available'
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Fleet vehicle</p>
                  <h2 className="mt-1 text-xl font-semibold">{car.make} {car.model}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-500">{car.year} • {car.color}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    {car.color}
                  </span>
                  <span className="text-sm font-medium text-slate-500">ID #{car.id}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars