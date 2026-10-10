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
| 2026-10-10 | Your mock exam decisions recorded: two modes (practice mode grouped by domain, real exam mode) and four mock exams. **Session 25b done:** module 1.11 is now exam content (renamed, 7 new questions on the Seventh Edition); new module 1.12 teaches the 5 process groups, 10 knowledge areas and all 49 processes; "On the exam" notes added to 12 modules in Domains 1 and 2; four outline gaps filled (organizational structure suitability, project management plan vs product plans, the six project manager roles, projects as a vehicle for change). **CAPM is now 39 modules, 827 questions, 1,208 flashcards.** Issues 69 and 70 added. | Next: Session 25c, quiz repair |
| 2026-10-10 | **Session 25c done: quiz repair.** One wrong option was rewritten in 250 questions so the right answer no longer stands out by length: the share where it is the longest option fell from 58% to 27% (chance is 25%), and all 39 quizzes are under the 35% limit. The 5 duplicated questions were reworded as scenarios, and 6 scenario questions were added to Domain 4. **833 questions**: 219 / 278 / 174 / 162 per domain, enough for four mock exams (216 / 104 / 120 / 160). Issue 71 added. | Next: Session 25d |
| 2026-10-10 | **Session 25d done, which completes Session 25.** Domain 3 now has the 2017 Agile Practice Guide's terms (servant leadership, daily standup, team facilitator) and three new sections: pros and cons of adaptive and predictive, what helps or hinders agile in an organization, and iterations with the WBS-to-backlog mapping. Domain 4 has the practice guide's five domains, a section on communication between teams, and one on which features go into which release. **CAPM: 39 modules, 840 questions, 1,208 flashcards.** Outline coverage: 59 of 60 points. No further PDFs are needed. Issues 72 and 73 added. | You: study modules 1.11 and 1.12 first; they are the exam's own framework. Next: Session 26, the mock exams, starting in plan mode |
| 2026-10-10 | **Session 26 done: mock exams.** Four fixed mock exams of 150 questions (54 / 26 / 30 / 40 by domain), each in practice mode (one chapter per domain, explanation after each answer) or real exam mode (mixed order, two halves of 75, 10-minute break, flagging, nothing marked until the end). Strict 3-hour clock in both. Result per domain with a rating, then a review by domain. Mock exam 4 is kept unseen: its 150 questions are out of the module quizzes, which now hold 690. | You: try Mock exam 1 in practice mode, then a few questions in real exam mode, and report anything odd. Next: Session 27 (UI/UX polish) |
| 2026-10-10 | **Session 27 done: UI/UX polish on every page.** Dark theme and a text size control in the top bar; larger question text, bigger buttons and softer colours for long sittings; one shared set of headings, buttons, tables and notices used by all pages; phone layout; redesigned Dashboard (domain chart, 14-day activity, mock exam results), Practice (choose a domain, progress track, list of questions missed again) and Study plan (timeline, schedule by week); wide lesson tables; seven drawn diagrams in modules 3.7, 4.2 and 4.5. | You: try the Dark switch and the three A buttons, open one page on your phone if it can reach this PC, and tell me anything that still looks off. Next: Session 28 (go online) |
| 2026-10-10 | **Session 28a and 28b done; 28c prepared.** New: automated click tests (13, all passing, also against the production build); a list of sections beside each lesson and a "continue from" link; search over lessons and flashcards; a printable formula and key facts sheet; weak spots, time per question and a score trend for mock exams; a readiness estimate; mock exam dates and flashcards due in the study plan. The click tests found and fixed a real fault in real exam mode. Ready to upload: safety check, site icon, no-listing settings. | You: create a private GitHub repository named `road-to-pmi` (no README) and send me its address. Then Vercel, then Session 28d (sync). |
| 2026-10-10 | Site renamed from "Road to PMI" to **Road to PMP** at your request (browser tab, top bar, phone home screen name, backup file name). Private GitHub repository created by you: `ansellreff/road-to-pmp`, and the project is connected to it. The upload itself needs your sign-in, so it is done by double-clicking `upload.bat`. | You: double-click `upload.bat`, then import the repository on Vercel with Root Directory `web`, then send me the site address |
| 2026-10-10 | **The platform is online: https://road-to-pmp-d82g.vercel.app** You uploaded with `upload.bat` and deployed on Vercel. Checked on the live site: all 13 click tests pass, a lesson address opens directly, search engines are told not to list it, and the books address returns no PDF. | You: open it on your phone, and bring your progress over with Download backup (on this PC) and Restore from backup (on the site). Next: Session 28d (sync), which needs a free Supabase project |
| 2026-10-10 | **Session 29 done: navigation, side panels and a richer, more interactive look**, from your feedback after using the site. Search box with suggestions in the top bar; a Modules menu reaching every lesson from any page; a right-hand panel on lessons, quizzes, flashcards, mock exams, results and the formula sheet; previous and next through every module; cards, icons, domain colours and progress rings; the course page as cards; the home page as a "today" hub; answer feedback, confirmation messages, a streak counter, a daily goal and 13 milestones. 18 click tests pass. Sync between PC and phone is paused at your request. | You: look at http://localhost:5173, then double-click `upload.bat` to put it online, and tell me what you think of the look and the animations |
| 2026-10-10 | **Flashcard status made visible**, from your feedback that "I know this" changed nothing you could see. Each card's edge now glows green (known) or amber (still learning), and is neutral grey when not learned yet, with the word in its corner; a strip above the card shows the whole deck in those colours and opens any card; a rated card stays for a moment in its new colour before the next one comes. Also on the Review cards page and in the side panel. | You: try a deck, then `upload.bat` when you are happy |
| 2026-10-10 | **Session 30: more and better questions.** 54 new scenario questions for modules 1.1 to 1.9, so those quizzes have 17 to 20 questions instead of 11 to 14. 112 recall questions in Domains 2, 3 and 4 reworded as situations, with options and answers unchanged. Scenario questions are now about half of the bank (49%, from about a third). Question bank: 894. Sync between PC and phone is resumed at your request and waits for a Supabase project. | You: create a free Supabase project and send me its Project URL and anon public key; run `upload.bat` to publish the new questions |
| 2026-10-10 | **Session 28d built: sync between PC and phone.** Optional sign-in by email on the home page; progress uploads a few seconds after each change and downloads when the site opens; two devices changed apart are merged; a deletion on one device reaches the others. Tested with two browser profiles against a simulated server (19 click tests pass). Not yet tested against your real Supabase project: that needs the setup below and your inbox. | You: in Supabase run `supabase/setup.sql` and set the site address (steps under "Sync between devices"); run `upload.bat`; then sign in on the PC and the phone and tell me what happens |
| 2026-10-10 | Sync: your Supabase setup is in place (the table exists and refuses anyone not signed in) and **sign-in worked on your phone**. On the PC the link was refused as invalid or expired. A sign-in link works once, on one device; the app now says so, and clears the stale waiting state. | You: on the PC, ask for a new email and open that link on the PC; or add the code line to the email templates and type the code |
| 2026-10-10 | Sync: **password sign-in added**, so every device can be signed in at the same time without waiting for emails. On a signed-in device you choose a password; on the others you sign in with email and password. Signing out now ends the sign-in on that device only (before, it would have ended it on all of them). | You: run `upload.bat`; on the phone (already signed in) save a password under "Sync between your devices"; on the PC sign in with it |
| 2026-10-11 | **Sync confirmed by you on the real service:** saving and syncing between the PC and the phone works, with both signed in. Session 28d is complete, and with it everything planned for CAPM. | Next: decide what comes after CAPM (PMP needs the current PMP Exam Content Outline in the materials folder) |
| 2026-10-11 | **Session 31a, first sitting: Domain 1 checked against the exam's own books.** Two topics were missing from the course and are now taught: the three types of PMO (module 1.2) and the 7th edition's named models for change, coaching, team development and negotiation (module 1.10). Eight "On the exam" notes added where the exam's book words or counts something differently. 15 new questions and 22 new flashcards for these. Bank: 909 questions, 1,230 flashcards. Not yet compared: modules 1.4 and 1.5 against the 7th edition's twelve principles, and 1.7, 1.11, 1.12 against the Process Groups guide. | You: `upload.bat` to publish. Next sitting: finish Domain 1 (the twelve principles, process groups), then Domain 2 |

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
| ✅ | 25 | Full catch-up, requested 2026-10-10 and planned with you. In four parts: |
| ✅ | 25a | Audits: quiz quality check, table and markup check, worked-example check, render check of every lesson, exam outline coverage map |
| ✅ | 25b | Exam alignment of Domains 1 and 2: module 1.11 becomes exam content and is expanded; "On the exam" notes from PMBOK 7 and the Process Groups guide; fill the outline gaps |
| ✅ | 25c | Quiz repair: remove the longest-answer give-away in all quizzes, remove duplicates, top up Domain 1, add scenario questions |
| ✅ | 25d | Exam alignment of Domains 3 and 4 (2017 Agile Practice Guide, Business Analysis for Practitioners); final list of PDFs; close the edition question |
| ✅ | 26 | Feature: mock exams. Four fixed exams, practice mode and real exam mode, strict clock, result and review per domain, Mock exam 4 unseen. Built by `tools/build_exams.py`; details under "Session 26: mock exams as built". |
| ✅ | 27 | UI/UX polish on every page: dark theme, text size control, reading comfort, shared styles, phone layout, redesigned Dashboard, Practice and Study plan, wide tables, seven diagrams. Details under "Session 27: the look and feel as built". |
| ✅ | 28a | Click tests; lesson sections and resume; search; formula sheet |
| ✅ | 28b | Weak spots and timing for mock exams; readiness estimate; mock exams in the study plan |
| ✅ | 28c | Online at https://road-to-pmp-d82g.vercel.app from the private repository `ansellreff/road-to-pmp`. Checked with the click tests. Phone check by you still open. |
| ✅ | 28d | Sync between PC and phone through Supabase: sign-in by emailed link or by password, several devices at once. Confirmed working by you on 2026-10-11. |
| ✅ | 29 | Navigation, side panels and a richer look, from your feedback: search suggestions, Modules menu, right-hand panel, previous and next, cards and rings, home hub, feedback, streak, daily goal, milestones. Details under "Session 29: navigation and look, as built". |
| ✅ | 30 | Questions: 54 new scenario questions in Domain 1; 112 questions in Domains 2 to 4 reworded as situations. Details under "Session 30: questions". |
| 🟡 | 31 | Strengthen CAPM before the exam: 31a accuracy check against the exam's books (Domain 1 mostly done; Domains 2 to 4 to do), 31b new scenario questions, 31c Mock exam 5, 31d keyboard shortcuts, 31e more diagrams. Details under "Session 31a: lessons compared with the exam's books". |

