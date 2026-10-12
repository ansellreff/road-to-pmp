import { useState, type DragEvent, type MouseEvent, type ReactNode } from 'react'
import { decodeMatch, encodeMatch, matchResults, type MatchChoices } from '../lib/answers'
import type { Question, StripPanel } from '../lib/content'
import { btnPrimary, note } from '../lib/ui'
import Icon from './Icon'
import type { KeyActions } from './Keys'
import { diagrams } from './diagrams'
import { figures } from './diagrams/figures'
import { hotspots } from './diagrams/hotspots'
import { Overlay } from './diagrams/parts'

// The parts of a question that are not a plain list of options: the comic strip above
// a question, the drawing of a hot spot question, and the two lists of a matching question.

const letter = (i: number) => String.fromCharCode(65 + i)

/** The situation as a short conversation, read panel by panel before the question. */
export function Strip({ panels }: { panels: StripPanel[] }) {
  return (
    <ol className="mb-5 grid gap-2.5 sm:grid-cols-2" aria-label="The situation, as a conversation">
      {panels.map((panel, i) => (
        <li key={i} className="rounded-md border border-edge bg-surface px-4 py-3 sm:last:odd:col-span-2">
          <p className="text-sm font-semibold text-plan">{panel.who}</p>
          <p className="mt-1 font-reading text-lg leading-relaxed">{panel.says}</p>
        </li>
      ))}
    </ol>
  )
}

/**
 * A drawing with numbered areas; the answer is one of them. Each area is a button,
 * so it can be reached with Tab and pressed with Enter as well as clicked or tapped.
 */
export function HotSpot(props: { question: Question; picked: number | null; revealed: boolean; onPick?: (i: number) => void }) {
  const { question, picked, revealed, onPick } = props
  const name = question.diagram ?? ''
  const Drawing = figures[name] ?? diagrams[name]
  if (!Drawing) return null
  const areas = question.options.map((option, i) => {
    const spot = hotspots[name]?.find((s) => s.name === option)
    if (!spot) return null
    const [x, y, w, h] = spot.at
    // The number sits on the top right corner; on a wide, low area (a table row) halfway down its right edge.
    const badgeY = w >= 4 * h ? y + h / 2 : y
    let state = i === picked ? 'picked' : 'open'
    if (revealed) state = i === question.answer ? 'right' : i === picked ? 'wrong' : 'off'
    const select = onPick ? () => onPick(i) : undefined
    return (
      <g
        key={option}
        className="spot"
        data-state={state}
        role="button"
        tabIndex={select ? 0 : undefined}
        aria-label={`Area ${i + 1}: ${option}`}
        aria-pressed={!revealed && select ? i === picked : undefined}
        aria-disabled={!select}
        onClick={select}
        onKeyDown={(event) => {
          if (!select || (event.key !== 'Enter' && event.key !== ' ')) return
          event.preventDefault()
          select()
        }}
      >
        <rect x={x} y={y} width={w} height={h} rx="6" />
        <circle cx={x + w} cy={badgeY} r="11" />
        <text x={x + w} y={badgeY} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="700">
          {i + 1}
        </text>
      </g>
    )
  })
  let status = 'Select one of the numbered areas of the drawing.'
  // Once revealed, the line under the question says which area is right; an unanswered question has no such line.
  if (revealed) status = picked === null ? `The right area is ${question.answer + 1}, ${question.options[question.answer]}.` : ''
  else if (picked !== null) status = `Selected: area ${picked + 1}, ${question.options[picked]}.`
  return (
    <div className="mt-5">
      <Overlay.Provider value={<>{areas}</>}>
        <Drawing />
      </Overlay.Provider>
      {status && (
        <p className={`${note} mt-2`} aria-live="polite">
          {status}
        </p>
      )}
    </div>
  )
}

/** The words under a revealed hot spot or matching question; a single-answer question has its own. */
export function verdict(question: Question, picked: number | null): string {
  if (picked === question.answer) return 'Correct.'
  if (question.type === 'hotspot') {
    return `Not correct. The right area is ${question.answer + 1}, ${question.options[question.answer]}.`
  }
  const pairs = question.left?.length ?? 0
  const right = matchResults(picked, question.answer, pairs).filter(Boolean).length
  return `Not correct. ${right} of ${pairs} pairs are right, and a matching question counts only when every pair is right.`
}

const DRAGGED = 'text/plain'

/** After a mouse click the focus leaves the button, so Enter checks the answer or moves on instead of pressing it again. */
const release = (event: MouseEvent<HTMLElement>) => {
  if (event.detail > 0) event.currentTarget.blur()
}

/**
 * A matching question: every item on the left gets one answer from the right.
 * Three ways to pair them: drag an answer onto an item; select an item, then an answer;
 * or the keyboard (a number for the item, a letter for the answer).
 *
 * Where each answer is final (quizzes, practice), the pairs are kept here until "Check answer".
 * Where answers can be changed (real exam mode), every change is saved at once.
 *
 * Returns nothing for other question types, so it can be called for every question.
 */
