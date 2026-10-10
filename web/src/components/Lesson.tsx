import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { loadLesson, loadSources } from '../lib/content'
import { moduleKey, setLessonDone, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet, link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import { diagrams } from './diagrams'
import { Waiting } from './Page'
import { SectionSources } from './Sources'

export default function Lesson({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const text = useLoaded(() => loadLesson(courseId, moduleId))
  const sources = useLoaded(() => loadSources(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const done = Boolean(useProgress().lessons[key])
  if (text === undefined || sources === undefined) return <Waiting>Loading the lesson</Waiting>

  // A lesson marks the source of a section with a line "@source ref; ref" under its heading,
  // and places a drawing with a line "@diagram name". Splitting on those lines gives:
  // text, kind, value, text, kind, value, ... so each one renders in place.
  const parts = text.split(/^@(source|diagram) (.+)$/m)

  return (
    <div>
      <article className="lesson">
        {parts.map((part, i) => {
          if (i % 3 === 1) return null
          if (i % 3 === 2) {
            if (parts[i - 1] === 'source') return <SectionSources key={i} refs={part} sources={sources} />
            const Diagram = diagrams[part.trim()]
            return Diagram ? <Diagram key={i} /> : null
          }
          return (
            <Markdown
              key={i}
              remarkPlugins={[remarkGfm]}
              components={{
                // A table may be wider than the text column, and scrolls sideways on a small screen.
                table: ({ node: _node, ...props }) => (
                  <div className="wide overflow-x-auto">
                    <table {...props} />
                  </div>
                ),
              }}
            >
              {part}
            </Markdown>
          )
        })}
      </article>
      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
        {done ? (
          <>
            <span className="font-semibold text-done">✓ Lesson completed</span>
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
