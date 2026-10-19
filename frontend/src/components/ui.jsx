import { initials, colorFor } from '../format'

export function Avatar({ name, size = '' }) {
  return <div className={`avatar avatar-${colorFor(name)} ${size && `avatar-${size}`}`}>{initials(name)}</div>
}

export function PageHeader({ title, sub, children }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </div>
  )
}
