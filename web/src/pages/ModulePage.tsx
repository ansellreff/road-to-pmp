import { Link, NavLink, useParams } from 'react-router-dom'
import Flashcards from '../components/Flashcards'
import Lesson from '../components/Lesson'
import ModuleProgress from '../components/ModuleProgress'
import NotFound from '../components/NotFound'
import Quiz from '../components/Quiz'
import { findModule, getCourse } from '../lib/content'

const tabs = [
  { id: 'lesson', label: 'Lesson' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'flashcards', label: 'Flashcards' },
]

export default function ModulePage() {
  const { courseId, moduleId, tab = 'lesson' } = useParams()
  const course = getCourse(courseId)
  const found = course && findModule(course, moduleId)
  if (!course || !found || !found.module.ready || !tabs.some((t) => t.id === tab)) return <NotFound />
  const { domain, module } = found
  const base = `/${course.id}/${module.id}`

  return (
    <div>
      <Link to={`/${course.id}`} className="text-sm text-indigo-700 hover:underline">
        ← {course.title} modules
      </Link>
      <p className="mt-2 text-sm text-slate-500">{domain.title}</p>
      <h1 className="text-2xl font-bold text-slate-900">{module.title}</h1>

      <nav className="mt-5 flex gap-1 border-b border-slate-200">
        {tabs.map((t) => (
          <NavLink
            key={t.id}
            to={t.id === 'lesson' ? base : `${base}/${t.id}`}
            end
            className={({ isActive }) =>
              `-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
                isActive
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>

      {/* key remounts the tab when switching modules so no state leaks between them */}
      <div className="mt-6" key={`${base}/${tab}`}>
        {tab === 'lesson' && <Lesson courseId={course.id} moduleId={module.id} />}
        {tab === 'quiz' && <Quiz courseId={course.id} moduleId={module.id} />}
        {tab === 'flashcards' && <Flashcards courseId={course.id} moduleId={module.id} />}
      </div>

      <ModuleProgress courseId={course.id} moduleId={module.id} />
    </div>
  )
}
