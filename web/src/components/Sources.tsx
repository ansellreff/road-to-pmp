import { books, loadSources, type SourceLink } from '../lib/content'
import { link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

// The PDFs are served only by the local dev server (see vite.config.ts). They are
// copyrighted and are not part of the published site, so links exist only on this PC.
const canOpenBooks = import.meta.env.DEV

/** A link that opens the book's PDF at the source's page, or plain text where the PDFs are not available. */
function OpenBook({ source, short = false }: { source: SourceLink; short?: boolean }) {
  const title = books[source.book]?.title ?? source.book
  if (!canOpenBooks) {
    return (
      <span className="text-muted">
        {short ? '' : `${title}, `}PDF page {source.page}
      </span>
    )
  }
  return (
    <a href={`/books/${source.book}.pdf#page=${source.page}`} target="_blank" rel="noreferrer" className={link}>
      {short ? `Open the PDF at page ${source.page}` : `Open ${title} at PDF page ${source.page}`}
    </a>
  )
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
  if (!sources?.length) return null
  return (
    <section className="mt-10 max-w-3xl border-t border-line pt-5">
      <h2 className="title text-xl">Sources for this module</h2>
      <p className="mt-1 text-sm text-muted">
        {canOpenBooks
          ? 'Each link opens the PDF from your PMI Learning Material folder in a new tab, at the page where that section starts.'
          : 'The PDFs open only when you run the platform on your own PC. They are not uploaded to the website.'}
      </p>
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
