import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { certifications, courses, getExams, type Course } from '../lib/content'
import { examKey } from '../lib/exam'
import { setCourseId, usePrefs } from '../lib/prefs'
import { dueCount, moduleCompletion, moduleKey, useProgress, type Progress } from '../lib/progress'
import { courseCompletion, courseMissed, domainCompletion, percent } from '../lib/stats'
import Icon, { type IconName } from './Icon'
import Milestone from './Milestone'

const item = 'press flex items-center gap-1.5 whitespace-nowrap border-b-2 py-2.5 font-medium hover:border-ink'
const itemStyle = (current: boolean) => `${item} ${current ? 'border-plan text-plan' : 'border-transparent'}`

/** The certification the menus work for: the one in the address, else the one opened last. */
function useCurrentCourse(): Course {
  const { pathname } = useLocation()
  const { courseId } = usePrefs()
  const inAddress = courses.find((c) => c.id === pathname.split('/')[1])
  useEffect(() => {
    if (inAddress) setCourseId(inAddress.id)
  }, [inAddress])
  return inAddress ?? courses.find((c) => c.id === courseId) ?? courses[0]
}

/** The row of page links under the site name. Modules and Practice open a panel. */
export default function TopMenu() {
  const progress = useProgress()
  const course = useCurrentCourse()
  const { pathname } = useLocation()
  const [open, setOpen] = useState<'modules' | 'practice' | null>(null)
  const nav = useRef<HTMLElement>(null)

  // A panel closes when you go somewhere, press Escape, or click outside it.
  useEffect(() => setOpen(null), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(null)
    const outside = (event: MouseEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', outside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', outside)
    }
  }, [open])

  const inModules = courses.some((c) => pathname === `/${c.id}` || (pathname.startsWith(`/${c.id}/`) && !/\/(exams|sheet)/.test(pathname)))
  const inPractice = /\/exams|^\/practice|^\/review/.test(pathname)
  const toggle = (menu: 'modules' | 'practice') => setOpen(open === menu ? null : menu)

  return (
    <nav ref={nav} aria-label="Pages" className="relative w-full">
      <div className="-mx-4 flex gap-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <MenuButton label="Modules" icon="modules" open={open === 'modules'} current={inModules} onClick={() => toggle('modules')} />
        <MenuButton label="Practice" icon="practice" open={open === 'practice'} current={inPractice} onClick={() => toggle('practice')} />
        <PageLink to="/plan" icon="plan" label="Study plan" />
        <PageLink to="/dashboard" icon="dashboard" label="Dashboard" />
        <PageLink to={`/${course.id}/sheet`} icon="formula" label="Formulas" />
      </div>
      {open === 'modules' && <ModulesPanel course={course} progress={progress} />}
      {open === 'practice' && <PracticePanel course={course} progress={progress} />}
    </nav>
  )
}

function PageLink({ to, icon, label }: { to: string; icon: IconName; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => itemStyle(isActive)}>
      <Icon name={icon} size={18} />
      {label}
    </NavLink>
  )
}

function MenuButton(props: { label: string; icon: IconName; open: boolean; current: boolean; onClick: () => void }) {
  return (
    <button onClick={props.onClick} aria-expanded={props.open} className={itemStyle(props.current || props.open)}>
      <Icon name={props.icon} size={18} />
      {props.label}
      <Icon name="down" size={16} className={`transition-transform ${props.open ? 'rotate-180' : ''}`} />
    </button>
  )
}

function Panel({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div
      role="region"
      aria-label={label}
      className={`absolute top-full left-0 z-30 mt-px max-h-[75vh] overflow-y-auto rounded-b-lg border border-t-0 border-edge bg-surface shadow-[var(--shadow-raised)] ${
        wide ? 'right-0' : 'right-0 sm:right-auto sm:min-w-80'
      }`}
    >
      {children}
    </div>
  )
}

