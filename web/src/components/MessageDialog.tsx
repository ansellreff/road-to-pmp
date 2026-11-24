import { useEffect, useId, useRef, type ReactNode } from 'react'
import { btnQuiet, subTitle } from '../lib/ui'

/**
 * A small window over the page with a title, a message and buttons. It opens when shown and closes
 * with Close, the Escape key, or the action's own link. Keyboard focus stays inside while it is open.
 */
export default function MessageDialog({
  title,
  children,
  action,
  onClose,
  wide = false,
}: {
  title: string
  children: ReactNode
  action?: ReactNode
  onClose: () => void
  /** For a window with forms, such as the account window. */
  wide?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby={titleId}
      className={`card m-auto max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 font-ui text-ink backdrop:bg-[var(--color-backdrop)] ${
        wide ? 'w-[min(40rem,calc(100vw-2rem))]' : 'w-[min(28rem,calc(100vw-2rem))]'
      }`}
    >
      <h2 id={titleId} className={subTitle}>
        {title}
      </h2>
      <div className="mt-2 leading-relaxed">{children}</div>
      <div className="mt-5 flex flex-wrap gap-3">
        {action}
        <button type="button" onClick={() => ref.current?.close()} className={btnQuiet}>
          Close
        </button>
      </div>
    </dialog>
  )
}
