import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ExamBlueprint from '../components/ExamBlueprint'
import Milestone from '../components/Milestone'
import { allModules, courses, type Course } from '../lib/content'
import { dueCount, exportProgress, importProgress, resetProgress, useProgress, type Progress } from '../lib/progress'
import { courseCompletion, moduleNumber, nextModule, percent } from '../lib/stats'
import { btnDanger, btnPrimary, btnQuiet, link } from '../lib/ui'

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
        <h1 className="title text-4xl sm:text-5xl">Your certification path</h1>
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

      <DueCards due={dueCount(progress)} />

      {courses.map((course) => (
        <CourseSummary key={course.id} course={course} progress={progress} />
      ))}

      <Backup />
    </div>
  )
}

function DueCards({ due }: { due: number }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
      <div>
        <h2 className="title text-2xl">
          {due ? `${due} ${due === 1 ? 'flashcard is' : 'flashcards are'} due for review` : 'No flashcards due today'}
        </h2>
        <p className="mt-1 max-w-xl text-sm text-muted">
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
  return (
    <section className="border-t-2 border-ink pt-6">
      <h2 className="title text-3xl">{course.title}</h2>
      <p className="text-muted">
        {course.subtitle}. {course.exam.questions} questions in {course.exam.minutes} minutes.
      </p>
      <div className="mt-6">
        <ExamBlueprint course={course} progress={progress} />
      </div>
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
    <section className="border-t border-line pt-6">
      <h2 className="title text-xl">Your saved progress</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
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
