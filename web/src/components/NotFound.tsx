import { Link } from 'react-router-dom'
import { btnPrimary } from '../lib/ui'
import { PageHeader } from './Page'

export default function NotFound() {
  return (
    <div>
      <PageHeader title="This page does not exist">
        The address may be mistyped, or the module has not been written yet.
      </PageHeader>
      <Link to="/" className={`${btnPrimary} mt-6`}>
        Go to your certification path
      </Link>
    </div>
  )
}
