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
| 2026-10-10 | Session 5 done: modules 1.6 (phases and development approaches) and 1.7 (the five focus areas) written. | You: study 1.6 and 1.7. Next: Session 6, modules 1.8 and 1.9 (performance domains and tailoring; constraints, risks, issues) |
| 2026-10-10 | Session 6 done: modules 1.8 (performance domains and tailoring) and 1.9 (constraints, risks, issues and assumptions) written. | You: study 1.8 and 1.9. Next: Session 7, modules 1.10 and 1.11 (leadership and ethics; 7th edition terms), which completes Domain 1 |
| 2026-10-10 | Session 7 done: modules 1.10 (leadership, emotional intelligence, ethics) and 1.11 (7th edition and Process Groups terms) written. **Domain 1 is complete: 11 of 11 modules.** Process Groups: A Practice Guide added by you and extracted. | You: study 1.10 and 1.11. Next: Session 8, the spaced repetition feature |
| 2026-10-10 | Source links added: every quiz question and every module now lists its book sections, with links that open the PDF from your materials folder at the right page (works on this PC only). Module 1.11 marked with a red * as additional information and removed from progress totals. Session 8 done: spaced repetition for flashcards, with a "Review due cards" session on the home page. | You: click a source link to confirm the PDF opens at the right page; try rating some flashcards. Next: Session 9, Domain 2 modules 2.1 and 2.2 |
| 2026-10-10 | Lesson sources moved: each lesson section now shows its source and PDF link directly under its heading (86 sections across 11 modules). Open question: one of the PDFs asked you for a password. | You: tell me which book and which browser showed the password prompt. Next: Session 9, modules 2.1 and 2.2 |
| 2026-10-10 | Password prompt fixed: Edge cannot open PMI's protected PMBOK PDFs, so the source links now use unlocked local copies (`.cache/pdf/`). The local server also answers byte-range requests properly. | You: click a source link and confirm the book opens at the right page. Next: Session 9, modules 2.1 and 2.2 |
| 2026-10-10 | Session 9 done: Domain 2 started. Modules 2.1 (how predictive projects flow: charter, plan, work performance data, change requests) and 2.2 (the nine Governance processes) written, with a source under every lesson section. | You: study 2.1 and 2.2. Next: Session 10, modules 2.3 (Scope and the WBS) and 2.4 (Schedule) |
| 2026-10-10 | Session 10 done: modules 2.3 (Scope domain: requirements, scope statement, WBS, scope baseline, verified vs accepted deliverables) and 2.4 (Schedule domain: activities, logical relationships, leads and lags, estimating techniques with worked examples) written. | You: study 2.3 and 2.4. Next: Session 11, modules 2.5 (critical path method) and 2.6 (Finance domain) |
| 2026-10-10 | Session 11 done: modules 2.5 (critical path method with a worked forward and backward pass, total and free float, crashing vs fast tracking, resource leveling vs smoothing) and 2.6 (Finance domain: cost estimating, cost of quality, budget build-up, reserves, funding) written. **Domain 2 is half done: 6 of 12 modules.** | You: study 2.5 and 2.6, and work the float example by hand once. Next: Session 12, modules 2.7 (earned value management) and 2.8 (Stakeholders domain) |
| 2026-10-10 | Practice Standard for Scheduling (Third Edition) added as a fifth source book, at your suggestion. Modules 2.4 and 2.5 now cite it: the PERT formula has a real page source, and 2.5 gained critical path activity vs critical activity, shared total float, date constraints and the three critical chain buffers (3 new questions, 6 new flashcards). | You: restart `start.bat` once so the new book's links open. Next: Session 12, modules 2.7 and 2.8 |
| 2026-10-10 | Session 12 done: modules 2.7 (earned value management: PV, EV, AC, variances, indices, EAC, ETC, VAC, TCPI, with one worked example throughout) and 2.8 (Stakeholders domain: register, power/interest grid, engagement matrix, communication methods, channels, communication model) written. The Standard for Earned Value Management added as a sixth source book. **Half of CAPM is done: 19 of 38 modules.** | You: restart `start.bat` once; study 2.7 and 2.8. Next: Session 13, modules 2.9 (Resources domain) and 2.10 (Risk domain). Still unused in your folder: the WBS and Estimating practice standards (for 2.3, 2.4, 2.6) |
| 2026-10-10 | Fixed: links to the two new books (Scheduling, Earned Value) showed "This page does not exist". The local server read the book list only at startup; it now reads it on every request, so new books work without a restart. | You: click a source link in module 2.5 or 2.7 to confirm. Next: Session 13, modules 2.9 and 2.10 |
| 2026-10-10 | Session 13 done: modules 2.9 (Resources domain: RACI, acquiring and leading the team, Tuckman ladder, conflict resolution, motivation models) and 2.10 (Risk domain: risk vs issue, appetite and threshold, risk register, qualitative and quantitative analysis, EMV, response strategies for threats and opportunities) written. The Standard for Risk Management added as a seventh source book. | You: study 2.9 and 2.10. Next: Session 14, modules 2.11 (quality and procurement) and 2.12 (tools and techniques), which completes Domain 2. Still unused in your folder: the WBS and Estimating practice standards and the Risk practice guide |
| 2026-10-10 | Catch-up done at your request: the WBS practice standard, the Estimating practice standard and the Risk practice guide are now source books (ten in total). Module 2.3 gained the WBS rules (what a WBS does not show, top-down and bottom-up); 2.4 gained relative estimating, planning poker and estimating biases; 2.6 now sources the rough order of magnitude range; 2.10 gained a predictive vs adaptive risk comparison. 6 new questions, 12 new flashcards. | You: skim the changed sections. Next: Session 14, modules 2.11 and 2.12 |
| 2026-10-10 | Session 14 done: modules 2.11 (quality and procurement: assurance vs control, quality tools, bid documents, contract types, disputes) and 2.12 (common tools and techniques, grouped by purpose) written. **Domain 2 is complete: 12 of 12 modules.** Domains 1 and 2 together are 53% of the exam. | You: study 2.11 and 2.12. Next: Session 15, the dashboard and weak-area quiz feature |
| 2026-10-10 | Session 15 done: Dashboard page (study streak, per-domain progress and quiz average, modules to revisit) and Practice missed questions page. Per-question quiz results and study days are now saved; existing progress is kept. New Session 25 added at your request: a full catch-up of every module against every book, with a list of extra PDFs worth adding. | You: take a quiz, get something wrong on purpose, then open Dashboard and try the practice. Next: Session 16, modules 3.1 and 3.2 (Agile Practice Guide) |
| 2026-10-10 | Your feedback recorded: the Dashboard and Practice pages work but look raw; a proper redesign is in the UI/UX backlog for Session 27. Session 16 done: Domain 3 started with modules 3.1 (agile mindset, the 4 values and 12 principles, iterative vs incremental) and 3.2 (Scrum: roles, events, artifacts, definition of done). The Agile Practice Guide, Second Edition, is the eleventh source book. | You: study 3.1 and 3.2. Next: Session 17, modules 3.3 (XP, Lean, Kanban) and 3.4 (servant leadership and agile teams) |
| 2026-10-10 | Session 17 done: modules 3.3 (XP, lean, Lean Startup, the Kanban Method, Crystal, FDD, DSDM and the scaling frameworks) and 3.4 (servant leadership, agile team attributes, T-shaped skills, multitasking, team spaces, psychological safety, levels of conflict). **Domain 3 is half done: 4 of 8.** | You: study 3.3 and 3.4. Next: Session 18, modules 3.5 (agile planning, user stories, estimation) and 3.6 (prioritization and delivering value) |

