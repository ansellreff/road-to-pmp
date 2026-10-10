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
| 2026-10-10 | At your request, an **Issues log** was added at the end of this file: every problem met so far (40 entries) with how it was handled and where to look. It is updated at the end of every session from now on. | You: skim it once. Next: Session 18 |
| 2026-10-10 | Session 18 done: modules 3.5 (planning levels, backlog items, user stories, INVEST, story points, planning poker, velocity, spikes) and 3.6 (value-driven delivery, MoSCoW, Kano, WSJF, MVP vs MMP vs MBI, demonstrations, releasing, technical debt). Issues 41 to 43 added to the log. | You: study 3.5 and 3.6. Next: Session 19, modules 3.7 (metrics, charts, retrospectives) and 3.8 (hybrid approaches), which completes Domain 3 |
| 2026-10-10 | Session 19 done: modules 3.7 (why agile measures finished work, velocity, burndown and burnup charts, flow metrics, cumulative flow diagram, information radiators, retrospectives) and 3.8 (hybrid approaches, the four hybrid patterns, Stacey matrix, Cynefin, the agile suitability filter, blending agile approaches). **Domain 3 is complete: 8 of 8 modules.** Domains 1 to 3 together are 73% of the exam. Issues 44 to 46 added to the log. | You: study 3.7 and 3.8. Next: Session 20, the study plan and exam countdown feature |
| 2026-10-10 | You added three PDFs: the PMBOK Guide Sixth Edition, the Agile Practice Guide First Edition (2017) and the CAPM Exam Content Outline (2023 update). All three are extracted and linked (14 source books now). 21 teaching points in 11 modules that had no book page now cite one. **Finding from the outline: PMI lists the PMBOK Guide Seventh Edition, the Process Groups practice guide and the 2017 Agile Practice Guide as exam references, not the Eighth Edition.** See issues 47 to 51. | You: decide whether the Eighth Edition stays the primary reference (see issue 47). Next: Session 20 |
| 2026-10-10 | You added the Scrum Guide (2020) and Business Analysis for Practitioners: A Practice Guide, Second Edition. Both are extracted and linked, and so is The PMI Guide to Business Analysis, which was already in your folder (17 source books now). Module 3.2 now cites the Scrum Guide for every Scrum rule. INVEST, MoSCoW, Kano, WSJF, the Pareto chart and epics now cite The PMI Guide to Business Analysis; osmotic communication cites the PMBOK Guide Seventh Edition glossary. Quiz questions without a book page fell from 30 to 16. See issues 50, 52 and 53. | You: decide the edition question (issue 47). Next: Session 20 |
| 2026-10-10 | You added the two non-PMI textbooks the exam outline names: The Project Management Answer Book (Second Edition) and Wysocki's Effective Project Management (your copy is the Fifth Edition; the outline names the Eighth). Both are extracted and linked (19 source books now). The Answer Book now sources gold plating, sunk, direct, indirect, fixed and variable costs, the two reserves, the channels formula, the power/interest strategies, Maslow, workaround, the rule of seven and the old earned value names. **Quiz questions without a book page: 2 of 635** (was 30). See issues 50 and 54. | You: decide the edition question (issue 47). Next: Session 20 |
| 2026-10-10 | You replaced Wysocki's book with the Eighth Edition, the one the exam outline names. It is now the linked copy (the Fifth Edition file stays in the folder, unused). It sources effort vs duration and the seven lean principles. A last search of all 19 books also sourced: shielding the team (PMBOK Guide Seventh Edition), ROI, NPV and IRR (The PMI Guide to Business Analysis) and the inverted triangle (PMBOK Guide Eighth Edition, Figure 4-3). **Quiz questions without a book page: 1 of 635** (the three Cs of a user story). See issues 50 and 55. | You: decide what to do with the few points no book covers (issue 50) and the edition question (issue 47). Next: Session 20 |
| 2026-10-10 | Your decision recorded: the few points no book covers stay in the course, labelled as they are (issue 50). Session 20 done: **Study plan** page (link in the top bar) where you set your exam day; it shows days left, modules left, the weekly pace and a finish-by date for every unfinished module, with the last days kept for review. The home page shows the countdown and what to study today. | You: open Study plan, pick an exam day, and check the home page. Next: Session 21, Domain 4 modules 4.1 and 4.2 |
| 2026-10-10 | Session 21 done: Domain 4 started with modules 4.1 (what business analysis is, business analyst vs project manager, the requirement types, product and project life cycles, business value, the 6 process groups and 6 knowledge areas, the roles an analyst works with) and 4.2 (needs assessment: situation statement, current and future state, root cause techniques, SWOT, gap analysis, feasibility, product roadmap, business case, charter). Issues 58 and 59 added to the log. | You: study 4.1 and 4.2. Next: Session 22, modules 4.3 (stakeholder engagement) and 4.4 (elicitation) |
| 2026-10-10 | At your request, all source links were audited for figure errors: 613 links, 41 of them to figures or tables, none wrong. The check is now a tool (	ools/audit_links.py) run every session. Session 22 done: modules 4.3 (stakeholder engagement: register, stakeholder analysis, personas, RACI, stakeholder matrix and onion diagram, the engagement approach, business analysis planning, transition, assessing performance) and 4.4 (elicitation: the four processes, question types, the techniques and when to use each, confirming results). Issues 60 and 61 added to the log. | You: study 4.3 and 4.4. Next: Session 23, modules 4.5 (analysis: models, requirements, acceptance criteria) and 4.6 (traceability and monitoring) |
| 2026-10-10 | Session 23 done: modules 4.5 (analysis: the five categories of model and what each model shows, user stories vs use cases, the requirements package, acceptance criteria, definition of ready and done, verify vs validate, prioritization, product risks, design options) and 4.6 (traceability and monitoring: backward and forward tracing, the traceability matrix, approved requirements and the baseline, impact analysis, change outcomes, the backlog as change control). **One module left: 37 of 38.** Issues 62 and 63 added to the log. | You: study 4.5 and 4.6. Next: Session 24, module 4.7 (solution evaluation), which completes Domain 4 and all CAPM content |
| 2026-10-10 | Session 24 done: module 4.7 (solution evaluation: the evaluation approach and metrics, evaluating acceptance results and addressing defects, the release decision and its four bases, measuring business value after release). **Domain 4 is complete: 7 of 7. All CAPM content is written: 38 of 38 modules, 791 quiz questions, 1,167 flashcards.** One quiz question in the whole course has no book page. Issue 64 added to the log. | You: study 4.7. Next: Session 25, the full catch-up, planned with you first |
| 2026-10-10 | Session 25 planned with you and approved: four sessions (25a audits, 25b exam alignment of Domains 1 and 2, 25c quiz repair, 25d exam alignment of Domains 3 and 4 and the PDF list). Your decisions: keep the Eighth Edition lessons and add an exam-terms layer; module 1.11 becomes exam content; all quizzes are repaired. **Session 25a done:** three new checks (quiz quality, tables and markup, worked examples), every lesson checked as rendered in a browser, and the exam outline mapped to the modules. Results are in "Session 25a audit results" below. Issues 65 to 68 added to the log. | You: read the audit results. Next: Session 25b |
| 2026-10-10 | Your suggestion for the mock exams recorded (several fixed exams, like the real exam, domains shown separately, easy to learn from), with a proposed design under "Session 26 proposal". | You: choose mixed order or domain chapters, and 3 or 4 mock exams. Next: Session 25b |

