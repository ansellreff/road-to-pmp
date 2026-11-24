import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import AccountButton from './components/AccountButton'
import DisplayControls from './components/DisplayControls'
import Icon, { type IconName } from './components/Icon'
import Milestone from './components/Milestone'
import NotFound from './components/NotFound'
import SearchBox from './components/SearchBox'
import { MilestoneWatcher, StreakChip, Toaster } from './components/Toast'
import TopMenu from './components/TopMenu'
import Home from './pages/Home'
import release from 'virtual:release'
import { link } from './lib/ui'
import { Waiting } from './components/Page'

// Each page is loaded when it is first opened, so the first visit (often on a phone) downloads only the home
// page. The book reader, with its PDF library, is the largest of them.
const CoursePage = lazy(() => import('./pages/CoursePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ExamPage = lazy(() => import('./pages/ExamPage'))
const ExamsPage = lazy(() => import('./pages/ExamsPage'))
const ModulePage = lazy(() => import('./pages/ModulePage'))
const PlanPage = lazy(() => import('./pages/PlanPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const QuestionTypesPage = lazy(() => import('./pages/QuestionTypesPage'))
const ReviewPage = lazy(() => import('./pages/ReviewPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SheetPage = lazy(() => import('./pages/SheetPage'))
const HelpPage = lazy(() => import('./pages/HelpPage'))
const ReaderPage = lazy(() => import('./pages/ReaderPage'))

/** The width every page shares, so the top bar and the content line up. */
export const shell = 'mx-auto w-full max-w-7xl px-4 sm:px-6'

/** A top bar button shown on phones only, opening one extra row (search, or text size and theme). */
function PhoneToggle({ icon, label, open, onClick }: { icon: IconName; label: string; open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      className={`press flex size-11 items-center justify-center rounded-md border sm:hidden ${
        open ? 'border-plan bg-plan-soft text-plan' : 'border-edge bg-surface'
      }`}
    >
      <Icon name={icon} size={18} />
    </button>
  )
}

export default function App() {
  // In the book reader the top bar stays at the top while you scroll, so the menu is always at hand.
  // Its height is kept in --header-h, so the reader's own controls can sit right below it.
  const { pathname } = useLocation()
  const reading = pathname.startsWith('/read/')
  const header = useRef<HTMLElement>(null)
  // The extra row that a phone shows under the top bar: search, or text size and theme.
  const [phoneRow, setPhoneRow] = useState<'search' | 'display' | null>(null)
  const toggleRow = (row: 'search' | 'display') => setPhoneRow(phoneRow === row ? null : row)
  useEffect(() => setPhoneRow(null), [pathname])
  // Opening search on a phone puts the cursor straight in the box.
  useEffect(() => {
    if (phoneRow === 'search') header.current?.querySelector<HTMLInputElement>('input[type="search"]')?.focus()
  }, [phoneRow])
  useEffect(() => {
    const element = header.current
    if (!element) return
    const observer = new ResizeObserver(() => document.documentElement.style.setProperty('--header-h', `${element.offsetHeight}px`))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header ref={header} className={`${reading ? 'sticky top-0' : 'relative'} z-30 border-b border-ink bg-surface print:hidden`}>
        {/* Name, search and display controls on the first row; the page links on their own row below. */}
        {/* On a phone the first row keeps only the name and three buttons; search and the display settings
            open on their own row when asked for, so the page keeps more of the screen. */}
        <div className={`${shell} flex flex-wrap items-center gap-x-4 gap-y-2 pt-2.5 sm:gap-x-6`}>
          <Link to="/" className="title flex items-center gap-2 py-1 text-xl">
            <Milestone value={1} size={20} />
            Road to PMP
          </Link>
          <div className={`${phoneRow === 'search' ? 'order-3 w-full' : 'hidden'} sm:order-none sm:block sm:w-auto sm:flex-1`}>
            <SearchBox />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <PhoneToggle icon="search" label="Search" open={phoneRow === 'search'} onClick={() => toggleRow('search')} />
            <PhoneToggle icon="display" label="Text size and theme" open={phoneRow === 'display'} onClick={() => toggleRow('display')} />
            <span className="hidden sm:flex">
              <StreakChip />
            </span>
            <span className="hidden sm:flex">
              <DisplayControls />
            </span>
            <AccountButton />
          </div>
          {phoneRow === 'display' && (
            <div className="order-3 flex w-full justify-end sm:hidden">
              <DisplayControls />
            </div>
          )}
          <div className="order-4 w-full">
            <TopMenu />
          </div>
        </div>
      </header>
      <main className={`${shell} flex-1 py-8 sm:py-10`}>
        <Suspense fallback={<Waiting>Loading</Waiting>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:tab" element={<HelpPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/read/:book" element={<ReaderPage />} />
          <Route path="/:courseId" element={<CoursePage />} />
          <Route path="/:courseId/sheet" element={<SheetPage />} />
          <Route path="/:courseId/exams" element={<ExamsPage />} />
          <Route path="/:courseId/question-types" element={<QuestionTypesPage />} />
          <Route path="/:courseId/exams/:examId" element={<ExamPage />} />
          <Route path="/:courseId/:moduleId" element={<ModulePage />} />
          <Route path="/:courseId/:moduleId/:tab" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
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
