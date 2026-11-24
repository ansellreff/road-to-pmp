import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import type { PDFDocumentProxy, RenderTask, TextLayer } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import NotFound from '../components/NotFound'
import Icon from '../components/Icon'
import { Meter, PageHeader, Waiting } from '../components/Page'
import { openAccount } from '../lib/account'
import { onThisPc } from '../lib/bookCache'
import { bookError, WARN_BYTES } from '../lib/books'
import { megabytes, saveBook, savedBook, type Progress } from '../lib/bookStore'
import { books } from '../lib/content'
import { useSync } from '../lib/sync'
import { btnPrimary, btnQuiet, input, link, note } from '../lib/ui'
import './reader.css'

// The book reader: a page of the app that draws a PDF itself (with PDF.js), opened at the page a
// source points to. It works the same in every browser and on phones, which often download a PDF
// instead of showing it. On this PC the book comes from your PMI Learning Material folder (through
// the local server); on the website from your private online copy (lib/books.ts), once signed in.
//
// Words can be selected and copied, and found with "Search in this book". The last page read in each
// book is remembered in this browser, for the next time the book is opened without a page.

const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3]
const FIT = 2
/** Pages this far outside the screen are drawn in advance, and dropped again when further away. */
const NEAR = '1500px 0px'
const LAST_PAGES = 'road-to-pmi-reader-pages'
/** The reader's buttons: square on a phone, so the controls fit on one row. */
const tool = `${btnQuiet} max-sm:min-w-11 max-sm:px-0`

type Loading = { state: 'loading'; saving?: Progress } |{ state: 'error'; text: string; signIn?: boolean } | { state: 'ready'; doc: PDFDocumentProxy; month?: string }

function lastPages(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(LAST_PAGES) ?? '{}')
  } catch {
    return {}
  }
}

function rememberPage(book: string, page: number) {
  try {
    localStorage.setItem(LAST_PAGES, JSON.stringify({ ...lastPages(), [book]: page }))
  } catch {
    // remembered for this visit only
  }
}

export default function ReaderPage() {
  const { book = '' } = useParams()
  const [params] = useSearchParams()
  const sync = useSync()
  const info = books[book]
  // The page from the source link; without one, the last page read in this book.
  const asked = Math.floor(Number(params.get('page')))
  const source = asked >= 1 ? asked : undefined
  const start = source ?? lastPages()[book] ?? 1
  const [load, setLoad] = useState<Loading>({ state: 'loading' })
  const signedIn = Boolean(sync.email)

  useEffect(() => {
    if (!info) return
    if (!onThisPc && !signedIn) {
      setLoad({ state: 'error', signIn: true, text: 'You must sign in first to open the books. Press Sign in, here or at the top right.' })
      return
    }
    let cancelled = false
    let doc: PDFDocumentProxy | undefined
    setLoad({ state: 'loading' })
    void (async () => {
      try {
        let month: string | undefined
        let data: ArrayBuffer | undefined
        if (!onThisPc) {
          // The copy saved on this device; the first time, the whole book is fetched once and saved.
          data = await savedBook(book)
          if (!data) {
            const saved = await saveBook(book, (saving) => {
              if (!cancelled) setLoad({ state: 'loading', saving })
            })
            data = saved.data
            if (saved.used !== undefined && saved.cap !== undefined && saved.used > WARN_BYTES) {
              month = `Book downloads this month: ${(saved.used / 1e9).toFixed(1)} of ${(saved.cap / 1e9).toFixed(1)} GB.`
            }
          }
        }
        if (cancelled) return
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
        // On your PC only the parts of the file that are needed are read.
        doc = await pdfjs.getDocument(data ? { data } : { url: `/books/${book}.pdf`, disableAutoFetch: true }).promise
        if (cancelled) void doc.destroy()
        else setLoad({ state: 'ready', doc, month })
      } catch (error) {
        if (!cancelled) setLoad({ state: 'error', text: bookError((error as Error).message) })
      }
    })()
    return () => {
      cancelled = true
      void doc?.destroy()
    }
  }, [book, info, signedIn])

  if (!info) return <NotFound />
  return (
    <div>
      <PageHeader eyebrow="Book reader" title={info.title} long>
        <p className={`${note} mt-2`}>
          {source ? `Opened at PDF page ${source}` : `Opened at PDF page ${start}, where you last read`}: the page number your PDF viewer
          shows, not the one printed on the page. Select text to copy it.
        </p>
      </PageHeader>
      {load.state === 'loading' && (load.saving ? <SavingLine saving={load.saving} /> : <Waiting>Opening the book.</Waiting>)}
      {load.state === 'error' && (
        <div role="alert" className="card mt-4 max-w-xl p-5">
          <p>{load.text}</p>
          {load.signIn && (
            <button type="button" onClick={openAccount} className={`${btnPrimary} mt-4`}>
              Sign in
            </button>
          )}
        </div>
      )}
      {load.state === 'ready' && (
        <>
          {load.month && <p className={`${note} mt-2`}>{load.month}</p>}
          <Viewer key={book} book={book} doc={load.doc} start={Math.min(start, load.doc.numPages)} source={source} />
        </>
      )}
    </div>
  )
}

