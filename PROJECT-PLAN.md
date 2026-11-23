# Road to PMP: project overview

A personal web learning platform for PMI certifications, built step by step. This file is the starting point: where each certification stands, the rules of the project, and how the platform is run. The detail lives in one plan file and one issues file per certification.

The project follows the general guideline in [CLAUDE-Ansell.md](CLAUDE-Ansell.md) (linked from [CLAUDE.md](CLAUDE.md)). How it was brought in line is in [docs/GUIDELINE-study.md](docs/GUIDELINE-study.md).

## The documents

| Certification | Plan and progress | Issues and how they were handled |
|---|---|---|
| CAPM | [docs/CAPM-PLAN.md](docs/CAPM-PLAN.md) | [docs/CAPM-ISSUES.md](docs/CAPM-ISSUES.md) |
| PMP | [docs/PMP-PLAN.md](docs/PMP-PLAN.md) | [docs/PMP-ISSUES.md](docs/PMP-ISSUES.md) |
| PMI-ACP | [docs/PMI-ACP-PLAN.md](docs/PMI-ACP-PLAN.md) | [docs/PMI-ACP-ISSUES.md](docs/PMI-ACP-ISSUES.md) |
| PMI-SP | [docs/PMI-SP-PLAN.md](docs/PMI-SP-PLAN.md) | [docs/PMI-SP-ISSUES.md](docs/PMI-SP-ISSUES.md) |

For the whole project:

