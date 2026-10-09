# Road to PMI: Project Plan and Milestones

A personal web learning platform for PMI certifications, built step by step. This file is the single place to see the plan and where the project stands. It is updated at the end of every session.

## Status log

| Date | What happened | Next step |
|---|---|---|
| 2026-10-09 | Plan approved. This tracker created. | Session 0: install Node.js and Git |
| 2026-10-09 | Isolated environment set up (portable Node.js + Git in `.tools`, Python in `.venv`). Instructor outline read. App skeleton built with first sample module (1.1). Runs on localhost. | You: review the app in the browser. Then Session 2 (GitHub + Vercel) |
| 2026-10-09 | Switched reference to PMBOK 8th edition: module 1.1 rewritten (15 quiz questions, 22 flashcards), Domains 1 and 2 re-planned (38 modules total). Added "Your progress in this module" panel to undo or reset any mark. Local Git repository created with first commit. | You: create GitHub repository and Vercel project (steps in chat). Then Session 3: module 1.2 |
| 2026-10-10 | Visual redesign with the frontend-design plugin: "project schedule" look, exam blueprint strip, milestone diamonds, index-card flashcards, local fonts. Going online is on hold at your request. | You: review the new look. Then either go online (GitHub + Vercel) or Session 3: module 1.2 |
| 2026-10-10 | New plan approved (2 modules per session, a feature after each domain, go online at the end). Session 3 done: modules 1.2 and 1.3 written, content checker added (it caught and fixed unbalanced answer positions in the 1.1 quiz). | You: study and spot-check 1.2 and 1.3. Next: Session 4, modules 1.4 and 1.5 (the 6 principles) |
| 2026-10-10 | Session 4 done: modules 1.4 and 1.5 (the six principles) written. PMI Code of Ethics PDF added to the materials folder by you. | You: study 1.4 and 1.5. Next: Session 5, modules 1.6 and 1.7 (development approaches, focus areas) |

## How your progress is saved

- Saved automatically in the browser the moment you click. Closing the browser or shutting down the PC does **not** reset it.
- It is tied to one browser on one device and one address: progress on `localhost` and on the Vercel site are separate, and so are PC and phone. Use **Download backup / Restore from backup** on the home page to move it.
- It is lost only if you clear the browser's site data, or use a private/incognito window.
- Every mark can be changed: in each module, the "Your progress in this module" panel lets you remove the lesson-completed mark, clear the quiz score, and reset the flashcards. A single flashcard can be re-rated any time.

## How to start the app on this PC

Double-click `start.bat` in the project folder. It opens http://localhost:5173 in the browser. Close the black window to stop it.

In a VS Code terminal you can instead run `. .\env.ps1` once, then `cd web` and `npm run dev`.

## Goal

Study for and pass PMI certifications using my own platform, in this order:

1. **CAPM** (Certified Associate in Project Management) - current focus
2. PMP (Project Management Professional)
3. PMI-ACP (Agile Certified Practitioner)
4. PMI-SP (Scheduling Professional)

## Decisions

| Topic | Decision |
|---|---|
| Technology | Vite + React + TypeScript, Tailwind CSS (static web app) |
| Hosting | Localhost first, then Vercel free tier via a private GitHub repository |
| Progress saving | In the browser (localStorage) with export/import backup. Cloud sync later |
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

## CAPM exam structure

| Domain | Exam weight | Main sources |
|---|---|---|
| 1. Project Management Fundamentals and Core Concepts | 36% | PMBOK Guide |
| 2. Predictive, Plan-Based Methodologies | 17% | PMBOK Guide, WBS / Scheduling / Estimating standards |
| 3. Agile Frameworks / Methodologies | 20% | Agile Practice Guide |
| 4. Business Analysis Frameworks | 27% | PMI Guide to Business Analysis |

Exam format: 150 questions, 3 hours. Checked on 2026-10-09 against several exam-prep sources that agree on these numbers; not yet checked on PMI's own page.

## Roadmap to a complete CAPM course

Agreed on 2026-10-10: **2 modules per session**, **one feature after each domain**, **go online at the end**.

