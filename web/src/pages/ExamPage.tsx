import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ExamResult from '../components/ExamResult'
import NotFound from '../components/NotFound'
import Icon from '../components/Icon'
import { QuestionView } from '../components/Quiz'
import WithSidePanel, { PanelBlock } from '../components/SidePanel'
import { getCourse, getExams, loadExamQuestions, type Course, type Exam, type ExamQuestion } from '../lib/content'
import { breakLeftMs, countRight, domainScores, elapsedMs, examKey, examLimitMs, formatClock, onBreak } from '../lib/exam'
import { addExamTime, finishExam, moduleKey, updateExam, useProgress, type ExamRun } from '../lib/progress'
import { PageHeader, Waiting } from '../components/Page'
import { btnPrimary, btnQuiet, column, link, note, sectionTitle, subTitle } from '../lib/ui'
import { isComplete } from '../lib/answers'
import { useLoaded } from '../lib/useLoaded'
import { useNow } from '../lib/useNow'

interface RunProps {
  course: Course
  exam: Exam
  questions: ExamQuestion[]
  run: ExamRun
  examKey: string
  leftMs: number
  submit: () => void
}

export default function ExamPage() {
  const { courseId, examId } = useParams()
  const course = getCourse(courseId)
  const exam = course && getExams(course.id).find((e) => e.id === examId)
  if (!course || !exam) return <NotFound />
  return <LoadedExam key={exam.id} course={course} exam={exam} />
}

