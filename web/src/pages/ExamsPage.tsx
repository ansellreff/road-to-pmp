import { Link, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../components/NotFound'
import { getCourse, getExams, type Course, type Exam } from '../lib/content'
import { elapsedMs, examKey, examLimitMs, formatClock, formatDuration, lastAttempt } from '../lib/exam'
import { abandonExam, moduleKey, startExam, useProgress, type ExamMode, type Progress } from '../lib/progress'
import { percent } from '../lib/stats'
import { btnDanger, btnPrimary, btnQuiet, link } from '../lib/ui'
import { useNow } from '../lib/useNow'

const modeName: Record<ExamMode, string> = { practice: 'Practice mode', real: 'Real exam mode' }

export default function ExamsPage() {
  const course = getCourse(useParams().courseId)
  const progress = useProgress()
  if (!course) return <NotFound />
  const exams = getExams(course.id)
  // Counted from the first exam, since rounding the weights does not add up to the exam size.
  const split = course.domains
    .map((d) => exams[0]?.questions.filter(([moduleId]) => d.modules.some((m) => m.id === moduleId)).length ?? 0)
    .join(' / ')

  return (
    <div className="max-w-3xl">
      <Link to={`/${course.id}`} className={`${link} text-sm`}>
        {course.title}
      </Link>
      <h1 className="title mt-3 text-4xl">Mock exams</h1>
      <p className="mt-3 text-muted">
        Each mock exam has {course.exam.questions} questions in {course.exam.minutes} minutes, split {split} across the{' '}
        {course.domains.length} domains like the real exam. No question appears in two mock exams.
      </p>

      <table className="mt-6 w-full border-y-2 border-ink text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="py-2 pr-4 font-semibold"></th>
            <th className="py-2 pr-4 font-semibold">Practice mode</th>
            <th className="py-2 font-semibold">Real exam mode</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line align-top">
          {[
            ['Order', 'One chapter per domain', 'All domains mixed'],
            ['Feedback', 'Explanation and book page after each answer', 'Nothing until you submit'],
            ['Break', 'None', `10 minutes after question ${course.exam.questions / 2}; the first half is then locked`],
            ['Going back', 'No, each answer is final', 'Yes, within the current half; you can flag questions'],
          ].map(([label, practice, real]) => (
            <tr key={label}>
              <th className="py-2 pr-4 text-left font-medium text-muted">{label}</th>
              <td className="py-2 pr-4">{practice}</td>
              <td className="py-2">{real}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted">
        In both modes the {course.exam.minutes / 60}-hour clock starts when you start and keeps running if you close the
        page. When it runs out, the exam is submitted with the answers given so far.
      </p>

      {exams.length === 0 && <p className="mt-8 text-muted">This course has no mock exams yet.</p>}
      {exams.map((exam) => (
        <ExamRow key={exam.id} course={course} exam={exam} progress={progress} />
      ))}
    </div>
  )
}

function ExamRow({ course, exam, progress }: { course: Course; exam: Exam; progress: Progress }) {
  const navigate = useNavigate()
  const now = useNow()
  const key = examKey(course.id, exam.id)
  const record = progress.exams[key]
  const run = record?.run
  const to = `/${course.id}/exams/${exam.id}`
  const seen = exam.questions.filter(([moduleId, id]) => progress.answers[moduleKey(course.id, moduleId)]?.[id]).length

  function start(mode: ExamMode) {
    const warning = `Start ${exam.title} in ${modeName[mode].toLowerCase()}? The ${course.exam.minutes / 60}-hour clock starts now and cannot be paused.`
    if (!window.confirm(warning)) return
    startExam(key, mode, exam.questions.length)
    navigate(to)
  }

  function abandon() {
    if (window.confirm(`Stop ${exam.title} without a result? The answers given so far are not kept.`)) abandonExam(key)
  }

  const left = run ? examLimitMs(course) - elapsedMs(run, now) : 0

  return (
    <section className="mt-8 border-t-2 border-ink pt-5">
      <h2 className="title text-2xl">{exam.title}</h2>
      {exam.unseen && (
        <p className="mt-1 text-sm text-muted">
          Kept for last: these questions are in no module quiz.{' '}
          {seen === 0
            ? 'You have not seen any of them yet.'
            : `You have already answered ${seen} of the ${exam.questions.length}.`}
        </p>
      )}

      {run ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link to={to} className={btnPrimary}>
            {left > 0 ? `Continue in ${modeName[run.mode].toLowerCase()}` : 'Time is up. See your result'}
          </Link>
          {left > 0 && (
            <>
              <span className="text-sm tabular-nums text-muted">
                {formatClock(left)} left, {run.picks.filter((p) => p !== null).length} of {run.picks.length} answered
              </span>
              <button onClick={abandon} className={btnDanger}>
                Stop without a result
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={() => start('practice')} className={btnPrimary}>
            Start in practice mode
          </button>
          <button onClick={() => start('real')} className={btnQuiet}>
            Start in real exam mode
          </button>
        </div>
      )}

      {record?.attempts.length ? (
        <ul className="mt-4 space-y-1 text-sm">
          {(['practice', 'real'] as ExamMode[]).map((mode) => {
            const attempt = lastAttempt(record.attempts, mode)
            if (!attempt) return null
            const number = record.attempts.lastIndexOf(attempt) + 1
            return (
              <li key={mode}>
                <span className="text-muted">Last result in {modeName[mode].toLowerCase()}: </span>
                <Link to={`${to}?attempt=${number}`} className={link}>
                  {attempt.right} of {attempt.total} ({percent(attempt.right / attempt.total)})
                </Link>
                <span className="text-muted">
                  {' '}
                  in {formatDuration(attempt.seconds)}, on {new Date(attempt.date).toLocaleDateString()}
                </span>
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )
}