## How your progress is saved

- Saved automatically in the browser the moment you click. Closing the browser or shutting down the PC does **not** reset it.
- It is tied to one browser on one device and one address: progress on `localhost` and on the Vercel site are separate, and so are PC and phone. Use **Download backup / Restore from backup** on the home page to move it.
- It is lost only if you clear the browser's site data, or use a private/incognito window.
- Flashcards use spaced repetition. A card you know comes back after 1 day, then 3, 7, 14 and 30 days. A card you miss comes back the same day. The home page shows how many are due and starts a review session across all modules.
- Every mark can be changed: in each module, the "Your progress in this module" panel lets you remove the lesson-completed mark, clear the quiz score, and reset the flashcards. A single flashcard can be re-rated any time.
- The **Dashboard** (link in the top bar) shows your study streak, progress and quiz average per exam domain, and the modules to revisit. Every quiz answer is now remembered per question. A question you got wrong goes into **Practice missed questions** and leaves once you answer it correctly. Clearing a module's quiz score also clears its question history. Quizzes taken before 2026-10-10 kept their scores but have no per-question history.
- The **Study plan** (link in the top bar) stores one thing: your exam day. Everything else on it is worked out fresh each day from what you have not finished, so a missed day spreads over the days left and nothing piles up. A quarter of the time before the exam, at most 7 days, is kept for final review. Modules not written yet are included so the pace is realistic. Removing the date removes the plan; your progress is untouched.

## Sources and PDF links

- **Lesson:** each section shows its source directly under the section heading, with a link.
- **Quiz:** every explanation shows its source (book, section) with a link.
- **Flashcards and quiz tabs:** a "Sources for this module" list sits below.
- A link opens the PDF from `PMI Learning Material/` in a new browser tab at the page where that section starts. "PDF page" is the page number your PDF viewer shows, not the number printed on the page.
- The links work only when the platform runs on this PC (`start.bat`). The PDFs are licensed to you personally and are never uploaded, so on the future website the same place shows the book and page as plain text.
- Flashcards do not have a page each; they use the module's source list.
- The PMBOK Guides, the two Agile Practice Guides and the six PMI standards and practice guides used as sources are protected by PMI in a way the Edge browser cannot open (it asks for a password). The links therefore use unlocked copies stored in `.cache/pdf/`, made by `tools/unlock_pdfs.py` at your request on 2026-10-10. The copies stay on this PC, are excluded from Git, and still carry your name and member ID on each page. Your original files are untouched.
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

Exam format: 150 questions in 3 hours, of which 135 are scored and 15 are unscored pretest questions. There is a 10-minute break after question 75; questions 1 to 75 cannot be reopened after it. Question types: multiple choice, drag and drop, hot spot, and animation or comic strip scenarios. You may take the exam up to three times within a 1-year eligibility period. Confirmed on 2026-10-10 from PMI's own CAPM Exam Content Outline (2023 update), now in your folder.

