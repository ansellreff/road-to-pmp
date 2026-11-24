// Where the books come from, and the storage place for books saved on this device. Kept apart from
// bookStore.ts so that signing out (sync.ts) can clear the saved books without importing the reader.

/** On your PC (the dev server) the books open straight from your PMI Learning Material folder. */
export const onThisPc = import.meta.env.DEV

/** The browser's storage place for this website that holds the saved books. */
export const BOOK_CACHE = 'road-to-pmi-books'

/** Removes every book saved on this device. Your progress and the online copies are not touched. */
export async function removeSavedBooks(): Promise<void> {
  if (typeof caches === 'undefined') return
  await caches.delete(BOOK_CACHE)
}
