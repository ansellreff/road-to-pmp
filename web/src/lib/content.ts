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

/** One panel of a comic strip: who speaks, and the words. */
export interface StripPanel {
  who: string
  says: string
}

/**
 * A question as the screens use it. Every type has options and one stored answer:
 * - single answer: four options, answer is the position of the right one;
 * - hot spot ("hotspot"): the same, but the options are areas of the drawing named in diagram;
 * - matching ("match"): left holds the left-hand items, options the right-hand items in the
 *   order shown, and answer the fully right pairing as one number (see answers.ts).
 */
export interface Question {
  id: string
  q: string
  type?: 'match' | 'hotspot'
  options: string[]
  answer: number
  /** Matching only: the left-hand items. */
  left?: string[]
  /** A drawing shown with the question. A hot spot is answered by selecting one of its areas. */
  diagram?: string
  /** The situation told as a short conversation, shown above the question. */
  strip?: StripPanel[]
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
const quizFiles = import.meta.glob<StoredQuestion[]>('../content/*/modules/*/quiz.json', { import: 'default' })
const cardFiles = import.meta.glob<Card[]>('../content/*/modules/*/flashcards.json', { import: 'default' })
const examFiles = import.meta.glob<Exam[]>('../content/*/exams.json', { eager: true, import: 'default' })
const sheetFiles = import.meta.glob<SheetGroup[]>('../content/*/sheet.json', { eager: true, import: 'default' })
const sourceFiles = import.meta.glob<SourceLink[]>('../content/*/modules/*/sources.json', { import: 'default' })

import bookList from '../content/books.json'
import { matchAnswer, seededOrder } from './answers'
export const books: Record<string, Book> = bookList

export const courses: Course[] = Object.values(courseFiles)

// The planned order of certifications. One with content in src/content becomes a live course.
export const certifications = [
  { id: 'capm', name: 'CAPM' },
  { id: 'pmp', name: 'PMP' },
  { id: 'pmi-acp', name: 'PMI-ACP' },
  { id: 'pmi-sp', name: 'PMI-SP' },
]

/** Courses with at least one module written. A course still being written is listed but not offered for study. */
export const startedCourses: Course[] = courses.filter((c) => c.domains.some((d) => d.modules.some((m) => m.ready)))

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

/**
 * A question as it is written in quiz.json. A matching question is stored as pairs: left[i]
 * belongs to right[i]. It has no options or answer until it is prepared for the screen.
 */
type StoredQuestion = Omit<Question, 'options' | 'answer'> & { options?: string[]; answer?: number; right?: string[] }

/**
 * Make a stored question ready for the screen, with its options in the given order.
 * order[shown position] = position in the file.
 */
function prepare(stored: StoredQuestion, order?: number[]): Question {
  const { right, ...rest } = stored
  if (stored.type === 'match' && right) {
    const shown = order ?? seededOrder(stored.id + stored.q, right.length)
    return { ...rest, options: shown.map((i) => right[i]), answer: matchAnswer(shown) }
  }
  const options = stored.options ?? []
  const answer = stored.answer ?? 0
  if (!order) return { ...rest, options, answer }
  return { ...rest, options: order.map((i) => options[i]), answer: order.indexOf(answer) }
}

async function loadStored(courseId: string, moduleId: string): Promise<StoredQuestion[]> {
  const load = quizFiles[path(courseId, moduleId, 'quiz.json')]
  return load ? load() : []
}

/** Every question written for a module, including those reserved for the unseen mock exam. */
export async function loadAllQuestions(courseId: string, moduleId: string): Promise<Question[]> {
  return (await loadStored(courseId, moduleId)).map((q) => prepare(q))
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
    await Promise.all(moduleIds.map(async (id) => [id, await loadStored(course.id, id)] as const)),
  )
  return exam.questions.flatMap(([moduleId, questionId, order]) => {
    const source = quizzes.get(moduleId)?.find((q) => q.id === questionId)
    if (!source) return []
    const question = prepare(source, order)
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
