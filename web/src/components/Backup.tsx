import { useRef, useState } from 'react'
import { exportProgress, importProgress, resetProgress } from '../lib/progress'
import { clearRuns } from '../lib/quizRun'
import { toast } from '../lib/toast'
import { btnDanger, btnQuiet, note } from '../lib/ui'
import MessageDialog from './MessageDialog'

/** Download a backup of your progress, restore one, or delete the progress in this browser (Settings). */
export default function Backup() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')
  const [asking, setAsking] = useState(false)

  function download() {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `road-to-pmp-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMessage('Backup downloaded.')
    toast('Backup downloaded')
  }

  async function upload(file: File | undefined) {
    if (!file) return
    try {
      importProgress(await file.text())
      setMessage('Progress restored from backup.')
      toast('Progress restored from backup')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'That file could not be read. Choose a backup downloaded from this page.')
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  return (
    <>
      <p className={`${note} max-w-2xl`}>
        Progress saves automatically in this browser and stays after you close it. A backup file is a copy you keep
        yourself; it also moves progress to another device without signing in.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btnQuiet} onClick={download}>
          Download backup
        </button>
        <button type="button" className={btnQuiet} onClick={() => fileInput.current?.click()}>
          Restore from backup
        </button>
        <button type="button" className={btnDanger} onClick={() => setAsking(true)}>
          Delete all progress
        </button>
        <input ref={fileInput} type="file" accept="application/json" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
      </div>
      {message && (
        <p className="mt-3 text-sm" role="status">
          {message}
        </p>
      )}
      {asking && (
        <MessageDialog
          title="Delete all progress?"
          onClose={() => setAsking(false)}
          action={
            <button
              type="button"
              className={btnDanger}
              onClick={() => {
                resetProgress()
                clearRuns()
                setAsking(false)
                setMessage('All progress deleted.')
              }}
            >
              Delete all progress
            </button>
          }
        >
          Every quiz result, flashcard, mock exam and exam day saved in this browser is deleted. This cannot be undone,
          so download a backup first if you may want it back.
        </MessageDialog>
      )}
    </>
  )
}
