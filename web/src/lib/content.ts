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
  /** Reserved for the unseen mock exam, so the module quiz leaves it out. Set by tools/build_exams.py. */
  examOnly?: boolean
}

/** A fixed mock exam, written by tools/build_exams.py. Each row: module id, question id, option order. */
export interface Exam {
  id: string
  title: string
  /** Its questions appear nowhere else until the exam has been taken. */
  unseen: boolean
  questions: [string, string, number[]][]
}

/** One question of a mock exam, with its options in the exam's own order. */
export interface ExamQuestion {
  moduleId: string
  domain: number
  /** Options as shown in this exam; answer is the position of the right one. */
  question: Question
  /** order[shown position] = position in the module's quiz file. */
  order: number[]
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
const examFiles = import.meta.glob<Exam[]>('../content/*/exams.json', { eager: true, import: 'default' })
const sheetFiles = import.meta.glob<SheetGroup[]>('../content/*/sheet.json', { eager: true, import: 'default' })
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

/** Every question written for a module, including those reserved for the unseen mock exam. */
export async function loadAllQuestions(courseId: string, moduleId: string): Promise<Question[]> {
  const load = quizFiles[path(courseId, moduleId, 'quiz.json')]
  return load ? load() : []
}

/** The module quiz. */
export async function loadQuiz(courseId: string, moduleId: string): Promise<Question[]> {
  return (await loadAllQuestions(courseId, moduleId)).filter((q) => !q.examOnly)
}

/** One line of the formula and key facts sheet. It repeats a lesson section and links to it. */
export interface SheetEntry {
  name: string
  formula?: string
  reading?: string
  example?: string
  items?: string[]
  module: string
  /** The lesson's section heading. Its sources are shown with the entry. */
  section: string
}

export interface SheetGroup {
  title: string
  intro?: string
  entries: SheetEntry[]
}

export function getSheet(courseId: string): SheetGroup[] {
  return sheetFiles[`../content/${courseId}/sheet.json`] ?? []
}

export function getExams(courseId: string): Exam[] {
  return examFiles[`../content/${courseId}/exams.json`] ?? []
}

export async function loadExamQuestions(course: Course, exam: Exam): Promise<ExamQuestion[]> {
  const moduleIds = [...new Set(exam.questions.map(([moduleId]) => moduleId))]
  const quizzes = new Map(
    await Promise.all(moduleIds.map(async (id) => [id, await loadAllQuestions(course.id, id)] as const)),
  )
  return exam.questions.flatMap(([moduleId, questionId, order]) => {
    const source = quizzes.get(moduleId)?.find((q) => q.id === questionId)
    if (!source) return []
    const question = {
      ...source,
      options: order.map((i) => source.options[i]),
      answer: order.indexOf(source.answer),
    }
    const domain = course.domains.findIndex((d) => d.modules.some((m) => m.id === moduleId))
    return [{ moduleId, domain, question, order }]
  })
}

export async function loadSources(courseId: string, moduleId: string): Promise<SourceLink[]> {
  const load = sourceFiles[path(courseId, moduleId, 'sources.json')]
  return load ? load() : []
}

export async function loadCards(courseId: string, moduleId: string): Promise<Card[]> {
  const load = cardFiles[path(courseId, moduleId, 'flashcards.json')]
  return load ? load() : []
}
