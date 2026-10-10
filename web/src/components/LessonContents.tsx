import { useEffect, useState } from 'react'
import Icon from './Icon'

export interface Heading {
  id: string
  title: string
}

/** "Flow metrics" -> "flow-metrics". Used for a section's address inside a lesson. */
export function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** The sections of a lesson: its "## " headings, without markdown marks. */
export function lessonHeadings(lesson: string): Heading[] {
  return [...lesson.matchAll(/^## (.+)$/gm)].map((match) => {
    const title = match[1].replace(/[*`]/g, '').trim()
    return { id: slug(title), title }
  })
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

/** The section being read: the last heading that has passed the top of the window. */
export function useCurrentSection(headings: Heading[]): string | undefined {
  const [current, setCurrent] = useState<string>()
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let found: string | undefined
      for (const heading of headings) {
        const top = document.getElementById(heading.id)?.getBoundingClientRect().top
        if (top !== undefined && top < 140) found = heading.id
      }
      setCurrent(found)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [headings])
  return current
}

/**
 * The sections of the lesson as a list for the side panel. The one being read is
 * marked, and the ones above it are ticked as read.
 */
export default function SectionList({ headings, current }: { headings: Heading[]; current?: string }) {
  const at = headings.findIndex((h) => h.id === current)
  return (
    <ol>
      {headings.map((heading, i) => {
        const here = i === at
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={here ? 'location' : undefined}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(heading.id)
                history.replaceState(null, '', `#${heading.id}`)
              }}
              className={`press flex min-h-9 items-start gap-2 rounded-md px-2 py-1.5 text-[0.9375rem] leading-snug hover:bg-plan-soft hover:text-plan ${
                here ? 'bg-plan-soft font-semibold text-plan' : i < at ? 'text-muted' : ''
              }`}
            >
              <span className="mt-0.5 flex w-4 shrink-0 justify-center">
                {i < at ? (
                  <Icon name="check" size={16} className="text-done" />
                ) : (
                  <span className={`mt-1.5 size-1.5 rounded-full ${here ? 'bg-plan' : 'bg-edge'}`} />
                )}
              </span>
              <span>
                {heading.title}
                {i < at && <span className="sr-only"> (read)</span>}
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
