import { Link } from 'react-router-dom'

type HomeProps = {
  carCount: number
  activityCount: number
  liveStatus: 'connecting' | 'connected' | 'disconnected'
}

function Home({ carCount, activityCount, liveStatus }: HomeProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-br from-indigo-600/40 via-purple-600/20 to-slate-950 opacity-100 blur-3xl" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/15 bg-white/8 px-6 py-4 shadow-2xl shadow-black/30 backdrop-blur-md hover:bg-white/12 transition duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/40">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-indigo-300">Powerfleet</p>
              <p className="text-xs text-slate-400">Smart fleet management</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link to="/cars" className="text-sm font-medium text-slate-300 transition hover:text-white hover:text-glow">Cars</Link>
            <Link to="/dashbord" className="text-sm font-medium text-slate-300 transition hover:text-white">Dashboard</Link>
            <Link to="/login" className="text-sm font-medium text-slate-300 transition hover:text-white">Log in</Link>
            <Link to="/signup" className="rounded-full border border-indigo-500/50 bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl hover:shadow-indigo-500/50">Sign up</Link>
          </nav>
        </header>

        <main className="mt-32 grid gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-2 border border-indigo-500/30">
              <svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
              <span className="text-sm font-semibold text-indigo-200">Fleet Management</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Manage your vehicles with <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">speed &amp; style</span>
            </h1>
            <p className="text-lg leading-8 text-slate-300 max-w-xl">
              Track your cars, review activity, and add new vehicles with an elegant dashboard built for modern fleets. Enjoy seamless fleet operations.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-indigo-500/30 transition hover:shadow-indigo-500/50 hover:scale-105 active:scale-95">
                Start free trial
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-full border-2 border-indigo-500/50 bg-indigo-500/10 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500/20 hover:border-indigo-400">
                View demo
              </Link>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 p-6 hover:border-indigo-400/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-indigo-300">4.8</p>
                    <p className="mt-2 text-sm text-slate-400">Average rating</p>
                  </div>
                  <svg className="h-8 w-8 text-indigo-500/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
              </div>
              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 p-6 hover:border-indigo-400/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-indigo-300">{carCount}</p>
                    <p className="mt-2 text-sm text-slate-400">Vehicles tracked</p>
                  </div>
                  <svg className="h-8 w-8 text-indigo-500/40" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11l1.5-4.5h11L19 11H5z" /></svg>
                </div>
              </div>
              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 p-6 hover:border-indigo-400/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-indigo-300">Instant</p>
                    <p className="mt-2 text-sm text-slate-400">Dashboard access</p>
                  </div>
                  <svg className="h-8 w-8 text-indigo-500/40" fill="currentColor" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" /></svg>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 to-purple-500/10 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                <svg className="relative h-24 w-24 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-3 5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-indigo-300">Live metrics</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Fleet pulse</h2>
              </div>
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  liveStatus === 'connected'
                    ? 'bg-emerald-500/30 text-emerald-100 border border-emerald-500/50'
                    : liveStatus === 'connecting'
                    ? 'bg-amber-500/30 text-amber-100 border border-amber-500/50'
                    : 'bg-slate-700/50 text-slate-300 border border-slate-600'
                }`}
              >
                {liveStatus === 'connected' ? '● Active' : liveStatus === 'connecting' ? '◐ Connecting' : '○ Offline'}
              </span>
            </div>

            <div className="grid gap-4 space-y-0">
              <div className="rounded-2xl border border-indigo-400/30 bg-gradient-to-r from-indigo-500/20 to-transparent p-6 hover:border-indigo-300/50 transition">
                <p className="text-sm text-slate-300 font-semibold">Cars online</p>
                <p className="mt-4 text-5xl font-bold text-indigo-200">{carCount}</p>
              </div>
              <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/20 to-transparent p-6 hover:border-purple-300/50 transition">
                <p className="text-sm text-slate-300 font-semibold">Recent activity</p>
                <p className="mt-4 text-5xl font-bold text-purple-200">{activityCount}</p>
                <p className="mt-2 text-xs text-slate-400">updates</p>
              </div>
              <div className="rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 to-transparent p-6 hover:border-pink-300/50 transition">
                <p className="text-sm text-slate-300 font-semibold">New car requests</p>
                <p className="mt-4 text-5xl font-bold text-pink-200">{Math.max(0, carCount - 4)}</p>
                <p className="mt-2 text-xs text-slate-400">pending</p>
              </div>
            </div>
          </section>
        </main>

        <section className="mt-24 rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-500/10 via-slate-900/50 to-slate-900 p-10 shadow-2xl shadow-black/20 backdrop-blur-md">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Why choose Powerfleet</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 hover:border-emerald-400/50 transition group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg group-hover:shadow-emerald-500/50 transition">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-emerald-300">Efficiency</p>
              <p className="mt-3 text-base leading-7 text-slate-300">Save time on vehicle onboarding and tracking with automated workflows.</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent p-8 hover:border-cyan-400/50 transition group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-700 text-white shadow-lg group-hover:shadow-cyan-500/50 transition">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-cyan-300">Visibility</p>
              <p className="mt-3 text-base leading-7 text-slate-300">See all cars and activity from a clean, intuitive dashboard.</p>
            </div>
            <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent p-8 hover:border-orange-400/50 transition group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 text-white shadow-lg group-hover:shadow-orange-500/50 transition">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7.5-10.5a10.5 10.5 0 11-21 0 10.5 10.5 0 0121 0z" /></svg>
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-orange-300">Control</p>
              <p className="mt-3 text-base leading-7 text-slate-300">Manage fleet users, cars, and workflows all in one place.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
