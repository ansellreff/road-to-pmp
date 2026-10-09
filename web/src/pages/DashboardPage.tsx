import { Link } from 'react-router-dom'
import { courses, type Course } from '../lib/content'
import { dueCount, isKnown, studyStreak, useProgress, type Progress } from '../lib/progress'
import { answerTotals, domainStats, moduleNumber, percent, type DomainStats, type ModuleStats } from '../lib/stats'
import { btnPrimary, link } from '../lib/ui'

const PASS = 0.7

export default function DashboardPage() {
  const progress = useProgress()
  return (
    <div className="space-y-14">
      <section>
        <Link to="/" className={`${link} text-sm`}>
          Your certification path
        </Link>
        <h1 className="title mt-3 text-4xl sm:text-5xl">Dashboard</h1>
        <Totals progress={progress} />
      </section>
      {courses.map((course) => (
        <CourseDashboard key={course.id} course={course} progress={progress} />
      ))}
    </div>
  )
}

function Totals({ progress }: { progress: Progress }) {
  const streak = studyStreak(progress)
  const { answered, right } = answerTotals(progress)
  const known = Object.values(progress.cards).reduce((sum, deck) => sum + Object.values(deck).filter(isKnown).length, 0)
  const due = dueCount(progress)
  const figures = [
    {
      label: 'Study streak',
      value: `${streak} ${streak === 1 ? 'day' : 'days'}`,
      note: streak ? 'Study today to keep it going.' : 'Read a lesson or answer a question to start one.',
    },
    {
      label: 'Quiz questions answered',
      value: String(answered),
      note: answered ? `${percent(right / answered)} of your answers were correct.` : 'Counted from your next quiz onward.',
    },
    {
      label: 'Flashcards you know',
      value: String(known),
      note: due ? `${due} due for review today.` : 'None due for review today.',
    },
  ]
  return (
    <dl className="mt-8 grid gap-x-8 gap-y-6 border-y-2 border-ink py-5 sm:grid-cols-3">
      {figures.map((f) => (
        <div key={f.label}>
          <dt className="text-sm text-muted">{f.label}</dt>
          <dd className="title mt-1 text-3xl tabular-nums">{f.value}</dd>
          <dd className="mt-1 text-sm text-muted">{f.note}</dd>
        </div>
      ))}
    </dl>
  )
}

function CourseDashboard({ course, progress }: { course: Course; progress: Progress }) {
  const domains = course.domains.map((d) => domainStats(course, d, progress))
  const missed = domains.reduce((sum, d) => sum + d.missed, 0)
  const revisit = domains
    .flatMap((d) => d.modules)
    .filter((m) => m.missed > 0 || (m.quiz !== undefined && m.quiz < PASS))
    .sort((a, b) => b.missed - a.missed || (a.quiz ?? 1) - (b.quiz ?? 1))
    .slice(0, 8)

  return (
    <section>
      <h2 className="title text-3xl">{course.title}</h2>

      <h3 className="title mt-8 text-xl">Progress by exam domain</h3>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        The quiz average uses your best score in each module. A domain with a high exam weight and a low average is
        where study time pays off most.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink text-sm text-muted">
              <th className="py-2 pr-4 font-medium">Domain</th>
              <th className="py-2 pr-4 font-medium">Exam weight</th>
              <th className="w-1/4 py-2 pr-4 font-medium">Complete</th>
              <th className="py-2 pr-4 font-medium">Lessons read</th>
              <th className="py-2 pr-4 font-medium">Quiz average</th>
              <th className="py-2 font-medium">To practice</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((d, i) => (
              <DomainRow key={d.domain.id} number={i + 1} courseId={course.id} stats={d} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
        <div>
          <h3 className="title text-2xl">
            {missed
              ? `${missed} ${missed === 1 ? 'question' : 'questions'} to practice`
              : 'No questions to practice right now'}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted">
            A question lands here when your latest answer to it was wrong, and leaves once you answer it correctly.
            Questions are collected from the quizzes you take from now on.
          </p>
        </div>
        {missed > 0 && (
          <Link to="/practice" className={btnPrimary}>
            Practice these questions
          </Link>
        )}
      </div>

      {revisit.length > 0 && (
        <>
          <h3 className="title mt-12 text-xl">Modules to revisit</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {revisit.map((m) => (
              <RevisitRow key={m.key} course={course} stats={m} />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

function DomainRow({ number, courseId, stats }: { number: number; courseId: string; stats: DomainStats }) {
  const { domain, modules, quizAverage } = stats
  const written = modules.length
  const below = quizAverage !== undefined && quizAverage < PASS
  return (
    <tr className="border-b border-line align-top">
      <td className="py-3 pr-4">
        <Link to={`/${courseId}`} className="font-semibold hover:underline">
          {number}. {domain.title}
        </Link>
      </td>
      <td className="py-3 pr-4 tabular-nums">{domain.weight}%</td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 flex-1 overflow-hidden rounded-[1px] bg-line" aria-hidden="true">
            <span className="block h-full bg-plan" style={{ width: percent(stats.completion) }} />
          </span>
          <span className="w-10 text-right text-sm tabular-nums">{percent(stats.completion)}</span>
        </div>
      </td>
      <td className="py-3 pr-4 tabular-nums">{written ? `${stats.lessonsRead} of ${written}` : 'Not written yet'}</td>
      <td className={`py-3 pr-4 tabular-nums ${below ? 'font-semibold text-critical' : ''}`}>
        {quizAverage === undefined ? (
          <span className="text-muted">No quiz yet</span>
        ) : (
          <>
            {percent(quizAverage)}
            <span className="block text-sm font-normal text-muted">
              {stats.quizzesTaken} of {written} quizzes
            </span>
          </>
        )}
      </td>
      <td className="py-3 tabular-nums">{stats.missed || <span className="text-muted">0</span>}</td>
    </tr>
  )
}

function RevisitRow({ course, stats }: { course: Course; stats: ModuleStats }) {
  const { module, quiz, missed } = stats
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
      <Link to={`/${course.id}/${module.id}`} className={link}>
        {moduleNumber(course, module.id)} {module.title}
      </Link>
      <span className="text-sm text-muted">
        {quiz !== undefined && (
          <span className={quiz < PASS ? 'font-semibold text-critical' : ''}>Best quiz score {percent(quiz)}</span>
        )}
        {quiz !== undefined && missed > 0 && ', '}
        {missed > 0 && `${missed} to practice`}
      </span>
    </li>
  )
}
