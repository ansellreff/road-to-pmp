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
    await page.waitForTimeout(1200) // think for a moment, so the time on this question is at least a second
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
    await see(page, 'Where the points went')
    await see(page, 'Average on a question')
    await see(page, 'The questions that took longest')
    await see(page, 'Review by domain')
    await button(page, 'Flagged (1)').click()
    const progress = await saved(page)
    const attempt = progress.exams['capm/mock-2'].attempts[0]
    expect(attempt.mode === 'real' && attempt.flags.length === 1 && !attempt.timedOut, 'the attempt was saved wrongly')
    expect(attempt.times?.length === 150 && attempt.times[0] >= 1, 'time per question was not saved')
    expect(attempt.times.filter((t) => t > 0).length <= 6, 'time was counted for questions that were never opened')
    expect(attempt.domains?.length === 4 && attempt.domains.reduce((n, d) => n + d.total, 0) === 150, 'the result per domain was not saved')
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
    // The sections are listed in the panel on the right, open from the start.
    const panel = page.getByRole('complementary', { name: 'Contents' })
    await panel.getByText('In this lesson').waitFor()
    await panel.getByRole('link', { name: 'Flow metrics', exact: true }).click()
    await panel.locator('a[aria-current="location"]', { hasText: 'Flow metrics' }).waitFor()
    // The panel also lists the modules of the domain, with this one marked.
    await panel.locator('a[aria-current="page"]', { hasText: '3.7' }).waitFor()
    await inView(page, 'Flow metrics')
    expect(page.url().endsWith('#flow-metrics'), 'the address does not name the section')
    await page.waitForFunction((key) => JSON.parse(localStorage.getItem(key)).reading?.['capm/3-07-metrics-retrospectives'] === 'flow-metrics', KEY)
    await page.goto('/capm/3-07-metrics-retrospectives')
    await page.getByRole('link', { name: 'Continue from: Flow metrics' }).click()
    await inView(page, 'Flow metrics')
  },

  async 'previous and next: lesson, quiz, flashcards, then the next module, across domains'(page) {
    // 1.12 is the last module of Domain 1; the chain must carry on into Domain 2.
    await page.goto('/capm/1-12-process-groups')
    const steps = page.getByRole('navigation', { name: 'Previous and next' })
    await steps.getByRole('link', { name: /Take the quiz/ }).click()
    await see(page, 'Question 1 of')
    await steps.getByRole('link', { name: /Practice the flashcards/ }).click()
    await see(page, /You know 0 of \d+ cards/)
    await steps.getByRole('link', { name: /Next module/ }).click()
    await see(page, 'Module 2.1 in Predictive, Plan-Based Methodologies')
    await steps.getByRole('link', { name: /Previous module/ }).click()
    await see(page, 'Module 1.12 in Project Management Fundamentals and Core Concepts')
    // The very first module has nothing before it.
    await page.goto('/capm/1-01-project-basics')
    await steps.getByRole('link', { name: /Take the quiz/ }).waitFor()
    expect((await steps.getByRole('link', { name: /Previous module/ }).count()) === 0, 'the first module offers a previous module')
  },

  async 'phone: the Contents button slides the panel in, and choosing a section closes it'(page) {
    await page.setViewportSize({ width: 390, height: 800 })
    await page.goto('/capm/3-07-metrics-retrospectives')
    await button(page, 'Contents').click()
    const drawer = page.getByRole('dialog', { name: 'Contents' })
    await drawer.getByRole('link', { name: 'Flow metrics', exact: true }).click()
    await inView(page, 'Flow metrics')
    await drawer.waitFor({ state: 'hidden' })
    // No sideways scrolling on a phone.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow <= 1, `the page is ${overflow} px wider than the phone screen`)
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

  async 'search box: suggestions while typing, chosen with the keyboard or the mouse'(page) {
    await page.goto('/dashboard')
    const box = page.getByRole('combobox', { name: 'Search lessons and flashcards' })
    // A module title is suggested at once, from what is already in memory.
    await box.fill('earned value')
    await page.getByRole('option', { name: /2\.7 Earned Value Management/ }).waitFor()
    // Sections and flashcards follow as soon as the search file has arrived.
    await page.getByRole('option', { name: /Indices: CPI and SPI|Variances: CV and SV|What earned value management is/ }).first().waitFor()
    await see(page, 'Flashcards')
    // Typing more narrows the list quickly: time one change of the query.
    const started = Date.now()
    await box.fill('total float')
    await page.getByRole('option', { name: /Total float and free float/ }).waitFor()
    const took = Date.now() - started
    expect(took < 600, `the suggestions took ${took} ms to change`)
    // Arrow down to the section and press Enter: the lesson opens there.
    const options = await page.getByRole('option').allTextContents()
    const target = options.findIndex((text) => text.startsWith('Total float and free float'))
    for (let i = 0; i < target; i++) await box.press('ArrowDown')
    await box.press('Enter')
    await inView(page, 'Total float and free float')
    expect((await box.inputValue()) === '', 'the search box was not emptied after going to a result')
    // With the mouse; and "see all results" opens the full page.
    await box.fill('scrum')
    await page.getByRole('option', { name: /See all results for "scrum"/ }).click()
    await see(page, 'Lesson sections')
    expect(page.url().includes('/search?q=scrum'), 'the full results page did not open')
    await box.fill('zzzzqq')
    await see(page, 'No module, section or flashcard matches "zzzzqq" so far.')
    await box.press('Escape')
    expect((await page.getByRole('listbox').count()) === 0, 'Escape did not close the suggestions')
  },

  async 'top menu: every module is one click away, and Practice shows what is waiting'(page) {
    await seed(page, { answers: { 'capm/1-01-project-basics': { q1: { right: 0, wrong: 1, lastCorrect: false } } } })
    await page.goto('/plan')
    await button(page, 'Modules').click()
    const panel = page.getByRole('region', { name: 'Learning modules' })
    await panel.getByText('PMI-ACP').waitFor()
    await panel.getByText('Planned').first().waitFor()
    await panel.getByRole('link', { name: /2\.7 Earned Value Management/ }).click()
    await see(page, 'Module 2.7 in Predictive, Plan-Based Methodologies')
    expect((await page.getByRole('region', { name: 'Learning modules' }).count()) === 0, 'the menu stayed open after choosing a module')
    await button(page, 'Practice').click()
    await see(page, '1 to practice')
    await see(page, '0 of 4 taken')
    await page.keyboard.press('Escape')
    expect((await page.getByRole('region', { name: 'Practice' }).count()) === 0, 'Escape did not close the menu')
    await button(page, 'Practice').click()
    await page.getByRole('link', { name: /Review flashcards/ }).click()
    await see(page, 'Review due cards')
  },

  async 'formula sheet: shows formulas with sources and links to the lesson'(page) {
    await page.goto('/capm/sheet')
    await see(page, 'CPI = EV ÷ AC')
    await see(page, 'Channels = n(n − 1) ÷ 2')
    await see(page, 'Source:')
    await page.getByRole('link', { name: /Indices: CPI and SPI/ }).first().click()
    await inView(page, 'Indices: CPI and SPI')
  },

  async 'readiness estimate: worked out from quizzes and mock exams'(page) {
    // One perfect quiz out of the 12 in Domain 1: quizzes there stand at 1/12, so 0.36 x 1/12 = 3%.
    const quizzes = { 'capm/1-01-project-basics': { best: 10, last: 10, total: 10, attempts: 1, date: '2026-10-01T10:00:00.000Z' } }
    await seed(page, { quizzes })
    await page.goto('/dashboard')
    await see(page, 'Readiness estimate')
    await page.getByText('3%', { exact: true }).first().waitFor()
    // Add a mock exam with every answer right: Domain 1 = 0.6 x 1 + 0.4 x 1/12, the others 0.6. Total 61%.
    const domains = [54, 26, 30, 40].map((total) => ({ right: total, total }))
    const attempt = { mode: 'real', date: '2026-10-05T10:00:00.000Z', seconds: 9000, timedOut: false, picks: Array(150).fill(null), flags: [], right: 150, total: 150, domains }
    await seed(page, { quizzes, exams: { 'capm/mock-1': { attempts: [attempt] } } })
    await page.goto('/dashboard')
    await page.getByText('61%', { exact: true }).first().waitFor()
    await see(page, 'Weak spots from your mock exams')
    await page.goto('/')
    await page.getByRole('link', { name: /Readiness estimate 61%/ }).waitFor()
  },

  async 'study plan: mock exams get dates in the final review'(page) {
    const day = (n) => new Date(Date.now() + n * 86_400_000).toLocaleDateString('en-CA')
    const shown = (n) => new Date(Date.now() + n * 86_400_000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    await seed(page, { examDates: { capm: day(40) } })
    await page.goto('/plan')
    await see(page, 'Final review, 7 days.')
    for (const title of ['Mock exam 1', 'Mock exam 2', 'Mock exam 3', 'Mock exam 4']) await see(page, title)
    await see(page, 'in real exam mode. Its questions are new to you.')
    // Mock exam 1 opens the review; the unseen Mock exam 4 is two days before the exam.
    expect((await page.getByText(shown(33), { exact: true }).count()) >= 1, 'Mock exam 1 is not on the first review day')
    expect((await page.getByText(shown(38), { exact: true }).count()) === 1, 'Mock exam 4 is not two days before the exam')
    expect((await page.getByText('Not taken yet').count()) === 4, 'not all four mock exams are listed')
    // A review of two days only has room for one.
    await seed(page, { examDates: { capm: day(8) } })
    await page.goto('/plan')
    await see(page, 'The review is too short for all 4 mock exams, so 1 is scheduled.')
    expect((await page.getByText('Not taken yet').count()) === 1, 'more mock exams are scheduled than fit')
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
