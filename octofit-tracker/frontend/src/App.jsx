import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const navItems = [
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/teams', label: 'Teams' },
    { path: '/users', label: 'Users' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <img src={logo} alt="OctoFit Tracker" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Team fitness operations</h1>
          </div>
        </div>
        <nav className="nav nav-pills app-nav" aria-label="OctoFit sections">
          {navItems.map((item) => (
            <NavLink key={item.path} className="nav-link" to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
