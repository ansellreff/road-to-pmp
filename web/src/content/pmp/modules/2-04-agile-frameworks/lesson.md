## Key points

- Agile approaches differ in **breadth** (how much of the life cycle they cover) and **depth** (how prescriptive they are). Scrum and XP guide a **single team**; SAFe, LeSS, Scrum of Scrums and Scrum@Scale coordinate **many teams**; **Disciplined Agile** is a **tool kit**.
- **Scrum**: sprints of **one month or less**; three accountabilities (**Product Owner, Scrum Master, Developers**); five events (the Sprint and, inside it, **Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective**); three artifacts with three commitments (**Product Backlog: Product Goal; Sprint Backlog: Sprint Goal; Increment: Definition of Done**).
- **XP**: technical excellence through practices such as **pair programming, test-first programming, continuous integration, refactoring** and a **sustainable pace**.
- **Kanban Method**: "**start where you are**"; visualize the workflow, **limit work in progress (WIP)**, manage flow, **pull** work; no timeboxed iterations required.
- **Lean**: maximize customer value, minimize waste; **Lean Startup** tests ideas with a **minimum viable product** in a build, measure, learn loop.
- Before scaling, the team must work: **if agile does not work for one team, do not scale it**; remove the organizational impediments first.

## Choosing among agile approaches

@source PMBOK 8, Standard 4.2.2; Agile Practice Guide, 5.3.1; Agile Practice Guide, 5.3.2

This module serves two enablers: **recommend a project execution strategy** (Process task 1) and **evaluate delivery options to demonstrate value** (Process task 3). The Eighth Edition itself names these approaches as adaptive methods, plotted by:

- **breadth of coverage**: how much of the project or product life cycle the approach covers;
- **depth of coverage**: how detailed or prescriptive its guidance is.

| Kind | Examples | Scope |
|---|---|---|
| **Team methods** | Scrum, XP, Kanban, Crystal, FDD, DSDM, Agile UP | Mostly one small, cross-functional team |
| **Scaled approaches** | Scrum of Scrums, SAFe, LeSS, Scrum@Scale | Several teams working on one product or program |
| **Tool kit** | PMI Disciplined Agile | Choose and combine practices to fit the context |

**Scaling considerations** (Agile Practice Guide): there is more than one way to scale; **start small and learn quickly** what works in the organization; teams can succeed even when not everything is agile. A **healthy agile team** is the critical success factor: if agile does not work for a single team, **avoid scaling up**; address the organizational impediments instead.

## Scrum

@source Agile Practice Guide, A3.2; Scrum Guide, Scrum Theory; Scrum Guide, Scrum Values; Scrum Guide, Scrum Team; Scrum Guide, Scrum Events; Scrum Guide, Scrum Artifacts

**Scrum** is a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for **complex problems**. It is founded on **empiricism** (knowledge comes from experience and observation) and **lean thinking** (reduce waste, focus on the essentials).

**Three pillars:** **transparency** (the work is visible), **inspection** (artifacts and progress are inspected frequently), **adaptation** (adjust as soon as a deviation is found). **Five values:** commitment, focus, openness, respect, courage.

**The Scrum Team** is small (typically **10 or fewer** people), **cross-functional** and **self-managing**, with no sub-teams or hierarchies:

| Accountability | Accountable for |
|---|---|
| **Product Owner** | **Maximizing the value** of the product; Product Backlog management: the Product Goal, creating, ordering and making items clear. One person, not a committee; others change the backlog by convincing the Product Owner |
| **Scrum Master** | Establishing Scrum and the team's **effectiveness**: coaching self-management and cross-functionality, causing the removal of impediments, keeping events positive and within their timebox; serving the Product Owner and the organization |
| **Developers** | Creating a usable Increment each Sprint: the Sprint Backlog plan, quality by the Definition of Done, adapting the plan daily, holding each other accountable |

**Events** (timeboxes for a one-month Sprint):

| Event | Purpose | Timebox |
|---|---|---|
| **Sprint** | The container for all other events; turns ideas into value | One month or less, fixed length |
| **Sprint Planning** | Why is this Sprint valuable (Sprint Goal)? What can be Done? How will it get done? | Up to 8 hours |
| **Daily Scrum** | The Developers inspect progress toward the Sprint Goal and adapt the plan | 15 minutes |
| **Sprint Review** | Inspect the outcome with stakeholders and decide what to do next; a working session, not just a presentation | Up to 4 hours |
| **Sprint Retrospective** | Plan ways to increase quality and effectiveness | Up to 3 hours |

**Artifacts and their commitments:**

| Artifact | What it is | Commitment |
|---|---|---|
| **Product Backlog** | The emergent, ordered list of what is needed: the single source of work | **Product Goal** |
| **Sprint Backlog** | The Sprint Goal (why), selected items (what) and the plan (how); by and for the Developers | **Sprint Goal** |
| **Increment** | A usable, verified stepping stone toward the Product Goal | **Definition of Done** |

Rules worth knowing: during the Sprint **no changes endanger the Sprint Goal** and quality does not decrease; **only the Product Owner can cancel a Sprint**, when its goal becomes obsolete; work that does not meet the **Definition of Done** cannot be released or even presented at the Sprint Review; the **Sprint Review is never a gate to releasing value**.

> **Edition note.** The Agile Practice Guide's annex still speaks of a "development team" and "roles". The 2020 Scrum Guide says **Developers** and **accountabilities**. PMP questions may use either.

