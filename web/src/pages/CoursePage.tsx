import { Link, useParams } from 'react-router-dom'
import ExamBlueprint from '../components/ExamBlueprint'
import Milestone from '../components/Milestone'
import NotFound from '../components/NotFound'
import NotOnExamNote, { ExamStar } from '../components/NotOnExam'
import { getCourse } from '../lib/content'
import { moduleCompletion, moduleKey, useProgress } from '../lib/progress'
import { percent } from '../lib/stats'
import { PageHeader } from '../components/Page'
import { link, sectionTitle } from '../lib/ui'

function status(value: number): string {
  if (value >= 1) return 'Complete'
  if (value > 0) return `${percent(value)} done`
  return 'Not started'
}

export default function CoursePage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  const progress = useProgress()
  if (!course) return <NotFound />

  return (
    <div>
      <PageHeader back={{ to: '/', label: 'Your certification path' }} title={course.title}>
        {course.subtitle}. {course.exam.questions} questions in {course.exam.minutes} minutes.{' '}
        <Link to={`/${course.id}/exams`} className={link}>
          Mock exams
        </Link>
      </PageHeader>
      <div className="mt-8">
        <ExamBlueprint course={course} progress={progress} />
      </div>

      <div className="mt-12 space-y-12">
        {course.domains.map((domain, i) => (
          <section key={domain.id} id={domain.id} className="scroll-mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-2">
              <h2 className={sectionTitle}>
                Domain {i + 1}: {domain.title}
              </h2>
              <p className="text-sm text-muted">
                {domain.weight}% of the exam, about {Math.round((domain.weight / 100) * course.exam.questions)} questions
              </p>
            </div>
            <ol>
              {domain.modules.map((m, j) => {
                const value = m.ready ? moduleCompletion(progress, moduleKey(course.id, m.id)) : 0
                return (
                  <li
                    key={m.id}
                    className="relative grid min-h-12 grid-cols-[1.5rem_2.75rem_1fr] items-center gap-x-2 border-b border-line py-3 before:absolute before:top-0 before:bottom-0 before:left-[8.5px] before:w-px before:bg-line first:before:top-1/2 last:before:bottom-1/2 sm:grid-cols-[1.5rem_2.75rem_1fr_auto]"
                  >
                    <span className="relative">
                      <Milestone value={value} planned={!m.ready} />
                    </span>
                    <span className="tabular-nums text-muted">
                      {i + 1}.{j + 1}
                    </span>
                    <span>
                      {m.ready ? (
                        <Link
                          to={`/${course.id}/${m.id}`}
                          className="press font-semibold underline-offset-4 hover:text-plan hover:underline"
                        >
                          {m.title}
                        </Link>
                      ) : (
                        <span className="text-muted">{m.title}</span>
                      )}
                      {m.supplementary && (
                        <>
                          {' '}
                          <ExamStar />
                        </>
                      )}
                    </span>
                    <span
                      className={`col-start-3 text-sm sm:col-start-4 ${value >= 1 ? 'font-semibold text-done' : 'text-muted'}`}
                    >
                      {m.ready ? status(value) : 'Not written yet'}
                    </span>
                  </li>
                )
              })}
            </ol>
            {domain.modules.some((m) => m.supplementary) && <NotOnExamNote className="mt-3 text-sm" />}
          </section>
        ))}
      </div>
    </div>
  )
}
