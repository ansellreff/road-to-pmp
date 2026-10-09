import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-slate-600">Page not found.</p>
      <Link to="/" className="mt-3 inline-block text-indigo-700 underline">
        Back to home
      </Link>
    </div>
  )
}