## How your progress is saved

- Saved automatically in the browser the moment you click. Closing the browser or shutting down the PC does **not** reset it.
- It is tied to one browser on one device and one address: progress on `localhost` and on the Vercel site are separate, and so are PC and phone. Use **Download backup / Restore from backup** on the home page to move it.
- It is lost only if you clear the browser's site data, or use a private/incognito window.
- Flashcards use spaced repetition. A card you know comes back after 1 day, then 3, 7, 14 and 30 days. A card you miss comes back the same day. The home page shows how many are due and starts a review session across all modules.
- Every mark can be changed: in each module, the "Your progress in this module" panel lets you remove the lesson-completed mark, clear the quiz score, and reset the flashcards. A single flashcard can be re-rated any time.
- The **Dashboard** (link in the top bar) shows your study streak, progress and quiz average per exam domain, and the modules to revisit. Every quiz answer is now remembered per question. A question you got wrong goes into **Practice missed questions** and leaves once you answer it correctly. Clearing a module's quiz score also clears its question history. Quizzes taken before 2026-10-10 kept their scores but have no per-question history.

## Sources and PDF links

- **Lesson:** each section shows its source directly under the section heading, with a link.
- **Quiz:** every explanation shows its source (book, section) with a link.
- **Flashcards and quiz tabs:** a "Sources for this module" list sits below.
- A link opens the PDF from `PMI Learning Material/` in a new browser tab at the page where that section starts. "PDF page" is the page number your PDF viewer shows, not the number printed on the page.
- The links work only when the platform runs on this PC (`start.bat`). The PDFs are licensed to you personally and are never uploaded, so on the future website the same place shows the book and page as plain text.
- Flashcards do not have a page each; they use the module's source list.
- The two PMBOK Guides and the six PMI standards and practice guides used as sources are protected by PMI in a way the Edge browser cannot open (it asks for a password). The links therefore use unlocked copies stored in `.cache/pdf/`, made by `tools/unlock_pdfs.py` at your request on 2026-10-10. The copies stay on this PC, are excluded from Git, and still carry your name and member ID on each page. Your original files are untouched.
- If a PDF is renamed or a new book is added, update `web/src/content/books.json`, then run `tools/extract_pdf.py` and `tools/unlock_pdfs.py`. The running server picks up a new book straight away; no restart is needed.
- A red **\*** marks a module as additional information that is not part of the exam (currently only 1.11). It does not count toward progress.

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
| ✅ | 5 | Modules 1.6, 1.7: development approaches, the 5 focus areas |
| ✅ | 6 | Modules 1.8, 1.9: performance domains and tailoring; constraints, risks, issues |
| ✅ | 7 | Modules 1.10, 1.11: leadership and ethics; 7th edition terms. (Code of Ethics PDF is in the materials folder) |
| ✅ | 8 | Feature: spaced repetition for flashcards (plus source links to the PDFs) |
| ✅ | 9 to 14 | Domain 2: 12 modules (all done) |
| ✅ | 15 | Feature: dashboard and practice of missed questions |
| 🟡 | 16 to 19 | Domain 3: 8 modules (Sessions 16 and 17 done: 3.1 to 3.4) |
| ⬜ | 20 | Feature: study plan and exam countdown |
| ⬜ | 21 to 24 | Domain 4: 7 modules |
| ⬜ | 25 | Full catch-up, requested 2026-10-10: review every module against every book in `PMI Learning Material/`, improve where a book adds exam value, and give you a list of any extra PDFs worth adding |
| ⬜ | 26 | Feature: timed exam simulator (150 questions, 180 minutes) |
| ⬜ | 27 | UI/UX polish (see backlog below) |
| ⬜ | 28 | Go online: GitHub and Vercel, test on phone |

