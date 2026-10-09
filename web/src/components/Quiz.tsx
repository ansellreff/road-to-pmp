import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadQuiz, type Question } from '../lib/content'
import { moduleKey, recordAnswer, recordQuiz, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import { SourceItem } from './Sources'

export default function Quiz({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const questions = useLoaded(() => loadQuiz(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const previous = useProgress().quizzes[key]
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])

  if (!questions) return <p className="text-muted">Loading the quiz</p>
  if (!questions.length) return <p className="text-muted">This module has no quiz yet.</p>

  const total = questions.length
  const isCorrect = (answer: number, i: number) => answer === questions[i].answer
  const score = answers.filter(isCorrect).length

  function restart() {
    setIndex(0)
    setPicked(null)
    setAnswers([])
  }

  function next() {
    if (picked === null) return
    // Each answer is kept per question, so missed ones can be practiced from the dashboard.
    recordAnswer(key, questions![index].id, isCorrect(picked, index))
    const all = [...answers, picked]
    setAnswers(all)
    setPicked(null)
    setIndex(index + 1)
    if (all.length === total) recordQuiz(key, all.filter(isCorrect).length, total)
  }

  // One cell per question: green or red once answered, outlined for the current one.
  const shown = picked === null ? answers : [...answers, picked]
  const track = (
    <ol className="flex gap-1" aria-label={`${shown.length} of ${total} questions answered`}>
      {questions.map((q, i) => {
        let style = 'bg-line'
        if (i < shown.length) style = isCorrect(shown[i], i) ? 'bg-done' : 'bg-critical'
        else if (i === index) style = 'bg-surface ring-2 ring-inset ring-plan'
        return <li key={q.id} className={`h-2.5 flex-1 rounded-[1px] ${style}`} />
      })}
    </ol>
  )

  if (index >= total) {
    const passed = score / total >= 0.7
    return (
      <div className="max-w-3xl">
        {track}
        <p className="title mt-6 text-5xl tabular-nums">
          {score} of {total} correct
        </p>
        <p className={`mt-2 text-lg font-semibold ${passed ? 'text-done' : 'text-critical'}`}>
          {passed
            ? 'That is above the 70% target for this module.'
            : 'Below the 70% target. Read the explanations below, then try again.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={restart} className={btnPrimary}>
            Take the quiz again
          </button>
          <Link to={`/${courseId}/${moduleId}/flashcards`} className={btnQuiet}>
            Practice flashcards
          </Link>
        </div>
        <h2 className="title mt-12 border-b-2 border-ink pb-2 text-2xl">Your answers</h2>
        {questions.map((q, i) => (
          <QuestionView key={q.id} number={i + 1} question={q} picked={answers[i]} revealed />
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      {track}
      <div className="mt-3 flex justify-between text-sm text-muted">
        <span>
          Question {index + 1} of {total}
        </span>
        {previous && (
          <span>
            Your best score: {previous.best} of {previous.total}
          </span>
        )}
      </div>
      <QuestionView
        number={index + 1}
        question={questions[index]}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? setPicked : undefined}
      />
      <button onClick={next} disabled={picked === null} className={`${btnPrimary} mt-6`}>
        {index + 1 === total ? 'Finish quiz' : 'Next question'}
      </button>
    </div>
  )
}

export function QuestionView(props: {
  number: number
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (i: number) => void
}) {
  const { number, question, picked, revealed, onPick } = props
  return (
    <div className="border-b border-line py-6">
      <p className="text-lg font-semibold leading-snug">
        {number}. {question.q}
      </p>
      <div className="mt-4 space-y-2">
        {question.options.map((option, i) => {
          const correct = i === question.answer
          const wrongPick = revealed && i === picked && !correct
          let style = 'border-line bg-surface'
          if (!revealed) style += ' hover:border-plan hover:bg-plan-soft'
          else if (correct) style = 'border-done bg-done-soft'
          else if (wrongPick) style = 'border-critical bg-critical-soft'
          else style += ' text-muted'
          return (
            <button
              key={i}
              disabled={!onPick}
              onClick={() => onPick?.(i)}
              className={`flex w-full items-baseline gap-3 rounded-md border px-4 py-3 text-left ${style}`}
            >
              <span className="font-bold tabular-nums">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1">{option}</span>
              {revealed && correct && <span className="text-sm font-semibold text-done">Correct answer</span>}
              {wrongPick && <span className="text-sm font-semibold text-critical">Your answer</span>}
            </button>
          )
        })}
      </div>
      {revealed && (
        <div className="mt-4 border-l-4 border-ink pl-4">
          <p className="font-reading leading-relaxed">{question.explanation}</p>
          {question.links?.length ? (
            <ul className="mt-2 space-y-2 text-sm">
              {question.links.map((source) => (
                <li key={`${source.book}-${source.page}`}>
                  <span className="text-muted">Source: </span>
                  <SourceItem source={source} />
                </li>
              ))}
            </ul>
          ) : (
            question.ref && <p className="mt-1 text-sm text-muted">Source: {question.ref}</p>
          )}
        </div>
      )}
    </div>
  )
}
