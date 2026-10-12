// Study plan: spreads the modules still to finish over the days left before the exam.
// Days are YYYY-MM-DD strings in local time, the same form progress.ts uses.

const parseDay = (day: string) => {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(day: string, count: number): string {
  const date = parseDay(day)
  date.setDate(date.getDate() + count)
  return date.toLocaleDateString('en-CA')
}

/** Whole days from one day to another. Negative if the second is earlier. */
export function daysBetween(from: string, to: string): number {
  return Math.round((parseDay(to).getTime() - parseDay(from).getTime()) / 86_400_000)
}

/** "Mon 12 Oct", with the year added when it is not the current one. */
export function formatDay(day: string, today: string): string {
  const sameYear = day.slice(0, 4) === today.slice(0, 4)
  return parseDay(day).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: sameYear ? undefined : 'numeric',
  })
}

/** Days kept free before the exam for review and practice exams: a quarter of the time, at most a week. */
export const reviewDaysFor = (daysLeft: number) => Math.max(0, Math.min(7, Math.floor(daysLeft / 4)))

export interface PlanItem<T> {
  item: T
  /** Last day on which this item should be finished to stay on pace. */
  finishBy: string
}

export interface StudyPlan<T> {
  /** Days from today to the exam. 0 means the exam is today; negative means the date has passed. */
  daysLeft: number
  /** Days available for new modules, counting today. 0 when the exam is today or past. */
  studyDays: number
  reviewDays: number
  /** First day of the final review, or undefined when there is no room for one. */
  reviewStart: string | undefined
  /** Modules to finish per week to stay on pace. */
  perWeek: number
  items: PlanItem<T>[]
}

export interface PlannedExam {
  /** Position of the mock exam in the course's list, counted from 0. */
  index: number
  day: string
}

/**
 * Dates for the mock exams inside the final review. The last exam of the list
 * sits two days before the real exam, and the others are spread evenly before it. When the
 * review is too short for all of them, the earliest ones are scheduled and then the last one.
 */
export function planMockExams(
  plan: { reviewStart: string | undefined; reviewDays: number },
  examDate: string,
  count: number,
): PlannedExam[] {
  const start = plan.reviewStart
  if (!start || count === 0) return []
  const lastDay = addDays(examDate, plan.reviewDays >= 2 ? -2 : -1)
  const span = daysBetween(start, lastDay)
  const slots = Math.min(count, span + 1)
  return Array.from({ length: slots }, (_, i) => ({
    index: i === slots - 1 ? count - 1 : i,
    day: slots === 1 ? lastDay : addDays(start, Math.round((i * span) / (slots - 1))),
  }))
}

/**
 * Lay the remaining items out evenly over the study days. The plan is rebuilt from
 * whatever is still unfinished each time, so a missed day spreads over the days left
 * instead of piling up.
 */
export function buildPlan<T>(today: string, examDate: string, remaining: T[]): StudyPlan<T> {
  const daysLeft = daysBetween(today, examDate)
  const reviewDays = reviewDaysFor(daysLeft)
  const studyDays = Math.max(0, daysLeft - reviewDays)
  const count = remaining.length
  const items = remaining.map((item, i) => ({
    item,
    // Item i of n is finished by the end of its share of the study days.
    finishBy: addDays(today, Math.max(0, Math.ceil(((i + 1) * studyDays) / count) - 1)),
  }))
  return {
    daysLeft,
    studyDays,
    reviewDays,
    reviewStart: reviewDays > 0 ? addDays(examDate, -reviewDays) : undefined,
    perWeek: studyDays > 0 ? (count / studyDays) * 7 : count,
    items,
  }
}
