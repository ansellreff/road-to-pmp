import { useSyncExternalStore } from 'react'

// Whether the account window (sign in, sync, sign out) is open. It lives in the top bar, and any page
// can open it, for example a book link pressed while signed out.

let open = false
const listeners = new Set<() => void>()

function set(next: boolean) {
  open = next
  listeners.forEach((listener) => listener())
}

export const openAccount = () => set(true)
export const closeAccount = () => set(false)

export function useAccountOpen(): boolean {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => open,
  )
}
