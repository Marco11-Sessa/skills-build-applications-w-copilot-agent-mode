import { useEffect, useState } from 'react'
import { apiUrl, getCollection } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const endpoint = '/api/users/'
    const controller = new AbortController()

    async function loadUsers() {
      const response = await fetch(apiUrl(endpoint), { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Users request failed with ${response.status}`)
      }
      const payload = await response.json()
      setUsers(getCollection(payload, 'users'))
    }

    loadUsers()
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message)
        }
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section className="resource-panel">
      <div className="section-heading">
        <p className="eyebrow">Users</p>
        <h2>Member profiles</h2>
      </div>
      {isLoading && <p className="status-text">Loading users...</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="resource-grid">
          {users.map((user) => (
            <article className="resource-card" key={user._id ?? user.email}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <dl>
                <dt>Goal</dt>
                <dd>{user.fitnessGoal}</dd>
                <dt>Team</dt>
                <dd>{user.team}</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}