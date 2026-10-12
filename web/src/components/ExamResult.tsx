import { useState } from 'react'
import { Link } from 'react-router-dom'
import { findModule, type Course, type Exam, type ExamQuestion } from '../lib/content'
import { BANDS, bandFor, domainScores, formatDuration, moduleLosses } from '../lib/exam'
import { ExamTiming, InsightTitle, WeakModules } from './ExamInsights'
import type { ExamAttempt } from '../lib/progress'
import { moduleNumber, percent } from '../lib/stats'
import { btnPrimary, btnQuiet, column, link, listTitle, note, subTitle } from '../lib/ui'
import { PageHeader } from './Page'
import WithSidePanel, { PanelBlock } from './SidePanel'
import { QuestionView, ScoreLine } from './Quiz'

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

  const panel = (
    <>
      <PanelBlock title="Score by domain">
        <ul>
          {scores.map((s) => {
            const band = bandFor(s.right / s.total)
            return (
              <li key={s.domain}>
                <a href={`#domain-${s.domain + 1}`} className="press flex min-h-9 items-baseline justify-between gap-3 rounded-md px-2 py-1.5 text-[0.9375rem] leading-snug hover:bg-plan-soft hover:text-plan">
                  <span>
                    Domain {s.domain + 1}
                    <span className={`block text-sm font-semibold ${band.style}`}>{band.name}</span>
                  </span>
                  <span className="tabular-nums text-muted">
                    {s.right} of {s.total}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </PanelBlock>
      <PanelBlock title="On this page">
        <ul>
          {[
            ['where-the-points-went', 'Where the points went'],
            ['how-you-used-the-time', 'How you used the time'],
            ['review-by-domain', 'Review by domain'],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="press flex min-h-9 items-baseline justify-between gap-3 rounded-md px-2 py-1.5 text-[0.9375rem] leading-snug hover:bg-plan-soft hover:text-plan">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </PanelBlock>
    </>
  )

  return (
    <WithSidePanel label="Result" panel={panel}>
    <div className={column}>
      <PageHeader back={{ to: `/${course.id}/exams`, label: 'Mock exams' }} title={`${exam.title}: your result`} />
      <p className={`${note} mt-2`}>
        {attempt.mode === 'practice' ? 'Practice mode' : 'Real exam mode'}, {new Date(attempt.date).toLocaleDateString()},{' '}
        {formatDuration(attempt.seconds)} of {formatDuration(course.exam.minutes * 60)} used
      </p>

      <ScoreLine right={attempt.right} total={attempt.total} />
      <p className="mt-2 text-lg font-semibold">
        {percent(attempt.right / attempt.total)} overall.{' '}
        {attempt.timedOut && 'Time ran out, so the exam was submitted as it stood. '}
        {unanswered > 0 && `${unanswered} ${unanswered === 1 ? 'question was' : 'questions were'} left unanswered and count as wrong.`}
      </p>

      <table className="data-table stack mt-8">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Correct</th>
            <th>Score</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => {
            const band = bandFor(s.right / s.total)
            return (
              <tr key={s.domain}>
                <td>
                  <a href={`#domain-${s.domain + 1}`} className={link}>
                    {s.domain + 1}. {course.domains[s.domain].title}
                  </a>
                </td>
                <td data-label="Correct" className="tabular-nums">
                  {s.right} of {s.total}
                </td>
                <td data-label="Score" className="tabular-nums">
                  {percent(s.right / s.total)}
                </td>
                <td data-label="Rating" className={`font-semibold ${band.style}`}>
                  {band.name}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className={`${note} mt-3`}>
        The real exam reports these four ratings per domain and no percentage. PMI does not publish the scores behind
        them, so the limits here are this platform's own:{' '}
        {BANDS.slice(0, -1)
          .map((b) => `${b.name} from ${percent(b.from)}`)
          .join(', ')}
        .
        {questions.some((q) => q.question.type === 'match') &&
          ' A matching question counts as correct only when every pair is right; PMI does not publish its own rule.'}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/practice" className={btnPrimary}>
          Practice missed questions
        </Link>
        <Link to={`/${course.id}/exams`} className={btnQuiet}>
          Back to the mock exams
        </Link>
      </div>

      <InsightTitle>Where the points went</InsightTitle>
      <p className={`${note} mt-3`}>The modules with the most questions wrong or unanswered. Start your review there.</p>
      <WeakModules course={course} losses={moduleLosses(questions, attempt.picks)} />

      <InsightTitle>How you used the time</InsightTitle>
      <ExamTiming course={course} questions={questions} attempt={attempt} />

      <h2 id="review-by-domain" className={`${listTitle} mt-12 scroll-mt-4`}>
        Review by domain
      </h2>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Which questions to show">
        {filters.map(([id, label, count]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
            className={`press min-h-11 rounded-md border px-3 py-1.5 font-medium ${
              filter === id ? 'border-plan bg-plan-soft text-plan ring-1 ring-plan' : 'border-edge bg-surface hover:border-ink'
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
            <h3 className={subTitle}>
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
    </WithSidePanel>
  )
}
