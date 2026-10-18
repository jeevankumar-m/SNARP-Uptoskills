// "Remember me" keeps the token in localStorage; otherwise it lives for the browser session only
export const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token')

export function saveToken(token, remember) {
  ;(remember ? localStorage : sessionStorage).setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}

export async function api(path, { method = 'GET', body } = {}) {
  const token = getToken()
  const isForm = body instanceof FormData
  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      ...(!isForm && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: isForm ? body : body && JSON.stringify(body),
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const err = new Error(data?.error || 'Could not reach the server. Is the backend running?')
    err.status = res.status
    throw err
  }
  return data
}
