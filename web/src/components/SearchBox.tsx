import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { allModules, courses } from '../lib/content'
import { loadSearchIndex, search, searchWords, type SearchEntry, type SearchHit } from '../lib/search'
import { moduleNumber } from '../lib/stats'
import Icon, { type IconName } from './Icon'

// How many suggestions of each kind are listed. "See all results" shows the rest.
const SHOWN = { module: 4, lesson: 5, card: 3 }
const groups: { kind: SearchEntry['kind']; label: string; icon: IconName }[] = [
  { kind: 'module', label: 'Modules', icon: 'modules' },
  { kind: 'lesson', label: 'Lesson sections', icon: 'lesson' },
  { kind: 'card', label: 'Flashcards', icon: 'cards' },
]

// Module titles are already in memory, so they can be suggested before the search file arrives.
const moduleEntries: SearchEntry[] = courses.flatMap((course) =>
  allModules(course)
    .filter((m) => m.ready)
    .map((m) => ({
      kind: 'module' as const,
      module: course.title,
      title: `${moduleNumber(course, m.id)} ${m.title}`,
      text: '',
      to: `/${course.id}/${m.id}`,
    })),
)

/** The text with the searched words in bold. */
function Marked({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return (
    <>
      {text.split(pattern).map((piece, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-plan">
            {piece}
          </strong>
        ) : (
          piece
        ),
      )}
    </>
  )
}

/** The search box in the top bar. Suggestions appear under it while you type. */
export default function SearchBox() {
  const navigate = useNavigate()
  const location = useLocation()
  const listId = useId()
  const box = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [entries, setEntries] = useState<SearchEntry[]>(moduleEntries)

  // Fetch the search file in the background once the page is idle, so typing is answered at once.
  useEffect(() => {
    const load = () => loadSearchIndex().then(setEntries)
    const idle = window.requestIdleCallback?.(load, { timeout: 3000 }) ?? window.setTimeout(load, 1200)
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(idle) : window.clearTimeout(idle))
  }, [])

  // Going to another page closes the list and empties the box.
  useEffect(() => {
    setOpen(false)
    setQuery('')
  }, [location.pathname, location.hash])

  useEffect(() => {
    const outside = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  const words = searchWords(query)
  const hits = useMemo(() => {
    const all = search(entries, query, 200)
    return groups.flatMap((g) => all.filter((h) => h.entry.kind === g.kind).slice(0, SHOWN[g.kind]))
  }, [entries, query])
  // One more row at the end: all results on the search page.
  const rows = words.length ? hits.length + 1 : 0
  const showing = open && words.length > 0

  function go(hit?: SearchHit) {
    setOpen(false)
    navigate(hit ? hit.entry.to : `/search?q=${encodeURIComponent(query.trim())}`)
  }

  function onKey(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setOpen(false)
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!rows) return
      event.preventDefault()
      setOpen(true)
      setActive((active + (event.key === 'ArrowDown' ? 1 : rows - 1)) % rows)
    } else if (event.key === 'Enter' && words.length) {
      event.preventDefault()
      go(showing ? hits[active] : undefined)
    }
  }

  return (
    <div ref={box} className="relative w-full sm:max-w-md" role="search">
      <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
      <input
        type="search"
        role="combobox"
        aria-label="Search lessons and flashcards"
        aria-expanded={showing}
        aria-controls={listId}
        aria-activedescendant={showing ? `${listId}-${active}` : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        value={query}
        placeholder="Search lessons and flashcards"
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => {
          setOpen(true)
          loadSearchIndex().then(setEntries)
        }}
        onKeyDown={onKey}
        className="press min-h-11 w-full rounded-md border border-edge bg-paper py-2 pr-3 pl-10 text-ink placeholder:text-muted hover:border-ink"
      />
      {showing && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Suggestions"
          className="absolute top-full right-0 left-0 z-40 mt-1 max-h-[70vh] overflow-y-auto rounded-md border border-edge bg-surface py-1 shadow-[var(--shadow-raised)] sm:min-w-[28rem]"
        >
          {hits.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted" role="presentation">
              No module, section or flashcard matches "{query.trim()}" so far.
            </li>
          )}
          {groups.map((group) => {
            const own = hits.filter((h) => h.entry.kind === group.kind)
            if (!own.length) return null
            return (
              <li key={group.kind} role="presentation">
                <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted">{group.label}</p>
                <ul role="presentation">
                  {own.map((hit) => {
                    const i = hits.indexOf(hit)
                    return (
                      <li
                        key={i}
                        id={`${listId}-${i}`}
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        // mousedown, not click, so the choice is taken before the box loses focus
                        onMouseDown={(event) => {
                          event.preventDefault()
                          go(hit)
                        }}
                        className={`flex cursor-pointer gap-3 px-4 py-2 ${i === active ? 'bg-plan-soft' : ''}`}
                      >
                        <Icon name={group.icon} className="mt-0.5 text-muted" />
                        <span className="min-w-0">
                          <span className="block leading-snug">
                            <Marked text={hit.entry.title} words={words} />
                          </span>
                          {/* A section found by its text, not its heading, shows the line that matched. */}
                          {hit.entry.kind === 'lesson' && !words.some((w) => hit.entry.title.toLowerCase().includes(w)) && (
                            <span className="mt-0.5 block truncate text-sm">
                              <Marked text={hit.snippet} words={words} />
                            </span>
                          )}
                          {hit.entry.kind === 'card' && (
                            <span className="mt-0.5 block text-sm leading-snug text-ink">{hit.entry.text}</span>
                          )}
                          <span className="block truncate text-sm text-muted">{hit.entry.module}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
          <li
            id={`${listId}-${hits.length}`}
            role="option"
            aria-selected={active === hits.length}
            onMouseEnter={() => setActive(hits.length)}
            onMouseDown={(event) => {
              event.preventDefault()
              go()
            }}
            className={`mt-1 cursor-pointer border-t border-line px-4 py-2.5 text-sm font-medium text-plan ${
              active === hits.length ? 'bg-plan-soft' : ''
            }`}
          >
            See all results for "{query.trim()}"
          </li>
        </ul>
      )}
    </div>
  )
}
