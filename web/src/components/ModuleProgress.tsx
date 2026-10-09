import type { ReactNode } from 'react'
import { clearCards, clearQuiz, moduleKey, setLessonDone, useProgress } from '../lib/progress'

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' })

/** Shows what is saved for one module and lets the learner undo any of it. */
export default function ModuleProgress({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const key = moduleKey(courseId, moduleId)
  const progress = useProgress()
  const lessonDate = progress.lessons[key]
  const quiz = progress.quizzes[key]
  const known = Object.values(progress.cards[key] ?? {}).filter((s) => s === 'know').length
  const rated = Object.keys(progress.cards[key] ?? {}).length
  const deckSize = progress.cardTotals[key]

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold text-slate-900">Your progress in this module</h2>
      <p className="mt-1 text-sm text-slate-500">
        Saved automatically in this browser. You can change or remove any mark at any time.
      </p>
      <dl className="mt-3 divide-y divide-slate-100 text-sm">
        <Row
          label="Lesson"
          value={lessonDate ? `Completed on ${formatDate(lessonDate)}` : 'Not completed'}
          action={lessonDate ? 'Remove completed mark' : 'Mark as completed'}
          onAction={() => setLessonDone(key, !lessonDate)}
        />
        <Row
          label="Quiz"
          value={
            quiz
              ? `Best ${quiz.best}/${quiz.total}, last ${quiz.last}/${quiz.total}, ${quiz.attempts} attempt${quiz.attempts === 1 ? '' : 's'}`
              : 'Not taken yet'
          }
          action={quiz ? 'Clear quiz score' : undefined}
          onAction={() => clearQuiz(key)}
        />
        <Row
          label="Flashcards"
          value={rated ? `${known} of ${deckSize ?? rated} marked as known` : 'Not started'}
          action={rated ? 'Reset all cards' : undefined}
          onAction={() => clearCards(key)}
        />
      </dl>
    </section>
  )
}

function Row(props: { label: string; value: ReactNode; action?: string; onAction: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
      <div>
        <dt className="inline font-medium text-slate-800">{props.label}: </dt>
        <dd className="inline text-slate-600">{props.value}</dd>
      </div>
      {props.action && (
        <button
          onClick={props.onAction}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs hover:bg-slate-100"
        >
          {props.action}
        </button>
      )}
    </div>
  )
}
