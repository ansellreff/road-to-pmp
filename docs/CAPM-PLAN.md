# CAPM: plan and progress

Certified Associate in Project Management. Built and online; **being finished** in Sessions 32 to 39 (decided 2026-10-11). This file is the record of how the course and the platform were built. Problems and fixes are in [CAPM-ISSUES.md](CAPM-ISSUES.md); the project overview is [../PROJECT-PLAN.md](../PROJECT-PLAN.md).

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
| 2026-10-11 | **Session 31 finished: CAPM strengthened in all five parts.** You asked that every addition be part of the exam outline; from that point each one is tied to an outline task (see "The outline rule"). **31a:** all four domains compared with the exam's own books. Nothing was found wrong; 20 missing topics are now taught, the largest being the 2017 Agile Practice Guide's contracts, agile PMO, extra frameworks and agile earned value (Domain 3), the practice guide's 23 business analysis tools (Domain 4), and the Seventh Edition's nine kinds of artifact and sixteen meetings (Domain 2). **31b:** 130 new scenario questions and 68 flashcards. **31c:** Mock exam 5, 150 questions you have not seen. **31d:** keyboard shortcuts in quizzes, practice, mock exams and flashcards. **31e:** six new drawings. Bank: 1,039 questions, 1,298 flashcards, 5 mock exams. All checks and the 21 click tests pass. | You: `upload.bat` to publish. Then the exam. PMP needs the PMP Exam Content Outline PDF in the materials folder |
| 2026-10-11 | **CAPM reopened to be finished.** You asked whether CAPM was 100% finished. It was not, and you chose to close every open item before PMP continues: the thin outline item and the small Domain 1 quizzes (Session 32), a deeper accuracy check of Domains 4 and 2 (Sessions 33 to 35), the real exam's question types (Sessions 36 and 37), the remaining drawings (Session 38), and a closing session (39). | Session 32 |
| 2026-10-11 | **Session 32, first sitting.** The outline's last thin item is now taught: module 1.12 has a section "Following a planned strategy: communication, risk and stakeholders", written from the process guide's three Executing processes, with 8 questions and 6 flashcards. **The outline coverage is now 60 of 60.** The quizzes of modules 1.1 and 1.4 were brought up to 20 questions (15 new). Bank: 1,062 questions, 1,304 flashcards. | Session 32, second sitting: modules 1.2, 1.3 and 1.5 to 1.10 still have 13 to 17 questions each |
| 2026-10-11 | **Session 32 done: content gaps closed.** Second sitting: 40 more scenario questions, so every Domain 1 module quiz now has at least 20 (modules 1.2, 1.3, 1.5 to 1.10). Each was written after reading the module's lesson and checking its existing questions for repeats. Session 32 in total: one new lesson section, 63 questions, 6 flashcards. Bank: 1,102 questions, 1,304 flashcards; the module quizzes show 802. | You: `upload.bat`. Next: Session 33, the practice guide's chapters 2 and 3 against modules 4.1 to 4.3 |
| 2026-10-11 | **Session 33 done: the practice guide's chapters 2 and 3 read against Domain 4.** Nothing in modules 4.1 to 4.3 was found wrong. Missing and now taught: in module 4.2, the Golden Circle, the three parts of a situation statement, SMART objectives, SIPOC, PESTLE and CATWOE, the rule for what to recommend (including "do nothing"), the four parts of a business case, the empathy map and the customer journey map; in module 4.3, business analysis governance, the engagement approach as a continuing activity, and what a business analysis plan holds. 12 questions, 11 flashcards. Bank: 1,114 questions, 1,315 flashcards. | You: `upload.bat`. Next: Session 34, chapters 4 (rest), 5 and 6 against modules 4.4 to 4.7 |
| 2026-10-11 | **Session 34 done: the rest of the practice guide read against Domain 4.** Chapters 4 (the parts not read before), 5 and 6, and the two tool pages left over. Nothing in modules 4.1 and 4.4 to 4.7 was found wrong. Missing and now taught: the analyst as the product owner's support or proxy; why requirements are elicited, not collected; the limit at technical design; buy-a-feature's steps; Package Solution Information as a practice; the capability table's columns; transition requirements and the three-part transition approach; "segmented cutover"; go fever; when a formal sign-off is usual; the four typical reasons for missed value. 17 questions, 11 flashcards. Every Domain 4 module quiz now has 20 or more questions. Bank: 1,131 questions, 1,326 flashcards. | You: `upload.bat`. Next: Session 35, the process guide's 49 processes against modules 1.12 and 2.1 to 2.11 |
| 2026-10-11 | **Session 35 done: the 49 processes checked against Domain 2 and module 1.12, by script and by reading, not page by page.** The definition of every process was pulled from the guide and compared with module 1.12: all agree. Every artifact that module 1.12 names as a process's main output was found on that process's pages. The guide's lists of inputs and outputs (section 9) and of tools (section 10) were scanned for names the course never uses: ten tools were missing and are now taught, in modules 2.6, 2.9, 2.10 and 2.11. One exam point was added to module 1.12: contracts are closed out in Control Procurements. 10 questions, 7 flashcards. Bank: 1,141 questions, 1,333 flashcards. **The deeper accuracy check (Sessions 33 to 35) is finished.** | You: `upload.bat`. Next: Session 36, the real exam's question types |

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
| ✅ | 31 | Strengthen CAPM before the exam: 31a accuracy check of all four domains against the exam's books; 31b 130 new scenario questions; 31c Mock exam 5 (unseen); 31d keyboard shortcuts; 31e six more drawings. Details under "Session 31a: lessons compared with the exam's books" and "Session 31b to 31e: as built". |
| ✅ | 32 | Content gaps: the thin outline item (responding to a planned strategy or framework) taught in module 1.12; 55 new scenario questions so no Domain 1 module quiz has fewer than 20 |
| ✅ | 33 | Deeper accuracy check: *Business Analysis for Practitioners*, chapters 2 and 3, against modules 4.1 to 4.3 |
| ✅ | 34 | Deeper accuracy check: the same book, chapters 4 (rest), 5 and 6, against modules 4.4 to 4.7 |
| ✅ | 35 | Deeper accuracy check: *Process Groups: A Practice Guide*, the 49 processes, against modules 1.12 and 2.1 to 2.11 |
| ⬜ | 36 | Real exam question types, the rules: matching, hot spot and comic strip stored, marked, saved, synced and checked |
| ⬜ | 37 | Real exam question types, the screens and the questions: about 60 matching, 25 hot spot, 25 comic strip; Mock exam 6 if the bank allows |
| ⬜ | 38 | Drawings in module 4.5: decision tree, ecosystem map, feature model, data flow diagram, wireframe |
| ⬜ | 39 | Close CAPM: all checks, final counts, each open item marked closed or left open with the reason |

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

