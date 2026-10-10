import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from './Icon'

/**
 * A page with a panel on its right that stays in view while the page scrolls:
 * the sections of a lesson, the modules of a domain, the question grid of an exam.
 *
 * A phone has no room for a second column. There the panel either follows the
 * content ("below"), or slides in from the right when the button at the bottom of
 * the screen is pressed ("drawer"). The button carries the panel's name, so it is
 * never hidden behind an unlabelled icon.
 */
export default function WithSidePanel(props: {
  children: ReactNode
  panel: ReactNode
  /** What the panel holds, for the phone button and for screen readers: "Contents". */
  label: string
  phone?: 'drawer' | 'below'
}) {
  const { children, panel, label, phone = 'drawer' } = props
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Choosing something in the drawer closes it.
  useEffect(() => setOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const frame = 'lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-1'

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-10">
      <div className="min-w-0">{children}</div>

      {phone === 'below' ? (
        <aside aria-label={label} className={`mt-10 lg:mt-0 ${frame}`}>
          {panel}
        </aside>
      ) : (
        <>
          <aside aria-label={label} className={`hidden lg:block ${frame}`}>
            {panel}
          </aside>
          <button
            onClick={() => setOpen(true)}
            className="press fixed right-4 bottom-4 z-20 flex min-h-12 items-center gap-2 rounded-full border border-ink bg-ink px-5 font-semibold text-paper shadow-[var(--shadow-raised)] lg:hidden print:hidden"
          >
            <Icon name="contents" />
            {label}
          </button>
          {open && (
            <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label={label}>
              <button aria-label={`Close ${label.toLowerCase()}`} onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/50" />
              <div className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col border-l border-ink bg-surface shadow-[var(--shadow-raised)]">
                <div className="flex items-center justify-between border-b border-line px-4 py-2">
                  <p className="title text-lg">{label}</p>
                  <button onClick={() => setOpen(false)} className="press flex min-h-11 items-center gap-1.5 px-2 font-medium">
                    <Icon name="close" />
                    Close
                  </button>
                </div>
                {/* Following any link in the drawer closes it, also a jump inside the same page. */}
                <div
                  className="overflow-y-auto p-4"
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest('a')) setOpen(false)
                  }}
                >
                  {panel}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/** A titled block inside a side panel. */
export function PanelBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t-2 border-ink pt-3 pb-6">
      <h2 className="mb-2 text-sm font-semibold">{title}</h2>
      {children}
    </section>
  )
}
