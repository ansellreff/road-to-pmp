import { Link } from 'react-router-dom'
import { findModule, type Course, type ExamQuestion } from '../lib/content'
import { formatSeconds, type ModuleLoss } from '../lib/exam'
import type { ExamAttempt } from '../lib/progress'
import { moduleNumber } from '../lib/stats'
import { link, listTitle, note } from '../lib/ui'
import { Figures } from './Page'

/** The modules where the most questions were lost, each linking to its lesson. */
export function WeakModules({ course, losses, limit = 8 }: { course: Course; losses: ModuleLoss[]; limit?: number }) {
  if (!losses.length) return <p className={`${note} border-b border-line py-3`}>No question was lost.</p>
  return (
    <ol className="divide-y divide-line border-b border-line">
      {losses.slice(0, limit).map((loss) => (
        <li key={loss.moduleId} className="flex min-h-12 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
          <Link to={`/${course.id}/${loss.moduleId}`} className={link}>
            {moduleNumber(course, loss.moduleId)} {findModule(course, loss.moduleId)?.module.title}
          </Link>
          <span className="text-sm tabular-nums text-muted">
            <span className="font-semibold text-critical">{loss.lost} lost</span> of {loss.total}{' '}
            {loss.total === 1 ? 'question' : 'questions'}
          </span>
        </li>
      ))}
    </ol>
  )
}

/** How the time was spent: average per question against the pace the exam allows, and the slowest questions. */
export function ExamTiming({ course, questions, attempt }: { course: Course; questions: ExamQuestion[]; attempt: ExamAttempt }) {
  const times = attempt.times
  if (!times) {
    return (
      <p className={`${note} mt-3`}>
        This exam was taken before the time on each question was recorded. Exams taken from now on show it here.
      </p>
    )
  }
  const seen = times.flatMap((seconds, i) => (seconds > 0 ? [{ i, seconds }] : []))
  const allowed = (course.exam.minutes * 60) / attempt.total
  const average = seen.length ? seen.reduce((sum, t) => sum + t.seconds, 0) / seen.length : 0
  const slow = seen.filter((t) => t.seconds > allowed * 2).length
  const slowest = [...seen].sort((a, b) => b.seconds - a.seconds).slice(0, 10)
  return (
    <>
      <div>
        <Figures
          underHeading
          items={[
            {
              label: 'Average on a question',
              value: formatSeconds(average),
              note: `Over the ${seen.length} questions you opened.`,
            },
            {
              label: 'Pace the exam allows',
              value: formatSeconds(allowed),
              note: `${attempt.total} questions in ${course.exam.minutes} minutes.`,
            },
            {
              label: 'Took more than twice that',
              value: `${slow} ${slow === 1 ? 'question' : 'questions'}`,
              note: slow ? 'Flag a hard question and move on; come back if time is left.' : 'No question held you up for long.',
            },
          ]}
        />
      </div>
      {slowest.length > 0 && (
        <>
          <h3 className="mt-6 text-sm font-medium text-muted">The questions that took longest</h3>
          <ol className="mt-1 divide-y divide-line border-y border-line">
            {slowest.map(({ i, seconds }) => {
              const right = attempt.picks[i] === questions[i].question.answer
              return (
                <li key={i} className="grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-2.5">
                  <span className="tabular-nums">{formatSeconds(seconds)}</span>
                  <span className="truncate">
                    <span className="text-muted">Question {i + 1}. </span>
                    {questions[i].question.q}
                  </span>
                  <span className={`text-sm font-semibold ${right ? 'text-done' : 'text-critical'}`}>
                    {right ? '✓ Right' : attempt.picks[i] === null ? 'Not answered' : '✗ Wrong'}
                  </span>
                </li>
              )
            })}
          </ol>
        </>
      )}
    </>
  )
}

export function InsightTitle({ children }: { children: string }) {
  const id = children.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <h2 id={id} className={`${listTitle} mt-12 scroll-mt-4`}>
      {children}
    </h2>
  )
}
