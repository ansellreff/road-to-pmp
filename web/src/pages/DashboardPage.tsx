import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { WeakModules } from '../components/ExamInsights'
import Icon from '../components/Icon'
import { Figures, Meter, PageHeader } from '../components/Page'
import Ring from '../components/Ring'
import { getExams, startedCourses, loadExamQuestions, type Course, type Exam, type ExamQuestion } from '../lib/content'
import { bandFor, domainScores, examKey, formatDuration, moduleLosses, type ModuleLoss } from '../lib/exam'
import { dueCount, isKnown, setAttemptDomains, studyStreak, today, useProgress, type ExamAttempt, type Progress } from '../lib/progress'
import { milestones } from '../lib/milestones'
import { MOCK_SHARE, readiness } from '../lib/readiness'
import { answerTotals, domainStats, moduleNumber, percent, type DomainStats, type ModuleStats } from '../lib/stats'
import { btnPrimary, btnQuiet, domainBg, link, listTitle, note, section, sectionTitle, subTitle } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

const PASS = 0.7
const ACTIVITY_DAYS = 14

export default function DashboardPage() {
  const progress = useProgress()
  return (
    <div className="space-y-14">
      <section>
        <PageHeader back={{ to: '/', label: 'Your certification path' }} title="Dashboard" />
        <div className="mt-8">
          <Totals progress={progress} />
        </div>
        <Activity progress={progress} />
      </section>
      {startedCourses.map((course) => (
        <CourseDashboard key={course.id} course={course} progress={progress} />
      ))}
    </div>
  )
}

function Totals({ progress }: { progress: Progress }) {
  const streak = studyStreak(progress)
  const { answered, right } = answerTotals(progress)
  const known = Object.values(progress.cards).reduce((sum, deck) => sum + Object.values(deck).filter(isKnown).length, 0)
  const due = dueCount(progress)
  return (
    <Figures
      items={[
        {
          label: 'Study streak',
          value: `${streak} ${streak === 1 ? 'day' : 'days'}`,
          note: streak ? 'Study today to keep it going.' : 'Read a lesson or answer a question to start one.',
        },
        {
          label: 'Quiz questions answered',
          value: String(answered),
          note: answered ? `${percent(right / answered)} of your answers were correct.` : 'Counted from your next quiz onward.',
        },
        {
          label: 'Flashcards you know',
          value: String(known),
          note: due ? `${due} due for review today.` : 'None due for review today.',
        },
      ]}
    />
  )
}

