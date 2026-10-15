import type { Course, ExamQuestion } from './content'
import type { ExamAttempt, ExamRun } from './progress'

/** The CAPM exam allows one 10-minute break, after the first half. A course may set other lengths. */
export const BREAK_MS = 10 * 60 * 1000

export const examKey = (courseId: string, examId: string) => `${courseId}/${examId}`
export const examLimitMs = (course: Course) => course.exam.minutes * 60 * 1000

export interface Break {
  startedAt: number
  endedAt?: number
}

/** Every break taken or under way, in order. The first is kept where CAPM has always kept it. */
export function breaksOf(run: ExamRun): Break[] {
  if (run.breakStartedAt === undefined) return []
  return [{ startedAt: run.breakStartedAt, endedAt: run.breakEndedAt }, ...(run.moreBreaks ?? [])]
}

/** Start the break after the current section. */
export function withBreakStarted(run: ExamRun, now: number): ExamRun {
  if (run.breakStartedAt === undefined) return { ...run, breakStartedAt: now }
  return { ...run, moreBreaks: [...(run.moreBreaks ?? []), { startedAt: now }] }
}

/** End the break under way. */
export function withBreakEnded(run: ExamRun, now: number): ExamRun {
  const more = run.moreBreaks ?? []
  if (!more.length) return { ...run, breakEndedAt: now }
  return { ...run, moreBreaks: more.map((b, i) => (i === more.length - 1 ? { ...b, endedAt: now } : b)) }
}

/** Time spent on one break. A break left running ends by itself when its time is up. */
const taken = (b: Break, now: number, limit: number) => Math.min((b.endedAt ?? now) - b.startedAt, limit)

/** Break time taken so far, over all breaks. */
function breakTaken(run: ExamRun, now: number, limit: number): number {
  return breaksOf(run).reduce((sum, b) => sum + taken(b, now, limit), 0)
}

export function onBreak(run: ExamRun, now: number, limit = BREAK_MS): boolean {
  const last = breaksOf(run).at(-1)
  return last !== undefined && last.endedAt === undefined && now - last.startedAt < limit
}

/** Time left on the break under way. */
export function breakLeftMs(run: ExamRun, now: number, limit = BREAK_MS): number {
  const last = breaksOf(run).at(-1)
  return last ? limit - taken(last, now, limit) : limit
}

/** Exam time used. The clock runs on real time from the start; only the breaks are taken out. */
export function elapsedMs(run: ExamRun, now: number, limit = BREAK_MS): number {
  return now - run.startedAt - breakTaken(run, now, limit)
}

/** The positions of one section: [first, end), end not included. Two sections are the two halves. */
export function sectionBounds(total: number, sections: number, index: number): [number, number] {
  return [Math.ceil((total * index) / sections), Math.ceil((total * (index + 1)) / sections)]
}

/** The section open now: one more than the breaks taken. */
export const currentSection = (run: ExamRun, sections: number) => Math.min(breaksOf(run).length, sections - 1)

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