/** The first opening on a device: how much of the book has arrived. */
function SavingLine({ saving }: { saving: Progress }) {
  const { received, total } = saving
  return (
    <div className="mt-4 max-w-xl" role="status">
      <p>
        Saving the book on this device, the first time only: {megabytes(received)}
        {total ? ` of ${megabytes(total)}` : ''} MB. Next time it opens at once.
      </p>
      {total > 0 && <Meter value={received / total} className="mt-2 h-2.5" />}
      <p className={`${note} mt-2`}>
        To save every book in one go, use <Link to="/settings" className={link}>Settings</Link>.
      </p>
    </div>
  )
}

interface Found {
  query: string
  pages: number[]
  /** How many pages have been searched so far. */
  scanned: number
  done: boolean
}

function Viewer({ book, doc, start, source }: { book: string; doc: PDFDocumentProxy; start: number; source?: number }) {
  const box = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [base, setBase] = useState<{ w: number; h: number }>()
  const [width, setWidth] = useState(0)
  const [zoom, setZoom] = useState(FIT)
  const [current, setCurrent] = useState(start)
  const currentRef = useRef(start)
  const [typed, setTyped] = useState(String(start))
  const [near, setNear] = useState<Set<number>>(() => new Set([start]))
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const [found, setFound] = useState<Found>()
  const texts = useRef(new Map<number, string>())
  const searchRun = useRef(0)
  const scrolled = useRef(false)
  const pages = doc.numPages
  const scale = base && width ? (width / base.w) * ZOOMS[zoom] : 0

  /** Scroll so the page starts just below the top bar and the reader's controls, which both stay in place. */
  function showPage(n: number) {
    const element = document.getElementById(`page-${n}`)
    if (!element) return
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0
    const covered = header + (bar.current?.offsetHeight ?? 0) + 8
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - covered })
  }

  // The size of a page, taken from the page asked for; most books use one page size throughout.
  useEffect(() => {
    void doc.getPage(start).then((page) => {
      const viewport = page.getViewport({ scale: 1 })
      setBase({ w: viewport.width, h: viewport.height })
    })
  }, [doc, start])

  // Fit to the width available, and again when it changes (a phone turned, a window resized).
  useEffect(() => {
    const element = box.current
    if (!element) return
    const observer = new ResizeObserver(() => setWidth(Math.min(element.clientWidth, 1100)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Open at the page asked for; after a change of size, stay on the page being read.
  useEffect(() => {
    if (!scale) return
    showPage(scrolled.current ? currentRef.current : start)
    scrolled.current = true
  }, [scale, start])

  // The page being read is remembered for the next time this book is opened without a page.
  useEffect(() => {
    currentRef.current = current
    const timer = window.setTimeout(() => rememberPage(book, current), 500)
    return () => window.clearTimeout(timer)
  }, [book, current])

  // Which pages are near the screen (drawn), and which one is in the middle of it (shown as current).
  useEffect(() => {
    if (!scale) return
    const elements = Array.from(box.current?.querySelectorAll<HTMLElement>('[data-page]') ?? [])
    const nearby = new IntersectionObserver(
      (entries) =>
        setNear((before) => {
          const next = new Set(before)
          for (const entry of entries) {
            const n = Number((entry.target as HTMLElement).dataset.page)
            if (entry.isIntersecting) next.add(n)
            else next.delete(n)
          }
          return next
        }),
      { rootMargin: NEAR },
    )
    const middle = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) {
          const n = Number((hit.target as HTMLElement).dataset.page)
          setCurrent(n)
          setTyped(String(n))
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    )
    elements.forEach((element) => {
      nearby.observe(element)
      middle.observe(element)
    })
    return () => {
      nearby.disconnect()
      middle.disconnect()
    }
  }, [scale, pages])

  // Pinch with two fingers on a phone to make the pages larger or smaller.
  useEffect(() => {
    const element = box.current
    if (!element) return
    let from = 0
    let ratio = 1
    const distance = (touches: TouchList) => Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY)
    const onStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        from = distance(event.touches)
        ratio = 1
      }
    }
    const onMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || !from) return
      event.preventDefault()
      ratio = distance(event.touches) / from
      element.style.transform = `scale(${ratio})`
      element.style.transformOrigin = 'center top'
    }
    const onEnd = () => {
      if (!from) return
      element.style.transform = ''
      setZoom((z) => {
        const wanted = ZOOMS[z] * ratio
        return ZOOMS.reduce((best, value, i) => (Math.abs(value - wanted) < Math.abs(ZOOMS[best] - wanted) ? i : best), z)
      })
      from = 0
    }
    element.addEventListener('touchstart', onStart, { passive: true })
    element.addEventListener('touchmove', onMove, { passive: false })
    element.addEventListener('touchend', onEnd)
    element.addEventListener('touchcancel', onEnd)
    return () => {
      element.removeEventListener('touchstart', onStart)
      element.removeEventListener('touchmove', onMove)
      element.removeEventListener('touchend', onEnd)
      element.removeEventListener('touchcancel', onEnd)
    }
  }, [])

  function go(n: number) {
    const page = Math.min(pages, Math.max(1, n))
    setTyped(String(page))
    showPage(page)
  }

  async function pageText(n: number): Promise<string> {
    const cached = texts.current.get(n)
    if (cached !== undefined) return cached
    const content = await (await doc.getPage(n)).getTextContent()
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .toLowerCase()
    texts.current.set(n, text)
    return text
  }

  /** Look for the words on every page, front to back, showing the pages found as the search goes. */
  async function search(words: string) {
    const wanted = words.trim().toLowerCase().replace(/\s+/g, ' ')
    const run = ++searchRun.current
    if (!wanted) return setFound(undefined)
    const hits: number[] = []
    setFound({ query: wanted, pages: [], scanned: 0, done: false })
    for (let n = 1; n <= pages; n++) {
      if (run !== searchRun.current) return
      if ((await pageText(n)).includes(wanted)) hits.push(n)
      if (n % 10 === 0 || n === pages) setFound({ query: wanted, pages: [...hits], scanned: n, done: n === pages })
    }
    const next = hits.find((p) => p >= currentRef.current) ?? hits[0]
    if (next) go(next)
  }

  const matchAt = found ? found.pages.indexOf(current) : -1
  function nextMatch(step: 1 | -1) {
    if (!found?.pages.length) return
    const list = found.pages
    const target = step === 1 ? (list.find((p) => p > current) ?? list[0]) : ([...list].reverse().find((p) => p < current) ?? list[list.length - 1])
    go(target)
  }

  return (
    <div className="mt-4">
      <div
        ref={bar}
        style={{ top: 'var(--header-h, 0px)' }}
        className="sticky z-20 -mx-4 border-b border-line bg-paper/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6"
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button type="button" onClick={() => go(current - 1)} disabled={current <= 1} className={tool} aria-label="Previous page">
            <span aria-hidden="true" className="sm:hidden">
              ‹
            </span>
            <span className="hidden sm:inline">Previous page</span>
          </button>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              go(Number(typed) || current)
            }}
            className="flex items-center gap-2"
          >
            <label htmlFor="reader-page" className="sr-only text-sm text-muted sm:not-sr-only">
              Page
            </label>
            <input
              id="reader-page"
              inputMode="numeric"
              value={typed}
              onChange={(event) => setTyped(event.target.value.replace(/\D/g, ''))}
              onBlur={() => setTyped(String(current))}
              className={`${input} w-14 px-1 text-center tabular-nums sm:w-20 sm:px-3`}
            />
            <span className="text-sm text-muted tabular-nums">of {pages}</span>
          </form>
          <button type="button" onClick={() => go(current + 1)} disabled={current >= pages} className={tool} aria-label="Next page">
            <span aria-hidden="true" className="sm:hidden">
              ›
            </span>
            <span className="hidden sm:inline">Next page</span>
          </button>
          {source && current !== source && (
            <button type="button" onClick={() => go(source)} className={tool} aria-label={`Back to the source page, ${source}`}>
              <Icon name="previous" size={16} />
              <span className="ml-1.5 tabular-nums">{source}</span>
            </button>
          )}
          <span className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearching((open) => !open)}
              aria-expanded={searching}
              className={`${tool} ${searching ? 'border-plan bg-plan-soft text-plan' : ''}`}
              aria-label="Search in this book"
            >
              <Icon name="search" size={16} />
              <span className="ml-1.5 hidden sm:inline">Search</span>
            </button>
            <button type="button" onClick={() => setZoom((z) => Math.max(0, z - 1))} disabled={zoom === 0} className={tool} aria-label="Make pages smaller">
              −
            </button>
            <button type="button" onClick={() => setZoom(FIT)} className="hidden w-14 text-center text-sm tabular-nums hover:text-plan sm:block" title="Fit the page width">
              {Math.round(ZOOMS[zoom] * 100)}%
            </button>
            <span className="sr-only" aria-live="polite">
              {Math.round(ZOOMS[zoom] * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))}
              disabled={zoom === ZOOMS.length - 1}
              className={tool}
              aria-label="Make pages larger"
            >
              +
            </button>
          </span>
        </div>
        {searching && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
                void search(query)
              }}
              className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none"
            >
              <label htmlFor="reader-search" className="sr-only">
                Words to find in this book
              </label>
              <input
                id="reader-search"
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Words to find"
                className={`${input} min-w-0 flex-1 sm:w-64`}
              />
              <button className={btnPrimary}>Find</button>
            </form>
            {found && (
              <span className="flex items-center gap-2 text-sm" role="status">
                {found.pages.length === 0
                  ? found.done
                    ? `Not found in this book.`
                    : `Searching… page ${found.scanned} of ${pages}`
                  : `${matchAt >= 0 ? `Page ${matchAt + 1} of ${found.pages.length}` : `${found.pages.length} ${found.pages.length === 1 ? 'page' : 'pages'}`}${found.done ? '' : ` so far (page ${found.scanned} of ${pages})`}`}
                {found.pages.length > 0 && (
                  <>
                    <button type="button" onClick={() => nextMatch(-1)} className={btnQuiet} aria-label="Previous page with a match">
                      <Icon name="previous" size={16} />
                    </button>
                    <button type="button" onClick={() => nextMatch(1)} className={btnQuiet} aria-label="Next page with a match">
                      <Icon name="next" size={16} />
                    </button>
                  </>
                )}
              </span>
            )}
          </div>
        )}
      </div>
      <div ref={box} className="overflow-x-auto py-4">
        {base &&
          scale > 0 &&
          Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <PageView key={n} doc={doc} n={n} scale={scale} base={base} draw={near.has(n)} find={found?.pages.includes(n) ? found.query : ''} />
          ))}
      </div>
    </div>
  )
}

