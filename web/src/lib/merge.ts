import type { AnswerState, CardState, ExamAttempt, ExamRecord, Progress, QuizResult } from './progress'

// Joining the progress of two devices that both changed since they last agreed.
// The aim: nothing that was completed is lost. Where the two disagree about the
// same thing and neither is clearly "more", the side that changed later wins.

type Dict<T> = Record<string, T>

/** Every key of both; where both have it, pick decides. */
function join<T>(a: Dict<T> = {}, b: Dict<T> = {}, pick: (a: T, b: T) => T): Dict<T> {
  const out: Dict<T> = { ...a }
  for (const [key, value] of Object.entries(b)) out[key] = key in a ? pick(a[key], value) : value
  return out
}

/**
 * newer is the copy that was changed more recently, older the other one.
 * The result is a new object; neither argument is modified.
 */
export function mergeProgress(newer: Progress, older: Progress): Progress {
  const quiz = (a: QuizResult, b: QuizResult): QuizResult => {
    const last = a.date >= b.date ? a : b
    return { ...last, best: Math.max(a.best, b.best), attempts: Math.max(a.attempts, b.attempts) }
  }
  // The same card rated on both devices: the later change says where it stands now.
  const deck = (a: Dict<CardState>, b: Dict<CardState>) => join(a, b, (fromNewer) => fromNewer)
  const answers = (a: Dict<AnswerState>, b: Dict<AnswerState>) =>
    join(a, b, (n, o) => ({ right: Math.max(n.right, o.right), wrong: Math.max(n.wrong, o.wrong), lastCorrect: n.lastCorrect }))
  const exam = (n: ExamRecord, o: ExamRecord): ExamRecord => {
    // Attempts are told apart by the moment they were submitted.
    const attempts = new Map<string, ExamAttempt>()
    for (const attempt of [...o.attempts, ...n.attempts]) attempts.set(attempt.date, attempt)
    const merged = [...attempts.values()].sort((x, y) => x.date.localeCompare(y.date))
    // An exam in progress follows the later copy, unless that copy never knew the exam.
    return { attempts: merged, ...(n.run ? { run: n.run } : {}) }
  }

  return {
    ...older,
    ...newer,
    version: 2,
    lessons: join(newer.lessons, older.lessons, (a, b) => (a <= b ? a : b)),
    quizzes: join(newer.quizzes, older.quizzes, quiz),
    cards: join(newer.cards, older.cards, deck),
    cardTotals: join(newer.cardTotals, older.cardTotals, Math.max),
    answers: join(newer.answers, older.answers, answers),
    activity: join(newer.activity, older.activity, Math.max),
    examDates: { ...older.examDates, ...newer.examDates },
    exams: join(newer.exams, older.exams, exam),
    reading: { ...older.reading, ...newer.reading },
    milestonesShown:
      newer.milestonesShown || older.milestonesShown
        ? [...new Set([...(older.milestonesShown ?? []), ...(newer.milestonesShown ?? [])])]
        : undefined,
  }
}
