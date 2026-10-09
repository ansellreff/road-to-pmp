import { allModules, type Course, type Domain, type ModuleMeta } from './content'
import { missedIds, moduleCompletion, moduleKey, type Progress } from './progress'

const average = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0)

// Supplementary modules are optional reading, so they never count toward progress.
const examModules = (modules: ModuleMeta[]) => modules.filter((m) => !m.supplementary)

export function domainCompletion(course: Course, domain: Domain, progress: Progress): number {
  return average(examModules(domain.modules).map((m) => moduleCompletion(progress, moduleKey(course.id, m.id))))
}

export function courseCompletion(course: Course, progress: Progress): number {
  return average(examModules(allModules(course)).map((m) => moduleCompletion(progress, moduleKey(course.id, m.id))))
}

/** "1.3"-style number for a module, from its position in the course. */
export function moduleNumber(course: Course, moduleId: string): string {
  for (const [i, domain] of course.domains.entries()) {
    const j = domain.modules.findIndex((m) => m.id === moduleId)
    if (j >= 0) return `${i + 1}.${j + 1}`
  }
  return ''
}

/** First available module that is not finished yet. */
export function nextModule(course: Course, progress: Progress): ModuleMeta | undefined {
  return examModules(allModules(course)).find(
    (m) => m.ready && moduleCompletion(progress, moduleKey(course.id, m.id)) < 1,
  )
}

export interface ModuleStats {
  module: ModuleMeta
  key: string
  lessonRead: boolean
  /** Best quiz score as 0..1, or undefined if the quiz has not been finished. */
  quiz: number | undefined
  /** Questions whose most recent answer was wrong. */
  missed: number
}

export interface DomainStats {
  domain: Domain
  completion: number
  /** Exam modules that are written. */
  modules: ModuleStats[]
  lessonsRead: number
  quizzesTaken: number
  /** Mean of the best quiz scores, 0..1, or undefined if no quiz has been finished. */
  quizAverage: number | undefined
  missed: number
}

export function domainStats(course: Course, domain: Domain, progress: Progress): DomainStats {
  const modules = examModules(domain.modules)
    .filter((m) => m.ready)
    .map((module): ModuleStats => {
      const key = moduleKey(course.id, module.id)
      const result = progress.quizzes[key]
      return {
        module,
        key,
        lessonRead: Boolean(progress.lessons[key]),
        quiz: result ? result.best / result.total : undefined,
        missed: missedIds(progress, key).length,
      }
    })
  const scores = modules.flatMap((m) => (m.quiz === undefined ? [] : [m.quiz]))
  return {
    domain,
    completion: domainCompletion(course, domain, progress),
    modules,
    lessonsRead: modules.filter((m) => m.lessonRead).length,
    quizzesTaken: scores.length,
    quizAverage: scores.length ? average(scores) : undefined,
    missed: modules.reduce((sum, m) => sum + m.missed, 0),
  }
}

/** Every quiz question answered so far, and how many of those answers were right. */
export function answerTotals(progress: Progress): { answered: number; right: number } {
  let answered = 0
  let right = 0
  for (const module of Object.values(progress.answers)) {
    for (const a of Object.values(module)) {
      answered += a.right + a.wrong
      right += a.right
    }
  }
  return { answered, right }
}

export const percent = (value: number) => `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`
