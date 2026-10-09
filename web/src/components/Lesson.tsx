import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { loadLesson } from '../lib/content'
import { moduleKey, setLessonDone, useProgress } from '../lib/progress'
import { useLoaded } from '../lib/useLoaded'

export default function Lesson({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const text = useLoaded(() => loadLesson(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const done = Boolean(useProgress().lessons[key])
  if (text === undefined) return <p className="text-slate-500">Loading…</p>

  return (
    <div>
      <article className="lesson rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </article>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setLessonDone(key, !done)}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            done
              ? 'border border-emerald-300 bg-emerald-50 text-emerald-800'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {done ? '✓ Lesson completed (click to undo)' : 'Mark lesson as completed'}
        </button>
        <Link to={`/${courseId}/${moduleId}/quiz`} className="text-sm text-indigo-700 hover:underline">
          Take the quiz →
        </Link>
      </div>
    </div>
  )
}
