// A module quiz in progress, kept in this browser per module, so it waits while you read the lesson,
// turn flashcards or reload the page. It is not synced: the results it leads to (recordAnswer and
// recordQuiz in progress.ts) are. Once finished, the run stays as the results page until a new attempt.

const KEY = 'road-to-pmi-quiz-runs'

export interface QuizRun {
  /** Question ids in the order of this attempt. */
  order: string[]
  /** The answer given to each question answered so far. */
  picks: Record<string, number>
  /** Questions marked "not sure", to come back to. */
  notSure: string[]
  /** The position shown now. */
  at: number
  done?: boolean
  /** Only the questions missed last time; not counted as a quiz attempt. */
  retry?: boolean
}

// Kept in memory too, for a browser that refuses to store anything (a private window).
const memory: Record<string, QuizRun | undefined> = {}

function stored(): Record<string, QuizRun> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function loadRun(key: string): QuizRun | undefined {
  return stored()[key] ?? memory[key]
}

export function saveRun(key: string, run: QuizRun | undefined) {
  memory[key] = run
  try {
    const all = stored()
    if (run) all[key] = run
    else delete all[key]
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // kept for this visit only
  }
}

/** Every quiz in progress on this device (with "Delete all progress"). */
export function clearRuns() {
  for (const key of Object.keys(memory)) delete memory[key]
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing stored
  }
}

/** The questions in a new order (Fisher-Yates). */
export function shuffled<T>(items: T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