Every content session ends with the source linker (`tools/link_sources.py`), the content checker (`tools/check_content.py`) and a build passing.

### Ideas offered and not chosen (2026-10-10)

Offered before going online; you chose others. Still available if you want them later.

- More Domain 1 questions (its early quizzes have 11 to 14), and more scenario questions everywhere
- Line-by-line check of lessons against PMBOK 7 and the business analysis practice guide
- More diagrams: network diagram with critical path, earned value chart, WBS tree, control chart, burnup, decision tree, use case diagram
- Keyboard shortcuts in quizzes and exams
- Matching (drag-and-drop style) questions
- Faster first load


### UI/UX backlog

All items collected up to Session 27 are done (see "Session 27: the look and feel as built"). Add new ideas here as they come up.

- Not done: drawn examples of the other models named in module 4.5 (ecosystem map, feature model, use case diagram, decision tree, data flow diagram, wireframe) and a burnup chart in module 3.7. Say if you want them.

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

Overall: **39 of 39 modules done** (909 quiz questions, 1,230 flashcards). Of the 909 questions, 600 are used by the four mock exams and 150 of those (Mock exam 4) are held back from the module quizzes, which show 759.

| Status | Domain | Modules done |
|---|---|---|
| ✅ | 1. PM Fundamentals and Core Concepts | 12 / 12 |
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
| ✅ | 1.11 The Exam's Framework: 12 Principles and 8 Performance Domains (exam content since 2026-10-10) | 2026-10-10 |
| ✅ | 1.12 Process Groups, Knowledge Areas and the 49 Processes | 2026-10-10 |

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

## Source books: final list after Session 25

**Linked and used (19):** PMBOK Guide 8th, 7th and 6th Editions; Process Groups: A Practice Guide; Agile Practice Guide 1st (2017) and 2nd Editions; The PMI Guide to Business Analysis; Business Analysis for Practitioners, 2nd Edition; the practice standards for Scheduling, Estimating and Work Breakdown Structures; the standards for Earned Value Management and for Risk Management; the Risk Management practice guide; the PMI Code of Ethics; the Scrum Guide (2020); The Project Management Answer Book; Wysocki's Effective Project Management, 8th Edition; the CAPM Exam Content Outline.

**In your folder, not used for CAPM (6):** Choose Your WoW! (Disciplined Agile); The Standard for Program Management; the two AI titles; the P5 sustainability standard; Wysocki, 5th Edition (replaced by the 8th). None is an exam reference. Choose Your WoW! and the Program Management standard will be useful for PMI-ACP and PMP.

**Further PDFs needed for CAPM: none.** Every book the exam outline names is now in the folder and linked. One optional extra, for question style only, is the *CAPM Exam Official Cert Guide*, which the outline mentions as a study aid.

**Which book is the exam's reference for each domain:**

| Domain | Exam references | Where the course gives the exam's terms |
|---|---|---|
| 1 | PMBOK Guide 7th Edition; Process Groups guide | Modules 1.11 and 1.12, and "On the exam" notes |
| 2 | Process Groups guide | Module 1.12, and an "On the exam" note in each of 2.2 to 2.11 |
| 3 | Agile Practice Guide (2017) | Notes and new sections in 3.1, 3.2, 3.4, 3.5 |
| 4 | The PMI Guide to Business Analysis; Business Analysis for Practitioners | The whole domain is written from the first; note in 4.1 on the second |
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

**Decided with you on 2026-10-10:** both. **Practice mode** groups the questions by domain; **real exam mode** mixes them as the real exam does. There will be **four** mock exams, each usable in either mode. Four exams need 216 / 104 / 120 / 160 questions for Domains 1 to 4; the bank has 218 / 278 / 174 / 156 after Session 25b, so Domain 4 needs a few more (Session 25c).
## Session 26: mock exams as built

Built on 2026-10-10 from the plan you approved.

| | Practice mode | Real exam mode |
|---|---|---|
| Order | Four chapters, one per domain, in any order | All domains mixed, fixed order |
| Feedback | Right answer, explanation and book page after each answer | Nothing until the exam is submitted |
| Clock | 180 minutes, real time | 180 minutes, real time |
| Break | None | 10 minutes after question 75; questions 1 to 75 are then locked |
| Going back | No, each answer is final | Yes, inside the open half, through a numbered grid |
| Flagging | No | Yes; a check screen lists unanswered and flagged questions before each half is closed |

