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

/** How long the change between light and dark takes; matches the .theme-fade rules in index.css. */
const FADE_MS = 500

/**
 * Change the theme with a soft cross-fade instead of a flash, which is easier on the eyes. Browsers that can
 * cross-fade the whole page do that; others ease the colours. A device that asks for less motion switches at once.
 */
export function setTheme(theme: Theme) {
  const change = () => save({ ...state, theme }, THEME_KEY, theme)
  const root = document.documentElement
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return change()
  const page = document as Document & { startViewTransition?: (update: () => void) => { finished: Promise<void> } }
  if (page.startViewTransition) {
    root.classList.add('theme-fade')
    page
      .startViewTransition(change)
      .finished.catch(() => undefined)
      .finally(() => root.classList.remove('theme-fade'))
    return
  }
  root.classList.add('theme-ease')
  change()
  window.setTimeout(() => root.classList.remove('theme-ease'), FADE_MS + 50)
}
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
