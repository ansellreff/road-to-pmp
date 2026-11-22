# When something breaks

What you see, and what to do. Built from the issues logs; if something here does not help, show Claude the window or
the page.

| What you see | What to do |
|---|---|
| http://localhost:5173 does not open | Double-click `start.bat` in the project folder and wait for the browser to open. Keep the black window open while you study |
| A book link does not open, or Edge asks for a password | Book links work only on this PC, with `start.bat`. If Edge asks for a password, the unlocked copy is missing: ask Claude to run `tools/unlock_pdfs.py` |
| The website shows an old version | Look at the version at the bottom of the page and compare it with What's new on this PC. Wait a minute after `upload.bat`. If it is still old: Vercel, your project, **Deployments**, the top one, the **⋯** menu, **Redeploy** |
| `upload.bat` says the check failed | Nothing was uploaded. Show the window to Claude: it names the file and the reason (a book, a private detail or a secret) |
| `test.bat` says it cannot connect | The app is not running: double-click `start.bat` first, then `test.bat` again |
| The sign-in email does not arrive | The free email service sends only a few an hour. Wait half an hour, then ask again. On a device already signed in, use a password instead (see Help, Sync between your devices) |
| The link in the sign-in email opens a page that does not exist | The address is missing in Supabase: Authentication, URL Configuration (see [ACCOUNTS.md](ACCOUNTS.md)) |
| Sync stopped working after some days without study | The free Supabase project was paused. Open https://supabase.com/dashboard, choose the project, and press **Restore project**. It takes a few minutes |
| My progress is missing on the website or the phone | Progress belongs to one browser and one address. Sign in to sync on that device, or use Download backup here and Restore from backup there |
| Progress from the old address (`road-to-pmp-d82g.vercel.app`, until 23 Nov 2026) is missing, and it was never synced | Vercel, project **road-to-pmp**, **Settings**, **Domains**, **Add Domain**: `road-to-pmp-d82g.vercel.app`. Open that address on the device, press **Download backup**, then open https://road-to-pmp.vercel.app and press **Restore from backup**. Afterwards you can remove the old domain again |
