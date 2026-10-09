import { allModules, type Course, type Domain, type ModuleMeta } from './content'
import { moduleCompletion, moduleKey, type Progress } from './progress'

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

export const percent = (value: number) => `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`
