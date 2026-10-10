import { useSyncExternalStore } from 'react'
import { mergeProgress } from './merge'
import { getProgress, onProgressChange, replaceProgress, type Progress } from './progress'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './syncConfig'

// Sync between devices. Optional: nothing here runs until you sign in.
//
// Each device remembers when the online copy last matched its own. On a sync:
//   - only this device changed since then  -> upload it
//   - only the online copy changed         -> take it
//   - both changed                         -> merge them (see merge.ts), then upload
// So a deletion made on one device reaches the others, unless both were changed apart.

interface Session {
  accessToken: string
  refreshToken: string
  /** When the access token stops working, in milliseconds. */
  expiresAt: number
  userId: string
  email: string
}

interface Saved {
  session?: Session
  /** The online copy's time stamp when this device last matched it. */
  syncedAt?: string
  /** When this device last changed something that has not been uploaded yet. */
  changedAt?: number
  /** The address a sign-in email was sent to, while waiting for the link or the code. */
  pendingEmail?: string
}

export interface SyncState {
  email?: string
  pendingEmail?: string
  status: 'off' | 'idle' | 'syncing' | 'error'
  /** A sentence for the person: what happened, or what went wrong and what to do. */
  message: string
  lastSync?: number
}

const KEY = 'road-to-pmi-sync'
// Wait this long after a change before uploading, so a burst of answers is one upload.
const UPLOAD_DELAY_MS = 4000

function load(): Saved {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

let saved = load()
let state: SyncState = {
  email: saved.session?.email,
  pendingEmail: saved.pendingEmail,
  status: saved.session ? 'idle' : 'off',
  message: '',
}
const listeners = new Set<() => void>()

function save(next: Saved) {
  saved = next
  try {
    localStorage.setItem(KEY, JSON.stringify(saved))
  } catch {
    // signed in for this visit only
  }
}

function show(next: Partial<SyncState>) {
  state = { ...state, ...next }
  listeners.forEach((l) => l())
}

export function useSync(): SyncState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => state,
  )
}

class SyncError extends Error {}

