import { useSyncExternalStore } from 'react'
import { BOOK_CACHE, removeSavedBooks } from './bookCache'
import { bookLink, forgetLink } from './books'

// Books saved on this device. The first time a book opens on the website, the whole book is fetched
// once and kept in the browser's storage place for this website; every later opening reads it from
// there, so it opens at once. Settings can save every book in one go, and remove them again.
// Signing out removes them (sync.ts), because the books are for signed-in accounts only.

/** The size of all the books together, for the Settings page. */
export const ALL_BOOKS_MB = 160

export interface Progress {
  received: number
  /** 0 when the size is not known yet. */
  total: number
}

export interface SavedBook {
  data: ArrayBuffer
  /** Bytes counted this month, when a new link was made. */
  used?: number
  cap?: number
}

/** Each book is kept under its own address on this website, which no page serves. */
const key = (book: string) => `/saved-books/${book}.pdf`

const available = () => typeof caches !== 'undefined'

// The pages that list the saved books hear about every change.
let version = 0
const listeners = new Set<() => void>()
function changed() {
  version += 1
  for (const listener of listeners) listener()
}
export function useBookChanges(): number {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => version,
  )
}

/** The saved copy of a book on this device, if there is one. */
export async function savedBook(book: string): Promise<ArrayBuffer | undefined> {
  if (!available()) return undefined
  try {
    const found = await (await caches.open(BOOK_CACHE)).match(key(book))
    return found ? await found.arrayBuffer() : undefined
  } catch {
    return undefined
  }
}

/** The books saved on this device, with their size in bytes. */
export async function savedBooks(): Promise<Record<string, number>> {
  if (!available()) return {}
  const cache = await caches.open(BOOK_CACHE)
  const sizes: Record<string, number> = {}
  for (const request of await cache.keys()) {
    const book = /\/saved-books\/(.+)\.pdf$/.exec(new URL(request.url).pathname)?.[1]
    const found = book && (await cache.match(request))
    if (book && found) sizes[book] = Number(found.headers.get('Content-Length')) || 0
  }
  return sizes
}

/** A message a person can act on, for a failed download. */
function failure(status: number): Error {
  if (status === 400 || status === 403) return new Error('The link to this book stopped working. Open the book again to get a new one.')
  return new Error(`The book could not be fetched (error ${status}). Check the internet connection and try again.`)
}

/**
 * Fetches the whole book once and keeps it on this device. The fetch is counted against the month's
 * 4 GB like any new link (books.ts). If the device has no room, the book still opens this time.
 */
export async function saveBook(book: string, onProgress?: (p: Progress) => void, signal?: AbortSignal): Promise<SavedBook> {
  const link = await bookLink(book)
  const response = await fetch(link.url, { signal })
  if (!response.ok) {
    if (response.status === 400 || response.status === 403) forgetLink(book)
    throw failure(response.status)
  }
  const total = Number(response.headers.get('Content-Length')) || 0
  const parts: Uint8Array[] = []
  let received = 0
  const reader = response.body?.getReader()
  if (reader) {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      parts.push(value)
      received += value.length
      onProgress?.({ received, total })
    }
  }
  const blob = reader ? new Blob(parts as BlobPart[], { type: 'application/pdf' }) : await response.blob()
  if (available()) {
    try {
      // Ask the browser to keep the saved books when the device runs short of space.
      void navigator.storage?.persist?.()
      await (await caches.open(BOOK_CACHE)).put(
        key(book),
        new Response(blob, { headers: { 'Content-Type': 'application/pdf', 'Content-Length': String(blob.size) } }),
      )
      changed()
    } catch {
      // No room on this device: the book opens this time and is fetched again next time.
    }
  }
  return { data: await blob.arrayBuffer(), used: link.used, cap: link.cap }
}

/** Megabytes, for the progress lines: "12 of 27 MB". */
export function megabytes(bytes: number): string {
  const mb = bytes / 1_000_000
  return mb < 10 ? mb.toFixed(1) : String(Math.round(mb))
}

/** Removes the chosen books from this device (Settings), or every book when none are named, and tells the open pages. */
export async function removeBooks(chosen?: string[]): Promise<void> {
  if (!chosen) await removeSavedBooks()
  else if (available()) {
    const cache = await caches.open(BOOK_CACHE)
    for (const book of chosen) await cache.delete(key(book))
  }
  changed()
}
