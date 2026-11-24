import { useState } from 'react'
import { bookError, bookLink, WARN_BYTES } from '../lib/books'
import { books, loadSources, type SourceLink } from '../lib/content'
import { useSync } from '../lib/sync'
import { column, link, note, section, subTitle } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

// On this PC the local dev server serves the PDFs from your PMI Learning Material folder (see
// vite.config.ts). On the website they come from your private online storage (see lib/books.ts),
// once you are signed in with the account on its readers list.
const onThisPc = import.meta.env.DEV

const gigabytes = (bytes: number) => (bytes / 1_000_000_000).toFixed(1)

/** A link that opens the book's PDF at the source's page, or plain text where the PDFs are not available. */
function OpenBook({ source, short = false }: { source: SourceLink; short?: boolean }) {
  const sync = useSync()
  const [message, setMessage] = useState<{ text: string; error: boolean }>()
  const title = books[source.book]?.title ?? source.book
  const label = short ? `Open the PDF at page ${source.page}` : `Open ${title} at PDF page ${source.page}`
  if (onThisPc) {
    return (
      <a href={`/books/${source.book}.pdf#page=${source.page}`} target="_blank" rel="noreferrer" className={link}>
        {label}
      </a>
    )
  }
  if (!sync.email) {
    return (
      <span className="text-muted">
        {short ? '' : `${title}, `}PDF page {source.page}
      </span>
    )
  }

  async function open() {
    setMessage(undefined)
    // The tab opens at once, inside the click, so the browser does not block it; the book follows.
    const tab = window.open('about:blank', '_blank')
    try {
      const found = await bookLink(source.book)
      const url = `${found.url}#page=${source.page}`
      if (tab) {
        tab.opener = null
        tab.location.href = url
      } else {
        window.location.href = url
      }
      if (found.used !== undefined && found.cap !== undefined && found.used > WARN_BYTES) {
        setMessage({ text: `Book downloads this month: ${gigabytes(found.used)} of ${gigabytes(found.cap)} GB.`, error: false })
      }
    } catch (error) {
      tab?.close()
      setMessage({ text: bookError((error as Error).message, sync.email), error: true })
    }
  }

  return (
    <>
      <button type="button" onClick={() => void open()} className={`${link} text-left`}>
        {label}
      </button>
      {message && (
        <span role={message.error ? 'alert' : 'status'} className={`mt-1 block ${message.error ? 'text-critical' : 'text-muted'}`}>
          {message.text}
        </span>
      )}
    </>
  )
}

/** What the source links do here, in one sentence. */
function sourcesNote(signedIn: boolean): string {
  if (onThisPc) return 'Each link opens the PDF from your PMI Learning Material folder in a new tab, at the page where that section starts.'
  if (signedIn) {
    return 'Each link opens the PDF from your private online copy in a new tab, at the page where that section starts. The first time on a device, the whole book downloads.'
  }
  return 'Sign in on the home page to open the PDFs here. Without signing in, they open only when you run the platform on your own PC.'
}

/** One source: its text reference, with the link on the line below. */
export function SourceItem({ source }: { source: SourceLink }) {
  return (
    <span>
      {source.label}
      <span className="mt-0.5 block">
        <OpenBook source={source} />
      </span>
    </span>
  )
}

/**
 * The sources of one lesson section, shown directly under its heading.
 * refs is the text after "@source" in the lesson: references separated by semicolons.
 */
export function SectionSources({ refs, sources }: { refs: string; sources: SourceLink[] }) {
  const labels = refs
    .split(';')
    .map((label) => label.trim())
    .filter(Boolean)
  return (
    <div className="mb-5 space-y-1 border-l-2 border-plan pl-3 font-ui text-sm leading-normal">
      {labels.map((label) => {
        const source = sources.find((s) => s.label === label)
        return (
          <div key={label}>
            <span className="text-muted">Source: </span>
            {label}
            {source && (
              <>
                {'. '}
                <OpenBook source={source} short />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

/** The list of book sections a whole module is drawn from. */
export default function ModuleSources({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const sources = useLoaded(() => loadSources(courseId, moduleId))
  const sync = useSync()
  if (!sources?.length) return null
  return (
    <section className={`${section} ${column} mt-16`}>
      <h2 className={subTitle}>Sources for this module</h2>
      <p className={`${note} mt-1`}>{sourcesNote(Boolean(sync.email))}</p>
      <ul className="mt-3 space-y-3 text-sm">
        {sources.map((source) => (
          <li key={source.label}>
            <SourceItem source={source} />
          </li>
        ))}
      </ul>
    </section>
  )
}
