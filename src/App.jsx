import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { api, getToken, saveToken, clearToken } from './api'
import Auth from './Auth'
import Layout from './Layout'
import Feed from './Feed'
import { Communities, Articles, Events, Messages, Notifications, Tools, Submit, Moderation, Settings, Help, Search } from './pages'

// Landing ships GSAP and its plugins; only logged-out visitors download it
const Landing = lazy(() => import('./Landing'))

export default function App() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(() => !!getToken())

  // Restore the session from a saved token
  useEffect(() => {
    if (!getToken()) return
    api('/auth/me')
      .then(setUser)
      .catch((err) => err.status === 401 && clearToken())
      .finally(() => setChecking(false))
  }, [])

  const onAuth = ({ token, user }, remember = true) => {
    saveToken(token, remember)
    setUser(user)
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  if (checking) return null

  const guest = (mode) => (user ? <Navigate to="/" replace /> : <Auth key={mode} mode={mode} onAuth={onAuth} />)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={guest('login')} />
        <Route path="/signup" element={guest('signup')} />
        {user ? (
          <Route element={<Layout user={user} onLogout={logout} />}>
            <Route path="/" element={<Feed user={user} onLogout={logout} />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/events" element={<Events />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/moderation" element={<Moderation />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/help" element={<Help />} />
            <Route path="/search" element={<Search />} />
          </Route>
        ) : (
          <Route path="/" element={<Suspense fallback={null}><Landing /></Suspense>} />
        )}
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
