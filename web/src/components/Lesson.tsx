import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { loadLesson } from '../lib/content'
import { moduleKey, setLessonDone, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet, link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

export default function Lesson({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const text = useLoaded(() => loadLesson(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const done = Boolean(useProgress().lessons[key])
  if (text === undefined) return <p className="text-muted">Loading the lesson</p>

  return (
    <div>
      <article className="lesson">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            // wide tables scroll sideways on small screens instead of breaking the page
            table: ({ node: _node, ...props }) => (
              <div className="overflow-x-auto">
                <table {...props} />
              </div>
            ),
          }}
        >
          {text}
        </Markdown>
      </article>
      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
        {done ? (
          <>
            <span className="font-semibold text-done">Lesson completed</span>
            <button onClick={() => setLessonDone(key, false)} className={btnQuiet}>
              Remove completed mark
            </button>
          </>
        ) : (
          <button onClick={() => setLessonDone(key, true)} className={btnPrimary}>
            Mark lesson as completed
          </button>
        )}
        <Link to={`/${courseId}/${moduleId}/quiz`} className={link}>
          Take the quiz
        </Link>
      </div>
    </div>
  )
}
