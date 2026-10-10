import { useEffect, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader, Waiting } from '../components/Page'
import { loadSearchIndex, search, type SearchEntry, type SearchHit } from '../lib/search'
import { column, input, link, listTitle, note } from '../lib/ui'

/** The text with every searched word marked. */
function Marked({ text, words }: { text: string; words: string[] }): ReactNode {
  if (!words.length) return text
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text.split(pattern).map((piece, i) =>
    i % 2 ? (
      <mark key={i} className="rounded-[2px] bg-milestone-soft px-0.5 text-ink">
        {piece}
      </mark>
    ) : (
      piece
    ),
  )
}

function Results({ title, hits, words }: { title: string; hits: SearchHit[]; words: string[] }) {
  if (!hits.length) return null
  return (
    <section className="mt-10">
      <h2 className={listTitle}>
        {title} <span className="text-base font-normal text-muted">({hits.length})</span>
      </h2>
      <ul className="divide-y divide-line border-b border-line">
        {hits.map(({ entry, snippet }, i) => (
          <li key={i} className="py-4">
            <Link to={entry.to} className={`${link} text-lg`}>
              <Marked text={entry.title} words={words} />
            </Link>
            <p className={`${note} mt-0.5`}>{entry.module}</p>
            <p className="mt-1.5 leading-relaxed">
              <Marked text={snippet} words={words} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const [entries, setEntries] = useState<SearchEntry[]>()

  // The lessons and flashcards are only loaded once something is searched for.
  useEffect(() => {
    if (query.trim().length > 1 && !entries) loadSearchIndex().then(setEntries)
  }, [query, entries])

  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1)
  const hits = entries ? search(entries, query, 60) : []
  const lessons = hits.filter((h) => h.entry.kind === 'lesson')
  const cards = hits.filter((h) => h.entry.kind === 'card')

  return (
    <div className={column}>
      <PageHeader back={{ to: '/', label: 'Your certification path' }} title="Search">
        Find where a term is taught. Search looks through lesson sections and flashcards. Quiz and exam questions are
        left out, so you never meet one here first.
      </PageHeader>
      <label htmlFor="search" className="mt-8 block text-sm font-medium">
        Search for
      </label>
      <input
        id="search"
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        placeholder="For example: float, MoSCoW, earned value"
        className={`${input} mt-1 w-full text-lg`}
      />

      {words.length > 0 && !entries && (
        <div className="mt-6">
          <Waiting>Reading the lessons</Waiting>
        </div>
      )}
      {entries && words.length > 0 && hits.length === 0 && (
        <p className="mt-6 leading-relaxed text-muted" role="status">
          Nothing found for "{query.trim()}". Try one word, or a different form of it, for example "estimate" for
          "estimating".
        </p>
      )}
      <Results title="Modules" hits={hits.filter((h) => h.entry.kind === 'module')} words={words} />
      <Results title="Lesson sections" hits={lessons} words={words} />
      <Results title="Flashcards" hits={cards} words={words} />
    </div>
  )
}