Every content session ends with the source linker (`tools/link_sources.py`), the content checker (`tools/check_content.py`) and a build passing.

### UI/UX backlog (for Session 27)

- Dark mode
- More interactive buttons and feedback
- Phone-width layout check
- **Dashboard and Practice pages look raw and unpolished** (your feedback, 2026-10-10, after trying them). They work; redesign them properly: stronger visual hierarchy, a real chart for domain progress instead of a plain table, better spacing, and a more finished practice flow
- Wide lesson tables (for example the 40-process table in module 1.8) are cramped in the reading column: let wide tables use the full page width

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

### Go online (moved to the end: Session 28)

| Status | Milestone | Done on |
|---|---|---|
| ✅ | Local Git repository created, first commit (no PDFs or screenshots included) | 2026-10-09 |
| ⬜ | Pushed to a private GitHub repository | |
| ⬜ | Deployed on Vercel | |
| ⬜ | Opens correctly on mobile phone | |

### CAPM content, module by module

Overall: **27 of 38 modules done** (547 quiz questions, 780 flashcards).

| Status | Domain | Modules done |
|---|---|---|
| ✅ | 1. PM Fundamentals and Core Concepts | 11 / 11 |
| ✅ | 2. Predictive, Plan-Based Methodologies | 12 / 12 |
| 🟡 | 3. Agile Frameworks / Methodologies | 4 / 8 |
| ⬜ | 4. Business Analysis Frameworks | 0 / 7 |

