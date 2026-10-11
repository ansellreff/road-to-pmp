# Road to PMP: project overview

A personal web learning platform for PMI certifications, built step by step. This file is the starting point: where each certification stands, the rules of the project, and how the platform is run. The detail lives in one plan file and one issues file per certification.

## The documents

| Certification | Plan and progress | Issues and how they were handled |
|---|---|---|
| CAPM | [docs/CAPM-PLAN.md](docs/CAPM-PLAN.md) | [docs/CAPM-ISSUES.md](docs/CAPM-ISSUES.md) |
| PMP | [docs/PMP-PLAN.md](docs/PMP-PLAN.md) | [docs/PMP-ISSUES.md](docs/PMP-ISSUES.md) |
| PMI-ACP | [docs/PMI-ACP-PLAN.md](docs/PMI-ACP-PLAN.md) | [docs/PMI-ACP-ISSUES.md](docs/PMI-ACP-ISSUES.md) |
| PMI-SP | [docs/PMI-SP-PLAN.md](docs/PMI-SP-PLAN.md) | [docs/PMI-SP-ISSUES.md](docs/PMI-SP-ISSUES.md) |

How they are kept:

- A **plan file** holds that certification's status log, exam facts, roadmap, sources, coverage of the exam outline and what each session built. It is updated whenever something is achieved.
- An **issues file** holds every problem met while working on that certification and how it was handled. Sessions and issue entries are numbered **per certification**: each starts its own count at 1 (PMP's issues are written PMP-1, PMP-2 and so on). "Where to look" in an entry names a section of the same certification's plan file, or a file in the project.
- The platform itself (the app, the tools, sync, the website) was built during the CAPM sessions, so its record is in the CAPM files: Sessions 26 to 29 in the plan, and the matching groups in the issues file. Platform work done for a later certification is recorded with that certification.
- This overview changes only when a certification changes state or a project-wide rule changes.

## Where each certification stands

| | Certification | State | Next |
|---|---|---|---|
| 🟡 | CAPM | **Being finished.** Built and online: 39 modules, 1,114 questions, 1,315 flashcards, 5 mock exams. Sessions 32 and 33 closed the thin outline item, the small Domain 1 quizzes and the first part of the deeper accuracy check. Still open, Sessions 34 to 39: the rest of that check, the real exam's question types, drawings. | CAPM Session 34 |
| ⏸️ | PMP | **Paused until CAPM is finished.** PMP Session 1 done: sources read, 34 modules mapped to the outline, course skeleton in the app. | PMP Session 2, the exam engine |
| ⬜ | PMI-ACP | Not started | Needs its Exam Content Outline in the materials folder |
| ⬜ | PMI-SP | Not started | Needs its Exam Content Outline in the materials folder |

## Goal

Study for and pass PMI certifications using my own platform, in this order:

1. **CAPM** (Certified Associate in Project Management): current focus, being finished
2. PMP (Project Management Professional): started, paused
3. PMI-ACP (Agile Certified Practitioner)
4. PMI-SP (Scheduling Professional)

## Decisions

| Topic | Decision |
|---|---|
| Technology | Vite + React + TypeScript, Tailwind CSS (static web app) |
| Hosting | Localhost first, then Vercel free tier via a private GitHub repository |
| Progress saving | In the browser (localStorage) with export/import backup. Optional sync between devices since Session 28d |
| Language | English only |
| Devices | Desktop first, mobile layout after |
| Visual design | Styled like a project schedule. Colors: paper `#F4F6F8`, ink `#14213D`, schedule blue `#2B4FD8` (in progress), green `#1B7F6B` (done), critical red `#C81E3A` (mistakes only), amber `#B97A00` (examples and notes). Fonts: Archivo for the interface, Literata for lesson text, both stored in the project so it works offline. Tokens live in `web/src/index.css` |
| Isolation | Nothing installed in Windows. Node.js and Git are portable copies in `.tools/`, Python libraries in `.venv/`. Deleting the project folder removes everything |
| Book edition | **PMBOK Guide 8th edition is the primary reference** (decided 2026-10-09): 6 principles, 7 performance domains, 5 focus areas. Lessons add a short "edition note" where the 7th edition worded things differently, and module 1.11 bridges the 7th-edition terms (12 principles, 8 domains) that the instructor course and some exam questions may still use |

## Ground rules

- **Copyright:** the site contains only original summaries, quiz questions and flashcards, with chapter references to the PMI books. The PDFs and instructor screenshots stay on this PC and are never uploaded.
- **Token saving:** one module per session. Book text is extracted once to a local cache so each session reads only the pages it needs.
- **Web research:** only for specific facts. If a source is blocked or paywalled, Claude asks instead of forcing access.
- **Pace:** slow and verified. Each session ends with a review before moving on.

## How to start the app on this PC

Double-click `start.bat` in the project folder. It opens http://localhost:5173 in the browser. Close the black window to stop it.

In a VS Code terminal you can instead run `. .\env.ps1` once, then `cd web` and `npm run dev`.

## How your progress is saved

- Saved automatically in the browser the moment you click. Closing the browser or shutting down the PC does **not** reset it.
- It is tied to one browser on one device and one address: progress on `localhost` and on the Vercel site are separate, and so are PC and phone. Use **Download backup / Restore from backup** on the home page to move it.
- It is lost only if you clear the browser's site data, or use a private/incognito window.
- Flashcards use spaced repetition. A card you know comes back after 1 day, then 3, 7, 14 and 30 days. A card you miss comes back the same day. The home page shows how many are due and starts a review session across all modules.
- Every mark can be changed: in each module, the "Your progress in this module" panel lets you remove the lesson-completed mark, clear the quiz score, and reset the flashcards. A single flashcard can be re-rated any time.
- The **Dashboard** (link in the top bar) shows your study streak, progress and quiz average per exam domain, and the modules to revisit. Every quiz answer is now remembered per question. A question you got wrong goes into **Practice missed questions** and leaves once you answer it correctly. Clearing a module's quiz score also clears its question history. Quizzes taken before 2026-10-10 kept their scores but have no per-question history.
- The **Study plan** (link in the top bar) stores one thing: your exam day. Everything else on it is worked out fresh each day from what you have not finished, so a missed day spreads over the days left and nothing piles up. A quarter of the time before the exam, at most 7 days, is kept for final review. Modules not written yet are included so the pace is realistic. Removing the date removes the plan; your progress is untouched.
- **Mock exams** (link in the top bar): starting one starts a 3-hour clock that runs on real time, also while the page or the browser is closed. Each answer is saved as you give it, so you can close the page and continue, but the time keeps passing. When the time is up the exam is submitted as it stands the next time you open it. A finished exam stores your answers, flags, time used and score, and the last result per mode is shown on the list. Answered questions go into the per-question history, so wrong ones appear in **Practice missed questions**; unanswered ones do not. "Stop without a result" discards the answers of that run. The exam's 10-minute break does not use exam time and ends by itself.
- **Reading position:** each lesson remembers the last section you reached and offers "Continue from" next time. **Time per question** is recorded in mock exams taken from 2026-10-10 on. Both are part of your saved progress and of the backup file.

## Sources and PDF links

- **Lesson:** each section shows its source directly under the section heading, with a link.
- **Quiz:** every explanation shows its source (book, section) with a link.
- **Flashcards and quiz tabs:** a "Sources for this module" list sits below.
- A link opens the PDF from `PMI Learning Material/` in a new browser tab at the page where that section starts. "PDF page" is the page number your PDF viewer shows, not the number printed on the page.
- The links work only when the platform runs on this PC (`start.bat`). The PDFs are licensed to you personally and are never uploaded, so on the future website the same place shows the book and page as plain text.
- Flashcards do not have a page each; they use the module's source list.
- The PMBOK Guides, the two Agile Practice Guides and the six PMI standards and practice guides used as sources are protected by PMI in a way the Edge browser cannot open (it asks for a password). The links therefore use unlocked copies stored in `.cache/pdf/`, made by `tools/unlock_pdfs.py` at your request on 2026-10-10. The copies stay on this PC, are excluded from Git, and still carry your name and member ID on each page. Your original files are untouched.
- If a PDF is renamed or a new book is added, update `web/src/content/books.json`, then run `tools/extract_pdf.py` and `tools/unlock_pdfs.py`. The running server picks up a new book straight away; no restart is needed.
- A red **\*** marks a module as additional information that is not part of the exam. No module is marked this way at present (1.11 became exam content in Session 25b).

## The website

- **Address:** https://road-to-pmp-d82g.vercel.app (Vercel project `road-to-pmp-d82g`, built from the `web` folder of the private GitHub repository `ansellreff/road-to-pmp`).
- **Updating it:** double-click `upload.bat` in the project folder. It runs the safety check and uploads; Vercel rebuilds the site about a minute later. Nothing reaches the website until you do this.
- **What is not on it:** the PDFs. Sources show as book and page number without a link. On this PC (`start.bat`) the links still open the PDFs.
- **Progress** on the website is separate from progress on this PC and from your phone, until sync is built (Session 28d). Use Download backup and Restore from backup on the home page to move it.
- Anyone who has the address can open the site. It is not listed by search engines.

## Sync between devices

Optional. Until you sign in on the home page, nothing leaves your browser and everything works as before.

**One-time setup in your Supabase project** (`xvkdcaafiebmymkuikie`)
1. **SQL Editor:** paste the whole of `supabase/setup.sql` and press Run. It creates one table, with a rule that each signed-in person can read and change only their own row.
2. **Authentication, URL Configuration:** set **Site URL** to `https://road-to-pmp-d82g.vercel.app`, and add two **Redirect URLs**: `https://road-to-pmp-d82g.vercel.app` and `http://localhost:5173`. Without this the link in the sign-in email opens a page that does not exist.
3. Recommended, **Authentication, Emails:** in the "Magic Link" and "Confirm signup" templates add a line `Your code: {{ .Token }}`. Then the email also carries a 6-digit code you can type in. A code is not used up by opening the email, so it is the dependable way when a link is refused or when you read the email on another device.

**Using it**
- Home page, "Sync between your devices": enter your email, open the link in the email on that device (or type the code). Do this once on each device: every device needs its own email, because a link works a single time and only the newest email counts.
- **Several devices at once:** on a device that is signed in, save a password under "Password for your other devices". On every other device use "Sign in with the password". All of them stay signed in together; no email is needed after the first one. "Sign out on this device" affects that device only.
- Progress uploads about 4 seconds after a change, and downloads when you open the site or come back to its tab. "Sync now" does both at once.
- If only one device changed since they last agreed, the other simply takes its progress, including deletions. If both changed while apart, they are merged: lessons, scores, flashcards, answers and mock exam attempts from both are kept, and where both changed the same thing the later change wins.
- Signing out stops syncing and leaves your progress on the device.

**What is stored online:** one row with a copy of your progress (the same content as the backup file) and your email address as the sign-in. The address and public key of the project are in `web/src/lib/syncConfig.ts`; both are meant to be public.

**Limits**
- Supabase's built-in email service sends only a few emails an hour. If a sign-in email does not arrive, wait before asking again.
- A free Supabase project is paused after about a week without use and must be woken from its dashboard. Studying most days keeps it awake.
- A deletion made on one device while the other was also changed, before either synced, can come back through the merge. Press "Sync now" on both devices before deleting things if that matters.
- The dark or light theme, text size and last-opened certification are per device and are not synced.