export function useMatchBoard(props: {
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (code: number) => void
  changeable: boolean
}): { board: ReactNode; keys: KeyActions; check?: () => void; pairs: number } | null {
  const { question, picked, revealed, onPick, changeable } = props
  const left = question.type === 'match' ? (question.left ?? []) : []
  const pairs = left.length
  const saved = decodeMatch(picked, pairs)
  const [draft, setDraft] = useState<MatchChoices>(saved)
  // The item that the next answer goes to. Unless one is selected, it is the first without an answer.
  const [selected, setSelected] = useState<number | null>(null)
  if (question.type !== 'match') return null

  const open = Boolean(onPick) && !revealed
  const choices = open && !changeable ? draft : saved
  const firstEmpty = choices.indexOf(null)
  const active = !open ? null : (selected ?? (firstEmpty === -1 ? null : firstEmpty))
  const complete = firstEmpty === -1
  const results = matchResults(picked, question.answer, pairs)
  const right = decodeMatch(question.answer, pairs)

  function commit(next: MatchChoices) {
    if (changeable) onPick?.(encodeMatch(next))
    else setDraft(next)
  }
  /** Give an answer to an item. An answer is used once, so it leaves the item that had it. */
  function give(item: number | null, option: number) {
    if (!open || item === null) return
    const next = choices.map((choice) => (choice === option ? null : choice))
    next[item] = option
    commit(next)
    setSelected(null)
  }
  function clear(item: number) {
    if (!open || choices[item] === null) return
    commit(choices.map((choice, i) => (i === item ? null : choice)))
    setSelected(item)
  }
  const drag = (option: number) => (event: DragEvent) => {
    event.dataTransfer.setData(DRAGGED, `answer ${option}`)
    event.dataTransfer.effectAllowed = 'move'
  }
  const drop = (item: number) => (event: DragEvent) => {
    const found = /^answer (\d)$/.exec(event.dataTransfer.getData(DRAGGED))
    if (!found) return
    event.preventDefault()
    give(item, Number(found[1]))
  }
  const check = open && !changeable && complete ? () => onPick?.(encodeMatch(draft)) : undefined

  const keys: KeyActions = {}
  if (open) {
    left.forEach((_, i) => {
      keys[String(i + 1)] = () => setSelected(i)
      keys[letter(i).toLowerCase()] = () => give(active, i)
    })
    keys.Backspace = active === null ? undefined : () => clear(active)
  }

  const board = (
    <div className="mt-5">
      {open && (
        <p className={`${note} mb-3`}>
          Give each numbered item its answer. Drag an answer onto an item, or select the item and then the answer.
        </p>
      )}
      <div className={open ? 'grid gap-x-6 gap-y-5 md:grid-cols-2' : ''}>
        <ol className="space-y-2.5">
          {left.map((item, i) => {
            const choice = choices[i]
            let style = 'border-edge bg-surface'
            if (revealed) style = results[i] ? 'border-done bg-done-soft' : 'border-critical bg-critical-soft'
            else if (active === i) style = 'border-plan bg-plan-soft ring-2 ring-plan'
            return (
              <li
                key={i}
                data-item={i + 1}
                className={`rounded-md border ${style}`}
                onDragOver={open ? (event) => event.preventDefault() : undefined}
                onDrop={open ? drop(i) : undefined}
              >
                <button
                  disabled={!open}
                  onClick={(event) => {
                    setSelected(i)
                    release(event)
                  }}
                  aria-pressed={open ? active === i : undefined}
                  className="press flex w-full items-baseline gap-3 px-4 pt-3 pb-1.5 text-left text-lg leading-relaxed"
                >
                  <span className="font-bold tabular-nums">{i + 1}</span>
                  <span className="min-w-0 flex-1">{item}</span>
                </button>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-2 pb-2.5 pl-10">
                  {choice === null ? (
                    <span className="flex min-h-11 flex-1 items-center rounded-md border border-dashed border-edge px-3 text-muted">
                      {revealed ? 'Not answered' : active === i ? 'Now choose its answer' : 'No answer yet'}
                    </span>
                  ) : (
                    <span
                      draggable={open}
                      onDragStart={open ? drag(choice) : undefined}
                      className={`flex min-h-11 flex-1 items-baseline gap-2 rounded-md border border-edge bg-paper px-3 py-2 leading-relaxed ${open ? 'cursor-grab' : ''}`}
                    >
                      {open && <span className="font-bold">{letter(choice)}</span>}
                      <span className="min-w-0 flex-1">{question.options[choice]}</span>
                    </span>
                  )}
                  {open && choice !== null && (
                    <button
                      onClick={(event) => {
                        clear(i)
                        release(event)
                      }}
                      aria-label={`Remove the answer from item ${i + 1}`}
                      className="press flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted hover:bg-critical-soft hover:text-critical"
                    >
                      <Icon name="cross" size={18} />
                    </button>
                  )}
                  {revealed && (
                    <span className={`flex w-full items-center gap-1 text-sm font-semibold ${results[i] ? 'text-done' : 'text-critical'}`}>
                      <Icon name={results[i] ? 'check' : 'cross'} size={16} />
                      {results[i] ? 'Right pair' : `Wrong. It belongs with: ${question.options[right[i] ?? 0]}`}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
        {open && (
          <div>
            <ul className="space-y-2.5" aria-label="Answers">
              {question.options.map((option, i) => {
                const usedBy = choices.indexOf(i)
                return (
                  <li key={i}>
                    <button
                      draggable
                      onDragStart={drag(i)}
                      onClick={(event) => {
                        give(active, i)
                        release(event)
                      }}
                      data-answer={letter(i)}
                      className={`press flex min-h-14 w-full cursor-grab items-baseline gap-3 rounded-md border px-4 py-3 text-left text-lg leading-relaxed ${
                        usedBy === -1 ? 'border-edge bg-surface hover:border-plan hover:bg-plan-soft' : 'border-line bg-surface text-muted'
                      }`}
                    >
                      <span className="font-bold">{letter(i)}</span>
                      <span className="min-w-0 flex-1">{option}</span>
                      {usedBy !== -1 && <span className="text-sm whitespace-nowrap">with {usedBy + 1}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
            {!changeable && (
              <button onClick={check} disabled={!check} className={`${btnPrimary} mt-4`}>
                Check answer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
  return { board, keys, check, pairs }
}
