import { Link, useParams } from 'react-router-dom'
import NotFound from '../components/NotFound'
import ProgressBar from '../components/ProgressBar'
import { getCourse } from '../lib/content'
import { moduleCompletion, moduleKey, useProgress } from '../lib/progress'
import { courseCompletion } from './Home'

export default function CoursePage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  const progress = useProgress()
  if (!course) return <NotFound />

  return (
    <div>
      <Link to="/" className="text-sm text-indigo-700 hover:underline">
        ← All certifications
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">{course.title}</h1>
      <p className="text-slate-500">{course.subtitle}</p>
      <ProgressBar value={courseCompletion(course, progress)} className="mt-4 max-w-md" />

      <div className="mt-8 space-y-8">
        {course.domains.map((domain, i) => (
          <section key={domain.id}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Domain {i + 1}: {domain.title}
              </h2>
              <span className="shrink-0 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                {domain.weight}% of exam
              </span>
            </div>
            <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {domain.modules.map((m, j) => {
                const label = `${i + 1}.${j + 1}  ${m.title}`
                if (!m.ready) {
                  return (
                    <li key={m.id} className="flex items-center justify-between gap-4 px-4 py-3 text-slate-400">
                      <span>{label}</span>
                      <span className="shrink-0 text-xs">Coming soon</span>
                    </li>
                  )
                }
                return (
                  <li key={m.id}>
                    <Link
                      to={`/${course.id}/${m.id}`}
                      className="flex flex-col gap-2 px-4 py-3 hover:bg-indigo-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="font-medium text-slate-800">{label}</span>
                      <ProgressBar
                        value={moduleCompletion(progress, moduleKey(course.id, m.id))}
                        className="sm:w-40 sm:shrink-0"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