function LoadedExam({ course, exam }: { course: Course; exam: Exam }) {
  const questions = useLoaded(() => loadExamQuestions(course, exam))
  const now = useNow()
  const [params] = useSearchParams()
  const key = examKey(course.id, exam.id)
  const record = useProgress().exams[key]
  const run = record?.run
  const limit = examLimitMs(course)
  const leftMs = run ? limit - elapsedMs(run, now) : 0
  const expired = Boolean(run && questions && leftMs <= 0)

  function submit(timedOut: boolean) {
    if (!run || !questions) return
    const answered = questions.flatMap((q, i) =>
      run.picks[i] === null
        ? []
        : [
            {
              key: moduleKey(course.id, q.moduleId),
              questionId: q.question.id,
              correct: run.picks[i] === q.question.answer,
            },
          ],
    )
    finishExam(
      key,
      {
        seconds: Math.round(Math.min(limit, elapsedMs(run, Date.now())) / 1000),
        timedOut,
        right: countRight(questions, run.picks),
        domains: domainScores(course, questions, run.picks).map(({ right, total }) => ({ right, total })),
      },
      answered,
    )
    window.scrollTo(0, 0)
  }

  // The clock is strict: when it runs out, even with the page closed, the exam is submitted as it stands.
  useEffect(() => {
    if (expired) submit(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expired])

  if (!questions) return <Waiting>Loading the exam</Waiting>

  if (run) {
    if (expired) return null
    const props: RunProps = { course, exam, questions, run, examKey: key, leftMs, submit: () => submit(false) }
    return run.mode === 'practice' ? <PracticeRun {...props} /> : <RealRun {...props} now={now} />
  }

  const attempts = record?.attempts ?? []
  const attempt = attempts[Number(params.get('attempt')) - 1] ?? attempts[attempts.length - 1]
  if (attempt) return <ExamResult course={course} exam={exam} questions={questions} attempt={attempt} />

  return (
    <div className={column}>
      <PageHeader back={{ to: `/${course.id}/exams`, label: 'Mock exams' }} title={exam.title}>
        You have not started this exam.
      </PageHeader>
      <Link to={`/${course.id}/exams`} className={`${btnPrimary} mt-5`}>
        Go to the mock exams
      </Link>
    </div>
  )
}

/** Exam name, mode and the time left. The clock turns red in the last ten minutes. */
function ExamHeader({ exam, mode, leftMs, detail }: { exam: Exam; mode: string; leftMs: number; detail: string }) {
  return (
    <div className="sticky top-0 z-10 -mx-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink bg-paper px-4 py-3 sm:-mx-6 sm:px-6">
      <div>
        <h1 className={subTitle}>
          {exam.title} <span className="text-base font-normal text-muted">{mode}</span>
        </h1>
        <p className="text-sm text-muted">{detail}</p>
      </div>
      <p
        className={`title text-3xl tabular-nums ${leftMs < 10 * 60 * 1000 ? 'text-critical' : ''}`}
        role="timer"
        aria-label="Time left"
      >
        {formatClock(leftMs)}
      </p>
    </div>
  )
}

const answeredCount = (picks: (number | null)[], positions: number[]) =>
  positions.filter((i) => picks[i] !== null).length

/** Answered in full: a matching question with an item still without an answer is not. */
const isAnswered = (question: ExamQuestion, pick: number | null) =>
  isComplete(pick, question.question.type === 'match' ? question.question.left?.length : undefined)

/** One chapter per domain. Each answer is final and is explained straight away. */
function PracticeRun({ course, exam, questions, run, examKey: key, leftMs, submit }: RunProps) {
  const [chapter, setChapter] = useState<number | null>(null)
  // The question being shown stays on screen after it is answered, so its explanation can be read.
  const [shown, setShown] = useState<number | null>(null)

  const chapters = course.domains.map((domain, d) => {
    const positions = questions.flatMap((q, i) => (q.domain === d ? [i] : []))
    return {
      domain,
      positions,
      answered: answeredCount(run.picks, positions),
      right: positions.filter((i) => run.picks[i] === questions[i].question.answer).length,
    }
  })
  const totalAnswered = run.picks.filter((p) => p !== null).length

  // When the question now on screen appeared, to record how long it took to answer.
  const shownAt = useRef(Date.now())
  const open = chapter === null ? undefined : chapters[chapter]
  // A chapter with every question answered falls back to the chapter list.
  const position = open && (shown ?? open.positions.find((i) => run.picks[i] === null))

  useEffect(() => {
    shownAt.current = Date.now()
  }, [position])

  if (!open || chapter === null || position === undefined) {
    const unanswered = run.picks.length - totalAnswered
    const finish = () => {
      const warning = `${unanswered} ${unanswered === 1 ? 'question is' : 'questions are'} unanswered and will count as wrong. Submit anyway?`
      if (unanswered === 0 || window.confirm(warning)) submit()
    }
    return (
      <div className={column}>
        <ExamHeader
          exam={exam}
          mode="Practice mode"
          leftMs={leftMs}
          detail={`${totalAnswered} of ${run.picks.length} answered`}
        />
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Take the chapters in any order. Each answer is final, and its explanation appears straight away. The clock
          keeps running while you read.
        </p>
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {chapters.map((c, d) => {
            const done = c.answered === c.positions.length
            return (
              <li key={c.domain.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
                <div>
                  <p className="font-semibold">
                    Chapter {d + 1}: {c.domain.title}
                  </p>
                  <p className="text-sm tabular-nums text-muted">
                    {c.answered} of {c.positions.length} answered
                    {c.answered > 0 && `, ${c.right} correct`}
                  </p>
                </div>
                {done ? (
                  <span className="text-sm font-semibold text-done">Finished</span>
                ) : (
                  <button
                    onClick={() => {
                      setShown(null)
                      setChapter(d)
                    }}
                    className={c.answered ? btnPrimary : btnQuiet}
                  >
                    {c.answered ? 'Continue' : 'Start'} chapter {d + 1}
                  </button>
                )}
              </li>
            )
          })}
        </ol>
        <button onClick={finish} className={`${unanswered === 0 ? btnPrimary : btnQuiet} mt-6`}>
          Submit the exam and see the result
        </button>
      </div>
    )
  }

  const { domain, positions } = open
  const picked = run.picks[position]
  const place = positions.indexOf(position) + 1
  const last = place === positions.length

  function pick(option: number) {
    setShown(position ?? null)
    if (position !== undefined) addExamTime(key, position, Date.now() - shownAt.current)
    updateExam(key, (r) => ({ ...r, picks: r.picks.map((p, i) => (i === position ? option : p)) }))
  }

  function next() {
    setShown(null)
    if (last) setChapter(null)
    window.scrollTo(0, 0)
  }

  return (
    <div className={column}>
      <ExamHeader
        exam={exam}
        mode="Practice mode"
        leftMs={leftMs}
        detail={`Chapter ${chapter + 1}: ${domain.title}. Question ${place} of ${positions.length}`}
      />
      <QuestionView
        key={position}
        number={place}
        question={questions[position].question}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? pick : undefined}
        onNext={picked === null ? undefined : next}
      />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button onClick={next} disabled={picked === null} className={btnPrimary}>
          {last ? 'Finish this chapter' : 'Next question'}
        </button>
        <button onClick={() => setChapter(null)} className={`${link} text-sm`}>
          Back to the chapters
        </button>
      </div>
    </div>
  )
}

/** Mixed order, two halves with a break between, nothing marked until the end. */
function RealRun({ exam, questions, run, examKey: key, leftMs, submit, now }: RunProps & { now: number }) {
  const total = questions.length
  const halfSize = Math.ceil(total / 2)
  const secondHalf = run.breakStartedAt !== undefined
  const first = secondHalf ? halfSize : 0
  const end = secondHalf ? total : halfSize
  const positions = Array.from({ length: end - first }, (_, i) => first + i)

  // Opening or resuming the exam starts at the first unanswered question of the open half.
  // After that the question only changes when the learner moves, so an answer can be changed or flagged.
  const [wanted, setWanted] = useState(() => positions.find((i) => !isAnswered(questions[i], run.picks[i])) ?? first)
  const [confirming, setConfirming] = useState(false)
  const position = wanted >= first && wanted < end ? wanted : first
  const resting = onBreak(run, now)

  // Time counts for the question on screen, and stops during the break.
  const shownAt = useRef(Date.now())
  useEffect(() => {
    if (resting) return
    shownAt.current = Date.now()
    return () => addExamTime(key, position, Date.now() - shownAt.current)
  }, [key, position, resting])

  if (resting) {
    return (
      <div className={column}>
        <ExamHeader exam={exam} mode="Real exam mode" leftMs={leftMs} detail="Break. The exam clock is stopped." />
        <p className="title mt-8 text-5xl tabular-nums">{formatClock(breakLeftMs(run, now))}</p>
        <p className="mt-2 text-lg font-semibold">of your 10-minute break left</p>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
          Questions 1 to {halfSize} are locked and cannot be reopened. When the break ends, the exam clock starts again
          by itself, whether or not this page is open.
        </p>
        <button
          onClick={() => updateExam(key, (r) => ({ ...r, breakEndedAt: Date.now() }))}
          className={`${btnPrimary} mt-6`}
        >
          End the break and start question {halfSize + 1}
        </button>
      </div>
    )
  }

  const go = (i: number) => {
    setWanted(i)
    setConfirming(false)
    window.scrollTo(0, 0)
  }
  const flagged = run.flags.includes(position)
  const unanswered = positions.filter((i) => !isAnswered(questions[i], run.picks[i]))
  const answered = positions.length - unanswered.length
  const flaggedHere = positions.filter((i) => run.flags.includes(i))
  const header = (
    <ExamHeader
      exam={exam}
      mode="Real exam mode"
      leftMs={leftMs}
      detail={`Question ${position + 1} of ${total}. ${secondHalf ? 'Second' : 'First'} half: ${answered} of ${positions.length} answered`}
    />
  )
  const finishLabel = secondHalf ? 'Submit the exam' : `Finish questions 1 to ${halfSize} and take the break`

  if (confirming) {
    const list = (label: string, items: number[]) =>
      items.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-muted">{label}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {items.map((i) => (
              <button key={i} onClick={() => go(i)} className={`${btnQuiet} min-w-11 tabular-nums`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )
    return (
      <div className={column}>
        {header}
        <h2 className={`${sectionTitle} mt-8`}>
          {secondHalf ? 'Submit the exam?' : `Finish the first half?`}
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-muted">
          {secondHalf
            ? 'After this you see your result. Unanswered questions count as wrong.'
            : `After this, questions 1 to ${halfSize} are locked for good and your 10-minute break starts.`}
        </p>
        <p className="mt-4 font-semibold">
          {unanswered.length === 0 ? 'Every question in this half is answered.' : `${unanswered.length} unanswered.`}{' '}
          {flaggedHere.length > 0 && `${flaggedHere.length} flagged.`}
        </p>
        {list('Unanswered. Select a number to go to it:', unanswered)}
        {list('Flagged:', flaggedHere)}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setConfirming(false)
              // Bank the time on the last question before the exam is closed.
              addExamTime(key, position, Date.now() - shownAt.current)
              shownAt.current = Date.now()
              if (secondHalf) submit()
              else {
                updateExam(key, (r) => ({ ...r, breakStartedAt: Date.now() }))
                setWanted(halfSize)
                window.scrollTo(0, 0)
              }
            }}
            className={btnPrimary}
          >
            {secondHalf ? 'Submit the exam' : 'Lock the first half and start the break'}
          </button>
          <button onClick={() => setConfirming(false)} className={btnQuiet}>
            Go back to the questions
          </button>
        </div>
      </div>
    )
  }

  const pick = (option: number) =>
    updateExam(key, (r) => ({ ...r, picks: r.picks.map((p, i) => (i === position ? option : p)) }))
  const toggleFlag = () =>
    updateExam(key, (r) => ({
      ...r,
      flags: flagged ? r.flags.filter((i) => i !== position) : [...r.flags, position],
    }))

  const grid = (
    <PanelBlock title={secondHalf ? `Questions ${halfSize + 1} to ${total}` : `Questions 1 to ${halfSize}`}>
      <p className={`${note} mb-3`}>
        {answered} answered, {unanswered.length} to go
        {flaggedHere.length > 0 && `, ${flaggedHere.length} flagged`}.{' '}
        {secondHalf ? `Questions 1 to ${halfSize} are locked.` : 'The second half opens after the break.'}
      </p>
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
        {positions.map((i) => {
          const isFlagged = run.flags.includes(i)
          const open = unanswered.includes(i)
          let style = open ? 'border-edge bg-surface' : 'border-plan bg-plan-soft font-semibold'
          if (isFlagged) style = 'border-milestone bg-milestone-soft'
          return (
            <li key={i}>
              <button
                onClick={() => go(i)}
                aria-current={i === position}
                aria-label={`Question ${i + 1}${open ? ', unanswered' : ', answered'}${isFlagged ? ', flagged' : ''}`}
                className={`press relative min-h-11 w-full rounded-md border tabular-nums hover:border-ink ${style} ${
                  i === position ? 'ring-2 ring-ink' : ''
                }`}
              >
                {i + 1}
                {isFlagged && (
                  <span aria-hidden="true" className="absolute top-0 right-0.5 text-[0.625rem] leading-none text-milestone">
                    ⚑
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
      <p className={`${note} mt-3`}>Filled blue: answered. Amber with a mark: flagged. Plain: unanswered.</p>
      {position + 1 < end && (
        <button onClick={() => setConfirming(true)} className={`${btnQuiet} mt-4 w-full`}>
          {finishLabel}
        </button>
      )}
    </PanelBlock>
  )

  return (
    <div>
      {header}
      {/* The question grid sits beside the question, as in the real exam; on a phone it follows the question. */}
      <WithSidePanel label="Questions" phone="below" panel={<div className="lg:mt-7">{grid}</div>}>
        <div className={column}>
          <QuestionView
            key={position}
            number={position + 1}
            question={questions[position].question}
            picked={run.picks[position]}
            revealed={false}
            onPick={pick}
            changeable
            onNext={position + 1 < end ? () => go(position + 1) : undefined}
            onPrevious={position > first ? () => go(position - 1) : undefined}
            onFlag={toggleFlag}
          />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={() => go(position - 1)} disabled={position === first} className={btnQuiet}>
              <Icon name="previous" className="mr-2" />
              Previous
            </button>
            {position + 1 < end ? (
              <button onClick={() => go(position + 1)} className={btnPrimary}>
                Next question
                <Icon name="next" className="ml-2" />
              </button>
            ) : (
              <button onClick={() => setConfirming(true)} className={btnPrimary}>
                {finishLabel}
              </button>
            )}
            <button onClick={toggleFlag} aria-pressed={flagged} className={btnQuiet}>
              <Icon name="flag" className={`mr-2 ${flagged ? 'text-milestone' : ''}`} />
              {flagged ? 'Remove the flag' : 'Flag to look at again'}
            </button>
          </div>
        </div>
      </WithSidePanel>
    </div>
  )
}
