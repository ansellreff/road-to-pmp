// The click tests. Each one is a short visit by a learner, checked by what the page then shows
// and by what was saved in the browser.

const KEY = 'road-to-pmi-progress'

export function expect(condition, message) {
  if (!condition) throw new Error(message)
}

/** Fails unless the text appears on the page within the time limit. */
export async function see(page, text) {
  await page.getByText(text).first().waitFor()
}

export const saved = (page) => page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{}'), KEY)

/** Put progress into the browser before the app starts. */
export async function seed(page, change) {
  await page.goto('/tests-blank-page-for-seeding')
  await page.evaluate(
    ([key, text]) => {
      const now = Date.now()
      const data = JSON.parse(text, (_, v) => (typeof v === 'string' && v.startsWith('NOW-') ? now - Number(v.slice(4)) : v))
      localStorage.setItem(key, JSON.stringify({ version: 2, ...data }))
    },
    [KEY, JSON.stringify(change)],
  )
}

/** An answer option, by its letter. */
export const option = (page, letter) => page.getByRole('button', { name: new RegExp(`^${letter} `) })
/** Waits until that option is the selected one (real exam mode). */
const selected = (page, letter) => option(page, letter).and(page.locator('[aria-pressed="true"]')).waitFor()
const button = (page, name) => page.getByRole('button', { name, exact: true })

/** Waits until the section heading with this text is inside the window. */
async function inView(page, heading) {
  const element = page.getByRole('heading', { name: heading, exact: true })
  await element.waitFor()
  await page.waitForFunction((el) => {
    const { top } = el.getBoundingClientRect()
    return top >= 0 && top < window.innerHeight * 0.6
  }, await element.elementHandle())
}

