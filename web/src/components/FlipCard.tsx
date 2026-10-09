// Shared look of both faces: an index card, with the red rule across the top.
const face =
  'flip-face flex min-h-64 flex-col rounded-xl border border-ink bg-surface shadow-[4px_4px_0_var(--color-line)] before:mx-6 before:mt-10 before:block before:h-px before:bg-critical'

/** One flashcard that turns over when selected. footer is the small line on the question side. */
export default function FlipCard(props: {
  front: string
  back: string
  flipped: boolean
  onFlip: () => void
  footer: string
}) {
  const { front, back, flipped, onFlip, footer } = props
  return (
    <button
      onClick={onFlip}
      aria-label={flipped ? 'Show the question side' : 'Show the answer side'}
      className="flip block w-full text-left"
    >
      <span className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
        <span className={face} aria-hidden={flipped}>
          <span className="title flex flex-1 items-center px-6 py-6 text-3xl">{front}</span>
          <span className="px-6 pb-4 text-sm text-muted">{footer}</span>
        </span>
        <span className={`${face} flip-back`} aria-hidden={!flipped}>
          <span className="flex flex-1 items-center px-6 py-6 font-reading text-xl leading-relaxed">{back}</span>
          <span className="px-6 pb-4 text-sm text-muted">{front}</span>
        </span>
      </span>
    </button>
  )
}

const rateButton = 'rounded-md border px-3 py-2 text-sm font-semibold hover:bg-surface'

export function RateButtons({ onRate }: { onRate: (knewIt: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onRate(false)} className={`${rateButton} border-milestone bg-milestone-soft`}>
        Still learning
      </button>
      <button onClick={() => onRate(true)} className={`${rateButton} border-done bg-done-soft`}>
        I know this
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
