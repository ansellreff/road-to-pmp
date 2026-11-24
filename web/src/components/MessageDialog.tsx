import { useEffect, useId, useRef, type ReactNode } from 'react'
import { btnQuiet, subTitle } from '../lib/ui'

/**
 * A small window over the page with a title, a message and buttons. It opens when shown and closes
 * with Close, the Escape key, or the action's own link. Keyboard focus stays inside while it is open.
 */
export default function MessageDialog({ title, children, action, onClose }: { title: string; children: ReactNode; action?: ReactNode; onClose: () => void }) {
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
      className="card m-auto w-[min(28rem,calc(100vw-2rem))] p-6 font-ui text-ink backdrop:bg-[#14213d]/50"
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