export const tests = {
  async 'quiz: answer every question, see explanations, get a score'(page) {
    await page.goto('/capm/1-01-project-basics/quiz')
    await see(page, 'Question 1 of')
    const total = Number((await page.getByText(/Question 1 of \d+/).textContent()).match(/of (\d+)/)[1])
    for (let i = 1; i <= total; i++) {
      await option(page, 'A').click()
      await see(page, /^(Correct\.|Not correct\. The right answer is [B-D]\.)$/)
      await see(page, 'Source:')
      await page.getByRole('button', { name: i === total ? 'Finish quiz' : 'Next question' }).click()
    }
    await see(page, new RegExp(`\\d+ of ${total} correct`))
    await see(page, 'Your answers')
    const progress = await saved(page)
    const result = progress.quizzes['capm/1-01-project-basics']
    expect(result?.total === total && result.attempts === 1, 'the quiz result was not saved')
    expect(Object.keys(progress.answers['capm/1-01-project-basics']).length === total, 'not every answer was saved')
  },

  async 'practice: a missed question is offered, and leaves once answered correctly'(page) {
    await seed(page, { answers: { 'capm/1-01-project-basics': { q1: { right: 0, wrong: 2, lastCorrect: false } } } })
    await page.goto('/practice')
    await see(page, 'Your latest answer to 1 question was wrong')
    await button(page, 'Practice all').click()
    await see(page, 'Question 1 of 1')
    // Find the right answer by trying: the page says which letter is right.
    await option(page, 'A').click()
    const wrong = await page.getByText(/Not correct\. The right answer is ([B-D])\./).textContent({ timeout: 1500 }).catch(() => null)
    await button(page, 'Finish practice').click()
    await see(page, wrong ? '0 of 1 correct' : '1 of 1 correct')
    if (wrong) {
      await see(page, 'Missed again in this session')
      await button(page, 'Practice again').click()
      await button(page, 'Practice all').click()
      await option(page, wrong.match(/is ([B-D])/)[1]).click()
      await see(page, 'Correct.')
      await button(page, 'Finish practice').click()
    }
    await see(page, 'You have now answered every missed question correctly.')
    const state = (await saved(page)).answers['capm/1-01-project-basics'].q1
    expect(state.lastCorrect === true, 'the question is still marked as missed')
  },

  async 'mock exam, practice mode: chapters, explanation after each answer, submit'(page) {
    await page.goto('/capm/exams')
    await page.getByRole('button', { name: 'Start in practice mode' }).first().click()
    await see(page, 'Take the chapters in any order')
    await button(page, 'Start chapter 2').click()
    await see(page, 'Chapter 2: Predictive, Plan-Based Methodologies. Question 1 of 26')
    await option(page, 'C').click()
    await see(page, 'Source:')
    expect(await option(page, 'A').isDisabled(), 'an answer in practice mode can still be changed')
    await button(page, 'Next question').click()
    await see(page, 'Question 2 of 26')
    await button(page, 'Back to the chapters').click()
    await see(page, '1 of 26 answered')
    await see(page, '1 of 150 answered')
    await button(page, 'Continue chapter 2').click()
    await see(page, 'Question 2 of 26')
    await button(page, 'Back to the chapters').click()
    await button(page, 'Submit the exam and see the result').click()
    await see(page, 'Mock exam 1: your result')
    await see(page, '149 questions were left unanswered and count as wrong.')
    const record = (await saved(page)).exams['capm/mock-1']
    expect(!record.run && record.attempts.length === 1 && record.attempts[0].mode === 'practice', 'the attempt was not saved')
  },

  async 'mock exam, real mode: answer, change, flag, grid, break, lock, submit'(page) {
    await page.goto('/capm/exams')
    await page.getByRole('button', { name: 'Start in real exam mode' }).nth(1).click()
    await see(page, 'Question 1 of 150. First half: 0 of 75 answered')
    await option(page, 'B').click()
    expect((await page.getByText('Source:').count()) === 0, 'real exam mode showed an explanation')
    await option(page, 'D').click() // an answer can be changed
    await selected(page, 'D')
    await see(page, 'First half: 1 of 75 answered')
    await button(page, 'Flag to look at again').click()
    await button(page, 'Remove the flag').waitFor()
    await button(page, 'Next question').click()
    await see(page, 'Question 2 of 150')
    await page.getByRole('button', { name: 'Question 40, unanswered' }).click()
    await see(page, 'Question 40 of 150')
    await button(page, 'Previous').click()
    await see(page, 'Question 39 of 150')
    await page.getByRole('button', { name: 'Question 1, answered, flagged' }).click()
    await selected(page, 'D')

    await button(page, 'Finish questions 1 to 75 and take the break').click()
    await see(page, 'Finish the first half?')
    await see(page, '74 unanswered. 1 flagged.')
    await button(page, 'Lock the first half and start the break').click()
    await see(page, 'of your 10-minute break left')
    await button(page, 'End the break and start question 76').click()
    await see(page, 'Question 76 of 150. Second half: 0 of 75 answered')
    expect((await page.getByRole('button', { name: /^Question 1,/ }).count()) === 0, 'the first half can still be opened')
    await option(page, 'A').click()
    await button(page, 'Submit the exam').click()
    await see(page, 'Submit the exam?')
    await page.getByRole('button', { name: 'Submit the exam' }).click()
    await see(page, 'Mock exam 2: your result')
    await see(page, '148 questions were left unanswered and count as wrong.')
    await see(page, 'Review by domain')
    await button(page, 'Flagged (1)').click()
    const progress = await saved(page)
    const attempt = progress.exams['capm/mock-2'].attempts[0]
    expect(attempt.mode === 'real' && attempt.flags.length === 1 && !attempt.timedOut, 'the attempt was saved wrongly')
    const recorded = Object.values(progress.answers).reduce((n, module) => n + Object.keys(module).length, 0)
    expect(recorded === 2, `${recorded} answers went into the question history, expected 2`)
  },

  async 'mock exam: when the three hours are over, it is submitted as it stands'(page) {
    const picks = Array(150).fill(null)
    picks[0] = 1
    await seed(page, { exams: { 'capm/mock-3': { attempts: [], run: { mode: 'practice', startedAt: 'NOW-10900000', picks, flags: [] } } } })
    await page.goto('/capm/exams')
    await page.getByRole('link', { name: 'Time is up. See your result' }).click()
    await see(page, 'Mock exam 3: your result')
    await see(page, 'Time ran out, so the exam was submitted as it stood.')
    const record = (await saved(page)).exams['capm/mock-3']
    expect(!record.run && record.attempts[0].timedOut && record.attempts[0].seconds === 10800, 'the timed-out attempt was saved wrongly')
  },

  async 'display: dark theme and text size are applied and remembered'(page) {
    await page.goto('/')
    await page.getByRole('button', { name: 'Switch to the dark theme' }).click()
    await page.getByRole('button', { name: 'Larger text' }).click()
    const read = () => page.evaluate(() => [document.documentElement.dataset.theme, document.documentElement.dataset.text])
    expect((await read()).join() === 'dark,larger', 'the theme or text size was not applied')
    await page.reload()
    await page.getByRole('button', { name: 'Switch to the light theme' }).waitFor()
    expect((await read()).join() === 'dark,larger', 'the theme or text size was not remembered')
    const paper = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(paper !== 'rgb(241, 244, 247)', 'the page background did not change in the dark theme')
  },

  async 'flashcards: turn a card over and rate it'(page) {
    await page.goto('/capm/1-01-project-basics/flashcards')
    await see(page, /You know 0 of \d+ cards/)
    await page.getByRole('button', { name: 'Show the answer side' }).click()
    await page.getByRole('button', { name: 'Show the question side' }).waitFor()
    await button(page, 'I know this').click()
    await see(page, /You know 1 of \d+ cards/)
    await see(page, /Card 2 of \d+/)
    await button(page, 'Still learning').click()
    const cards = Object.values((await saved(page)).cards['capm/1-01-project-basics'])
    expect(cards.length === 2 && cards.some((c) => c.box === 1) && cards.some((c) => c.box === 0), 'the ratings were not saved')
    await page.goto('/review')
    await see(page, '1 card left in this session')
  },

  async 'lesson: list of sections, jump to one, continue there next time'(page) {
    await page.goto('/capm/3-07-metrics-retrospectives')
    await button(page, /In this lesson/).click()
    await page.getByRole('link', { name: 'Flow metrics', exact: true }).click()
    await inView(page, 'Flow metrics')
    expect(page.url().endsWith('#flow-metrics'), 'the address does not name the section')
    await page.waitForFunction((key) => JSON.parse(localStorage.getItem(key)).reading?.['capm/3-07-metrics-retrospectives'] === 'flow-metrics', KEY)
    await page.goto('/capm/3-07-metrics-retrospectives')
    await page.getByRole('link', { name: 'Continue from: Flow metrics' }).click()
    await inView(page, 'Flow metrics')
  },

  async 'search: finds a lesson section and opens the lesson there'(page) {
    await page.goto('/search')
    await page.getByLabel('Search for').fill('total float')
    await see(page, 'Lesson sections')
    await see(page, 'Flashcards')
    await page.getByRole('link', { name: 'Total float and free float' }).click()
    await inView(page, 'Total float and free float')
    await page.goto('/search?q=zzzzqq')
    await see(page, 'Nothing found for "zzzzqq".')
  },

  async 'formula sheet: shows formulas with sources and links to the lesson'(page) {
    await page.goto('/capm/sheet')
    await see(page, 'CPI = EV ÷ AC')
    await see(page, 'Channels = n(n − 1) ÷ 2')
    await see(page, 'Source:')
    await page.getByRole('link', { name: /Indices: CPI and SPI/ }).first().click()
    await inView(page, 'Indices: CPI and SPI')
  },

  async 'lesson and study plan: mark complete, set and remove the exam day'(page) {
    await page.goto('/capm/1-01-project-basics')
    await button(page, 'Mark lesson as completed').click()
    await see(page, 'Lesson completed')
    await page.goto('/plan')
    await see(page, 'No exam day set yet')
    const day = new Date(Date.now() + 40 * 86_400_000).toLocaleDateString('en-CA')
    await page.getByLabel('Exam day').fill(day)
    await see(page, 'Days to the exam')
    await see(page, 'From today to the exam, drawn to scale.')
    expect((await saved(page)).examDates.capm === day, 'the exam day was not saved')
    await page.goto('/')
    await see(page, '40 days to your CAPM exam')
    await page.goto('/plan')
    await button(page, 'Remove the date').click()
    await see(page, 'No exam day set yet')
  },
}
