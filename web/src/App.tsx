import { Link, NavLink, Route, Routes } from 'react-router-dom'
import DisplayControls from './components/DisplayControls'
import Milestone from './components/Milestone'
import NotFound from './components/NotFound'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import DashboardPage from './pages/DashboardPage'
import ExamPage from './pages/ExamPage'
import ExamsPage from './pages/ExamsPage'
import ModulePage from './pages/ModulePage'
import PlanPage from './pages/PlanPage'
import PracticePage from './pages/PracticePage'
import ReviewPage from './pages/ReviewPage'
import SearchPage from './pages/SearchPage'
import SheetPage from './pages/SheetPage'

const pages = [
  { to: '/plan', label: 'Study plan' },
  { to: '/capm/exams', label: 'Mock exams' },
  { to: '/capm/sheet', label: 'Formulas' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/practice', label: 'Practice' },
  { to: '/review', label: 'Review cards' },
  { to: '/search', label: 'Search' },
]

// The current page's link is underlined in the plan colour.
const navStyle = ({ isActive }: { isActive: boolean }) =>
  `press whitespace-nowrap border-b-2 py-2 hover:border-ink ${isActive ? 'border-plan text-plan' : 'border-transparent'}`

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-ink bg-surface print:hidden">
        {/* The page links sit on their own row and scroll sideways on a phone; nothing hides in a menu. */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 pt-2 sm:px-6">
          <Link to="/" className="title flex items-center gap-2 py-2 text-xl">
            <Milestone value={1} size={20} />
            Road to PMI
          </Link>
          <DisplayControls />
          <nav
            className="-mx-4 flex w-[calc(100%+2rem)] gap-6 overflow-x-auto px-4 font-medium sm:mx-0 sm:w-full sm:px-0"
            aria-label="Pages"
          >
            {pages.map((page) => (
              <NavLink key={page.to} to={page.to} className={navStyle}>
                {page.label}
              </NavLink>
            ))}
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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:courseId/sheet" element={<SheetPage />} />
          <Route path="/:courseId/exams" element={<ExamsPage />} />
          <Route path="/:courseId/exams/:examId" element={<ExamPage />} />
          <Route path="/:courseId/:moduleId" element={<ModulePage />} />
          <Route path="/:courseId/:moduleId/:tab" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
