import { useEffect, useRef, useState } from 'react'
import { loadCards } from '../lib/content'
import { isKnown, moduleKey, rateCard, useProgress } from '../lib/progress'
import { btnQuiet, column } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import Keys from './Keys'
import FlipCard, { cardStatus, DeckStrip, describeDue, RateButtons, StatusCounts, type CardStatus } from './FlipCard'
import { Notice, Waiting } from './Page'

// After a card is rated it stays for a moment, so the change of its colour is seen, then the next one comes.
const SHOW_RATING_MS = 650

export default function Flashcards({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const cards = useLoaded(() => loadCards(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const states = useProgress().cards[key] ?? {}
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [onlyLearning, setOnlyLearning] = useState(false)
  const [pausing, setPausing] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!cards) return <Waiting>Loading the flashcards</Waiting>
  if (!cards.length) return <Waiting>This module has no flashcards yet.</Waiting>

  const counts: Record<CardStatus, number> = { known: 0, learning: 0, new: 0 }
  for (const c of cards) counts[cardStatus(states[c.id])]++
  const deck = onlyLearning ? cards.filter((c) => !isKnown(states[c.id])) : cards
  const position = Math.min(index, deck.length - 1)
  const card = deck[position]
  const cardState = card && states[card.id]

  function go(to: number) {
    window.clearTimeout(timer.current)
    setPausing(false)
    setFlipped(false)
    setIndex((to + deck.length) % deck.length)
  }

  function rate(knewIt: boolean) {
    if (!card || pausing) return
    rateCard(key, card.id, knewIt, cards!.length)
    // In "still learning" mode a known card leaves the deck at once, so the same index shows the next card.
    if (onlyLearning && knewIt) return setFlipped(false)
    setPausing(true)
    timer.current = window.setTimeout(() => go(position + 1), SHOW_RATING_MS)
  }

  return (
    <div className={column}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div>
          <p className="text-sm text-muted">
            You know {counts.known} of {cards.length} cards
          </p>
          <div className="mt-1">
            <StatusCounts counts={counts} />
          </div>
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-5 accent-plan"
            checked={onlyLearning}
            onChange={(e) => {
              setOnlyLearning(e.target.checked)
              go(0)
            }}
          />
          Show only cards I am still learning
        </label>
      </div>

      {!card ? (
        <Notice title="You know every card in this module.">
          They will come back for review on their scheduled days. Untick the box above to browse the whole deck.
        </Notice>
      ) : (
        <>
          <div className="mb-4">
            <DeckStrip statuses={deck.map((c) => cardStatus(states[c.id]))} current={position} onGo={go} />
          </div>
          <FlipCard
            front={card.front}
            back={card.back}
            flipped={flipped}
            onFlip={() => setFlipped(!flipped)}
            footer={`Card ${position + 1} of ${deck.length}. Select the card to turn it over.`}
            status={cardStatus(cardState)}
          />
          <p className="mt-4 text-sm text-muted">
            {!cardState
              ? 'Not rated yet. Turn it over, then say whether you knew it.'
              : isKnown(cardState)
                ? `You knew this one. Next review ${describeDue(cardState.due)}.`
                : 'Marked as still learning. It comes back for review today.'}
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
          <Keys
            actions={{
              ' ': () => setFlipped(!flipped),
              ArrowLeft: () => go(position - 1),
              ArrowRight: () => go(position + 1),
              1: () => rate(false),
              2: () => rate(true),
            }}
          >
            Space to turn the card. The left and right arrows for the previous and next card. 1 for still
            learning, 2 for I know this.
          </Keys>
        </>
      )}
    </div>
  )
}
