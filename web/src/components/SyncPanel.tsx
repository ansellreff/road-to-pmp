import { useState } from 'react'
import { cancelSignIn, confirmCode, requestSignIn, setPassword, signInWithPassword, signOut, syncNow, useSync } from '../lib/sync'
import { btnPrimary, btnQuiet, input, note, section, subTitle } from '../lib/ui'
import Icon from './Icon'

/** Sign in to keep progress the same on every device. Optional; without it nothing leaves this browser. */
export default function SyncPanel() {
  const sync = useSync()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPasswordText] = useState('')
  const busy = sync.status === 'syncing'

  return (
    <section className={section}>
      <h2 className={subTitle}>Sync between your devices</h2>

      {sync.email ? (
        <>
          <p className={`${note} mt-1 max-w-2xl`}>
            Signed in as <span className="font-medium text-ink">{sync.email}</span>. Progress uploads a few seconds
            after each change and downloads when you open the site. Sign in with the same email on your other devices.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button className={btnQuiet} onClick={() => void syncNow()} disabled={busy}>
              <Icon name="practice" className="mr-2" />
              Sync now
            </button>
            <button className={btnQuiet} onClick={signOut}>
              Sign out on this device
            </button>
          </div>
          <form
            className="mt-6 flex flex-wrap items-end gap-2"
            onSubmit={async (event) => {
              event.preventDefault()
              if (await setPassword(password)) setPasswordText('')
            }}
          >
            <div>
              <label htmlFor="sync-new-password" className="block text-sm font-medium">
                Password for your other devices
              </label>
              <input
                id="sync-new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPasswordText(e.target.value)}
                className={`${input} mt-1 w-72 max-w-full`}
              />
            </div>
            <button className={btnQuiet} disabled={busy}>
              Save the password
            </button>
          </form>
          <p className={`${note} mt-2 max-w-2xl`}>
            Choose one here, at least 8 characters, then sign in on your other devices with this email and the password.
            You can be signed in on all of them at once, and no further emails are needed.
          </p>
        </>
      ) : sync.pendingEmail ? (
        <>
          <p className={`${note} mt-1 max-w-2xl`}>
            A sign-in email was sent to <span className="font-medium text-ink">{sync.pendingEmail}</span>. Open its link
            on this device, or type the 6-digit code from the email here.
          </p>
          <form
            className="mt-4 flex flex-wrap items-end gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              void confirmCode(code)
            }}
          >
            <div>
              <label htmlFor="sync-code" className="block text-sm font-medium">
                Code from the email
              </label>
              <input
                id="sync-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`${input} mt-1 w-40 tabular-nums`}
              />
            </div>
            <button className={btnPrimary} disabled={busy || code.trim().length < 6}>
              Sign in
            </button>
            <button type="button" className={btnQuiet} onClick={cancelSignIn}>
              Use another email
            </button>
          </form>
        </>
      ) : (
        <>
          <p className={`${note} mt-1 max-w-2xl`}>
            Sign in to keep your progress the same on your PC and your phone. You can be signed in on all your devices
            at once. The first time, you get an email with a link, which works once, on the device where you open it.
            After that you can choose a password and use it on your other devices. Without signing in, everything
            stays in this browser as before.
          </p>
          <form
            className="mt-4 flex flex-wrap items-end gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              void requestSignIn(email.trim())
            }}
          >
            <div>
              <label htmlFor="sync-email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="sync-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${input} mt-1 w-72 max-w-full`}
              />
            </div>
            <button className={btnPrimary} disabled={busy}>
              Send the sign-in email
            </button>
          </form>

          <h3 className="mt-7 text-sm font-semibold">Already chose a password on another device?</h3>
          <form
            className="mt-2 flex flex-wrap items-end gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              void signInWithPassword(email.trim(), password)
            }}
          >
            <div>
              <label htmlFor="sync-password-email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="sync-password-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${input} mt-1 w-72 max-w-full`}
              />
            </div>
            <div>
              <label htmlFor="sync-password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="sync-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPasswordText(e.target.value)}
                className={`${input} mt-1 w-56 max-w-full`}
              />
            </div>
            <button className={btnQuiet} disabled={busy}>
              Sign in with the password
            </button>
          </form>
        </>
      )}

      {sync.message && (
        <p className={`mt-3 text-sm ${sync.status === 'error' ? 'font-medium text-critical' : 'text-muted'}`} role="status">
          {sync.message}
          {sync.lastSync && sync.status === 'idle' ? ` Last synced at ${new Date(sync.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.` : ''}
        </p>
      )}
    </section>
  )
}
