import { Link, Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import ModulePage from './pages/ModulePage'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold text-indigo-700">
            Road to PMI
          </Link>
          <span className="text-sm text-slate-500">Personal study platform</span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:courseId" element={<CoursePage />} />
          <Route path="/:courseId/:moduleId" element={<ModulePage />} />
          <Route path="/:courseId/:moduleId/:tab" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
