# PMP: plan and progress

Project Management Professional. Started 2026-10-11; **paused since the same day until CAPM is finished**. Problems and fixes are in [PMP-ISSUES.md](PMP-ISSUES.md); the project overview is [../PROJECT-PLAN.md](../PROJECT-PLAN.md).

## Status log

| Date | What happened | Next step |
|---|---|---|
| 2026-10-11 | **PMP started. Plan approved; PMP Session 1 (sources and map) done except the reference list.** The PMP Exam Content Outline (July 2026 exam) is extracted and read: 180 questions in 240 minutes, two breaks, People 33% / Process 41% / Business Environment 26%, 26 tasks, about 40% predictive and 60% agile or hybrid. The instructor's course contents are read from the screenshot (273 lectures; based on the PMBOK Guide 8th Edition and the Agile Practice Guide). The module list grew from 32 to 34 after that reading. The PMP course exists in the app with all 34 modules marked "not written yet"; CAPM is unchanged and the 21 click tests pass. | **You:** confirm the module list; save the PMP reference list page from PMI.org into the materials folder (PMI.org refused my request). Next: PMP Session 2, the exam engine |
| 2026-10-11 | **Reference list received and read; PMP Session 1 closed.** You saved a screenshot of PMI.org's "Exam References" page. It lists two PMI standards (the Agile Practice Guide and the PMBOK Guide) and eight textbooks, and says these are the ten sources most often cited by the people who write the questions. Neither standard is given an edition. **The tracker was split at your request:** an overview at the root, and a plan file and an issues file for each certification in `docs/`. | Plan mode: decide what comes next |
| 2026-10-11 | **PMP paused; numbering restarted.** You asked whether CAPM was 100% finished. It was not, and you chose to finish it first. You also said the separate files were meant to restart the session numbers, so PMP's sessions are now 1 to 15 (were 32 to 46) and its issues PMP-1 onward (were 152 onward). The design for PMP Session 2 is kept below as planned work. | CAPM Sessions 32 to 39 (see `CAPM-PLAN.md`). PMP resumes at PMP Session 2 |

## Roadmap

PMP counts its own sessions from 1. (Until 2026-10-11 these were numbered 32 to 46, continuing from CAPM; see PMP-12 in the issues file for the old and new numbers.)

| Status | Session | What |
|---|---|---|
| ✅ | 1 | **PMP.** Sources and map: outline extracted, instructor's contents read, reference list read, coverage map, course skeleton. |
| ⏸️ | 2 | **Waits until CAPM is finished.** PMP exam engine: sections and breaks from the course file (three sections of 60, two breaks); multiple response, case sets, graphic-based and matching questions; checker and exam builder rules; click tests showing CAPM unchanged |
| ⬜ | 3 to 5 | PMP Domain 1, People: modules 1.1 to 1.9 |
| ⬜ | 6 to 10 | PMP Domain 2, Process: modules 2.1 to 2.15 |
| ⬜ | 11 to 13 | PMP Domain 3, Business Environment: modules 3.1 to 3.10 |
| ⬜ | 14 | PMP mock exams: four of 180 questions, the fourth unseen; PMP in the study plan, readiness and weak spots |
| ⬜ | 15 | PMP formula sheet; accuracy check against the reference list; final report |

Every content session ends with the source linker, the content checker, the link audit, the example check, the build, the click tests and the publish check, then a tracker update, a commit and a report of issues and fixes.

## Plan, sources and coverage map

The plan you approved on 2026-10-11 is kept in Claude's plans folder on this PC. This section is the working record.

### The exam (PMP Exam Content Outline, July 2026 exam, in your folder)

- 180 questions (170 scored, 10 unscored) in 240 minutes. Two 10-minute breaks; after each, the section before it cannot be reopened.
- Domains: People 33%, Process 41%, Business Environment 26%. 26 tasks (8, 10, 8).
- About 40% of questions are on predictive work and 60% on agile or hybrid work, in every domain.
- Question types: single answer, multiple response, case or scenario sets (new), graphic-based (new), matching, enhanced matching, point and click, pull-down list. Matching, point and click and pull-down are in test centres only.
- The outline names artificial intelligence and sustainability as trends now reflected in the exam, and quotes the Eighth Edition's definition of a project.
- Not in the outline: the list of reference books (it points to PMI.org), and how multiple response and matching are scored.

