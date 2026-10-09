import { useState } from 'react'
import { loadCards } from '../lib/content'
import { moduleKey, setCardStatus, useProgress, type CardStatus } from '../lib/progress'
import { btnQuiet } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

// Shared look of both faces: an index card, with the red rule across the top.
const face =
  'flip-face flex min-h-64 flex-col rounded-xl border border-ink bg-surface shadow-[4px_4px_0_var(--color-line)] before:mx-6 before:mt-10 before:block before:h-px before:bg-critical'

export default function Flashcards({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const cards = useLoaded(() => loadCards(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const statuses = useProgress().cards[key] ?? {}
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [onlyReview, setOnlyReview] = useState(false)

  if (!cards) return <p className="text-muted">Loading the flashcards</p>
  if (!cards.length) return <p className="text-muted">This module has no flashcards yet.</p>

  const known = cards.filter((c) => statuses[c.id] === 'know').length
  const deck = onlyReview ? cards.filter((c) => statuses[c.id] !== 'know') : cards
  const position = Math.min(index, deck.length - 1)
  const card = deck[position]

  function go(to: number) {
    setFlipped(false)
    setIndex((to + deck.length) % deck.length)
  }

  function rate(status: CardStatus) {
    if (!card) return
    setCardStatus(key, card.id, status, cards!.length)
    setFlipped(false)
    // In "still learning" mode a known card leaves the deck, so the same index shows the next card.
    if (!(onlyReview && status === 'know')) setIndex((position + 1) % deck.length)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted">
          You know {known} of {cards.length} cards
        </span>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="size-4 accent-plan"
            checked={onlyReview}
            onChange={(e) => {
              setOnlyReview(e.target.checked)
              setIndex(0)
              setFlipped(false)
            }}
          />
          Show only cards I am still learning
        </label>
      </div>

      {!card ? (
        <div className="rounded-xl border border-done bg-done-soft p-8">
          <p className="title text-2xl">You know every card in this module.</p>
          <p className="mt-1 text-muted">Untick the box above to go through the whole deck again.</p>
        </div>
      ) : (
        <>
          <button
            onClick={() => setFlipped(!flipped)}
            aria-label={flipped ? 'Show the question side' : 'Show the answer side'}
            className="flip block w-full text-left"
          >
            <span className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
              <span className={face} aria-hidden={flipped}>
                <span className="title flex flex-1 items-center px-6 py-6 text-3xl">{card.front}</span>
                <span className="px-6 pb-4 text-sm text-muted">
                  Card {position + 1} of {deck.length}. Select the card to turn it over.
                </span>
              </span>
              <span className={`${face} flip-back`} aria-hidden={!flipped}>
                <span className="flex flex-1 items-center px-6 py-6 font-reading text-xl leading-relaxed">
                  {card.back}
                </span>
                <span className="px-6 pb-4 text-sm text-muted">{card.front}</span>
              </span>
            </span>
          </button>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button onClick={() => go(position - 1)} className={btnQuiet}>
                Previous card
              </button>
              <button onClick={() => go(position + 1)} className={btnQuiet}>
                Next card
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => rate('review')}
                className="rounded-md border border-milestone bg-milestone-soft px-3 py-2 text-sm font-semibold hover:bg-surface"
              >
                Still learning
              </button>
              <button
                onClick={() => rate('know')}
                className="rounded-md border border-done bg-done-soft px-3 py-2 text-sm font-semibold hover:bg-surface"
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
