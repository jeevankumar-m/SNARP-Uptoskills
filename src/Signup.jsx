import { useState } from 'react'
import logo from './assets/logo.png'

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'user',
    terms: false,
  })
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
    if (!form.name.trim()) next.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    if (!form.terms) next.terms = 'Please accept the terms to continue'
    setErrors(next)
    // ponytail: UI only — wire to the register API in Week 1 backend work
  }

  const field = (name, label, props) => (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={update}
        aria-invalid={!!errors[name]}
        aria-describedby={`${name}-error`}
        {...props}
      />
      <span id={`${name}-error`} className="error">{errors[name]}</span>
    </>
  )

  return (
    <form className="card" onSubmit={submit} noValidate>
      <img src={logo} alt="UptoSkills" className="logo" />
      <h1>Create your account</h1>
      <p className="subtitle">Join the community of students and researchers</p>

      {field('name', 'Full name', { autoComplete: 'name', placeholder: 'Jane Doe' })}
      {field('email', 'Email', {
        type: 'email',
        autoComplete: 'email',
        placeholder: 'you@university.edu',
      })}

      <label htmlFor="password">Password</label>
      <div className="password">
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="At least 8 characters"
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

      {field('confirm', 'Confirm password', {
        type: showPassword ? 'text' : 'password',
        autoComplete: 'new-password',
        placeholder: 'Re-enter your password',
      })}

      {/* ponytail: only User/Author are self-selectable; Admin/Moderator are assigned by an admin */}
      <fieldset className="roles">
        <legend>I want to</legend>
        <label className={form.role === 'user' ? 'active' : ''}>
          <input type="radio" name="role" value="user" checked={form.role === 'user'} onChange={update} />
          <strong>Read &amp; discuss</strong>
          <span>Follow posts and research</span>
        </label>
        <label className={form.role === 'author' ? 'active' : ''}>
          <input type="radio" name="role" value="author" checked={form.role === 'author'} onChange={update} />
          <strong>Publish research</strong>
          <span>Submit papers for review</span>
        </label>
      </fieldset>

      <label className="remember terms">
        <input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={update}
          aria-describedby="terms-error"
        />
        <span>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a></span>
      </label>
      <span id="terms-error" className="error">{errors.terms}</span>

      <button type="submit" className="primary">Create account</button>

      <p className="signup">
        Already have an account? <a href="#login">Log in</a>
      </p>
    </form>
  )
}

export default Signup
