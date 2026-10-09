import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { allModules, courses, type Course } from '../lib/content'
import {
  exportProgress,
  importProgress,
  moduleCompletion,
  moduleKey,
  resetProgress,
  useProgress,
  type Progress,
} from '../lib/progress'

export function courseCompletion(course: Course, progress: Progress): number {
  const modules = allModules(course)
  const sum = modules.reduce((acc, m) => acc + moduleCompletion(progress, moduleKey(course.id, m.id)), 0)
  return modules.length ? sum / modules.length : 0
}

export default function Home() {
  const progress = useProgress()
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Your certifications</h1>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {courses.map((course) => {
            const modules = allModules(course)
            const ready = modules.filter((m) => m.ready).length
            return (
              <Link
                key={course.id}
                to={`/${course.id}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow"
              >
                <div className="text-xl font-bold text-slate-900">{course.title}</div>
                <div className="text-sm text-slate-500">{course.subtitle}</div>
                <div className="mt-3 text-sm text-slate-600">
                  {ready} of {modules.length} modules available · exam: {course.exam.questions} questions,{' '}
                  {course.exam.minutes} minutes
                </div>
                <ProgressBar value={courseCompletion(course, progress)} className="mt-4" />
              </Link>
            )
          })}
        </div>
      </section>
      <Backup />
    </div>
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
  }

  async function upload(file: File | undefined) {
    if (!file) return
    try {
      importProgress(await file.text())
      setMessage('Progress restored.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not read that file.')
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  function reset() {
    if (window.confirm('Delete all progress saved in this browser? This cannot be undone.')) {
      resetProgress()
      setMessage('Progress cleared.')
    }
  }

  const button = 'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100'
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold text-slate-900">Progress backup</h2>
      <p className="mt-1 text-sm text-slate-600">
        Progress is saved in this browser only. Download a backup to keep it safe or to move it to another device.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className={button} onClick={download}>
          Download backup
        </button>
        <button className={button} onClick={() => fileInput.current?.click()}>
          Restore from backup
        </button>
        <button className={`${button} text-red-700`} onClick={reset}>
          Reset progress
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => upload(e.target.files?.[0])}
        />
      </div>
      {message && <p className="mt-2 text-sm text-slate-600">{message}</p>}
    </section>
  )
}
