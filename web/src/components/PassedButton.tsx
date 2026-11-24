import { useState } from 'react'
import type { Course } from '../lib/content'
import { setPassed } from '../lib/progress'
import { toast } from '../lib/toast'
import { btnPrimary, btnQuiet } from '../lib/ui'
import Icon from './Icon'
import MessageDialog from './MessageDialog'

/**
 * "I passed this exam": hides the certification from the home page, the study plan and the dashboard, after a
 * confirmation. Nothing is deleted, and the mark can be taken off again. On a certification's page and in Settings.
 */
export default function PassedButton({ course, passed }: { course: Course; passed: boolean }) {
  const [asking, setAsking] = useState(false)
  if (passed) {
    return (
      <button
        type="button"
        className={btnQuiet}
        onClick={() => {
          setPassed(course.id, false)
          toast(`${course.title} is shown again on your study pages`)
        }}
      >
        Not passed yet: show it again
      </button>
    )
  }
  return (
    <>
      <button type="button" className={btnQuiet} onClick={() => setAsking(true)}>
        <Icon name="trophy" className="mr-2" />I passed this exam
      </button>
      {asking && (
        <MessageDialog
          title={`Mark ${course.title} as passed?`}
          onClose={() => setAsking(false)}
          action={
            <button
              type="button"
              className={btnPrimary}
              onClick={() => {
                setPassed(course.id, true)
                setAsking(false)
                toast(`${course.title} marked as passed`)
              }}
            >
              Mark as passed
            </button>
          }
        >
          It will no longer appear on the home page, in the study plan or on the dashboard. Its modules, quizzes, mock
          exams and your progress all stay, and you can take the mark off at any time, on its page or in Settings.
        </MessageDialog>
      )}
    </>
  )
}
