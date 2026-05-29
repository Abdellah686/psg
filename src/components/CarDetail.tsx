import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Car } from '../App'

type CarDetailProps = {
  cars: Car[]
}

const fallbackFeatures = [
  { icon: 'panorama', label: 'Panoramic Roof' },
  { icon: 'music_note', label: 'Premium Audio' },
  { icon: 'ac_unit', label: '4-Zone Climate' },
  { icon: 'electric_car', label: 'Fast Charging' },
  { icon: 'chair', label: 'Comfort Seats' },
  { icon: 'sensor_window', label: 'Driver Assist' },
]

const reviews = [
  {
    name: 'Sarah J.',
    date: 'April 2024',
    rating: 5,
    text: 'The most seamless rental experience I have ever had. The car arrived spotless and fully charged — incredible host and premium ride.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVy4m_ZWTb1V0X1spnTkxz87HSCpLiSqumvDD6UCp7jLrTFRvnPYmmojtx6w1HLj8OJSybFeqgksIWNQZY6Zyp8TRcgocuFAn-SGbpQN0bBhFjhrPPFX1b38_xXhTATZmi_lElKflFQITbIju5kUiEXLCmqJM3XTqLCeTL4JeNkzam6bNZG9NC8Knr7WH356ByMq1bG11-RLTVLKZhKa8OFXjeOd6z2KQkBMzac9suGwfLg4jVsB3WdUoXxbACCbE39aUmJB38Rro',
  },
  {
    name: 'David L.',
    date: 'March 2024',
    rating: 5,
    text: 'Unbelievable performance and flawless delivery. The vehicle felt spectacular on every road.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1sJcjkJGl1-l04uR6zoY_7PEb1nusUFM5NVpaHMhpJEnfTRmqXlyK8z5vL1wOHyyH9A-8-GjJjZ7jLh8SjAO7e4KCUDOX3_8y4zaEj-nWanY4IARqrT-tW1h2FloqR13NRy67FHXDhLSyeY2NUC3Lf2vstR55-yG4wL1QC96tMw49pozw0KWlqycPrEXXScVzEQ8dc9rLAfEhot1gduS5TUlM7PYXGA9BoU3DQN7sdEtIXvcNZLjIta5VXRzaX1lLQzafRA4_mkQ',
  },
]

function CarDetail({ cars }: CarDetailProps) {
  const [reserved, setReserved] = useState(false)
  const { id } = useParams<{ id: string }>()
  const carId = Number(id)
  const car = useMemo(() => cars.find((item) => item.id === carId), [cars, carId])

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

  const formattedPrice = '$350'
  const duration = 3
  const insurance = 120
  const delivery = 45
  const total = 350 * duration + insurance + delivery

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Premium car details</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{car.make} {car.model} {car.year}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Experience the ultimate blend of electric performance and luxury comfort. This premium vehicle is ready for any trip, from city cruising to weekend escapes.
              </p>
            </div>
            <Link
              to="/cars"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Back to cars
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <section>
            <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 h-[520px] rounded-[32px] overflow-hidden">
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[32px] bg-slate-100">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/900x600?text=Car+image+not+available'
                  }}
                />
              </div>
              <div className="hidden md:block relative overflow-hidden rounded-[32px] bg-slate-100">
                <img
                  src={car.image}
                  alt={`${car.make} interior`}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/400x300?text=Interior+image+not+available'
                  }}
                />
              </div>
              <div className="hidden md:block relative overflow-hidden rounded-[32px] bg-slate-100">
                <img
                  src={car.image}
                  alt={`${car.make} rear view`}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/400x300?text=Rear+image+not+available'
                  }}
                />
              </div>
              <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-slate-100">
                <img
                  src={car.image}
                  alt={`${car.make} wheel detail`}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/900x250?text=Detail+image+not+available'
                  }}
                />
                <button className="absolute bottom-6 right-6 rounded-2xl bg-white/95 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-white">
                  Show all photos
                </button>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <span className="material-symbols-outlined mb-3 text-3xl text-indigo-600">speed</span>
                  <p className="text-sm text-slate-500">0-60 MPH</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">2.8s</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <span className="material-symbols-outlined mb-3 text-3xl text-indigo-600">electric_bolt</span>
                  <p className="text-sm text-slate-500">Range</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">300 mi</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <span className="material-symbols-outlined mb-3 text-3xl text-indigo-600">settings_input_component</span>
                  <p className="text-sm text-slate-500">Drive</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">AWD</p>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="font-semibold text-2xl text-slate-900 mb-4">Description</h2>
                  <p className="text-slate-600 leading-8">
                    Experience the soul of a high-performance premium car, electrified for modern driving. This {car.make} {car.model} delivers breathtaking acceleration, refined technology, and sculpted design for an unforgettable ride.
                  </p>
                  <p className="mt-4 text-slate-600 leading-8">
                    Perfect for weekend escapes or executive travel, this vehicle features comfort seating, advanced driver assistance, premium audio, and fast charging support.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl text-slate-900 mb-6">Key Features</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fallbackFeatures.map((feature) => (
                      <div key={feature.label} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <span className="material-symbols-outlined text-indigo-600">{feature.icon}</span>
                        <span className="text-slate-700">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Hosted by</p>
                      <h3 className="mt-3 text-xl font-semibold text-slate-900">Marcus Sterling</h3>
                      <p className="text-slate-600">Power User · Response time &lt; 15 mins</p>
                    </div>
                    <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
                      Message host
                    </button>
                  </div>
                </section>
              </div>
            </div>

            <section className="mt-10 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-slate-900">Guest Reviews</h2>
                <button className="text-indigo-600 font-semibold hover:underline">View all 124 reviews</button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {reviews.map((review) => (
                  <div key={review.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <img className="h-10 w-10 rounded-full object-cover" src={review.image} alt={review.name} loading="lazy" />
                      <div>
                        <p className="font-semibold text-slate-900">{review.name}</p>
                        <p className="text-sm text-slate-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3 text-indigo-600">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <span key={index} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 leading-7">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <div className="sticky top-28 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
              <div className="flex items-baseline justify-between gap-3 mb-8">
                <div>
                  <p className="text-sm text-slate-500">Daily rate</p>
                  <p className="mt-2 text-4xl font-semibold text-slate-900">{formattedPrice}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                  <span className="material-symbols-outlined">star</span>
                  4.98
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Dates</span>
                  <span>Jun 14 — Jun 17</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Pickup</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Return</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-slate-700">
                  <span>$350 x {duration} days</span>
                  <span>${350 * duration}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Insurance</span>
                  <span>${insurance}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Delivery fee</span>
                  <span>${delivery}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReserved(true)}
                className="w-full rounded-3xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-indigo-500 active:scale-[0.98]"
              >
                {reserved ? 'Reserved' : 'Reserve now'}
              </button>
              <p className="text-center text-sm text-slate-500">You won't be charged yet</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default CarDetail
