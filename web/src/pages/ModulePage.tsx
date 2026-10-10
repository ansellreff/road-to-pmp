import { NavLink, useParams } from 'react-router-dom'
import { PageHeader } from '../components/Page'
import Flashcards from '../components/Flashcards'
import Lesson from '../components/Lesson'
import ModuleProgress from '../components/ModuleProgress'
import NotFound from '../components/NotFound'
import NotOnExamNote, { ExamStar } from '../components/NotOnExam'
import Quiz from '../components/Quiz'
import ModuleSources from '../components/Sources'
import { findModule, getCourse } from '../lib/content'
import { moduleNumber } from '../lib/stats'

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
      <PageHeader
        long
        back={{ to: `/${course.id}`, label: `All ${course.title} modules` }}
        eyebrow={`Module ${moduleNumber(course, module.id)} in ${domain.title}`}
        title={
          <>
            {module.title}
            {module.supplementary && (
              <>
                {' '}
                <ExamStar />
              </>
            )}
          </>
        }
      />
      {module.supplementary && <NotOnExamNote className="mt-2" />}

      <nav className="mt-6 flex gap-6 overflow-x-auto border-b border-ink" aria-label="Module sections">
        {tabs.map((t) => (
          <NavLink
            key={t.id}
            to={t.id === 'lesson' ? base : `${base}/${t.id}`}
            end
            className={({ isActive }) =>
              `title press border-b-4 pt-2 pb-2 text-lg ${
                isActive ? 'border-plan' : 'border-transparent font-medium text-muted hover:text-ink'
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>

      {/* key remounts the tab when switching modules so no state leaks between them */}
      <div className="mt-8" key={`${base}/${tab}`}>
        {tab === 'lesson' && <Lesson courseId={course.id} moduleId={module.id} />}
        {tab === 'quiz' && <Quiz courseId={course.id} moduleId={module.id} />}
        {tab === 'flashcards' && <Flashcards courseId={course.id} moduleId={module.id} />}
      </div>

      {/* The lesson shows each source under its own section, so the full list is only for the other tabs. */}
      {tab !== 'lesson' && <ModuleSources courseId={course.id} moduleId={module.id} />}
      <ModuleProgress courseId={course.id} moduleId={module.id} />
    </div>
  )
}
