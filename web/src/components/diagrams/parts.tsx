import { createContext, useContext, type ReactNode } from 'react'

// Building blocks for the lesson drawings. Colours come from the theme tokens,
// so every drawing follows the light and dark themes.
export const ink = 'var(--color-ink)'
export const muted = 'var(--color-muted)'
export const line = 'var(--color-line)'
export const surface = 'var(--color-surface)'
export const plan = 'var(--color-plan)'
export const planSoft = 'var(--color-plan-soft)'
export const done = 'var(--color-done)'
export const doneSoft = 'var(--color-done-soft)'
export const critical = 'var(--color-critical)'
export const milestone = 'var(--color-milestone)'
export const milestoneSoft = 'var(--color-milestone-soft)'

/**
 * What a hot spot question draws on top of a drawing: its selectable areas. When this is
 * set, the drawing is shown without its caption, which would give the answer away.
 */
export const Overlay = createContext<ReactNode>(null)

/**
 * A drawing with its caption. description is read out in place of the picture.
 * On a narrow screen the drawing keeps a readable size and scrolls sideways.
 */
export function Frame(props: { width: number; height: number; caption?: string; description: string; children: ReactNode }) {
  const { width, height, caption, description, children } = props
  const overlay = useContext(Overlay)
  const drawing = (
    <div className="overflow-x-auto rounded-md border border-line bg-surface p-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role={overlay ? 'group' : 'img'}
        aria-label={description}
        className="mx-auto block font-ui"
        style={{ width: '100%', minWidth: Math.min(width, 620), maxWidth: width, height: 'auto' }}
        fontSize="13"
        fill={ink}
      >
        {children}
        {overlay}
      </svg>
    </div>
  )
  if (overlay) return drawing
  return (
    <figure className="wide">
      {drawing}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

/** Text centred on a point; an array gives several lines. */
export function Label(props: { x: number; y: number; text: string | string[]; bold?: boolean; fill?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  const { x, y, text, bold, fill, anchor = 'middle', size } = props
  const lines = Array.isArray(text) ? text : [text]
  const step = (size ?? 13) * 1.25
  return (
    <text x={x} y={y - ((lines.length - 1) * step) / 2} textAnchor={anchor} dominantBaseline="middle" fontWeight={bold ? 700 : 400} fill={fill} fontSize={size}>
      {lines.map((t, i) => (
        <tspan key={i} x={x} dy={i ? step : 0}>
          {t}
        </tspan>
      ))}
    </text>
  )
}

/** A labelled box. x and y are its top-left corner. */
export function Box(props: { x: number; y: number; w: number; h: number; text: string | string[]; fill?: string; stroke?: string; round?: number; bold?: boolean }) {
  const { x, y, w, h, text, fill = surface, stroke = ink, round = 4, bold } = props
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={round} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <Label x={x + w / 2} y={y + h / 2} text={text} bold={bold} />
    </>
  )
}

/** A line through the given points with an arrowhead at the last one. */
export function Arrow({ points, stroke = ink, dashed }: { points: [number, number][]; stroke?: string; dashed?: boolean }) {
  const [x2, y2] = points[points.length - 1]
  const [x1, y1] = points[points.length - 2]
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = [-0.42, 0.42].map((turn) => [x2 - 9 * Math.cos(angle + turn), y2 - 9 * Math.sin(angle + turn)])
  return (
    <>
      <polyline points={points.map((p) => p.join(',')).join(' ')} fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={dashed ? '5 4' : undefined} />
      <polygon points={`${x2},${y2} ${head[0].join(',')} ${head[1].join(',')}`} fill={stroke} />
    </>
  )
}

/** Small text on a patch of background, so it stays readable where it crosses a line. */
export function Tag({ x, y, text, w }: { x: number; y: number; text: string; w?: number }) {
  const width = w ?? text.length * 6.6 + 10
  return (
    <>
      <rect x={x - width / 2} y={y - 9} width={width} height={18} fill={surface} />
      <Label x={x} y={y} text={text} size={12} fill={muted} />
    </>
  )
}
