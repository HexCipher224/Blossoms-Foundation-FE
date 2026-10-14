// Small API client for the Blossoms backend (see the blossoms-backend repo).
// Set VITE_API_URL in a .env file (see .env.example). No secrets belong here:
// anything in a Vite frontend is visible to every visitor.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '')

async function request(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    const err = new Error('network')
    err.code = 'network'
    throw err
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'request_failed')
    err.code = data.error || 'request_failed'
    err.details = data.details
    throw err
  }
  return data
}

export const createDonation = (payload) => request('/api/donations', { method: 'POST', body: payload })
export const getDonation = (reference) => request(`/api/donations/${encodeURIComponent(reference)}`)
export const claimDonation = (reference, txHash) =>
  request(`/api/donations/${encodeURIComponent(reference)}/claim`, { method: 'POST', body: { txHash } })
export const sendContactMessage = (payload) => request('/api/contact', { method: 'POST', body: payload })
export const subscribeNewsletter = (email) => request('/api/newsletter', { method: 'POST', body: { email } })
