import { useEffect, useState } from 'react'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import './App.css'

function App() {
  // ponytail: hash switch for two pages; move to React Router when more routes land
  const [page, setPage] = useState(location.hash)
  useEffect(() => {
    const onHash = () => setPage(location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <main className="login">
      <section className="brand-panel" aria-hidden="true">
        <div className="brand-copy">
          <span className="eyebrow">Social &amp; Academic Research Platform</span>
          <h2>Share ideas. Publish research. Grow together.</h2>
          <ul>
            <li><span className="dot teal" />Post updates and blogs with your community</li>
            <li><span className="dot orange" />Submit papers for moderated review</li>
            <li><span className="dot blue" />Search, read and cite approved research</li>
          </ul>
        </div>
      </section>

      <section className="form-panel">
        {page === '#signup' ? <Signup /> : <Login />}
      </section>
    </main>
  )
}

export default App
