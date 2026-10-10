import { getExams, type Course } from './content'
import { examKey } from './exam'
import { studyStreak, type Progress } from './progress'
import { answerTotals, domainCompletion } from './stats'

// Milestones are worked out from progress that already exists, so none can be lost
// and none needs to be stored. The only thing kept is which ones have been announced.

export interface MilestoneState {
  id: string
  title: string
  /** What earns it, for the ones still open. */
  how: string
  earned: boolean
}

export function milestones(course: Course, progress: Progress): MilestoneState[] {
  const key = (moduleId: string) => `${course.id}/${moduleId}`
  const moduleKeys = new Set(course.domains.flatMap((d) => d.modules.map((m) => key(m.id))))
  const quizzes = Object.entries(progress.quizzes).filter(([k]) => moduleKeys.has(k))
  const attempts = getExams(course.id).map((exam) => progress.exams[examKey(course.id, exam.id)]?.attempts ?? [])
  const everyAttempt = attempts.flat()
  const answered = answerTotals(progress).answered
  const streak = studyStreak(progress)

  const list: MilestoneState[] = [
    { id: 'first-lesson', title: 'First lesson completed', how: 'Mark any lesson as completed.', earned: Object.keys(progress.lessons).some((k) => moduleKeys.has(k)) },
    { id: 'first-quiz', title: 'First quiz passed', how: 'Score 70% or more in any module quiz.', earned: quizzes.some(([, q]) => q.best / q.total >= 0.7) },
    ...course.domains.map((domain, i) => ({
      id: `domain-${i + 1}`,
      title: `Domain ${i + 1} completed`,
      how: `Finish every module of ${domain.title}: lesson read, quiz at 70%, flashcards known.`,
      earned: domainCompletion(course, domain, progress) >= 1,
    })),
    { id: 'answers-100', title: '100 questions answered', how: 'Answer 100 quiz or exam questions.', earned: answered >= 100 },
    { id: 'answers-500', title: '500 questions answered', how: 'Answer 500 quiz or exam questions.', earned: answered >= 500 },
    { id: 'streak-7', title: '7-day study streak', how: 'Study on 7 days in a row.', earned: streak >= 7 },
    { id: 'streak-30', title: '30-day study streak', how: 'Study on 30 days in a row.', earned: streak >= 30 },
    { id: 'first-mock', title: 'First mock exam finished', how: 'Submit any mock exam.', earned: everyAttempt.length > 0 },
    { id: 'mock-70', title: 'A mock exam at 70% or more', how: 'Score 70% or more in a mock exam.', earned: everyAttempt.some((a) => a.right / a.total >= 0.7) },
    { id: 'all-mocks', title: 'All mock exams taken', how: 'Finish each of the mock exams once.', earned: attempts.length > 0 && attempts.every((a) => a.length > 0) },
  ]
  // A streak can end, but a milestone once announced stays earned.
  const announced = new Set(progress.milestonesShown ?? [])
  return list.map((m) => ({ ...m, id: `${course.id}/${m.id}`, earned: m.earned || announced.has(`${course.id}/${m.id}`) }))
}
