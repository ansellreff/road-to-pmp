import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ExamBlueprint from '../components/ExamBlueprint'
import Milestone from '../components/Milestone'
import { allModules, courses, getExams, type Course } from '../lib/content'
import { buildPlan, formatDay, planMockExams } from '../lib/plan'
import { readiness } from '../lib/readiness'
import {
  dueCount,
  exportProgress,
  importProgress,
  resetProgress,
  today,
  useProgress,
  type Progress,
} from '../lib/progress'
import { courseCompletion, courseMissed, moduleNumber, nextModule, percent, remainingModules } from '../lib/stats'
import { btnDanger, btnPrimary, btnQuiet, link, note, pageTitle, section, sectionTitle } from '../lib/ui'

// The planned order of certifications. One with content in src/content becomes a live course.
const path = [
  { id: 'capm', name: 'CAPM' },
  { id: 'pmp', name: 'PMP' },
  { id: 'pmi-acp', name: 'PMI-ACP' },
  { id: 'pmi-sp', name: 'PMI-SP' },
]

export default function Home() {
  const progress = useProgress()
  return (
    <div className="space-y-14">
      <section>
        <h1 className={pageTitle}>Your certification path</h1>
        <ol className="mt-8 grid grid-cols-4">
          {path.map((step, i) => {
            const course = courses.find((c) => c.id === step.id)
            const done = course ? courseCompletion(course, progress) : 0
            return (
              <li key={step.id} className="relative pr-2">
                {i < path.length - 1 && <span className="absolute left-0 right-0 top-[13px] h-0.5 bg-line" />}
                <span className="relative block w-fit bg-paper pr-2">
                  <Milestone value={done} planned={!course} size={28} />
                </span>
                <span className="title mt-2 block text-lg sm:text-2xl">
                  {course ? <Link to={`/${course.id}`}>{step.name}</Link> : step.name}
                </span>
                <span className="block text-sm text-muted">{course ? `${percent(done)} complete` : 'Planned'}</span>
              </li>
            )
          })}
        </ol>
      </section>

      {courses.map((course) => (
        <Today key={course.id} course={course} progress={progress} />
      ))}

      <DueCards due={dueCount(progress)} />

      {courses.map((course) => (
        <CourseSummary key={course.id} course={course} progress={progress} />
      ))}

      <Backup />
    </div>
  )
}

