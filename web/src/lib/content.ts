export interface ModuleMeta {
  id: string
  title: string
  ready: boolean
  /** Extra reading that is not exam content. Left out of progress totals. */
  supplementary?: boolean
}

/** A place in one of the source books. page is the PDF page, counted from 1. */
export interface SourceLink {
  book: string
  page: number
  label: string
}

export interface Book {
  title: string
  file: string
}

export interface Domain {
  id: string
  title: string
  weight: number
  modules: ModuleMeta[]
}

export interface Course {
  id: string
  title: string
  subtitle: string
  exam: { questions: number; minutes: number }
  domains: Domain[]
}

export interface Question {
  id: string
  q: string
  options: string[]
  answer: number
  explanation: string
  ref?: string
  /** Filled in by tools/link_sources.py from ref. */
  links?: SourceLink[]
}

export interface Card {
  id: string
  front: string
  back: string
}

// Adding a certification = adding a folder under src/content/. No code changes.
const courseFiles = import.meta.glob<Course>('../content/*/course.json', { eager: true, import: 'default' })
const lessonFiles = import.meta.glob<string>('../content/*/modules/*/lesson.md', { query: '?raw', import: 'default' })
const quizFiles = import.meta.glob<Question[]>('../content/*/modules/*/quiz.json', { import: 'default' })
const cardFiles = import.meta.glob<Card[]>('../content/*/modules/*/flashcards.json', { import: 'default' })
const sourceFiles = import.meta.glob<SourceLink[]>('../content/*/modules/*/sources.json', { import: 'default' })

import bookList from '../content/books.json'
export const books: Record<string, Book> = bookList

export const courses: Course[] = Object.values(courseFiles)

export function getCourse(courseId: string | undefined): Course | undefined {
  return courses.find((c) => c.id === courseId)
}

export function allModules(course: Course): ModuleMeta[] {
  return course.domains.flatMap((d) => d.modules)
}

export function findModule(course: Course, moduleId: string | undefined) {
  for (const domain of course.domains) {
    const module = domain.modules.find((m) => m.id === moduleId)
    if (module) return { domain, module }
  }
  return undefined
}

const path = (courseId: string, moduleId: string, file: string) => `../content/${courseId}/modules/${moduleId}/${file}`

export async function loadLesson(courseId: string, moduleId: string): Promise<string> {
  const load = lessonFiles[path(courseId, moduleId, 'lesson.md')]
  return load ? load() : ''
}

export async function loadQuiz(courseId: string, moduleId: string): Promise<Question[]> {
  const load = quizFiles[path(courseId, moduleId, 'quiz.json')]
  return load ? load() : []
}

export async function loadSources(courseId: string, moduleId: string): Promise<SourceLink[]> {
  const load = sourceFiles[path(courseId, moduleId, 'sources.json')]
  return load ? load() : []
}

export async function loadCards(courseId: string, moduleId: string): Promise<Card[]> {
  const load = cardFiles[path(courseId, moduleId, 'flashcards.json')]
  return load ? load() : []
}
