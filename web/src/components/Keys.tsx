import { useEffect, useRef, type ReactNode } from 'react'
import { note } from '../lib/ui'

/** What each key does, by the key's name: 'a', '1', 'Enter', 'ArrowRight', ' ' for Space. */
export type KeyActions = Record<string, (() => void) | undefined>

/**
 * Keyboard shortcuts for the page it is placed on, with the line that lists them.
 * The keys are off while you type in a field, and Enter and Space keep their usual
 * meaning on a button or link that has the focus. The line is shown on wide screens
 * only, where there is a keyboard.
 */
export default function Keys({ actions, children }: { actions: KeyActions; children: ReactNode }) {
  const latest = useRef(actions)
  useEffect(() => {
    latest.current = actions
  })
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      const name = event.key.length === 1 ? event.key.toLowerCase() : event.key
      if ((name === 'Enter' || name === ' ') && target?.closest('button, a, summary, [role="button"]')) return
      const action = latest.current[name]
      if (!action) return
      event.preventDefault()
      action()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return <p className={`${note} mt-4 hidden lg:block`}>Keys: {children}</p>
}
