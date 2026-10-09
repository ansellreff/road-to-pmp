import { useSyncExternalStore } from 'react'

export interface QuizResult {
  best: number
  last: number
  total: number
  attempts: number
  date: string
}

export type CardStatus = 'know' | 'review'

export interface Progress {
  version: 1
  lessons: Record<string, string>
  quizzes: Record<string, QuizResult>
  cards: Record<string, Record<string, CardStatus>>
  cardTotals: Record<string, number>
}

const KEY = 'road-to-pmi-progress'
const empty = (): Progress => ({ version: 1, lessons: {}, quizzes: {}, cards: {}, cardTotals: {} })

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...empty(), ...JSON.parse(raw) }
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

export function setLessonDone(key: string, done: boolean) {
  const lessons = { ...state.lessons }
  if (done) lessons[key] = new Date().toISOString()
  else delete lessons[key]
  commit({ ...state, lessons })
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

export function setCardStatus(key: string, cardId: string, status: CardStatus, deckSize: number) {
  const forModule = { ...state.cards[key], [cardId]: status }
  commit({
    ...state,
    cards: { ...state.cards, [key]: forModule },
    cardTotals: { ...state.cardTotals, [key]: deckSize },
  })
}

export function clearQuiz(key: string) {
  const quizzes = { ...state.quizzes }
  delete quizzes[key]
  commit({ ...state, quizzes })
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
  if (!data || typeof data !== 'object' || data.version !== 1) {
    throw new Error('This file is not a Road to PMI progress backup.')
  }
  commit({ ...empty(), ...data })
}

export function resetProgress() {
  commit(empty())
}

/** 0..1 completion for one module: lesson read, quiz passed at 70%, cards known. */
export function moduleCompletion(p: Progress, key: string): number {
  const lesson = p.lessons[key] ? 1 : 0
  const quiz = p.quizzes[key]
  const quizPart = quiz ? Math.min(1, quiz.best / quiz.total / 0.7) : 0
  const known = Object.values(p.cards[key] ?? {}).filter((s) => s === 'know').length
  const deckSize = p.cardTotals[key] ?? 0
  const cardPart = deckSize ? Math.min(1, known / deckSize) : 0
  return (lesson + quizPart + cardPart) / 3
}