**Domain 1: PM Fundamentals and Core Concepts**

| Status | Module | Done on |
|---|---|---|
| ✅ | 1.1 Projects, Programs, Portfolios and Operations | 2026-10-09 |
| ✅ | 1.2 Governance and the Project Environment (EEFs, OPAs, Structures) | 2026-10-10 |
| ✅ | 1.3 Project Functions, Roles and Product Management | 2026-10-10 |
| ✅ | 1.4 The 6 Principles, Part 1: Mindset, Holistic View, Value, Quality | 2026-10-10 |
| ✅ | 1.5 The 6 Principles, Part 2: Leadership, Sustainability, Empowered Culture | 2026-10-10 |
| ✅ | 1.6 Phases and Development Approaches: Predictive, Adaptive, Hybrid | 2026-10-10 |
| ✅ | 1.7 The 5 Focus Areas: Initiating to Closing | 2026-10-10 |
| ✅ | 1.8 The 7 Performance Domains and Tailoring | 2026-10-10 |
| ✅ | 1.9 Constraints, Risks, Issues and Assumptions | 2026-10-10 |
| ✅ | 1.10 Leadership Skills, Emotional Intelligence and Ethics | 2026-10-10 |
| ✅ | 1.11 Older Terms You May Still See (12 Principles, 49 Processes) **\*** additional information, not exam content | 2026-10-10 |

**Domain 2: Predictive, Plan-Based Methodologies**

| Status | Module | Done on |
|---|---|---|
| ✅ | 2.1 How Predictive Projects Flow: Processes, Inputs and Outputs | 2026-10-10 |
| ✅ | 2.2 Governance Domain: Charter, Plan, Change Control, Closing | 2026-10-10 |
| ✅ | 2.3 Scope Domain: Requirements and the WBS | 2026-10-10 |
| ✅ | 2.4 Schedule Domain: Activities and Estimating | 2026-10-10 |
| ✅ | 2.5 Critical Path Method: Forward Pass, Backward Pass, Float | 2026-10-10 |
| ✅ | 2.6 Finance Domain: Cost Estimating and Budget | 2026-10-10 |
| ✅ | 2.7 Earned Value Management | 2026-10-10 |
| ✅ | 2.8 Stakeholders Domain: Engagement and Communication | 2026-10-10 |
| ✅ | 2.9 Resources Domain: Team and Physical Resources | 2026-10-10 |
| ✅ | 2.10 Risk Domain | 2026-10-10 |
| ✅ | 2.11 Quality and Procurement | 2026-10-10 |
| ✅ | 2.12 Common Tools and Techniques | 2026-10-10 |

**Domain 3: Agile Frameworks / Methodologies**

| Status | Module | Done on |
|---|---|---|
| ✅ | 3.1 Agile Mindset, Values and Principles | 2026-10-10 |
| ✅ | 3.2 Scrum | 2026-10-10 |
| ✅ | 3.3 XP, Lean, Kanban and Other Methods | 2026-10-10 |
| ✅ | 3.4 Servant Leadership and Agile Teams | 2026-10-10 |
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
| ✅ | Spaced repetition for flashcards, with a review session on the home page | 2026-10-10 |
| ✅ | Source links that open the book PDF at the right page (local only) | 2026-10-10 |
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