| Status | Session | What | 
|---|---|---|
| ✅ | 3 | Modules 1.2, 1.3 and the content checker |
| ✅ | 4 | Modules 1.4, 1.5: the 6 principles |
| ⬜ | 5 | Modules 1.6, 1.7: development approaches, the 5 focus areas |
| ⬜ | 6 | Modules 1.8, 1.9: performance domains and tailoring; constraints, risks, issues |
| ⬜ | 7 | Modules 1.10, 1.11: leadership and ethics; 7th edition terms. (Code of Ethics PDF is in the materials folder) |
| ⬜ | 8 | Feature: spaced repetition for flashcards |
| ⬜ | 9 to 14 | Domain 2: 12 modules |
| ⬜ | 15 | Feature: dashboard and "practice my weakest topics" quiz |
| ⬜ | 16 to 19 | Domain 3: 8 modules |
| ⬜ | 20 | Feature: study plan and exam countdown |
| ⬜ | 21 to 24 | Domain 4: 7 modules |
| ⬜ | 25 | Feature: timed exam simulator (150 questions, 180 minutes) |
| ⬜ | 26 | UI/UX polish (see backlog below) |
| ⬜ | 27 | Go online: GitHub and Vercel, test on phone |

Every content session ends with the content checker (`tools/check_content.py`) and a build passing.

### UI/UX backlog (for Session 26)

- Dark mode
- More interactive buttons and feedback
- Phone-width layout check

Add ideas here as they come up.

## Milestones

Status: ⬜ not started, 🟡 in progress, ✅ done

### Session 0: PC setup

| Status | Milestone | Done on |
|---|---|---|
| ✅ | Plan approved and tracker file created | 2026-10-09 |
| ✅ | Node.js 24 LTS available (portable, in `.tools/node`) | 2026-10-09 |
| ✅ | Git available (portable, in `.tools/git`) | 2026-10-09 |
| ✅ | Python virtual environment (`.venv`) | 2026-10-09 |
| ⬜ | GitHub account ready | |
| ⬜ | Vercel account ready (sign in with GitHub) | |

### Session 1: platform skeleton on localhost

| Status | Milestone | Done on |
|---|---|---|
| ✅ | CAPM instructor screenshot read, topic checklist written (`.cache/instructor/capm-tia-outline.md`) | 2026-10-09 |
| ✅ | Exam structure checked, 37 modules defined | 2026-10-09 |
| ✅ | App scaffolded (`web/` folder) | 2026-10-09 |
| ✅ | Pages built: Home, Course, Lesson, Quiz, Flashcards | 2026-10-09 |
| ✅ | Progress saving with backup download / restore | 2026-10-09 |
| ✅ | PDF text extraction tool working (PMBOK 7 extracted) | 2026-10-09 |
| ✅ | First sample module complete: 1.1 (lesson, 12 quiz questions, 16 flashcards) | 2026-10-09 |
| 🟡 | Reviewed by you on http://localhost:5173 | |

### Go online (moved to the end: Session 27)

| Status | Milestone | Done on |
|---|---|---|
| ✅ | Local Git repository created, first commit (no PDFs or screenshots included) | 2026-10-09 |
| ⬜ | Pushed to a private GitHub repository | |
| ⬜ | Deployed on Vercel | |
| ⬜ | Opens correctly on mobile phone | |

### CAPM content, module by module

Overall: **5 of 38 modules done** (79 quiz questions, 110 flashcards).

| Status | Domain | Modules done |
|---|---|---|
| 🟡 | 1. PM Fundamentals and Core Concepts | 5 / 11 |
| ⬜ | 2. Predictive, Plan-Based Methodologies | 0 / 12 |
| ⬜ | 3. Agile Frameworks / Methodologies | 0 / 8 |
| ⬜ | 4. Business Analysis Frameworks | 0 / 7 |

**Domain 1: PM Fundamentals and Core Concepts**