Exam references named by that outline: PMBOK Guide Seventh Edition, Process Groups: A Practice Guide, The PMI Guide to Business Analysis (2017), Business Analysis for Practitioners: A Practice Guide Second Edition, Agile Practice Guide (2017), and two non-PMI textbooks. The PMBOK Guide Eighth Edition is not on the list.

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
| ✅ | 16 to 19 | Domain 3: 8 modules |
| ✅ | 20 | Feature: study plan and exam countdown |
| ✅ | 21 to 24 | Domain 4: 7 modules |
| 🟡 | 25 | Full catch-up, requested 2026-10-10 and planned with you. In four parts: |
| ✅ | 25a | Audits: quiz quality check, table and markup check, worked-example check, render check of every lesson, exam outline coverage map |
| ⬜ | 25b | Exam alignment of Domains 1 and 2: module 1.11 becomes exam content and is expanded; "On the exam" notes from PMBOK 7 and the Process Groups guide; fill the outline gaps |
| ⬜ | 25c | Quiz repair: remove the longest-answer give-away in all quizzes, remove duplicates, top up Domain 1, add scenario questions |
| ⬜ | 25d | Exam alignment of Domains 3 and 4 (2017 Agile Practice Guide, Business Analysis for Practitioners); final list of PDFs; close the edition question |
| ⬜ | 26 | Feature: mock exams. Your requirements (2026-10-10): clear and easy to learn from; like the real exam; domains shown separately; **several fixed mock exams**, preferred over one randomized exam. Proposed design is under "Session 26 proposal" below; to be confirmed in plan mode. |
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
- Drawn examples of the main business analysis models in module 4.5 (context diagram, process flow, entity relationship diagram, state diagram, fishbone diagram), and of the burndown chart and cumulative flow diagram in module 3.7. The lessons describe them in words only.

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

Overall: **38 of 38 modules done** (791 quiz questions, 1,167 flashcards).

| Status | Domain | Modules done |
|---|---|---|
| ✅ | 1. PM Fundamentals and Core Concepts | 11 / 11 |
| ✅ | 2. Predictive, Plan-Based Methodologies | 12 / 12 |
| ✅ | 3. Agile Frameworks / Methodologies | 8 / 8 |
| ✅ | 4. Business Analysis Frameworks | 7 / 7 |

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
| ✅ | 3.5 Agile Planning, User Stories and Estimation | 2026-10-10 |
| ✅ | 3.6 Prioritization and Delivering Value | 2026-10-10 |
| ✅ | 3.7 Metrics, Charts and Retrospectives | 2026-10-10 |
| ✅ | 3.8 Hybrid Approaches and Choosing a Life Cycle | 2026-10-10 |

**Domain 4: Business Analysis Frameworks**

| Status | Module | Done on |
|---|---|---|
| ✅ | 4.1 Business Analysis Foundations and Roles | 2026-10-10 |
| ✅ | 4.2 Needs Assessment | 2026-10-10 |
| ✅ | 4.3 Stakeholder Engagement in Business Analysis | 2026-10-10 |
| ✅ | 4.4 Elicitation | 2026-10-10 |
| ✅ | 4.5 Analysis: Models, Requirements and Acceptance Criteria | 2026-10-10 |
| ✅ | 4.6 Traceability and Monitoring | 2026-10-10 |
| ✅ | 4.7 Solution Evaluation | 2026-10-10 |

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
| ✅ | Study plan with exam date countdown | 2026-10-10 |
| ⬜ | Timed exam simulator (150 questions, 3 hours) | |
| ⬜ | Mobile polish and installable app (PWA) | |
| ⬜ | Cloud sync between PC and phone | |

### Next certifications

| Status | Certification |
|---|---|
| ⬜ | PMP |
| ⬜ | PMI-ACP |
| ⬜ | PMI-SP |

## Session 26 proposal: mock exams

Recorded on 2026-10-10 from your suggestion. Not built yet; to be confirmed in plan mode when Session 26 starts.

**How the real exam works** (CAPM Exam Content Outline, 2023, in your folder): 150 questions in 3 hours, 135 scored and 15 unscored; domain weights 36 / 17 / 20 / 27; questions from all domains are **mixed in random order**, not grouped by domain; one 10-minute break after question 75, after which questions 1 to 75 cannot be reopened; the result is reported per domain, not as one percentage. Not confirmed from PMI: whether the clock runs during the break, and how flagging works.

**Proposed design, two parts:**

| Part | For | How it works |
|---|---|---|
| **Mock exams** | Rehearsing the real thing | Several **fixed** exams (Mock 1, Mock 2, ...), each 150 questions by domain weight (54 / 26 / 30 / 40), mixed order, 180-minute timer, two halves of 75 with a break and no going back, flagging, **no answers shown until the end** |
| **Result and review** | Learning from it | A result per domain, then a review **arranged by domain as chapters**: each question with your answer, the right answer, the explanation, the book page, and a link to the module. Missed questions go into "Practice missed questions". |
| **Domain drills** | Studying one domain | Shorter sets from one domain, with the explanation shown **straight after each answer** |

**How many mock exams:** a question is assigned to one mock exam only, so exams do not repeat each other. Today's bank supports **3** full exams (limited by Domain 1 with 166 questions and Domain 4 with 156). Adding about 50 questions to Domain 1 and 10 to Domain 4 in Session 25c would allow **4**.

**Open choice for you:** mixed order as on the real exam (recommended, with the review grouped by domain), or the exam itself divided into four domain chapters.
## Session 25a audit results

Measured on 2026-10-10, before any repair. Run the tools again to see the current state.

### What was checked and what was found

| Check | Tool | Result |
|---|---|---|
| Correct answer is the longest option | `tools/check_content.py --report` | **58% of 791 questions** (chance is 25%). 36 of 38 modules are over the 35% limit. Worst: 4.6 (95%), 4.7 (91%), 1.7 (88%), 3.2 (86%). Only 1.1 and 2.7 pass. To be fixed in Session 25c. |
| Same question in two modules | `tools/check_content.py --report` | 5 pairs: 2.10 q1 = 1.9 q1; 3.2 q17 = 2.3 q21; 3.7 q3 = 2.12 q17; 3.7 q18 = 2.12 q19; 4.2 q20 = 2.1 q3 |
| "All of the above" style options | `tools/check_content.py --report` | None |
| Tables: every row has the same number of columns | `tools/check_content.py` | No errors in 38 lessons |
| Markup: sources under headings, bold markers paired | `tools/check_content.py` | No errors |
| Written-out calculations add up | `tools/check_examples.py` | 62 calculations in lessons, quizzes and flashcards: all correct |
| Critical path example (forward pass, backward pass, float) | `tools/check_examples.py` | Recomputed from the network: all 18 rows correct |
| Lessons as rendered in the browser | Headless Edge, page compared with source | All 38 lessons: every table, row, note and source link rendered; no raw markup visible. One lesson also viewed as a screenshot. |
| Source links | `tools/audit_links.py` | 677 links, 42 to figures or tables, none wrong |

