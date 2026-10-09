import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadQuiz, type Question } from '../lib/content'
import { moduleKey, recordQuiz, useProgress } from '../lib/progress'
import { useLoaded } from '../lib/useLoaded'

export default function Quiz({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const questions = useLoaded(() => loadQuiz(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const previous = useProgress().quizzes[key]
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])

  if (!questions) return <p className="text-slate-500">Loading…</p>
  if (!questions.length) return <p className="text-slate-500">No quiz for this module yet.</p>

  const total = questions.length
  const score = answers.filter((a, i) => a === questions[i].answer).length

  function restart() {
    setIndex(0)
    setPicked(null)
    setAnswers([])
  }

  function next() {
    if (picked === null) return
    const all = [...answers, picked]
    setAnswers(all)
    setPicked(null)
    setIndex(index + 1)
    if (all.length === total) {
      recordQuiz(key, all.filter((a, i) => a === questions![i].answer).length, total)
    }
  }

  if (index >= total) {
    const pct = Math.round((score / total) * 100)
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          <div className="text-4xl font-bold text-slate-900">
            {score} / {total}
          </div>
          <p className={`mt-1 font-medium ${pct >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
            {pct}% · {pct >= 70 ? 'Good work' : 'Review the lesson and try again'}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={restart}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Try again
            </button>
            <Link
              to={`/${courseId}/${moduleId}/flashcards`}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100"
            >
              Go to flashcards
            </Link>
          </div>
        </div>
        <h2 className="font-semibold text-slate-900">Review</h2>
        {questions.map((q, i) => (
          <QuestionCard key={q.id} number={i + 1} question={q} picked={answers[i]} revealed />
        ))}
      </div>
    )
  }

  const question = questions[index]
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          Question {index + 1} of {total}
        </span>
        {previous && (
          <span>
            Best score: {previous.best}/{previous.total}
          </span>
        )}
      </div>
      <QuestionCard
        number={index + 1}
        question={question}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? setPicked : undefined}
      />
      <button
        onClick={next}
        disabled={picked === null}
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {index + 1 === total ? 'Finish quiz' : 'Next question'}
      </button>
    </div>
  )
}

function QuestionCard(props: {
  number: number
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (i: number) => void
}) {
  const { number, question, picked, revealed, onPick } = props
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="font-medium text-slate-900">
        {number}. {question.q}
      </p>
      <div className="mt-3 space-y-2">
        {question.options.map((option, i) => {
          const correct = i === question.answer
          let style = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
          if (revealed && correct) style = 'border-emerald-400 bg-emerald-50'
          else if (revealed && i === picked) style = 'border-red-300 bg-red-50'
          else if (revealed) style = 'border-slate-200 opacity-70'
          return (
            <button
              key={i}
              disabled={!onPick}
              onClick={() => onPick?.(i)}
              className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left text-sm ${style}`}
            >
              <span className="font-semibold text-slate-500">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1">{option}</span>
              {revealed && correct && <span className="text-emerald-700">✓ Correct</span>}
              {revealed && !correct && i === picked && <span className="text-red-700">✗ Your answer</span>}
            </button>
          )
        })}
      </div>
      {revealed && (
        <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {question.explanation}
          {question.ref && <span className="mt-1 block text-xs text-slate-500">Reference: {question.ref}</span>}
        </div>
      )}
    </div>
  )
}
