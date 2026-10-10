## Key points

- **Extreme Programming (XP)** is a software development method known for its **technical practices**: pair programming, test-first development, continuous integration, refactoring.
- **Lean** aims to **maximize customer value and minimize waste**.
- The **Kanban Method** visualizes work on a board, **limits work in progress (WIP)** and uses a **pull system**. It has **no prescribed iterations**.
- In Kanban, **finishing work matters more than starting new work**.
- **Lean Startup** tests ideas with a **minimum viable product (MVP)** in a **build–measure–learn** loop, then **perseveres or pivots**.
- **Crystal** scales its rigor by team size and criticality. **DSDM** fixes time, cost and quality and varies scope. **FDD** is organized around small features.
- **Scrum of Scrums**, **SAFe**, **LeSS** and **Scrum@Scale** coordinate **several teams**.

## Extreme Programming (XP)

@source Agile Practice Guide, A3.3

**XP** is a software development method based on **frequent cycles**. The name comes from taking a good practice to its purest, simplest form and applying it **continuously**.

**Five core values:** **communication, simplicity, feedback, courage, respect.**

| Practice area | Practices |
|---|---|
| **Organizational** | Sit together, whole team, informative workspace, real customer involvement, **sustainable pace** |
| **Technical** | **Pair programming**, **test-first programming**, incremental design, **collective code ownership**, **refactoring** |
| **Planning** | **User stories**, weekly cycle, quarterly cycle, slack, daily coordination meetings |
| **Integration** | 10-minute build, **continuous integration**, incremental deployment |

The practices tested most often:

| Practice | Meaning |
|---|---|
| **Pair programming** | Two developers work at one computer: one writes, the other reviews, and they swap often |
| **Test-first programming** (test-driven development) | Write the test **before** the code, then write just enough code to pass it |
| **Continuous integration** | Everyone's work is merged and tested frequently, so problems surface early |
| **Refactoring** | Improving the internal structure of the code **without changing what it does** |
| **Collective code ownership** | Anyone on the team may improve any part of the code |
| **Sustainable pace** | Working hours that can be kept up indefinitely; no regular overtime |
| **Informative workspace** | Information radiators on the walls so status is visible at a glance |
| **Real customer involvement** | A customer representative works with the team and answers questions quickly |

## Scrum and XP compared

@source Agile Practice Guide, A3.2; Agile Practice Guide, A3.3

| | Scrum | XP |
|---|---|---|
| Main focus | **Managing** the work: roles, events, artifacts | **Engineering** practices: how the software is built |
| Cycle | Sprint of one month or less | Usually shorter: a **weekly cycle** inside a quarterly cycle |
| Applies to | Any kind of product | Software |
| Team leader role | Scrum master | Coach |
| Customer voice | Product owner | The customer, working with the team |
| Requirements | Product backlog items | **User stories** |

The two fit together well. Many teams use **Scrum for the framework and XP for the technical practices**.

## Lean thinking

@source Agile Practice Guide, 2.3; Agile Practice Guide, 2.3.3; Effective Project Management, Chapter 11, What Is Lean Agile Project Management?

**Lean management** is a philosophy aimed at **maximizing customer value while minimizing waste**. It began in manufacturing, at Toyota, and its ideas run through agile and Kanban: deliver value, respect people, be transparent, adapt, and improve continuously.

Seven principles of lean software development:

| Principle | Meaning |
|---|---|
| **Eliminate waste** | Remove anything that does not add value for the customer |
| **Amplify learning** | Learn through short cycles and feedback |
| **Decide as late as possible** | Keep options open until the facts are known |
| **Deliver as fast as possible** | Short cycles get value and feedback sooner |
| **Empower the team** | The people doing the work make the decisions about it |
| **Build quality in** (also worded "build integrity in") | Prevent defects; do not rely on inspection at the end |
| **Optimize the whole** (also worded "see the whole") | Improve the whole value stream, not one step at the expense of others |

**Waste** in knowledge work includes partially done work, extra features nobody asked for, waiting, handoffs, task switching, unnecessary process and defects.

**Value stream mapping** is a lean technique that charts the steps in a process and the time each takes, to find waste.

## Lean Startup and design thinking

@source Agile Practice Guide, 2.3.3; Agile Practice Guide, 2.3.1

**Lean Startup** treats every product idea as a **hypothesis to be tested**.

1. Form a hypothesis about what customers want.
2. Build the smallest testable version: a **minimum viable product (MVP)**.
3. Run the **build–measure–learn** loop with real customers.
4. **Persevere** if the data support the idea, or **pivot** (change direction) before spending more.

This is called **validated learning**: decisions rest on evidence, not intuition.

| | Design thinking | Lean Startup | Agile delivery |
|---|---|---|---|
| Question | What do users **really need**? | Is this idea **worth building**? | How do we **build and deliver** it? |
| Method | Observation and empathy | An MVP and experiments | Iterations and feedback |

The three can be combined: understand the need, test the idea, then deliver it step by step.

## The Kanban Method

@source Agile Practice Guide, A3.4; Agile Practice Guide, 2.3

"**Kanban**" means **visual sign** or **card**. Two things share the name:

| | Kanban in lean manufacturing | The Kanban Method |
|---|---|---|
| What | A system for scheduling **inventory replenishment**, just in time | A lean-inspired approach for **knowledge work** |
| Origin | Toyota, 1953 | Developed in the mid-2000s for software and other knowledge work |

A **kanban board** shows the work as cards moving through columns, one per state. The simplest board has three columns: **To Do, Doing, Done**. It is an **information radiator**.

