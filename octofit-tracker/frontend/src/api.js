function getCodespaceNameFromHost() {
  const match = window.location.hostname.match(/^(.+)-\d+\.app\.github\.dev$/)
  return match?.[1]
}

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || getCodespaceNameFromHost()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(path) {
  return `${apiBaseUrl}${path}`
}

export function getCollection(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.data?.[key])) {
    return payload.data[key]
  }

  return []
}

export function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString()
  }

  return value ?? 'Not set'
}