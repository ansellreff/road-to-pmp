import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ExamBlueprint from '../components/ExamBlueprint'
import Icon, { type IconName } from '../components/Icon'
import Milestone from '../components/Milestone'
import Ring from '../components/Ring'
import { certifications, courses, findModule, getExams, type Course } from '../lib/content'
import { buildPlan, formatDay, planMockExams } from '../lib/plan'
import { readiness } from '../lib/readiness'
import {
  dueCount,
  exportProgress,
  importProgress,
  moduleCompletion,
  moduleKey,
  resetProgress,
  DEFAULT_GOAL,
  setGoal,
  studyStreak,
  today,
  useProgress,
  type Progress,
} from '../lib/progress'
import { courseCompletion, courseMissed, moduleNumber, nextModule, nextStep, percent, remainingModules } from '../lib/stats'
import { toast } from '../lib/toast'
import { btnDanger, btnPrimary, btnQuiet, domainBg, link, note, pageTitle, section, sectionTitle, subTitle } from '../lib/ui'

/** The home page: what to do now, how you stand, what is planned for today; reference below. */
export default function Home() {
  const progress = useProgress()
  return (
    <div className="space-y-12">
      <h1 className={pageTitle}>Your study today</h1>

      {courses.map((course) => (
        <Continue key={course.id} course={course} progress={progress} />
      ))}

      <Tiles progress={progress} />

      {courses.map((course) => (
        <Today key={course.id} course={course} progress={progress} />
      ))}

      {courses.map((course) => (
        <CourseSummary key={course.id} course={course} progress={progress} />
      ))}

      <CertificationPath progress={progress} />
      <Backup />
    </div>
  )
}

/** One large card: the module you are in, and the button for the next step in it. */
function Continue({ course, progress }: { course: Course; progress: Progress }) {
  // The module opened last, while it is unfinished; otherwise the first unfinished one.
  const [lastCourse, lastId] = (progress.lastOpened ?? '').split('/')
  const last = lastCourse === course.id ? findModule(course, lastId)?.module : undefined
  const unfinished = last?.ready && moduleCompletion(progress, moduleKey(course.id, last.id)) < 1
  const module = unfinished ? last : nextModule(course, progress)

  if (!module) {
    return (
      <section className="card flex flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div>
          <h2 className={sectionTitle}>Every {course.title} module is finished</h2>
          <p className={`${note} mt-1`}>Keep your flashcards fresh and take the mock exams.</p>
        </div>
        <Link to={`/${course.id}/exams`} className={btnPrimary}>
          Go to the mock exams
        </Link>
      </section>
    )
  }

  const key = moduleKey(course.id, module.id)
  const found = findModule(course, module.id)
  const d = found ? course.domains.indexOf(found.domain) : 0
  const value = moduleCompletion(progress, key)
  const step = nextStep(course, module, progress)
  const stoppedAt = progress.reading[key]
  const started = value > 0 || Boolean(stoppedAt)

  return (
    <section className="card relative overflow-hidden">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${domainBg[d]}`} aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-5 px-6 py-6 sm:px-8">
        <Ring value={value} size={92} stroke={8} label={`${percent(value)} of this module complete`}>
          <span className="title text-2xl tabular-nums">{percent(value)}</span>
        </Ring>
        <div className="min-w-0 flex-1 basis-72">
          <p className="text-sm text-muted">
            {started ? 'Continue where you stopped' : 'Start here'}: {course.title} module {moduleNumber(course, module.id)}, Domain {d + 1}
          </p>
          <h2 className={`${sectionTitle} mt-1`}>{module.title}</h2>
          {stoppedAt && !progress.lessons[key] && (
            <p className="mt-1 text-sm">
              <span className="text-muted">You stopped in the lesson at </span>
              <Link to={`/${course.id}/${module.id}#${stoppedAt}`} className={link}>
                {sectionName(stoppedAt)}
              </Link>
            </p>
          )}
        </div>
        <Link to={step.to} className={`${btnPrimary} min-h-14 px-7 text-lg`}>
          {step.label}
          <Icon name="next" className="ml-2" />
        </Link>
      </div>
    </section>
  )
}

