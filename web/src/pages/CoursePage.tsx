import { Link, useParams } from 'react-router-dom'
import ExamBlueprint from '../components/ExamBlueprint'
import Icon, { type IconName } from '../components/Icon'
import NotFound from '../components/NotFound'
import NotOnExamNote, { ExamStar } from '../components/NotOnExam'
import { PageHeader } from '../components/Page'
import Ring from '../components/Ring'
import { getCourse, getExams, type Course, type ModuleMeta } from '../lib/content'
import { knownCount, moduleCompletion, moduleKey, useProgress, type Progress } from '../lib/progress'
import { domainCompletion, nextStep, percent } from '../lib/stats'
import { btnQuiet, domainBg, domainText, sectionTitle } from '../lib/ui'

export default function CoursePage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  const progress = useProgress()
  if (!course) return <NotFound />
  const exams = getExams(course.id).length

  return (
    <div>
      <PageHeader back={{ to: '/', label: 'Home' }} title={`${course.title} modules`}>
        {course.subtitle}. The exam has {course.exam.questions} questions in {course.exam.minutes} minutes.
      </PageHeader>
      <div className="mt-5 flex flex-wrap gap-3">
        {exams > 0 && (
          <Link to={`/${course.id}/exams`} className={btnQuiet}>
            <Icon name="exam" className="mr-2" />
            {exams} mock exams
          </Link>
        )}
        <Link to={`/${course.id}/sheet`} className={btnQuiet}>
          <Icon name="formula" className="mr-2" />
          Formulas and key facts
        </Link>
      </div>
      <div className="mt-8 max-w-5xl">
        <ExamBlueprint course={course} progress={progress} />
      </div>

      <div className="mt-10 space-y-6">
        {course.domains.map((domain, i) => {
          const done = domainCompletion(course, domain, progress)
          return (
            // Open from the start; a finished domain can be folded away.
            <details key={domain.id} id={domain.id} open className="group scroll-mt-6">
              <summary className="press flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 border-b-2 border-ink pb-3 [&::-webkit-details-marker]:hidden">
                <span className={`h-9 w-1.5 rounded-full ${domainBg[i]}`} aria-hidden="true" />
                <Ring value={done} size={44} label={`${percent(done)} complete`}>
                  <span className="text-xs font-semibold tabular-nums">{Math.round(done * 100)}</span>
                </Ring>
                <h2 className={`${sectionTitle} min-w-0 flex-1 basis-64`}>
                  <span className={domainText[i]}>Domain {i + 1}</span> {domain.title}
                </h2>
                <span className="text-sm text-muted">
                  {domain.weight}% of the exam, about {Math.round((domain.weight / 100) * course.exam.questions)} questions
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-plan">
                  <span className="group-open:hidden">Show</span>
                  <span className="hidden group-open:inline">Hide</span>
                  <Icon name="down" size={16} className="transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <ol className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {domain.modules.map((m, j) => (
                  <li key={m.id}>
                    <ModuleCard course={course} module={m} number={`${i + 1}.${j + 1}`} progress={progress} accent={domainBg[i]} />
                  </li>
                ))}
              </ol>
              {domain.modules.some((m) => m.supplementary) && <NotOnExamNote className="mt-3 text-sm" />}
            </details>
          )
        })}
      </div>
    </div>
  )
}

function ModuleCard(props: { course: Course; module: ModuleMeta; number: string; progress: Progress; accent: string }) {
  const { course, module: m, number, progress, accent } = props
  if (!m.ready) {
    return (
      <div className="flex h-full items-center gap-3 rounded-lg border border-dashed border-edge px-4 py-4 text-muted">
        <span className="tabular-nums">{number}</span>
        <span>{m.title} (not written yet)</span>
      </div>
    )
  }
  const key = moduleKey(course.id, m.id)
  const value = moduleCompletion(progress, key)
  const quiz = progress.quizzes[key]
  const deck = progress.cardTotals[key]
  const step = nextStep(course, m, progress)
  const parts: { icon: IconName; label: string; note: string; done: boolean }[] = [
    { icon: 'lesson', label: 'Lesson', note: progress.lessons[key] ? 'read' : 'not read', done: Boolean(progress.lessons[key]) },
    { icon: 'quiz', label: 'Quiz', note: quiz ? `${quiz.best} of ${quiz.total}` : 'not taken', done: Boolean(quiz && quiz.best / quiz.total >= 0.7) },
    { icon: 'cards', label: 'Cards', note: deck ? `${knownCount(progress, key)} of ${deck}` : 'not started', done: Boolean(deck && knownCount(progress, key) >= deck) },
  ]
  return (
    <article className="card lift relative flex h-full flex-col overflow-hidden">
      <span className={`absolute inset-y-0 left-0 w-1 ${accent}`} aria-hidden="true" />
      <div className="flex items-start gap-3 px-5 pt-4">
        <Ring value={value} size={46} label={`${percent(value)} complete`}>
          {value >= 1 ? <Icon name="check" size={18} className="text-done" /> : <span className="text-xs font-semibold tabular-nums">{Math.round(value * 100)}</span>}
        </Ring>
        <h3 className="min-w-0 flex-1 leading-snug">
          <span className="block text-sm tabular-nums text-muted">Module {number}</span>
          {/* The whole card opens the module; the button below goes to the next step in it. */}
          <Link to={`/${course.id}/${m.id}`} className="font-semibold after:absolute after:inset-0 hover:text-plan">
            {m.title}
          </Link>
          {m.supplementary && (
            <>
              {' '}
              <ExamStar />
            </>
          )}
        </h3>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 px-5 text-sm">
        {parts.map((part) => (
          <li key={part.label} className={`flex items-center gap-1.5 ${part.done ? 'text-done' : 'text-muted'}`}>
            <Icon name={part.done ? 'check' : part.icon} size={16} />
            <span>
              <span className="font-medium">{part.label}</span> {part.note}
            </span>
          </li>
        ))}
      </ul>
      <div className="relative mt-auto px-5 pt-4 pb-4">
        {/* Quiet buttons here: with 39 cards on the page, filled ones would shout. */}
        <Link to={step.to} className={`${btnQuiet} w-full justify-between ${step.done ? '' : 'font-semibold text-plan'}`}>
          {step.label}
          <Icon name="next" size={18} />
        </Link>
      </div>
    </article>
  )
}