Not checked by a tool: calculations that appear only inside tables without an "=" sign, and whether each numeric quiz option matches its explanation.

### Exam outline coverage

Every task and enabler of the CAPM Exam Content Outline (2023), with where it is taught. **45 of 60 enablers are covered, 13 are thin, 2 are missing.**

| Domain and task | Enabler | Where | Status |
|---|---|---|---|
| 1.1 Life cycles and processes | Project, program, portfolio | 1.1 | Covered |
| | Project and operations | 1.1 | Covered |
| | Predictive and adaptive approaches | 1.6 | Covered |
| | Issues, risks, assumptions, constraints | 1.9 | Covered |
| | Review or critique project scope | 2.3 | Covered |
| | Apply the code of ethics | 1.10 | Covered |
| | A project as a vehicle for change | 1.11 only | **Thin** |
| 1.2 Planning | Purpose of cost, quality, risk, schedule | 2.4, 2.6, 2.10, 2.11 | Covered |
| | Project management plan vs product management plan | none | **Missing** |
| | Milestone vs task duration | 2.4 | Covered |
| | Number and type of resources | 2.9 | Covered |
| | Use a risk register | 1.9, 2.10 | Covered |
| | Use a stakeholder register | 2.8 | Covered |
| | Project closure and transitions | 1.7, 2.2 | Covered |
| 1.3 Roles | Project manager and sponsor | 1.3 | Covered |
| | Project team and sponsor | 1.3 | Covered |
| | The project manager as initiator, negotiator, listener, coach, working member, facilitator | none by these names | **Thin** |
| | Leadership and management | 1.10 | Covered |
| | Emotional intelligence | 1.10 | Covered |
| 1.4 Following strategies | Responding to a planned strategy or framework (communication, risk) | 2.8, 2.10 in passing | **Thin** |
| | Project initiation and benefit planning | 1.7, 2.2 | Covered |
| 1.5 Problem-solving tools | Effectiveness of a meeting | 2.12 in passing | **Thin** |
| | Focus groups, standup meetings, brainstorming | 2.12, 4.4 | Covered |
| 2.1 When to use predictive | Suitability for the organizational structure (virtual, colocated, matrix, hierarchical) | 1.2 describes structures; suitability not stated | **Thin** |
| | Activities within each process | 2.1 to 2.11 | Covered, in Eighth Edition process names |
| | Examples of typical activities | 2.1 to 2.11 | Covered, in Eighth Edition process names |
| | Differences between project components | unclear term | **Thin** |
| 2.2 Plan and schedule | Critical path methods | 2.5 | Covered |
| | Schedule variance | 2.7 | Covered |
| | Work breakdown structures | 2.3 | Covered |
| | Work packages | 2.3 | Covered |
| | Quality management plan | 2.11 | Covered |
| | Integration management plan | 2.2, under the name "governance" | **Thin** |
| 2.3 Project controls | Artifacts of predictive projects | 2.1 | Covered |
| | Cost and schedule variances | 2.7 | Covered |
| 3.1 When to use adaptive | Pros and cons of adaptive and predictive | 1.6, 3.1, 3.8 compare, without listing pros and cons | **Thin** |
| | Suitability for the organizational structure | 3.4, 3.8 in passing | **Thin** |
| | Organizational process assets and enterprise environmental factors that help adaptive work | none | **Missing** |
| 3.2 Planning iterations | Logical units of iterations | 3.5 | Covered |
| | Pros and cons of the iteration | 3.5 in passing | **Thin** |
| | Translate a WBS to an adaptive iteration | 2.3, one section | **Thin** |
| | Inputs for scope | 3.5 | Covered |
| | Adaptive vs predictive tracking | 3.7 | Covered |
| 3.3 Controls | Artifacts of adaptive projects | 3.2, 3.7 | Covered |
| 3.4 Adaptive plan | Components of Scrum, XP, SAFe, Kanban | 3.2, 3.3 | Covered |
| 3.5 Task management | Success criteria of a task | 3.2, 4.5 | Covered |
| | Prioritize tasks | 3.6 | Covered |
| 4.1 Roles | Stakeholder roles (process owner, process manager, product manager, product owner) | 4.1 | Covered |
| | Why roles must be identified | 4.1, 4.3 | Covered |
| | Internal and external roles | 4.1 | Covered |
| 4.2 Communication | Most appropriate channel or tool | 4.3 | Covered |
| | Why communication between teams matters for the analyst | 4.3 in passing | **Thin** |
| 4.3 Gathering requirements | Match tools to scenarios (user stories, use cases) | 4.4, 4.5 | Covered |
| | Choose the gathering approach | 4.4 | Covered |
| | Traceability matrix and product backlog | 4.6, 4.5 | Covered |
| 4.4 Product roadmaps | Application of a product roadmap | 4.2 | Covered |
| | Which components go to which releases | 4.2, one paragraph | **Thin** |
| 4.5 Methodologies | The analyst's role in adaptive and predictive work | 4.1 and each module's comparison | Covered |
| 4.6 Validating requirements | Define acceptance criteria | 4.5 | Covered |
| | Ready for delivery, from the matrix or backlog | 4.6, 4.7 | Covered |