### Decisions you made (2026-10-11)

| Question | Your answer |
|---|---|
| Size of the build | Full, like CAPM |
| Question types to build | Multiple response, case sets, graphic-based, matching; "try to simulate the real exam" |
| Reference list | I look it up on PMI.org. **Blocked** (error 403). You then saved a screenshot of the page into the materials folder |

### Sources

| Source | Status |
|---|---|
| PMP Exam Content Outline 2026 | Extracted to `.cache/books/pmpeco` (24 pages) |
| Instructor's course (TIA, Andrew Ramdayal) | Contents list read from the screenshot into `.cache/instructor/pmp-tia-outline.md`. Lecture titles only. It is based on the PMBOK Guide 8th Edition and the Agile Practice Guide; about 45% of its time is the 40 processes, 26% agile and hybrid. Its 50 "mindset principles" are named only by number, so they cannot be used. |
| PMBOK Guide, Eighth Edition | Already extracted. Base text for PMP. Its Appendix X3 covers artificial intelligence; principle 3.7 covers sustainability. |
| Agile Practice Guide | Both editions extracted. On the reference list, without an edition; see below. |
| The exam's reference list | Read from `PMI Learning Material/PMP Exam Reference List.jpeg`; see below |
| In the folder, not extracted: three AI publications, the sustainability standard, Choose Your WoW, the program management standard | Extracted only if the reference list or a module needs them |

### The exam's reference list

From your screenshot of PMI.org's "Exam References" page (2026-10-11). PMI's own words: these are "the top 10 most frequently cited" sources of the people who develop the questions, "provided as a courtesy only"; the outline adds that the exam "is not written according to any single text".

| Reference | In your folder? | Use in this course |
|---|---|---|
| **PMBOK Guide** (PMI standard; no edition given) | Yes: 6th, 7th and 8th editions | Base text: the **Eighth Edition**. The outline quotes its definition of a project, and the instructor's course is built on it. |
| **Agile Practice Guide** (PMI practice guide; no edition given) | Yes: first (2017) and second editions | Base text for agile and hybrid: the **second edition**, with a note wherever the first says something different. See the assumption below. |
| *Effective Project Management: Traditional, Agile, Extreme, Hybrid*, Wysocki | Yes, 8th edition | Second source for situations and for topics the PMI books treat thinly |
| *Project Management: A Systems Approach to Planning, Scheduling, and Controlling*, Kerzner | No | Not used unless you add it |
| *Fundamentals of Technology Project Management*, 2nd Edition, Garton and McCulloch | No | Not used unless you add it |
| *Project Manager's Portable Handbook*, 3rd Edition, Cleland and Ireland | No | Not used unless you add it |
| *Information Technology Project Management*, 7th Edition, Schwalbe | No | Not used unless you add it |
| A book by Kenneth S. Rubin, published by Addison-Wesley | No | Its title is hidden behind a menu bar in the screenshot. Rubin's book with that publisher is *Essential Scrum*; I have not confirmed that this is the one listed. |
| *Project Management: The Managerial Process*, Larson | No | Not used unless you add it |
| *The Project Management Tool Kit: 100 Tips and Techniques for Getting the Job Done Right*, Kendrick | No | Not used unless you add it |

**Assumption to confirm: which edition of the Agile Practice Guide.** The list gives none. The page's description of the guide ("framework-neutral ... across teams and enterprise-wide initiatives") and its link to PMI's current publication point to the second edition, and the exam is new in July 2026. For CAPM the outline named the 2017 edition in print; here nothing does. I will write from the second edition and note first-edition differences, which I already have from the CAPM check.

**What the missing textbooks mean.** Seven of the ten references are not in the folder. The two PMI standards and Wysocki are, and the instructor teaches from the two PMI standards alone. The course can be built without the others; what it cannot do is cite them. If you own any of them as a PDF, add it and it becomes a source.

