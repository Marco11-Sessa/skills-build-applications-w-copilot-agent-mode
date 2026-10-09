import { useEffect, useState } from 'react'
import { apiUrl, getCollection } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const endpoint = '/api/teams/'
    const controller = new AbortController()

    async function loadTeams() {
      const response = await fetch(apiUrl(endpoint), { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Teams request failed with ${response.status}`)
      }
      const payload = await response.json()
      setTeams(getCollection(payload, 'teams'))
    }

    loadTeams()
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
        <p className="eyebrow">Teams</p>
        <h2>Training groups</h2>
      </div>
      {isLoading && <p className="status-text">Loading teams...</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="resource-grid">
          {teams.map((team) => (
            <article className="resource-card" key={team._id ?? team.name}>
              <h3>{team.name}</h3>
              <p>{team.city}</p>
              <dl>
                <dt>Coach</dt>
                <dd>{team.coach}</dd>
                <dt>Members</dt>
                <dd>{team.members}</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}