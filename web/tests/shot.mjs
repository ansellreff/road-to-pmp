// Take a picture of a page, for reviewing how it looks.
//
// Usage: node tests/shot.mjs <path> <file.png> [light|dark] [width] [height] [scrollY]
// A JSON file named in SEED is put into the browser as saved progress first.
// CLICK and TYPE (see below) open a menu or the search suggestions before the picture.
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
// CLICK="Modules" presses the button with that name first; TYPE="float" types into the search box.
if (process.env.CLICK) await page.getByRole('button', { name: process.env.CLICK, exact: true }).first().click()
if (process.env.TYPE) {
  await page.getByRole('combobox').fill(process.env.TYPE)
  await page.getByRole('option').nth(3).waitFor()
}
await page.evaluate((y) => window.scrollTo(0, y), Number(scroll))
await page.waitForTimeout(400)
// FIGURE="Burnup chart" pictures only the lesson drawing whose description starts with that text.
if (process.env.FIGURE) {
  const figure = page.locator('figure', { has: page.locator(`svg[aria-label^="${process.env.FIGURE}"]`) })
  await figure.scrollIntoViewIfNeeded()
  await figure.screenshot({ path: file })
} else await page.screenshot({ path: file })
await browser.close()