"Covered" means a lesson section teaches the point. It does not yet mean the lesson uses the exam's own edition and terms: that is the work of Sessions 25b and 25d. The mapping is my reading of each enabler; three are worded vaguely in the outline ("project components", "logical units of iterations", "responding to a planned strategy").

### Other measurements

| Measure | Value |
|---|---|
| Questions per domain (1 to 4) | 166, 278, 174, 156 |
| Exam weight per domain | 36%, 17%, 20%, 27% |
| Scenario-style questions | 29% overall; Domain 4: 16% |
| Modules citing only the Eighth Edition | 1.1 to 1.9, 2.1, 2.2 |

## Issues log

Every problem met in this project and how it was handled, newest group last. Read this before changing something, to see why it is the way it is. New entries are added at the end of each session.

### Setup and tools

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 1 | Installing Node and Git with winget needed administrator approval, and you did not want anything installed in Windows. | Portable Node and Git in `.tools/`, Python packages in `.venv/`. `env.ps1` puts them on the path for one terminal only; `start.bat` starts the app. | `env.ps1`, `start.bat` |
| 2 | The Claude plugin installer could not find Git, because Git existed only inside the project. | Added `.tools\git\cmd` to your user PATH (the one deliberate change outside the project) and restarted VS Code. | Windows user PATH |
| 3 | PowerShell 5.1 strips quotes from inline Python and has no `&&`. | Scripts are written to files and run from there; commands are chained with `;`. | `tools/` |
| 4 | Two styles (`.title`, `.lesson`) overrode Tailwind utility classes. | Moved them into `@layer components`. | `web/src/index.css` |

