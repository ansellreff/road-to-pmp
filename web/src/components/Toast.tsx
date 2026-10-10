import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { courses } from '../lib/content'
import { milestones } from '../lib/milestones'
import { markMilestonesShown, studyStreak, today, useProgress } from '../lib/progress'
import { dismissToast, toast, useToasts } from '../lib/toast'
import Icon from './Icon'

/** The messages at the bottom of the screen. Read out by screen readers, gone after a few seconds. */
export function Toaster() {
  const messages = useToasts()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 print:hidden" role="status" aria-live="polite">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`toast pointer-events-auto flex max-w-md items-center gap-3 rounded-lg border px-4 py-3 shadow-[var(--shadow-raised)] ${
            m.kind === 'milestone' ? 'border-milestone bg-milestone-soft' : 'border-ink bg-ink text-paper'
          }`}
        >
          <Icon name={m.kind === 'milestone' ? 'trophy' : 'check'} className={m.kind === 'milestone' ? 'pop text-milestone' : ''} />
          <span className="font-medium">{m.text}</span>
          <button onClick={() => dismissToast(m.id)} aria-label="Dismiss this message" className="press -mr-1 ml-1 rounded p-1 opacity-80 hover:opacity-100">
            <Icon name="close" size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

/**
 * Announces a milestone the first time it is reached. Nothing is announced while a mock
 * exam is open: those screens stay calm, and the message waits until you leave them.
 */
export function MilestoneWatcher() {
  const progress = useProgress()
  const { pathname } = useLocation()
  const inExam = /\/exams\/[^/]+/.test(pathname)

  useEffect(() => {
    const earned = courses.flatMap((course) => milestones(course, progress).filter((m) => m.earned))
    // The first time this runs for an existing learner, what is already earned is noted without fanfare.
    if (progress.milestonesShown === undefined) {
      markMilestonesShown(earned.map((m) => m.id))
      return
    }
    if (inExam) return
    const fresh = earned.filter((m) => !progress.milestonesShown!.includes(m.id))
    if (!fresh.length) return
    markMilestonesShown(fresh.map((m) => m.id))
    fresh.forEach((m) => toast(`Milestone reached: ${m.title}`, 'milestone'))
  }, [progress, inExam])

  return null
}

/** The study streak, in the top bar on every page. */
export function StreakChip() {
  const progress = useProgress()
  const streak = studyStreak(progress)
  const done = Boolean(progress.activity[today()])
  return (
    <Link
      to="/dashboard"
      title={done ? 'You have studied today.' : 'Study today to keep your streak.'}
      className={`press flex h-9 items-center gap-1.5 rounded-md border px-2.5 text-sm font-semibold tabular-nums hover:border-ink ${
        done ? 'border-milestone bg-milestone-soft text-ink' : 'border-edge bg-surface text-muted'
      }`}
    >
      <Icon name="streak" size={16} className={done ? 'text-milestone' : ''} />
      {streak}
      <span className="sr-only">{streak === 1 ? ' day study streak' : ' days study streak'}</span>
    </Link>
  )
}
