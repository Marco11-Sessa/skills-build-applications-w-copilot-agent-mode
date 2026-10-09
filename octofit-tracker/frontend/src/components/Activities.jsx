import { useEffect, useState } from 'react'
import { apiUrl, formatValue, getCollection } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const endpoint = '/api/activities/'
    const controller = new AbortController()

    async function loadActivities() {
      const response = await fetch(apiUrl(endpoint), { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Activities request failed with ${response.status}`)
      }
      const payload = await response.json()
      setActivities(getCollection(payload, 'activities'))
    }

    loadActivities()
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
        <p className="eyebrow">Activity log</p>
        <h2>Recent movement</h2>
      </div>
      {isLoading && <p className="status-text">Loading activities...</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.user}-${activity.activityDate}`}>
                  <td>{activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{formatValue(activity.activityDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}