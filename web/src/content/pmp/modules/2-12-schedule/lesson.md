## Key points

- The **Schedule** domain plans **how and when** the project delivers its scope. Three processes: **Plan Schedule Management, Develop Schedule, Monitor and Control Schedule**.
- **Develop Schedule** has four steps: **define activities, determine sequence, estimate effort and duration, adjust**.
- Four logical relationships: **finish-to-start** (the most common), **start-to-start**, **finish-to-finish**, **start-to-finish**. Dependencies are **mandatory or discretionary**, and **internal or external**.
- The **critical path** is the longest path through the network: it sets the **shortest possible project duration**, and its activities usually have **zero total float**.
- To shorten the schedule without cutting scope: **crashing** (add resources, more cost) or **fast tracking** (overlap activities, more risk).
- The **schedule baseline** changes only through **formal change control**. Monitor the schedule against it and analyze the variance; in agile, track **velocity** and accepted work.

## The Schedule performance domain

@source PMBOK 8, Guide 2.3; PMBOK 8, Guide 2.3.1; PMBOK 8, Guide 2.3.2

The schedule shows how and when the project delivers its products, services and results. It is a tool for **communication**, for managing **expectations**, and a basis for **performance reporting**; it helps spot delays early.

| Concept | Meaning |
|---|---|
| **Project schedule** | Output of a schedule model: linked activities with dates, durations, milestones and resources |
| **Effort** | Labor units needed for an activity (hours, days) |
| **Duration** | Work periods needed to complete the activity with the estimated resources |
| **Schedule baseline** | The approved schedule model, changed only through **formal change control**, used to compare with actual results |
| **Schedule forecasts** | Predictions of future dates from current progress and trends, reissued as work proceeds |
| **Network diagram** | A graphic of the logical relationships (dependencies) among activities |

| Process | Focus area | What it does |
|---|---|---|
| **Plan Schedule Management** | Planning | Policies, procedures and documentation for the schedule |
| **Develop Schedule** | Planning | Analyzes sequences, durations, resources and constraints to create the schedule model |
| **Monitor and Control Schedule** | Monitoring and Controlling | Updates the schedule and manages changes to the baseline |

## A schedule for the chosen approach

@source PMBOK 8, Guide 2.3.3.1; PMBOK 8, Guide 2.3.3.6; PMBOK 8, Guide section 5, Rolling wave planning; PMBOK 8, Guide 2.3.2.1

The first enabler of Process task 8 is to **prepare a schedule based on the selected development approach**.

| Life cycle | How the schedule is built |
|---|---|
| **Predictive** | Defined **up front**: detailed sequencing, a baseline, clear milestones, dependencies and critical paths; changes through formal change management |
| **Adaptive** | Flexible, **timeboxed** sprints or iterations with short planning horizons |
| **Hybrid** | A **high-level predictive** schedule of key milestones; inside it, streams use iterations, Kanban or the critical path method |

**Scheduling methods:** critical path method, **critical chain**, **location-based scheduling** (quantities per location, production rates, crew sizes), **Lean scheduling** and the Last Planner System (pull planning: master, phase and look-ahead scheduling), Gantt charts, Kanban.

**Rolling wave planning** plans near-term work in detail and future work at a higher level, refining it as information arrives. Many practitioners now build detailed schedules **progressively**, even on predictive projects.

**Plan Schedule Management** produces the **schedule management plan**: how the schedule is developed, **release and iteration length**, level of accuracy, units of measure, control thresholds, rules of performance measurement and reporting formats.

## Defining activities, milestones and dependencies

@source PMBOK 8, Guide 2.3.2.2; Practice Standard for Scheduling, 3.2.1.1; PMBOK 8, Guide section 5, Precedence diagramming method; PMBOK 8, Guide section 5, Dependency determination and integration; PMBOK 6, 6.3.2.2; PMBOK 8, Guide section 5, Leads and lags

The enabler: **estimate project tasks (milestones, dependencies, story points)**. Steps 1 and 2 of Develop Schedule:

- **Define activities:** decompose work packages into schedule activities. Artifacts: activity list, activity attributes, milestones.
- **Milestones** have **zero duration** and no resources; they mark the start or completion of a deliverable or an external event (an approval), and are used to **measure progress**. Every project has a start and a finish milestone.
- **Determine sequence:** every activity except the first and last has at least one **predecessor** and one **successor**.

