import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Milestone from '../components/Milestone'
import { Figures, Notice, PageHeader } from '../components/Page'
import { getExams, startedCourses, type Course, type ModuleMeta } from '../lib/content'
import { examKey } from '../lib/exam'
import { addDays, buildPlan, daysBetween, formatDate, formatDay, planMockExams, type PlanItem, type StudyPlan } from '../lib/plan'
import { dueByDay, moduleCompletion, moduleKey, setExamDate, studyCourses, today, useProgress, type Progress } from '../lib/progress'
import { moduleNumber, percent, remainingModules } from '../lib/stats'
import { toast } from '../lib/toast'
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
      {studyCourses(startedCourses, progress).map((course) => (
        <CoursePlan key={course.id} course={course} progress={progress} />
      ))}
    </div>
  )
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** A typed day as "2027-01-03", from "2027-01-03" or "3 Jan 2027" (month in full or short); undefined if it is no real day. */
function parseDay(text: string): string | undefined {
  const t = text.trim().toLowerCase()
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t)
  const written = /^(\d{1,2})\s+([a-z]{3})[a-z]*\.?,?\s+(\d{4})$/.exec(t)
  const [y, m, d] = iso ? [+iso[1], +iso[2], +iso[3]] : written ? [+written[3], MONTHS.indexOf(written[2]) + 1, +written[1]] : [0, 0, 0]
  const date = new Date(y, m - 1, d)
  if (!y || date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return undefined
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

const shownDay = (day: string) => (day ? formatDate(new Date(`${day}T00:00`)) : '')

/**
 * The exam day, shown as "3 Jan 2027" like every date in the app. Type it (3 Jan 2027, or 2027-01-03) or pick it
 * from the browser's calendar with the button beside it.
 */
function ExamDayField({ id, value, min, onChange }: { id: string; value: string; min: string; onChange: (day: string) => void }) {
  const [text, setText] = useState<string>()
  const [problem, setProblem] = useState('')
  const calendar = useRef<HTMLInputElement>(null)
  const save = (day: string) => {
    if (day < min) return setProblem('Choose a day after today.')
    setProblem('')
    if (day !== value) {
      onChange(day)
      toast('Exam day saved')
    }
  }
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        Exam day
      </label>
      <div className="relative mt-1 flex items-center gap-2">
        <input
          id={id}
          value={text ?? shownDay(value)}
          placeholder="e.g. 3 Jan 2027"
          autoComplete="off"
          aria-describedby={problem ? `${id}-problem` : undefined}
          onFocus={() => setText(shownDay(value))}
          onChange={(event) => {
            setText(event.target.value)
            const day = parseDay(event.target.value)
            if (day) save(day)
          }}
          onBlur={() => {
            if (text?.trim() && !parseDay(text)) setProblem('Type a day such as 3 Jan 2027, or use the calendar.')
            setText(undefined)
          }}
          className={`${input} w-44`}
        />
        <button type="button" onClick={() => calendar.current?.showPicker?.()} className={btnQuiet} aria-label="Pick on a calendar" title="Pick on a calendar">
          <Icon name="plan" size={18} />
        </button>
        {/* The browser's own calendar, opened by the button; it is never shown itself. */}
        <input
          ref={calendar}
          type="date"
          tabIndex={-1}
          aria-hidden="true"
          value={value}
          min={min}
          onChange={(event) => event.target.value && save(event.target.value)}
          className="pointer-events-none absolute size-px opacity-0"
        />
      </div>
      {problem && (
        <p id={`${id}-problem`} role="alert" className="mt-1 text-sm text-critical">
          {problem}
        </p>
      )}
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
        <ExamDayField id={inputId} value={examDate} min={addDays(now, 1)} onChange={(day) => setExamDate(course.id, day)} />
        {examDate && (
          <button
            className={btnQuiet}
            onClick={() => {
              setExamDate(course.id, '')
              toast('Exam day removed')
            }}
          >
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
  const exams = getExams(course.id)
  const mocks = planMockExams(plan, examDate, exams.length)
  const cardsDue = dueByDay(progress, 7).filter((d) => d.count > 0)

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
            {week === 0 && (
              <p className={`${note} border-t border-line py-2.5`}>
                {cardsDue.length
                  ? `Flashcards due: ${cardsDue.map((d) => `${d.day === now ? 'today' : formatDay(d.day, now)} ${d.count}`).join(', ')}.`
                  : 'No flashcards fall due in the next 7 days.'}
              </p>
            )}
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
            Due flashcards, missed questions{exams.length > 0 && ' and the mock exams below'}.
            {mocks.length < exams.length &&
              ` The review is too short for all ${exams.length} mock exams, so ${mocks.length} ${mocks.length === 1 ? 'is' : 'are'} scheduled. Take the others earlier, or choose a later exam day.`}
          </p>
        </div>
      )}
      {mocks.map(({ index, day }) => {
        const exam = exams[index]
        const attempts = progress.exams[examKey(course.id, exam.id)]?.attempts ?? []
        return (
          <div
            key={exam.id}
            className="grid gap-x-4 gap-y-0.5 border-b border-line py-2.5 sm:grid-cols-[8rem_minmax(0,1fr)_7rem]"
          >
            <span className={`text-sm tabular-nums ${day === now ? 'font-semibold text-plan' : 'text-muted'}`}>
              {day === now ? 'Today' : formatDay(day, now)}
            </span>
            <span>
              <Link to={`/${course.id}/exams`} className={link}>
                {exam.title}
              </Link>
              <span className="text-muted">
                {exam.unseen
                  ? ', in real exam mode. Its questions are new to you.'
                  : exam.mixed
                    ? ', in real exam mode. It has the question types of the real exam.'
                    : `, ${course.exam.minutes / 60} hours`}
              </span>
            </span>
            <span className={`text-sm sm:text-right ${attempts.length ? 'font-semibold text-done' : 'text-muted'}`}>
              {attempts.length ? '✓ Taken' : 'Not taken yet'}
            </span>
          </div>
        )
      })}
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
