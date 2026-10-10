import { useEffect, useState } from 'react'

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

function SectionList({ headings, current, onGo }: { headings: Heading[]; current?: string; onGo?: () => void }) {
  return (
    <ol className="space-y-0.5">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={heading.id === current ? 'location' : undefined}
            onClick={(event) => {
              event.preventDefault()
              scrollToSection(heading.id)
              history.replaceState(null, '', `#${heading.id}`)
              onGo?.()
            }}
            className={`press block border-l-2 py-1.5 pl-3 text-sm leading-snug hover:text-plan ${
              heading.id === current ? 'border-plan font-semibold text-plan' : 'border-line text-muted'
            }`}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * The list of a lesson's sections. On a very wide screen it stands beside the lesson.
 * Otherwise it is a bar that stays at the top of the window and folds out.
 */
export default function LessonContents({ headings, current }: { headings: Heading[]; current?: string }) {
  const [open, setOpen] = useState(false)
  if (headings.length < 2) return null
  const now = headings.find((h) => h.id === current)
  return (
    <>
      <nav aria-label="Sections of this lesson" className="absolute top-0 left-full ml-10 hidden h-full w-56 2xl:block">
        <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
          <p className="mb-2 text-sm font-semibold">In this lesson</p>
          <SectionList headings={headings} current={current} />
        </div>
      </nav>

      <nav
        aria-label="Sections of this lesson"
        className="sticky top-0 z-10 -mx-4 mb-6 border-b border-line bg-paper px-4 sm:-mx-6 sm:px-6 2xl:hidden"
      >
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="press flex min-h-11 w-full items-center justify-between gap-4 text-left text-sm"
        >
          <span className="min-w-0 truncate">
            <span className="font-semibold">In this lesson</span>
            {now && <span className="text-muted">: {now.title}</span>}
          </span>
          <span className="shrink-0 text-muted">{open ? 'Hide sections' : 'Show sections'}</span>
        </button>
        {open && (
          <div className="max-h-[60vh] overflow-y-auto pb-3">
            <SectionList headings={headings} current={current} onGo={() => setOpen(false)} />
          </div>
        )}
      </nav>
    </>
  )
}
