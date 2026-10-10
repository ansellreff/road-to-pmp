import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { QuestionView } from '../components/Quiz'
import { allModules, courses, loadAllQuestions, type Question } from '../lib/content'
import { moduleKey, recordAnswer, useProgress } from '../lib/progress'
import { moduleNumber } from '../lib/stats'
import { btnPrimary, btnQuiet, link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

/** Enough for one sitting; the rest stay on the dashboard for next time. */
const SESSION_SIZE = 20

interface PracticeItem {
  key: string
  from: string
  to: string
  question: Question
}

async function loadEveryQuestion(): Promise<PracticeItem[]> {
  const quizzes = await Promise.all(
    courses.flatMap((course) =>
      allModules(course)
        .filter((m) => m.ready)
        .map(async (m) => {
          // Includes the questions kept for the unseen mock exam: once missed there, they belong here.
          const questions = await loadAllQuestions(course.id, m.id)
          return questions.map((question) => ({
            key: moduleKey(course.id, m.id),
            from: `${course.title} ${moduleNumber(course, m.id)} ${m.title}`,
            to: `/${course.id}/${m.id}`,
            question,
          }))
        }),
    ),
  )
  return quizzes.flat()
}

/** A quiz made of the questions, from any module, whose latest answer was wrong. */
export default function PracticePage() {
  const everyQuestion = useLoaded(loadEveryQuestion)
  const progress = useProgress()
  const [session, setSession] = useState<PracticeItem[] | null>(null)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const stateOf = (item: PracticeItem) => progress.answers[item.key]?.[item.question.id]
  const missed = (everyQuestion ?? []).filter((item) => stateOf(item)?.lastCorrect === false)

  // The session's questions are fixed when it starts, so answering one does not reshuffle the rest.
  useEffect(() => {
    if (everyQuestion && session === null) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [everyQuestion, session])

  function start() {
    // Most-missed first.
    const worstFirst = [...missed].sort((a, b) => (stateOf(b)?.wrong ?? 0) - (stateOf(a)?.wrong ?? 0))
    setSession(worstFirst.slice(0, SESSION_SIZE))
    setIndex(0)
    setPicked(null)
    setScore(0)
  }

  if (!session) return <p className="text-muted">Collecting the questions to practice</p>

  const item = session[index]

  function next() {
    if (picked === null || !item) return
    const correct = picked === item.question.answer
    recordAnswer(item.key, item.question.id, correct)
    if (correct) setScore(score + 1)
    setPicked(null)
    setIndex(index + 1)
  }

  const heading = (
    <>
      <Link to="/dashboard" className={`${link} text-sm`}>
        Dashboard
      </Link>
      <h1 className="title mt-3 text-4xl">Practice missed questions</h1>
    </>
  )

  if (!session.length) {
    return (
      <div className="max-w-3xl">
        {heading}
        <div className="mt-6 rounded-xl border border-done bg-done-soft p-8">
          <p className="title text-2xl">No questions to practice right now.</p>
          <p className="mt-1 text-muted">
            When you answer a quiz question wrong, it is collected here until you get it right.
          </p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-3xl">
        {heading}
        <p className="title mt-6 text-5xl tabular-nums">
          {score} of {session.length} correct
        </p>
        <p className="mt-2 text-lg font-semibold">
          {missed.length
            ? `${missed.length} ${missed.length === 1 ? 'question is' : 'questions are'} still to practice.`
            : 'You have now answered every missed question correctly.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {missed.length > 0 && (
            <button onClick={start} className={btnPrimary}>
              Practice the remaining questions
            </button>
          )}
          <Link to="/dashboard" className={btnQuiet}>
            Back to the dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      {heading}
      <p className="mt-2 text-sm text-muted">
        Question {index + 1} of {session.length}, from{' '}
        <Link to={item.to} className={link}>
          {item.from}
        </Link>
      </p>
      <QuestionView
        key={`${item.key}/${item.question.id}`}
        number={index + 1}
        question={item.question}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? setPicked : undefined}
      />
      <button onClick={next} disabled={picked === null} className={`${btnPrimary} mt-6`}>
        {index + 1 === session.length ? 'Finish practice' : 'Next question'}
      </button>
    </div>
  )
}
