import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { loadQuiz, type Question } from '../lib/content'
import { moduleKey, recordAnswer, recordQuiz, useProgress } from '../lib/progress'
import { loadRun, saveRun, shuffled, type QuizRun } from '../lib/quizRun'
import { btnPrimary, btnQuiet, column, listTitle, note } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import Icon from './Icon'
import Keys, { type KeyActions } from './Keys'
import MessageDialog from './MessageDialog'
import { Waiting } from './Page'
import { CasePanel, Graphic, HotSpot, Strip, useDropdownBoard, useMatchBoard, useMultiBoard, verdict } from './QuestionParts'
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

type CellState = 'right' | 'wrong' | 'open'

/**
 * The question map: one box per question, to jump to any of them. Green right, red wrong, plain not answered,
 * a yellow corner for "not sure", the outline for the question shown. On a phone it opens on request.
 */
function QuestionMap({ cells, current, onGo }: { cells: { state: CellState; notSure: boolean }[]; current: number; onGo: (i: number) => void }) {
  const [open, setOpen] = useState(false)
  const left = cells.filter((c) => c.state === 'open').length
  const words: Record<CellState, string> = { right: 'right', wrong: 'wrong', open: 'not answered' }
  const style: Record<CellState, string> = {
    right: 'border-done bg-done-soft',
    wrong: 'border-critical bg-critical-soft',
    open: 'border-edge bg-surface hover:border-plan hover:bg-plan-soft',
  }
  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={`${btnQuiet} w-full justify-between sm:hidden`}>
        {open ? 'Hide the question map' : `Question map: ${left} not answered`}
        <Icon name="down" className={open ? 'rotate-180' : ''} />
      </button>
      <ol aria-label="Question map" className={`${open ? 'grid' : 'hidden'} mt-2 grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-1.5 sm:mt-0 sm:grid`}>
        {cells.map((cell, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onGo(i)}
              aria-current={i === current ? 'step' : undefined}
              aria-label={`Question ${i + 1}, ${words[cell.state]}${cell.notSure ? ', not sure' : ''}`}
              className={`press relative flex h-11 w-full items-center justify-center rounded-md border text-sm font-semibold tabular-nums ${style[cell.state]} ${
                i === current ? 'ring-2 ring-plan ring-offset-1 ring-offset-surface' : ''
              }`}
            >
              {i + 1}
              {cell.notSure && <span className="absolute top-0 right-0 size-3 rounded-tr-md rounded-bl-sm bg-milestone" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>
      <p className={`${note} mt-2 ${open ? '' : 'hidden'} sm:block`}>
        Green right, red wrong, plain not answered; a yellow corner marks "not sure". Press a number to go to it.
      </p>
    </div>
  )
}

type Filter = 'all' | 'missed' | 'notSure'

export default function Quiz({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const questions = useLoaded(() => loadQuiz(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const previous = useProgress().quizzes[key]
  // The run lives in this browser (lib/quizRun.ts); this number only makes the page draw it again.
  const [, redraw] = useState(0)
  const [asking, setAsking] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')
  const byId = new Map((questions ?? []).map((q) => [q.id, q]))
  const saved = loadRun(key)
  // A run from an older version of the quiz (a question gone) starts over.
  const run = saved && saved.order.length > 0 && saved.order.every((id) => byId.has(id)) ? saved : undefined

  function update(next: QuizRun | undefined) {
    saveRun(key, next)
    redraw((n) => n + 1)
  }

  /** A new attempt: the file's order the first time, a new order on every attempt after that. */
  function fresh(retry?: string[]): QuizRun {
    const ids = retry ?? questions!.map((q) => q.id)
    const order = retry || previous ? shuffled(ids) : ids
    return { order, picks: {}, notSure: [], at: 0, retry: retry ? true : undefined }
  }

  // The first visit makes the run, outside drawing, so its order is decided once.
  useEffect(() => {
    if (questions?.length && !run) update(fresh())
  })

  if (!questions) return <Waiting>Loading the quiz</Waiting>
  if (!questions.length) return <Waiting>This module has no quiz yet.</Waiting>
  if (!run) return <Waiting>Loading the quiz</Waiting>

  const order = run.order.map((id) => byId.get(id)!)
  const total = order.length
  const isRight = (q: Question) => run.picks[q.id] === q.answer
  const stateOf = (q: Question): CellState => (!(q.id in run.picks) ? 'open' : isRight(q) ? 'right' : 'wrong')
  const open = order.filter((q) => stateOf(q) === 'open')
  const score = order.filter(isRight).length

  function go(at: number) {
    setAsking(false)
    update({ ...run!, at: Math.max(0, Math.min(total - 1, at)) })
    window.scrollTo(0, 0)
  }

  function pick(option: number) {
    const question = order[run!.at]
    // Each answer is kept per question, so missed ones can be practiced from the dashboard.
    recordAnswer(key, question.id, option === question.answer)
    update({ ...run!, picks: { ...run!.picks, [question.id]: option } })
  }

  function toggleNotSure() {
    const id = order[run!.at].id
    const notSure = run!.notSure.includes(id) ? run!.notSure.filter((n) => n !== id) : [...run!.notSure, id]
    update({ ...run!, notSure })
  }

  function finish(anyway = false) {
    if (open.length && !anyway) return setAsking(true)
    setAsking(false)
    if (!run!.retry) recordQuiz(key, score, total)
    setFilter('all')
    update({ ...run!, done: true })
    window.scrollTo(0, 0)
  }

  const cells = order.map((q) => ({ state: stateOf(q), notSure: run.notSure.includes(q.id) }))
  const map = <QuestionMap cells={cells} current={run.done ? -1 : run.at} onGo={(i) => (run.done ? undefined : go(i))} />

  if (run.done) {
    const missed = order.filter((q) => !isRight(q))
    const unsure = order.filter((q) => run.notSure.includes(q.id))
    const list = filter === 'missed' ? missed : filter === 'notSure' ? unsure : order
    const passed = score / total >= 0.7
    const choices: { id: Filter; label: string }[] = [
      { id: 'all', label: `All (${total})` },
      { id: 'missed', label: `Missed (${missed.length})` },
      { id: 'notSure', label: `Not sure (${unsure.length})` },
    ]
    return (
      <div className={column}>
        <QuizTrack total={total} results={order.map(isRight)} current={-1} />
        <ScoreLine right={score} total={total} />
        {run.retry ? (
          <p className="mt-2 text-lg font-semibold">The questions you missed, tried again. Your best quiz score is unchanged.</p>
        ) : (
          <p className={`mt-2 text-lg font-semibold ${passed ? 'text-done' : 'text-critical'}`}>
            {passed ? 'That is above the 70% target for this module.' : 'Below the 70% target. Read the explanations below, then try again.'}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => update(fresh())} className={btnPrimary}>
            Take the quiz again
          </button>
          {missed.length > 0 && (
            <button onClick={() => update(fresh(missed.map((q) => q.id)))} className={btnQuiet}>
              Try the {missed.length === 1 ? 'one' : missed.length} you missed again
            </button>
          )}
          <Link to={`/${courseId}/${moduleId}/flashcards`} className={btnQuiet}>
            Practice flashcards
          </Link>
        </div>
        <h2 className={`${listTitle} mt-12`}>Your answers</h2>
        <div role="group" aria-label="Show" className="mt-4 flex flex-wrap gap-2">
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              aria-pressed={filter === choice.id}
              onClick={() => setFilter(choice.id)}
              className={`${btnQuiet} ${filter === choice.id ? 'border-plan bg-plan-soft text-plan' : ''}`}
            >
              {choice.label}
            </button>
          ))}
        </div>
        {list.length === 0 && <p className="mt-6 text-muted">None here.</p>}
        {list.map((q) => (
          <QuestionView
            key={q.id}
            number={order.indexOf(q) + 1}
            question={q}
            picked={run.picks[q.id] ?? null}
            revealed
            footer={
              (!(q.id in run.picks) || run.notSure.includes(q.id)) && (
                <p className="mt-3 text-sm font-semibold text-muted">
                  {!(q.id in run.picks) ? 'Not answered.' : ''} {run.notSure.includes(q.id) ? 'You marked this one not sure.' : ''}
                </p>
              )
            }
          />
        ))}
      </div>
    )
  }

  const question = order[run.at]
  const picked = run.picks[question.id] ?? null
  const last = run.at === total - 1
  const notSure = run.notSure.includes(question.id)
  const unsureLeft = open.filter((q) => run.notSure.includes(q.id)).length
  const firstOpen = open[0] ? order.indexOf(open[0]) : -1
  const next = () => (last ? finish() : go(run.at + 1))

  return (
    <div className={column}>
      {map}
      <div className="mt-3 flex flex-wrap justify-between gap-x-4 text-sm text-muted">
        <span>
          Question {run.at + 1} of {total}
        </span>
        <span>{run.retry ? 'Trying the missed questions again' : previous && `Your best score: ${previous.best} of ${previous.total}`}</span>
      </div>
      <QuestionView
        key={question.id}
        number={run.at + 1}
        question={question}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? pick : undefined}
        onNext={picked === null ? undefined : next}
        onPrevious={run.at > 0 ? () => go(run.at - 1) : undefined}
        onNotSure={toggleNotSure}
        lively
      />
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button onClick={() => go(run.at - 1)} disabled={run.at === 0} className={btnQuiet}>
          <Icon name="previous" className="mr-2" />
          Previous question
        </button>
        <button onClick={next} className={btnPrimary}>
          {last ? 'Finish quiz' : 'Next question'}
          <Icon name="next" className="ml-2" />
        </button>
        <button
          type="button"
          onClick={toggleNotSure}
          aria-pressed={notSure}
          className={`${btnQuiet} ${notSure ? 'border-milestone bg-milestone-soft' : ''}`}
        >
          <Icon name="flag" className="mr-2" />
          Not sure: come back later
        </button>
        {!last && (
          <button onClick={() => finish()} className={`${btnQuiet} sm:ml-auto`}>
            Finish the quiz now
          </button>
        )}
      </div>
      {picked === null && <p className={`${note} mt-3`}>Not ready to answer? Press Next question to skip it and come back later.</p>}
      {asking && (
        <MessageDialog
          title={open.length === 1 ? '1 question is not answered yet' : `${open.length} questions are not answered yet`}
          onClose={() => setAsking(false)}
          action={
            <>
              <button type="button" onClick={() => finish(true)} className={btnQuiet}>
                Finish anyway
              </button>
              <button type="button" onClick={() => go(firstOpen)} className={btnPrimary}>
                Go to question {firstOpen + 1}
              </button>
            </>
          }
        >
          Not answered: question {open.map((q) => order.indexOf(q) + 1).join(', ')}
          {unsureLeft ? ` (${unsureLeft} of them marked not sure)` : ''}. A question left unanswered counts as not correct.
        </MessageDialog>
      )}
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
  /** Keyboard only: N. Marks a module quiz question "not sure". */
  onNotSure?: () => void
  /** Shown under the question, for example the module it comes from. */
  footer?: ReactNode
  /** Give the answer a moment of motion when it is revealed. Off in reviews and in real exam mode. */
  lively?: boolean
  /** The answer can be changed until the exam is handed in, so a matching answer is saved pair by pair. Real exam mode. */
  changeable?: boolean
}) {
  const { number, question, picked, revealed, onPick, onNext, onPrevious, onFlag, onNotSure, footer, lively = false, changeable = false } = props
  const match = useMatchBoard({ question, picked, revealed, onPick, changeable })
  const multi = useMultiBoard({ question, picked, revealed, onPick, changeable, flagging: Boolean(onFlag) })
  const dropdown = useDropdownBoard({ question, picked, revealed, onPick, changeable })
  const hotspot = question.type === 'hotspot'
  const choose = (i: number) => (onPick && i < question.options.length ? () => onPick(i) : undefined)
  const letter = (i: number) => String.fromCharCode(65 + i)
  const check = match?.check ?? multi?.check ?? dropdown?.check
  const move: KeyActions = { Enter: check ?? onNext, ArrowRight: onNext, ArrowLeft: onPrevious, f: onFlag, n: onNotSure }
  let keys: KeyActions = { a: choose(0), b: choose(1), c: choose(2), d: choose(3), 1: choose(0), 2: choose(1), 3: choose(2), 4: choose(3), ...move }
  let keyNote = 'A to D, or 1 to 4, to answer.'
  if (match) {
    keys = { ...match.keys, ...move }
    keyNote = `1 to ${match.pairs} to select an item, A to ${letter(match.pairs - 1)} to give it an answer, Backspace to take the answer away.${changeable ? '' : ' Enter to check the answer.'}`
  } else if (hotspot) {
    keys = { ...Object.fromEntries(question.options.map((_, i) => [String(i + 1), choose(i)])), ...move }
    keyNote = `1 to ${question.options.length} to select an area.`
  } else if (multi) {
    keys = { ...multi.keys, ...move }
    keyNote = multi.note
  } else if (dropdown) {
    keys = move
    keyNote = `Tab to a list, then the arrow keys to choose.${changeable ? '' : ' Enter to check the answer.'}`
  }
  const single = !match && !hotspot && !multi && !dropdown
  return (
    <div className="border-b border-line py-7">
      {question.caseStudy && <CasePanel study={question.caseStudy} position={question.casePosition} />}
      {question.strip && <Strip panels={question.strip} />}
      <p className="text-xl font-semibold leading-relaxed">
        {number}. {question.q}
      </p>
      {question.diagram && !hotspot && <Graphic name={question.diagram} />}
      {match?.board}
      {multi?.board}
      {dropdown?.board}
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
          {onFlag ? ', the left arrow for the previous one. F to flag.' : onPrevious ? ', the left arrow for the previous one.' : '.'}
          {onNotSure ? ' N for not sure.' : ''}
        </Keys>
      )}
    </div>
  )
}
