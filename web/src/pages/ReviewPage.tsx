import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Keys from '../components/Keys'
import FlipCard, { cardStatus, describeDue, RateButtons } from '../components/FlipCard'
import { Notice, PageHeader, Waiting } from '../components/Page'
import { allModules, courses, loadCards, type Card } from '../lib/content'
import { isDue, moduleKey, rateCard, useProgress } from '../lib/progress'
import { moduleNumber } from '../lib/stats'
import { column, link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

interface ReviewItem {
  key: string
  from: string
  to: string
  card: Card
}

async function loadEveryCard(): Promise<ReviewItem[]> {
  const decks = await Promise.all(
    courses.flatMap((course) =>
      allModules(course)
        .filter((m) => m.ready)
        .map(async (m) => {
          const cards = await loadCards(course.id, m.id)
          return cards.map((card) => ({
            key: moduleKey(course.id, m.id),
            from: `${course.title} ${moduleNumber(course, m.id)} ${m.title}`,
            to: `/${course.id}/${m.id}`,
            card,
          }))
        }),
    ),
  )
  return decks.flat()
}

/** One review session over every card, from any module, whose review day has arrived. */
export default function ReviewPage() {
  const everyCard = useLoaded(loadEveryCard)
  const progress = useProgress()
  const [queue, setQueue] = useState<ReviewItem[] | null>(null)
  const [reviewed, setReviewed] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [pausing, setPausing] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // The session's cards are fixed when the page opens, so rating one does not reshuffle the rest.
  useEffect(() => {
    if (everyCard && queue === null) {
      setQueue(everyCard.filter((item) => isDue(progress.cards[item.key]?.[item.card.id])))
    }
  }, [everyCard, queue, progress])

  if (!queue) return <Waiting>Collecting the cards that are due</Waiting>

  const item = queue[0]

  function rate(knewIt: boolean) {
    if (!item || pausing) return
    rateCard(item.key, item.card.id, knewIt)
    setReviewed(reviewed + 1)
    // The card stays a moment so its new colour is seen, then the next one comes.
    setPausing(true)
    timer.current = window.setTimeout(() => {
      setPausing(false)
      setFlipped(false)
      // A missed card goes to the back of the queue and comes round again in this session.
      setQueue((q) => (q ? (knewIt ? q.slice(1) : [...q.slice(1), item]) : q))
    }, 650)
  }

  const upcoming = Object.values(progress.cards)
    .flatMap((deck) => Object.values(deck))
    .map((s) => s.due)
    .sort()[0]

  return (
    <div className={column}>
      <PageHeader back={{ to: '/', label: 'Your certification path' }} title="Review due cards">
        {item
          ? `${queue.length} ${queue.length === 1 ? 'card' : 'cards'} left in this session. Cards you know move to a longer interval; cards you miss come round again.`
          : undefined}
      </PageHeader>

      {!item ? (
        <div className="mt-6">
          <Notice title={reviewed ? 'Review finished. No more cards are due.' : 'No cards are due right now.'}>
            {upcoming
              ? `Your next card is due ${describeDue(upcoming)}.`
              : 'Cards appear here after you rate them in a module’s Flashcards tab.'}
          </Notice>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <FlipCard
              front={item.card.front}
              back={item.card.back}
              flipped={flipped}
              onFlip={() => setFlipped(!flipped)}
              footer="Select the card to turn it over."
              status={cardStatus(progress.cards[item.key]?.[item.card.id])}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              From{' '}
              <Link to={item.to} className={link}>
                {item.from}
              </Link>
            </p>
            <RateButtons onRate={rate} />
          </div>
          <Keys actions={{ ' ': () => setFlipped(!flipped), 1: () => rate(false), 2: () => rate(true) }}>
            Space to turn the card. 1 for still learning, 2 for I know this.
          </Keys>
        </>
      )}
    </div>
  )
}
