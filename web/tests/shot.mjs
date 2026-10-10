// Take a picture of a page, for reviewing how it looks.
//
// Usage: node tests/shot.mjs <path> <file.png> [light|dark] [width] [height] [scrollY]
// A JSON file named in SEED is put into the browser as saved progress first.
import fs from 'node:fs'
import { chromium } from 'playwright-core'

const [path, file, theme = 'light', width = '1200', height = '1000', scroll = '0'] = process.argv.slice(2)
const BASE = process.env.BASE ?? 'http://localhost:5173'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ baseURL: BASE, viewport: { width: Number(width), height: Number(height) } })
await page.goto('/tests-blank-page-for-seeding')
await page.evaluate(
  ([theme, seed]) => {
    localStorage.setItem('road-to-pmi-theme', theme)
    if (seed) localStorage.setItem('road-to-pmi-progress', seed)
  },
  [theme, process.env.SEED ? fs.readFileSync(process.env.SEED, 'utf8') : ''],
)
await page.goto(path)
await page.waitForLoadState('networkidle')
await page.evaluate((y) => window.scrollTo(0, y), Number(scroll))
await page.waitForTimeout(400)
await page.screenshot({ path: file })
await browser.close()
