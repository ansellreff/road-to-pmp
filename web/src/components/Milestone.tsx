import { useId } from 'react'

/**
 * A schedule milestone diamond that fills from the bottom as work completes.
 * value: 0..1. planned: the work does not exist yet (drawn in grey).
 */
export default function Milestone({ value, planned = false, size = 18 }: { value: number; planned?: boolean; size?: number }) {
  const clipId = useId()
  const v = Math.max(0, Math.min(1, value))
  const color = planned ? 'var(--color-line)' : v >= 1 ? 'var(--color-done)' : 'var(--color-plan)'
  const points = '10,1.5 18.5,10 10,18.5 1.5,10'
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
      <clipPath id={clipId}>
        <rect x="0" y={20 - 20 * v} width="20" height={20 * v} />
      </clipPath>
      <polygon points={points} fill="var(--color-surface)" stroke={color} strokeWidth="1.75" strokeLinejoin="round" />
      <polygon points={points} fill={color} clipPath={`url(#${clipId})`} />
    </svg>
  )
}
