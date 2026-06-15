import { useState, useEffect } from 'react'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('admin-auth')
    if (token) setAuthenticated(true)
    setChecked(true)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth')
    setAuthenticated(false)
  }

  // Avoid flash of login screen while checking sessionStorage
  if (!checked) return null

  return authenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={() => setAuthenticated(true)} />
  )
}
