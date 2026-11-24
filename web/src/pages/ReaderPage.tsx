import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import NotFound from '../components/NotFound'
import { PageHeader, Waiting } from '../components/Page'
import { bookError, bookLink, WARN_BYTES } from '../lib/books'
import { books } from '../lib/content'
import { useSync } from '../lib/sync'
import { btnPrimary, btnQuiet, input, note } from '../lib/ui'

// The book reader: a page of the app that draws a PDF itself (with PDF.js), opened at the page a
// source points to. It works the same in every browser and on phones, which often download a PDF
// instead of showing it. On this PC the book comes from your PMI Learning Material folder (through
// the local server); on the website from your private online copy (lib/books.ts), once signed in.

const onThisPc = import.meta.env.DEV
const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2]
/** Pages this far outside the screen are drawn in advance, and dropped again when further away. */
const NEAR = '1500px 0px'

type Loading = { state: 'loading' } | { state: 'error'; text: string; signIn?: boolean } | { state: 'ready'; doc: PDFDocumentProxy; month?: string }

export default function ReaderPage() {
  const { book = '' } = useParams()
  const [params] = useSearchParams()
  const sync = useSync()
  const info = books[book]
  const start = Math.max(1, Math.floor(Number(params.get('page')) || 1))
  const [load, setLoad] = useState<Loading>({ state: 'loading' })
  const signedIn = Boolean(sync.email)

  useEffect(() => {
    if (!info) return
    if (!onThisPc && !signedIn) {
      setLoad({ state: 'error', signIn: true, text: 'You must sign in first to open the books. Sign in on the home page, then open the link again.' })
      return
    }
    let cancelled = false
    let doc: PDFDocumentProxy | undefined
    setLoad({ state: 'loading' })
    void (async () => {
      try {
        let url = `/books/${book}.pdf`
        let month: string | undefined
        if (!onThisPc) {
          const found = await bookLink(book)
          url = found.url
          if (found.used !== undefined && found.cap !== undefined && found.used > WARN_BYTES) {
            month = `Book downloads this month: ${(found.used / 1e9).toFixed(1)} of ${(found.cap / 1e9).toFixed(1)} GB.`
          }
        }
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
        // Only the parts of the file that are needed are fetched, where the server allows it.
        doc = await pdfjs.getDocument({ url, disableAutoFetch: true }).promise
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
        <p className={`${note} mt-2`}>Opened at PDF page {start}: the page number your PDF viewer shows, not the one printed on the page.</p>
      </PageHeader>
      {load.state === 'loading' && <Waiting>Opening the book. The first time on a device, the book downloads; this can take a moment.</Waiting>}
      {load.state === 'error' && (
        <div role="alert" className="card mt-4 max-w-xl p-5">
          <p>{load.text}</p>
          {load.signIn && (
            <Link to="/#sync" className={`${btnPrimary} mt-4`}>
              Go to sign in
            </Link>
          )}
        </div>
      )}
      {load.state === 'ready' && (
        <>
          {load.month && <p className={`${note} mt-2`}>{load.month}</p>}
          <Viewer doc={load.doc} start={Math.min(start, load.doc.numPages)} />
        </>
      )}
    </div>
  )
}

function Viewer({ doc, start }: { doc: PDFDocumentProxy; start: number }) {
  const box = useRef<HTMLDivElement>(null)
  const [base, setBase] = useState<{ w: number; h: number }>()
  const [width, setWidth] = useState(0)
  const [zoom, setZoom] = useState(2)
  const [current, setCurrent] = useState(start)
  const [typed, setTyped] = useState(String(start))
  const [near, setNear] = useState<Set<number>>(() => new Set([start]))
  const scrolled = useRef(false)
  const pages = doc.numPages
  const scale = base && width ? (width / base.w) * ZOOMS[zoom] : 0

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

  // Open at the page asked for.
  useEffect(() => {
    if (!scale || scrolled.current) return
    scrolled.current = true
    document.getElementById(`page-${start}`)?.scrollIntoView({ block: 'start' })
  }, [scale, start])

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

  function go(n: number) {
    const page = Math.min(pages, Math.max(1, n))
    setTyped(String(page))
    document.getElementById(`page-${page}`)?.scrollIntoView({ block: 'start' })
  }

  return (
    <div className="mt-4">
      <div className="sticky top-0 z-20 -mx-4 flex flex-wrap items-center gap-2 border-b border-line bg-paper/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
        <button type="button" onClick={() => go(current - 1)} disabled={current <= 1} className={btnQuiet}>
          Previous page
        </button>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            go(Number(typed) || current)
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor="reader-page" className="text-sm text-muted">
            Page
          </label>
          <input
            id="reader-page"
            inputMode="numeric"
            value={typed}
            onChange={(event) => setTyped(event.target.value.replace(/\D/g, ''))}
            onBlur={() => setTyped(String(current))}
            className={`${input} w-20 text-center tabular-nums`}
          />
          <span className="text-sm text-muted tabular-nums">of {pages}</span>
        </form>
        <button type="button" onClick={() => go(current + 1)} disabled={current >= pages} className={btnQuiet}>
          Next page
        </button>
        <span className="ml-auto flex items-center gap-2">
          <button type="button" onClick={() => setZoom((z) => Math.max(0, z - 1))} disabled={zoom === 0} className={btnQuiet} aria-label="Make pages smaller">
            −
          </button>
          <span className="w-14 text-center text-sm tabular-nums" aria-live="polite">
            {Math.round(ZOOMS[zoom] * 100)}%
          </span>
          <button type="button" onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))} disabled={zoom === ZOOMS.length - 1} className={btnQuiet} aria-label="Make pages larger">
            +
          </button>
        </span>
      </div>
      <div ref={box} className="overflow-x-auto py-4">
        {base &&
          scale > 0 &&
          Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <PageView key={n} doc={doc} n={n} scale={scale} base={base} draw={near.has(n)} />
          ))}
      </div>
    </div>
  )
}

function PageView({ doc, n, scale, base, draw }: { doc: PDFDocumentProxy; n: number; scale: number; base: { w: number; h: number }; draw: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState<{ w: number; h: number }>()

  useEffect(() => {
    if (!draw) return
    let cancelled = false
    let task: RenderTask | undefined
    void doc.getPage(n).then((page) => {
      const target = canvas.current
      if (cancelled || !target) return
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
    })
    return () => {
      cancelled = true
      task?.cancel()
    }
  }, [doc, n, scale, draw])

  const w = (size?.w ?? base.w) * scale
  const h = (size?.h ?? base.h) * scale
  return (
    <div id={`page-${n}`} data-page={n} style={{ width: w, height: h }} className="relative mx-auto mb-4 scroll-mt-20 border border-line bg-surface">
      {draw && <canvas ref={canvas} role="img" aria-label={`Page ${n}`} style={{ width: w, height: h }} className="block" />}
    </div>
  )
}
