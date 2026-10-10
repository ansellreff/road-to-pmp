import type { Course } from '../lib/content'
import type { Progress } from '../lib/progress'
import { domainCompletion, percent } from '../lib/stats'
import { domainBg, domainText } from '../lib/ui'

/**
 * The exam drawn to scale: one strip split by domain weight, each segment
 * filling from the left as that domain's modules are completed.
 */
export default function ExamBlueprint({ course, progress }: { course: Course; progress: Progress }) {
  return (
    <figure>
      <figcaption className="text-sm text-muted">
        How the {course.exam.questions} exam questions are divided. Each block fills as you complete that domain.
      </figcaption>
      <div className="mt-2 flex h-20 overflow-hidden rounded-sm border border-ink bg-surface">
        {course.domains.map((domain, i) => {
          const done = domainCompletion(course, domain, progress)
          const questions = Math.round((domain.weight / 100) * course.exam.questions)
          return (
            <a
              key={domain.id}
              href={`#${domain.id}`}
              title={`${domain.title}: ${domain.weight}% of the exam, about ${questions} questions, ${percent(done)} complete`}
              style={{ flexGrow: domain.weight, flexBasis: 0 }}
              className="group relative min-w-0 border-l border-ink first:border-l-0 hover:bg-plan-soft"
            >
              <span className="absolute inset-y-0 left-0 bg-plan-soft" style={{ width: percent(done) }} />
              <span className={`absolute inset-x-0 bottom-0 h-1.5 ${domainBg[i]}`} style={{ width: percent(done) }} />
              <span className="relative flex h-full flex-col justify-between p-2 sm:p-3">
                <span className={`title text-sm sm:text-base ${domainText[i]}`}>
                  <span className="hidden sm:inline">Domain </span>
                  {i + 1}
                </span>
                <span className="title text-xl tabular-nums sm:text-2xl">{domain.weight}%</span>
              </span>
            </a>
          )
        })}
      </div>
    </figure>
  )
}