function PageView({ doc, n, scale, base, draw, find }: { doc: PDFDocumentProxy; n: number; scale: number; base: { w: number; h: number }; draw: boolean; find: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const textBox = useRef<HTMLDivElement>(null)
  const layer = useRef<TextLayer>(undefined)
  const [size, setSize] = useState<{ w: number; h: number }>()
  const [textReady, setTextReady] = useState(0)

  useEffect(() => {
    if (!draw) return
    let cancelled = false
    let task: RenderTask | undefined
    void doc.getPage(n).then(async (page) => {
      const target = canvas.current
      const words = textBox.current
      if (cancelled || !target || !words) return
      const viewport = page.getViewport({ scale })
      setSize({ w: viewport.width / scale, h: viewport.height / scale })
      // Drawn at the screen's pixel density, so text stays sharp on phones.
      const ratio = window.devicePixelRatio || 1
      target.width = Math.floor(viewport.width * ratio)
      target.height = Math.floor(viewport.height * ratio)
      task = page.render({
        canvas: target,
        canvasContext: target.getContext('2d')!,
        viewport,
        transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
      })
      task.promise.catch(() => undefined)
      // The invisible text over the page, for selecting, copying and finding words.
      const { TextLayer } = await import('pdfjs-dist')
      if (cancelled) return
      words.replaceChildren()
      layer.current?.cancel()
      layer.current = new TextLayer({ textContentSource: page.streamTextContent(), container: words, viewport })
      await layer.current.render().catch(() => undefined)
      if (!cancelled) setTextReady((x) => x + 1)
    })
    return () => {
      cancelled = true
      task?.cancel()
      layer.current?.cancel()
    }
  }, [doc, n, scale, draw])

  // Mark the words found by the search on this page: the whole phrase where a line holds it, otherwise its
  // longest word (a phrase can be split over two lines of the page).
  useEffect(() => {
    const divs = layer.current?.textDivs ?? []
    const text = (div: HTMLElement) => (div.textContent ?? '').toLowerCase()
    const longest = find.split(' ').reduce((a, b) => (b.length > a.length ? b : a), '')
    const whole = find ? divs.filter((div) => text(div).includes(find)) : []
    const marked = new Set(whole.length ? whole : find ? divs.filter((div) => text(div).includes(longest)) : [])
    for (const div of divs) div.classList.toggle('hit', marked.has(div))
  }, [find, textReady])

  const w = (size?.w ?? base.w) * scale
  const h = (size?.h ?? base.h) * scale
  return (
    <div id={`page-${n}`} data-page={n} style={{ width: w, height: h }} className="relative mx-auto mb-4 border border-line bg-surface">
      {draw && (
        <>
          <canvas ref={canvas} role="img" aria-label={`Page ${n}`} style={{ width: w, height: h }} className="block" />
          <div ref={textBox} className="textLayer" style={{ '--total-scale-factor': scale } as CSSProperties} />
        </>
      )}
    </div>
  )
}
