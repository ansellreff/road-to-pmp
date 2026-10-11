// How an answer is stored and marked, for every question type.
//
// A single-answer question (and a hot spot, which is one with a drawing) stores the position
// of the chosen option. A matching question stores one whole number too, so that every place
// that saves, syncs or marks answers treats all types alike: each digit is the right-hand item
// chosen for one left-hand item, counted from 1, and 0 means "not chosen yet". With right-hand
// items shown as X, Y, Z, the choices [Z, X, Y] are stored as 312.
//
// This file imports nothing, so the tests can load it directly.

/** The right-hand item chosen for each left-hand item, as shown; null where none is chosen. */
export type MatchChoices = (number | null)[]

/** A matching question has at most this many pairs, so that each choice fits in one digit. */
export const MAX_PAIRS = 5

export function encodeMatch(choices: MatchChoices): number {
  return choices.reduce<number>((code, choice) => code * 10 + (choice === null ? 0 : choice + 1), 0)
}

export function decodeMatch(code: number | null, pairs: number): MatchChoices {
  const digits = String(code ?? 0).padStart(pairs, '0').slice(-pairs)
  return [...digits].map((d) => (d === '0' ? null : Number(d) - 1))
}

/**
 * The stored answer that is fully right when the right-hand items are shown in this order.
 * order[shown position] = position in the question file, where pair i is left i with right i.
 */
export function matchAnswer(order: number[]): number {
  return encodeMatch(order.map((_, left) => order.indexOf(left)))
}

/** True once every left-hand item has a partner. Other question types are complete with any answer. */
export function isComplete(pick: number | null, pairs?: number): boolean {
  if (pick === null) return false
  return pairs === undefined || decodeMatch(pick, pairs).every((choice) => choice !== null)
}

/** Which pairs of a matching answer are right, for the review after marking. */
export function matchResults(pick: number | null, answer: number, pairs: number): boolean[] {
  const chosen = decodeMatch(pick, pairs)
  const right = decodeMatch(answer, pairs)
  return chosen.map((choice, i) => choice !== null && choice === right[i])
}

/**
 * A fixed shuffle of 0..n-1 worked out from a text, so that a module quiz shows the right-hand
 * items of a matching question in the same mixed order every time. It never returns them in
 * their original order, which would show each item beside its partner.
 */
export function seededOrder(seed: string, n: number): number[] {
  let state = 2166136261
  for (const char of seed) state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = state % (i + 1)
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  if (order.every((value, i) => value === i)) order.push(order.shift()!)
  return order
}
