import { Link } from 'react-router-dom'
import Milestone from '../components/Milestone'
import { courses, type Course, type ModuleMeta } from '../lib/content'
import { addDays, buildPlan, formatDay, type StudyPlan } from '../lib/plan'
import { moduleCompletion, moduleKey, setExamDate, today, useProgress, type Progress } from '../lib/progress'
import { moduleNumber, percent, remainingModules } from '../lib/stats'
import { btnQuiet, link } from '../lib/ui'

// More than this many modules a week is flagged as a pace that is hard to keep.
const HEAVY_PACE = 7

export default function PlanPage() {
  const progress = useProgress()
  return (
    <div className="space-y-14">
      <section>
        <Link to="/" className={`${link} text-sm`}>
          Your certification path
        </Link>
        <h1 className="title mt-3 text-4xl sm:text-5xl">Study plan</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Set the day of your exam. The modules you have not finished are spread evenly over the days before it, with
          the last days kept free for review. The plan adjusts itself every day to what is still left.
        </p>
      </section>
      {courses.map((course) => (
        <CoursePlan key={course.id} course={course} progress={progress} />
      ))}
    </div>
  )
}

function CoursePlan({ course, progress }: { course: Course; progress: Progress }) {
  const now = today()
  const examDate = progress.examDates[course.id] ?? ''
  const remaining = remainingModules(course, progress)
  const plan = examDate ? buildPlan(now, examDate, remaining) : undefined
  const inputId = `exam-date-${course.id}`

  return (
    <section className="border-t-2 border-ink pt-6">
      <h2 className="title text-3xl">{course.title}</h2>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium">
            Exam day
          </label>
          <input
            id={inputId}
            type="date"
            value={examDate}
            min={addDays(now, 1)}
            onChange={(e) => setExamDate(course.id, e.target.value)}
            className="mt-1 rounded-md border border-line bg-surface px-3 py-2 text-ink focus:border-plan"
          />
        </div>
        {examDate && (
          <button className={btnQuiet} onClick={() => setExamDate(course.id, '')}>
            Remove the date
          </button>
        )}
      </div>

      {!plan && (
        <p className="mt-4 max-w-xl text-sm text-muted">
          No exam day set yet. {remaining.length} {remaining.length === 1 ? 'module is' : 'modules are'} still to
          finish. Pick a day to see how many you need each week.
        </p>
      )}
      {plan && <PlanDetail course={course} progress={progress} plan={plan} examDate={examDate} now={now} />}
    </section>
  )
}

function PlanDetail({
  course,
  progress,
  plan,
  examDate,
  now,
}: {
  course: Course
  progress: Progress
  plan: StudyPlan<ModuleMeta>
  examDate: string
  now: string
}) {
  if (plan.daysLeft < 0) {
    return (
      <p className="mt-4 max-w-xl font-medium text-critical">
        {formatDay(examDate, now)} has passed. Choose a new exam day to rebuild the plan.
      </p>
    )
  }

  const left = plan.items.length
  const unwritten = plan.items.filter((p) => !p.item.ready).length
  const figures = [
    {
      label: 'Days to the exam',
      value: String(plan.daysLeft),
      note: plan.daysLeft === 0 ? 'The exam is today.' : `Exam on ${formatDay(examDate, now)}.`,
    },
    {
      label: 'Modules still to finish',
      value: String(left),
      note: unwritten ? `${unwritten} of them are not written yet.` : 'All of them are ready to study.',
    },
    {
      label: 'Pace to keep',
      value: left && plan.studyDays ? `${formatPace(plan.perWeek)} a week` : 'None',
      note: plan.reviewStart
        ? `Final review starts ${formatDay(plan.reviewStart, now)}.`
        : 'Too little time for a separate final review.',
    },
  ]

  return (
    <>
      <dl className="mt-6 grid gap-x-8 gap-y-6 border-y-2 border-ink py-5 sm:grid-cols-3">
        {figures.map((f) => (
          <div key={f.label}>
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="title mt-1 text-3xl tabular-nums">{f.value}</dd>
            <dd className="mt-1 text-sm text-muted">{f.note}</dd>
          </div>
        ))}
      </dl>

      {left > 0 && plan.perWeek > HEAVY_PACE && (
        <p className="mt-4 max-w-2xl font-medium text-critical">
          This date needs more than one module every day. Consider a later exam day, or expect to skim some modules.
        </p>
      )}
      {unwritten > 0 && (
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Modules that are not written yet are in the plan so the pace is realistic. They become available as they are
          added.
        </p>
      )}

      <h3 className="title mt-10 text-xl">Schedule</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink text-sm text-muted">
              <th className="w-40 py-2 pr-4 font-medium">Finish by</th>
              <th className="py-2 pr-4 font-medium">Module</th>
              <th className="w-28 py-2 font-medium">Done so far</th>
            </tr>
          </thead>
          <tbody>
            {plan.items.map(({ item, finishBy }) => {
              const done = moduleCompletion(progress, moduleKey(course.id, item.id))
              const title = `${moduleNumber(course, item.id)} ${item.title}`
              return (
                <tr key={item.id} className="border-b border-line">
                  <td className={`py-2.5 pr-4 tabular-nums ${finishBy === now ? 'font-semibold text-plan' : ''}`}>
                    {finishBy === now ? 'Today' : formatDay(finishBy, now)}
                  </td>
                  <td className="py-2.5 pr-4">
                    {item.ready ? (
                      <Link to={`/${course.id}/${item.id}`} className={link}>
                        {title}
                      </Link>
                    ) : (
                      <span className="text-muted">{title} (not written yet)</span>
                    )}
                  </td>
                  <td className="py-2.5 tabular-nums text-muted">{percent(done)}</td>
                </tr>
              )
            })}
            {plan.reviewStart && (
              <tr className="border-b border-line">
                <td className="py-2.5 pr-4 tabular-nums">{formatDay(plan.reviewStart, now)}</td>
                <td className="py-2.5 pr-4" colSpan={2}>
                  <span className="font-semibold">Final review, {plan.reviewDays} days.</span>{' '}
                  <span className="text-muted">Due flashcards, missed questions and full practice exams.</span>
                </td>
              </tr>
            )}
            <tr>
              <td className="py-2.5 pr-4 font-semibold tabular-nums">{formatDay(examDate, now)}</td>
              <td className="py-2.5 pr-4" colSpan={2}>
                <span className="flex items-center gap-2 font-semibold">
                  <Milestone value={0} size={16} />
                  {course.title} exam
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

/** "2 modules", "1.5 modules" or "Less than 1 module". */
export function formatPace(perWeek: number): string {
  if (perWeek < 1) return 'Less than 1 module'
  const rounded = Math.round(perWeek * 2) / 2
  return `${rounded} ${rounded === 1 ? 'module' : 'modules'}`
}