### Content rules

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 5 | Module 1.1 was first written from the PMBOK Guide 7th edition; you wanted the 8th. | Rewritten from the 8th edition and the module list restructured. The 8th edition is the primary source for everything. | `web/src/content/capm/` |
| 6 | The 8th edition renames many processes, and PMI's own page was not checked to confirm which edition's terms the CAPM exam uses. | Lessons teach the 8th edition names and show the older name in a column ("Older name you may see"). Still unconfirmed. | Process tables in Domain 2 lessons |
| 7 | Module 1.11 (older editions' terms) is not exam content. | Kept, but flagged `supplementary`, marked with a red bold `*`, and excluded from progress. An edition-trivia question and card were removed from module 1.8. | `course.json`, `NotOnExam.tsx` |
| 8 | Many commonly tested points are not in the 8th edition text (for example the PERT formula, gold plating, rule of seven, contract sub-types, Maslow, levels of conflict). | Included, taken from another PMI book in your folder where one covers it, otherwise from standard PMI teaching. Each lesson's footer lists exactly which points are not from its cited books. | The italic footer of each `lesson.md` |
| 9 | Worked examples (critical path network, road project for earned value, risk and decision-tree numbers, RACI and engagement matrices) are my own. | Checked by hand, not by a script. Each lesson footer says so. | Lesson footers |
| 10 | Quiz answers in module 1.1 were mostly B or C. | The content checker now fails if one letter holds more than 45% of a quiz's answers. | `tools/check_content.py` |

### Sources and PDF links

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 11 | Lessons, quizzes and flashcards showed no source. | Every quiz question has a `ref`; every lesson section has an `@source` line. `tools/link_sources.py` turns these into book and page links. Flashcards use the module's source list, not a page each. | `tools/link_sources.py`, `Sources.tsx` |
| 12 | Sources were listed at the end of a lesson, which was hard to use. | Each lesson section now shows its source directly under its heading. The checker fails if a section has none. | `Lesson.tsx`, `check_content.py` |
| 13 | Edge asked for a password when opening the PMBOK Guides. PMI's PDFs are protected in a way Edge's viewer cannot open. | First added byte-range support to the local server (correct, but not the cause). Then, with your approval, made unlocked local copies in `.cache/pdf/`. They stay on this PC, are excluded from Git, and still carry your name and member ID. | `tools/unlock_pdfs.py`, `web/vite.config.ts` |
| 14 | "Project management plan" linked to page 223 instead of 231, because a bulleted mention came before the real entry. | The linker looks for an entry at the start of a line first, and only then for a bulleted one. All links of that kind were rechecked. | `link_sources.py` |
| 15 | Section headings were not found because the books put an en space, not a normal space, after the section number. This first hit the PMBOK Guide, then the Agile Practice Guide, where all 17 links opened page 18. | The linker matches any whitespace. | `link_sources.py` |
| 16 | The Agile Practice Guide failure in item 15 was silent: every check passed with every link wrong. | For the practice standards and guides, a section that cannot be found is now an error, not a quiet link to the first page. PMBOK Guide references are looked up differently and still fall back to the parent section. | `link_sources.py`, `TOC_BOOKS` |
| 17 | Links to newly added books showed "This page does not exist". The local server read the book list only when it started. | The server reads `books.json` on every request, so a new book works immediately. A missing book now gives a plain message naming it. | `web/vite.config.ts` |
| 18 | Source links cannot work on the future public website, because the PDFs are licensed to you and must never be uploaded. | Links are shown only when the app runs locally. Online, the same place shows the book and page as text. | `Sources.tsx` |
| 42 | A glossary term in a practice guide could not be linked: the link went to the book's first page. | The linker now understands `Glossary (term)` for these books and opens the page that defines the term. A term that is not found is an error. | `link_sources.py` |
| 46 | Three quiz references in module 3.8 named a neighbouring section, not the one that holds the fact (for example 3.10.5 where 3.10.6 was meant). The linker cannot catch this, because both sections exist. | Found by listing every link with its page and comparing it with the page I had read. The references were corrected. This page-by-page check is now done for every new module. | Module 3.8 `quiz.json` |
| 51 | The PMBOK Guide Sixth Edition numbers its sections four levels deep (12.1.1.6), deeper than its table of contents, and your Agile Practice Guide Second Edition file was renamed, which broke its entry in the book list. | The linker now finds a deep section by its heading in the page text when the contents do not list it. The file name in `books.json` was corrected. New reference forms: `PMBOK 6, 12.1.1.6`, `PMBOK 6, Glossary (Scope Creep)`, `Agile Practice Guide, First Edition, 4.3.6`, `CAPM Exam Content Outline, Domain 3`, `The Scrum Guide, Sprint Planning` (by title), `PMI Guide to Business Analysis, 7.5.2.1`, `Business Analysis for Practitioners, Elicit Solution Information` (by title), `PMBOK 7, Glossary (term)`. | `link_sources.py`, `books.json` |

### Books in your folder

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 19 | Modules 2.4 and 2.5 were written without the Practice Standard for Scheduling, although it was in your folder and the plan said to use it. | Added it as a source. Module 2.5 gained critical path activity vs critical activity, shared total float, date constraints and the critical chain buffers. Module 2.4 gained a real source for the PERT formula. Standing rule: check the folder for a matching title before writing each module. | Modules 2.4, 2.5 |
| 20 | The WBS and Estimating practice standards and the Risk practice guide were still unused. | Catch-up session: 2.3 gained the WBS rules, 2.4 relative estimating and biases, 2.6 a source for the rough order of magnitude range, 2.10 a predictive vs adaptive risk comparison. | Modules 2.3, 2.4, 2.6, 2.10 |
| 21 | The catch-up contradicted a figure already taught: the "definitive estimate" range of −5% to +10% is from earlier PMBOK editions; the Estimating standard gives −10% to +15% as its example. | Kept −5% to +10% because exam material uses it, and added a note in the lesson explaining both. | Module 2.6, "Estimate Costs" |
| 22 | No book in the folder covers quality or procurement specifically. | Module 2.11 rests on the PMBOK Guide (Appendix X4 and section 5) plus standard teaching. A candidate for an extra PDF in Session 25. | Module 2.11 |
| 23 | Your Agile Practice Guide is the Second Edition, with different section numbers and wording from the first edition most courses use. It says "supportive leadership" where exam material says "servant leadership", and covers Scrum only briefly. | Written from your edition, using the exam's familiar terms and saying where they are the same thing. Scrum details come from the Scrum Guide and standard teaching, listed in the footer. | Modules 3.1 to 3.4 |
| 24 | *Choose Your WoW!* (Disciplined Agile) is in the folder but was not used for module 3.3. | It matches only one row of the scaling table. Left for the full catch-up in Session 25. | Module 3.3 |
| 41 | The Agile Practice Guide (Second Edition) says little about user stories and estimating, the core of module 3.5. | Sources were combined: the PMBOK Guide's entries on backlog, user stories, release planning and velocity; the Agile Practice Guide's glossary; and the Estimating standard's section on relative estimating. | Module 3.5 |
| 47 | The CAPM Exam Content Outline names the PMBOK Guide **Seventh** Edition, the Process Groups practice guide and the **2017** Agile Practice Guide as exam references. This course is written from the Eighth Edition and the Second Edition agile guide, as decided at the start. | Nothing was rewritten. Lessons already carry edition notes and module 1.11 bridges the terms. The older books are now linked, so differences can be checked. **Decided with you on 2026-10-10:** the Eighth Edition lessons stay, and Sessions 25b and 25d add an exam-terms layer from the Seventh Edition, the Process Groups guide, the 2017 agile guide and the business analysis practice guide. | "CAPM exam structure" above; Session 25 |
| 48 | The outline names a book that was not in your folder: *Business Analysis for Practitioners: A Practice Guide*, Second Edition. | Resolved: you added it on 2026-10-10. It is extracted and linked, ready for Domain 4. Its headings have no numbers, so it is cited by section title. | Sessions 21 to 24 |
| 49 | The Agile Practice Guide First Edition PDF has no built-in table of contents, so its sections could not be looked up. | A table of contents is built from the printed contents pages (`tools/build_toc_agile1.py`). Run it after `extract_pdf.py` for that book. | `tools/build_toc_agile1.py` |
| 50 | A few points are in none of your 19 books (final list, 2026-10-10): the three Cs of a user story (card, conversation, confirmation); the five levels of conflict; one-line definitions of the XP practices; the detailed list of lean wastes; that the project manager usually controls the contingency reserve; that a new team member is a typical cause of regression; "on one side of the mean" in the rule of seven; elapsed time counted in calendar days; the manager vs servant leader comparison table; the feature and task definitions; the list of agile benefits. One quiz question rests on these (the three Cs). | They stay labelled as standard PMI teaching in each lesson footer and quiz reference. They are exam-preparation conventions or come from authors outside PMI (the three Cs from Ron Jeffries, the levels of conflict from Speed Leas). **Decided by you on 2026-10-10: keep them, labelled as they are.** The same rule applies to future modules. | Lesson footers |
| 52 | Checking the Scrum lesson against the Scrum Guide (2020) showed two differences: the guide no longer prescribes the three daily questions, and it speaks of accountabilities and Developers, not roles and a development team. | The lesson keeps the PMI wording, which the exam uses, and its footer now states both differences. All timeboxes, the pillars, the values and the rule for unfinished work matched the guide. | Module 3.2 footer |
| 53 | Two sources had been in your folder all along and were missed: The PMI Guide to Business Analysis covers INVEST, MoSCoW, Kano, WSJF, buy a feature, the Pareto chart and epics; the PMBOK Guide Seventh Edition glossary defines osmotic communication. Module 3.5 even said INVEST "does not appear in PMI's guides", which was wrong. | The sentence was corrected and the sources added. The lesson also now gives the guide's full WSJF formula and notes that the Kano model has five categories. Cause: I searched only the books already linked for the domain being written. The Session 25 catch-up searches every book for every uncited point. | Modules 2.11, 3.4, 3.5, 3.6 |
| 58 | The exam outline lists "process owner" and "process manager" among the roles to know, but The PMI Guide to Business Analysis defines neither. | Module 4.1 covers both in one row of its roles table, sourced from Wysocki's textbook (chapters 6 and 7), and its footer says PMI's guide does not define them. Product owner and product manager come from the PMI guide's glossary. | Module 4.1, "The people a business analyst works with" |
| 61 | The exam outline asks you to "recommend the most appropriate communication channel or tool", but The PMI Guide to Business Analysis describes the engagement and communication approach without listing channels to choose from. | Module 4.3 has a short table matching each need to a channel (workshop, presentation, report, interview, survey), labelled in the footer as my own. Module 4.4 has a similar table for choosing an elicitation technique, built from the strengths and weaknesses the guide gives for each. | Modules 4.3 and 4.4 |
| 62 | Module 4.5 covers nine processes and about twenty-five analysis models, far more than any other module, and the models are diagrams while the lessons are text only. | Kept as one module, with 24 quiz questions and 45 flashcards. Each model gets one line saying what it shows, grouped by its category. No diagrams are drawn. Drawn examples of the main models (context diagram, process flow, entity relationship diagram, state diagram, fishbone) are added to the UI/UX backlog for Session 27. | Module 4.5; UI/UX backlog |
| 63 | To save reading time I filtered short lines out of the book pages. That dropped a list item: the guide's threat strategies appeared to lack "avoid", and I first wrote in the footer that it was missing from the guide. | Caught by re-checking the full page before finishing; the footer was corrected. Lists copied from a filtered page are now checked against the unfiltered page. | Module 4.5, product risks |
| 64 | PMI's guide numbers the solution evaluation processes in an order that is not the order in time (performance evaluation is 9.1 but happens last), and it describes the product portfolio matrix without naming its quadrants. | Module 4.7 keeps the guide's names and process groups, teaches the processes in time order, and says so. The usual quadrant names (stars, question marks, cash cows, dogs) are added in brackets and listed in the footer as not from the guide. | Module 4.7 |
| 65 | In 58% of quiz questions the correct answer was the longest option, so a quiz could be passed by picking the longest answer. I wrote full, careful correct answers and short wrong ones, and no check looked for it. | Found by measuring in Session 25a. `check_content.py` now warns for any module over 35% and lists duplicates and catch-all options. The repair of all quizzes is Session 25c. New questions are written with options of similar length. | `tools/check_content.py --report`; Session 25c |
| 66 | Module 1.11 is marked with a red * as "not on the exam", but it covers the Seventh Edition principles and domains and the 49 processes, which are the exam's own references (issue 47). | To be made exam content and expanded in Session 25b. Until then, treat 1.11 as required reading. | Module 1.11; Session 25b |
| 67 | Five questions appear word for word in two modules. | Listed in the audit results. One of each pair is replaced in Session 25c. | "Session 25a audit results" |
| 54 | The Project Management Answer Book is written as numbered questions inside chapters, with no section numbers, and Wysocki's book has titled sections only. Both are commercial textbooks, not PMI publications. | New reference forms: `The Project Management Answer Book, Chapter 6, Q8` (opens the page of that question) and `Effective Project Management, <section title>`. Like every other book, they are opened from your folder only, are never committed or uploaded, and lessons use original wording. Wysocki is the Fifth Edition, so its page content may differ from the Eighth Edition the outline names. | `link_sources.py` |
| 55 | Wysocki's Eighth Edition lists only chapters in its PDF contents, and it differs from the lessons in two wordings: it calls two lean principles "build integrity in" and "see the whole", and it uses "elapsed time" for duration in working days. | Reference form: `Effective Project Management, Chapter 7, Estimating Duration` (chapter, then the heading as printed). Chapter start pages are listed in `link_sources.py`. The lean table now shows both wordings, and the schedule lesson footer explains the two uses of "elapsed time". | `link_sources.py`; modules 2.4 and 3.3 |
| 59 | A reference to a figure or table in the business analysis guide ("Figure 1-1") would have opened the book's first page without any warning, because that kind of reference was only understood for the PMBOK Guides. | Found while checking each new link against its page, before anything was reported. The linker now finds figures and tables in every book with a table of contents, and reports an error if one is not found. | `link_sources.py` |
| 60 | You asked whether any figure errors remained after issue 59. | Every link in every module was checked by a script: each figure or table link must open the page that carries that caption, and any link sitting on a book's default page is listed for a check by eye. Result: 0 wrong. The script is kept as `tools/audit_links.py` and run after the linker every session. The linker also learned to find unnumbered headings by title ("Key Concepts for Elicitation") in books with a table of contents. | `tools/audit_links.py`, `link_sources.py` |
| 68 | Lessons had never been checked as rendered, worked examples had only been checked by hand, and nothing tested table structure. | Session 25a added three checks: `check_examples.py` recomputes every written-out calculation and the critical path example; `check_content.py` tests tables and markup; and every lesson was loaded in a headless browser and its rendered tables, rows, notes and links compared with the source. All passed. The first version of the calculation check raised two false alarms on formulas written with letters, which was fixed. | `tools/check_examples.py`, `tools/check_content.py` |

### Individual lessons

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 25 | Critical path questions use two ways of counting days (start on day 1 or day 0). | Used day 1, as the PMBOK Guide's example does, with a note that both give the same duration, path and float. | Module 2.5 |
| 26 | Module 2.5 first treated "critical activity" and "critical path activity" as the same. | Corrected from the Scheduling standard, which separates them. | Module 2.5 |
| 27 | The 8th edition shows two budget arrangements (contingency reserve inside or outside the cost baseline). | Taught the standard one (inside), which matches the Guide's own definition, with an edition note. | Module 2.6 |
| 28 | The 8th edition has no separate quality or procurement domain, and no Control Quality process. | Module 2.3 explains that deliverable checking sits in Monitor and Control Scope. Module 2.11 opens with a table of where each piece now sits. | Modules 2.3, 2.11 |
| 29 | The 8th edition merges qualitative and quantitative risk analysis, and defining, sequencing and estimating activities, into single processes. | Lessons teach the parts separately, since the exam still asks about them, and show the older process names. | Modules 2.4, 2.10 |
| 30 | A lesson section was tagged with "PMI standard teaching" as its source, which has no page to link to. | Replaced with the nearest real book entry; the footer carries the "standard teaching" note. | Module 2.6, "Types of cost" |
| 31 | Twice a section cited a page that did not support it (adaptive risk in 2.10, levels of conflict in 3.4). | 2.10 was rewritten from the Risk practice guide. 3.4 now cites only the page on the leader's role in conflict and says in its text that the five-level model is from outside the guide. | Modules 2.10, 3.4 |
| 32 | The 8th edition lists tools alphabetically, which is hard to study. | Module 2.12 groups them into eight families by purpose. The grouping is my own arrangement, as older editions did. | Module 2.12 |
| 33 | The four Agile Manifesto values cannot sensibly be reworded. | The four values are quoted; the twelve principles are paraphrased. | Module 3.1 |
| 43 | INVEST and the three Cs are tested but appear in none of PMI's guides, so the section on them cannot cite a page that contains them. | The section cites the nearest real entries (user stories, definition of ready) and says in its own text that INVEST comes from outside PMI's guides. Same approach as item 31. | Module 3.5 |
| 44 | The Agile Practice Guide (Second Edition) no longer recommends velocity as a measure outside the team, and does not describe burndown charts. Both are still standard exam material. | Module 3.7 teaches velocity and burn charts from the PMBOK Guide's own entries, teaches the flow metrics the practice guide prefers, and carries an edition note explaining the difference. | Module 3.7, "Velocity" |
| 45 | Module 3.8 (hybrid) overlaps module 1.6, which already introduces hybrid approaches and the factors for choosing one. | 3.8 goes deeper where 1.6 is brief: the four hybrid patterns with examples, the three hybrid levels, Stacey, Cynefin and the suitability filter. The choosing factors are kept as one short table. | Modules 1.6 and 3.8 |

### App features

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 34 | You asked whether progress survives closing the browser and wanted to be able to undo marks. | Progress is saved in the browser's local storage. Every mark can be removed in each module's progress panel. Backup download and restore on the home page. | `web/src/lib/progress.ts`, `ModuleProgress.tsx` |
| 35 | Quizzes taken before the dashboard existed saved only a score, not each answer. | The practice list starts empty and fills from quizzes taken from 2026-10-10 on. Old scores are kept. | `progress.ts` (`answers`) |
| 36 | Clearing a module's quiz score would have left its missed questions in the practice list. | Clearing the score also clears that module's per-question history. | `clearQuiz` in `progress.ts` |
| 37 | Adding per-question results and study days must not break existing saves or old backups. | Added as optional fields with empty defaults, without changing the save version. Tested with an old save and a version 1 backup (21 checks). | `migrate` in `progress.ts` |
| 38 | The Dashboard and Practice pages work but look raw and unpolished (your feedback after trying them). | Recorded in the UI/UX backlog for the polish session. Not changed yet. | UI/UX backlog above |
| 39 | Phone layout cannot be checked with the screenshot tool, which does not render narrower than about 500 pixels. | Unverified. To be tested on a real phone or with a proper browser tool in the polish session. | UI/UX backlog |
| 40 | Screenshots are taken with a headless browser that cannot click or show PDFs. | Pages are viewed with sample data loaded by a temporary page that is deleted afterwards. Clicking through and PDF display are always left for you to confirm. | Session reports |
| 56 | While adding the countdown to the home page, the tool I used to insert the code swallowed two pieces of it: the day count vanished from the heading ("days to your CAPM exam") and a link lost its style. The build still passed, because the result was valid code. | Caught on the screenshot, fixed, and screenshotted again. Lesson: a passing build does not prove a page is right; every feature is viewed before it is reported done. | `web/src/pages/Home.tsx` |
| 57 | A study plan built only from written modules would understate the work while Domain 4 is unwritten. | Unwritten modules are part of the plan and marked "not written yet". The home page lists only written ones under today's tasks. An exam day that has passed, or one needing more than a module a day, shows a clear message. The date arithmetic has 13 automated checks (month ends, year end, exam today, date passed, nothing left). | `web/src/lib/plan.ts`, `web/src/pages/PlanPage.tsx` |
