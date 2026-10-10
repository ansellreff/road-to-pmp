import { isKnown, type CardState } from '../lib/progress'
import { btnKnow, btnLearning } from '../lib/ui'
import Icon, { type IconName } from './Icon'

/** Where a flashcard stands: never rated, rated "still learning", or known. */
export type CardStatus = 'new' | 'learning' | 'known'

export const cardStatus = (state: CardState | undefined): CardStatus => (!state ? 'new' : isKnown(state) ? 'known' : 'learning')

/**
 * How each status looks, used wherever flashcards are shown or counted. Every status has a
 * word and an icon as well as a colour, so it never depends on telling colours apart.
 */
export const statusLook: Record<CardStatus, { label: string; icon: IconName; glow: string; text: string; cell: string }> = {
  known: { label: 'Known', icon: 'check', glow: 'glow-known', text: 'text-done', cell: 'bg-done' },
  learning: { label: 'Still learning', icon: 'practice', glow: 'glow-learning', text: 'text-milestone', cell: 'bg-milestone' },
  new: { label: 'Not learned yet', icon: 'cards', glow: 'glow-new', text: 'text-critical', cell: 'bg-critical' },
}

// Shared look of both faces: an index card, with a rule across the top.
const face = 'flip-face flex min-h-64 flex-col rounded-lg border-2 bg-surface before:mx-6 before:mt-12 before:block before:h-px before:bg-line'

/**
 * One flashcard that turns over when selected. footer is the small line on the question side.
 * The edge of the card glows in the colour of its status, and a label in the corner names it.
 */
export default function FlipCard(props: {
  front: string
  back: string
  flipped: boolean
  onFlip: () => void
  footer: string
  status?: CardStatus
}) {
  const { front, back, flipped, onFlip, footer, status } = props
  const look = status ? statusLook[status] : undefined
  const edge = look ? look.glow : 'border-ink shadow-[4px_4px_0_var(--color-line)]'
  const chip = look && (
    <span className={`absolute top-3 right-4 flex items-center gap-1.5 text-sm font-semibold ${look.text}`}>
      <Icon name={look.icon} size={16} />
      {look.label}
    </span>
  )
  return (
    <button
      onClick={onFlip}
      aria-label={`${flipped ? 'Show the question side' : 'Show the answer side'}${look ? `. This card: ${look.label.toLowerCase()}` : ''}`}
      className="flip block w-full rounded-lg text-left"
    >
      <span className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
        <span className={`${face} ${edge} relative`} aria-hidden={flipped}>
          {chip}
          <span className="title flex flex-1 items-center px-6 py-6 text-3xl">{front}</span>
          <span className="px-6 pb-4 text-sm text-muted">{footer}</span>
        </span>
        <span className={`${face} ${edge} flip-back relative`} aria-hidden={!flipped}>
          {chip}
          <span className="flex flex-1 items-center px-6 py-6 font-reading text-xl leading-relaxed">{back}</span>
          <span className="px-6 pb-4 text-sm text-muted">{front}</span>
        </span>
      </span>
    </button>
  )
}

/** How many cards are in each status, as a legend: a coloured mark, the word, the number. */
export function StatusCounts({ counts }: { counts: Record<CardStatus, number> }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {(['known', 'learning', 'new'] as CardStatus[]).map((status) => (
        <li key={status} className="flex items-center gap-1.5">
          <span className={`size-2.5 rounded-full ${statusLook[status].cell}`} aria-hidden="true" />
          <span className="font-semibold tabular-nums">{counts[status]}</span>
          <span className="text-muted">{statusLook[status].label.toLowerCase()}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * The whole deck at a glance: one cell per card in the colour of its status, the open card
 * outlined. Selecting a cell opens that card.
 */
export function DeckStrip(props: { statuses: CardStatus[]; current: number; onGo: (index: number) => void }) {
  const { statuses, current, onGo } = props
  return (
    <ol className="flex flex-wrap gap-1" aria-label="The cards of this deck">
      {statuses.map((status, i) => (
        <li key={i}>
          <button
            onClick={() => onGo(i)}
            aria-current={i === current}
            aria-label={`Card ${i + 1}: ${statusLook[status].label.toLowerCase()}`}
            title={`Card ${i + 1}: ${statusLook[status].label.toLowerCase()}`}
            className={`press block h-6 w-4 rounded-[3px] ${statusLook[status].cell} ${
              i === current ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper' : 'opacity-80 hover:opacity-100'
            }`}
          />
        </li>
      ))}
    </ol>
  )
}

export function RateButtons({ onRate }: { onRate: (knewIt: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onRate(false)} className={btnLearning}>
        <Icon name="practice" size={18} className="mr-2 text-milestone" />
        Still learning
      </button>
      <button onClick={() => onRate(true)} className={btnKnow}>
        <Icon name="check" size={18} className="mr-2 text-done" />I know this
      </button>
    </div>
  )
}

/** "tomorrow", "in 3 days", or the date, for a YYYY-MM-DD review day. */
export function describeDue(due: string): string {
  const days = Math.round((new Date(`${due}T00:00`).getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'tomorrow'
  return `in ${days} days`
}
