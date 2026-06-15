import { useState } from 'react'

const INPUT_CLASS =
  'w-full bg-white border border-edge rounded-input px-4 py-3 text-body text-ink ' +
  'placeholder:text-muted focus:outline-none focus:border-forest ' +
  'focus:ring-2 focus:ring-forest/10 transition-colors duration-150'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

    if (password === adminPassword) {
      sessionStorage.setItem('admin-auth', password)
      onLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand wordmark */}
        <div className="text-center mb-10">
          <p className="font-serif text-xl text-forest">Tobi Yusuf</p>
          <p className="text-label text-muted mt-1">Testimonial System</p>
        </div>

        {/* Login card */}
        <div className="bg-white border border-edge rounded-card shadow-card p-8">
          <h1 className="font-serif text-section text-ink mb-6">Admin access</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label htmlFor="admin-password" className="block text-label font-semibold text-ink mb-2">
                Admin password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                autoComplete="current-password"
                placeholder="Enter password"
                required
                className={INPUT_CLASS}
              />
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  Incorrect password. Try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password}
              className="w-full bg-forest text-white font-semibold py-3 rounded-input cursor-pointer hover:bg-forest-dark transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Enter
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
