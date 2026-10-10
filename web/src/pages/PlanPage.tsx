import { Link } from 'react-router-dom'
import Milestone from '../components/Milestone'
import { Figures, Notice, PageHeader } from '../components/Page'
import { courses, getExams, type Course, type ModuleMeta } from '../lib/content'
import { addDays, buildPlan, daysBetween, formatDay, type PlanItem, type StudyPlan } from '../lib/plan'
import { moduleCompletion, moduleKey, setExamDate, today, useProgress, type Progress } from '../lib/progress'
import { moduleNumber, percent, remainingModules } from '../lib/stats'
import { btnQuiet, input, link, listTitle, note, section, sectionTitle } from '../lib/ui'

// More than this many modules a week is flagged as a pace that is hard to keep.
const HEAVY_PACE = 7

export default function PlanPage() {
  const progress = useProgress()
  return (
    <div className="space-y-14">
      <PageHeader back={{ to: '/', label: 'Your certification path' }} title="Study plan">
        Set the day of your exam. The modules you have not finished are spread evenly over the days before it, with the
        last days kept free for review. The plan adjusts itself every day to what is still left.
      </PageHeader>
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
    <section className={section}>
      <h2 className={sectionTitle}>{course.title}</h2>

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
            className={`${input} mt-1`}
          />
        </div>
        {examDate && (
          <button className={btnQuiet} onClick={() => setExamDate(course.id, '')}>
            Remove the date
          </button>
        )}
      </div>

      {!plan && (
        <p className={`${note} mt-4 max-w-xl`}>
          No exam day set yet. {remaining.length} {remaining.length === 1 ? 'module is' : 'modules are'} still to
          finish. Pick a day to see how many you need each week.
        </p>
      )}
      {plan && <PlanDetail course={course} progress={progress} plan={plan} examDate={examDate} now={now} />}
    </section>
  )
}

interface DetailProps {
  course: Course
  progress: Progress
  plan: StudyPlan<ModuleMeta>
  examDate: string
  now: string
}

function PlanDetail({ course, progress, plan, examDate, now }: DetailProps) {
  if (plan.daysLeft < 0) {
    return (
      <div className="mt-5 max-w-xl">
        <Notice tone="critical">{formatDay(examDate, now)} has passed. Choose a new exam day to rebuild the plan.</Notice>
      </div>
    )
  }

  const left = plan.items.length
  const unwritten = plan.items.filter((p) => !p.item.ready).length
  const exams = getExams(course.id).length

  // Modules grouped by the week they fall in, counted in sevens from today.
  const weeks: PlanItem<ModuleMeta>[][] = []
  for (const item of plan.items) {
    const week = Math.floor(daysBetween(now, item.finishBy) / 7)
    ;(weeks[week] ??= []).push(item)
  }

  return (
    <>
      <div className="mt-6">
        <Figures
          items={[
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
          ]}
        />
      </div>

      {left > 0 && plan.perWeek > HEAVY_PACE && (
        <div className="mt-5 max-w-2xl">
          <Notice tone="critical">
            This date needs more than one module every day. Consider a later exam day, or expect to skim some modules.
          </Notice>
        </div>
      )}
      {unwritten > 0 && (
        <p className={`${note} mt-4 max-w-2xl`}>
          Modules that are not written yet are in the plan so the pace is realistic. They become available as they are
          added.
        </p>
      )}

      {plan.daysLeft > 0 && <Timeline plan={plan} examDate={examDate} now={now} modules={left} />}

      <h3 className={`${listTitle} mt-12`}>Schedule</h3>
      {weeks.map((items, week) => {
        if (!items) return null
        const start = addDays(now, week * 7)
        return (
          <details key={week} open={week === 0} className="group border-b border-line">
            <summary className="press flex min-h-12 cursor-pointer flex-wrap items-center justify-between gap-x-6 py-3 font-semibold hover:text-plan">
              <span>{week === 0 ? 'This week' : `Week from ${formatDay(start, now)}`}</span>
              <span className="text-sm font-normal text-muted">
                {items.length} {items.length === 1 ? 'module' : 'modules'}
                <span className="group-open:hidden">. Select to show</span>
              </span>
            </summary>
            <ul className="pb-2">
              {items.map(({ item, finishBy }) => {
                const done = moduleCompletion(progress, moduleKey(course.id, item.id))
                const title = `${moduleNumber(course, item.id)} ${item.title}`
                return (
                  <li
                    key={item.id}
                    className="grid gap-x-4 gap-y-0.5 border-t border-line py-2.5 sm:grid-cols-[8rem_minmax(0,1fr)_7rem]"
                  >
                    <span className={`text-sm tabular-nums ${finishBy === now ? 'font-semibold text-plan' : 'text-muted'}`}>
                      {finishBy === now ? 'Today' : formatDay(finishBy, now)}
                    </span>
                    {item.ready ? (
                      <Link to={`/${course.id}/${item.id}`} className={link}>
                        {title}
                      </Link>
                    ) : (
                      <span className="text-muted">{title} (not written yet)</span>
                    )}
                    <span className="text-sm tabular-nums text-muted sm:text-right">{percent(done)} done</span>
                  </li>
                )
              })}
            </ul>
          </details>
        )
      })}
      {left === 0 && <p className={`${note} border-b border-line py-3`}>Every module is finished.</p>}

      {plan.reviewStart && (
        <div className="grid gap-x-4 gap-y-0.5 border-b border-line py-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
          <span className="text-sm tabular-nums text-muted">{formatDay(plan.reviewStart, now)}</span>
          <p>
            <span className="font-semibold">
              Final review, {plan.reviewDays} {plan.reviewDays === 1 ? 'day' : 'days'}.
            </span>{' '}
            Due flashcards, missed questions
            {exams > 0 && (
              <>
                {' '}
                and the{' '}
                <Link to={`/${course.id}/exams`} className={link}>
                  {exams} mock exams
                </Link>
                , the last one in real exam mode
              </>
            )}
            .
          </p>
        </div>
      )}
      <div className="grid gap-x-4 gap-y-0.5 py-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
        <span className="text-sm font-semibold tabular-nums">{formatDay(examDate, now)}</span>
        <span className="flex items-center gap-2 font-semibold">
          <Milestone value={0} size={16} />
          {course.title} exam
        </span>
      </div>
    </>
  )
}

