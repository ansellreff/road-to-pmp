// Tests of the rules that need no browser: how answers are stored and marked.
// Run by "npm test" before the click tests, or alone with: node tests/logic.mjs
import { breakLeftMs, breaksOf, currentSection, elapsedMs, onBreak, sectionBounds, withBreakEnded, withBreakStarted } from '../src/lib/exam.ts'
import { decodeMatch, decodeMulti, encodeMatch, encodeMulti, isAnswerComplete, isComplete, matchAnswer, matchResults, multiAnswer, seededOrder } from '../src/lib/answers.ts'

let failed = 0
function check(name, condition) {
  if (!condition) {
    failed++
    console.log(`FAIL  rules: ${name}`)
  }
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// A matching answer is one number: a digit per left-hand item, 0 for "not chosen yet".
check('choices become digits', encodeMatch([2, 0, 1]) === 312)
check('an unchosen item is a zero', encodeMatch([2, null, 1]) === 302)
check('digits become choices again', same(decodeMatch(312, 3), [2, 0, 1]))
check('a leading zero survives', same(decodeMatch(encodeMatch([null, 1, 0]), 3), [null, 1, 0]))
check('nothing chosen is all nulls', same(decodeMatch(null, 4), [null, null, null, null]))
check('five pairs fit', same(decodeMatch(encodeMatch([4, 3, 2, 1, 0]), 5), [4, 3, 2, 1, 0]))

// The fully right answer follows from the order in which the right-hand items are shown.
// Shown order [2, 0, 1] puts the partner of left 0 in position 1, of left 1 in position 2, of left 2 in position 0.
check('the right answer for a shown order', matchAnswer([2, 0, 1]) === encodeMatch([1, 2, 0]))
check('a right answer equals the stored answer', encodeMatch([1, 2, 0]) === matchAnswer([2, 0, 1]))
check('one wrong pair is not the stored answer', encodeMatch([1, 0, 2]) !== matchAnswer([2, 0, 1]))
check('an unfinished answer is not the stored answer', encodeMatch([1, 2, null]) !== matchAnswer([2, 0, 1]))

// Marking pair by pair, for the review.
check('pairs marked one by one', same(matchResults(encodeMatch([1, 0, 0]), matchAnswer([2, 0, 1]), 3), [true, false, true]))
check('an unchosen pair is wrong', same(matchResults(encodeMatch([1, null, 0]), matchAnswer([2, 0, 1]), 3), [true, false, true]))

// Complete or not. A single-answer pick is complete as soon as there is one.
check('no pick is incomplete', !isComplete(null))
check('a single pick is complete', isComplete(0))
check('a matching answer with a gap is incomplete', !isComplete(encodeMatch([1, null, 0]), 3))
check('a full matching answer is complete', isComplete(encodeMatch([1, 2, 0]), 3))

// The shuffle for module quizzes: always the same for the same question, never the original order.
for (const n of [3, 4, 5]) {
  for (const seed of ['q1', 'q2', 'q31Which pairs', 'a', '']) {
    const order = seededOrder(seed, n)
    check(`shuffle of ${n} for "${seed}" holds every item once`, same([...order].sort(), [...Array(n).keys()]))
    check(`shuffle of ${n} for "${seed}" is not the original order`, !order.every((v, i) => v === i))
    check(`shuffle of ${n} for "${seed}" is repeatable`, same(order, seededOrder(seed, n)))
  }
}

// Multiple response (PMP): a bit per option as shown.
check('options A and C are 5', encodeMulti([0, 2]) === 5)
check('5 is options A and C again', same(decodeMulti(5), [0, 2]))
check('nothing chosen is no options', same(decodeMulti(null), []))
// Right options 1 and 4 in the file, shown in the order [4, 0, 1, 3, 2]: they appear as B (1) and A (4).
check('the right answer follows the shown order', multiAnswer([1, 4], [4, 0, 1, 3, 2]) === encodeMulti([2, 0]))
const multi = { type: 'multi', choose: 2 }
check('one of two chosen is incomplete', !isAnswerComplete(encodeMulti([1]), multi))
check('two of two chosen is complete', isAnswerComplete(encodeMulti([1, 3]), multi))
check('three when two are asked is not complete', !isAnswerComplete(encodeMulti([0, 1, 3]), multi))
// Pull-down lists store a digit per blank, like matching.
const dropdown = { type: 'dropdown', blanks: [{}, {}, {}] }
check('a pull-down list with a blank left is incomplete', !isAnswerComplete(encodeMatch([1, null, 0]), dropdown))
check('a pull-down list with every blank is complete', isAnswerComplete(encodeMatch([1, 2, 0]), dropdown))
// Matching and single answers behave exactly as before.
check('matching completeness is unchanged', isAnswerComplete(encodeMatch([1, null, 0]), { type: 'match', left: [1, 2, 3] }) === isComplete(encodeMatch([1, null, 0]), 3))
check('a single answer is complete with any pick', isAnswerComplete(0, {}) && !isAnswerComplete(null, {}))

// Sections and breaks. CAPM: two halves of 75. PMP: three sections of 60.
check('two sections are the two halves', same(sectionBounds(150, 2, 0), [0, 75]) && same(sectionBounds(150, 2, 1), [75, 150]))
check('three sections of 60', same([0, 1, 2].map((i) => sectionBounds(180, 3, i)), [[0, 60], [60, 120], [120, 180]]))
check('nine questions in three sections', same([0, 1, 2].map((i) => sectionBounds(9, 3, i)), [[0, 3], [3, 6], [6, 9]]))
const MIN = 60000
const start = 1_000_000_000_000
// An exam in progress saved by the CAPM app as it was on 2026-10-13: one break, in the old fields.
const oldRun = { mode: 'real', startedAt: start, picks: [0, null], flags: [], breakStartedAt: start + 60 * MIN, breakEndedAt: start + 66 * MIN }
check('an old saved run has one break', breaksOf(oldRun).length === 1 && currentSection(oldRun, 2) === 1)
check('an old saved run: the break is taken out of the exam time', elapsedMs(oldRun, start + 100 * MIN) === 94 * MIN)
check('an old saved run is not on a break any more', !onBreak(oldRun, start + 70 * MIN))
const onFirst = { ...oldRun, breakEndedAt: undefined }
check('an old run on its break: four minutes left after six', onBreak(onFirst, start + 66 * MIN) && breakLeftMs(onFirst, start + 66 * MIN) === 4 * MIN)
check('a break left running ends by itself after ten minutes', elapsedMs(onFirst, start + 100 * MIN) === 90 * MIN && !onBreak(onFirst, start + 71 * MIN))
// A CAPM run starts and ends its break in the old fields, so its saved form is unchanged.
const capm = withBreakEnded(withBreakStarted({ mode: 'real', startedAt: start, picks: [], flags: [] }, start + 5), start + 9)
check('CAPM keeps its break in the old fields', capm.breakStartedAt === start + 5 && capm.breakEndedAt === start + 9 && capm.moreBreaks === undefined)
// PMP: a second break goes into moreBreaks; both are taken out of the exam time.
const second = withBreakStarted(capm, start + 20)
check('a second break opens the third section', breaksOf(second).length === 2 && currentSection(second, 3) === 2 && onBreak(second, start + 25))
const pmp = withBreakEnded(second, start + 30)
check('both breaks are taken out of the exam time', elapsedMs(pmp, start + 100) === 100 - 4 - 10 && !onBreak(pmp, start + 31))

if (failed) {
  console.log(`\n${failed} rule test(s) failed`)
  process.exit(1)
}
console.log('ok    rules: answers are stored and marked correctly for every question type; exam sections and breaks')