- **Result:** correct answers and percentage per domain with a rating, overall score, time used, then every question by domain with your answer, the right answer, the explanation, the book page and its module. Filters: wrong or unanswered, flagged, all.
- **Ratings** are PMI's four names. PMI does not publish the scores behind them, so the limits are this platform's own: Above Target from 80%, Target from 65%, Below Target from 50%, otherwise Needs Improvement. Change them in `web/src/lib/exam.ts`.
- **All 150 questions count.** The real exam has 15 unscored questions that cannot be told apart.
- **Answer order** is fixed per exam and differs from the module quiz, and each letter is the right answer equally often.
- **The exams are fixed.** `web/src/content/capm/exams.json` lists each exam's questions. `tools/build_exams.py` refuses to replace it without `--rebuild`, because rebuilding changes every exam and makes saved results point at different questions. New questions added later stay out of the exams.
- **Mock exam 4** is unseen only for module quizzes you had not taken before 2026-10-10. The list shows how many of its questions you have already answered.
- **Assumptions to confirm:** the break does not use exam time (PMI's outline does not say); practice mode runs on the same strict clock, so reading explanations uses time.
- **Not included:** drag-and-drop, hot spot and comic-strip questions. Every question is multiple choice.

## Session 27: the look and feel as built

Built on 2026-10-10. The identity is unchanged (the project schedule look); it is now finished and the same on every page.

**Reading comfort for a three-hour sitting**
- No pure white and no pure black in either theme. Light: off-white paper, navy text. Dark: deep navy, off-white text.
- Question text is 20 px and option text 18 px with open line spacing; a line is about 75 characters at most.
- Every button, option and grid cell is at least 44 px tall.
- Right and wrong are shown by a word and a mark (✓ Correct answer, ✗ Your answer, "Not correct. The right answer is B.") as well as by colour. A flagged question carries a ⚑.
- The exam screen has no animation except the clock, which turns red once, in the last ten minutes.
- All motion is switched off when the device asks for reduced motion.

**Display controls (top bar)**
- **Dark / Light** switch. The first visit follows the device's own setting; after that your choice is kept.
- **Three A buttons** for normal, large and larger text. The whole page scales.
- Both are remembered in the browser, separately from study progress, so a backup restored on another device does not change how it looks there.

**One shared set of styles**
- Colours: 16 named tokens in `web/src/index.css`, each with a light and a dark value. `tools/check_contrast.py` checks 27 text and outline pairs in both themes against WCAG AA; all pass.
- Buttons, links, heading sizes, section rules and notes: `web/src/lib/ui.ts`.
- Page heading, headline figures, notices, progress bars: `web/src/components/Page.tsx`.
- Tables outside lessons use one style (`data-table`) and turn into labelled rows on a phone.
- To change how something looks everywhere, change it in those three files.

**Phone**
- The page links sit on a second row that scrolls sideways; nothing is hidden behind a menu.
- Tables stack, the mock exam grid has 6 columns, and diagrams keep a readable size and scroll sideways instead of shrinking.

**Redesigned pages**
- **Dashboard:** a chart with one row per domain on a shared 0 to 100% scale, the 70% target drawn through, quiz average as the thick bar and completion as the thin one; a 14-day activity strip; the latest result of each mock exam with a rating per domain.
- **Practice:** choose all missed questions or one domain; the same progress track as a module quiz; a running score; at the end, the questions missed again with links to their modules.
- **Study plan:** a timeline from today to the exam drawn to scale (study, final review, exam); the schedule grouped by week with this week open; the final review names the mock exams.

**Lessons**
- Text stays at reading width; a table may use the full page width.
- Seven diagrams, drawn as original examples (a clinic's booking system and an online order), not copies of the books' figures: context diagram, process flow with swim lanes, entity relationship diagram and state diagram in module 4.5; fishbone diagram in module 4.2; burndown chart and cumulative flow diagram in module 3.7. The burndown chart uses the numbers of the lesson's own table.
- A lesson places a diagram with a line `@diagram name`. The checker fails on an unknown name.

**Checked by screenshot** (sample progress, headless browser): dashboard, study plan, practice start, quiz, course, flashcards, lesson 4.5 and all seven diagrams, mock exam list, real exam mode and result; in light or dark, and home, dashboard, exam list, real exam mode and result at a 390 px phone width.

**Not checked:** clicking, hover and pressed states, a real phone, and these screens as pictures: review cards, page not found, a practice session in progress, practice mode and the break in a mock exam. They use the same shared parts as the pages that were viewed.

## Session 28: improvements before going online, as built

You chose eight improvements on 2026-10-10 and said the content needs no major change.

**Click tests** (`web/tests/`, run with `npm test` while the platform is running)
- 13 tests drive the Edge browser already on this PC through whole visits: a full quiz, a practice session, a mock exam in each mode (answer, change, flag, grid, break, lock, submit), time running out, theme and text size, flashcards, lesson sections, search, the formula sheet, readiness and the study plan.
- Each test uses a fresh private profile, so your saved progress is never touched.
- `web/tests/shot.mjs` takes a picture of any page with sample progress. It replaces the temporary test pages used before.
- `BASE=http://... npm test` runs the same tests against another address, such as the production build or the live site.

**Lessons**
- Every section has its own address, for example `/capm/2-07-earned-value#indices-cpi-and-spi`.
- A bar at the top of the lesson names the section you are in and folds out into the list of sections. On a very wide screen (1536 px and more) the list stands beside the lesson instead.
- The last section reached is remembered per lesson, and a "Continue from" link is offered. The page does not jump by itself.

**Search** (top bar)
- Searches lesson sections and flashcards, marks the words found, and opens the lesson at the section.
- Quiz and mock exam questions are left out on purpose, so search cannot show a question before you meet it.
- Deviation from the plan: there is a Search page with its box, linked from the top bar, not a box inside the top bar itself. The bar has no room for one beside seven links.

**Formulas and key facts** (top bar: Formulas)
- 24 formulas in four groups and 7 lists, each repeating an existing lesson section, linking to it and showing that section's own book sources. Printable.
- Content: `web/src/content/capm/sheet.json`. The checker fails if an entry points at a section that does not exist or has no source; the example checker recomputes its worked numbers.

**Mock exams**
- Result page: "Where the points went" lists the modules with the most lost questions. "How you used the time" shows the average per question, the pace the exam allows (72 seconds), how many questions took more than twice that, and the ten slowest.
- Time is counted while a question is on screen and not during the break. Exams taken before this have no timing and say so.
- Dashboard: every attempt, newest first, with the rating per domain; a line of the overall score across attempts; weak spots over the latest attempt of each exam.

**Readiness estimate** (dashboard, and one line on the home page)
- Per domain: the average of your best quiz scores, counting a quiz not yet taken as zero. Once a mock exam is taken, the domain is 60% mock exam result and 40% that quiz figure. Domains are combined by exam weight.
- It names the domain where study would raise the figure most.
- It is an estimate of preparation, not a prediction of passing. The 60/40 split is my choice; change `MOCK_SHARE` in `web/src/lib/readiness.ts`.

**Study plan**
- The final review lists each mock exam with a date: the first on the first review day, the unseen Mock exam 4 two days before the exam, the others spread between. A review too short for all four schedules what fits and says so.
- "This week" shows how many flashcards fall due on each of the next 7 days. The home page shows a mock exam on the day it is planned.

**Going online, prepared**
- `tools/check_publish.py` must pass before every upload: no PDF or document, nothing from the book folders or caches, no file over 1 MB, and none of your private details in any tracked or built file. The details are read from `.cache/private-terms.txt`, which stays on this PC.
- Search engines are told not to list the site in three places: the page, `robots.txt`, and a response header set in `web/vercel.json`.
- A site icon and "Add to home screen" details for a phone.
- Checked on the production build served locally: all 13 click tests pass; sources show as text ("PDF page 274") with no link; the books address returns no PDF; a deep link opens.

## Session 29: navigation and look, as built

Built on 2026-10-10 from four things you reported after using the site: search opened a separate page; the module list was missing from the top menu; the lesson's section list was folded away at the top; and the whole felt plain and not interactive.

**Top bar**
- Row 1: site name, the search box, the streak counter, text size and theme. Row 2: Modules, Practice, Study plan, Dashboard, Formulas.
- **Modules** opens a panel with the four certifications (CAPM live; PMP, PMI-ACP and PMI-SP shown as planned) and every module of the open one by domain, with completion marks. Any lesson is one click from any page.
- **Practice** groups mock exams, missed questions and flashcards, each with what is waiting.
- The platform remembers the certification opened last; Practice and Formulas follow it. This is what will let PMP slot in without changing the menu.

**Search**
- Suggestions appear under the box as you type: modules, then lesson sections, then flashcards with their answer shown in the list. Arrow keys and Enter choose, Escape closes, "See all results" opens the full page.
- Fast because the search text is one file built together with the site (`web/vite.config.ts`, always made from the current content) and fetched in the background after a page opens. Module titles are suggested at once, before that file arrives. The file is about 850 kB, 200 kB as sent.
- A section found by its text, not its heading, shows the line that matched.
- Quiz and exam questions are still left out of search.

**Right-hand panel** (`web/src/components/SidePanel.tsx`)
- Lesson: the sections of the lesson, the one being read marked, the ones above it ticked; under it the modules of the domain with their completion, like a course outline. It stays in view while you scroll.
- Quiz and flashcards: what is done in this module, and the same module list.
- Mock exam, real mode: the question grid and the finish button beside the question. Result: score by domain and jumps to each part. Formula sheet: jump list and print.
- The page is wider (1280 px) so the lesson column and wide tables keep their room.
- Phone: a **Contents** button stays at the bottom of the screen and slides the panel in; in a mock exam the grid follows the question instead.

**Previous and next**
- Lesson to quiz to flashcards to the next module, across domain boundaries, with a smaller way back. The last module leads to the mock exams.

**Look**
- Raised cards for what can be opened, flat text for what is read; cards lift under the pointer.
- One set of line icons (`web/src/components/Icon.tsx`).
- A colour per exam domain (blue, violet, teal, rose), used as an accent on module cards, the exam blueprint and the dashboard. All four pass the contrast check in both themes; the check now covers 35 pairs.
- Progress rings (`web/src/components/Ring.tsx`).
- **Course page:** foldable domains; each module a card with a ring, marks for lesson, quiz and flashcards, and one button for the next step in it.
- **Home page:** a large Continue card (the module opened last, or the first unfinished one, with the next step); four tiles (daily goal, streak, readiness, flashcards due); today's plan as cards; then the exam blueprint, certification path and backup.

**Feedback and motivation**
- A right answer pulses once, a wrong pick shakes once, the explanation slides in, and scores count up. In module quizzes and practice only.
- Short messages confirm actions (lesson marked complete, exam day saved, backup downloaded, daily goal changed).
- The streak is in the top bar on every page and turns amber once you have studied today.
- **Daily goal:** 20 by default, changeable on the home page (off, 10, 20, 30, 50). Every answered question, rated flashcard and completed lesson counts one.
- **Milestones:** 13, listed on the dashboard: first lesson, first quiz passed, each domain completed, 100 and 500 questions, 7- and 30-day streak, first mock exam, a mock exam at 70%, all mock exams. Each is announced once.
- **Mock exams stay calm:** no animation, no message and no milestone announcement on a mock exam screen, in either mode. A milestone earned there is announced when you leave.
- All motion is off when the device asks for reduced motion.

**Flashcard status** (`web/src/components/FlipCard.tsx`)
- Three states, each with a colour, an icon and a word, so it never depends on telling colours apart: **Known** (green), **Still learning** (amber), **Not learned yet** (neutral grey, with a fainter halo).
- The card's edge glows in that colour and its corner carries the label, on both sides of the card.
- Above the card, one small cell per card of the deck in its colour; the open card is outlined, and selecting a cell opens that card.
- Counts of each state above the deck and in the side panel.
- After you rate a card it stays about two thirds of a second in its new colour, then the next card comes.
- "Still learning" is amber whether or not the card was known before: the saved data does not record the earlier state.

**Newly saved with your progress:** the module opened last, the daily goal, and which milestones have been announced. Old saves and backup files still load.

## Session 30: questions

Done on 2026-10-10. You asked for the short Domain 1 quizzes and the low share of scenario questions to be fixed.

**Domain 1: 54 new questions**
- Six new questions in each of modules 1.1 to 1.9, all short scenarios, written only from what each lesson teaches. Each cites a source the lesson already cites, so its book page link was made by the linker.
- Module quizzes 1.1 to 1.9 now have 17 to 20 questions (were 11 to 14 after Mock exam 4 was reserved).
- The new questions are not in any mock exam: the exams are fixed, so they did not change.

**Domains 2, 3 and 4: 112 questions reworded**
- A recall question ("What is a warranty period?") became a situation ("A supplier's contract says the product has a 60-day warranty period. What is a warranty period?"). Only the wording of the question changed. The four options, the right answer, the explanation and the source are exactly as before, so nothing could become wrong by the change.
- 36 in Domain 4, 41 in Domain 3, and 35 in the six Domain 2 modules that had the fewest scenarios (2.1, 2.2, 2.3, 2.6, 2.7, 2.8).
- Some of these questions are in the mock exams, where they now appear in their new wording. Your saved results stay valid.

**Scenario share** (`tools/scenario_report.py`: a question counts when it sets a scene in a statement before asking)

| Domain | Before | After |
|---|---|---|
| 1 | about 32% | 45% |
| 2 | 39% | 52% |
| 3 | 31% | 54% |
| 4 | 24% | 46% |
| All | about 33% | 49% |

The Domain 1 and overall "before" figures are worked back from today's counts; the others were measured before the change.

**Quality checks:** right answers stay spread over A to D; the right answer is the single longest option in at most 29% of any Domain 1 quiz; no duplicated question; every question has a book page link.

**Limits:** modules 1.10, 1.11 and 1.12 were not touched (1.11 and 1.12 are 17% and 12% scenarios, because they teach lists and names). A reworded question still tests the same fact as before; it is easier to recognise than a question written fresh as a scenario with new options.

## Session 31a: lessons compared with the exam's books

The exam is written from the PMBOK Guide, Seventh Edition, *Process Groups: A Practice Guide*, the 2017 Agile Practice Guide and the two business analysis books. The lessons were written from the Eighth Edition. This section records, module by module, what was read against what, what differed, and what was done. "Note" means an "On the exam" note was added under the section, with a link to the book page.

### Domain 1 (first sitting, 2026-10-11)

| Module | Compared with | What differed | What was done |
|---|---|---|---|
| 1.1 | PMBOK 7, Standard 1.2 and 2.1 (pages 31 to 38) | Project management: the 7th edition ends the definition with "to meet project requirements", not "to meet or exceed the intended value". Value: defined as "the worth, importance, or usefulness of something". Program, portfolio, outcome, the value delivery system and the flow of information are the same. | 2 notes, 1 question, 1 flashcard |
| 1.2 | PMBOK 7, Standard 2.2 and 2.4 (pages 39, 43 to 45); Process Groups guide 2.1, 2.2, 2.6 (pages 59 to 70) | The 7th edition does not use "EEF" or "OPA": it speaks of the internal and external environment. The Process Groups guide uses EEFs and OPAs as the lesson does. **Missing from the course: the three types of PMO** (supportive, controlling, directive). | 1 note; new section on the PMO; 3 questions, 4 flashcards |
| 1.3 | PMBOK 7, Standard 2.3 and 2.5 (pages 39 to 46) | The 7th edition has **eight** functions, four under different names, plus "maintain governance". It also defines customer and end user separately. Product life cycle is the same. | 1 note, 2 questions, 2 flashcards |
| 1.6 | PMBOK 7, Guide 2.3 (pages 128 to 141) | Iterative and incremental are described under **hybrid** as well as adaptive, with their own definitions. Sample predictive phases are feasibility, design, build, **test, deploy**, close (the lesson's Eighth Edition list says check, transfer). Agile iterations "1 to 2 weeks"; team of "7 ± 2". Three more selection factors. | 1 note, 1 question, 2 flashcards |
| 1.8 | PMBOK 7, Guide 3.3 and 3.4 (pages 229 to 237) | The 7th edition lists **five** things to tailor: it adds tools, and methods and artifacts. It mentions a value delivery office. The four tailoring steps and the approval rule are the same. | 1 note, 1 question, 1 flashcard |
| 1.9 | PMBOK 7, Guide 2.8.4 and 2.8.5 (pages 217 to 222) | Same definitions and the same five plus five responses. The 7th edition adds active and passive acceptance, and secondary and residual risk. | 1 note, 1 question, 2 flashcards |
| 1.10 | PMBOK 7, Guide 4.2.1, 4.2.4, 4.2.6, 4.2.7 (pages 250 to 265); headings of Guide 2.2 | The 7th edition lists **six** ways of addressing conflict, not five. **Missing from the course: its named models**: Situational Leadership II, OSCAR, five change models (Managing Change in Organizations, ADKAR, Kotter, Satir, Bridges), Drexler / Sibbet, think win-win, Boehm's planning model. Emotional intelligence, the high-performing team factors and the leadership structures match. | 1 note; new section "Models the exam's guide names"; 6 questions, 10 flashcards |
| 1.4, 1.5 | **Not yet compared** with PMBOK 7, Standard 3.1 to 3.12 (the twelve principles, about 40 pages) | Module 1.11 gives each of the twelve principles one line; whether that is enough has not been checked against the book. | To do next sitting |
| 1.7, 1.11, 1.12 | **Not yet compared** line by line with the Process Groups guide sections 1.7 and 3 to 8 | These were written from that guide in Session 25b, so the risk is lower. | To do next sitting |

Nothing in Domain 1 was found to be **wrong**. The differences are of two kinds: the exam's book uses another word or count for the same thing, or it teaches something the Eighth Edition lessons did not cover.

Method and limits: I read the listed pages of the extracted book text and compared them with each lesson's statements. I did not read every page of the Seventh Edition. The Models section (4.2) was checked because a search for its model names in the lessons found several absent; the Methods and Artifacts sections (4.4 to 4.6) have not been checked the same way yet.

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

### After the quiz repair (Session 25c)

| Domain | Questions | Longest-answer rate before | After |
|---|---|---|---|
| 1 | 219 | 56% | 27% |
| 2 | 278 | 44% | 27% |
| 3 | 174 | 68% | 28% |
| 4 | 162 | 74% | 27% |
| All | 833 | 58% | 27% |

Every module is at or below 32%. Duplicated questions: none. Method: in each affected question one wrong option was rewritten to be as long and as specific as the right answer; the right answers and explanations were not changed. Question ids are unchanged, so saved quiz history still applies.

### Exam outline coverage

Every task and enabler of the CAPM Exam Content Outline (2023), with where it is taught. **At the audit: 45 of 60 enablers covered, 13 thin, 2 missing. After Sessions 25b and 25d: 59 covered, 1 thin** ("responding to a planned strategy or framework", which the outline words vaguely; it is touched in 2.8 and 2.10).

| Domain and task | Enabler | Where | Status |
|---|---|---|---|
| 1.1 Life cycles and processes | Project, program, portfolio | 1.1 | Covered |
| | Project and operations | 1.1 | Covered |
| | Predictive and adaptive approaches | 1.6 | Covered |
| | Issues, risks, assumptions, constraints | 1.9 | Covered |
| | Review or critique project scope | 2.3 | Covered |
| | Apply the code of ethics | 1.10 | Covered |
| | A project as a vehicle for change | 1.12 | Covered (25b) |
| 1.2 Planning | Purpose of cost, quality, risk, schedule | 2.4, 2.6, 2.10, 2.11 | Covered |
| | Project management plan vs product management plan | 1.3, 1.12 | Covered (25b) |
| | Milestone vs task duration | 2.4 | Covered |
| | Number and type of resources | 2.9 | Covered |
| | Use a risk register | 1.9, 2.10 | Covered |
| | Use a stakeholder register | 2.8 | Covered |
| | Project closure and transitions | 1.7, 2.2 | Covered |
| 1.3 Roles | Project manager and sponsor | 1.3 | Covered |
| | Project team and sponsor | 1.3 | Covered |
| | The project manager as initiator, negotiator, listener, coach, working member, facilitator | 1.3 | Covered (25b); not defined in any book |
| | Leadership and management | 1.10 | Covered |
| | Emotional intelligence | 1.10 | Covered |
| 1.4 Following strategies | Responding to a planned strategy or framework (communication, risk) | 2.8, 2.10 in passing | **Thin** |
| | Project initiation and benefit planning | 1.7, 2.2 | Covered |
| 1.5 Problem-solving tools | Effectiveness of a meeting | 2.12, "Running a good meeting" | Covered (found on re-reading) |
| | Focus groups, standup meetings, brainstorming | 2.12, 4.4 | Covered |
| 2.1 When to use predictive | Suitability for the organizational structure (virtual, colocated, matrix, hierarchical) | 1.2 | Covered (25b) |
| | Activities within each process | 1.12, 2.1 to 2.11 | Covered; exam names in 1.12 and in each module's note (25b) |
| | Examples of typical activities | 1.12, 2.1 to 2.11 | Covered (25b) |
| | Differences between project components | 1.6, 1.12 (charter, plan, documents; phases and process groups) | Covered (25b) |
| 2.2 Plan and schedule | Critical path methods | 2.5 | Covered |
| | Schedule variance | 2.7 | Covered |
| | Work breakdown structures | 2.3 | Covered |
| | Work packages | 2.3 | Covered |
| | Quality management plan | 2.11 | Covered |
| | Integration management plan | 1.12, 2.2 | Covered (25b) |
| 2.3 Project controls | Artifacts of predictive projects | 2.1 | Covered |
| | Cost and schedule variances | 2.7 | Covered |
| 3.1 When to use adaptive | Pros and cons of adaptive and predictive | 3.1 | Covered (25d) |
| | Suitability for the organizational structure | 3.1 | Covered (25d) |
| | Organizational process assets and enterprise environmental factors that help adaptive work | 3.1 | Covered (25d) |
| 3.2 Planning iterations | Logical units of iterations | 3.5 | Covered |
| | Pros and cons of the iteration | 3.5 | Covered (25d) |
| | Translate a WBS to an adaptive iteration | 3.5, 2.3 | Covered (25d) |
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
| | Why communication between teams matters for the analyst | 4.3 | Covered (25d) |
| 4.3 Gathering requirements | Match tools to scenarios (user stories, use cases) | 4.4, 4.5 | Covered |
| | Choose the gathering approach | 4.4 | Covered |
| | Traceability matrix and product backlog | 4.6, 4.5 | Covered |
| 4.4 Product roadmaps | Application of a product roadmap | 4.2 | Covered |
| | Which components go to which releases | 4.2 | Covered (25d) |
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
| 47 | The CAPM Exam Content Outline names the PMBOK Guide **Seventh** Edition, the Process Groups practice guide and the **2017** Agile Practice Guide as exam references. This course is written from the Eighth Edition and the Second Edition agile guide, as decided at the start. | Nothing was rewritten. Lessons already carry edition notes and module 1.11 bridges the terms. The older books are now linked, so differences can be checked. **Decided with you on 2026-10-10:** the Eighth Edition lessons stay, and Sessions 25b and 25d add an exam-terms layer from the Seventh Edition, the Process Groups guide, the 2017 agile guide and the business analysis practice guide. | "CAPM exam structure" above; Session 25 **Closed on 2026-10-10 by Sessions 25b and 25d.** |
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
| 66 | Module 1.11 is marked with a red * as "not on the exam", but it covers the Seventh Edition principles and domains and the 49 processes, which are the exam's own references (issue 47). | Done in Session 25b: the red * is gone, the module counts toward progress, it is renamed, and it has 7 more questions. Its process material is expanded into the new module 1.12. | Module 1.11; Session 25b |
| 67 | Five questions appear word for word in two modules. | Listed in the audit results. One of each pair is replaced in Session 25c. | "Session 25a audit results" |
| 69 | Module 1.11 cited *Process Groups: A Practice Guide* for the ten knowledge areas, but that guide never uses the term: it lists the 49 processes by process group only. Knowledge areas come from the PMBOK Guide Sixth Edition, which is not one of the exam's references although the exam outline uses knowledge-area words ("integration management", "quality management plan"). | The source was corrected to the Sixth Edition, section 1.2.4.6. Modules 1.11 and 1.12 say where each grouping comes from. The assignment of each process to a knowledge area follows the Sixth Edition's chapters. | Modules 1.11 and 1.12 |
| 71 | Repairing 250 questions by hand-editing whole quiz files would have been slow and error-prone. | The repair was done as a list of single-option rewrites applied by a script, which re-measured each module after every batch and flagged any question where the right answer was still the longest (14 needed a second pass). Limits: the plan also called for topping up each early Domain 1 quiz to about 22 questions and for many more scenario questions. Domain 1 gained 36 questions through modules 1.11, 1.12, 1.2 and 1.3, but quizzes 1.1 and 1.4 to 1.9 are still 15 to 18 questions, and only 11 questions were added or reworded as scenarios. | `tools/check_content.py --report` |
| 72 | The plan for Session 25 said every module would be compared, section by section, with the exam's own books. That was done only in part. | What was done: the exam's framework was written out in full (modules 1.11 and 1.12); notes giving the exam's names were added to 16 modules; the outline gaps were filled from the exam's books. What was not done: a line-by-line reading of the Seventh Edition against each of modules 1.1 to 1.10, or of the practice guide against each Domain 4 module. A definition in an Eighth Edition lesson could therefore still differ in wording from the Seventh Edition without a note. | "Source books: final list"; lesson notes marked "On the exam" |
| 73 | The second practice guide for business analysis is organized quite differently from the main guide (five domains with three practices each, against six knowledge areas with 35 processes), and it is cited only five times. | Domain 4 stays built on The PMI Guide to Business Analysis, which defines the processes the instructor outline lists. Module 4.1 now maps the practice guide's five domains onto the knowledge areas. | Module 4.1 |
| 54 | The Project Management Answer Book is written as numbered questions inside chapters, with no section numbers, and Wysocki's book has titled sections only. Both are commercial textbooks, not PMI publications. | New reference forms: `The Project Management Answer Book, Chapter 6, Q8` (opens the page of that question) and `Effective Project Management, <section title>`. Like every other book, they are opened from your folder only, are never committed or uploaded, and lessons use original wording. Wysocki is the Fifth Edition, so its page content may differ from the Eighth Edition the outline names. | `link_sources.py` |
| 55 | Wysocki's Eighth Edition lists only chapters in its PDF contents, and it differs from the lessons in two wordings: it calls two lean principles "build integrity in" and "see the whole", and it uses "elapsed time" for duration in working days. | Reference form: `Effective Project Management, Chapter 7, Estimating Duration` (chapter, then the heading as printed). Chapter start pages are listed in `link_sources.py`. The lean table now shows both wordings, and the schedule lesson footer explains the two uses of "elapsed time". | `link_sources.py`; modules 2.4 and 3.3 |
| 59 | A reference to a figure or table in the business analysis guide ("Figure 1-1") would have opened the book's first page without any warning, because that kind of reference was only understood for the PMBOK Guides. | Found while checking each new link against its page, before anything was reported. The linker now finds figures and tables in every book with a table of contents, and reports an error if one is not found. | `link_sources.py` |
| 60 | You asked whether any figure errors remained after issue 59. | Every link in every module was checked by a script: each figure or table link must open the page that carries that caption, and any link sitting on a book's default page is listed for a check by eye. Result: 0 wrong. The script is kept as `tools/audit_links.py` and run after the linker every session. The linker also learned to find unnumbered headings by title ("Key Concepts for Elicitation") in books with a table of contents. | `tools/audit_links.py`, `link_sources.py` |
| 68 | Lessons had never been checked as rendered, worked examples had only been checked by hand, and nothing tested table structure. | Session 25a added three checks: `check_examples.py` recomputes every written-out calculation and the critical path example; `check_content.py` tests tables and markup; and every lesson was loaded in a headless browser and its rendered tables, rows, notes and links compared with the source. All passed. The first version of the calculation check raised two false alarms on formulas written with letters, which was fixed. | `tools/check_examples.py`, `tools/check_content.py` |
| 70 | Two new links to the Seventh Edition opened a default page, because that book numbers its Standard and its Guide separately ("2.2" exists in both) and prints headings in capitals. | Caught by `audit_links.py` straight after linking. The linker now looks the number up in the contents and takes the entry in the right part of the book. | `link_sources.py` |

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

### Mock exams (Session 26)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 74 | Holding Mock exam 4's 150 questions back makes the module quizzes shorter than I estimated in the plan (about 18 each). The early Domain 1 quizzes were already short, so they are now 11 to 14 questions; the longest are 23. | Accepted, and the checker fails if a module quiz drops below 10. The fix is more Domain 1 questions, which was already an open point from Session 25c. | `tools/check_content.py` (`MIN_MODULE_QUIZ`) |
| 75 | The mock exam list said the split was 54 / 26 / 30 / 41. Rounding each domain's share of 150 gives 151. | Seen on the first screenshot. The page now counts the questions per domain in the exam itself (40 for Domain 4). | `web/src/pages/ExamsPage.tsx` |
| 76 | You answered "both real exam and practice mode strict" to the question about stopping partway. I took it to mean practice mode also runs on the 3-hour real-time clock, so reading explanations uses time. | Built that way and listed as an assumption in the plan you approved. If you meant something else, the clock for practice mode is one condition to change. | "Session 26: mock exams as built" |
| 77 | An unanswered exam question counts as wrong in the score, but putting it into "Practice missed questions" would flood that list after an exam that timed out. | Only answered questions go into the per-question history. "Stop without a result" discards the run's answers entirely. | `finishExam` in `web/src/lib/progress.ts` |
| 78 | Three explanations point at an option by its position ("the first option lists..."). Reordering the options would make them wrong. | The exam builder keeps the original order for any question whose explanation names an option by position. | `tools/build_exams.py` (`POSITIONAL`) |
| 79 | The headless browser cannot click, so these were not exercised: answering a question in practice mode and seeing its explanation, flagging, moving with the grid, the two confirmation screens, and submitting by hand. | Checked by screenshot or page text from saved states: the list, practice chapters, real mode with flags, the break, the second half, and time running out. Scoring was checked against a run with a known result (52, 13, 0, 0 right per domain, 5 unanswered). The rest needs you to try it. | Status log |
| 80 | Mock exam 4 cannot be fully unseen if you already took module quizzes containing its questions. | The list shows how many of its 150 questions you have answered before. | `web/src/pages/ExamsPage.tsx` |
| 81 | Two facts the exam outline does not give: the scores behind PMI's four ratings, and whether the clock runs during the break. | Ratings use this platform's own limits and the result page says so. The break is not taken out of exam time. | `web/src/lib/exam.ts` |

### Look and feel (Session 27)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 82 | You added two requirements when approving the plan: comfortable to read for three hours, and every page changed so nothing is inconsistent. | Styles were moved into one shared layer first, then every page was moved onto it. Reading comfort rules are listed under "Session 27: the look and feel as built". | `web/src/index.css`, `web/src/lib/ui.ts`, `web/src/components/Page.tsx` |
| 83 | The grey used for dividing lines is too faint to outline a button or an option (about 1.4:1 against the page; 3:1 is the accepted minimum for controls). | A second, darker outline colour ("edge") is used for anything you can press or type in. Dividers keep the faint one. | `web/src/index.css` |
| 84 | On the dashboard chart the 70% target line ran down through the text under the bars. | Seen on the first screenshot. The line now spans only the two bars. | `web/src/pages/DashboardPage.tsx` |
| 85 | Secondary buttons came out bold, because the shared button style and the quiet style each set a weight. | The weight is now set once per button kind. | `web/src/lib/ui.ts` |
| 86 | A mock exam domain at 64.8% was shown as "65%" but rated "Below Target", against a limit stated as 65%. | The rating is now judged on the whole percentage that is displayed. | `bandFor` in `web/src/lib/exam.ts` |
| 87 | After I removed a temporary test page, two lines of `App.tsx` were joined and the app showed an error screen. | Caught on the next screenshot, which showed the error instead of the page. Fixed, and the build was re-run. | `web/src/App.tsx` |
| 88 | The screenshot tool cannot render narrower than about 500 px (issue 39), so phone layout could not be checked directly. | The page is loaded inside a 390 px frame on a temporary test page and that is screenshotted. The frame's width drives the phone layout rules, so this is a true check of layout, though not of touch. | Status log |
| 89 | The flashcard and review pages used a narrower column than the sections below them, so rules on the same page had different lengths. | Both now use the same column as quizzes and exams. | `web/src/components/Flashcards.tsx`, `web/src/pages/ReviewPage.tsx` |
| 90 | The plan promised a short "Saved" confirmation for marking a lesson complete and setting the exam day. | Not added: both actions already change the page visibly (a "✓ Lesson completed" line, and the plan appearing). A second message would be noise. | Plan, section 27a |
| 91 | In Practice, an answer used to be saved when you pressed Next; closing the page after reading the explanation lost it. | It is now saved the moment you pick an option, as in practice mode of the mock exams. | `web/src/pages/PracticePage.tsx` |
| 92 | A diagram scaled down to a phone's width would have 6 px text. | Diagrams keep a minimum width and scroll sideways inside their frame on a phone. | `web/src/components/diagrams/parts.tsx` |

### Before going online (Session 28)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 93 | **Real fault found by the first click test.** In real exam mode, answering a question made the screen jump to the next unanswered one. You could not change an answer or flag the question you had just answered without going back through the grid. Screenshots in Session 26 could not show this. | The question on screen now changes only when you move. Covered by a test that answers, changes the answer, flags, moves away and comes back. | `RealRun` in `web/src/pages/ExamPage.tsx` |
| 94 | A link to a lesson section did nothing when the lesson's sources had not finished loading: the page tried to scroll before the lesson was drawn. Found by the search test; the formula sheet test passed only because the sources were already loaded. | The scroll now waits until both the text and the sources are there. | `web/src/components/Lesson.tsx` |
| 95 | I wrote five entries of the formula sheet with module names that do not exist (for example `2-04-schedule-estimating` for `2-04-schedule-domain`). | The new checker rule caught all five before the page was opened. Corrected. | `tools/check_content.py` (`check_sheet`) |
| 96 | On the formula sheet the book sources did not appear for most entries, because the lesson files use Windows line endings and my pattern expected the other kind. | Seen on the screenshot. The pattern accepts both. | `web/src/pages/SheetPage.tsx` |
| 97 | Seven links plus the display controls no longer fit one line of the top bar at 1200 px; the controls dropped to a line of their own. | The page links now always have their own row under the name and the controls, at every width. | `web/src/App.tsx` |
| 98 | A list of sections beside the lesson would take width away from the wide tables made in Session 27. | It stands beside the lesson only on screens of 1536 px and more, outside the page column. Below that it is a bar that stays at the top and folds out. | `web/src/components/LessonContents.tsx` |
| 99 | The safety check must search for your name, member ID and email, but writing them into the tool would put them into the repository. | They are kept in `.cache/private-terms.txt`, which Git ignores. The check fails if that file is missing. I proved it by adding a harmless phrase to the list and watching the check fail, then removed it. | `tools/check_publish.py` |
| 100 | That private list was saved with an invisible mark at the start of the file, which would have made the first entry never match. | The tool now reads the file in a way that ignores the mark. | `tools/check_publish.py` |
| 101 | Times under half a second round to zero, so a question clicked through instantly counts as not opened in the timing figures. | Accepted: it only affects questions answered without reading. | `web/src/components/ExamInsights.tsx` |
| 102 | If an exam ends because time ran out, the seconds on the question open at that moment are not added. | Accepted as a small inaccuracy on one question. | `web/src/pages/ExamPage.tsx` |
| 103 | Older mock exam attempts have no result per domain stored, which the readiness estimate needs. | The dashboard fills it in the first time it is opened after this update. Until then the home page estimate leaves those attempts out. | `MockResults` in `web/src/pages/DashboardPage.tsx` |
| 104 | You asked me to start the platform myself after a reboot, without being told. | Saved as a standing instruction: at the start of each session I check the address and start it if it is down. | Memory note `auto-start-dev-server` |
| 105 | You renamed the site to Road to PMP. The browser stores your progress under names containing the old spelling (`road-to-pmi-progress`, and two for theme and text size). | Only what you see was renamed: tab title, top bar, home screen name, backup file name. The storage names are unchanged, because renaming them would make the browser lose your saved progress. Old backup files still restore. | `web/src/lib/progress.ts`, `web/src/lib/prefs.ts` |
| 106 | I could not upload to GitHub myself. The session I run in does not allow a sign-in window, and the permission system declined my attempt to switch that on. I did not try to get around it. | New `upload.bat` in the project folder: you double-click it, it runs the safety check, then uploads, and GitHub asks you to sign in the first time. This also means every upload is started by you. | `upload.bat` |
| 107 | You sent the Vercel project page (`vercel.com/ansellreffs-projects/road-to-pmp-d82g`), which only you can open, not the public site address. | I worked the public address out from the project name (`road-to-pmp-d82g.vercel.app`), confirmed it serves this site by its title, and tested it. If you later add your own domain, tell me. | "The website" section |

### Navigation and look (Session 29)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 108 | Your feedback: search opened a separate page; modules were not in the top menu; the lesson's section list was folded away at the top; the look was plain and not interactive. I had offered the section bar and the search page as finished in Session 28. | Rebuilt as you described: suggestions under the search box, a Modules menu, a right-hand panel as on Udemy, and a richer look. You chose the scope from options before I built it. | "Session 29: navigation and look, as built" |
| 109 | **Found by a click test:** on a phone, the slide-in panel stayed open after you chose a section, covering the lesson you had just jumped to. | The panel now closes whenever a link inside it is followed. | `web/src/components/SidePanel.tsx` |
| 110 | The first search used to load about 80 files, which made the first suggestions slow. | One search file is built with the site and fetched in the background; module titles work before it arrives. A test fails if suggestions take more than 0.6 seconds to change. | `web/vite.config.ts`, `web/src/lib/search.ts` |
| 111 | A side column takes width from the lesson and its wide tables. | Every page is now up to 1280 px wide instead of 1024, and the panel is 304 px, so the lesson column is wider than before, not narrower. | `web/src/App.tsx` |
| 112 | "Sections already read" cannot be known exactly; only the furthest section reached is stored. | Sections above the one you are reading are ticked. Jumping to the end ticks everything above it. | `web/src/components/LessonContents.tsx` |
| 113 | The course page first came out as a wall of 39 filled blue buttons. | Seen on the screenshot. Card buttons are now outlined; the one filled button is on the home page's Continue card. | `web/src/pages/CoursePage.tsx` |
| 114 | Introducing milestones to someone with existing progress would have announced many at once. | The first check notes what is already earned without announcing it. Only milestones earned after that are announced. | `MilestoneWatcher` in `web/src/components/Toast.tsx` |
| 115 | A streak can end, which would take a streak milestone away again. | A milestone that has been announced stays earned. | `web/src/lib/milestones.ts` |
| 116 | The plan said feedback animations would be off "in real exam mode". | I kept practice mode of the mock exams calm as well, so every mock exam screen behaves the same. Module quizzes and "Practice missed questions" have the animations. | `web/src/pages/ExamPage.tsx` |
| 117 | The daily goal needs a unit that fits lessons, questions and flashcards. | It counts study actions: each answered question, rated flashcard and completed lesson is one. The tile says so. | `GoalTile` in `web/src/pages/Home.tsx` |
| 118 | Not every page was looked at as a picture after the page became wider: the study plan, practice, review cards, mock exam list, result and formula sheet were covered by the click tests but not viewed again. | Viewed: home (light, dark, phone), course page, lesson with panel, top menu, search suggestions (desktop and phone), real exam mode, dashboard. Tell me if any of the others looks off. | Status log |
| 119 | Your feedback: pressing "I know this" showed nothing, because the next card appeared at once and no card showed its status. You proposed a green, yellow and red glow. | Built as you proposed, plus a label on the card and a strip showing the whole deck, since a glow alone would only show one card at a time. New cards were red at first, as you proposed; you then agreed to neutral grey, since red means a wrong answer everywhere else and a new card is not a mistake. A card changed from known to still learning is amber like any other still-learning card, because the earlier state is not stored. | `web/src/components/FlipCard.tsx`, `Flashcards.tsx` |

### Questions (Session 30)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 120 | The 54 new Domain 1 questions repeated the old give-away: the right answer was the longest option in about half of them, and three quizzes went over the 35% limit. | The checker flagged it at once. I lengthened one wrong option in 24 questions. Every Domain 1 quiz is now at 29% or less. | `tools/check_content.py --report` |
| 121 | Writing new scenario questions for Domains 2 to 4 would have meant reading 27 lessons again, and would have put two questions on the same fact into one quiz. | I reworded existing recall questions as situations instead, keeping options, answer, explanation and source. This is cheaper and cannot introduce a wrong answer, but the result is less demanding than a freshly written scenario. Said under "Limits". | "Session 30: questions" |
| 122 | Some reworded questions are part of the fixed mock exams, which were meant not to change. | The exams still contain the same questions with the same answers; only the wording of 112 questions is fuller. Results already saved remain valid. | `web/src/content/capm/exams.json` (unchanged) |

### Sync between devices (Session 28d)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 123 | You sent the address of the Supabase dashboard page, not the project's own address. | The project's address follows from the reference in it (`https://xvkdcaafiebmymkuikie.supabase.co`). I confirmed it answers, and that the key you sent is the public "anon" key and not a secret one. | `web/src/lib/syncConfig.ts` |
| 124 | I cannot receive your sign-in email, so I could not test a real sign-in. | The sync logic is tested with two browser profiles against a simulated server: no request before sign-in, wrong code refused, upload, second device receives, both changed and merged, deletion reaches the other device, sign-out stops uploads. The real sign-in and the real table still need you. | `web/tests/tests.mjs` (`fakeSupabase`) |
| 125 | The plan promised sign-in by a one-time code. By default Supabase's email carries only a link, and the link only works if the site's address is registered in the project. | The app accepts both the link and a code. The setup steps register the address (needed) and show how to add the code to the email (optional). | "Sync between devices" |
| 126 | Joining two devices by "newest wins" would lose work, and joining by "keep everything" would bring deleted things back. | Each device remembers when it last matched the online copy. If only one side changed, it simply wins, deletions included. Only when both changed are they merged. The remaining case, a deletion on one side while both changed, is stated under Limits. | `web/src/lib/sync.ts`, `web/src/lib/merge.ts` |
| 127 | The online copy's time stamp comes back from the service written in a different format from the one sent, so comparing the two as text would always have reported a change. | Caught while writing, before any test. The two are compared as moments in time. | `syncNow` in `web/src/lib/sync.ts` |
| 128 | No extra library was added for Supabase. | The four calls sync needs (send email, verify, read row, write row) are made directly, which keeps the site small and leaves nothing new to update. | `web/src/lib/sync.ts` |
| 129 | First real sign-in: it worked on your phone, then on the PC the link came back as "invalid or has expired". A sign-in link can be used once. The likely causes are that the same email's link had already been opened on the phone, that a newer email had replaced it, or that the mail service opened the link to scan it before you did. I cannot tell which from here. | The app now explains this instead of only repeating the service's message, and returns to the email form. The dependable remedy is the 6-digit code, which needs one line added to the email templates (now marked as recommended). | "Sync between devices"; `startSync` in `web/src/lib/sync.ts` |
| 130 | You found you could not be signed in on the PC and the phone together. Signing in on several devices was always allowed; what stopped you was that each device needed its own emailed link, and the PC's link was refused. | Added sign-in by email and password. The first device signs in by email and sets the password; the others need no email at all. Tested with two profiles signed in at once. | `signInWithPassword`, `setPassword` in `web/src/lib/sync.ts` |
| 131 | **Fault of mine, found while checking this:** "Sign out" asked the service to end every session of the account, so signing out on the phone would have signed the PC out too. | Sign-out now ends the session on that device only, and a test checks it. The button reads "Sign out on this device". | `signOut` in `web/src/lib/sync.ts` |
| 132 | Still not verified by me: that your Supabase project accepts the password sign-in. It is a standard feature that is on by default, but I cannot sign in to your account to try it. | Tested against the simulated server only. If the PC shows a message after you try, send it to me. | Status log **Resolved 2026-10-11:** you confirmed that sign-in and syncing work on the PC and the phone. |

### Accuracy check against the exam's books (Session 31a)

| # | Issue | How it was handled | Where to look |
|---|---|---|---|
| 133 | **A topic the exam's book teaches was missing:** the three types of PMO (supportive, controlling, directive) appeared in no lesson. In Session 25 I reported the outline as 59 of 60 covered; this was not on that list because the outline does not name it, the book does. | New section in module 1.2 from the Process Groups guide, section 2.6, with three questions and three flashcards. | Module 1.2 |
| 134 | **A second missing topic:** the 7th edition's section of named models. ADKAR, Kotter's eight steps, the Satir and Bridges models, OSCAR, Situational Leadership II and Drexler / Sibbet were taught nowhere. Found by searching the lessons for each model name in that section. | New section in module 1.10, with six questions and ten flashcards. Motivation models and the Tuckman ladder were already in module 2.9. | Module 1.10 |
| 135 | In Session 25 I added the exam's terms as notes but said plainly that I had not read the 7th edition against each lesson. Doing it now for Domain 1 found eight differences in wording or count that had no note. | Eight "On the exam" notes, each with the book page. None of the lessons' statements was wrong for the Eighth Edition. | "Session 31a" table |
| 136 | The comparison is large, and one sitting did not finish Domain 1: the twelve principles (modules 1.4, 1.5) and the process groups (1.7, 1.11, 1.12) are still to be read against their books. | Said in the table as "not yet compared", not left to be assumed done. They are first in the next sitting. | "Session 31a" table |
