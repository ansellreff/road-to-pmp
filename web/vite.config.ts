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
  const books: Record<string, { file: string }> = JSON.parse(
    fs.readFileSync(path.resolve(here, 'src/content/books.json'), 'utf8'),
  )
  return {
    name: 'local-books',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/books', (req, res, next) => {
        const id = decodeURIComponent((req.url ?? '').split(/[?#]/)[0]).replace(/^\//, '').replace(/\.pdf$/, '')
        const book = books[id]
        if (!book) return next()
        const file = path.join(folder, book.file)
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(`"${book.file}" was not found in the PMI Learning Material folder.`)
          return
        }
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Length', fs.statSync(file).size)
        res.setHeader('Content-Disposition', 'inline')
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localBooks()],
})
