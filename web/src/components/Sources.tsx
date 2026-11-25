import { useState } from 'react'
import { Link } from 'react-router-dom'
import { openAccount } from '../lib/account'
import { onThisPc } from '../lib/bookCache'
import { books, loadCardSources, type SourceLink } from '../lib/content'
import { useSync } from '../lib/sync'
import { btnPrimary, link, note } from '../lib/ui'
import { slug } from './LessonContents'
import MessageDialog from './MessageDialog'
import { useLoaded } from '../lib/useLoaded'

// A source link opens the book reader (pages/ReaderPage.tsx) in a new tab, at the source's page. On
// this PC the reader takes the book from your PMI Learning Material folder; on the website from your
// private online copy (lib/books.ts), which needs you to be signed in.

/** A link that opens the book at the source's page in the reader, or asks to sign in first. */
function OpenBook({ source, short = false }: { source: SourceLink; short?: boolean }) {
  const sync = useSync()
  const [askSignIn, setAskSignIn] = useState(false)
  // From the "Sign in first" window straight to the account window of the top bar.
  const signInNow = () => {
    setAskSignIn(false)
    openAccount()
  }
  const title = books[source.book]?.title ?? source.book
  const label = short ? `Open the PDF at page ${source.page}` : `Open ${title} at PDF page ${source.page}`
  if (onThisPc || sync.email) {
    return (
      <a href={`/read/${source.book}?page=${source.page}`} target="_blank" rel="noreferrer" className={link}>
        {label}
      </a>
    )
  }
  return (
    <>
      <button type="button" onClick={() => setAskSignIn(true)} className={`${link} text-left`}>
        {label}
      </button>
      {askSignIn && (
        <MessageDialog
          title="Sign in first"
          onClose={() => setAskSignIn(false)}
          action={
            <button type="button" onClick={signInNow} className={btnPrimary}>
              Sign in
            </button>
          }
        >
          You must sign in first to open the books. Press Sign in, here or at the top right, then click the link again.
        </MessageDialog>
      )}
    </>
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

/**
 * Under a flashcard: the book source of the lesson section it comes from, with its link, and a link to that
 * section. Shown once the card is turned, so it never gives the answer away. Render it with a key per module:
 * the module's links load once.
 */
export function CardSourceLine({ courseId, moduleId, cardId, turned }: { courseId: string; moduleId: string; cardId: string; turned: boolean }) {
  const links = useLoaded(() => loadCardSources(courseId, moduleId))
  const found = links?.[cardId]
  if (!found) return null
  if (!turned) return <p className={`${note} mt-4`}>Turn the card to see where it comes from.</p>
  return (
    <div className="mt-4 space-y-1 border-l-2 border-plan pl-3 font-ui text-sm leading-normal">
      {found.source && (
        <p>
          <span className="text-muted">Source: </span>
          {found.source.label}. <OpenBook source={found.source} short />
        </p>
      )}
      <p>
        <span className="text-muted">In the lesson: </span>
        <Link to={`/${courseId}/${moduleId}#${slug(found.section)}`} className={link}>
          {found.section}
        </Link>
      </p>
    </div>
  )
}
