import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import NotFound from '../components/NotFound'
import { PageHeader, Waiting } from '../components/Page'
import { QuestionView } from '../components/Quiz'
import { allModules, getCourse, loadQuiz, type Course, type Question } from '../lib/content'
import { btnQuiet, column, note, sectionTitle } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

const kinds: { id: string; title: string; how: string; has: (q: Question) => boolean }[] = [
  {
    id: 'match',
    title: 'Matching',
    how: 'Two lists. Give every item on the left its partner on the right, then check. It counts as correct only when every pair is right. PMI does not publish how it marks these, so this is the stricter reading.',
    has: (q) => q.type === 'match',
  },
  {
    id: 'hotspot',
    title: 'Hot spot',
    how: 'A drawing with numbered areas. Read the answer from the drawing and select one area.',
    has: (q) => q.type === 'hotspot',
  },
  {
    id: 'strip',
    title: 'Comic strip',
    how: 'The situation is told as a short conversation, followed by one multiple choice question. The real exam may show it as an animation at a test centre.',
    has: (q) => Boolean(q.strip),
  },
]

async function loadTyped(course: Course): Promise<Question[]> {
  const quizzes = await Promise.all(
    allModules(course)
      .filter((m) => m.ready)
      .map((m) => loadQuiz(course.id, m.id)),
  )
  return quizzes.flat().filter((q) => kinds.some((kind) => kind.has(q)))
}

/** One question of each kind the real exam has beside multiple choice, to try before a mock exam. */
export default function QuestionTypesPage() {
  const course = getCourse(useParams().courseId)
  if (!course) return <NotFound />
  return <Loaded key={course.id} course={course} />
}

function Loaded({ course }: { course: Course }) {
  const questions = useLoaded(() => loadTyped(course))
  const [params, setParams] = useSearchParams()
  if (!questions) return <Waiting>Loading the questions</Waiting>
  const present = kinds.filter((kind) => questions.some(kind.has))
  const open = present.find((kind) => kind.id === params.get('type')) ?? present[0]
  const show = (id: string) => {
    const next = new URLSearchParams(params)
    next.set('type', id)
    setParams(next, { replace: true, preventScrollReset: true })
  }
  return (
    <div className={column}>
      <PageHeader back={{ to: `/${course.id}/exams`, label: 'Mock exams' }} title="Question types">
        Most questions of the real exam are multiple choice. A few come in the three other forms below. Try each one
        here; answers on this page are not saved.
      </PageHeader>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Question type">
        {present.map((kind) => (
          <button
            key={kind.id}
            onClick={() => show(kind.id)}
            aria-pressed={kind === open}
            className={`press min-h-11 rounded-md border px-3 py-1.5 font-medium ${
              kind === open ? 'border-plan bg-plan-soft text-plan ring-1 ring-plan' : 'border-edge bg-surface hover:border-ink'
            }`}
          >
            {kind.title}
          </button>
        ))}
      </div>
      {/* One type at a time, so the keyboard keys belong to the question on screen. */}
      {(open ? [open] : []).map((kind) => {
        const pool = questions.filter(kind.has)
        const at = (Number(params.get(kind.id)) || 0) % pool.length
        const another = () => {
          const next = new URLSearchParams(params)
          next.set(kind.id, String((at + 1) % pool.length))
          setParams(next, { replace: true, preventScrollReset: true })
        }
        return (
          <section key={kind.id} className="mt-8">
            <h2 className={sectionTitle}>{kind.title}</h2>
            <p className={`${note} mt-2`}>{kind.how}</p>
            <Sample key={pool[at].id + pool[at].q} question={pool[at]} />
            {pool.length > 1 && (
              <button onClick={another} className={`${btnQuiet} mt-4`}>
                Show another {kind.title.toLowerCase()} question ({at + 1} of {pool.length})
              </button>
            )}
          </section>
        )
      })}
      {!questions.length && <p className="mt-8 text-muted">This course has only multiple choice questions so far.</p>}
    </div>
  )
}

function Sample({ question }: { question: Question }) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <QuestionView
      number={1}
      question={question}
      picked={picked}
      revealed={picked !== null}
      onPick={picked === null ? setPicked : undefined}
      lively
    />
  )
}
