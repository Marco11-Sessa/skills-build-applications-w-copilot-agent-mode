import { useEffect, useState } from 'react'
import { apiUrl, formatValue, getCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const endpoint = '/api/workouts/'
    const controller = new AbortController()

    async function loadWorkouts() {
      const response = await fetch(apiUrl(endpoint), { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Workouts request failed with ${response.status}`)
      }
      const payload = await response.json()
      setWorkouts(getCollection(payload, 'workouts'))
    }

    loadWorkouts()
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
        <p className="eyebrow">Workouts</p>
        <h2>Suggested sessions</h2>
      </div>
      {isLoading && <p className="status-text">Loading workouts...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {!isLoading && !error && (
        <div className="resource-grid">
          {workouts.map((workout) => (
            <article className="resource-card" key={workout._id ?? workout.name}>
              <h3>{workout.name}</h3>
              <p>{workout.focus}</p>
              <dl>
                <dt>Difficulty</dt>
                <dd>{workout.difficulty}</dd>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
                <dt>Exercises</dt>
                <dd>{formatValue(workout.exercises)}</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}