/** One request to the Supabase project. Throws a SyncError with a sentence a person can act on. */
async function call(path: string, options: { method?: string; body?: unknown; token?: string; headers?: Record<string, string> } = {}) {
  let response: Response
  try {
    response = await fetch(`${SUPABASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${options.token ?? SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })
  } catch {
    throw new SyncError('The sync service could not be reached. Check your internet connection; your progress is still saved on this device.')
  }
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  if (!response.ok) {
    const detail: string = data?.msg ?? data?.message ?? data?.error_description ?? data?.error ?? `error ${response.status}`
    if (response.status === 404 && path.startsWith('/rest/')) {
      throw new SyncError('The online table for progress does not exist yet. Run supabase/setup.sql in the Supabase SQL editor once.')
    }
    if (response.status === 429) throw new SyncError('Too many sign-in emails were requested. Wait a few minutes and try again.')
    throw new SyncError(`The sync service answered: ${detail}`)
  }
  return data
}

const userIdOf = (accessToken: string): string => JSON.parse(atob(accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).sub

function signedIn(tokens: { access_token: string; refresh_token: string; expires_in: number | string }, email: string) {
  const session: Session = {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt: Date.now() + Number(tokens.expires_in) * 1000,
    userId: userIdOf(tokens.access_token),
    email,
  }
  // Everything on this device counts as not yet uploaded, so the first sync merges it with the online copy.
  save({ session, changedAt: Date.now() })
  show({ email, pendingEmail: undefined, status: 'idle', message: 'Signed in.' })
  void syncNow()
}

/** Ask for a sign-in email. It carries a link, and a 6-digit code if the email template shows one. */
export async function requestSignIn(email: string) {
  show({ status: 'syncing', message: 'Sending the sign-in email' })
  try {
    await call(`/auth/v1/otp?redirect_to=${encodeURIComponent(window.location.origin)}`, {
      method: 'POST',
      body: { email, create_user: true },
    })
    save({ ...saved, pendingEmail: email })
    show({ status: 'off', pendingEmail: email, message: `A sign-in email is on its way to ${email}.` })
  } catch (error) {
    show({ status: 'off', message: (error as Error).message })
  }
}

/** Finish signing in with the code from the email. */
export async function confirmCode(code: string) {
  const email = saved.pendingEmail
  if (!email) return
  show({ status: 'syncing', message: 'Checking the code' })
  try {
    const tokens = await call('/auth/v1/verify', { method: 'POST', body: { type: 'email', email, token: code.trim() } })
    signedIn(tokens, email)
  } catch (error) {
    show({ status: 'off', message: (error as Error).message })
  }
}

export function cancelSignIn() {
  save({ ...saved, pendingEmail: undefined })
  show({ pendingEmail: undefined, message: '' })
}

export function signOut() {
  const token = saved.session?.accessToken
  if (token) void call('/auth/v1/logout', { method: 'POST', token }).catch(() => undefined)
  save({})
  show({ email: undefined, status: 'off', message: 'Signed out. Your progress stays on this device.', lastSync: undefined })
}

/** A valid access token, renewed first if it is about to run out. */
async function token(): Promise<string> {
  const session = saved.session
  if (!session) throw new SyncError('Not signed in.')
  if (session.expiresAt - Date.now() > 60_000) return session.accessToken
  try {
    const tokens = await call('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: session.refreshToken } })
    save({
      ...saved,
      session: { ...session, accessToken: tokens.access_token, refreshToken: tokens.refresh_token, expiresAt: Date.now() + tokens.expires_in * 1000 },
    })
    return tokens.access_token
  } catch (error) {
    // A sign-in that can no longer be renewed is over; the progress on this device is untouched.
    if (!(error as Error).message.includes('could not be reached')) {
      save({})
      show({ email: undefined, status: 'off', message: 'Your sign-in has expired. Sign in again to keep syncing.' })
    }
    throw error
  }
}

let running: Promise<void> | undefined
let again = false

/** Bring this device and the online copy into agreement. */
export function syncNow(): Promise<void> {
  if (!saved.session) return Promise.resolve()
  if (running) {
    again = true
    return running
  }
  running = (async () => {
    show({ status: 'syncing', message: 'Syncing' })
    try {
      const access = await token()
      const userId = saved.session!.userId
      const rows: { data: Progress; updated_at: string }[] = await call('/rest/v1/progress?select=data,updated_at', { token: access })
      const remote = rows[0]
      const startedChange = saved.changedAt
      // Compared as moments, not as text: the service writes the same time in another format.
      const remoteIsNew = Boolean(remote) && new Date(remote.updated_at).getTime() !== new Date(saved.syncedAt ?? 0).getTime()
      let message = 'Up to date.'

      let upload: Progress | undefined
      if (remoteIsNew && startedChange === undefined) {
        replaceProgress(remote.data)
        message = 'Progress from your other device was loaded.'
      } else if (remoteIsNew) {
        const local = getProgress()
        const localIsNewer = startedChange! >= new Date(remote.updated_at).getTime()
        upload = localIsNewer ? mergeProgress(local, remote.data) : mergeProgress(remote.data, local)
        replaceProgress(upload)
        message = 'This device and your other device were merged.'
      } else if (startedChange !== undefined || !remote) {
        upload = getProgress()
        message = 'Your progress was uploaded.'
      }

      let syncedAt = remote?.updated_at
      if (upload) {
        syncedAt = new Date().toISOString()
        await call('/rest/v1/progress?on_conflict=user_id', {
          method: 'POST',
          token: access,
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
          body: { user_id: userId, data: upload, updated_at: syncedAt },
        })
      }
      // A change made while this sync was running stays marked for the next one.
      save({ ...saved, syncedAt, changedAt: saved.changedAt === startedChange ? undefined : saved.changedAt })
      show({ status: 'idle', message, lastSync: Date.now() })
    } catch (error) {
      if (saved.session) show({ status: 'error', message: (error as Error).message })
    }
  })().finally(() => {
    running = undefined
    if (again || (saved.session && saved.changedAt !== undefined && state.status !== 'error')) {
      again = false
      schedule()
    }
  })
  return running
}

let timer = 0
function schedule() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => void syncNow(), UPLOAD_DELAY_MS)
}

/** Start syncing in this browser tab. Called once when the app starts. */
export function startSync() {
  // A sign-in link from the email returns here with the session in the address.
  const hash = new URLSearchParams(window.location.hash.slice(1))
  if (hash.get('access_token') && hash.get('refresh_token')) {
    const email = saved.pendingEmail ?? JSON.parse(atob(hash.get('access_token')!.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).email ?? ''
    history.replaceState(null, '', window.location.pathname + window.location.search)
    signedIn({ access_token: hash.get('access_token')!, refresh_token: hash.get('refresh_token')!, expires_in: hash.get('expires_in') ?? 3600 }, email)
  } else if (hash.get('error_description')) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    // The usual reasons: the link was already opened once (each link works a single time, on one
    // device), a newer email replaced it, or it is more than an hour old.
    save({ ...saved, pendingEmail: undefined })
    show({
      pendingEmail: undefined,
      message: `That sign-in link could not be used (${hash.get('error_description')!.replace(/\+/g, ' ').toLowerCase()}). A link works once, on one device, and only the newest email counts. Ask for a new email from this device and open its link here.`,
    })
  }

  onProgressChange(() => {
    if (!saved.session) return
    save({ ...saved, changedAt: Date.now() })
    schedule()
  })
  // Coming back to the tab is the moment the other device may have changed something.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void syncNow()
  })
  void syncNow()
}
