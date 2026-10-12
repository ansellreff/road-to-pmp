import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { loadQuiz, type Question } from '../lib/content'
import { moduleKey, recordAnswer, recordQuiz, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet, column, listTitle } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import Icon from './Icon'
import Keys, { type KeyActions } from './Keys'
import { Waiting } from './Page'
import { HotSpot, Strip, useMatchBoard, verdict } from './QuestionParts'
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
    <p className="title mt-6 text-5xl tabular-nums" aria-label={`${right} of ${total} correct`}>
      <CountUp value={right} /> of {total} correct
    </p>
  )
}

/** A number that counts up to its value once, when it first appears. */
export function CountUp({ value }: { value: number }) {
  const still = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [shown, setShown] = useState(still ? value : 0)
  useEffect(() => {
    if (still) return setShown(value)
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 600)
      setShown(Math.round(value * (1 - (1 - t) ** 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, still])
  return <>{shown}</>
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
        key={questions[index].id}
        number={index + 1}
        question={questions[index]}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? setPicked : undefined}
        onNext={picked === null ? undefined : next}
        lively
      />
      <button onClick={next} disabled={picked === null} className={`${btnPrimary} mt-6`}>
        {index + 1 === total ? 'Finish quiz' : 'Next question'}
        <Icon name="next" className="ml-2" />
      </button>
    </div>
  )
}

/**
 * One question of any type: four options, a drawing with areas to select (hot spot),
 * or two lists to pair (matching); a comic strip may tell the situation first.
 * Text is set large with open line spacing, because quizzes and exams are read for
 * hours. Right and wrong are shown by a word and a mark as well as by colour.
 */
export function QuestionView(props: {
  number: number
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (i: number) => void
  /** Keyboard only: Enter or the right arrow. The page keeps its own button for the same step. */
  onNext?: () => void
  /** Keyboard only: the left arrow. */
  onPrevious?: () => void
  /** Keyboard only: F. Passed where questions can be flagged, in real exam mode. */
  onFlag?: () => void
  /** Shown under the question, for example the module it comes from. */
  footer?: ReactNode
  /** Give the answer a moment of motion when it is revealed. Off in reviews and in real exam mode. */
  lively?: boolean
  /** The answer can be changed until the exam is handed in, so a matching answer is saved pair by pair. Real exam mode. */
  changeable?: boolean
}) {
  const { number, question, picked, revealed, onPick, onNext, onPrevious, onFlag, footer, lively = false, changeable = false } = props
  const match = useMatchBoard({ question, picked, revealed, onPick, changeable })
  const hotspot = question.type === 'hotspot'
  const choose = (i: number) => (onPick && i < question.options.length ? () => onPick(i) : undefined)
  const letter = (i: number) => String.fromCharCode(65 + i)
  const move: KeyActions = { Enter: match?.check ?? onNext, ArrowRight: onNext, ArrowLeft: onPrevious, f: onFlag }
  let keys: KeyActions = { a: choose(0), b: choose(1), c: choose(2), d: choose(3), 1: choose(0), 2: choose(1), 3: choose(2), 4: choose(3), ...move }
  let keyNote = 'A to D, or 1 to 4, to answer.'
  if (match) {
    keys = { ...match.keys, ...move }
    keyNote = `1 to ${match.pairs} to select an item, A to ${letter(match.pairs - 1)} to give it an answer, Backspace to take the answer away.${changeable ? '' : ' Enter to check the answer.'}`
  } else if (hotspot) {
    keys = { ...Object.fromEntries(question.options.map((_, i) => [String(i + 1), choose(i)])), ...move }
    keyNote = `1 to ${question.options.length} to select an area.`
  }
  const single = !match && !hotspot
  return (
    <div className="border-b border-line py-7">
      {question.strip && <Strip panels={question.strip} />}
      <p className="text-xl font-semibold leading-relaxed">
        {number}. {question.q}
      </p>
      {match?.board}
      {hotspot && <HotSpot question={question} picked={picked} revealed={revealed} onPick={onPick} />}
      {single && (
      <div className="mt-5 space-y-2.5">
        {question.options.map((option, i) => {
          const correct = i === question.answer
          const wrongPick = revealed && i === picked && !correct
          let style = 'border-edge bg-surface'
          // In an exam the pick stays hidden from marking until the end, so it only shows as selected.
          if (!revealed && i === picked) style = 'border-plan bg-plan-soft ring-2 ring-plan'
          else if (!revealed) style += ' hover:border-plan hover:bg-plan-soft'
          else if (correct) style = `border-done bg-done-soft ring-1 ring-done ${lively && i === picked ? 'pop' : ''}`
          else if (wrongPick) style = `border-critical bg-critical-soft ring-1 ring-critical ${lively ? 'shake' : ''}`
          else style = 'border-line bg-surface text-muted'
          return (
            <button
              key={i}
              disabled={!onPick}
              onClick={(event) => {
                onPick?.(i)
                // After a mouse click the focus leaves the option, so Enter moves on instead of pressing it again.
                if (event.detail > 0) event.currentTarget.blur()
              }}
              aria-pressed={!revealed && onPick ? i === picked : undefined}
              className={`press flex min-h-14 w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border px-4 py-3.5 text-left text-lg leading-relaxed ${style}`}
            >
              <span className="font-bold tabular-nums">{letter(i)}</span>
              <span className="min-w-0 flex-1 basis-64">{option}</span>
              {revealed && correct && (
                <span className="flex items-center gap-1 text-sm font-semibold text-done">
                  <Icon name="check" size={16} />
                  Correct answer
                </span>
              )}
              {wrongPick && (
                <span className="flex items-center gap-1 text-sm font-semibold text-critical">
                  <Icon name="cross" size={16} />
                  Your answer
                </span>
              )}
            </button>
          )
        })}
      </div>
      )}
      {revealed && (
        <div className={`mt-5 border-l-4 border-ink pl-4 ${lively ? 'reveal' : ''}`}>
          {picked !== null && (
            <p className={`font-semibold ${picked === question.answer ? 'text-done' : 'text-critical'}`}>
              {single && picked !== question.answer
                ? `Not correct. The right answer is ${letter(question.answer)}.`
                : verdict(question, picked)}
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
      {(onPick || onNext) && (
        <Keys actions={keys}>
          {keyNote} Enter or the right arrow for the next question
          {onFlag ? ', the left arrow for the previous one. F to flag.' : '.'}
        </Keys>
      )}
    </div>
  )
}