| Defining principles | Core properties (practices) |
|---|---|
| Start with the current state | **Visualize the workflow** |
| Agree to pursue incremental, evolutionary change | **Limit work in progress (WIP)** |
| Respect the current process, roles and titles | **Manage flow** |
| Encourage acts of leadership at all levels | Make process policies explicit |
| | Implement feedback loops |
| | Improve collaboratively |

How it works:

- **Pull system.** When the team finishes an item, it **pulls** the next one into the free slot. Work is not pushed onto people.
- **WIP limits.** Each column has a maximum number of items. A full column means **stop starting and help finish**.
- **No prescribed iterations.** Work flows continuously. This is the main difference from Scrum.
- **Finishing beats starting.** Unfinished work delivers no value.
- The board makes **bottlenecks and blockers** visible.

Kanban is a good fit when work arrives **unpredictably**, such as support or maintenance requests, so the team cannot commit to a fixed sprint. It is the "**start where you are**" method: the team keeps its current roles and process and improves step by step.

## Scrum and Kanban compared

@source Agile Practice Guide, A3.4; Agile Practice Guide, A3.2; Agile Practice Guide, First Edition, 5.4.1

| | Scrum | Kanban |
|---|---|---|
| Rhythm | Fixed-length **sprints** | **Continuous flow** |
| Work enters when | At sprint planning | Whenever there is capacity (pull) |
| Limit on work | The sprint backlog | **WIP limits** per column |
| Roles | Three defined roles | **No prescribed roles**; existing roles are kept |
| Change during the cycle | The sprint is protected | New priority items can be pulled at any time |
| Main measures | Velocity | **Lead time**, cycle time, throughput |
| Getting started | A change of structure | Start with what you do now |

## Crystal, FDD and DSDM

@source Agile Practice Guide, A3.5; Agile Practice Guide, A3.6; Agile Practice Guide, A3.7

| Method | Key idea | Remember it by |
|---|---|---|
| **Crystal** | A **family** of methods. The rigor is chosen by **team size** and **criticality** (what a defect could cost: comfort, money, life). Each size has a color: Crystal Clear, Yellow, Orange, Red. | **Colors**; bigger and more critical means more rigor |
| **Feature-driven development (FDD)** | Built for large software projects. Work is organized around **features**: small capabilities with business value. Five activities: develop an overall model, build a features list, plan by feature, design by feature, build by feature. | **Features** |
| **Dynamic Systems Development Method (DSDM)** | **Constraint-driven delivery**: **time, cost and quality are fixed** at the start and **scope is prioritized** to fit them. | **Fixed time and cost, variable scope** |

- Crystal values people, interaction, community, skills, talents and communication. One of its properties is **osmotic communication**: people sitting together pick up information just by overhearing.
- DSDM is where the **MoSCoW** prioritization method comes from.
- DSDM's approach is the "inverted triangle": a traditional project fixes functionality and lets time and cost vary; DSDM does the opposite.

## Working with several teams: scaling

@source Agile Practice Guide, A3.8; Agile Practice Guide, A3.9

Scrum is designed for **one team**. When several teams build one product, a scaling approach coordinates them.

| Framework | Key idea |
|---|---|
| **Scrum of Scrums (SoS)** | A **representative from each team** meets with the others, typically two or three times a week, to report completed work, next work and impediments that could block other teams |
| **Scaled Agile Framework (SAFe)** | A knowledge base of patterns for scaling across the **whole enterprise**: team, program and portfolio levels, organized around **value streams** |
| **Large Scale Scrum (LeSS)** | Keeps Scrum as close to the original as possible: **one product backlog, one product owner, one definition of done, one sprint** for all teams |
| **Scrum@Scale** | Extends a single Scrum team's pattern across a network of teams with a minimum of extra governance |
| **PMI Disciplined Agile** | A **tool kit** that helps a team **choose** its way of working from agile, lean and traditional practices. "Context counts" and "choice is good". |

## Choosing between them

@source Agile Practice Guide, 2.2; Agile Practice Guide, A3.4

| Situation | A good fit |
|---|---|
| One team building a product in regular cycles | **Scrum** |
| A software team that needs stronger engineering practices | **XP** |
| Work that arrives unpredictably, or a team that cannot change its structure yet | **Kanban** |
| A new product whose demand is unproven | **Lean Startup** |
| Fixed deadline and budget, flexible scope | **DSDM** |
| Many teams on one product | A **scaling framework** |

Teams often **blend** methods. What matters is the outcome, not the label. But a framework should be **understood before it is tailored**.

## Exam tips

- "**Pair programming**", "**test-first**", "**refactoring**", "**continuous integration**" → **XP**.
- "**WIP limit**", "**pull**", "**visualize the workflow**", "no iterations" → **Kanban**.
- "**Eliminate waste**", "value stream" → **Lean**.
- "**MVP**", "**pivot**", "build–measure–learn" → **Lean Startup**.
- "**Colors**", "team size and criticality" → **Crystal**.
- "Time and cost fixed, scope varies" → **DSDM**.
- A Kanban column is full: the team **helps finish** work in that column before starting anything new.
- **Refactoring does not change behavior.** It improves the design of existing code.
- "Representatives of several Scrum teams meet to coordinate" → **Scrum of Scrums**.
- Kanban the **manufacturing** system is about inventory. The Kanban **Method** is about knowledge work.

---

*Source: Agile Practice Guide, Second Edition, Annex A3 (overview of agile and lean frameworks) and section 2.3 (lean thinking). The one-line definitions of the XP practices, the comparison tables, and the detailed list of wastes follow standard PMI teaching. The seven lean principles, and waste as anything that adds no business value, are in Wysocki's Effective Project Management, Eighth Edition, chapter 11, which words two of the principles as "build integrity in" and "see the whole". Lead time and cycle time as the measures of flow-based teams are in the Agile Practice Guide, First Edition, section 5.4.1. Written in original wording for personal study.*
