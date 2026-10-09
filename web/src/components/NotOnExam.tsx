/** The red asterisk that marks a module as additional information, not exam content. */
export function ExamStar() {
  return (
    <strong className="font-bold text-critical" title="Additional information, not part of the exam">
      *
    </strong>
  )
}

export default function NotOnExamNote({ className = '' }: { className?: string }) {
  return (
    <p className={`font-bold text-critical ${className}`}>
      * Additional information, not part of the exam. It does not count toward your progress.
    </p>
  )
}
