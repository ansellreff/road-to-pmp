import { useEffect, useRef, useState, type DragEvent, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import { decodeMatch, decodeMulti, encodeMatch, encodeMulti, matchResults, type MatchChoices } from '../lib/answers'
import type { CaseStudy, Question, StripPanel } from '../lib/content'
import { btnPrimary, input, note } from '../lib/ui'
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
  if (question.type === 'multi') {
    const right = decodeMulti(question.answer)
    const found = decodeMulti(picked).filter((option) => right.includes(option)).length
    return `Not correct. ${found} of the ${right.length} right options were chosen, and a multiple response question counts only when exactly the right options are chosen.`
  }
  if (question.type === 'dropdown') {
    const blanks = question.blanks?.length ?? 0
    const right = matchResults(picked, question.answer, blanks).filter(Boolean).length
    return `Not correct. ${right} of ${blanks} blanks are right, and a pull-down list question counts only when every blank is right.`
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

/** True on a screen wide enough for the items and the answers to stand side by side. */
function useWide(): boolean {
  const query = '(min-width: 768px)'
  const [wide, setWide] = useState(() => typeof window === 'undefined' || window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setWide(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return wide
}

/**
 * A matching question: every item on the left gets one answer from the right.
 * Three ways to pair them: drag an answer onto an item (with the mouse or a finger);
 * select an item, then an answer; or the keyboard (a number for the item, a letter for the answer).
 *
 * On a wide screen the answers stand beside the items. On a phone they open under the
 * item being answered, so nothing has to be scrolled to.
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
  const wide = useWide()
  // An answer being dragged with a finger or pen: where it is now. The mouse uses the browser's own dragging.
  const [carried, setCarried] = useState<{ option: number; x: number; y: number } | null>(null)
  const dragged = useRef(false)
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
  /** Dragging with a finger or pen: the answer follows the finger and is given to the item it is let go over. */
  const carry = (option: number) => (event: PointerEvent) => {
    if (event.pointerType === 'mouse') return
    const from = { x: event.clientX, y: event.clientY }
    dragged.current = false
    const move = (e: globalThis.PointerEvent) => {
      if (!dragged.current && Math.hypot(e.clientX - from.x, e.clientY - from.y) < 10) return
      dragged.current = true
      setCarried({ option, x: e.clientX, y: e.clientY })
    }
    const end = (e: globalThis.PointerEvent) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      setCarried(null)
      if (!dragged.current || e.type === 'pointercancel') return
      const item = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-item]')
      if (item) give(Number(item.dataset.item) - 1, option)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
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

  const answers = (
    <ul className="space-y-2.5" aria-label="Answers">
      {question.options.map((option, i) => {
        const usedBy = choices.indexOf(i)
        return (
          <li key={i}>
            <button
              draggable
              onDragStart={drag(i)}
              onPointerDown={wide ? carry(i) : undefined}
              onClick={(event) => {
                // The click that ends a drag by finger is not a choice.
                if (dragged.current) dragged.current = false
                else give(active, i)
                release(event)
              }}
              data-answer={letter(i)}
              className={`press flex min-h-14 w-full cursor-grab items-baseline gap-3 rounded-md border px-4 py-3 text-left text-lg leading-relaxed ${wide ? 'touch-none' : ''} ${
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
  )
  const checkButton = !changeable && (
    <button onClick={check} disabled={!check} className={`${btnPrimary} mt-4`}>
      Check answer
    </button>
  )

  const board = (
    <div className="mt-5">
      {open && (
        <p className={`${note} mb-3`}>
          {wide
            ? 'Give each numbered item its answer. Drag an answer onto an item, or select the item and then the answer.'
            : 'Give each numbered item its answer. Select an item, then choose its answer from the list that opens under it.'}
        </p>
      )}
      <div className={open && wide ? 'grid grid-cols-2 gap-x-6' : ''}>
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
                {open && !wide && active === i && <div className="border-t border-plan px-3 py-3">{answers}</div>}
              </li>
            )
          })}
        </ol>
        {open && wide && (
          <div>
            {answers}
            {checkButton}
          </div>
        )}
        {open && !wide && checkButton}
      </div>
      {carried && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-40 max-w-xs -translate-x-1/2 -translate-y-full rounded-md border-2 border-plan bg-surface px-3 py-2 text-lg shadow-lg"
          style={{ left: carried.x, top: carried.y - 12 }}
        >
          <span className="font-bold">{letter(carried.option)}</span> {question.options[carried.option]}
        </div>
      )}
    </div>
  )
  return { board, keys, check, pairs }
}

/** The case shared by several questions, shown above each of them (PMP case sets). */
export function CasePanel({ study, position }: { study: CaseStudy; position?: [number, number] }) {
  return (
    <section aria-label={`Case: ${study.title}`} className="mb-5 rounded-md border border-l-4 border-edge border-l-plan bg-surface px-5 py-4">
      <p className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm font-semibold text-plan">
        <span>Case: {study.title}</span>
        {position && (
          <span className="font-medium text-muted">
            Question {position[0]} of {position[1]} on this case
          </span>
        )}
      </p>
      {study.text.split(/\n\s*\n/).map((paragraph, i) => (
        <p key={i} className="mt-2 font-reading text-lg leading-relaxed">
          {paragraph}
        </p>
      ))}
      {study.diagram && <Graphic name={study.diagram} />}
    </section>
  )
}

/** A drawing that a question asks about (graphic-based). Its caption is left out, as it may give the answer. */
export function Graphic({ name }: { name: string }) {
  const Drawing = figures[name] ?? diagrams[name]
  if (!Drawing) return null
  return (
    <div className="mt-5">
      <Overlay.Provider value={<></>}>
        <Drawing />
      </Overlay.Provider>
    </div>
  )
}

/**
 * Keeps an answer that is built in steps (several options, several blanks): where each answer
 * is final it stays here until "Check answer"; where it can be changed it is saved at once.
 */
function useDraft(picked: number | null, open: boolean, changeable: boolean, onPick?: (code: number) => void) {
  const [draft, setDraft] = useState<number | null>(picked)
  const value = open && !changeable ? draft : picked
  const set = (code: number) => (changeable ? onPick?.(code) : setDraft(code))
  return { value, set }
}

/**
 * A multiple response question: choose the stated number of options, then check.
 * Returns nothing for other question types, so it can be called for every question.
 */
export function useMultiBoard(props: {
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (code: number) => void
  changeable: boolean
  /** F flags the question in real exam mode, so it is not used for option F. */
  flagging: boolean
}): { board: ReactNode; keys: KeyActions; check?: () => void; note: string } | null {
  const { question, picked, revealed, onPick, changeable, flagging } = props
  const open = Boolean(onPick) && !revealed
  const { value, set } = useDraft(picked, open, changeable, onPick)
  const [full, setFull] = useState(false)
  if (question.type !== 'multi') return null

  const choose = question.choose ?? 2
  const chosen = decodeMulti(value)
  const right = decodeMulti(question.answer)
  function toggle(option: number) {
    if (!open) return
    if (chosen.includes(option)) {
      setFull(false)
      return set(encodeMulti(chosen.filter((c) => c !== option)))
    }
    if (chosen.length >= choose) return setFull(true)
    set(encodeMulti([...chosen, option]))
  }
  const check = open && !changeable && chosen.length === choose ? () => onPick?.(encodeMulti(chosen)) : undefined

  const keys: KeyActions = {}
  if (open) {
    question.options.forEach((_, i) => {
      keys[String(i + 1)] = () => toggle(i)
      const key = letter(i).toLowerCase()
      if (!(flagging && key === 'f')) keys[key] = () => toggle(i)
    })
  }
  const lastLetter = letter(question.options.length - 1)
  const note = `A to ${lastLetter}${flagging && question.options.length > 5 ? ' (F by its number, 6)' : ''}, or 1 to ${question.options.length}, to choose or unchoose an option.${changeable ? '' : ' Enter to check the answer.'}`

  const board = (
    <div className="mt-5">
      <p className="font-semibold">Choose {choose}.</p>
      {open && (
        <p className={`${note} mt-1`} aria-live="polite">
          {full ? `You have chosen ${choose}. Take one away to choose another.` : `${chosen.length} of ${choose} chosen.`}
        </p>
      )}
      <div className="mt-3 space-y-2.5">
        {question.options.map((option, i) => {
          const isChosen = chosen.includes(i)
          const isRight = right.includes(i)
          let style = 'border-edge bg-surface'
          let mark: ReactNode = null
          if (!revealed) style = isChosen ? 'border-plan bg-plan-soft ring-2 ring-plan' : `${style} hover:border-plan hover:bg-plan-soft`
          else if (isRight) {
            style = 'border-done bg-done-soft ring-1 ring-done'
            mark = (
              <span className="flex items-center gap-1 text-sm font-semibold text-done">
                <Icon name="check" size={16} />
                {isChosen ? 'Correct, and chosen' : 'Correct, not chosen'}
              </span>
            )
          } else if (isChosen) {
            style = 'border-critical bg-critical-soft ring-1 ring-critical'
            mark = (
              <span className="flex items-center gap-1 text-sm font-semibold text-critical">
                <Icon name="cross" size={16} />
                Your answer
              </span>
            )
          } else style = 'border-line bg-surface text-muted'
          return (
            <button
              key={i}
              disabled={!open}
              onClick={(event) => {
                toggle(i)
                release(event)
              }}
              aria-pressed={open ? isChosen : undefined}
              className={`press flex min-h-14 w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border px-4 py-3.5 text-left text-lg leading-relaxed ${style}`}
            >
              <span
                aria-hidden="true"
                className={`relative top-0.5 inline-flex size-5 shrink-0 items-center justify-center self-center rounded border-2 ${
                  isChosen ? 'border-plan bg-plan text-on-plan' : 'border-edge'
                }`}
              >
                {isChosen && <Icon name="check" size={14} />}
              </span>
              <span className="font-bold">{letter(i)}</span>
              <span className="min-w-0 flex-1 basis-64">{option}</span>
              {mark}
            </button>
          )
        })}
      </div>
      {open && !changeable && (
        <button onClick={check} disabled={!check} className={`${btnPrimary} mt-4`}>
          Check answer
        </button>
      )}
    </div>
  )
  return { board, keys, check, note }
}

/**
 * A pull-down list question: each blank has its own short list of choices.
 * The lists are ordinary list boxes, so Tab and the arrow keys work as everywhere else.
 */
export function useDropdownBoard(props: {
  question: Question
  picked: number | null
  revealed: boolean
  onPick?: (code: number) => void
  changeable: boolean
}): { board: ReactNode; check?: () => void } | null {
  const { question, picked, revealed, onPick, changeable } = props
  const open = Boolean(onPick) && !revealed
  const { value, set } = useDraft(picked, open, changeable, onPick)
  if (question.type !== 'dropdown') return null

  const blanks = question.blanks ?? []
  const values = decodeMatch(value, blanks.length)
  const right = decodeMatch(question.answer, blanks.length)
  const results = matchResults(picked, question.answer, blanks.length)
  const choose = (blank: number, choice: number | null) => set(encodeMatch(values.map((v, i) => (i === blank ? choice : v))))
  const check = open && !changeable && values.every((v) => v !== null) ? () => onPick?.(encodeMatch(values)) : undefined

  const board = (
    <div className="mt-5">
      <ol className="space-y-2.5">
        {blanks.map((blank, i) => {
          let style = 'border-edge bg-surface'
          if (revealed) style = results[i] ? 'border-done bg-done-soft' : 'border-critical bg-critical-soft'
          return (
            <li key={i} className={`rounded-md border px-4 py-3 ${style}`}>
              <label className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg leading-relaxed">
                <span className="font-bold tabular-nums">{i + 1}</span>
                <span className="min-w-0 flex-1 basis-48">{blank.text}</span>
                <select
                  value={values[i] ?? ''}
                  disabled={!open}
                  onChange={(event) => choose(i, event.target.value === '' ? null : Number(event.target.value))}
                  className={`${input} min-w-48 text-lg disabled:opacity-100`}
                >
                  <option value="">Choose…</option>
                  {blank.choices.map((choice, c) => (
                    <option key={c} value={c}>
                      {choice}
                    </option>
                  ))}
                </select>
              </label>
              {revealed && (
                <p className={`mt-1 flex items-center gap-1 pl-7 text-sm font-semibold ${results[i] ? 'text-done' : 'text-critical'}`}>
                  <Icon name={results[i] ? 'check' : 'cross'} size={16} />
                  {results[i] ? 'Right' : `Wrong. The right choice is: ${blank.choices[right[i] ?? 0]}`}
                </p>
              )}
            </li>
          )
        })}
      </ol>
      {open && !changeable && (
        <button onClick={check} disabled={!check} className={`${btnPrimary} mt-4`}>
          Check answer
        </button>
      )}
    </div>
  )
  return { board, check }
}