/** "flow-metrics" -> "Flow metrics": a readable name for a stored section address. */
const sectionName = (id: string) => {
  const words = id.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/** How you stand: streak, readiness, flashcards due. Each tile opens the page behind it. */
function Tiles({ progress }: { progress: Progress }) {
  const streak = studyStreak(progress)
  const studiedToday = Boolean(progress.activity[today()])
  const due = dueCount(progress)
  const course = courses[0]
  const ready = course ? readiness(course, progress) : undefined
  const tiles: { to: string; icon: IconName; label: string; value: string; note: string; tone?: string }[] = [
    {
      to: '/dashboard',
      icon: 'streak',
      label: 'Study streak',
      value: `${streak} ${streak === 1 ? 'day' : 'days'}`,
      note: studiedToday ? 'Today is counted.' : streak ? 'Study today to keep it going.' : 'Study today to start one.',
    },
    {
      to: '/dashboard',
      icon: 'target',
      label: 'Readiness estimate',
      value: ready && !ready.empty ? percent(ready.value) : 'Not yet',
      note: ready && !ready.empty ? 'See how it is worked out.' : 'Appears after your first quiz.',
    },
    {
      to: '/review',
      icon: 'cards',
      label: 'Flashcards due',
      value: String(due),
      note: due ? 'Review them now.' : 'Nothing to review today.',
    },
  ]
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li>
        <GoalTile progress={progress} />
      </li>
      {tiles.map((tile) => (
        <li key={tile.label}>
          <Link to={tile.to} className="card lift block h-full px-5 py-4">
            <span className="flex items-center gap-2 text-sm text-muted">
              <Icon name={tile.icon} size={18} />
              {tile.label}
            </span>
            <span className="title mt-1 block text-3xl tabular-nums">{tile.value}</span>
            <span className="mt-1 block text-sm text-muted">{tile.note}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** The daily goal: a ring that fills as you answer questions, rate cards and finish lessons today. */
function GoalTile({ progress }: { progress: Progress }) {
  const goal = progress.goal ?? DEFAULT_GOAL
  const done = progress.activity[today()] ?? 0
  const reached = goal > 0 && done >= goal
  return (
    <div className="card flex h-full items-center gap-4 px-5 py-4">
      <Ring value={goal ? done / goal : 0} size={64} stroke={7} label={goal ? `${done} of ${goal} done today` : 'No daily goal set'}>
        {reached ? <Icon name="check" className="text-done" /> : <span className="text-sm font-semibold tabular-nums">{done}</span>}
      </Ring>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Icon name="target" size={18} />
          Daily goal
        </p>
        <p className="mt-0.5 font-semibold leading-snug">
          {goal === 0 ? 'No goal set' : reached ? 'Reached today' : `${done} of ${goal} today`}
        </p>
        <label className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <span className="sr-only">Daily goal: </span>
          <select
            value={goal}
            onChange={(e) => {
              setGoal(Number(e.target.value))
              toast(Number(e.target.value) ? `Daily goal set to ${e.target.value}` : 'Daily goal switched off')
            }}
            className="press rounded border border-edge bg-surface px-1.5 py-1 text-ink hover:border-ink"
          >
            {[0, 10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? 'Off' : `${n} a day`}
              </option>
            ))}
          </select>
          <span title="Every answered question, rated flashcard and completed lesson counts as one.">answers and cards</span>
        </label>
      </div>
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
          <Icon name="plan" className="mr-2" />
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

  const rows: { to: string; icon: IconName; label: string; note: string }[] = [
    ...modules.map(({ item, finishBy }) => ({
      to: `/${course.id}/${item.id}`,
      icon: 'lesson' as const,
      label: `${moduleNumber(course, item.id)} ${item.title}`,
      note: finishBy === now ? 'Finish today' : `Finish by ${formatDay(finishBy, now)}`,
    })),
    ...(mockToday
      ? [
          {
            to: `/${course.id}/exams`,
            icon: 'exam' as const,
            label: mockToday.title,
            note: `Planned for today. Allow ${course.exam.minutes / 60} hours${mockToday.unseen ? ', in real exam mode' : ''}.`,
          },
        ]
      : []),
    ...(missed > 0
      ? [
          {
            to: '/practice',
            icon: 'practice' as const,
            label: `Practice ${missed} missed ${missed === 1 ? 'question' : 'questions'}`,
            note: 'Your latest answer to each was wrong',
          },
        ]
      : []),
  ]

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
          <h3 className="mt-5 text-sm font-medium text-muted">{inReview ? 'Final review: today' : 'To stay on pace today'}</h3>
          <ul className="mt-2 grid gap-3 md:grid-cols-2">
            {rows.map((row) => (
              <li key={row.to + row.label}>
                <Link to={row.to} className="card lift flex h-full min-h-16 items-center gap-3 px-4 py-3">
                  <Icon name={row.icon} className="text-plan" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug">{row.label}</span>
                    <span className="block text-sm text-muted">{row.note}</span>
                  </span>
                  <Icon name="next" size={18} className="text-muted" />
                </Link>
              </li>
            ))}
            {rows.length === 0 && (
              <li className={`${note} py-2`}>
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

function CourseSummary({ course, progress }: { course: Course; progress: Progress }) {
  const exams = getExams(course.id).length
  return (
    <section className={section}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className={sectionTitle}>{course.title}</h2>
        <p className={note}>
          {course.subtitle}. {course.exam.questions} questions in {course.exam.minutes} minutes.
        </p>
      </div>
      <div className="mt-5 max-w-5xl">
        <ExamBlueprint course={course} progress={progress} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to={`/${course.id}`} className={btnQuiet}>
          <Icon name="modules" className="mr-2" />
          All {course.title} modules
        </Link>
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
    </section>
  )
}

/** The four certifications in the order planned, as milestones on a line. */
function CertificationPath({ progress }: { progress: Progress }) {
  return (
    <section className={section}>
      <h2 className={subTitle}>Your certification path</h2>
      <ol className="mt-5 grid grid-cols-4">
        {certifications.map((step, i) => {
          const course = courses.find((c) => c.id === step.id)
          const done = course ? courseCompletion(course, progress) : 0
          return (
            <li key={step.id} className="relative pr-2">
              {i < certifications.length - 1 && <span className="absolute top-[13px] right-0 left-0 h-0.5 bg-line" />}
              <span className="relative block w-fit bg-paper pr-2">
                <Milestone value={done} planned={!course} size={28} />
              </span>
              <span className="title mt-2 block text-lg sm:text-xl">
                {course ? <Link to={`/${course.id}`}>{step.name}</Link> : step.name}
              </span>
              <span className="block text-sm text-muted">{course ? `${percent(done)} complete` : 'Planned'}</span>
            </li>
          )
        })}
      </ol>
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
    a.download = `road-to-pmp-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMessage('Backup downloaded.')
    toast('Backup downloaded')
  }

  async function upload(file: File | undefined) {
    if (!file) return
    try {
      importProgress(await file.text())
      setMessage('Progress restored from backup.')
      toast('Progress restored from backup')
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
      <h2 className={subTitle}>Your saved progress</h2>
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