/** Exam countdown and what to study today, from the study plan. */
function Today({ course, progress }: { course: Course; progress: Progress }) {
  const examDate = progress.examDates[course.id]
  if (!examDate) {
    return (
      <section className={`${section} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <h2 className={sectionTitle}>When is your {course.title} exam?</h2>
          <p className={`${note} mt-1 max-w-xl`}>
            Set the day and this page shows a countdown and what to study each day to be ready in time.
          </p>
        </div>
        <Link to="/plan" className={btnPrimary}>
          Set an exam day
        </Link>
      </section>
    )
  }

  const now = today()
  const plan = buildPlan(now, examDate, remainingModules(course, progress))
  const missed = courseMissed(course, progress)
  const exams = getExams(course.id)
  const mockToday = exams[planMockExams(plan, examDate, exams.length).find((m) => m.day === now)?.index ?? -1]
  // Written modules due today; if none falls due today, the next one keeps the habit going.
  const written = plan.items.filter((p) => p.item.ready)
  const dueToday = written.filter((p) => p.finishBy === now)
  const modules = dueToday.length ? dueToday : written.slice(0, 1)
  const inReview = plan.reviewStart !== undefined && now >= plan.reviewStart

  let heading = `${plan.daysLeft} ${plan.daysLeft === 1 ? 'day' : 'days'} to your ${course.title} exam`
  if (plan.daysLeft === 0) heading = `Your ${course.title} exam is today`
  if (plan.daysLeft < 0) heading = `Your ${course.title} exam day has passed`

  return (
    <section className={section}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className={sectionTitle}>{heading}</h2>
        <Link to="/plan" className={`${link} text-sm`}>
          {plan.daysLeft < 0 ? 'Choose a new exam day' : `Exam on ${formatDay(examDate, now)}. See the full plan`}
        </Link>
      </div>

      {plan.daysLeft > 0 && (
        <>
          <h3 className="mt-5 text-sm font-medium text-muted">
            {inReview ? 'Final review: today' : 'To stay on pace today'}
          </h3>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {modules.map(({ item, finishBy }) => (
              <li key={item.id} className="flex min-h-12 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <Link to={`/${course.id}/${item.id}`} className={link}>
                  {moduleNumber(course, item.id)} {item.title}
                </Link>
                <span className="text-sm text-muted">
                  {finishBy === now ? 'Finish today' : `Finish by ${formatDay(finishBy, now)}`}
                </span>
              </li>
            ))}
            {mockToday && (
              <li className="flex min-h-12 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <Link to={`/${course.id}/exams`} className={link}>
                  {mockToday.title}
                </Link>
                <span className="text-sm text-muted">
                  Planned for today. Allow {course.exam.minutes / 60} hours{mockToday.unseen ? ', in real exam mode' : ''}.
                </span>
              </li>
            )}
            {missed > 0 && (
              <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <Link to="/practice" className={link}>
                  Practice {missed} missed {missed === 1 ? 'question' : 'questions'}
                </Link>
                <span className="text-sm text-muted">Your latest answer to each was wrong</span>
              </li>
            )}
            {modules.length === 0 && missed === 0 && (
              <li className="py-3 text-sm text-muted">
                {written.length === plan.items.length
                  ? 'Every module is finished. Review your flashcards to keep them fresh.'
                  : 'Every module written so far is finished. The rest of the plan waits for new modules.'}
              </li>
            )}
          </ul>
        </>
      )}
    </section>
  )
}

function DueCards({ due }: { due: number }) {
  return (
    <section className={`${section} flex flex-wrap items-center justify-between gap-4`}>
      <div>
        <h2 className={sectionTitle}>
          {due ? `${due} ${due === 1 ? 'flashcard is' : 'flashcards are'} due for review` : 'No flashcards due today'}
        </h2>
        <p className={`${note} mt-1 max-w-xl`}>
          Cards you know come back after 1, 3, 7, 14 and then 30 days. Cards you miss come back the same day.
        </p>
      </div>
      {due > 0 && (
        <Link to="/review" className={btnPrimary}>
          Review due cards
        </Link>
      )}
    </section>
  )
}

function CourseSummary({ course, progress }: { course: Course; progress: Progress }) {
  const modules = allModules(course)
  const written = modules.filter((m) => m.ready).length
  const next = nextModule(course, progress)
  const exams = getExams(course.id).length
  const ready = readiness(course, progress)
  return (
    <section className={section}>
      <h2 className={sectionTitle}>{course.title}</h2>
      <p className="text-muted">
        {course.subtitle}. {course.exam.questions} questions in {course.exam.minutes} minutes.
      </p>
      <div className="mt-6">
        <ExamBlueprint course={course} progress={progress} />
      </div>
      {!ready.empty && (
        <p className="mt-5">
          <span className="font-semibold">Readiness estimate: {percent(ready.value)}.</span>{' '}
          <Link to="/dashboard" className={link}>
            See how it is worked out
          </Link>
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        {next ? (
          <Link to={`/${course.id}/${next.id}`} className={btnPrimary}>
            Continue with {moduleNumber(course, next.id)} {next.title}
          </Link>
        ) : (
          <span className="text-sm text-muted">You have finished every module written so far.</span>
        )}
        <Link to={`/${course.id}`} className={link}>
          See all {modules.length} modules
        </Link>
        {exams > 0 && (
          <Link to={`/${course.id}/exams`} className={link}>
            {exams} mock exams
          </Link>
        )}
        <span className="text-sm text-muted">
          {written} of {modules.length} written so far
        </span>
      </div>
    </section>
  )
}

function Backup() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  function download() {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `road-to-pmi-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMessage('Backup downloaded.')
  }

  async function upload(file: File | undefined) {
    if (!file) return
    try {
      importProgress(await file.text())
      setMessage('Progress restored from backup.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'That file could not be read. Choose a backup downloaded from this page.')
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  function reset() {
    if (window.confirm('Delete all progress saved in this browser? This cannot be undone.')) {
      resetProgress()
      setMessage('All progress deleted.')
    }
  }

  return (
    <section className={section}>
      <h2 className={sectionTitle}>Your saved progress</h2>
      <p className={`${note} mt-1 max-w-2xl`}>
        Progress saves automatically in this browser and stays after you close it. To use it on another device, download
        a backup here and restore it there.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className={btnQuiet} onClick={download}>
          Download backup
        </button>
        <button className={btnQuiet} onClick={() => fileInput.current?.click()}>
          Restore from backup
        </button>
        <button className={btnDanger} onClick={reset}>
          Delete all progress
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => upload(e.target.files?.[0])}
        />
      </div>
      {message && (
        <p className="mt-3 text-sm" role="status">
          {message}
        </p>
      )}
    </section>
  )
}
