import { Link, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../components/NotFound'
import { getCourse, getExams, type Course, type Exam } from '../lib/content'
import { elapsedMs, examKey, examLimitMs, formatClock, formatDuration, lastAttempt } from '../lib/exam'
import { abandonExam, moduleKey, startExam, useProgress, type ExamMode, type Progress } from '../lib/progress'
import { percent } from '../lib/stats'
import Icon from '../components/Icon'
import { PageHeader } from '../components/Page'
import { btnDanger, btnPrimary, btnQuiet, column, link, note, sectionTitle } from '../lib/ui'
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
    <div className={column}>
      <PageHeader back={{ to: `/${course.id}`, label: `All ${course.title} modules` }} title="Mock exams">
        Each mock exam has {course.exam.questions} questions in {course.exam.minutes} minutes, split {split} across the{' '}
        {course.domains.length} domains like the real exam. No question appears in two mock exams.
      </PageHeader>

      <table className="data-table stack mt-8">
        <thead>
          <tr>
            <th>
              <span className="sr-only">What differs</span>
            </th>
            <th>Practice mode</th>
            <th>Real exam mode</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Order', 'One chapter per domain', 'All domains mixed'],
            ['Feedback', 'Explanation and book page after each answer', 'Nothing until you submit'],
            ['Break', 'None', `10 minutes after question ${course.exam.questions / 2}; the first half is then locked`],
            ['Going back', 'No, each answer is final', 'Yes, within the current half; you can flag questions'],
          ].map(([label, practice, real]) => (
            <tr key={label}>
              <td className="font-semibold">{label}</td>
              <td data-label="Practice mode">{practice}</td>
              <td data-label="Real exam mode">{real}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={`${note} mt-3`}>
        In both modes the {course.exam.minutes / 60}-hour clock starts when you start and keeps running if you close the
        page. When it runs out, the exam is submitted with the answers given so far.
      </p>
      <p className={`${note} mt-2`}>
        Beside multiple choice, the real exam has matching, hot spot and comic strip questions.{' '}
        <Link to={`/${course.id}/question-types`} className={link}>
          Try one of each
        </Link>{' '}
        before an exam that has them.
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
    <section className="card mt-5 px-5 py-5 sm:px-6">
      <h2 className={`${sectionTitle} flex items-center gap-2.5`}>
        <Icon name="exam" size={24} className="text-plan" />
        {exam.title}
      </h2>
      {exam.unseen && (
        <p className={`${note} mt-1`}>
          Kept for last: these questions are in no module quiz.{' '}
          {seen === 0
            ? 'You have not seen any of them yet.'
            : `You have already answered ${seen} of the ${exam.questions.length}.`}
        </p>
      )}

      {exam.mixed && (
        <p className={`${note} mt-1`}>
          The real exam's mix: about one question in seven is a matching, hot spot or comic strip question. These
          questions are also in the module quizzes.
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
        <ul className="mt-4 space-y-1.5 text-sm leading-relaxed">
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
