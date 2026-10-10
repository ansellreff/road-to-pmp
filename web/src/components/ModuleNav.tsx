import { Link } from 'react-router-dom'
import type { Course, Domain } from '../lib/content'
import { knownCount, moduleCompletion, moduleKey, useProgress } from '../lib/progress'
import { percent } from '../lib/stats'
import { StatusCounts } from './FlipCard'
import Icon, { type IconName } from './Icon'
import Milestone from './Milestone'
import { PanelBlock } from './SidePanel'

/** The modules of one domain, for the side panel: where you are in the course, as a course outline. */
export function DomainModules({ course, domain, current }: { course: Course; domain: Domain; current: string }) {
  const progress = useProgress()
  const d = course.domains.indexOf(domain) + 1
  return (
    <PanelBlock title={`Domain ${d}: ${domain.title}`}>
      <ol>
        {domain.modules.map((m, j) => {
          if (!m.ready) return null
          const here = m.id === current
          const value = moduleCompletion(progress, moduleKey(course.id, m.id))
          return (
            <li key={m.id}>
              <Link
                to={`/${course.id}/${m.id}`}
                aria-current={here ? 'page' : undefined}
                className={`press flex min-h-9 items-start gap-2 rounded-md px-2 py-1.5 text-[0.9375rem] leading-snug hover:bg-plan-soft hover:text-plan ${
                  here ? 'bg-plan-soft font-semibold text-plan' : ''
                }`}
              >
                <span className="mt-0.5">
                  <Milestone value={value} size={15} />
                </span>
                <span className="w-7 shrink-0 tabular-nums text-muted">
                  {d}.{j + 1}
                </span>
                <span>
                  {m.title}
                  <span className="sr-only">, {percent(value)} complete</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
      <Link to={`/${course.id}`} className="press mt-2 block px-2 py-1.5 text-sm font-medium text-plan underline-offset-4 hover:underline">
        All {course.title} modules
      </Link>
    </PanelBlock>
  )
}

/** What is done in this module: lesson, quiz, flashcards. Each line links to that part. */
export function ModuleStatus({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const progress = useProgress()
  const key = moduleKey(courseId, moduleId)
  const quiz = progress.quizzes[key]
  const deck = progress.cardTotals[key]
  const known = knownCount(progress, key)
  const rated = Object.keys(progress.cards[key] ?? {}).length
  const base = `/${courseId}/${moduleId}`
  const rows: { to: string; icon: IconName; label: string; note: string; done: boolean }[] = [
    { to: base, icon: 'lesson', label: 'Lesson', note: progress.lessons[key] ? 'Completed' : 'Not completed', done: Boolean(progress.lessons[key]) },
    {
      to: `${base}/quiz`,
      icon: 'quiz',
      label: 'Quiz',
      note: quiz ? `Best ${quiz.best} of ${quiz.total}` : 'Not taken',
      done: Boolean(quiz && quiz.best / quiz.total >= 0.7),
    },
    {
      to: `${base}/flashcards`,
      icon: 'cards',
      label: 'Flashcards',
      note: deck ? `${known} of ${deck} known` : 'Not started',
      done: Boolean(deck && known >= deck),
    },
  ]
  return (
    <PanelBlock title={`This module: ${percent(moduleCompletion(progress, key))} complete`}>
      <ul>
        {rows.map((row) => (
          <li key={row.label}>
            <Link to={row.to} className="press flex min-h-10 items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-plan-soft hover:text-plan">
              <Icon name={row.done ? 'check' : row.icon} className={row.done ? 'text-done' : 'text-muted'} />
              <span className="flex-1 font-medium">{row.label}</span>
              <span className="text-sm text-muted">{row.note}</span>
            </Link>
          </li>
        ))}
      </ul>
      {deck ? (
        <div className="mt-2 px-2">
          <StatusCounts counts={{ known, learning: rated - known, new: Math.max(0, deck - rated) }} />
        </div>
      ) : null}
    </PanelBlock>
  )
}

export interface Step {
  to: string
  /** "Take the quiz", "Next module" */
  label: string
  /** The name of what it leads to, when the label alone does not say. */
  title?: string
}

/** Where to go next, and a smaller way back. The same on every study page, so there is never a dead end. */
export function StepNav({ previous, next }: { previous?: Step; next?: Step }) {
  return (
    <nav aria-label="Previous and next" className="mt-10 flex flex-wrap items-stretch justify-between gap-3 border-t border-line pt-6 print:hidden">
      {previous ? (
        <Link to={previous.to} className="press flex min-h-14 items-center gap-3 rounded-lg border border-edge bg-surface px-4 py-2 hover:border-ink hover:bg-plan-soft">
          <Icon name="previous" />
          <span>
            <span className="block text-sm text-muted">{previous.label}</span>
            {previous.title && <span className="block font-medium">{previous.title}</span>}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next.to}
          className="press flex min-h-14 items-center gap-3 rounded-lg bg-plan px-5 py-2 text-on-plan shadow-[var(--shadow-card)] hover:bg-plan-strong"
        >
          <span className="text-right">
            <span className="block text-sm opacity-90">{next.label}</span>
            {next.title && <span className="block font-semibold">{next.title}</span>}
          </span>
          <Icon name="next" />
        </Link>
      )}
    </nav>
  )
}