### Modules (34) and the outline's tasks

The first draft had 32. Reading the instructor's contents added two: a framework module (2.1) and artificial intelligence as its own module (3.10); agile frameworks and servant leadership were widened.

| Module | Outline task | Main sources (to be confirmed when written) |
|---|---|---|
| **Domain 1, People (33%)** | | |
| 1.1 A Shared Vision | People 1 | PMBOK 8 Standard 3.6, 3.8; Guide 2.1.6.1, 2.5 |
| 1.2 Conflict and Ground Rules | People 2 | PMBOK 8 Guide 2.6.2.4; section 5, Conflict management; team charter |
| 1.3 Leading the Team: Styles, Servant Leadership, Empowerment, Roles | People 3 | PMBOK 8 Standard 2.5, 3.6, 3.8; Agile Practice Guide, servant leadership |
| 1.4 Team Performance: Motivation, Emotional Intelligence, Virtual Teams, Problem Solving | People 3 | PMBOK 8 Guide 2.6; section 5 |
| 1.5 Identifying and Analyzing Stakeholders | People 4, 5 | PMBOK 8 Guide 2.5.2.1; section 5, Stakeholder analysis |
| 1.6 Engaging Stakeholders: Trust and Influence | People 4 | PMBOK 8 Guide 2.5.2.2, 2.5.2.4, 2.5.2.6 |
| 1.7 Aligning and Managing Expectations; Mentoring | People 5, 6 | PMBOK 8 Guide 2.5; Standard 3.4 |
| 1.8 Knowledge Transfer | People 7 | PMBOK 8 Guide 2.1.6.6 |
| 1.9 Communication and Reporting | People 8 | PMBOK 8 Guide 2.5.2.3, 2.5.2.5, 2.5.2.7; section 4, reports |
| **Domain 2, Process (41%)** | | |
| 2.1 The Framework: Value, Principles, Focus Areas, Domains and the 40 Processes | Process 1 | PMBOK 8 Standard 1 to 4; Guide 2, Table 2-1 |
| 2.2 Choosing the Approach: Predictive, Agile, Hybrid | Process 1 | PMBOK 8 Standard 4.2, 4.3; Guide 3; Agile Practice Guide |
| 2.3 The Integrated Project Management Plan | Process 1 | PMBOK 8 Guide 2.1.6.2; section 4 |
| 2.4 Agile in Practice: Scrum, XP, Kanban, Lean and Scaling | Process 1, 3 | Agile Practice Guide; Scrum Guide |
| 2.5 Scope: Requirements, WBS and Backlog | Process 2 | PMBOK 8 Guide 2.2 |
| 2.6 Value-Based Delivery: Prioritizing, Increments, Benefits | Process 3 | PMBOK 8 Standard 2.1, 3.4; Agile Practice Guide |
| 2.7 Resources | Process 4 | PMBOK 8 Guide 2.6 |
| 2.8 Procurement, Contracts and Negotiation | Process 5 | PMBOK 8 Guide 2.1.6.3; Appendix X4 |
| 2.9 Finance: Estimates, Budget and Reserves | Process 6 | PMBOK 8 Guide 2.4 |
| 2.10 Earned Value and Financial Reporting | Process 6, 9 | PMBOK 8 Guide Table 5-1; Standard for Earned Value Management |
| 2.11 Quality, Cost of Quality and Continuous Improvement | Process 7 | PMBOK 8 Standard 3.5; Guide 2.1.6.5 |
| 2.12 Schedule: Estimating and the Critical Path | Process 8 | PMBOK 8 Guide 2.3; Practice Standard for Scheduling |
| 2.13 Agile Scheduling: Story Points, Velocity, Release Plans | Process 8 | Agile Practice Guide; PMBOK 8 Guide 2.3.3 |
| 2.14 Evaluating Status: Metrics and Artifacts | Process 9 | PMBOK 8 Guide 2.1.6.7; section 4 |
| 2.15 Closure and Transition | Process 10 | PMBOK 8 Guide 2.1.6.9 |
| **Domain 3, Business Environment (26%)** | | |
| 3.1 Governance, Ethics, Success Metrics and Escalation | Business 1 | PMBOK 8 Guide 2.1.1 to 2.1.5; PMI Code of Ethics |
| 3.2 Compliance: Security, Safety, Regulation, Sustainability | Business 2 | PMBOK 8 Standard 3.7; Guide 2.1 |
| 3.3 Change Control | Business 3 | PMBOK 8 Guide 2.1.6.8 |
| 3.4 Impediments and Issues | Business 4 | PMBOK 8 Guide 2.7.1; Agile Practice Guide |
| 3.5 Risk: Identifying and Analyzing | Business 5 | PMBOK 8 Guide 2.7.2.1 to 2.7.2.3; risk standard |
| 3.6 Risk: Responses and Monitoring | Business 5 | PMBOK 8 Guide 2.7.2.4 to 2.7.2.6 |
| 3.7 Continuous Improvement and Lessons Learned | Business 6 | PMBOK 8 Guide 2.1.6.6; Standard 3.5 |
| 3.8 Organizational Change and Culture | Business 7 | PMBOK 8 Standard 2.2; Agile Practice Guide |
| 3.9 The External Business Environment | Business 8 | PMBOK 8 Standard 2.2 |
| 3.10 Artificial Intelligence in Projects | Business 8 (technology) | PMBOK 8 Appendix X3 |

