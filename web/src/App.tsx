import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Milestone from './components/Milestone'
import NotFound from './components/NotFound'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import DashboardPage from './pages/DashboardPage'
import ModulePage from './pages/ModulePage'
import PlanPage from './pages/PlanPage'
import PracticePage from './pages/PracticePage'
import ReviewPage from './pages/ReviewPage'

// The current page's link is underlined in the plan colour.
const navStyle = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 pb-0.5 hover:border-ink ${isActive ? 'border-plan text-plan' : 'border-transparent'}`

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-ink bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="title flex items-center gap-2 text-xl">
            <Milestone value={1} size={20} />
            Road to PMI
          </Link>
          <nav className="flex gap-5 text-sm font-medium">
            <NavLink to="/plan" className={navStyle}>
              Study plan
            </NavLink>
            <NavLink to="/dashboard" className={navStyle}>
              Dashboard
            </NavLink>
            <NavLink to="/review" className={navStyle}>
              Review cards
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/:courseId" element={<CoursePage />} />
          <Route path="/:courseId/:moduleId" element={<ModulePage />} />
          <Route path="/:courseId/:moduleId/:tab" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
