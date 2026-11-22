import { useEffect, useMemo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import release from 'virtual:release'
import guide from '../content/guide.md?raw'
import Icon, { type IconName } from '../components/Icon'
import { proseComponents } from '../components/Lesson'
import SectionList, { lessonHeadings, scrollToSection, useCurrentSection } from '../components/LessonContents'
import NotFound from '../components/NotFound'
import { PageHeader } from '../components/Page'
import WithSidePanel, { PanelBlock } from '../components/SidePanel'
import { note } from '../lib/ui'

const tabs: { id: string; to: string; label: string; icon: IconName }[] = [
  { id: 'guide', to: '/help', label: 'Guide', icon: 'lesson' },
  { id: 'whats-new', to: '/help/whats-new', label: "What's new", icon: 'flag' },
]

/** The user guide and the version log, both kept as text files in the project. */
export default function HelpPage() {
  const { tab = 'guide' } = useParams()
  if (!tabs.some((t) => t.id === tab)) return <NotFound />
  return (
    <div>
      <PageHeader title="Help">How each part of Road to PMP works, and what changed in each version.</PageHeader>
      {/* Page links styled as tabs: each has its own address, so it is marked as the current page, not as a tab. */}
      <nav className="mt-6 flex gap-7 overflow-x-auto border-b border-ink" aria-label="Help sections">
        {tabs.map((t) => (
          <NavLink
            key={t.id}
            to={t.to}
            end
            className={({ isActive }) =>
              `title press flex min-h-11 items-center gap-2 border-b-4 pt-2 pb-2 text-lg ${
                isActive ? 'border-plan' : 'border-transparent font-medium text-muted hover:text-ink'
              }`
            }
          >
            <Icon name={t.icon} />
            {t.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8">{tab === 'guide' ? <Guide /> : <WhatsNew />}</div>
    </div>
  )
}

function Guide() {
  // The first line of the guide says which version it describes.
  const [stamp, ...rest] = guide.split(/\r?\n/)
  const body = rest.join('\n')
  const headings = useMemo(() => lessonHeadings(body), [body])
  const current = useCurrentSection(headings)
  const { hash } = useLocation()
  // A link such as /help#mock-exams opens the guide at that part.
  useEffect(() => {
    if (hash) scrollToSection(decodeURIComponent(hash.slice(1)))
  }, [hash])

  return (
    <WithSidePanel
      label="Contents"
      panel={
        <PanelBlock title="In this guide">
          <SectionList headings={headings} current={current} />
        </PanelBlock>
      }
    >
      <p className={note}>{stamp}</p>
      <article className="lesson">
        <Markdown remarkPlugins={[remarkGfm]} components={proseComponents}>
          {body}
        </Markdown>
      </article>
    </WithSidePanel>
  )
}

function WhatsNew() {
  // The log's own title is left out: the page already has one.
  const entries = release.changelog.replace(/^# .*\r?\n/, '')
  return (
    <div className="max-w-3xl">
      <p className={note}>
        You are using version {release.version} of {release.date}, build {release.commit}.
      </p>
      <article className="lesson">
        <Markdown remarkPlugins={[remarkGfm]} components={proseComponents}>
          {entries}
        </Markdown>
      </article>
    </div>
  )
}