/** Today to the exam day drawn to scale: the study period, the final review, then the exam. */
function Timeline({ plan, examDate, now, modules }: { plan: StudyPlan<ModuleMeta>; examDate: string; now: string; modules: number }) {
  const days = (count: number) => `${count} ${count === 1 ? 'day' : 'days'}`
  return (
    <figure className="mt-10">
      <figcaption className={note}>From today to the exam, drawn to scale.</figcaption>
      <div className="mt-3 flex items-center">
        <div className="flex h-9 min-w-0 flex-1 overflow-hidden rounded-sm border border-ink">
          {plan.studyDays > 0 && (
            <span className="flex min-w-0 items-center bg-plan px-2 text-sm font-semibold text-on-plan" style={{ flexGrow: plan.studyDays, flexBasis: 0 }}>
              <span className="truncate">Study</span>
            </span>
          )}
          {plan.reviewDays > 0 && (
            <span
              className="flex min-w-0 items-center border-l border-ink bg-milestone-soft px-2 text-sm font-semibold"
              style={{ flexGrow: plan.reviewDays, flexBasis: 0 }}
            >
              <span className="truncate">Review</span>
            </span>
          )}
        </div>
        <span className="-ml-2.5 shrink-0">
          <Milestone value={0} size={28} />
        </span>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold">Today</dt>
          <dd className="text-muted">
            {days(plan.studyDays)} for {modules} {modules === 1 ? 'module' : 'modules'}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Final review</dt>
          <dd className="text-muted">
            {plan.reviewStart ? `${days(plan.reviewDays)} from ${formatDay(plan.reviewStart, now)}` : 'No room for one'}
          </dd>
        </div>
        <div className="sm:text-right">
          <dt className="font-semibold">Exam</dt>
          <dd className="text-muted">{formatDay(examDate, now)}</dd>
        </div>
      </dl>
    </figure>
  )
}

/** "2 modules", "1.5 modules" or "Less than 1 module". */
export function formatPace(perWeek: number): string {
  if (perWeek < 1) return 'Less than 1 module'
  const rounded = Math.round(perWeek * 2) / 2
  return `${rounded} ${rounded === 1 ? 'module' : 'modules'}`
}
