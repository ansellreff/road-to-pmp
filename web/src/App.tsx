import { Link, Route, Routes } from 'react-router-dom'
import Milestone from './components/Milestone'
import NotFound from './components/NotFound'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import ModulePage from './pages/ModulePage'
import ReviewPage from './pages/ReviewPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-ink bg-surface">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-3 sm:px-6">
          <Link to="/" className="title flex items-center gap-2 text-xl">
            <Milestone value={1} size={20} />
            Road to PMI
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/:courseId" element={<CoursePage />} />
          <Route path="/:courseId/:moduleId" element={<ModulePage />} />
          <Route path="/:courseId/:moduleId/:tab" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
