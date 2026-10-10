import { getExams, type Course } from './content'
import { examKey } from './exam'
import type { Progress } from './progress'
import { domainStats } from './stats'

// An estimate of how prepared the learner is, from work actually done. It is not a
// prediction of passing: PMI does not publish a pass mark.

/** When mock exams have been taken they count for this share of a domain; quizzes for the rest. */
export const MOCK_SHARE = 0.6

export interface DomainReadiness {
  /** 0..1 */
  value: number
  weight: number
  /** Mean of the best quiz scores, counting a quiz not yet taken as zero. */
  quizzes: number
  quizzesTaken: number
  quizzesTotal: number
  /** Mean share of right answers in this domain over the latest attempt of each mock exam taken. */
  mocks: number | undefined
  mocksTaken: number
}

export interface Readiness {
  /** 0..1, the domains combined by their exam weight. */
  value: number
  domains: DomainReadiness[]
  /** The domain where study would raise the estimate most: the largest weight times what is missing. */
  focus: number
  /** Nothing has been done yet, so there is nothing to estimate from. */
  empty: boolean
}

export function readiness(course: Course, progress: Progress): Readiness {
  // The latest attempt of each mock exam, where its result per domain is known.
  const latest = getExams(course.id).flatMap((exam) => {
    const attempts = progress.exams[examKey(course.id, exam.id)]?.attempts ?? []
    const last = attempts[attempts.length - 1]
    return last?.domains ? [last.domains] : []
  })

  const domains = course.domains.map((domain, d): DomainReadiness => {
    const stats = domainStats(course, domain, progress)
    const total = stats.modules.length
    const quizzes = total ? stats.modules.reduce((sum, m) => sum + (m.quiz ?? 0), 0) / total : 0
    const shares = latest.flatMap((result) => (result[d]?.total ? [result[d].right / result[d].total] : []))
    const mocks = shares.length ? shares.reduce((a, b) => a + b, 0) / shares.length : undefined
    return {
      value: mocks === undefined ? quizzes : MOCK_SHARE * mocks + (1 - MOCK_SHARE) * quizzes,
      weight: domain.weight,
      quizzes,
      quizzesTaken: stats.quizzesTaken,
      quizzesTotal: total,
      mocks,
      mocksTaken: shares.length,
    }
  })

  const value = domains.reduce((sum, d) => sum + (d.weight / 100) * d.value, 0)
  const gaps = domains.map((d) => d.weight * (1 - d.value))
  return {
    value,
    domains,
    focus: gaps.indexOf(Math.max(...gaps)),
    empty: domains.every((d) => d.quizzesTaken === 0 && d.mocksTaken === 0),
  }
}
