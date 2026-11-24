import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Backup from '../components/Backup'
import MessageDialog from '../components/MessageDialog'
import { Meter, PageHeader } from '../components/Page'
import PassedButton from '../components/PassedButton'
import { openAccount } from '../lib/account'
import { onThisPc } from '../lib/bookCache'
import { bookError } from '../lib/books'
import { ALL_BOOKS_MB, megabytes, removeBooks, saveBook, savedBooks, useBookChanges, type Progress } from '../lib/bookStore'
import { books, courses } from '../lib/content'
import { formatDate } from '../lib/plan'
import { setTextSize, setTheme, usePrefs, type TextSize, type Theme } from '../lib/prefs'
import { useProgress } from '../lib/progress'
import { useSync } from '../lib/sync'
import { toast } from '../lib/toast'
import { btnDanger, btnPrimary, btnQuiet, link, note, section, subTitle } from '../lib/ui'

// Every setting of the app in one place: display, account, books on this device, backups, passed
// certifications and exam days. The top bar keeps quick controls for the theme, text size and account.

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={section} aria-label={title}>
      <h2 className={subTitle}>{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

/** A row of buttons of which one is chosen. */
function Choice<T extends string>(props: { label: string; options: { value: T; label: string }[]; value: T; onChange: (value: T) => void }) {
  const { label, options, value, onChange } = props
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="w-24 font-medium">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`${btnQuiet} ${value === option.value ? 'border-plan bg-plan-soft text-plan' : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Display() {
  const { theme, textSize } = usePrefs()
  return (
    <div className="space-y-3">
      <Choice<Theme>
        label="Theme"
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
      />
      <Choice<TextSize>
        label="Text size"
        value={textSize}
        onChange={setTextSize}
        options={[
          { value: 'normal', label: 'Normal' },
          { value: 'large', label: 'Large' },
          { value: 'larger', label: 'Larger' },
        ]}
      />
      <p className={note}>Kept in this browser. The same controls are at the top right of every page.</p>
    </div>
  )
}

function Account() {
  const sync = useSync()
  return sync.email ? (
    <>
      <p>
        Signed in as <strong>{sync.email}</strong>. Your progress syncs between your devices.
      </p>
      <button type="button" onClick={openAccount} className={`${btnQuiet} mt-3`}>
        Open your account
      </button>
    </>
  ) : (
    <>
      <p>Not signed in. Sign in to sync your progress between devices and to open the books on the website.</p>
      <button type="button" onClick={openAccount} className={`${btnPrimary} mt-3`}>
        Sign in
      </button>
    </>
  )
}

/** The books saved on this device, each with a tick box, and a button that removes the ticked ones. */
function SavedList({ saved, onRemoved }: { saved: Record<string, number>; onRemoved: (text: string) => void }) {
  const [chosen, setChosen] = useState<string[]>([])
  const [asking, setAsking] = useState(false)
  const list = Object.keys(books).filter((book) => book in saved)
  // A book removed elsewhere (or by signing out) drops out of the choice too.
  const ticked = chosen.filter((book) => list.includes(book))
  if (list.length === 0) return null
  const all = ticked.length === list.length
  const toggle = (book: string) => setChosen(ticked.includes(book) ? ticked.filter((b) => b !== book) : [...ticked, book])
  const names = ticked.map((book) => books[book].title)

  return (
    <fieldset className="mt-5">
      <legend className="font-medium">The saved books: tick the ones to remove</legend>
      <ul className="mt-2">
        {list.map((book) => (
          <li key={book}>
            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input type="checkbox" checked={ticked.includes(book)} onChange={() => toggle(book)} className="h-5 w-5 shrink-0 accent-plan" />
              <span>
                {books[book].title} <span className="text-muted">({megabytes(saved[book])} MB)</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setChosen(all ? [] : list)} className={btnQuiet}>
          {all ? 'Untick all' : 'Tick all'}
        </button>
        <button type="button" onClick={() => setAsking(true)} disabled={ticked.length === 0} className={btnDanger}>
          {ticked.length ? `Remove the ${ticked.length === 1 ? 'ticked book' : `${ticked.length} ticked books`}` : 'Remove the ticked books'}
        </button>
      </div>
      {asking && (
        <MessageDialog
          title={ticked.length === 1 ? 'Remove this book from this device?' : `Remove ${ticked.length} books from this device?`}
          onClose={() => setAsking(false)}
          action={
            <button
              type="button"
              className={btnDanger}
              onClick={async () => {
                setAsking(false)
                await removeBooks(ticked)
                setChosen([])
                onRemoved(
                  `Removed from this device: ${names.join(', ')}. ${ticked.length === 1 ? 'It is' : 'They are'} still online, and saved again when opened.`,
                )
              }}
            >
              {ticked.length === 1 ? 'Remove the book' : 'Remove the books'}
            </button>
          }
        >
          {names.join(', ')}. Removed from this device only: your progress stays, and the online copies too.
        </MessageDialog>
      )}
    </fieldset>
  )
}

interface Saving {
  index: number
  count: number
  title: string
  progress: Progress
}

function Books() {
  const sync = useSync()
  const changes = useBookChanges()
  const [saved, setSaved] = useState<Record<string, number> | null>(null)
  const [saving, setSaving] = useState<Saving | null>(null)
  const [message, setMessage] = useState('')
  const stop = useRef<AbortController | null>(null)

  useEffect(() => {
    let cancelled = false
    savedBooks()
      .then((found) => !cancelled && setSaved(found))
      .catch(() => !cancelled && setSaved({}))
    return () => {
      cancelled = true
    }
  }, [changes, sync.email])
  // Leaving the page stops a download in progress; the books saved so far stay.
  useEffect(() => () => stop.current?.abort(), [])

  if (onThisPc) {
    return (
      <>
        <p>On this PC every book opens straight from your PMI Learning Material folder, so there is nothing to save.</p>
        {saved && <SavedList saved={saved} onRemoved={setMessage} />}
        {message && <p className="mt-3 text-sm">{message}</p>}
      </>
    )
  }
  if (!sync.email) {
    return (
      <>
        <p>The books are for signed-in accounts. Sign in first, then you can save them on this device.</p>
        <button type="button" onClick={openAccount} className={`${btnPrimary} mt-3`}>
          Sign in
        </button>
      </>
    )
  }

  const all = Object.keys(books)
  const done = saved ? all.filter((book) => book in saved) : []
  const missing = all.filter((book) => !done.includes(book))
  const bytes = done.reduce((sum, book) => sum + (saved?.[book] ?? 0), 0)

  async function saveAll() {
    const controller = new AbortController()
    stop.current = controller
    setMessage('')
    try {
      for (const [index, book] of missing.entries()) {
        const title = books[book].title
        setSaving({ index: index + 1, count: missing.length, title, progress: { received: 0, total: 0 } })
        await saveBook(book, (progress) => setSaving({ index: index + 1, count: missing.length, title, progress }), controller.signal)
      }
      setMessage('Every book is saved on this device. They now open at once.')
      toast('All books saved on this device')
    } catch (error) {
      if (controller.signal.aborted) setMessage('Stopped. The books saved so far stay on this device.')
      else setMessage(bookError((error as Error).message))
    } finally {
      stop.current = null
      setSaving(null)
    }
  }

  return (
    <>
      <p>
        A book you open is saved on this device the first time, so it opens at once after that. You can also save every book
        in one go, for example before a trip.
      </p>
      <p className="mt-3 font-medium" role="status">
        {saved === null
          ? 'Looking for saved books…'
          : `${done.length} of ${all.length} books saved on this device${done.length ? ` (${megabytes(bytes)} MB)` : ''}.`}
      </p>
      {saving ? (
        <div className="mt-3 max-w-xl" role="status">
          <p>
            Saving book {saving.index} of {saving.count}: {saving.title}, {megabytes(saving.progress.received)}
            {saving.progress.total ? ` of ${megabytes(saving.progress.total)}` : ''} MB.
          </p>
          {saving.progress.total > 0 && <Meter value={saving.progress.received / saving.progress.total} className="mt-2 h-2.5" />}
          <button type="button" onClick={() => stop.current?.abort()} className={`${btnQuiet} mt-3`}>
            Stop saving
          </button>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={saveAll} disabled={saved === null || missing.length === 0} className={btnPrimary}>
            {missing.length === all.length ? 'Save all books on this device' : 'Save the other books on this device'}
          </button>
        </div>
      )}
      {message && <p className="mt-3 text-sm">{message}</p>}
      <p className={`${note} mt-3 max-w-2xl`}>
        All {all.length} books together are about {ALL_BOOKS_MB} MB. Each book saved counts once towards the month's 4 GB of
        book downloads, which keeps the project in Supabase's free plan. Signing out removes the saved books.
      </p>
      {saved && !saving && <SavedList saved={saved} onRemoved={setMessage} />}
    </>
  )
}

function Certifications() {
  const progress = useProgress()
  return (
    <>
      <p className={`${note} max-w-2xl`}>
        A certification marked as passed leaves the home page, the study plan and the dashboard. Its progress stays. Nothing
        is marked unless you press the button.
      </p>
      <ul className="mt-3 space-y-3">
        {courses.map((course) => {
          const passed = progress.passed?.[course.id]
          const exam = progress.examDates[course.id]
          return (
            <li key={course.id} className="card flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className={note}>
                  {passed ? `Marked as passed on ${formatDate(new Date(`${passed}T00:00`))}` : 'Studying'}
                  {' · '}
                  {exam ? `Exam day ${formatDate(new Date(`${exam}T00:00`))}` : 'No exam day set'}
                </p>
              </div>
              <PassedButton course={course} passed={Boolean(passed)} />
            </li>
          )
        })}
      </ul>
      <p className={`${note} mt-3`}>
        The exam day is set in the{' '}
        <Link to="/plan" className={link}>
          study plan
        </Link>
        .
      </p>
    </>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <PageHeader title="Settings">Everything you can set up in Road to PMP, in one place.</PageHeader>
      <Part title="Display">
        <Display />
      </Part>
      <Part title="Account and sync">
        <Account />
      </Part>
      <Part title="Books on this device">
        <Books />
      </Part>
      <Part title="Your saved progress">
        <Backup />
      </Part>
      <Part title="Certifications and exam days">
        <Certifications />
      </Part>
    </div>
  )
}
