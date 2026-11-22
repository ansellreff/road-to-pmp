# Outside services

Every outside service the project uses: what it is for, under whose name, its free limits, and what must be renewed.
No passwords in this file. All accounts are yours; turn on two-step login (2FA) on each where you have not yet.

| Service | For | Account | Free limits that matter | Renew or watch |
|---|---|---|---|---|
| **GitHub** | The off-site copy of the project: the private repository `ansellreff/road-to-pmp` | Yours | Private repositories are free | Nothing to renew. The sign-in for uploads is stored by Git on this PC |
| **Vercel** | Hosts the website, rebuilt from GitHub after each upload: project `road-to-pmp`, address https://road-to-pmp.vercel.app | Yours (Hobby plan, free) | The free plan is for personal, non-commercial use. Usage limits are on Vercel's pricing page | Nothing to renew |
| **Supabase** | Sync between devices: one table with one row per person (`supabase/setup.sql`). Project `xvkdcaafiebmymkuikie` | Yours (free plan) | Built-in email sends only a few emails an hour | **A free project is paused after about a week without use.** Studying most days keeps it awake. If sync stops, open the Supabase dashboard and press Restore (see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)) |

Nothing in the project costs money. Before anything new is added that talks to an outside service, its price is
checked first (guideline, chapter 3).

## One-time setup of Supabase (done in CAPM Session 28d)

Kept here in case the project has to be set up again.

1. **SQL Editor:** paste the whole of `supabase/setup.sql` and press Run. It creates one table, with a rule that each
   signed-in person can read and change only their own row.
2. **Authentication, URL Configuration:** set **Site URL** to the website address, and add two **Redirect URLs**: the
   website address and `http://localhost:5173`. Without this the link in the sign-in email opens a page that does not
   exist.
3. Recommended, **Authentication, Emails:** in the "Magic Link" and "Confirm signup" templates add a line
   `Your code: {{ .Token }}`. Then the email also carries a 6-digit code you can type in.

The address and public key of the Supabase project are in `web/src/lib/syncConfig.ts`; both are meant to be public.
The key that gives full access is never put in the project (the upload check looks for it).
