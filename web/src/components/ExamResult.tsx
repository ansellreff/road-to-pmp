import { useState } from 'react'
import { Link } from 'react-router-dom'
import { findModule, type Course, type Exam, type ExamQuestion } from '../lib/content'
import { BANDS, bandFor, domainScores, formatDuration } from '../lib/exam'
import type { ExamAttempt } from '../lib/progress'
import { moduleNumber, percent } from '../lib/stats'
import { btnPrimary, btnQuiet, link } from '../lib/ui'
import { QuestionView } from './Quiz'

type Filter = 'missed' | 'flagged' | 'all'

/** The result of one finished mock exam: a rating per domain, then every question by domain. */
export default function ExamResult(props: {
  course: Course
  exam: Exam
  questions: ExamQuestion[]
  attempt: ExamAttempt
}) {
  const { course, exam, questions, attempt } = props
  const [filter, setFilter] = useState<Filter>('missed')
  const scores = domainScores(course, questions, attempt.picks)
  const unanswered = attempt.picks.filter((p) => p === null).length
  const isRight = (i: number) => attempt.picks[i] === questions[i].question.answer

  const filters: [Filter, string, number][] = [
    ['missed', 'Wrong or unanswered', attempt.total - attempt.right],
    ['flagged', 'Flagged', attempt.flags.length],
    ['all', 'All questions', attempt.total],
  ]
  const shown = (i: number) =>
    filter === 'all' || (filter === 'missed' && !isRight(i)) || (filter === 'flagged' && attempt.flags.includes(i))

  return (
    <div className="max-w-3xl">
      <Link to={`/${course.id}/exams`} className={`${link} text-sm`}>
        Mock exams
      </Link>
      <h1 className="title mt-3 text-4xl">{exam.title}: your result</h1>
      <p className="mt-1 text-sm text-muted">
        {attempt.mode === 'practice' ? 'Practice mode' : 'Real exam mode'}, {new Date(attempt.date).toLocaleDateString()},{' '}
        {formatDuration(attempt.seconds)} of {formatDuration(course.exam.minutes * 60)} used
      </p>

      <p className="title mt-6 text-5xl tabular-nums">
        {attempt.right} of {attempt.total} correct
      </p>
      <p className="mt-2 text-lg font-semibold">
        {percent(attempt.right / attempt.total)} overall.{' '}
        {attempt.timedOut && 'Time ran out, so the exam was submitted as it stood. '}
        {unanswered > 0 && `${unanswered} ${unanswered === 1 ? 'question was' : 'questions were'} left unanswered and count as wrong.`}
      </p>

      <table className="mt-8 w-full border-y-2 border-ink text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="py-2 pr-4 font-semibold">Domain</th>
            <th className="py-2 pr-4 text-right font-semibold">Correct</th>
            <th className="py-2 pr-4 text-right font-semibold">Score</th>
            <th className="py-2 font-semibold">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {scores.map((s) => {
            const band = bandFor(s.right / s.total)
            return (
              <tr key={s.domain}>
                <td className="py-2 pr-4">
                  <a href={`#domain-${s.domain + 1}`} className={link}>
                    {s.domain + 1}. {course.domains[s.domain].title}
                  </a>
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">
                  {s.right} of {s.total}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">{percent(s.right / s.total)}</td>
                <td className={`py-2 font-semibold ${band.style}`}>{band.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted">
        The real exam reports these four ratings per domain and no percentage. PMI does not publish the scores behind
        them, so the limits here are this platform's own:{' '}
        {BANDS.slice(0, -1)
          .map((b) => `${b.name} from ${percent(b.from)}`)
          .join(', ')}
        .
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/practice" className={btnPrimary}>
          Practice missed questions
        </Link>
        <Link to={`/${course.id}/exams`} className={btnQuiet}>
          Back to the mock exams
        </Link>
      </div>

      <h2 className="title mt-12 border-b-2 border-ink pb-2 text-2xl">Review by domain</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Which questions to show">
        {filters.map(([id, label, count]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
              filter === id ? 'border-plan bg-plan-soft text-plan' : 'border-line bg-surface hover:border-ink'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {scores.map((s) => {
        const positions = questions.flatMap((q, i) => (q.domain === s.domain && shown(i) ? [i] : []))
        return (
          <section key={s.domain} id={`domain-${s.domain + 1}`} className="mt-10 scroll-mt-4">
            <h3 className="title text-xl">
              Domain {s.domain + 1}: {course.domains[s.domain].title}
            </h3>
            <p className="text-sm text-muted">
              {s.right} of {s.total} correct
            </p>
            {positions.length === 0 && <p className="mt-3 text-sm text-muted">Nothing to show here with this filter.</p>}
            {positions.map((i) => {
              const { moduleId, question } = questions[i]
              return (
                <QuestionView
                  key={i}
                  number={i + 1}
                  question={question}
                  picked={attempt.picks[i]}
                  revealed
                  footer={
                    <p className="mt-3 text-sm text-muted">
                      {attempt.picks[i] === null && <span className="font-semibold text-critical">Not answered. </span>}
                      From module{' '}
                      <Link to={`/${course.id}/${moduleId}`} className={link}>
                        {moduleNumber(course, moduleId)} {findModule(course, moduleId)?.module.title}
                      </Link>
                    </p>
                  }
                />
              )
            })}
          </section>
        )
      })}
    </div>
  )
}
