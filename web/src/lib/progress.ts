import { useSyncExternalStore } from 'react'

export interface QuizResult {
  best: number
  last: number
  total: number
  attempts: number
  date: string
}

/**
 * Spaced repetition state of one flashcard (Leitner boxes).
 * box 0 = still learning. Each correct answer moves the card up a box and
 * pushes its next review further away; a miss sends it back to box 0.
 */
export interface CardState {
  box: number
  /** Next review day, as YYYY-MM-DD in local time. */
  due: string
}

/** How one quiz question has gone so far, across module quizzes and practice sessions. */
export interface AnswerState {
  right: number
  wrong: number
  /** Whether the most recent answer was correct. A question stays "to practice" until it is. */
  lastCorrect: boolean
}

export interface Progress {
  version: 2
  lessons: Record<string, string>
  quizzes: Record<string, QuizResult>
  cards: Record<string, Record<string, CardState>>
  cardTotals: Record<string, number>
  /** Per module, per question id. Added after version 2 shipped, so older saves simply have none. */
  answers: Record<string, Record<string, AnswerState>>
  /** Study actions per day (YYYY-MM-DD, local time), for the study streak. */
  activity: Record<string, number>
  /** Planned exam day per course (YYYY-MM-DD), for the study plan. Older saves have none. */
  examDates: Record<string, string>
}

/** Days until the next review, by box. */
export const REVIEW_INTERVALS = [0, 1, 3, 7, 14, 30]

const KEY = 'road-to-pmi-progress'
const empty = (): Progress => ({
  version: 2,
  lessons: {},
  quizzes: {},
  cards: {},
  cardTotals: {},
  answers: {},
  activity: {},
  examDates: {},
})

export function today(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  // en-CA formats as YYYY-MM-DD, in local time
  return d.toLocaleDateString('en-CA')
}

export const isKnown = (state: CardState | undefined) => Boolean(state && state.box > 0)
export const isDue = (state: CardState | undefined) => Boolean(state && state.due <= today())

/** Version 1 stored 'know' or 'review' per card. Known cards start in box 1, due tomorrow. */
function migrate(data: any): Progress {
  if (!data || typeof data !== 'object') return empty()
  if (data.version === 1) {
    const cards: Progress['cards'] = {}
    for (const [module, deck] of Object.entries<Record<string, string>>(data.cards ?? {})) {
      cards[module] = {}
      for (const [cardId, status] of Object.entries(deck)) {
        cards[module][cardId] = status === 'know' ? { box: 1, due: today(1) } : { box: 0, due: today() }
      }
    }
    return { ...empty(), ...data, cards, version: 2 }
  }
  return { ...empty(), ...data }
}

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return migrate(JSON.parse(raw))
  } catch {
    // storage unavailable or corrupted: start fresh in memory
  }
  return empty()
}

let state = read()
const listeners = new Set<() => void>()

function commit(next: Progress) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // keep working in memory
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, () => state)
}

export const moduleKey = (courseId: string, moduleId: string) => `${courseId}/${moduleId}`

/** Today's count of study actions, plus one. */
function studiedToday(): Progress['activity'] {
  const day = today()
  return { ...state.activity, [day]: (state.activity[day] ?? 0) + 1 }
}

export function setLessonDone(key: string, done: boolean) {
  const lessons = { ...state.lessons }
  if (done) lessons[key] = new Date().toISOString()
  else delete lessons[key]
  commit({ ...state, lessons, activity: done ? studiedToday() : state.activity })
}

/** Set the planned exam day for a course, or remove it with an empty value. */
export function setExamDate(courseId: string, day: string) {
  const examDates = { ...state.examDates }
  if (day) examDates[courseId] = day
  else delete examDates[courseId]
  commit({ ...state, examDates })
}

/** Record the answer to one quiz question, from a module quiz or a practice session. */
export function recordAnswer(key: string, questionId: string, correct: boolean) {
  const previous = state.answers[key]?.[questionId]
  const next: AnswerState = {
    right: (previous?.right ?? 0) + (correct ? 1 : 0),
    wrong: (previous?.wrong ?? 0) + (correct ? 0 : 1),
    lastCorrect: correct,
  }
  commit({
    ...state,
    answers: { ...state.answers, [key]: { ...state.answers[key], [questionId]: next } },
    activity: studiedToday(),
  })
}

export function recordQuiz(key: string, score: number, total: number) {
  const prev = state.quizzes[key]
  const result: QuizResult = {
    best: Math.max(score, prev?.best ?? 0),
    last: score,
    total,
    attempts: (prev?.attempts ?? 0) + 1,
    date: new Date().toISOString(),
  }
  commit({ ...state, quizzes: { ...state.quizzes, [key]: result } })
}

/** Record one flashcard answer and schedule the card's next review. Returns the new state. */
export function rateCard(key: string, cardId: string, knewIt: boolean, deckSize?: number): CardState {
  const previous = state.cards[key]?.[cardId]
  const box = knewIt ? Math.min((previous?.box ?? 0) + 1, REVIEW_INTERVALS.length - 1) : 0
  const next: CardState = { box, due: today(REVIEW_INTERVALS[box]) }
  commit({
    ...state,
    cards: { ...state.cards, [key]: { ...state.cards[key], [cardId]: next } },
    cardTotals: deckSize === undefined ? state.cardTotals : { ...state.cardTotals, [key]: deckSize },
    activity: studiedToday(),
  })
  return next
}

/** Forget a module's quiz score and its per-question history. */
export function clearQuiz(key: string) {
  const quizzes = { ...state.quizzes }
  const answers = { ...state.answers }
  delete quizzes[key]
  delete answers[key]
  commit({ ...state, quizzes, answers })
}

export function clearCards(key: string) {
  const cards = { ...state.cards }
  delete cards[key]
  commit({ ...state, cards })
}

export function exportProgress(): string {
  return JSON.stringify(state, null, 2)
}

export function importProgress(json: string) {
  const data = JSON.parse(json)
  if (!data || typeof data !== 'object' || (data.version !== 1 && data.version !== 2)) {
    throw new Error('This file is not a Road to PMI progress backup.')
  }
  commit(migrate(data))
}

export function resetProgress() {
  commit(empty())
}

export function knownCount(p: Progress, key: string): number {
  return Object.values(p.cards[key] ?? {}).filter(isKnown).length
}

/** Number of cards across all modules whose review day has arrived. */
export function dueCount(p: Progress): number {
  return Object.values(p.cards).reduce((sum, deck) => sum + Object.values(deck).filter(isDue).length, 0)
}

/** Ids of a module's questions whose most recent answer was wrong. */
export function missedIds(p: Progress, key: string): string[] {
  return Object.entries(p.answers[key] ?? {})
    .filter(([, a]) => !a.lastCorrect)
    .map(([id]) => id)
}

/** Consecutive study days up to today. A day not yet studied today does not break the run. */
export function studyStreak(p: Progress): number {
  let back = p.activity[today()] ? 0 : 1
  let days = 0
  while (p.activity[today(-back)]) {
    days++
    back++
  }
  return days
}

/** 0..1 completion for one module: lesson read, quiz passed at 70%, cards known. */
export function moduleCompletion(p: Progress, key: string): number {
  const lesson = p.lessons[key] ? 1 : 0
  const quiz = p.quizzes[key]
  const quizPart = quiz ? Math.min(1, quiz.best / quiz.total / 0.7) : 0
  const deckSize = p.cardTotals[key] ?? 0
  const cardPart = deckSize ? Math.min(1, knownCount(p, key) / deckSize) : 0
  return (lesson + quizPart + cardPart) / 3
}
