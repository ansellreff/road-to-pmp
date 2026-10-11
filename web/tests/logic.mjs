// Tests of the rules that need no browser: how answers are stored and marked.
// Run by "npm test" before the click tests, or alone with: node tests/logic.mjs
import { decodeMatch, encodeMatch, isComplete, matchAnswer, matchResults, seededOrder } from '../src/lib/answers.ts'

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

if (failed) {
  console.log(`\n${failed} rule test(s) failed`)
  process.exit(1)
}
console.log('ok    rules: answers are stored and marked correctly for every question type')
