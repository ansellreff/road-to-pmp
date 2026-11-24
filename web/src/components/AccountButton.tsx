import { closeAccount, openAccount, useAccountOpen } from '../lib/account'
import { useSync } from '../lib/sync'
import Icon from './Icon'
import MessageDialog from './MessageDialog'
import SyncPanel from './SyncPanel'

/**
 * Sign in, at the top right of every page, where websites usually put it. Signed in, it opens the account
 * window: sync now, the password for other devices, and sign out.
 */
export default function AccountButton() {
  const sync = useSync()
  const open = useAccountOpen()
  const signedIn = Boolean(sync.email)
  return (
    <>
      <button
        type="button"
        onClick={openAccount}
        aria-haspopup="dialog"
        aria-label={signedIn ? `Your account, signed in as ${sync.email}` : 'Sign in or create an account'}
        title={signedIn ? `Signed in as ${sync.email}` : 'Sign in or create an account'}
        className={`press flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-md border px-2.5 text-sm font-medium hover:border-ink sm:h-9 sm:min-w-0 ${
          signedIn ? 'border-plan bg-plan-soft text-plan' : 'border-edge bg-surface'
        }`}
      >
        <Icon name="user" size={16} />
        <span className="hidden sm:inline">{signedIn ? 'Account' : 'Sign in'}</span>
        {sync.status === 'error' && <span className="size-2 rounded-full bg-critical" aria-hidden="true" />}
      </button>
      {open && (
        <MessageDialog wide title={signedIn ? 'Your account' : 'Sign in'} onClose={closeAccount}>
          <SyncPanel />
        </MessageDialog>
      )}
    </>
  )
}
