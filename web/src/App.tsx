import { Link, Route, Routes } from 'react-router-dom'
import DisplayControls from './components/DisplayControls'
import Milestone from './components/Milestone'
import NotFound from './components/NotFound'
import SearchBox from './components/SearchBox'
import { MilestoneWatcher, StreakChip, Toaster } from './components/Toast'
import TopMenu from './components/TopMenu'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import DashboardPage from './pages/DashboardPage'
import ExamPage from './pages/ExamPage'
import ExamsPage from './pages/ExamsPage'
import ModulePage from './pages/ModulePage'
import PlanPage from './pages/PlanPage'
import PracticePage from './pages/PracticePage'
import QuestionTypesPage from './pages/QuestionTypesPage'
import ReviewPage from './pages/ReviewPage'
import SearchPage from './pages/SearchPage'
import SheetPage from './pages/SheetPage'
import HelpPage from './pages/HelpPage'
import release from 'virtual:release'
import { link } from './lib/ui'

/** The width every page shares, so the top bar and the content line up. */
export const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative z-30 border-b border-ink bg-surface print:hidden">
        {/* Name, search and display controls on the first row; the page links on their own row below. */}
        <div className={`${shell} flex flex-wrap items-center gap-x-6 gap-y-2 pt-2.5`}>
          <Link to="/" className="title flex items-center gap-2 py-1 text-xl">
            <Milestone value={1} size={20} />
            Road to PMP
          </Link>
          <div className="order-3 w-full sm:order-none sm:w-auto sm:flex-1">
            <SearchBox />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <StreakChip />
            <DisplayControls />
          </div>
          <div className="order-4 w-full">
            <TopMenu />
          </div>
        </div>
      </header>
      <main className={`${shell} flex-1 py-8 sm:py-10`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:tab" element={<HelpPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:courseId" element={<CoursePage />} />
          <Route path="/:courseId/sheet" element={<SheetPage />} />
          <Route path="/:courseId/exams" element={<ExamsPage />} />
          <Route path="/:courseId/question-types" element={<QuestionTypesPage />} />
          <Route path="/:courseId/exams/:examId" element={<ExamPage />} />
          <Route path="/:courseId/:moduleId" element={<ModulePage />} />
          <Route path="/:courseId/:moduleId/:tab" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* The version on every page, so it is clear which one runs here and on the website.
          On a phone the extra space below keeps it clear of the floating Contents button. */}
      <footer className="border-t border-line print:hidden">
        <div className={`${shell} flex flex-wrap items-center gap-x-6 gap-y-1 pt-3 pb-20 text-sm text-muted lg:pb-3`}>
          <span>
            Road to PMP · Version {release.version} · build {release.commit}
          </span>
          <Link to="/help/whats-new" className={`${link} inline-flex min-h-11 items-center`}>
            What's new
          </Link>
          <Link to="/help" className={`${link} inline-flex min-h-11 items-center`}>
            Guide
          </Link>
        </div>
      </footer>
      <Toaster />
      <MilestoneWatcher />
    </div>
  )
}