Plus one page outside the question bank: how to answer situational questions.

### Coverage: every task and its enablers

"Module" is where the task will be taught. The status column is filled in as each module is written; a task is "covered" only when every enabler listed has a lesson section.

| Task | Enablers (from the outline) | Module | Status |
|---|---|---|---|
| People 1, Develop a common vision | Shared vision with key stakeholders; promote it; keep it current; find the root cause of a misunderstanding of it | 1.1 | Not written |
| People 2, Manage conflicts | Conflict sources; context; agreed resolution strategy; communicate conflict principles; environment for ground rules; rectify violations | 1.2 | Not written |
| People 3, Lead the project team | Team expectations; empower; solve problems; voice of the team; varied experiences, skills, perspectives; leadership style; roles and responsibilities | 1.3, 1.4 | Not written |
| People 4, Engage stakeholders | Identify; analyze; tailor communication; execute the engagement plan; align needs, expectations and objectives; build trust and influence | 1.5, 1.6 | Not written |
| People 5, Align stakeholder expectations | Categorize stakeholders; identify expectations; facilitate discussions; mentoring opportunities | 1.5, 1.7 | Not written |
| People 6, Manage stakeholder expectations | Internal and external customer expectations; align outcomes; monitor satisfaction and respond | 1.7 | Not written |
| People 7, Help ensure knowledge transfer | Identify critical knowledge; gather it; foster the environment | 1.8 | Not written |
| People 8, Plan and manage communication | Communication strategy; transparency and collaboration; feedback loop; reporting requirements; reports for sponsors and stakeholders; reporting and governance | 1.9 | Not written |
| Process 1, Integrated plan and delivery | Needs, complexity, magnitude; recommend an approach; critical information requirements (sustainability); execution strategy; integrated plan; effort and resource estimates; dependencies, gaps, continued value; maintain the plan; data for decisions | 2.1, 2.2, 2.3, 2.4 | Not written |
| Process 2, Scope | Define scope; stakeholder agreement; break down scope | 2.5 | Not written |
| Process 3, Value-based delivery | Value components; prioritize by value and feedback; deliver incrementally; examine value throughout; benefit measurement system; delivery options | 2.4, 2.6 | Not written |
| Process 4, Resources | Define and plan resources; manage and optimize needs and availability | 2.7 | Not written |
| Process 5, Procurement | Plan; execute the plan; contract types; vendor performance; agreement objectives met; negotiations; negotiation strategy; manage suppliers and contracts; procurement strategy; delivery solution | 2.8 | Not written |
| Process 6, Finance | Financial needs; risk and contingency allocations; spend tracking; financial reporting; future challenges; variations and governance; reserves | 2.9, 2.10 | Not written |
| Process 7, Quality | Quality requirements; processes and tools; execute the plan; regulatory compliance; cost of quality and sustainability; quality reviews; continuous improvement | 2.11 | Not written |
| Process 8, Schedule | Schedule for the chosen approach; coordinate with other projects and operations; estimate (milestones, dependencies, story points); benchmarks and historical data; create; baseline; execute the plan; analyze variation | 2.12, 2.13 | Not written |
| Process 9, Evaluate project status | Metrics, analysis, reconciliation; tailor artifacts; artifacts created, reviewed, updated; accessibility; assess progress; update metrics; communicate status; effectiveness of artifact management | 2.10, 2.14 | Not written |
| Process 10, Closure | Stakeholder approval of completion; closing criteria; readiness for transition; closing activities (lessons, retrospectives, procurement, financials, resources) | 2.15 | Not written |
| Business 1, Governance | Structure, rules, procedures, reporting, ethics, policies through OPAs; success metrics; escalation paths and thresholds | 3.1 | Not written |
| Business 2, Compliance | Confirm requirements (security, health and safety, sustainability, regulatory); classify; threats to compliance; methods; consequences of noncompliance; approach and actions; measure compliance | 3.2 | Not written |
| Business 3, Changes | Execute change control; communicate status of changes; implement approved changes; update documentation | 3.3 | Not written |
| Business 4, Impediments and issues | Impact of impediments; prioritize and highlight; intervention strategy; reassess continually; recognize when a risk becomes an issue; resolve with stakeholders | 3.4 | Not written |
| Business 5, Risk | Identify; analyze; monitor and control; risk management plan; risk register; execute the plan (security, sustainability); communicate risk status | 3.5, 3.6 | Not written |
| Business 6, Continuous improvement | Use lessons learned; keep improvement processes updated; update OPAs | 3.7 | Not written |
| Business 7, Organizational change | Assess culture; impact of organizational change on the project and required actions | 3.8 | Not written |
| Business 8, External environment | Survey changes (regulations, technology, geopolitical, market); assess and prioritize impact on scope or backlog; review continually | 3.9, 3.10 | Not written |

