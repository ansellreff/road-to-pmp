import { isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useLocation } from 'react-router-dom'
import { loadLesson, loadSources } from '../lib/content'
import { moduleKey, setLessonDone, setReading, useProgress } from '../lib/progress'
import { btnPrimary, btnQuiet, link } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'
import { diagrams } from './diagrams'
import LessonContents, { lessonHeadings, scrollToSection, slug, useCurrentSection } from './LessonContents'
import { Waiting } from './Page'
import { SectionSources } from './Sources'

/** The plain text inside a rendered heading, to build its address. */
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ''
}

export default function Lesson({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const text = useLoaded(() => loadLesson(courseId, moduleId))
  const sources = useLoaded(() => loadSources(courseId, moduleId))
  const key = moduleKey(courseId, moduleId)
  const progress = useProgress()
  const done = Boolean(progress.lessons[key])
  const { hash } = useLocation()

  const headings = useMemo(() => lessonHeadings(sources === undefined ? '' : (text ?? '')), [text, sources])
  const current = useCurrentSection(headings)
  // Where the learner stopped last time, as it was when this page opened.
  const [resumeAt] = useState(() => progress.reading[key])
  const resume = headings.findIndex((h) => h.id === resumeAt) > 0 ? headings.find((h) => h.id === resumeAt) : undefined

  // A link such as /capm/2-07-earned-value#formulas opens the lesson at that section.
  // The lesson is on the page only once both its text and its sources have loaded.
  const ready = text !== undefined && sources !== undefined
  useEffect(() => {
    if (ready && hash) scrollToSection(decodeURIComponent(hash.slice(1)))
  }, [ready, hash])

  useEffect(() => {
    if (current) setReading(key, current)
  }, [key, current])

  if (text === undefined || sources === undefined) return <Waiting>Loading the lesson</Waiting>

  // A lesson marks the source of a section with a line "@source ref; ref" under its heading,
  // and places a drawing with a line "@diagram name". Splitting on those lines gives:
  // text, kind, value, text, kind, value, ... so each one renders in place.
  const parts = text.split(/^@(source|diagram) (.+)$/m)

  return (
    <div className="relative">
      <LessonContents headings={headings} current={current} />
      {resume && resume.id !== current && (
        <p className="mb-6 text-sm">
          <span className="text-muted">You stopped here last time. </span>
          <a
            href={`#${resume.id}`}
            className={link}
            onClick={(event) => {
              event.preventDefault()
              scrollToSection(resume.id)
            }}
          >
            Continue from: {resume.title}
          </a>
        </p>
      )}
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
                // Each heading gets an address, for the list of sections and for search results.
                h2: ({ node: _node, children, ...props }) => (
                  <h2 id={slug(textOf(children))} {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ node: _node, children, ...props }) => (
                  <h3 id={slug(textOf(children))} {...props}>
                    {children}
                  </h3>
                ),
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
