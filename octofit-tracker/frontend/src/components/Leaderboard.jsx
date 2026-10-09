import { useEffect, useState } from 'react'
import { apiUrl, getCollection } from '../api.js'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const endpoint = '/api/leaderboard/'
    const controller = new AbortController()

    async function loadLeaderboard() {
      const response = await fetch(apiUrl(endpoint), { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Leaderboard request failed with ${response.status}`)
      }
      const payload = await response.json()
      setLeaderboard(getCollection(payload, 'leaderboard'))
    }

    loadLeaderboard()
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
        <p className="eyebrow">Leaderboard</p>
        <h2>Competitive standings</h2>
      </div>
      {isLoading && <p className="status-text">Loading leaderboard...</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="standings-list">
          {leaderboard.map((entry) => (
            <article className="standing-row" key={entry._id ?? entry.rank}>
              <span className="rank-badge">#{entry.rank}</span>
              <div>
                <h3>{entry.user}</h3>
                <p>{entry.team}</p>
              </div>
              <strong>{entry.points} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}