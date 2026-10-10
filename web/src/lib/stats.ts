import { allModules, type Course, type Domain, type ModuleMeta } from './content'
import { isDue, knownCount, missedIds, moduleCompletion, moduleKey, type Progress } from './progress'

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

/** The written modules just before and after this one, in course order, across domains. */
export function moduleNeighbours(course: Course, moduleId: string): { previous?: ModuleMeta; next?: ModuleMeta } {
  const written = allModules(course).filter((m) => m.ready)
  const at = written.findIndex((m) => m.id === moduleId)
  return at < 0 ? {} : { previous: written[at - 1], next: written[at + 1] }
}

/** First available module that is not finished yet. */
export function nextModule(course: Course, progress: Progress): ModuleMeta | undefined {
  return examModules(allModules(course)).find(
    (m) => m.ready && moduleCompletion(progress, moduleKey(course.id, m.id)) < 1,
  )
}

/** Exam modules that are not finished yet, written or not, in course order. */
export function remainingModules(course: Course, progress: Progress): ModuleMeta[] {
  return examModules(allModules(course)).filter((m) => moduleCompletion(progress, moduleKey(course.id, m.id)) < 1)
}

/** Questions across the course whose most recent answer was wrong. */
export function courseMissed(course: Course, progress: Progress): number {
  return allModules(course).reduce((sum, m) => sum + missedIds(progress, moduleKey(course.id, m.id)).length, 0)
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

/** What to do next in a module: the one button on its card and on the Continue card. */
export function nextStep(course: Course, m: ModuleMeta, progress: Progress): { to: string; label: string; done: boolean } {
  const key = moduleKey(course.id, m.id)
  const base = `/${course.id}/${m.id}`
  const quiz = progress.quizzes[key]
  const deck = progress.cardTotals[key] ?? 0
  const due = Object.values(progress.cards[key] ?? {}).filter(isDue).length
  if (!progress.lessons[key]) return { to: base, label: progress.reading[key] || quiz ? 'Continue the lesson' : 'Start', done: false }
  if (!quiz) return { to: `${base}/quiz`, label: 'Take the quiz', done: false }
  if (quiz.best / quiz.total < 0.7) return { to: `${base}/quiz`, label: 'Retake the quiz', done: false }
  if (!deck || knownCount(progress, key) < deck) return { to: `${base}/flashcards`, label: 'Practice the flashcards', done: false }
  if (due) return { to: `${base}/flashcards`, label: `Review ${due} ${due === 1 ? 'card' : 'cards'}`, done: true }
  return { to: base, label: 'Read again', done: true }
}
