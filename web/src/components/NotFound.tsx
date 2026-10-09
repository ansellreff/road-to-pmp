import { Link } from 'react-router-dom'
import { link } from '../lib/ui'

export default function NotFound() {
  return (
    <div className="py-16">
      <h1 className="title text-3xl">This page does not exist</h1>
      <p className="mt-2 text-muted">The address may be mistyped, or the module has not been written yet.</p>
      <Link to="/" className={`${link} mt-4 inline-block`}>
        Go to your certification path
      </Link>
    </div>
  )
}