| Status | Module | Done on |
|---|---|---|
| ✅ | 1.1 Projects, Programs, Portfolios and Operations | 2026-10-09 |
| ✅ | 1.2 Governance and the Project Environment (EEFs, OPAs, Structures) | 2026-10-10 |
| ✅ | 1.3 Project Functions, Roles and Product Management | 2026-10-10 |
| ✅ | 1.4 The 6 Principles, Part 1: Mindset, Holistic View, Value, Quality | 2026-10-10 |
| ✅ | 1.5 The 6 Principles, Part 2: Leadership, Sustainability, Empowered Culture | 2026-10-10 |
| ⬜ | 1.6 Phases and Development Approaches: Predictive, Adaptive, Hybrid | |
| ⬜ | 1.7 The 5 Focus Areas: Initiating to Closing | |
| ⬜ | 1.8 The 7 Performance Domains and Tailoring | |
| ⬜ | 1.9 Constraints, Risks, Issues and Assumptions | |
| ⬜ | 1.10 Leadership Skills, Emotional Intelligence and Ethics | |
| ⬜ | 1.11 7th Edition Terms You May Still See (12 Principles, 8 Domains) | |

**Domain 2: Predictive, Plan-Based Methodologies**

| Status | Module | Done on |
|---|---|---|
| ⬜ | 2.1 How Predictive Projects Flow: Processes, Inputs and Outputs | |
| ⬜ | 2.2 Governance Domain: Charter, Plan, Change Control, Closing | |
| ⬜ | 2.3 Scope Domain: Requirements and the WBS | |
| ⬜ | 2.4 Schedule Domain: Activities and Estimating | |
| ⬜ | 2.5 Critical Path Method: Forward Pass, Backward Pass, Float | |
| ⬜ | 2.6 Finance Domain: Cost Estimating and Budget | |
| ⬜ | 2.7 Earned Value Management | |
| ⬜ | 2.8 Stakeholders Domain: Engagement and Communication | |
| ⬜ | 2.9 Resources Domain: Team and Physical Resources | |
| ⬜ | 2.10 Risk Domain | |
| ⬜ | 2.11 Quality and Procurement | |
| ⬜ | 2.12 Common Tools and Techniques | |

**Domain 3: Agile Frameworks / Methodologies**

| Status | Module | Done on |
|---|---|---|
| ⬜ | 3.1 Agile Mindset, Values and Principles | |
| ⬜ | 3.2 Scrum | |
| ⬜ | 3.3 XP, Lean, Kanban and Other Methods | |
| ⬜ | 3.4 Servant Leadership and Agile Teams | |
| ⬜ | 3.5 Agile Planning, User Stories and Estimation | |
| ⬜ | 3.6 Prioritization and Delivering Value | |
| ⬜ | 3.7 Metrics, Charts and Retrospectives | |
| ⬜ | 3.8 Hybrid Approaches and Choosing a Life Cycle | |

**Domain 4: Business Analysis Frameworks**

| Status | Module | Done on |
|---|---|---|
| ⬜ | 4.1 Business Analysis Foundations and Roles | |
| ⬜ | 4.2 Needs Assessment | |
| ⬜ | 4.3 Stakeholder Engagement in Business Analysis | |
| ⬜ | 4.4 Elicitation | |
| ⬜ | 4.5 Analysis: Models, Requirements and Acceptance Criteria | |
| ⬜ | 4.6 Traceability and Monitoring | |
| ⬜ | 4.7 Solution Evaluation | |

### Feature roadmap

| Status | Feature | Done on |
|---|---|---|
| ✅ | Lessons with key points and summaries | 2026-10-09 |
| ✅ | Quizzes with explanations and review | 2026-10-09 |
| ✅ | Flashcards with "I know this / still learning" | 2026-10-09 |
| ✅ | Per-module progress panel: undo lesson mark, clear quiz score, reset flashcards | 2026-10-09 |
| ✅ | Visual redesign: exam blueprint strip, milestone path, index-card flashcards | 2026-10-10 |
| ⬜ | Spaced repetition for flashcards | |
| ⬜ | Dashboard: progress per domain, streak, weakest-topics quiz | |
| ⬜ | Study plan with exam date countdown | |
| ⬜ | Timed exam simulator (150 questions, 3 hours) | |
| ⬜ | Mobile polish and installable app (PWA) | |
| ⬜ | Cloud sync between PC and phone | |

### Next certifications

| Status | Certification |
|---|---|
| ⬜ | PMP |
| ⬜ | PMI-ACP |
| ⬜ | PMI-SP |