| File | What it holds |
|---|---|
| [CHANGELOG.md](CHANGELOG.md) | The version log, newest first. Also shown in the app (Help, What's new) |
| [web/src/content/guide.md](web/src/content/guide.md) | The user guide, one part per feature. Shown in the app (Help, Guide) |
| [docs/BRIEF.md](docs/BRIEF.md) | The one-page brief |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Every important choice, the other options, and why |
| [docs/SETTINGS.md](docs/SETTINGS.md) | The settings you can change, with their defaults |
| [docs/ACCOUNTS.md](docs/ACCOUNTS.md) | GitHub, Vercel and Supabase: free limits and what to watch |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | When something breaks: what you see and what to do |

How they are kept:

- A **plan file** holds that certification's status log, exam facts, roadmap, sources, coverage of the exam outline and what each session built. It is updated whenever something is achieved. The guideline's "milestones" are the sessions in these files (decision of 23 Nov 2026).
- An **issues file** holds every problem met while working on that certification and how it was handled. Sessions and issue entries are numbered **per certification**: each starts its own count at 1 (PMP's issues are written PMP-1, PMP-2 and so on). "Where to look" in an entry names a section of the same certification's plan file, or a file in the project.
- The platform itself (the app, the tools, sync, the website) was built during the CAPM sessions, so its record is in the CAPM files: Sessions 26 to 29 in the plan, and the matching groups in the issues file. Platform work done for a later certification is recorded with that certification.
- Every release gets a version in `CHANGELOG.md`, and the guide is updated in the same release.
- This overview changes only when a certification changes state or a project-wide rule changes.

## Where each certification stands

| | Certification | State | Next |
|---|---|---|---|
| ✅ | CAPM | **Finished as planned** (13 Oct 2026). 39 modules, 1,274 questions including matching, hot spot and comic strip, 1,339 flashcards, 6 mock exams, 19 lesson drawings. What stays open, and why, is listed at the end of `docs/CAPM-PLAN.md`. | None planned |
| 🟡 | PMP | **Being built.** Sessions 1 (sources, map), 2 (exam engine), 3 to 5 (Domain 1, People, complete) and 6 to 9 (Process modules 2.1 to 2.12) are done, and Guideline milestone G1 (version 1.0: Help page, version number, release step). 21 of 34 modules are ready: 631 questions, 525 flashcards. | Session 10, modules 2.13 to 2.15 (in one go) |
| ⬜ | PMI-ACP | Not started | Needs its Exam Content Outline in the materials folder |
| ⬜ | PMI-SP | Not started | Needs its Exam Content Outline in the materials folder |

## Goal

Study for and pass PMI certifications using my own platform, in this order:

1. CAPM (Certified Associate in Project Management): finished as planned on 13 Oct 2026
2. **PMP** (Project Management Professional): current focus
3. PMI-ACP (Agile Certified Practitioner)
4. PMI-SP (Scheduling Professional)

## Decisions

All project-wide decisions, with the options and reasons, are in [docs/DECISIONS.md](docs/DECISIONS.md). In short: a Vite + React + TypeScript web app; the PMBOK Guide 8th edition as the primary reference; nothing installed in Windows; the website on the Vercel free plan; only you upload.

## Ground rules

- **Copyright:** the site contains only original summaries, quiz questions and flashcards, with chapter references to the PMI books. The PDFs and instructor screenshots stay on this PC and are never uploaded.
- **Token saving:** one module per session. Book text is extracted once to a local cache so each session reads only the pages it needs.
- **Web research:** only for specific facts. If a source is blocked or paywalled, Claude asks instead of forcing access.
- **Pace:** slow and verified. Each session ends with a review before moving on.
- **A closed certification stays closed.** CAPM was closed on 13 Oct 2026. Work on another certification must not change or break it: `tools/check_capm_frozen.py` must pass, and CAPM's click tests must pass unchanged, before every commit.

## Running the project

| To | Double-click | What it does |
|---|---|---|
| Study on this PC | `start.bat` | Opens http://localhost:5173. Close the black window to stop it |
| Run every check | `test.bat` | CAPM unchanged, content, invisible characters, contrast, and all click tests. The app must be running |
| Make a release | `release.bat` | Claude normally runs this itself: every check and the build, then marks the version in git (`v1.0`). It stops at the first failure |
| Update the website | `upload.bat` | Checks that nothing private, copyrighted or secret would be uploaded, then uploads. Only you do this |

In a VS Code terminal you can instead run `. .\env.ps1` once, then `cd web` and `npm run dev`.

**How a release goes:** Claude writes the version's entry in `CHANGELOG.md`, updates the guide, commits, and runs `release.bat`. You double-click `upload.bat`. Claude then runs `tools/check_live.py`, which confirms the website shows the same version and build as this PC.

## Using the app

How each part works (progress, backups, flashcards, mock exams, study plan, dashboard, search, sync, display) is in the guide: **Help** in the top bar of the app, or [web/src/content/guide.md](web/src/content/guide.md).

## Sources and PDF links: upkeep

- The PMBOK Guides, the two Agile Practice Guides and the six PMI standards and practice guides used as sources are protected by PMI in a way the Edge browser cannot open (it asks for a password). The links therefore use unlocked copies stored in `.cache/pdf/`, made by `tools/unlock_pdfs.py` at your request on 10 Oct 2026. The copies stay on this PC, are excluded from Git, and still carry your name and member ID on each page. Your original files are untouched.
- If a PDF is renamed or a new book is added, update `web/src/content/books.json`, then run `tools/extract_pdf.py` and `tools/unlock_pdfs.py`. The running server picks up a new book straight away; no restart is needed.
- A red **\*** marks a module as additional information that is not part of the exam. No module is marked this way at present (1.11 became exam content in Session 25b).

## The website

- **Address:** https://road-to-pmp.vercel.app (Vercel project `road-to-pmp`, built from the `web` folder of the private GitHub repository `ansellreff/road-to-pmp`).
- **Which version it runs:** shown at the bottom of every page, and in `version.json` on the site, which `tools/check_live.py` reads.
- **What is not on it:** the PDFs. Sources show as book and page number without a link.
- Anyone who has the address can open the site. It is not listed by search engines.
- Sync (Supabase) setup and limits: [docs/ACCOUNTS.md](docs/ACCOUNTS.md).
