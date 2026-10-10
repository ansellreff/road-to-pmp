import type { Course, ExamQuestion } from './content'
import type { ExamAttempt, ExamRun } from './progress'

/** The real exam allows one 10-minute break, after the first half. */
export const BREAK_MS = 10 * 60 * 1000

export const examKey = (courseId: string, examId: string) => `${courseId}/${examId}`
export const examLimitMs = (course: Course) => course.exam.minutes * 60 * 1000

/** Break time taken so far. A break left running ends by itself after 10 minutes. */
function breakTaken(run: ExamRun, now: number): number {
  if (run.breakStartedAt === undefined) return 0
  return Math.min((run.breakEndedAt ?? now) - run.breakStartedAt, BREAK_MS)
}

export function onBreak(run: ExamRun, now: number): boolean {
  return run.breakStartedAt !== undefined && run.breakEndedAt === undefined && now - run.breakStartedAt < BREAK_MS
}

export const breakLeftMs = (run: ExamRun, now: number) => BREAK_MS - breakTaken(run, now)

/** Exam time used. The clock runs on real time from the start; only the break is taken out. */
export function elapsedMs(run: ExamRun, now: number): number {
  return now - run.startedAt - breakTaken(run, now)
}

/** "2:59:05" */
export function formatClock(ms: number): string {
  const seconds = Math.max(0, Math.ceil(ms / 1000))
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${Math.floor(seconds / 3600)}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`
}

/** "2 h 14 min" */
export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  return minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`
}

/**
 * PMI reports each domain as one of four ratings and does not publish the scores
 * behind them. These thresholds are this platform's own.
 */
export const BANDS = [
  { name: 'Above Target', from: 0.8, style: 'text-done' },
  { name: 'Target', from: 0.65, style: 'text-done' },
  { name: 'Below Target', from: 0.5, style: 'text-critical' },
  { name: 'Needs Improvement', from: 0, style: 'text-critical' },
]

// Judged on the whole percentage that is shown, so "65%" is never rated as below a 65% limit.
export const bandFor = (share: number) =>
  BANDS.find((b) => Math.round(share * 100) >= b.from * 100) ?? BANDS[BANDS.length - 1]

export interface DomainScore {
  domain: number
  right: number
  total: number
}

/** Right answers per domain. An unanswered question counts as wrong, as on the real exam. */
export function domainScores(course: Course, questions: ExamQuestion[], picks: (number | null)[]): DomainScore[] {
  return course.domains.map((_, domain) => {
    const positions = questions.flatMap((q, i) => (q.domain === domain ? [i] : []))
    return {
      domain,
      total: positions.length,
      right: positions.filter((i) => picks[i] === questions[i].question.answer).length,
    }
  })
}

export const countRight = (questions: ExamQuestion[], picks: (number | null)[]) =>
  questions.filter((q, i) => picks[i] === q.question.answer).length

export interface ModuleLoss {
  moduleId: string
  /** Questions answered wrong or left unanswered. */
  lost: number
  total: number
}

/** Where the points went: modules with at least one lost question, most lost first. */
export function moduleLosses(questions: ExamQuestion[], picks: (number | null)[]): ModuleLoss[] {
  const byModule = new Map<string, ModuleLoss>()
  questions.forEach((q, i) => {
    const entry = byModule.get(q.moduleId) ?? { moduleId: q.moduleId, lost: 0, total: 0 }
    entry.total++
    if (picks[i] !== q.question.answer) entry.lost++
    byModule.set(q.moduleId, entry)
  })
  return [...byModule.values()].filter((m) => m.lost > 0).sort((a, b) => b.lost - a.lost || b.lost / b.total - a.lost / a.total)
}

/** "1 min 12 s" */
export function formatSeconds(seconds: number): string {
  const whole = Math.round(seconds)
  return whole >= 60 ? `${Math.floor(whole / 60)} min ${whole % 60} s` : `${whole} s`
}

/** Most recent finished attempt in one mode. */
export function lastAttempt(attempts: ExamAttempt[], mode: ExamAttempt['mode']): ExamAttempt | undefined {
  return [...attempts].reverse().find((a) => a.mode === mode)
}