Overall: **39 of 39 modules done** (1,141 quiz questions, 1,333 flashcards, after Session 35). Of the 1,141 questions, 750 are used by the five mock exams. The 300 in Mock exams 4 and 5 are held back from the module quizzes, which show 841. 391 questions are in no exam.

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

## CAPM exam structure

| Domain | Exam weight | Main sources |
|---|---|---|
| 1. Project Management Fundamentals and Core Concepts | 36% | PMBOK Guide |
| 2. Predictive, Plan-Based Methodologies | 17% | PMBOK Guide, WBS / Scheduling / Estimating standards |
| 3. Agile Frameworks / Methodologies | 20% | Agile Practice Guide |
| 4. Business Analysis Frameworks | 27% | PMI Guide to Business Analysis |

Exam format: 150 questions in 3 hours, of which 135 are scored and 15 are unscored pretest questions. There is a 10-minute break after question 75; questions 1 to 75 cannot be reopened after it. Question types: multiple choice, drag and drop, hot spot, and animation or comic strip scenarios. You may take the exam up to three times within a 1-year eligibility period. Confirmed on 2026-10-10 from PMI's own CAPM Exam Content Outline (2023 update), now in your folder.

Exam references named by that outline: PMBOK Guide Seventh Edition, Process Groups: A Practice Guide, The PMI Guide to Business Analysis (2017), Business Analysis for Practitioners: A Practice Guide Second Edition, Agile Practice Guide (2017), and two non-PMI textbooks. The PMBOK Guide Eighth Edition is not on the list.

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

