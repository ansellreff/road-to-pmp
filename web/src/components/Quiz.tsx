import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { loadQuiz, type Question } from '../lib/content'
import { moduleKey, recordAnswer, recordQuiz, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet, column, listTitle } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import { Waiting } from './Page'
import { SourceItem } from './Sources'

/**
 * One cell per question: green or red once answered, outlined for the current one.
 * results holds true or false for each question answered so far.
 */
export function QuizTrack({ total, results, current }: { total: number; results: boolean[]; current: number }) {
  const right = results.filter(Boolean).length
  return (
    <ol
      className="flex gap-1"
      aria-label={`${results.length} of ${total} questions answered, ${right} correct`}
    >
      {Array.from({ length: total }, (_, i) => {
        let style = 'bg-line'
        if (i < results.length) style = results[i] ? 'bg-done' : 'bg-critical'
        else if (i === current) style = 'bg-surface ring-2 ring-inset ring-plan'
        return <li key={i} className={`h-2.5 flex-1 rounded-[1px] ${style}`} />
      })}
    </ol>
  )
}

/** The big line at the end of a quiz, practice session or exam. */
export function ScoreLine({ right, total }: { right: number; total: number }) {
  return (
    <p className="title mt-6 text-5xl tabular-nums">
      {right} of {total} correct
    </p>
  )
}

export default function Quiz({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const questions = useLoaded(() => loadQuiz(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const previous = useProgress().quizzes[key]
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])

  if (!questions) return <Waiting>Loading the quiz</Waiting>
  if (!questions.length) return <Waiting>This module has no quiz yet.</Waiting>

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
    window.scrollTo(0, 0)
  }

  const shown = picked === null ? answers : [...answers, picked]
  const track = <QuizTrack total={total} results={shown.map(isCorrect)} current={index} />

  if (index >= total) {
    const passed = score / total >= 0.7
    return (
      <div className={column}>
        {track}
        <ScoreLine right={score} total={total} />
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
        <h2 className={`${listTitle} mt-12`}>Your answers</h2>
        {questions.map((q, i) => (
          <QuestionView key={q.id} number={i + 1} question={q} picked={answers[i]} revealed />
        ))}
      </div>
    )
  }

  return (
    <div className={column}>
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

/**
 * One question with its four options. Text is set large with open line spacing,
 * because quizzes and exams are read for hours. Right and wrong are shown by a
 * word and a mark as well as by colour.
 */
export function QuestionView(props: {
  number: number
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (i: number) => void
  /** Shown under the question, for example the module it comes from. */
  footer?: ReactNode
}) {
  const { number, question, picked, revealed, onPick, footer } = props
  const letter = (i: number) => String.fromCharCode(65 + i)
  return (
    <div className="border-b border-line py-7">
      <p className="text-xl font-semibold leading-relaxed">
        {number}. {question.q}
      </p>
      <div className="mt-5 space-y-2.5">
        {question.options.map((option, i) => {
          const correct = i === question.answer
          const wrongPick = revealed && i === picked && !correct
          let style = 'border-edge bg-surface'
          // In an exam the pick stays hidden from marking until the end, so it only shows as selected.
          if (!revealed && i === picked) style = 'border-plan bg-plan-soft ring-2 ring-plan'
          else if (!revealed) style += ' hover:border-plan hover:bg-plan-soft'
          else if (correct) style = 'border-done bg-done-soft ring-1 ring-done'
          else if (wrongPick) style = 'border-critical bg-critical-soft ring-1 ring-critical'
          else style = 'border-line bg-surface text-muted'
          return (
            <button
              key={i}
              disabled={!onPick}
              onClick={() => onPick?.(i)}
              aria-pressed={!revealed && onPick ? i === picked : undefined}
              className={`press flex min-h-14 w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border px-4 py-3.5 text-left text-lg leading-relaxed ${style}`}
            >
              <span className="font-bold tabular-nums">{letter(i)}</span>
              <span className="min-w-0 flex-1 basis-64">{option}</span>
              {revealed && correct && <span className="text-sm font-semibold text-done">✓ Correct answer</span>}
              {wrongPick && <span className="text-sm font-semibold text-critical">✗ Your answer</span>}
            </button>
          )
        })}
      </div>
      {revealed && (
        <div className="mt-5 border-l-4 border-ink pl-4">
          {picked !== null && (
            <p className={`font-semibold ${picked === question.answer ? 'text-done' : 'text-critical'}`}>
              {picked === question.answer
                ? 'Correct.'
                : `Not correct. The right answer is ${letter(question.answer)}.`}
            </p>
          )}
          <p className="mt-1 font-reading text-lg leading-relaxed">{question.explanation}</p>
          {question.links?.length ? (
            <ul className="mt-3 space-y-2 text-sm">
              {question.links.map((source) => (
                <li key={`${source.book}-${source.page}`}>
                  <span className="text-muted">Source: </span>
                  <SourceItem source={source} />
                </li>
              ))}
            </ul>
          ) : (
            question.ref && <p className="mt-2 text-sm text-muted">Source: {question.ref}</p>
          )}
        </div>
      )}
      {footer}
    </div>
  )
}
