# Decisions

Every important choice for the whole project: what was chosen, the other options, and why. Later sessions read this so
that good decisions are not undone. Choices for one certification only are in that certification's plan file (for
PMP: [PMP-PLAN.md](PMP-PLAN.md), "Decisions you made").

## Platform

| Date | Decision | Other options | Why |
|---|---|---|---|
| 9 Oct 2026 | Vite + React + TypeScript, Tailwind CSS: a static web app | A ready-made course platform | Free, works offline on this PC, and can be hosted for free |
| 9 Oct 2026 | Localhost first, then the Vercel free plan from a private GitHub repository | Hosting on this PC | The PC is never a server (guideline, chapter 2) |
| 9 Oct 2026 | Progress saved in the browser, with backup and restore. Optional sync between devices since CAPM Session 28d (Supabase, free) | An account from the start | Works without signing in; nothing leaves the browser until you choose sync |
| 9 Oct 2026 | English only | | The exam is taken in English |
| 9 Oct 2026 | Desktop first, then a phone layout | | Most study happens at the PC |
| 9 Oct 2026 | Visual design styled like a project schedule. Colours: paper `#F4F6F8`, ink `#14213D`, schedule blue `#2B4FD8` (in progress), green `#1B7F6B` (done), critical red `#C81E3A` (mistakes only), amber `#B97A00` (examples and notes). Fonts: Archivo for the interface, Literata for lesson text, stored in the project. The colours live in `web/src/index.css` | | Readable for 3-hour sittings, and one shared place for every page |
| 9 Oct 2026 | Nothing installed in Windows: Node.js and git in `.tools/`, Python libraries in `.venv/` | Normal installs | Your rule for every project. Deleting the project folder removes everything |
| 9 Oct 2026 | **PMBOK Guide 8th edition is the primary reference**, with "edition notes" where the 7th edition differs | The 7th edition | The current edition; module 1.11 bridges the 7th-edition terms the exam may still use |
| 10 Oct 2026 | Only you upload, by double-clicking `upload.bat` | Claude uploads | The upload needs your GitHub sign-in, and you decide when the website changes |
| 11 Oct 2026 | One plan file and one issues file per certification, with session and issue numbers starting at 1 for each | One file for everything | You asked for it; the single file had grown to 1,205 lines |
| 13 Oct 2026 | CAPM is closed: its content may not change (`tools/check_capm_frozen.py`) | | Finished as planned; later work must not break it |

## Following the guideline (23 Nov 2026)

From [GUIDELINE-study.md](GUIDELINE-study.md). You chose the recommended answer to every question.

| Decision | Other options | Why |
|---|---|---|
| **Exception to the guideline:** the per-certification plan and issues files stay, in place of `docs/ISSUES.md` and `docs/milestones/` (Q1) | Switch to the guideline's names | You chose this structure on 11 Oct 2026, and it works. Each certification plan holds its milestones as sessions |
| The app's first version is **1.0**: CAPM finished and PMP Sessions 1 to 3 (Q2) | 0.9 until PMP is finished | The CAPM course is complete and in use |
| One version per day; all of that day's changes share one entry (Q3) | A version per upload | Fewer, clearer entries |
| One **Help** item in the top bar: the guide, with What's new as a second tab (Q4) | Two items | One home for help; the top bar stays short |
| A warning when the free Supabase project is paused (S5) is left for later (Q5) | Build it now | It is a new feature, not a gap |
| watermarks-remover is used only to look for invisible characters, never to rewrite text (Q6). Its own service needs Docker, which would be installed in Windows, so the same search runs as `tools/check_invisible.py` | Rewrite text; not use it | Rewriting could change text checked against the books |
| `CHANGELOG.md` is the only place a version number is written. The app, `version.json` and `web/package.json` take it from there | The number in several files | One source for each thing (guideline, chapter 12) |
| Version tags (`v1.0`) stay on this PC and are not uploaded | Upload tags too | A tag moves when a second release is made on the same day, and uploading a moved tag would make `upload.bat` fail. Vercel keeps every earlier deployment for going back online |
| **Exception to the guideline (24 Nov 2026):** PMP Sessions 7 to 10 (modules 2.4 to 2.15) are built in one go, without a stop for review between sessions, at your clear request ("Continue session 7-10 in one go") | One session at a time with a review stop (guideline chapter 5) | You asked for it. Each session is still checked, committed and released on its own, so a problem stays within one session; one plan covers all four, given in the chat |
| Of the two Vercel projects, `road-to-pmp-d82g` stayed and the empty `road-to-pmp` was deleted (PMP-26). You then renamed the one left to `road-to-pmp`, and its address moved to https://road-to-pmp.vercel.app; the old `-d82g` address no longer opens (PMP-29) | Keep both addresses | You wanted one project with the short name |
| A later course may reuse or build on an earlier course's questions and lesson content (CAPM is the foundation for PMP). The content checker lists near copies for information only; a repeat inside one course is still a warning | Treat any similarity to CAPM as a fault | Your answer on 24 Nov 2026 (PMP-70) |
| **Exception to the guideline (24 Nov 2026):** PMP Sessions 12 and 13 (modules 3.4 to 3.10, the rest of Domain 3) are built in one go, without a review stop between them, at your clear request ("proceed with session 12 and 13 in one go") | One session at a time with a review stop (guideline chapter 5) | You asked for it. Each session is still checked, committed and released on its own |
