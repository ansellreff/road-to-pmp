# Outside services

Every outside service the project uses: what it is for, under whose name, its free limits, and what must be renewed.
No passwords in this file. All accounts are yours; turn on two-step login (2FA) on each where you have not yet.

| Service | For | Account | Free limits that matter | Renew or watch |
|---|---|---|---|---|
| **GitHub** | The off-site copy of the project: the private repository `ansellreff/road-to-pmp` | Yours | Private repositories are free | Nothing to renew. The sign-in for uploads is stored by Git on this PC |
| **Vercel** | Hosts the website, rebuilt from GitHub after each upload: project `road-to-pmp`, address https://road-to-pmp.vercel.app | Yours (Hobby plan, free) | The free plan is for personal, non-commercial use. Usage limits are on Vercel's pricing page | Nothing to renew |
| **Supabase** | Sync between devices: one table with one row per person (`supabase/setup.sql`). Your PMI books online, private to you (`supabase/books.sql`). Project `xvkdcaafiebmymkuikie` | Yours (free plan) | Free plan, checked on supabase.com on 24 Nov 2026: **1 GB file storage** (the books use 153 MB), **50 MB per file** (largest book 30 MB), **5 GB downloads a month** plus 5 GB from the cache (the books stop at 4 GB, enforced in the project), 500 MB database, 2 active projects. Over a quota the free plan is **not charged**: you get an email, a grace period, then restrictions (paused project, read-only, refused requests) until the next month. Built-in email sends only a few emails an hour | **A free project is paused after about a week without use.** Studying most days keeps it awake. If sync stops, open the Supabase dashboard and press Restore (see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)). Keep the plan on **Free** with no card on file, and nothing can be charged |

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

## One-time setup of the online books (24 Nov 2026)

Makes the source links open your books on the website too, for your account only.

1. Go to supabase.com, open your project, then **SQL Editor** → **New query**. Open `supabase/books.sql` from the
   project folder in Notepad, copy all of it, paste it, and press **Run**. It should say "Success. No rows returned".
2. Still in the SQL Editor, start a new query and paste this line, with your sign-in email between the quotes, then
   press **Run**. It should say "Success" with 1 row:
   `insert into public.book_readers (user_id) select id from auth.users where email = 'your sign-in email' on conflict do nothing;`
3. Open **Storage** in the left menu, then the bucket **books** (it shows a lock: private). Press **Upload files**, go to
   `D:\Claude Project\Road to PMI PMP\.cache\books-upload`, select all 19 PDFs (Ctrl+A), and press **Open**. Wait
   until all 19 are listed. Keep the file names as they are (for example `pmbok8.pdf`).
4. On the website, sign in on the home page, open any lesson and click **Open the PDF at page …**.

The folder `.cache\books-upload` is a copy made for this upload. Once the books open on the website, it can be
deleted (ask Claude to). To replace a book later, upload it again with the same name.

The address and public key of the Supabase project are in `web/src/lib/syncConfig.ts`; both are meant to be public.
The key that gives full access is never put in the project (the upload check looks for it).
