import { NavLink, useParams } from 'react-router-dom'
import Flashcards from '../components/Flashcards'
import Icon, { type IconName } from '../components/Icon'
import Lesson from '../components/Lesson'
import { DomainModules, ModuleStatus, StepNav, type Step } from '../components/ModuleNav'
import ModuleProgress from '../components/ModuleProgress'
import NotFound from '../components/NotFound'
import NotOnExamNote, { ExamStar } from '../components/NotOnExam'
import { PageHeader } from '../components/Page'
import Quiz from '../components/Quiz'
import WithSidePanel from '../components/SidePanel'
import ModuleSources from '../components/Sources'
import { findModule, getCourse } from '../lib/content'
import { moduleNeighbours, moduleNumber } from '../lib/stats'

const tabs: { id: string; label: string; icon: IconName }[] = [
  { id: 'lesson', label: 'Lesson', icon: 'lesson' },
  { id: 'quiz', label: 'Quiz', icon: 'quiz' },
  { id: 'flashcards', label: 'Flashcards', icon: 'cards' },
]

export default function ModulePage() {
  const { courseId, moduleId, tab = 'lesson' } = useParams()
  const course = getCourse(courseId)
  const found = course && findModule(course, moduleId)
  if (!course || !found || !found.module.ready || !tabs.some((t) => t.id === tab)) return <NotFound />
  const { domain, module } = found
  const base = `/${course.id}/${module.id}`

  // The chain through a module: lesson, quiz, flashcards, then the next module.
  const { previous, next } = moduleNeighbours(course, module.id)
  const numbered = (id: string, title: string) => `${moduleNumber(course, id)} ${title}`
  const steps: Record<string, { previous?: Step; next?: Step }> = {
    lesson: {
      previous: previous && { to: `/${course.id}/${previous.id}`, label: 'Previous module', title: numbered(previous.id, previous.title) },
      next: { to: `${base}/quiz`, label: 'Next', title: 'Take the quiz' },
    },
    quiz: {
      previous: { to: base, label: 'Back to', title: 'The lesson' },
      next: { to: `${base}/flashcards`, label: 'Next', title: 'Practice the flashcards' },
    },
    flashcards: {
      previous: { to: `${base}/quiz`, label: 'Back to', title: 'The quiz' },
      next: next
        ? { to: `/${course.id}/${next.id}`, label: 'Next module', title: numbered(next.id, next.title) }
        : { to: `/${course.id}/exams`, label: 'Last module done. Next', title: 'The mock exams' },
    },
  }

  const outline = <DomainModules course={course} domain={domain} current={module.id} />
  const footer = (
    <>
      <StepNav {...steps[tab]} />
      {/* The lesson shows each source under its own section, so the full list is only for the other tabs. */}
      {tab !== 'lesson' && <ModuleSources courseId={course.id} moduleId={module.id} />}
      <ModuleProgress courseId={course.id} moduleId={module.id} />
    </>
  )

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

      <nav className="mt-6 flex gap-7 overflow-x-auto border-b border-ink" aria-label="Module sections">
        {tabs.map((t) => (
          <NavLink
            key={t.id}
            to={t.id === 'lesson' ? base : `${base}/${t.id}`}
            end
            className={({ isActive }) =>
              `title press flex items-center gap-2 border-b-4 pt-2 pb-2 text-lg ${
                isActive ? 'border-plan' : 'border-transparent font-medium text-muted hover:text-ink'
              }`
            }
          >
            <Icon name={t.icon} />
            {t.label}
          </NavLink>
        ))}
      </nav>

      {/* key remounts the tab when switching modules so no state leaks between them */}
      <div className="mt-8" key={`${base}/${tab}`}>
        {tab === 'lesson' ? (
          <Lesson courseId={course.id} moduleId={module.id} panel={outline} footer={footer} />
        ) : (
          <WithSidePanel
            label="Contents"
            panel={
              <>
                <ModuleStatus courseId={course.id} moduleId={module.id} />
                {outline}
              </>
            }
          >
            {tab === 'quiz' && <Quiz courseId={course.id} moduleId={module.id} />}
            {tab === 'flashcards' && <Flashcards courseId={course.id} moduleId={module.id} />}
            {footer}
          </WithSidePanel>
        )}
      </div>
    </div>
  )
}
