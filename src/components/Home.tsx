import React from 'react'

function Home() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-br from-indigo-700 via-slate-900 to-slate-950 opacity-95" />
      <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/15 text-indigo-200 shadow-inner shadow-indigo-900/30">
              <span className="text-lg font-semibold">P</span>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Powerfleet</p>
              <p className="text-xs text-slate-400">Smart fleet management</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            <a href="/cars" className="text-sm font-medium text-slate-200 transition hover:text-white">Cars</a>
            <a href="/dashbord" className="text-sm font-medium text-slate-200 transition hover:text-white">Dashboard</a>
            <a href="/login" className="text-sm font-medium text-slate-200 transition hover:text-white">Log in</a>
            <a href="/signup" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Sign up</a>
          </nav>
        </header>

        <main className="mt-24 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="max-w-2xl">
            <p className="inline-flex rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">
              Fleet made effortless
            </p>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Manage your vehicles with speed, clarity, and style.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Track your cars, review activity, and add new vehicles with an elegant dashboard built for modern fleets.
              Enjoy the smoothest route from signup to daily fleet operations.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/signup" className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400">
                Start free trial
              </a>
              <a href="/login" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View demo
              </a>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">4.8/5</p>
                <p className="mt-2 text-sm text-slate-400">Average rating</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">32</p>
                <p className="mt-2 text-sm text-slate-400">Vehicles tracked</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">Instant</p>
                <p className="mt-2 text-sm text-slate-400">Dashboard access</p>
              </div>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] bg-white/5 p-8 shadow-2xl shadow-black/10 ring-1 ring-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Live metrics</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Fleet pulse</h2>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-100">Active</span>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-950/70 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Cars online</p>
                <p className="mt-3 text-3xl font-semibold text-white">32</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Recent activity</p>
                <p className="mt-3 text-3xl font-semibold text-white">8 updates</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">New car requests</p>
                <p className="mt-3 text-3xl font-semibold text-white">2</p>
              </div>
            </div>
          </section>
        </main>

        <section className="mt-20 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/10 ring-1 ring-white/10 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Trusted by modern fleet teams</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Efficiency</p>
              <p className="mt-4 text-base leading-7 text-slate-300">Save time on vehicle onboarding and tracking.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Visibility</p>
              <p className="mt-4 text-base leading-7 text-slate-300">See all cars and activity from a clean dashboard.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Control</p>
              <p className="mt-4 text-base leading-7 text-slate-300">Manage fleet users, cars, and workflows in one place.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