### What the app does with PMP now

- `web/src/content/pmp/course.json` holds the three domains and 34 modules, each with the outline tasks it serves and marked not ready. The course page and the Modules menu list them as "not written yet".
- A course with no written module is listed on the home page ("Being written: 0 of 34 modules are ready") but is not offered for study: no "continue" card, no exam day, no study plan and no dashboard block until its first module is ready.

## PMP Session 2: planned design (not started)

Agreed in plan mode on 2026-10-11, then put behind the CAPM work. CAPM Sessions 36 and 37 build the shared part of this (one function that marks an answer, answers that can be a list, matching questions, the checker's rules), so what remains for PMP is marked "PMP only".

| Piece | What | |
|---|---|---|
| Sections and breaks | `course.json` gains `exam.sections` (PMP: 3). An exam in progress records a list of breaks. PMP runs as three sections of 60 with a break after 60 and after 120, each finished section locked. CAPM keeps two halves and one break. | PMP only |
| Multiple response | `type: "multi"`, five or six options, two or three right; "Choose 2" above the options; marked all or nothing | PMP only |
| Case sets | `case`: an id in the course's `cases.json`; the case stays beside its three to five questions; the exam builder keeps them together | PMP only |
| Graphic-based | Any question with `diagram`: the drawing shown above it | Shared with CAPM's hot spot work |
| Matching | `type: "match"` with `left` and `right` lists | Built in CAPM Session 37 |
| Approach tag | `approach`: predictive, agile or hybrid on every PMP question; the exam builder holds each exam within three points of 40 / 60 | PMP only |
| Sample page | `/pmp/question-types`: what the outline says about each type, with one sample of each to try | PMP only |

Not planned: point and click as PMP describes it (CAPM's hot spot may cover it), and pull-down lists.
