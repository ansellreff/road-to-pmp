import { slug } from '../components/LessonContents'
import { allModules, courses, loadCards, loadLesson } from './content'
import { moduleNumber } from './stats'

// Search covers lesson sections and flashcards. Quiz and mock exam questions are
// left out on purpose, so a search never shows a question before it is met in a quiz.

export interface SearchEntry {
  kind: 'lesson' | 'card'
  /** "CAPM 2.7 Earned Value Management" */
  module: string
  /** Section heading, or the front of the flashcard. */
  title: string
  text: string
  to: string
}

export interface SearchHit {
  entry: SearchEntry
  score: number
  /** A piece of the text around the first match. */
  snippet: string
}

/** Markdown marks, table bars and source lines removed, so matches and snippets read as plain text. */
function plain(markdown: string): string {
  return markdown
    .replace(/^@(source|diagram) .*$/gm, '')
    .replace(/^\|[-: |]+\|$/gm, '')
    .replace(/[*`>#]/g, '')
    .replace(/\s*\|\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

let index: Promise<SearchEntry[]> | undefined

/** Every searchable piece of text. Loaded once, the first time a search is made. */
export function loadSearchIndex(): Promise<SearchEntry[]> {
  index ??= Promise.all(
    courses.flatMap((course) =>
      allModules(course)
        .filter((m) => m.ready)
        .map(async (m) => {
          const module = `${course.title} ${moduleNumber(course, m.id)} ${m.title}`
          const [lesson, cards] = await Promise.all([loadLesson(course.id, m.id), loadCards(course.id, m.id)])
          // Split before each "## " heading; the first piece (before any heading) is dropped if empty.
          const sections = lesson.split(/^(?=## )/m).flatMap((section): SearchEntry[] => {
            const heading = /^## (.+)$/m.exec(section)
            if (!heading) return []
            const title = heading[1].replace(/[*`]/g, '').trim()
            return [
              {
                kind: 'lesson',
                module,
                title,
                text: plain(section.slice(heading[0].length)),
                to: `/${course.id}/${m.id}#${slug(title)}`,
              },
            ]
          })
          const cardEntries = cards.map(
            (card): SearchEntry => ({
              kind: 'card',
              module,
              title: card.front,
              text: card.back,
              to: `/${course.id}/${m.id}/flashcards`,
            }),
          )
          return [...sections, ...cardEntries]
        }),
    ),
  ).then((groups) => groups.flat())
  return index
}

const count = (haystack: string, needle: string) => haystack.split(needle).length - 1

/** Entries containing every word of the query, best first. A match in a title counts most. */
export function search(entries: SearchEntry[], query: string, limit = 40): SearchHit[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1)
  if (!words.length) return []
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
    }
    if (!all) continue
    if (title === query.toLowerCase().trim()) score += 20
    const at = Math.max(0, text.indexOf(words[0]))
    const start = Math.max(0, at - 70)
    const snippet = (start > 0 ? '… ' : '') + entry.text.slice(start, at + 170).trim() + (at + 170 < entry.text.length ? ' …' : '')
    hits.push({ entry, score, snippet })
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}