| Relationship | Rule | Example |
|---|---|---|
| **Finish-to-start (FS)** | The successor cannot start until the predecessor finishes | Install the operating system after the hardware is assembled |
| **Start-to-start (SS)** | The successor cannot start until the predecessor starts | Leveling concrete begins after pouring begins |
| **Finish-to-finish (FF)** | The successor cannot finish until the predecessor finishes | Editing finishes after writing finishes |
| **Start-to-finish (SF)** | The successor cannot finish until the predecessor starts | Rare |

| Dependency | Meaning |
|---|---|
| **Mandatory** (hard logic) | Required by contract or the nature of the work: a prototype must be built before it is tested |
| **Discretionary** (preferred or soft logic) | Chosen from best practice; document it, and review it when **fast tracking** |
| **External** | Between project and non-project activities, usually **outside the team's control**: hardware from a supplier, a government hearing |
| **Internal** | Between project activities, inside the team's control |

- A **lead** lets a successor start **earlier** (landscaping 2 weeks before the punch list ends: FS with a 2-week lead).
- A **lag** **delays** a successor (editing starts 15 days after writing starts: SS with a 15-day lag).
- Leads and lags **do not replace schedule logic**, and duration estimates do not include them.

## Estimating durations with benchmarks and history

@source PMBOK 8, Guide 2.3.2.2; PMBOK 8, Guide section 5, Multipoint estimating; Practice Standard for Project Estimating, 4.2.1; PMBOK 8, Guide section 5, Historical information review; PMBOK 8, Guide section 5, Benchmarking

Two enablers: **estimate project tasks** and **utilize benchmarks and historical data**.

Step 3 estimates the number of work periods for each activity. Techniques: expert judgment, **Delphi**, **analogous**, **parametric**, **PERT**, **bottom-up**, **planning poker**, **story points**, **T-shirt sizing**. Inputs come from the people **most familiar with the work**.

| Three-point formula | Calculation |
|---|---|
| **Triangular** (little historical data) | tE = (tO + tM + tP) / 3 |
| **Beta (PERT)** | tE = (tO + 4tM + tP) / 6 |

**Example.** Optimistic 6 days, most likely 9, pessimistic 18. Triangular: (6 + 9 + 18) / 3 = 11 days. Beta: (6 + 4 × 9 + 18) / 6 = 10 days.

Factors that change durations:

- **Law of diminishing returns:** adding more of one resource eventually adds less and less output.
- **Doubling resources does not halve the time:** coordination, learning curves and knowledge transfer can even make it longer.
- Some work has a **fixed duration** whatever the resources (a 24-hour stress test).
- **Cognitive bias:** the planning fallacy and Hofstadter's law make estimates optimistic.
- Document the data and **assumptions** behind every estimate.

**History and benchmarks:** analogous and parametric estimates rest on **historical data**; a **historical information review** feeds the models; **benchmarking** compares with comparable organizations.

## Creating the schedule: the critical path

@source PMBOK 8, Guide section 5, Critical path method (CPM); PMBOK 8, Guide Figure 5-4; PMBOK 8, Guide section 5, Schedule network analysis

The enabler: **create a project schedule**.

The **critical path method** finds the **minimum project duration** and the **float** on each path:

- **Forward pass** (early dates): EF = ES + duration − 1.
- **Backward pass** (late dates): LS = LF − duration + 1.
- **Total float** = LS − ES (or LF − EF): how long an activity can slip **without delaying the project**.
- **Free float**: how long it can slip **without delaying the early start of its successor**.
- The **critical path** is the longest path; its activities usually have **zero total float**. **Negative float** means a constraint forces dates earlier than the logic allows.

**Example.** A (5 days) is followed by B (8 days) and C (3 days); both lead to D (4 days).

| Path | Duration |
|---|---|
| A–B–D | 5 + 8 + 4 = 17 days (critical) |
| A–C–D | 5 + 3 + 4 = 12 days |

C starts at day 6 at the earliest. Its late finish is day 13 (D must start on day 14), so LS = 13 − 3 + 1 = 11, and total float = 11 − 6 = 5 days.

