import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type SignupProps = {
  onSignUp: (userData: { name: string; email: string; password: string }) => void
}

function Signup({ onSignUp }: SignupProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setError('')
    onSignUp({ name, email, password })
    navigate('/cars')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Sign up</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create your fleet account</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Register to manage your vehicles and access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              placeholder="Choose a password"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Create account
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
