import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const here = path.dirname(fileURLToPath(import.meta.url))

/**
 * Serves the PDFs in "PMI Learning Material" at /books/<id>.pdf, so source links can
 * open a book at a page. Local dev server only: the books are never built or uploaded.
 */
function localBooks(): Plugin {
  const folder = path.resolve(here, '../PMI Learning Material')
  // Read on every request, so a book added to books.json works without restarting the server.
  const bookList = (): Record<string, { file: string }> =>
    JSON.parse(fs.readFileSync(path.resolve(here, 'src/content/books.json'), 'utf8'))
  return {
    name: 'local-books',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/books', (req, res, next) => {
        const id = decodeURIComponent((req.url ?? '').split(/[?#]/)[0]).replace(/^\//, '').replace(/\.pdf$/, '')
        const book = bookList()[id]
        if (!book) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(`No book with the id "${id}" is listed in web/src/content/books.json.`)
          return
        }
        // Edge's viewer cannot open PMI's protected PDFs, so tools/unlock_pdfs.py keeps a
        // readable copy of those in .cache/pdf. Use it when present, else the original.
        const readable = path.resolve(here, '../.cache/pdf', `${id}.pdf`)
        const file = fs.existsSync(readable) ? readable : path.join(folder, book.file)
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(`"${book.file}" was not found in the PMI Learning Material folder.`)
          return
        }
        const size = fs.statSync(file).size
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'inline')
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Cache-Control', 'no-store')

        // PDF viewers load big files in pieces ("Range: bytes=start-end"). Each piece must be
        // answered with exactly those bytes, or the viewer misreads the file.
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '')
        if (range && (range[1] || range[2])) {
            const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]))
            const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1
            if (start > end || start >= size) {
              res.statusCode = 416
              res.setHeader('Content-Range', `bytes */${size}`)
              res.end()
              return
            }
            res.statusCode = 206
            res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
            res.setHeader('Content-Length', end - start + 1)
            if (req.method === 'HEAD') return void res.end()
            fs.createReadStream(file, { start, end }).pipe(res)
            return
        }
        res.setHeader('Content-Length', size)
        if (req.method === 'HEAD') return void res.end()
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}

/**
 * Builds one search file from the lessons and flashcards, offered to the app as
 * "virtual:search-index". The app loads it in the background, so search suggestions
 * appear as you type. It is made from the content folder each time, so it cannot go stale.
 * Quiz and mock exam questions are left out on purpose.
 */
function searchIndex(): Plugin {
  const id = 'virtual:search-index'
  const content = path.resolve(here, 'src/content')
  // Keep in step with slug() in src/components/LessonContents.tsx.
  const slug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  const plain = (markdown: string) =>
    markdown
      .replace(/^@(source|diagram) .*$/gm, '')
      .replace(/^\|[-: |]+\|\r?$/gm, '')
      .replace(/[*`>#]/g, '')
      .replace(/\s*\|\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  return {
    name: 'search-index',
    resolveId: (source) => (source === id ? `\0${id}` : undefined),
    load(resolved) {
      if (resolved !== `\0${id}`) return
      const entries: object[] = []
      for (const courseId of fs.readdirSync(content)) {
        const courseFile = path.join(content, courseId, 'course.json')
        if (!fs.existsSync(courseFile)) continue
        this.addWatchFile(courseFile)
        const course = JSON.parse(fs.readFileSync(courseFile, 'utf8'))
        course.domains.forEach((domain: { modules: { id: string; title: string; ready: boolean }[] }, d: number) =>
          domain.modules.forEach((m, j) => {
            if (!m.ready) return
            const module = `${course.title} ${d + 1}.${j + 1} ${m.title}`
            const folder = path.join(content, courseId, 'modules', m.id)
            const lessonFile = path.join(folder, 'lesson.md')
            const cardFile = path.join(folder, 'flashcards.json')
            entries.push({ kind: 'module', module: course.title, title: `${d + 1}.${j + 1} ${m.title}`, text: '', to: `/${courseId}/${m.id}` })
            if (fs.existsSync(lessonFile)) {
              this.addWatchFile(lessonFile)
              for (const section of fs.readFileSync(lessonFile, 'utf8').split(/^(?=## )/m)) {
                const heading = /^## (.+)$/m.exec(section)
                if (!heading) continue
                const title = heading[1].replace(/[*`]/g, '').trim()
                entries.push({ kind: 'lesson', module, title, text: plain(section.slice(heading[0].length)), to: `/${courseId}/${m.id}#${slug(title)}` })
              }
            }
            if (fs.existsSync(cardFile)) {
              this.addWatchFile(cardFile)
              for (const card of JSON.parse(fs.readFileSync(cardFile, 'utf8'))) {
                entries.push({ kind: 'card', module, title: card.front, text: card.back, to: `/${courseId}/${m.id}/flashcards` })
              }
            }
          }),
        )
      }
      return `export default ${JSON.stringify(entries)}`
    },
  }
}

/**
 * The version log, offered to the app as "virtual:release": the version number, its date, the
 * commit the build was made from, and the whole log for the What's new page.
 * CHANGELOG.md (project folder) is the only place a version number is written; its newest
 * heading, "## 1.0 · 23 Nov 2026 · Title", is the app's version. The build also writes
 * version.json, so the live website can be checked without opening a browser.
 */
function release(): Plugin {
  const id = 'virtual:release'
  const file = path.resolve(here, '../CHANGELOG.md')
  const commit = (): string => {
    // Vercel builds from a copy of the repository and says which commit it is.
    const fromHost = process.env.VERCEL_GIT_COMMIT_SHA
    if (fromHost) return fromHost.slice(0, 7)
    try {
      return execSync('git rev-parse --short=7 HEAD', { cwd: here, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    } catch {
      return 'unknown'
    }
  }
  const read = () => {
    const changelog = fs.readFileSync(file, 'utf8')
    const newest = /^## (\d+\.\d+) · (\d{1,2} [A-Z][a-z]{2} \d{4}) · (.+)$/m.exec(changelog)
    if (!newest) throw new Error('CHANGELOG.md has no version heading such as "## 1.0 · 23 Nov 2026 · Title"')
    return { version: newest[1], date: newest[2], title: newest[3].trim(), commit: commit(), changelog }
  }
  return {
    name: 'release',
    resolveId: (source) => (source === id ? `\0${id}` : undefined),
    load(resolved) {
      if (resolved !== `\0${id}`) return
      this.addWatchFile(file)
      return `export default ${JSON.stringify(read())}`
    },
    generateBundle() {
      const { version, date, commit } = read()
      this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ version, date, commit }) + '\n' })
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), localBooks(), searchIndex(), release()],
  resolve: {
    alias: {
      // The click tests' own course: served by the local test server, never built into the site.
      '@lab-course': path.resolve(here, command === 'serve' ? 'tests/lab-course' : 'src/lab-off'),
    },
  },
}))
