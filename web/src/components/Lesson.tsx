import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { loadLesson, loadSources } from '../lib/content'
import { moduleKey, setLessonDone, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet, link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import { SectionSources } from './Sources'

export default function Lesson({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const text = useLoaded(() => loadLesson(courseId, moduleId))
  const sources = useLoaded(() => loadSources(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const done = Boolean(useProgress().lessons[key])
  if (text === undefined || sources === undefined) return <p className="text-muted">Loading the lesson</p>

  // A lesson marks the source of a section with a line "@source ref; ref" under its heading.
  // Splitting on those lines gives: text, refs, text, refs, ... so each source renders in place.
  const parts = text.split(/^@source (.+)$/m)

  return (
    <div>
      <article className="lesson">
        {parts.map((part, i) =>
          i % 2 ? (
            <SectionSources key={i} refs={part} sources={sources} />
          ) : (
            <Markdown
              key={i}
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
              {part}
            </Markdown>
          ),
        )}
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
