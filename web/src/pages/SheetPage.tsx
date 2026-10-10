import { Link, useParams } from 'react-router-dom'
import { slug } from '../components/LessonContents'
import NotFound from '../components/NotFound'
import { PageHeader } from '../components/Page'
import WithSidePanel, { PanelBlock } from '../components/SidePanel'
import { SectionSources } from '../components/Sources'
import { findModule, getCourse, getSheet, loadLesson, loadSources, type Course, type SheetEntry, type SourceLink } from '../lib/content'
import { moduleNumber } from '../lib/stats'
import { btnQuiet, link, listTitle, note } from '../lib/ui'
import { useLoaded } from '../lib/useLoaded'

/** What a lesson cites under each of its section headings, and the book pages behind those references. */
interface ModuleSources {
  /** Section heading -> the text after "@source". */
  refs: Record<string, string>
  links: SourceLink[]
}

async function loadSheetSources(course: Course, moduleIds: string[]): Promise<Record<string, ModuleSources>> {
  const loaded = await Promise.all(
    moduleIds.map(async (id) => {
      const [lesson, links] = await Promise.all([loadLesson(course.id, id), loadSources(course.id, id)])
      const refs = Object.fromEntries(
        [...lesson.matchAll(/^## (.+)\r?\n\r?\n@source (.+)$/gm)].map((match) => [match[1].replace(/[*`]/g, '').trim(), match[2]]),
      )
      return [id, { refs, links }] as const
    }),
  )
  return Object.fromEntries(loaded)
}

/** Every formula and list worth knowing by heart, on one page. Each line repeats a lesson and links to it. */
export default function SheetPage() {
  const course = getCourse(useParams().courseId)
  const groups = course ? getSheet(course.id) : []
  const moduleIds = [...new Set(groups.flatMap((g) => g.entries.map((e) => e.module)))]
  const sources = useLoaded(
    (): Promise<Record<string, ModuleSources>> => (course ? loadSheetSources(course, moduleIds) : Promise.resolve({})),
  )
  if (!course || !groups.length) return <NotFound />

  const panel = (
    <PanelBlock title="On this sheet">
      <ul>
        {groups.map((group) => (
          <li key={group.title}>
            <a href={`#${slug(group.title)}`} className="press flex min-h-9 items-baseline justify-between gap-3 rounded-md px-2 py-1.5 text-[0.9375rem] leading-snug hover:bg-plan-soft hover:text-plan">
              <span>{group.title}</span>
              <span className="text-sm tabular-nums text-muted">{group.entries.length}</span>
            </a>
          </li>
        ))}
      </ul>
      <button onClick={() => window.print()} className={`${btnQuiet} mt-4 w-full`}>
        Print this sheet
      </button>
    </PanelBlock>
  )

  return (
    <WithSidePanel label="Sections" panel={<div className="print:hidden">{panel}</div>}>
      <div className="print:hidden">
        <PageHeader back={{ to: `/${course.id}`, label: `All ${course.title} modules` }} title="Formulas and key facts">
          Everything worth knowing by heart, on one page. Each line repeats what a lesson teaches and links to it;
          nothing here is new.
        </PageHeader>
        <button onClick={() => window.print()} className={`${btnQuiet} mt-5`}>
          Print this sheet
        </button>
      </div>
      <h1 className="title hidden text-2xl print:block">{course.title}: formulas and key facts</h1>

      {groups.map((group) => (
        <section key={group.title} id={slug(group.title)} className="mt-12 scroll-mt-4 print:mt-6">
          <h2 className={listTitle}>{group.title}</h2>
          {group.intro && <p className={`${note} mt-3 max-w-3xl`}>{group.intro}</p>}
          <div className="divide-y divide-line border-b border-line">
            {group.entries.map((entry) => (
              <Entry key={entry.name} course={course} entry={entry} sources={sources?.[entry.module]} />
            ))}
          </div>
        </section>
      ))}
    </WithSidePanel>
  )
}

function Entry({ course, entry, sources }: { course: Course; entry: SheetEntry; sources?: ModuleSources }) {
  const module = findModule(course, entry.module)?.module
  const refs = sources?.refs[entry.section]
  return (
    <div className="grid gap-x-8 gap-y-1 py-4 break-inside-avoid md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] print:py-2">
      <div>
        <p className="text-sm text-muted">{entry.name}</p>
        {entry.formula && <p className="mt-0.5 text-xl font-semibold leading-snug">{entry.formula}</p>}
        {entry.items && (
          <ol className="mt-1 list-decimal space-y-0.5 pl-6 text-lg leading-snug marker:text-muted">
            {entry.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
      </div>
      <div className="leading-relaxed">
        {entry.reading && <p>{entry.reading}</p>}
        {entry.example && (
          <p className="tabular-nums text-muted">
            Example from the lesson: <span className="text-ink">{entry.example}</span>
          </p>
        )}
        <p className="mt-1 text-sm print:hidden">
          <Link to={`/${course.id}/${entry.module}#${slug(entry.section)}`} className={link}>
            {moduleNumber(course, entry.module)} {module?.title}: {entry.section}
          </Link>
        </p>
        {refs && sources && (
          <div className="mt-2 print:hidden">
            <SectionSources refs={refs} sources={sources.links} />
          </div>
        )}
      </div>
    </div>
  )
}
