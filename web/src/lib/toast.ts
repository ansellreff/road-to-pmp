import { useSyncExternalStore } from 'react'

// Short messages that confirm an action ("Lesson marked complete") and then go away by themselves.

export interface ToastMessage {
  id: number
  text: string
  /** A milestone gets a trophy and stays a little longer. */
  kind: 'done' | 'milestone'
}

let messages: ToastMessage[] = []
let nextId = 1
const listeners = new Set<() => void>()

function set(next: ToastMessage[]) {
  messages = next
  listeners.forEach((l) => l())
}

export function dismissToast(id: number) {
  set(messages.filter((m) => m.id !== id))
}

export function toast(text: string, kind: ToastMessage['kind'] = 'done') {
  const id = nextId++
  // At most three at once; the oldest makes room.
  set([...messages.slice(-2), { id, text, kind }])
  window.setTimeout(() => dismissToast(id), kind === 'milestone' ? 7000 : 3500)
}

export function useToasts(): ToastMessage[] {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => messages,
  )
}
