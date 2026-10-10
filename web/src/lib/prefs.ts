import { useSyncExternalStore } from 'react'

// Display choices for this browser. Kept apart from study progress, so a
// progress backup restored on another device does not change how it looks there.
export type Theme = 'light' | 'dark'
export type TextSize = 'normal' | 'large' | 'larger'

export const TEXT_SIZES: TextSize[] = ['normal', 'large', 'larger']

const THEME_KEY = 'road-to-pmi-theme'
const TEXT_KEY = 'road-to-pmi-text'
const COURSE_KEY = 'road-to-pmi-course'

interface Prefs {
  theme: Theme
  textSize: TextSize
  /** The certification opened last. Menus that belong to one certification follow it. */
  courseId: string | null
}

function stored(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function read(): Prefs {
  const theme = stored(THEME_KEY)
  const text = stored(TEXT_KEY)
  // Until a theme is chosen here, follow the device's own setting.
  const system: Theme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  return {
    theme: theme === 'light' || theme === 'dark' ? theme : system,
    textSize: TEXT_SIZES.includes(text as TextSize) ? (text as TextSize) : 'normal',
    courseId: stored(COURSE_KEY),
  }
}

// index.html applies the same two attributes before the first paint.
function apply(prefs: Prefs) {
  document.documentElement.dataset.theme = prefs.theme
  document.documentElement.dataset.text = prefs.textSize
}

let state = read()
apply(state)
const listeners = new Set<() => void>()

function save(next: Prefs, key: string, value: string) {
  state = next
  apply(state)
  try {
    localStorage.setItem(key, value)
  } catch {
    // keep the choice for this visit only
  }
  listeners.forEach((l) => l())
}

export const setTheme = (theme: Theme) => save({ ...state, theme }, THEME_KEY, theme)
export const setTextSize = (textSize: TextSize) => save({ ...state, textSize }, TEXT_KEY, textSize)
export function setCourseId(courseId: string) {
  if (state.courseId !== courseId) save({ ...state, courseId }, COURSE_KEY, courseId)
}

export function usePrefs(): Prefs {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => state,
  )
}