**Schedule network analysis** also looks for **converging paths** (more risk of a slip), and for high-risk activities or long-lead items on the critical path that need reserves or risk responses.

## Coordinating with other projects and operations

@source PMBOK 8, Guide 2.3.2.2; Practice Standard for Scheduling, 3.1.2.11; Practice Standard for Scheduling, 3.2.1.9; PMBOK 6, 6.3.2.2

The enabler: **coordinate with other projects and operations**.

- In step 4, team members check that their dates **do not conflict** with resource calendars or **assignments in other projects**.
- A **master schedule model** links subprojects (phases, distributed teams, contractors) at agreed **interface points**.
- **External dependencies** (deliveries, approvals, operations' shutdown windows) are outside the team's control and must be tracked.
- **Schedule levels:** level 0, a one-line summary, compares projects in a **program or portfolio**; level 1 shows key milestones for executives.
- Contractors' and suppliers' **regular and milestone status updates** keep their work on the schedule.

## Adjusting and baselining the schedule

@source PMBOK 8, Guide 2.3.2.2; PMBOK 8, Guide section 5, Schedule compression; PMBOK 8, Guide section 5, Critical chain project management (CCPM); Practice Standard for Scheduling, 3.2.1.8

The enabler: **baseline a project schedule**. Step 4, **adjust**: if the draft schedule is unacceptable, change it.

| Technique | How it works | Trade-off |
|---|---|---|
| **Crashing** | Add resources to **critical path** activities: overtime, extra people, paying to expedite | More **cost**; works only where resources shorten the activity |
| **Fast tracking** | Do sequential activities **in parallel** for part of their duration | More **risk** and possible **rework**; needs more coordination |
| **Resource leveling** | Adjust dates for limited resources (module 2.7) | May **extend** the critical path |
| **Critical chain** | One **project buffer** replaces task-level buffers, used only where needed | Protects the due date |

Once approved, the first version becomes the **baseline schedule model**, the benchmark for measuring performance. Every project should have one **before the work begins**; afterwards, changes go through **integrated change control**.

## Executing the plan and analyzing variation

@source PMBOK 8, Guide 2.3.2.3; Practice Standard for Scheduling, 3.3.5; PMBOK 8, Guide 2.3.5

Two enablers: **execute a schedule management plan** and **analyze schedule variation**.

| Predictive | Agile |
|---|---|
| Determine the schedule's status | Compare work **delivered and accepted** with the estimate for the elapsed time |
| Influence the factors that create changes | Hold **retrospectives** to improve the process |
| Reconsider schedule reserves | **Reprioritize** the backlog |
| Decide whether the schedule has changed | Measure **velocity** per iteration |
| Manage the changes as they occur; changes to the baseline only through **Assess and Implement Changes** | Decide whether the schedule has changed and manage the changes |

Tools include earned value analysis (SPI, module 2.10), **burnup and burndown charts**, performance reviews, **trend** and **variance analysis**, what-if scenarios, the critical path method, resource optimization, leads and lags, schedule compression, velocity and **sprint reviews**. Outputs: work performance information, **schedule forecasts**, change requests.

**Rebaselining** is needed after major scope changes or events (a redesign, a disaster) that make the baseline unrealistic. Explain why, agree the causes with key stakeholders, and **archive the original baseline**; past performance statistics restart from that point.

## Predictive and agile

@source PMBOK 8, Guide 2.3.3.1; PMBOK 8, Guide 2.3.2.3; PMBOK 8, Guide 2.3.1

| | Predictive | Agile |
|---|---|---|
| Building it | Up front: activities, logic, critical path | Timeboxed iterations; release planning (module 2.13) |
| Estimating | Analogous, parametric, three-point, bottom-up | Story points, planning poker, T-shirt sizing |
| Baseline | Formal; changed through change control | Flexible, or no formal baseline |
| Tracking | Variance against the baseline, SPI | Velocity, burnup and burndown charts |

## Exam tips

- The critical path is the longest path and has zero float; delaying it delays the project.
- Crashing costs money; fast tracking adds risk.
- Mandatory dependencies cannot be changed; discretionary ones can, for fast tracking.
- Beta (PERT): (O + 4M + P) / 6; triangular: (O + M + P) / 3.
- Adding people does not shorten every activity, and can lengthen it.
- The schedule baseline changes only through change control.