/** The last two weeks, one cell a day, filled on the days you studied. */
function Activity({ progress }: { progress: Progress }) {
  const days = Array.from({ length: ACTIVITY_DAYS }, (_, i) => today(i - ACTIVITY_DAYS + 1))
  const studied = days.filter((d) => progress.activity[d]).length
  return (
    <div className="mt-6">
      <p className="text-sm text-muted">
        You studied on {studied} of the last {ACTIVITY_DAYS} days.
      </p>
      <ol className="mt-2 flex max-w-xl gap-1" aria-hidden="true">
        {days.map((day, i) => {
          const active = Boolean(progress.activity[day])
          const date = new Date(`${day}T00:00`)
          return (
            <li key={day} className="flex-1 text-center">
              <span
                title={`${date.toLocaleDateString(undefined, { dateStyle: 'medium' })}: ${active ? 'studied' : 'no study'}`}
                className={`block h-6 rounded-[2px] ${active ? 'bg-plan' : 'bg-line'} ${
                  i === ACTIVITY_DAYS - 1 ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper' : ''
                }`}
              />
              <span className="mt-1.5 block text-xs text-muted">
                {i === ACTIVITY_DAYS - 1 ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'narrow' })}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function CourseDashboard({ course, progress }: { course: Course; progress: Progress }) {
  const domains = course.domains.map((d) => domainStats(course, d, progress))
  const missed = domains.reduce((sum, d) => sum + d.missed, 0)
  const revisit = domains
    .flatMap((d) => d.modules)
    .filter((m) => m.missed > 0 || (m.quiz !== undefined && m.quiz < PASS))
    .sort((a, b) => b.missed - a.missed || (a.quiz ?? 1) - (b.quiz ?? 1))
    .slice(0, 8)

  return (
    <section className={section}>
      <h2 className={sectionTitle}>{course.title}</h2>

      <ReadinessPanel course={course} progress={progress} />

      <h3 className={`${subTitle} mt-12`}>Progress by exam domain</h3>
      <p className={`${note} mt-1 max-w-2xl`}>
        The thick bar is your quiz average, from your best score in each module. The thin bar is how much of the domain
        you have completed. A domain with a high exam weight and a short bar is where study time pays off most.
      </p>
      <DomainChart courseId={course.id} domains={domains} />

      <MockResults course={course} progress={progress} />

      <h3 className={`${listTitle} mt-12`}>Milestones</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {milestones(course, progress).map((m) => (
          <li key={m.id} className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${m.earned ? 'card border-milestone' : 'border-dashed border-edge'}`}>
            <Icon name="trophy" className={`mt-0.5 ${m.earned ? 'text-milestone' : 'text-muted'}`} />
            <span>
              <span className={`block font-semibold leading-snug ${m.earned ? '' : 'text-muted'}`}>{m.title}</span>
              <span className="block text-sm text-muted">{m.earned ? 'Reached' : m.how}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className={`${section} mt-12 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <h3 className={subTitle}>
            {missed ? `${missed} ${missed === 1 ? 'question' : 'questions'} to practice` : 'No questions to practice right now'}
          </h3>
          <p className={`${note} mt-1 max-w-xl`}>
            A question lands here when your latest answer to it was wrong, in a quiz or a mock exam, and leaves once you
            answer it correctly.
          </p>
        </div>
        {missed > 0 && (
          <Link to="/practice" className={btnPrimary}>
            Practice these questions
          </Link>
        )}
      </div>

      {revisit.length > 0 && (
        <>
          <h3 className={`${listTitle} mt-12`}>Modules to revisit</h3>
          <ul className="divide-y divide-line border-b border-line">
            {revisit.map((m) => (
              <RevisitRow key={m.key} course={course} stats={m} />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

/** One row per domain on a shared 0 to 100% scale, with the 70% target drawn through all of them. */
function DomainChart({ courseId, domains }: { courseId: string; domains: DomainStats[] }) {
  const columns = 'sm:grid sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_9rem] sm:gap-x-6'
  return (
    <div className="mt-5 border-y-2 border-ink">
      <div className={`${columns} hidden border-b border-line py-2 text-sm text-muted`} aria-hidden="true">
        <span>Domain and exam weight</span>
        <span className="relative block">
          0%
          <span className="absolute -translate-x-1/2 font-semibold text-ink" style={{ left: percent(PASS) }}>
            {percent(PASS)} target
          </span>
          <span className="absolute right-0">100%</span>
        </span>
        <span>To practice</span>
      </div>
      {domains.map((stats, i) => {
        const { domain, modules, quizAverage } = stats
        const below = quizAverage !== undefined && quizAverage < PASS
        return (
          <div key={domain.id} className={`${columns} items-center border-b border-line py-4 last:border-b-0`}>
            <div>
              <Link to={`/${courseId}#${domain.id}`} className="press flex items-start gap-2.5 font-semibold underline-offset-4 hover:text-plan hover:underline">
                <span className={`mt-1 h-4 w-1.5 shrink-0 rounded-full ${domainBg[i]}`} aria-hidden="true" />
                <span>
                  {i + 1}. {domain.title}
                </span>
              </Link>
              <p className="text-sm text-muted">{domain.weight}% of the exam</p>
            </div>

            <div className="mt-3 sm:mt-0">
              <div className="relative">
                {/* The target line runs through both bars. */}
                <span
                  className="absolute -top-1.5 -bottom-1.5 z-10 w-0.5 bg-ink"
                  style={{ left: percent(PASS) }}
                  aria-hidden="true"
                />
                <span className="meter h-5" aria-hidden="true">
                  <span
                    className={quizAverage === undefined ? '' : below ? 'bg-critical' : 'bg-done'}
                    style={{ width: percent(quizAverage ?? 0) }}
                  />
                </span>
                <div className="mt-1.5">
                  <Meter value={stats.completion} className="h-1.5" />
                </div>
              </div>
              <p className="mt-2 text-sm tabular-nums">
                {quizAverage === undefined ? (
                  <span className="text-muted">No quiz taken yet</span>
                ) : (
                  <span className={`font-semibold ${below ? 'text-critical' : 'text-done'}`}>
                    Quiz average {percent(quizAverage)}, {below ? 'below' : 'at or above'} target
                  </span>
                )}
                <span className="text-muted">
                  {quizAverage !== undefined && ` (${stats.quizzesTaken} of ${modules.length} quizzes)`}. Completed{' '}
                  {percent(stats.completion)}, {stats.lessonsRead} of {modules.length} lessons read.
                </span>
              </p>
            </div>

            <p className="mt-2 text-sm tabular-nums sm:mt-0">
              {stats.missed ? (
                <span className="font-semibold">
                  {stats.missed} {stats.missed === 1 ? 'question' : 'questions'}
                  <span className="sm:hidden"> to practice</span>
                </span>
              ) : (
                <span className="text-muted">
                  <span className="sm:hidden">Nothing to practice</span>
                  <span className="hidden sm:inline">None</span>
                </span>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}

async function loadTakenExams(course: Course, exams: Exam[]): Promise<Record<string, ExamQuestion[]>> {
  const loaded = await Promise.all(exams.map(async (exam) => [exam.id, await loadExamQuestions(course, exam)] as const))
  return Object.fromEntries(loaded)
}

/** One figure for how prepared you are, with the working shown. */
function ReadinessPanel({ course, progress }: { course: Course; progress: Progress }) {
  const result = readiness(course, progress)
  const focus = course.domains[result.focus]
  return (
    <>
      <h3 className={`${subTitle} mt-8`}>Readiness estimate</h3>
      {result.empty ? (
        <p className={`${note} mt-1 max-w-2xl`}>
          Nothing to estimate from yet. Finish a module quiz or a mock exam and a figure appears here.
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Ring value={result.value} size={112} stroke={10} tone="var(--color-plan)" label={`Readiness estimate ${percent(result.value)}`}>
              <span className="title text-3xl tabular-nums">{percent(result.value)}</span>
            </Ring>
            <p className="max-w-xl leading-relaxed">
              Study would raise it most in{' '}
              <Link to={`/${course.id}#${focus.id}`} className={link}>
                Domain {result.focus + 1}: {focus.title}
              </Link>
              , which is {focus.weight}% of the exam and stands at {percent(result.domains[result.focus].value)}.
            </p>
          </div>
          <table className="data-table stack mt-5">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Exam weight</th>
                <th>Quizzes</th>
                <th>Mock exams</th>
                <th>Readiness</th>
              </tr>
            </thead>
            <tbody>
              {result.domains.map((d, i) => (
                <tr key={course.domains[i].id}>
                  <td className="font-semibold">
                    {i + 1}. {course.domains[i].title}
                  </td>
                  <td data-label="Exam weight" className="tabular-nums">
                    {d.weight}%
                  </td>
                  <td data-label="Quizzes" className="tabular-nums">
                    {percent(d.quizzes)}
                    <span className="text-sm text-muted">
                      {' '}
                      ({d.quizzesTaken} of {d.quizzesTotal} taken)
                    </span>
                  </td>
                  <td data-label="Mock exams" className="tabular-nums">
                    {d.mocks === undefined ? <span className="text-muted">None yet</span> : percent(d.mocks)}
                  </td>
                  <td data-label="Readiness" className="font-semibold tabular-nums">
                    {percent(d.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`${note} mt-3 max-w-3xl`}>
            How it is worked out: in each domain, the quiz figure is the average of your best quiz scores, with a quiz
            not yet taken counted as zero. Once you have taken a mock exam, the domain is {percent(MOCK_SHARE)} your
            mock exam result and {percent(1 - MOCK_SHARE)} the quiz figure. The domains are then combined by their
            exam weight. This is an estimate of preparation, not a prediction of passing: PMI does not publish a pass
            mark.
          </p>
        </>
      )}
    </>
  )
}

/** Overall score of each attempt in the order taken, as a line. */
function Trend({ shares }: { shares: number[] }) {
  if (shares.length < 2) return null
  const x = (i: number) => 20 + (i * 560) / (shares.length - 1)
  const y = (share: number) => 90 - share * 80
  return (
    <figure className="mt-5">
      <svg viewBox="0 0 600 100" role="img" aria-label={`Overall score over ${shares.length} attempts: ${shares.map((s) => percent(s)).join(', ')}`} className="w-full max-w-xl">
        <line x1="20" y1={y(PASS)} x2="580" y2={y(PASS)} stroke="var(--color-muted)" strokeDasharray="5 4" />
        <polyline points={shares.map((s, i) => `${x(i)},${y(s)}`).join(' ')} fill="none" stroke="var(--color-plan)" strokeWidth="2.5" />
        {shares.map((s, i) => (
          <circle key={i} cx={x(i)} cy={y(s)} r="4.5" fill="var(--color-plan)" />
        ))}
      </svg>
      <figcaption className={note}>
        Overall score, oldest attempt on the left. The dashed line is {percent(PASS)}.
      </figcaption>
    </figure>
  )
}

/** Every mock exam attempt, newest first, with the score in each domain; and where the points went. */
function MockResults({ course, progress }: { course: Course; progress: Progress }) {
  const exams = getExams(course.id)
  const attempts = exams
    .flatMap((exam) =>
      (progress.exams[examKey(course.id, exam.id)]?.attempts ?? []).map((attempt, index) => ({ exam, attempt, index })),
    )
    .sort((a, b) => a.attempt.date.localeCompare(b.attempt.date))
  const taken = exams.filter((exam) => attempts.some((a) => a.exam.id === exam.id))
  const questions = useLoaded(() => loadTakenExams(course, taken))

  // Attempts made before the result per domain was stored get it filled in once.
  useEffect(() => {
    if (!questions) return
    for (const { exam, attempt, index } of attempts) {
      const loaded = questions[exam.id]
      if (!attempt.domains && loaded) {
        const domains = domainScores(course, loaded, attempt.picks).map(({ right, total }) => ({ right, total }))
        setAttemptDomains(examKey(course.id, exam.id), index, domains)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions])

  // Lost questions per module, over the latest attempt of each exam.
  const losses = new Map<string, ModuleLoss>()
  for (const exam of taken) {
    const last = attempts.filter((a) => a.exam.id === exam.id).pop()
    for (const loss of last && questions?.[exam.id] ? moduleLosses(questions[exam.id], last.attempt.picks) : []) {
      const sum = losses.get(loss.moduleId) ?? { moduleId: loss.moduleId, lost: 0, total: 0 }
      losses.set(loss.moduleId, { ...sum, lost: sum.lost + loss.lost, total: sum.total + loss.total })
    }
  }
  const weakest = [...losses.values()].sort((a, b) => b.lost - a.lost)

  return (
    <>
      <h3 className={`${listTitle} mt-12`}>Mock exam results</h3>
      {attempts.length === 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-4">
          <p className={`${note} max-w-xl`}>
            No mock exam finished yet. Each one gives a rating per domain, the way the real exam reports its result.
          </p>
          <Link to={`/${course.id}/exams`} className={btnQuiet}>
            Go to the mock exams
          </Link>
        </div>
      ) : (
        <>
          <table className="data-table stack">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Score</th>
                {course.domains.map((d, i) => (
                  <th key={d.id} title={d.title}>
                    Domain {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...attempts].reverse().map(({ exam, attempt, index }) => (
                <ResultRow key={`${exam.id}/${index}`} course={course} exam={exam} attempt={attempt} number={index + 1} />
              ))}
            </tbody>
          </table>
          <Trend shares={attempts.map((a) => a.attempt.right / a.attempt.total)} />

          <h3 className={`${listTitle} mt-12`}>Weak spots from your mock exams</h3>
          <p className={`${note} mt-3`}>
            Modules where you lost the most questions, counting the latest attempt of each mock exam.
          </p>
          {questions ? <WeakModules course={course} losses={weakest} limit={6} /> : <p className={`${note} py-3`}>Loading</p>}
        </>
      )}
    </>
  )
}

function ResultRow({ course, exam, attempt, number }: { course: Course; exam: Exam; attempt: ExamAttempt; number: number }) {
  return (
    <tr>
      <td>
        <Link to={`/${course.id}/exams/${exam.id}?attempt=${number}`} className={link}>
          {exam.title}
        </Link>
        <span className="block text-sm text-muted">
          {new Date(attempt.date).toLocaleDateString()}, {attempt.mode === 'practice' ? 'practice mode' : 'real exam mode'},{' '}
          {formatDuration(attempt.seconds)}
        </span>
      </td>
      <td data-label="Score" className="tabular-nums">
        {attempt.right} of {attempt.total} ({percent(attempt.right / attempt.total)})
      </td>
      {course.domains.map((d, i) => {
        const score = attempt.domains?.[i]
        const band = score && bandFor(score.right / score.total)
        return (
          <td key={d.id} data-label={`Domain ${i + 1}`} className="text-sm">
            {band && score ? (
              <>
                <span className={`font-semibold ${band.style}`}>{band.name}</span>
                <span className="text-muted sm:block"> {percent(score.right / score.total)}</span>
              </>
            ) : (
              <span className="text-muted">Loading</span>
            )}
          </td>
        )
      })}
    </tr>
  )
}

function RevisitRow({ course, stats }: { course: Course; stats: ModuleStats }) {
  const { module, quiz, missed } = stats
  return (
    <li className="flex min-h-12 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
      <Link to={`/${course.id}/${module.id}`} className={link}>
        {moduleNumber(course, module.id)} {module.title}
      </Link>
      <span className="text-sm text-muted">
        {quiz !== undefined && (
          <span className={quiz < PASS ? 'font-semibold text-critical' : ''}>Best quiz score {percent(quiz)}</span>
        )}
        {quiz !== undefined && missed > 0 && ', '}
        {missed > 0 && `${missed} to practice`}
      </span>
    </li>
  )
}