## Extreme Programming (XP)

@source Agile Practice Guide, A3.3

**XP** is a software development method based on **frequent cycles**: it takes good practices to their purest, simplest form and applies them continuously. Its **values** are communication, simplicity, feedback, courage and respect.

| Practice area | Primary practices (examples) | Secondary (examples) |
|---|---|---|
| **Organizational** | Sit together; whole team; informative workspace | Real customer involvement; team continuity; **sustainable pace** |
| **Technical** | **Pair programming**; **test-first programming**; incremental design | Shared code (collective ownership); documentation from code and tests; **refactoring** |
| **Planning** | **User stories**; weekly cycle; quarterly cycle; **slack** | Root cause analysis; shrinking teams; negotiated scope contract; daily coordination meetings |
| **Integration** | **10-minute build**; **continuous integration**; test-first development | Single code base; incremental and daily deployment |

## The Kanban Method

@source Agile Practice Guide, A3.4; PMBOK 8, Standard 4.2.2

"Kanban" means **visual sign or card**. In Lean manufacturing it was a just-in-time replenishment system (Toyota, 1953). The **Kanban Method** (David J. Anderson) applies it to knowledge work.

- It is **less prescriptive**, the original **"start where you are"** method, so it is easy to begin.
- It does **not prescribe timeboxed iterations**; work is **pulled** item by item, and **WIP limits** optimize flow. "It is more important to complete work than to start new work."
- **Kanban boards** show columns for each state of the work (at least To Do, Doing, Done), WIP limits and entry and exit policies, exposing **bottlenecks** and blockers; the board is an **information radiator**.
- Best when the team wants flexibility, continuous delivery, focus, higher productivity and quality, and when **work arrives unpredictably**.

| Defining principles | Core properties |
|---|---|
| Start with the current state; agree to pursue incremental, evolutionary change; respect the current process, roles and titles; encourage acts of leadership at all levels | Visualize the workflow; **limit WIP**; manage flow; make process policies explicit; implement feedback loops; improve collaboratively |

Many adaptive methods use **flow-based scheduling**, which optimizes the flow of work through the system instead of planning fixed iterations.

## Other team methods

@source Agile Practice Guide, A3.5; Agile Practice Guide, A3.6; Agile Practice Guide, A3.7

| Method | Distinguishing idea |
|---|---|
| **Crystal** | A **family** of methods; rigor rises with **team size and criticality** (colors from Clear to Red); properties such as frequent delivery, reflective improvement, **osmotic communication**, personal safety |
| **Feature-Driven Development (FDD)** | Built for a large software project around small business-value **features**; five activities: develop an overall model, build a features list, plan by feature, design by feature, build by feature |
| **DSDM** | **Constraint-driven delivery**: **cost, quality and time are fixed** at the outset and **scope is prioritized** to meet them; eight principles such as "never compromise quality" and "deliver on time" |

## Lean thinking

@source Agile Practice Guide, 2.3.3; PMBOK 8, Guide section 5, Value stream mapping

- **Lean Management** maximizes customer value while **minimizing waste** across all operations.
- **Lean Startup** treats a product idea as a **testable hypothesis**: build the smallest testable version, a **minimum viable product (MVP)**, then **build, measure, learn**, and decide to persevere or **pivot**.
- **Value stream mapping** displays the critical steps of a process and the time each takes, to **identify waste** and improve flow to the customer.

## Scaling frameworks

@source Agile Practice Guide, A3.8.1; Agile Practice Guide, A3.8.2; Agile Practice Guide, A3.8.3; Agile Practice Guide, A3.8.4; Agile Practice Guide, A3.9

| Framework | Key idea |
|---|---|
| **Scrum of Scrums** | Representatives of teams of three to nine meet, typically **two to three times a week**, to report completed and next work and impediments that may block other teams; can be layered (Scrum of Scrum of Scrums) |
| **SAFe** | A knowledge base of patterns at **portfolio, program and team levels**, organized around **value streams**; principles such as take an economic view, visualize and limit WIP, decentralize decision-making |
| **LeSS** | Keeps as much of **single-team Scrum** as possible: **one product backlog, one Product Owner, one Definition of Done, one Sprint**; adds cross-team refinement and an overall retrospective |
| **Scrum@Scale** | A "minimum viable" layer of governance with a **scale-free** architecture, extending a single team's patterns across a network of teams |
| **Disciplined Agile** | A **process-decision tool kit** with principles such as delight customers, context counts, be pragmatic, choice is good, optimize flow, enterprise awareness |

> **On the exam.** If a team's single-team agile practice is failing, scaling it is the wrong answer. Fix the team's impediments first. If two Scrum teams keep blocking each other, a Scrum of Scrums (or a shared backlog and Product Owner, as in LeSS) is a typical coordination answer.

## Exam tips

- Scrum: PO maximizes value, SM maximizes effectiveness, Developers build the Increment. Only the PO cancels a Sprint.
- Timeboxes for a one-month Sprint: planning 8 h, daily 15 min, review 4 h, retrospective 3 h.
- Kanban: no fixed iterations, pull, WIP limits, start where you are.
- XP: pair programming, test-first, continuous integration, refactoring, sustainable pace.
- DSDM fixes time, cost and quality and varies scope.
- Do not scale what does not work for one team.
