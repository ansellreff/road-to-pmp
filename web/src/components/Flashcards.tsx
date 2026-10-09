import { useState } from 'react'
import { loadCards } from '../lib/content'
import { isKnown, moduleKey, rateCard, useProgress } from '../lib/progress'
import { btnQuiet } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import FlipCard, { describeDue, RateButtons } from './FlipCard'

export default function Flashcards({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const cards = useLoaded(() => loadCards(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const states = useProgress().cards[key] ?? {}
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [onlyLearning, setOnlyLearning] = useState(false)

  if (!cards) return <p className="text-muted">Loading the flashcards</p>
  if (!cards.length) return <p className="text-muted">This module has no flashcards yet.</p>

  const known = cards.filter((c) => isKnown(states[c.id])).length
  const deck = onlyLearning ? cards.filter((c) => !isKnown(states[c.id])) : cards
  const position = Math.min(index, deck.length - 1)
  const card = deck[position]
  const cardState = card && states[card.id]

  function go(to: number) {
    setFlipped(false)
    setIndex((to + deck.length) % deck.length)
  }

  function rate(knewIt: boolean) {
    if (!card) return
    rateCard(key, card.id, knewIt, cards!.length)
    setFlipped(false)
    // In "still learning" mode a known card leaves the deck, so the same index shows the next card.
    if (!(onlyLearning && knewIt)) setIndex((position + 1) % deck.length)
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
            checked={onlyLearning}
            onChange={(e) => {
              setOnlyLearning(e.target.checked)
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
          <p className="mt-1 text-muted">
            They will come back for review on their scheduled days. Untick the box above to browse the whole deck.
          </p>
        </div>
      ) : (
        <>
          <FlipCard
            front={card.front}
            back={card.back}
            flipped={flipped}
            onFlip={() => setFlipped(!flipped)}
            footer={`Card ${position + 1} of ${deck.length}. Select the card to turn it over.`}
          />
          <p className="mt-3 text-sm text-muted">
            {!cardState
              ? 'Not rated yet.'
              : isKnown(cardState)
                ? `You knew this one. Next review ${describeDue(cardState.due)}.`
                : 'Marked as still learning.'}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button onClick={() => go(position - 1)} className={btnQuiet}>
                Previous card
              </button>
              <button onClick={() => go(position + 1)} className={btnQuiet}>
                Next card
              </button>
            </div>
            <RateButtons onRate={rate} />
          </div>
        </>
      )}
    </div>
  )
}
