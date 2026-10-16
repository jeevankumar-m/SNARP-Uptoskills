import { useState } from 'react'
import logo from './assets/logo.png'

function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setErrors({ ...errors, [name]: undefined })
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    setErrors(next)
    // ponytail: UI only — wire to the auth API (Axios + JWT) in Week 1 backend work
  }

  return (
    <form className="card" onSubmit={submit} noValidate>
      <img src={logo} alt="UptoSkills" className="logo" />
      <h1>Welcome back</h1>
      <p className="subtitle">Log in to continue to your research feed</p>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@university.edu"
        value={form.email}
        onChange={update}
        aria-invalid={!!errors.email}
        aria-describedby="email-error"
      />
      <span id="email-error" className="error">{errors.email}</span>

      <label htmlFor="password">Password</label>
      <div className="password">
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={update}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        <button
          type="button"
          className="toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <span id="password-error" className="error">{errors.password}</span>

      <div className="row">
        <label className="remember">
          <input type="checkbox" name="remember" checked={form.remember} onChange={update} />
          Remember me
        </label>
        <a href="#forgot">Forgot password?</a>
      </div>

      <button type="submit" className="primary">Log in</button>

      <p className="signup">
        New to the platform? <a href="#signup">Create an account</a>
      </p>
    </form>
  )
}

export default Login
