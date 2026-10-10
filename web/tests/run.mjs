// Click tests: drive the running platform in the Edge browser already on this PC.
//
// Usage: npm test            (the platform must be running, see start.bat)
//        npm test -- quiz    (only tests whose name contains "quiz")
//        BASE=https://... npm test   (test another address)
//
// Every test gets a fresh private browser profile, so saved progress is never touched.
import { chromium } from 'playwright-core'
import { tests } from './tests.mjs'

const BASE = process.env.BASE ?? 'http://localhost:5173'
const only = process.argv[2]

const browser = await chromium.launch({ channel: 'msedge', headless: true })
let failed = 0
for (const [name, test] of Object.entries(tests)) {
  if (only && !name.includes(only)) continue
  const context = await browser.newContext({ baseURL: BASE, viewport: { width: 1200, height: 900 } })
  const page = await context.newPage()
  page.setDefaultTimeout(8000)
  // window.confirm questions ("Start the exam?") are answered yes.
  page.on('dialog', (dialog) => dialog.accept())
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  try {
    await test(page, context, browser, BASE)
    if (errors.length) throw new Error(`the page reported an error: ${errors[0]}`)
    console.log(`ok    ${name}`)
  } catch (error) {
    failed++
    console.log(`FAIL  ${name}\n      ${String(error.message).split('\n').slice(0, 4).join('\n      ')}`)
  }
  await context.close()
}
await browser.close()
if (failed) {
  console.log(`\n${failed} test(s) failed`)
  process.exit(1)
}
console.log('\nAll click tests passed.')
