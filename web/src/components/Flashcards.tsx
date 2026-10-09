import { useState } from 'react'
import { loadCards } from '../lib/content'
import { moduleKey, setCardStatus, useProgress, type CardStatus } from '../lib/progress'
import { useLoaded } from '../lib/useLoaded'

export default function Flashcards({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const cards = useLoaded(() => loadCards(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const statuses = useProgress().cards[key] ?? {}
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [onlyReview, setOnlyReview] = useState(false)

  if (!cards) return <p className="text-slate-500">Loading…</p>
  if (!cards.length) return <p className="text-slate-500">No flashcards for this module yet.</p>

  const known = cards.filter((c) => statuses[c.id] === 'know').length
  const deck = onlyReview ? cards.filter((c) => statuses[c.id] !== 'know') : cards
  const card = deck[Math.min(index, deck.length - 1)]

  function go(to: number) {
    setFlipped(false)
    setIndex((to + deck.length) % deck.length)
  }

  function rate(status: CardStatus) {
    if (!card) return
    setCardStatus(key, card.id, status, cards!.length)
    setFlipped(false)
    // In "still learning" mode a known card leaves the deck, so the same index shows the next card.
    if (!(onlyReview && status === 'know')) setIndex((index + 1) % deck.length)
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>
          {known} of {cards.length} known
        </span>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={onlyReview}
            onChange={(e) => {
              setOnlyReview(e.target.checked)
              setIndex(0)
              setFlipped(false)
            }}
          />
          Only cards I am still learning
        </label>
      </div>

      {!card ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-8 text-center text-emerald-800">
          You know every card in this module.
        </div>
      ) : (
        <>
          <button
            onClick={() => setFlipped(!flipped)}
            className="flex min-h-56 w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:border-indigo-300"
          >
            <span className="text-xs uppercase tracking-wide text-slate-400">
              {flipped ? 'Answer' : 'Question'} · card {Math.min(index, deck.length - 1) + 1} of {deck.length}
            </span>
            <span className={`mt-3 ${flipped ? 'text-lg text-slate-700' : 'text-2xl font-semibold text-slate-900'}`}>
              {flipped ? card.back : card.front}
            </span>
            {!flipped && <span className="mt-4 text-xs text-slate-400">Click to show the answer</span>}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => go(index - 1)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-100"
              >
                ← Previous
              </button>
              <button
                onClick={() => go(index + 1)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-100"
              >
                Next →
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => rate('review')}
                className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100"
              >
                Still learning
              </button>
              <button
                onClick={() => rate('know')}
                className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
              >
                I know this
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
