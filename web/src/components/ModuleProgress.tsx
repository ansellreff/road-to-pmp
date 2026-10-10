import { clearCards, clearQuiz, knownCount, moduleKey, setLessonDone, useProgress } from '../lib/progress'
import { btnQuiet, column, note, section, subTitle } from '../lib/ui'

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' })

/** Shows what is saved for one module and lets the learner undo any of it. */
export default function ModuleProgress({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const key = moduleKey(courseId, moduleId)
  const progress = useProgress()
  const lessonDate = progress.lessons[key]
  const quiz = progress.quizzes[key]
  const known = knownCount(progress, key)
  const rated = Object.keys(progress.cards[key] ?? {}).length
  const deckSize = progress.cardTotals[key]

  return (
    <section className={`${section} ${column} mt-16`}>
      <h2 className={subTitle}>Your progress in this module</h2>
      <p className={`${note} mt-1`}>Saved in this browser as you go. You can undo any of it here.</p>
      <dl className="mt-3">
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
              ? `Best ${quiz.best} of ${quiz.total}, last ${quiz.last} of ${quiz.total}, ${quiz.attempts} ${quiz.attempts === 1 ? 'attempt' : 'attempts'}`
              : 'Not taken'
          }
          action={quiz ? 'Clear quiz score' : undefined}
          onAction={() => clearQuiz(key)}
        />
        <Row
          label="Flashcards"
          value={rated ? `${known} of ${deckSize ?? rated} known` : 'Not started'}
          action={rated ? 'Reset flashcards' : undefined}
          onAction={() => clearCards(key)}
        />
      </dl>
    </section>
  )
}

function Row(props: { label: string; value: string; action?: string; onAction: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3">
      <div>
        <dt className="inline font-semibold">{props.label}: </dt>
        <dd className="inline text-muted">{props.value}</dd>
      </div>
      {props.action && (
        <button onClick={props.onAction} className={btnQuiet}>
          {props.action}
        </button>
      )}
    </div>
  )
}
