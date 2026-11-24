import { callSignedIn } from './sync'
import { SUPABASE_URL } from './syncConfig'

// Opening a book on the website. The PDFs are in a private storage place in your Supabase
// project (supabase/books.sql), readable by any signed-in account and by nobody signed out.
//
// Each book gets a private link that works for 7 days. The link is kept in this browser and used
// again, so the browser can reuse its own copy of the book instead of downloading it again. Only a
// new link is counted: the project records the whole book's size and refuses new links once the
// month reaches 4 GB, which keeps the downloads under the free plan's 5 GB a month.

const KEY = 'road-to-pmi-book-links'
const LIFETIME_S = 7 * 24 * 3600
/** A saved link is used only if it still has at least this long to run. */
const MARGIN_MS = 3600 * 1000
/** Above this, opening a book also shows how much of the month's 4 GB is used. */
export const WARN_BYTES = 3_000_000_000

interface SavedLink {
  url: string
  expires: number
}

function load(): Record<string, SavedLink> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

function keep(book: string, link: SavedLink) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...load(), [book]: link }))
  } catch {
    // used for this visit only
  }
}

/** Forgets a saved link that stopped working, so the next opening makes a new one. */
export function forgetLink(book: string) {
  try {
    const links = load()
    delete links[book]
    localStorage.setItem(KEY, JSON.stringify(links))
  } catch {
    // nothing saved
  }
}

export interface BookLink {
  url: string
  /** Bytes counted this month, when a new link was made. */
  used?: number
  cap?: number
}

/** A sentence a person can act on, for a refusal from the project. */
export function bookError(message: string): string {
  if (/sign in first|not signed in/i.test(message)) return 'You must sign in first to open the books. Press Sign in at the top right, then click the link again.'
  if (/not a book reader/i.test(message)) {
    return 'The online books still use the earlier readers list. Run the new supabase/books.sql in the Supabase SQL editor once (see docs/ACCOUNTS.md).'
  }
  if (/monthly limit reached/i.test(message)) {
    const next = new Date()
    next.setUTCMonth(next.getUTCMonth() + 1, 1)
    const day = next.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    return `The online books are paused until ${day}: this month's 4 GB of book downloads is used up, which keeps the project inside Supabase's free plan. Books you opened in the last 7 days still open, and on your PC every book opens as usual.`
  }
  const missing = /book not uploaded: ([a-z0-9-]+)/i.exec(message)
  if (missing) return `This book is not in the online storage yet. Upload ${missing[1]}.pdf into "books" in the Supabase dashboard.`
  if (/open_book|could not find the function/i.test(message)) {
    return 'The online books are not set up yet. Run supabase/books.sql in the Supabase SQL editor once (see the guide).'
  }
  return message
}

/** A link to the book's PDF, from this browser when one is still valid, otherwise a new one. */
export async function bookLink(book: string): Promise<BookLink> {
  const saved = load()[book]
  if (saved && saved.expires - Date.now() > MARGIN_MS) return { url: saved.url }
  const counted: { used: number; cap: number } = await callSignedIn('/rest/v1/rpc/open_book', { method: 'POST', body: { book } })
  const signed: { signedURL: string } = await callSignedIn(`/storage/v1/object/sign/books/${encodeURIComponent(book)}.pdf`, {
    method: 'POST',
    body: { expiresIn: LIFETIME_S },
  })
  const url = `${SUPABASE_URL}/storage/v1${signed.signedURL}`
  keep(book, { url, expires: Date.now() + LIFETIME_S * 1000 })
  return { url, used: counted.used, cap: counted.cap }
}
