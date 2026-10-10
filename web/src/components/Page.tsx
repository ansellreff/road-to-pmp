import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { intro, link, pageTitle, pageTitleLong } from '../lib/ui'

/** The top of every page: where you came from, the page name, and one line on what it is for. */
export function PageHeader(props: {
  back?: { to: string; label: string }
  eyebrow?: ReactNode
  title: ReactNode
  /** A long title, such as a module name, is set one size smaller. */
  long?: boolean
  children?: ReactNode
}) {
  const { back, eyebrow, title, long, children } = props
  return (
    <header>
      {back && (
        <Link to={back.to} className={`${link} text-sm`}>
          {back.label}
        </Link>
      )}
      {eyebrow && <p className="mt-4 text-sm text-muted">{eyebrow}</p>}
      <h1 className={`${long ? pageTitleLong : pageTitle} ${eyebrow ? 'mt-1' : back ? 'mt-3' : ''} max-w-3xl`}>{title}</h1>
      {children && <p className={intro}>{children}</p>}
    </header>
  )
}

export interface Figure {
  label: string
  value: string
  note: string
}

/** A row of headline numbers, each with a label above and a remark below. */
export function Figures({ items, underHeading = false }: { items: Figure[]; underHeading?: boolean }) {
  return (
    // Straight under a ruled heading the top rule is left out, so there is one line, not two.
    <dl className={`grid gap-x-8 gap-y-6 border-b-2 border-ink py-5 sm:grid-cols-3 ${underHeading ? '' : 'border-t-2'}`}>
      {items.map((f) => (
        <div key={f.label}>
          <dt className="text-sm text-muted">{f.label}</dt>
          <dd className="title mt-1 text-3xl tabular-nums">{f.value}</dd>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{f.note}</dd>
        </div>
      ))}
    </dl>
  )
}

const tones = {
  done: 'border-done bg-done-soft',
  plan: 'border-plan bg-plan-soft',
  critical: 'border-critical bg-critical-soft',
  milestone: 'border-milestone bg-milestone-soft',
}

/** A boxed message: nothing left to do, a warning, or something to know before starting. */
export function Notice(props: { tone?: keyof typeof tones; title?: string; children?: ReactNode }) {
  const { tone = 'done', title, children } = props
  return (
    <div className={`rounded-lg border-l-4 px-5 py-4 ${tones[tone]}`} role="status">
      {title && <p className="title text-xl">{title}</p>}
      {children && <p className={`${title ? 'mt-1' : ''} leading-relaxed text-ink`}>{children}</p>}
    </div>
  )
}

/** A bar that fills from the left. value is 0..1. */
export function Meter({ value, className = 'h-2.5' }: { value: number; className?: string }) {
  const width = `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`
  return (
    <span className={`meter ${className}`} aria-hidden="true">
      <span style={{ width }} />
    </span>
  )
}

/** Loading and "nothing here" lines. */
export function Waiting({ children }: { children: ReactNode }) {
  return <p className="text-muted">{children}</p>
}