Every task and enabler of the CAPM Exam Content Outline (2023), with where it is taught. **At the audit: 45 of 60 enablers covered, 13 thin, 2 missing. After Sessions 25b and 25d: 59 covered, 1 thin. After Session 32: 60 covered** ("responding to a planned strategy or framework" now has its own section in module 1.12).

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
| 1.4 Following strategies | Responding to a planned strategy or framework (communication, risk) | 1.12, "Following a planned strategy"; also 2.8, 2.10 | Covered (Session 32) |
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

### The outline rule (your instruction, 2026-10-11)

You asked that anything added must be part of the exam outline. From this point every addition is tied to a task of the CAPM Exam Content Outline, and the task is named in the tables below. The outline itself says its enablers are examples, "not meant to be an exhaustive list", and that every question is found in at least two of the reference books and mapped to a task. So the test used is: **the topic is in one of the exam's books and falls under a task of the outline**. Topics the outline names in an enabler get full treatment (lesson text, questions, flashcards). Topics that only fall under a task get a short note.

The first sitting's additions, checked against the outline afterwards:

| Addition (Domain 1) | Outline task | Verdict |
|---|---|---|
| Project management defined; value defined | 1.1, project, program, portfolio | Named |
| Internal and external environment | 2.1 and 3.1, organizational process assets and enterprise environmental factors | Named |
| Types of PMO | 2.1, suitability for the organizational structure | Under the task, not named. Kept: it is in the exam's process guide beside the structures the outline lists. |
| Eight functions; customer and end user | 1.3, roles and responsibilities | Named |
| Iterative and incremental; phases; iteration length | 1.1, predictive and adaptive approaches | Named |
| Active and passive acceptance; secondary and residual risk | 1.1 and 1.2, risks; use a risk register | Named |
| Change models (ADKAR, Kotter, Satir, Bridges) | 1.1, a project as a vehicle for change | Named |
| Situational Leadership II; OSCAR; think win-win | 1.3, leadership and management; the project manager as coach and negotiator | Named |
| Five things to tailor | None names tailoring | Under task 1.1 only. Kept as one note; its question is not used in Mock exam 5. |
| Six ways of addressing conflict; Drexler / Sibbet; Boehm's planning model | None names them | Under task 1.3 only. Kept as short notes; their questions are not used in Mock exam 5. |

### Domain 3 (second sitting, 2026-10-11)

The Domain 3 lessons were written mostly from the **second** edition of the Agile Practice Guide. The exam uses the **2017 first edition**. This sitting read the first edition's chapters 2 to 6 and Annex A3 (pages 28 to 101 and 114 to 129) against the eight lessons.

| Module | Compared with (2017 guide) | What differed or was missing | Outline task | What was done |
|---|---|---|---|---|
| 3.1 | 2.4, 3.1, Table 3-1, 6.1 to 6.8 | The lesson's life cycle table softened Table 3-1 ("can evolve", "single or phased delivery"). **Missing:** the nine agile contracting techniques, the three characteristics of an agile PMO, the two drivers for change management. | 3.1, pros and cons; organizational structure; process assets and environmental factors | Note with Table 3-1's own words; new section "Agile contracts, the agile PMO and change"; 5 questions, 8 flashcards |
| 3.2 | A3.2, 5.2.1 to 5.2.6 | Nothing wrong. Roles, events, artifacts, the 15-minute standup and its three questions match. The lesson already had the flow-based standup. | 3.4, components of Scrum | First edition page links added; 4 questions |
| 3.3 | A3.3 to A3.14, 5.2.7 | **Missing:** Scrumban, the Agile Unified Process and Enterprise Scrum; the six roles of FDD; the eight principles of DSDM; the first edition's description of Disciplined Agile ("process decision framework" and six principles); acceptance test-driven development. Scrum@Scale, which the lesson lists, is **not** in the 2017 guide. | 3.4, components of the methods | Note on execution practices; new section "More from the exam's guide"; 5 questions, 8 flashcards |
| 3.4 | 4.1 to 4.3.7, 5.1 | Servant leadership, the three roles, team size, T-shaped people, the 20% to 40% loss and remote techniques all match. **Missing:** the agile project charter's four questions and the team charter. | 3.3, artifacts of adaptive projects | New section "Chartering the project and the team"; 4 questions, 3 flashcards |
| 3.5 | 3.1.4, 5.2.2, 5.2.3, 5.2.6 | Nothing wrong. Iteration-based and flow-based agile, capacity and refinement match. | 3.2, planning iterations | First edition page links added; 4 questions |
| 3.6 | 4.3.2, 5.2.5 | Nothing wrong. | 3.5, prioritize tasks | First edition page links added; 4 questions |
| 3.7 | 5.4, 5.4.1, Table 5-1 | The lesson follows the second edition, which plays down velocity. **Missing from the exam's edition:** velocity's definition and the four to eight iterations to stabilize; forecasting by velocity and by cycle time; capacity and predictability measures; response time; the feature chart; **SPI and CPI in agile terms**. | 3.2, adaptive tracking against predictive tracking | New section "What the exam's guide adds on measurement"; 5 questions, 6 flashcards |
| 3.8 | 3.1.6 to 3.1.11, 3.2, 3.3, Table 5-1 | The hybrid patterns, the suitability filter and the tailoring table match. **Missing:** the troubleshooting table of pain points and remedies. | 3.5, task management steps | New section "Troubleshooting an agile project"; 5 questions, 4 flashcards |

