import type { ReactNode } from 'react'

/**
 * A ring that fills clockwise as work completes. value is 0..1.
 * What stands in the middle is up to the caller: a percentage, an icon, nothing.
 * tone picks the colour of the filled part; by default blue, and green once full.
 */
export default function Ring(props: {
  value: number
  size?: number
  stroke?: number
  tone?: string
  label?: string
  children?: ReactNode
}) {
  const { value, size = 48, stroke = 5, tone, label, children } = props
  const v = Math.max(0, Math.min(1, value))
  const radius = (size - stroke) / 2
  const around = 2 * Math.PI * radius
  const colour = tone ?? (v >= 1 ? 'var(--color-done)' : 'var(--color-plan)')
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle
          className="ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={around}
          strokeDashoffset={around * (1 - v)}
        />
      </svg>
      {children !== undefined && <span className="absolute inset-0 flex items-center justify-center">{children}</span>}
    </span>
  )
}
