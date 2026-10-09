import { books, loadSources, type SourceLink } from '../lib/content'
import { link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

// The PDFs are served only by the local dev server (see vite.config.ts). They are
// copyrighted and are not part of the published site, so links exist only on this PC.
const canOpenBooks = import.meta.env.DEV

/** One source: its text reference, and a link that opens the book's PDF at that page. */
export function SourceItem({ source }: { source: SourceLink }) {
  const title = books[source.book]?.title ?? source.book
  return (
    <span>
      {source.label}
      <span className="mt-0.5 block">
        {canOpenBooks ? (
          <a href={`/books/${source.book}.pdf#page=${source.page}`} target="_blank" rel="noreferrer" className={link}>
            Open {title} at PDF page {source.page}
          </a>
        ) : (
          <span className="text-muted">
            {title}, PDF page {source.page}
          </span>
        )}
      </span>
    </span>
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
          <li key={`${source.book}-${source.page}`}>
            <SourceItem source={source} />
          </li>
        ))}
      </ul>
    </section>
  )
}