Nothing in Domain 3 was found to be **wrong**. The lessons taught the second edition's emphasis in two places (flow metrics over velocity; "supportive" beside "servant" leadership, already noted in Session 25d), and lacked several lists that exist only in the 2017 edition.

Not read in this sitting: Annex A1 (the mapping to the Sixth Edition's knowledge areas, pages 104 to 111), Annex A2, and appendixes X2 and X3 beyond what module 3.8 already cites.

### Domain 4 (third sitting, 2026-10-11)

The Domain 4 lessons were written from *The PMI Guide to Business Analysis*, which is one of the exam's books, so they already use the exam's terms. The exam's second business analysis book is *Business Analysis for Practitioners: A Practice Guide*, Second Edition. A search of its glossary found only seven terms absent from the course. This sitting read its chapter 7, "Models, Methods, and Artifacts" (pages 114 to 145: 23 tools), and the "how to" parts of eliciting, packaging and the go/no-go decision (pages 64 to 70, 83 to 86, 97 to 100).

| Module | Compared with (practice guide) | What was missing | Outline task | What was done |
|---|---|---|---|---|
| 4.1 | How the guide is organized | The names of the fifteen practices (the five domains were already there) | 4.5, the analyst's work under each approach | Table of the practices; 4 questions, 4 flashcards |
| 4.2 | Five whys, feasibility analysis, force field analysis, real options, KPIs | The cautions on five whys; force field analysis as driving and restraining forces; real options and the last responsible moment; metric against KPI | 4.3, match tools to scenarios | New section; 6 questions, 4 flashcards |
| 4.3 | Onion diagram, stakeholder engagement assessment matrix, persona | The four named layers of the onion diagram; C and D on the matrix | 4.1, stakeholder roles; 4.2, communication | New section; 6 questions, 2 flashcards |
| 4.4 | How to elicit; brainwriting, affinity diagram, focus group, survey, survey data analysis | **The four kinds of observation** (passive, active, participatory, simulation); brainwriting; the mistakes in survey analysis | 4.3, the gathering approach for a situation | New section; 6 questions, 4 flashcards |
| 4.5 | Acceptance criteria, business rules, MoSCoW, product tree, wireframe | The practice guide's rules for acceptance criteria (at least one, more than three, independently testable, against the definition of done); the product tree | 4.6, define acceptance criteria; 4.3, match tools | Note and new section; 7 questions, 4 flashcards |
| 4.6 | Requirements traceability matrix, story mapping | "Coverage matrix" as another name; weighing the cost of tracing; the parts of a story map | 4.3, traceability matrix and backlog; 4.4, which components go to which release | Note and new section; 6 questions, 2 flashcards |
| 4.7 | Readiness assessment, go/no-go | The five kinds of readiness; go "in whole or in part"; the decision model agreed beforehand | 4.6, ready for delivery | New section; 6 questions, 2 flashcards |

Nothing in Domain 4 was found to be **wrong**. Not read in this sitting: the practice guide's chapters 2, 3, 5 and 6 in full (the practices and their case study), and its pages on buy-a-feature and the capability table. *The PMI Guide to Business Analysis* was not re-read, because the lessons were written from it section by section in Sessions 21 to 24.

### Domain 2 and the rest of Domain 1 (fourth sitting, 2026-10-11)

The Domain 2 lessons were written from the Eighth Edition, with the exam's process names added in Session 25b. This sitting used three checks instead of a page-by-page read, because the calculations and definitions are the same in both editions:

1. **Every process name.** A script compared the 49 process headings of *Process Groups: A Practice Guide* (sections 4 to 8) with module 1.12: all 49 are named there.
2. **Every glossary term.** A script listed the terms of the process guide's glossary (437) and the Seventh Edition's glossary (352) that appear nowhere in the course. Most were wording variants of things already taught ("risk avoidance" for "avoid"). The real gaps are in the table below.
3. **The two lists the outline names directly:** the Seventh Edition's meetings (section 4.4.3, pages 274 to 275) and artifacts (section 4.6, pages 279 to 287), read in full.

| Module | Compared with | What was missing | Outline task | What was done |
|---|---|---|---|---|
| 1.11 | PMBOK 7 contents, sections 3.1 to 3.12 and 2.1 to 2.8 | Nothing: the twelve principle names and the eight domain names match word for word | (The outline names neither) | No change |
| 1.12 | Process Groups guide, sections 4 to 8 | Nothing: all 49 processes are named | 2.1, activities within each process | No change |
| 2.1 | PMBOK 7, Guide 4.6 | **The Seventh Edition's nine kinds of artifact**, with the project brief, project vision statement, business model canvas, risk-adjusted backlog, change control plan, prioritization matrix and S-curve | 2.3 and 3.3, identify the artifacts used | New section "The exam's nine kinds of artifact"; 7 questions, 5 flashcards |
| 2.3 | Process Groups guide, glossary | Product analysis | 1.1, review or critique project scope | Note; 3 questions, 1 flashcard |
| 2.8 | Process Groups guide, glossary | Communication styles assessment | 1.4, following a communication strategy | Note; 3 questions, 1 flashcard |
| 2.9 | Process Groups guide, glossary | Resource histogram; project team directory | 1.2, number and type of resources | Note; 3 questions, 2 flashcards |
| 2.10 | Process Groups guide, glossary | Risk data quality assessment; risk categorization | 1.2, use a risk register | Note; 4 questions, 2 flashcards |
| 2.11 | Process Groups guide, glossary | Quality policy; test and evaluation documents; statistical sampling; **tolerance against control limits**; request for information and request for quotation | 2.2, apply a quality management plan; 2.3, artifacts | Three notes; 4 questions, 4 flashcards |
| 2.12 | PMBOK 7, Guide 4.4.3 | **The Seventh Edition's sixteen meetings**: project review, project closeout, steering committee, status meeting, risk review and planning meeting were not described | 1.5, effectiveness of a meeting; purpose of standups and other meetings | Note with all sixteen; 6 questions, 3 flashcards |
| 2.2, 2.4 to 2.7 | Process Groups guide, glossary (float, critical path, control account, schedule variance) | Nothing: definitions agree. Module 2.5 already explains the day 0 and day 1 conventions for the critical path. | 2.2 and 2.3, critical path, variances | 3 questions each, no lesson change |

Nothing in Domain 2 was found to be **wrong**.

**Not compared, and why:** modules 1.4 and 1.5 against the full text of the Seventh Edition's twelve principles (pages 51 to 87). The outline names no principle, and module 1.11 lists all twelve by their exact names. The inputs, tools and outputs of each of the 49 processes (Process Groups guide, sections 4 to 8, about 250 pages) were not read line by line; the outline asks for "typical activities within each process", which module 1.12 and the Domain 2 modules give.

### Summary of Session 31a

| | Domain 1 | Domain 2 | Domain 3 | Domain 4 |
|---|---|---|---|---|
| Statements found wrong | 0 | 0 | 0 | 0 |
| Topics missing and now taught | 2 | 3 | 8 | 7 |
| "On the exam" notes added | 8 | 8 | 3 | 2 |
| New sections | 2 | 1 | 5 | 6 |

## Session 31b to 31e: as built

### 31b: new scenario questions

| Domain | New questions | Scenario share of the domain now |
|---|---|---|
| 1 | 23 (15 in the first sitting, 8 for modules 1.11 and 1.12) | 50% |
| 2 | 45 | 59% |
| 3 | 36 | 61% |
| 4 | 41 | 56% |

Every new question is a short situation with four options written for it, cites a page of one of the exam's books, and was checked by `tools/check_content.py`: no module has the right answer as the longest option more than 35% of the time (the highest is 32%).

### 31c: Mock exam 5

- 150 questions in the exam's split (54 / 26 / 30 / 40), taken from questions that are in no other exam, newest first and spread over the modules, so most of it is the questions written in Session 31. Three questions (five things to tailor, six ways of addressing conflict, Drexler / Sibbet) are kept out of it on purpose, under the outline rule; they stay in their module quizzes.
- `python tools/build_exams.py capm --add` adds one exam and leaves the others exactly as they were: the file comparison shows 152 lines added and none changed, so results you have saved for Mock exams 1 to 4 still match their questions.
- Like Mock exam 4, its questions are held back from the module quizzes, so it stays unseen. The study plan places it last, two days before the exam; Mock exam 4 moves one place earlier.
- **Cost of this choice:** the module quizzes of Domain 1 are smaller than before (12 to 21 questions; module 1.1 has 12), because Domain 1 gives 54 questions to each unseen exam. The checker's floor is 10.

### 31d: keyboard shortcuts

| Screen | Keys |
|---|---|
| Module quiz, practice, mock exam in practice mode | A to D or 1 to 4 to answer; Enter or the right arrow for the next question |
| Mock exam in real exam mode | The same, plus the left arrow for the previous question and F to flag |
| Flashcards in a module | Space to turn the card; left and right arrows for the previous and next card; 1 for still learning, 2 for I know this |
| Flashcard review | Space to turn the card; 1 and 2 to rate it |

- One component, `web/src/components/Keys.tsx`, listens for the keys and shows the line that lists them (on wide screens only). The keys are off while you type in a field, and Enter and Space keep their normal meaning on a button that has the focus.
- After a mouse click on an answer the focus leaves the option, so Enter moves to the next question instead of pressing the same answer again.

### 31e: drawings

| Module | Drawing | Numbers taken from |
|---|---|---|
| 2.3 | Work breakdown structure, with the work packages shaded | An original example (the clinic booking system used elsewhere in the course) |
| 2.5 | Network diagram with early and late dates and the critical path | The lesson's six activities: path A, C, E, F, 17 days; float of 5 days on B and D |
| 2.7 | Earned value chart: planned value, earned value, actual cost | The lesson's road project at week 4: PV 40, EV 30, AC 36 |
| 2.11 | Control chart with control limits, tolerance and a run of seven | An original example of a 50 mm part |
| 3.7 | Burnup chart with a scope line that steps up | The lesson's 120 and 135 points |
| 4.5 | Use case diagram | The clinic booking system |

Each was looked at in the light and the dark theme. Not drawn: the decision tree planned for module 4.5.

## Session 32: content gaps, as built

**The thin outline item.** Module 1.12 has a section "Following a planned strategy: communication, risk and stakeholders", from *Process Groups: A Practice Guide*, sections 6.7, 6.8 and 6.10 (pages 173 to 176 and 180 to 181). It names the three Executing processes that carry out the communications management plan, the planned risk responses and the stakeholder engagement plan, gives five rules for an appropriate response, and lists the guide's seven techniques for communicating well. 8 questions, 6 flashcards. Outline coverage: 60 of 60.

**Domain 1 module quizzes.** Questions shown in each module quiz, before and after:

| Module | Before | After | New questions |
|---|---|---|---|
| 1.1 | 12 | 20 | 8 |
| 1.2 | 17 | 20 | 3 |
| 1.3 | 17 | 20 | 3 |
| 1.4 | 13 | 20 | 7 |
| 1.5 | 13 | 20 | 7 |
| 1.6 | 15 | 20 | 5 |
| 1.7 | 13 | 20 | 7 |
| 1.8 | 14 | 20 | 6 |
| 1.9 | 16 | 21 | 5 |
| 1.10 | 16 | 20 | 4 |
| 1.11 | 21 | 21 | 0 |
| 1.12 | 21 | 29 | 8 |

All 63 are scenarios with a book page link. None is in a mock exam, so they stay in the module quizzes. No Domain 1 module has the right answer as the longest option more than 32% of the time.

**Left as it is:** eight modules in Domains 3 and 4 show 17 or 18 questions (3.2, 3.4, 3.6, 4.1, 4.2, 4.3, 4.4, 4.6). They were not part of this session, which you chose for Domain 1. Sessions 33, 34 and 37 add questions to Domain 4 and to every domain.

## Sessions 33 to 35: the deeper accuracy check

Same method as Session 31a and the same outline rule. This section records what was read, what differed and what was done.

### Session 33: *Business Analysis for Practitioners*, chapters 2 and 3 (2026-10-11)

| Module | Pages read | What differed or was missing | Outline task | What was done |
|---|---|---|---|---|
| 4.2 | Chapter 2, Business Value Assessment: pages 22 to 29 (introduction, Understand the Situation), 33 to 40 (Find the Gaps, Define the Solution); glossary entries for the customer journey map and empathy map | Nothing wrong: situation statement, root cause tools, capability table, weighted ranking, feasibility and the roadmap were already taught from the main guide. **Missing:** the Golden Circle; the six things to elicit; the three named parts of a situation statement and the rules for drafting one; SMART; SIPOC; PESTLE and CATWOE; OKRs; "recommend that nothing be done"; the business case's four parts and its being a living document; disbenefits measured like benefits; the two maps | 4.3, match tools to scenarios and choose the gathering approach; 4.4, product roadmaps | New section "The practice guide on assessing business value"; 7 questions, 8 flashcards |
| 4.3 (and 4.1) | Chapter 3, Business Analysis Planning: pages 46 to 51 (introduction, governance, engagement approach) and 57 to 59 (Plan Business Analysis Work) | Nothing wrong. **Missing:** business analysis governance as a practice (who decides and approves, agreed beforehand; the governance roles; adaptive decisions by the product owner); the engagement approach as a continuing activity; the contents of a business analysis plan and the advice to explain its choices | 4.1, why roles must be identified; 4.5, the analyst's role in adaptive and predictive work | New section "The practice guide on planning the analysis"; 5 questions, 3 flashcards |

**Not read in Session 33:** the case study pages of both chapters (pages 30 to 32, 40 to 45, 48 to 49 in part, 51 to 56, 59 to 61). They apply the practices to one fictional company and add no definitions, but I did not check that. Pages 120 and 121 (buy-a-feature and the capability table), listed in the plan for this session, are **still unread** and move to Session 34.

Module 4.1 needed no change: its note on the five domains and fifteen practices (Session 31a) already covers what chapter 3's introduction says about the domain.

### Session 34: *Business Analysis for Practitioners*, chapters 4 (rest), 5 and 6 (2026-10-11)

| Module | Pages read | What differed or was missing | Outline task | What was done |
|---|---|---|---|---|
| 4.1 | Chapter 6, Business Analysis Stewardship: pages 104 to 106, 108 to 110; chapter 4, page 63 | Nothing wrong. **Missing:** what the three stewardship practices consist of; the analyst supporting, standing in for or acting as the product owner, with backlog elaboration remaining the product owner's responsibility | 4.1, stakeholder roles (product owner); 4.5, the analyst's role in adaptive work | Note; 3 questions, 1 flashcard |
| 4.4 | Chapter 4, pages 62 and 63 (the domain and the overview of elicitation) | Nothing wrong. **Missing:** the reason for the word "elicit"; elicitation as iterative in every approach | 4.3, the gathering approach | Note; 3 questions, 1 flashcard |
| 4.5 | Chapter 4, pages 75 to 77 (Analyze Solution Information); page 120 (buy-a-feature) | The five model categories and their examples match the lesson. **Missing:** analysis doing only what decision makers need; the analyst refraining from technical design; the steps of buy-a-feature | 4.3, match tools to scenarios | Two notes; 3 questions, 2 flashcards |
| 4.6 | Chapter 4, pages 82 and 83 (Package Solution Information) | **Missing:** packaging as a practice of its own: fitting the package to its purpose, leaving out what is out of scope, the states of a requirement, "requirements specification" as a general term | 4.2, the most appropriate channel or tool; 4.3, traceability matrix and backlog | New section "Packaging solution information"; 3 questions, 2 flashcards |
| 4.2 | Page 121 (capability table) | The table was taught; its five columns and its place after root cause analysis were not | 4.3, match tools to scenarios | Note; 1 flashcard |
| 4.7 | Chapter 5, Organizational Transition and Solution Evaluation: pages 88 to 94, 97 and 98, 100 to 102 | Nothing wrong; readiness and go/no-go were added in Session 31a. The lesson's "staged release" is the practice guide's **segmented cutover**. **Missing:** transition requirements defined as temporary; the transition approach's three parts; go fever; when a formal sign-off is usual; the four typical reasons for missed value; a result above expectation treated as an opportunity | 4.6, ready for delivery | Note; 5 questions, 4 flashcards |

**Not read in Session 34:** the case study pages (71 to 74, 77 to 81 in part, 84 to 87, 95 and 96, 99, 102 and 103 in part, 107, 112 and 113), and page 111 (how to lead with integrity) beyond its opening, which my output cut off. Chapter 5 was read as an outline of its headings, lists and key passages (the full text was too long to print at once), then in full for the passages cited.

**The practice guide is now compared with Domain 4 except for its case study and the pages listed.** With *The PMI Guide to Business Analysis*, from which the lessons were first written, that is both of the exam's business analysis books.

### Session 35: *Process Groups: A Practice Guide*, the 49 processes (2026-10-11)

The plan said "for each process, its purpose and its key inputs, tools and outputs, against what the lessons say". Sections 4 to 8 are about 130 pages, and sections 9 and 10, which describe every input, output and tool, another 120. I did not read them page by page. Three checks were made instead, each of which covers all 49 processes:

| Check | How | Result |
|---|---|---|
| **Definitions** | A script pulled the sentence "X is the process of ..." and the key benefit for each of the 49 processes (40 at the first attempt, the other 9 with a looser search; Develop Project Charter's was not matched and was not compared). I read all of them against the one-line descriptions in module 1.12. | All agree. One point the lesson did not make: Control Procurements includes **closing out contracts**. |
| **Main outputs** | A script took each artifact module 1.12 names as a process's main output and looked for it on that process's pages in the guide. | All 30 named artifacts found. Two entries are my paraphrases, not artifact names ("prioritized risks", "numerical analysis of overall risk"); the guide lists project documents updates there. |
| **Names never used** | A script listed every entry of section 9 (103 inputs and outputs) and section 10 (163 tools and techniques) that appears nowhere in the course. I read the guide's full description of each real gap. | Inputs and outputs: none missing in substance. Tools: ten missing. |

| Module | Tools added (from section 10) | Outline task | What was done |
|---|---|---|---|
| 2.6 | Historical information review, and when analogous and parametric models are reliable | 1.2, purpose of cost | Note; 1 question, 1 flashcard |
| 2.9 | Organizational theory; text-oriented formats (position descriptions) | 1.2, number and type of resources | Note; 1 question, 1 flashcard |
| 2.10 | Other risk parameters (urgency, proximity, dormancy, manageability, controllability); technical performance analysis | 1.2, use a risk register | Two notes; 3 questions, 2 flashcards |
| 2.11 | Design for X; matrix diagrams; test and inspection planning; logical data model; proposal evaluation | 2.2, apply a quality management plan; 2.3, artifacts | Two notes; 3 questions, 3 flashcards |
| 1.12 | Contracts closed out in Control Procurements; the key benefits of Close Project or Phase; how often processes are performed | 1.2, project closure and transitions | Note; 2 questions |

These tools fall under outline tasks but are named by no enabler, so each has a note and at most one question, under the outline rule.

**Not done:** the inputs and tools of each process were not compared one by one with the lessons (which tool belongs to which process). The lessons seldom state that, so there was little to compare, but an exam question of the form "which is a tool of process X" is covered only where a lesson happens to say it. The figures and data flow diagrams of sections 4 to 8 were not read.

### What the deeper check came to (Sessions 33 to 35)

| | Domain 4 (Sessions 33, 34) | Domain 2 and module 1.12 (Session 35) |
|---|---|---|
| Statements found wrong | 0 | 0 |
| New sections | 3 | 0 |
| Notes added | 6 | 7 |
| Questions | 29 | 10 |
| Flashcards | 22 | 7 |
