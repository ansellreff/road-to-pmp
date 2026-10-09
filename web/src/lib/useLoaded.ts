import { useEffect, useState } from 'react'

/** Runs an async loader once on mount; returns undefined until it resolves. */
export function useLoaded<T>(load: () => Promise<T>): T | undefined {
  const [value, setValue] = useState<T>()
  useEffect(() => {
    let active = true
    load().then((v) => {
      if (active) setValue(v)
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return value
}
