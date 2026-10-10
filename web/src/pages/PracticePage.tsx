import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Notice, PageHeader, Waiting } from '../components/Page'
import { QuestionView, QuizTrack, ScoreLine } from '../components/Quiz'
import { courses, loadAllQuestions, type Question } from '../lib/content'
import { moduleKey, recordAnswer, useProgress } from '../lib/progress'
import { moduleNumber } from '../lib/stats'
import { btnPrimary, btnQuiet, column, link, listTitle, note } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

/** Enough for one sitting; the rest stay for next time. */
const SESSION_SIZE = 20

interface PracticeItem {
  key: string
  /** "CAPM Domain 1: Title", for choosing what to practice. */
  group: string
  from: string
  to: string
  question: Question
}

async function loadEveryQuestion(): Promise<PracticeItem[]> {
  const quizzes = await Promise.all(
    courses.flatMap((course) =>
      course.domains.flatMap((domain, d) =>
        domain.modules
          .filter((m) => m.ready)
          .map(async (m) => {
            // Includes the questions kept for the unseen mock exam: once missed there, they belong here.
            const questions = await loadAllQuestions(course.id, m.id)
            return questions.map((question) => ({
              key: moduleKey(course.id, m.id),
              group: `${course.title} Domain ${d + 1}: ${domain.title}`,
              from: `${moduleNumber(course, m.id)} ${m.title}`,
              to: `/${course.id}/${m.id}`,
              question,
            }))
          }),
      ),
    ),
  )
  return quizzes.flat()
}

/** A quiz made of the questions, from any module or mock exam, whose latest answer was wrong. */
export default function PracticePage() {
  const everyQuestion = useLoaded(loadEveryQuestion)
  const progress = useProgress()
  // The session's questions are fixed when it starts, so answering one does not reshuffle the rest.
  const [session, setSession] = useState<PracticeItem[] | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [picked, setPicked] = useState<number | null>(null)

  const header = (text?: string) => (
    <PageHeader back={{ to: '/dashboard', label: 'Dashboard' }} title="Practice missed questions">
      {text}
    </PageHeader>
  )

  if (!everyQuestion) return <Waiting>Collecting the questions to practice</Waiting>

  const stateOf = (item: PracticeItem) => progress.answers[item.key]?.[item.question.id]
  const missed = everyQuestion.filter((item) => stateOf(item)?.lastCorrect === false)

  function start(group?: string) {
    // Most-missed first.
    const pool = missed.filter((item) => !group || item.group === group)
    const worstFirst = [...pool].sort((a, b) => (stateOf(b)?.wrong ?? 0) - (stateOf(a)?.wrong ?? 0))
    setSession(worstFirst.slice(0, SESSION_SIZE))
    setResults([])
    setPicked(null)
    window.scrollTo(0, 0)
  }

  if (!session) {
    if (!missed.length) {
      return (
        <div className={column}>
          {header()}
          <div className="mt-6">
            <Notice title="No questions to practice right now.">
              When you answer a question wrong, in a module quiz or a mock exam, it is collected here until you get it
              right.
            </Notice>
          </div>
        </div>
      )
    }
    const groups = [...new Set(missed.map((item) => item.group))].sort()
    const count = (n: number) => `${n} ${n === 1 ? 'question' : 'questions'}`
    return (
      <div className={column}>
        {header(
          `Your latest answer to ${count(missed.length)} was wrong. A session takes up to ${SESSION_SIZE}, the ones you miss most often first.`,
        )}
        <h2 className={`${listTitle} mt-10`}>Choose what to practice</h2>
        <ul className="divide-y divide-line border-b border-line">
          <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
            <div>
              <p className="font-semibold">All domains</p>
              <p className={note}>{count(missed.length)}</p>
            </div>
            <button onClick={() => start()} className={btnPrimary}>
              Practice all
            </button>
          </li>
          {groups.map((group) => (
            <li key={group} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
              <div>
                <p className="font-semibold">{group}</p>
                <p className={note}>{count(missed.filter((item) => item.group === group).length)}</p>
              </div>
              <button onClick={() => start(group)} className={btnQuiet}>
                Practice this domain
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const index = results.length - (picked === null ? 0 : 1)
  const item = session[index]

  function pick(option: number) {
    if (!item) return
    const correct = option === item.question.answer
    recordAnswer(item.key, item.question.id, correct)
    setPicked(option)
    setResults([...results, correct])
  }

  function next() {
    setPicked(null)
    window.scrollTo(0, 0)
  }

  if (!item) {
    const right = results.filter(Boolean).length
    const again = session.filter((_, i) => !results[i])
    return (
      <div className={column}>
        {header()}
        <div className="mt-6">
          <QuizTrack total={session.length} results={results} current={-1} />
        </div>
        <ScoreLine right={right} total={session.length} />
        <p className="mt-2 text-lg font-semibold">
          {missed.length
            ? `${missed.length} ${missed.length === 1 ? 'question is' : 'questions are'} still to practice.`
            : 'You have now answered every missed question correctly.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {missed.length > 0 && (
            <button onClick={() => setSession(null)} className={btnPrimary}>
              Practice again
            </button>
          )}
          <Link to="/dashboard" className={btnQuiet}>
            Back to the dashboard
          </Link>
        </div>
        {again.length > 0 && (
          <>
            <h2 className={`${listTitle} mt-12`}>Missed again in this session</h2>
            <ul className="divide-y divide-line border-b border-line">
              {again.map((a) => (
                <li key={`${a.key}/${a.question.id}`} className="py-3">
                  <p className="leading-relaxed">{a.question.q}</p>
                  <p className={`${note} mt-1`}>
                    Read it again in{' '}
                    <Link to={a.to} className={link}>
                      {a.from}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  const right = results.filter(Boolean).length
  return (
    <div className={column}>
      {header()}
      <div className="mt-6">
        <QuizTrack total={session.length} results={results} current={index} />
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-x-6 text-sm text-muted">
        <span>
          Question {index + 1} of {session.length}, from{' '}
          <Link to={item.to} className={link}>
            {item.from}
          </Link>
        </span>
        <span className="tabular-nums">
          {right} of {results.length} correct so far
        </span>
      </div>
      <QuestionView
        key={`${item.key}/${item.question.id}`}
        number={index + 1}
        question={item.question}
        picked={picked}
        revealed={picked !== null}
        onPick={picked === null ? pick : undefined}
        onNext={picked === null ? undefined : next}
        lively
      />
      <button onClick={next} disabled={picked === null} className={`${btnPrimary} mt-6`}>
        {index + 1 === session.length ? 'Finish practice' : 'Next question'}
      </button>
    </div>
  )
}
