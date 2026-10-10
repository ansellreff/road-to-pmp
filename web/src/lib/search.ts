// Search covers module titles, lesson sections and flashcards. Quiz and mock exam questions
// are left out on purpose, so a search never shows a question before it is met in a quiz.

export interface SearchEntry {
  kind: 'module' | 'lesson' | 'card'
  /** "CAPM 2.7 Earned Value Management"; for a module entry, just the course. */
  module: string
  /** Module title, section heading, or the front of the flashcard. */
  title: string
  /** Section text, or the back of the flashcard. Empty for a module. */
  text: string
  to: string
}

export interface SearchHit {
  entry: SearchEntry
  score: number
  /** A piece of the text around the first match. */
  snippet: string
}

let index: Promise<SearchEntry[]> | undefined

/**
 * Every searchable piece of text, as one file built with the site (see vite.config.ts).
 * Fetched once; the search box asks for it in the background soon after a page opens.
 */
export function loadSearchIndex(): Promise<SearchEntry[]> {
  index ??= import('virtual:search-index').then((file) => file.default)
  return index
}

export const searchWords = (query: string) => query.toLowerCase().split(/\s+/).filter((w) => w.length > 1)

const count = (haystack: string, needle: string) => haystack.split(needle).length - 1

/** Entries containing every word of the query, best first. A match in a title counts most. */
export function search(entries: SearchEntry[], query: string, limit = 40): SearchHit[] {
  const words = searchWords(query)
  if (!words.length) return []
  const whole = query.toLowerCase().trim()
  const hits: SearchHit[] = []
  for (const entry of entries) {
    const title = entry.title.toLowerCase()
    const text = entry.text.toLowerCase()
    let score = 0
    let all = true
    for (const word of words) {
      const inTitle = count(title, word)
      const inText = count(text, word)
      if (!inTitle && !inText) {
        all = false
        break
      }
      score += inTitle * 8 + Math.min(inText, 5)
      // A title word that starts with what was typed is what the learner most likely means.
      if (new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(title)) score += 4
    }
    if (!all) continue
    if (title === whole) score += 20
    if (entry.kind === 'module') score += 6
    const at = Math.max(0, text.indexOf(words[0]))
    const start = Math.max(0, at - 70)
    const snippet = (start > 0 ? '… ' : '') + entry.text.slice(start, at + 170).trim() + (at + 170 < entry.text.length ? ' …' : '')
    hits.push({ entry, score, snippet })
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}