/** Every module of the open certification, one click away, with the other certifications beside it. */
function ModulesPanel({ course, progress }: { course: Course; progress: Progress }) {
  return (
    <Panel label="Learning modules" wide>
      <div className="grid md:grid-cols-[13rem_minmax(0,1fr)]">
        <ul className="border-b border-line p-3 md:border-r md:border-b-0">
          {certifications.map((cert) => {
            const live = courses.find((c) => c.id === cert.id)
            const row = 'flex min-h-11 items-center gap-2.5 rounded-md px-3 py-2'
            return (
              <li key={cert.id}>
                {live ? (
                  <Link
                    to={`/${live.id}`}
                    aria-current={live.id === course.id ? 'true' : undefined}
                    className={`press ${row} hover:bg-plan-soft ${live.id === course.id ? 'bg-plan-soft font-semibold text-plan' : ''}`}
                  >
                    <Milestone value={courseCompletion(live, progress)} />
                    <span className="flex-1">{cert.name}</span>
                    <span className="text-sm font-normal text-muted">{percent(courseCompletion(live, progress))}</span>
                  </Link>
                ) : (
                  <span className={`${row} text-muted`}>
                    <Milestone value={0} planned />
                    <span className="flex-1">{cert.name}</span>
                    <span className="text-sm">Planned</span>
                  </span>
                )}
              </li>
            )
          })}
        </ul>
        <div className="p-4">
          <Link to={`/${course.id}`} className="press font-semibold text-plan underline-offset-4 hover:underline">
            All {course.title} modules
          </Link>
          <div className="mt-3 grid gap-x-8 gap-y-5 lg:grid-cols-2">
            {course.domains.map((domain, d) => (
              <section key={domain.id}>
                <h3 className="flex items-baseline justify-between gap-3 border-b border-line pb-1.5 text-sm font-semibold">
                  <span>
                    Domain {d + 1}: {domain.title}
                  </span>
                  <span className="shrink-0 font-normal text-muted">{percent(domainCompletion(course, domain, progress))}</span>
                </h3>
                <ol className="mt-1">
                  {domain.modules.map((m, j) =>
                    m.ready ? (
                      <li key={m.id}>
                        <Link to={`/${course.id}/${m.id}`} className="press flex min-h-9 items-center gap-2 rounded-md px-1.5 py-1 text-[0.9375rem] leading-snug hover:bg-plan-soft hover:text-plan">
                          <Milestone value={moduleCompletion(progress, moduleKey(course.id, m.id))} size={14} />
                          <span className="w-7 shrink-0 tabular-nums text-muted">
                            {d + 1}.{j + 1}
                          </span>
                          <span>{m.title}</span>
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

/** The three ways to practise, each with how much is waiting. */
function PracticePanel({ course, progress }: { course: Course; progress: Progress }) {
  const exams = getExams(course.id)
  const taken = exams.filter((exam) => progress.exams[examKey(course.id, exam.id)]?.attempts.length).length
  const missed = courseMissed(course, progress)
  const due = dueCount(progress)
  const rows: { to: string; icon: IconName; label: string; note: string }[] = [
    { to: `/${course.id}/exams`, icon: 'exam', label: `${course.title} mock exams`, note: `${taken} of ${exams.length} taken` },
    { to: '/practice', icon: 'practice', label: 'Practice missed questions', note: missed ? `${missed} to practice` : 'None waiting' },
    { to: '/review', icon: 'cards', label: 'Review flashcards', note: due ? `${due} due today` : 'None due today' },
  ]
  return (
    <Panel label="Practice">
      <ul className="p-2">
        {rows.map((row) => (
          <li key={row.to}>
            <NavLink
              to={row.to}
              className={({ isActive }) =>
                `press flex min-h-12 items-center gap-3 rounded-md px-3 py-2 hover:bg-plan-soft ${isActive ? 'bg-plan-soft text-plan' : ''}`
              }
            >
              <Icon name={row.icon} />
              <span className="flex-1 font-medium">{row.label}</span>
              <span className="text-sm text-muted">{row.note}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
