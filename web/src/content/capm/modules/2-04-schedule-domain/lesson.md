## Key points

- The **Schedule** domain has three processes: **Plan Schedule Management**, **Develop Schedule** and **Monitor and Control Schedule**.
- Develop Schedule has **four steps**: define activities, determine sequence, estimate effort and duration, adjust.
- **Work packages** are decomposed into **activities**. A **milestone** is a significant point or event with **zero duration**.
- The **precedence diagramming method** has four relationships. **Finish-to-start** is the most common; **start-to-finish** is very rarely used.
- A **lead** lets the successor start earlier. A **lag** makes the successor wait.
- **Analogous** estimating is quick and less accurate. **Parametric** uses a rate. **Bottom-up** is the most detailed. **Three-point** estimating handles uncertainty.
- **Effort** is labor units. **Duration** is work periods. They are not the same number.
- The **schedule baseline** is the approved schedule and changes only through formal change control.

## What the Schedule domain covers

@source PMBOK 8, Guide 2.3; PMBOK 8, Guide 2.3.1

The schedule is a plan of **how and when** the project will deliver what is defined in the scope. It is also a **communication tool**: it manages stakeholder expectations and is the basis for performance reporting.

| Term | Meaning |
|---|---|
| **Schedule model** | The activities, logic, durations and resources held in the scheduling tool. The project schedule is an **output** of the model. |
| **Project schedule** | Linked activities with planned dates, durations, milestones and resources. |
| **Schedule baseline** | The **approved** version of the schedule model. Changed only through formal change control; used for comparison with actual results. |
| **Estimate** | A quantitative assessment of a likely amount or outcome, such as effort or duration. |
| **Schedule forecast** | A prediction of the project's future timeline, based on progress and performance so far. |
| **Actual duration** | The time between an activity's actual start and its actual finish (or today's data date if it is still in progress). |

A detailed schedule often cannot be built for the whole project up front. Near-term work is planned in detail and later work at a higher level, which is **rolling wave planning**.

## The three Schedule processes

@source PMBOK 8, Guide 2.3.2; PMBOK 8, Guide Figure 2-20

| Focus Area | Process | Main output | Older name you may see |
|---|---|---|---|
| Planning | **Plan Schedule Management** | Schedule management plan | Plan Schedule Management |
| Planning | **Develop Schedule** | Schedule baseline, project schedule, schedule data, project calendars | Define Activities, Sequence Activities, Estimate Activity Durations, Develop Schedule |
| Monitoring and Controlling | **Monitor and Control Schedule** | Work performance information, schedule forecasts, change requests | Control Schedule |

> **Edition note.** Older material lists Define Activities, Sequence Activities and Estimate Activity Durations as separate processes. The 8th edition treats them as **steps inside Develop Schedule**. The order and the content are the same.

## Plan Schedule Management

@source PMBOK 8, Guide 2.3.2.1

Establishes the policies, procedures and documentation for developing, managing and controlling the schedule. The output is the **schedule management plan**, a component of the project management plan. It sets, for example:

- the scheduling method and tool,
- the **level of accuracy** and **units of measure** (hours, days, weeks),
- release and iteration length,
- **control thresholds**: how much variance is allowed before action is needed,
- rules of performance measurement and reporting formats.

It says **how** the schedule will be managed. It does not contain any dates.

## The four steps of Develop Schedule

@source PMBOK 8, Guide 2.3.2.2; PMBOK 8, Guide Figure 2-23

Develop Schedule analyzes sequences, durations, resource requirements and constraints to create the schedule model. It is **iterative**.

| Step | What happens | Artifacts |
|---|---|---|
| **1. Define activities** | Work packages are **decomposed** into schedule activities | Activity list, activity attributes, milestone list |
| **2. Determine sequence** | Logical relationships between activities are set | Project schedule network diagram |
| **3. Estimate effort and duration** | The work periods needed for each activity are estimated | Duration estimates, basis of estimates |
| **4. Adjust** | The draft schedule is reviewed and reworked until it is acceptable, then approved | Schedule baseline, project schedule |

## Step 1: Define activities

@source PMBOK 8, Guide 2.3.2.2; PMBOK 8, Guide section 4, Activity list; PMBOK 8, Guide section 4, Milestone list

| Artifact | Meaning |
|---|---|
| **Activity list** | All schedule activities, each with an identifier and a description of the work clear enough for the team to understand |
| **Activity attributes** | Extra detail for each activity: predecessors, successors, logical relationships, leads and lags, resource needs, constraints, assumptions |
| **Milestone list** | All milestones, marked **mandatory** (for example required by contract) or **optional**. A milestone has **zero duration**. |

- Decomposition is used twice: scope into **work packages** (the WBS), then work packages into **activities** (the schedule).
- A work package is a **deliverable** (a noun: "kitchen cabinets"). An activity is **work** (a verb: "install kitchen cabinets").

## Step 2: Determine sequence

@source PMBOK 8, Guide section 5, Precedence diagramming method; PMBOK 8, Guide Figure 5-13; Practice Standard for Scheduling, 3.4.8

The **precedence diagramming method (PDM)** shows activities as **nodes** (boxes) linked by arrows that show their logical relationships. The **predecessor** comes before; the **successor** depends on it.

| Relationship | Rule | Example |
|---|---|---|
| **Finish-to-start (FS)** | The successor cannot **start** until the predecessor has **finished** | Install the operating system after the hardware is assembled |
| **Finish-to-finish (FF)** | The successor cannot **finish** until the predecessor has **finished** | Editing cannot finish until writing has finished |
| **Start-to-start (SS)** | The successor cannot **start** until the predecessor has **started** | Leveling concrete cannot start until pouring has started |
| **Start-to-finish (SF)** | The successor cannot **finish** until the predecessor has **started** | Delivery of a piece of equipment cannot finish until the activity that installs it has started |

- **FS is the most commonly used.** **SF is very rarely used.**
- Every activity except the first and the last should have at least one predecessor and one successor.
- Closed loops are not allowed.
- An activity with no predecessor or no successor is an **open end**. It hides the real logic and creates a false appearance of float. Only the project start and finish milestones may be open-ended.

## Types of dependencies

@source PMBOK 8, Guide section 5, Dependency determination and integration

| Dependency | Meaning | Example |
|---|---|---|
| **Mandatory** (hard logic) | Required by law, by contract or by the nature of the work | The foundation must be built before the walls |
| **Discretionary** (soft logic, preferred logic) | A sequence chosen because it is good practice, although another order would work | Finish the plumbing before starting the electrical work |
| **External** | Depends on something outside the project, usually outside the team's control | Waiting for a government permit |
| **Internal** | Between project activities, within the team's control | The team cannot test a machine before assembling it |

Two attributes apply at the same time: a dependency is mandatory **or** discretionary, **and** internal **or** external. Discretionary dependencies are the first to review when the schedule must be shortened.

## Leads and lags

@source PMBOK 8, Guide section 5, Leads and lags; Practice Standard for Scheduling, 3.4.7

| | Meaning | Example |
|---|---|---|
| **Lead** | The successor is **advanced**: it can start before the predecessor is complete | Landscaping starts 2 weeks before the punch list is finished (FS with a 2-week lead) |
| **Lag** | The successor is **delayed**: waiting time is added | Editing starts 15 days after writing starts (SS with a 15-day lag); waiting for concrete to cure |

- A lead is often shown as a **negative lag** in scheduling software.
- Duration estimates do **not** include leads or lags.
- Leads and lags should not replace proper schedule logic.
- Both **add schedule risk**, because they are hard to see in the schedule. Where possible, a lag is better shown as its own activity (for example "Cure concrete, 3 days").

## Step 3: Estimate effort and duration

@source PMBOK 8, Guide 2.3.2.2; PMBOK 8, Guide section 5, Estimation techniques; Practice Standard for Project Estimating, 2.4; Practice Standard for Project Estimating, 4.5; Effective Project Management, Chapter 7, Estimating Duration

| Term | Meaning | Example |
|---|---|---|
| **Effort** | The number of **labor units** needed | 80 person-hours |
| **Duration** | The number of **work periods** needed, with the estimated resources | 5 working days with two people |
| **Elapsed time** | Calendar time, including non-working days | 7 calendar days |

- Estimates should come from the people **most familiar with the work**.
- Estimates are **progressively elaborated**: they become more accurate as more is known.
- The assumptions and data behind an estimate are recorded in the **basis of estimates**.
- **More people does not always mean faster.** Because of the **law of diminishing returns**, each added resource yields less, and too many resources can even lengthen the work through coordination and learning time.
- Some work takes a fixed time whatever the resources, such as a 24-hour stress test.
- Early estimates have a **wide range**; the range narrows as scope becomes clearer. This narrowing is called the **cone of uncertainty**.

Human habits that distort estimates:

| Bias | What happens |
|---|---|
| **Optimism** (the planning fallacy) | People underestimate how long work will take |
| **Padding** (also called buffering or sandbagging) | People quietly add extra time to each estimate. Added up over many work packages, the schedule becomes far too long. Risk should be covered by a **visible reserve**, not hidden padding. |
| **Anchoring** | The first number mentioned pulls every later estimate toward it |

## Estimating techniques

@source PMBOK 8, Guide section 5, Analogous estimating; PMBOK 8, Guide section 5, Parametric estimating; PMBOK 8, Guide section 5, Bottom-up estimating; PMBOK 8, Guide section 5, Multipoint estimating; Practice Standard for Scheduling, 3.4.3; Practice Standard for Project Estimating, 4.3

| Technique | How it works | When to use it | Accuracy |
|---|---|---|---|
| **Analogous** (top-down) | Uses the actual duration of a **similar past project** | Early, when little detail is known | Quick and cheap, less accurate |
| **Parametric** | Uses a **rate or algorithm** from historical data: quantity × time per unit | When the work is repetitive and measurable | Can be very accurate with good data |
| **Bottom-up** | Estimates each lower-level piece and **adds them up** | When detail is available | Most accurate, most time-consuming |
| **Three-point** (multipoint) | Averages an **optimistic, most likely and pessimistic** estimate | When there is uncertainty | Improves on a single guess |
| **Expert judgment** | Relies on people with specialized knowledge | Always, alongside other techniques | Depends on the expert |

**Relative estimating** compares items with each other instead of estimating each one in hours or money. It is fast and deliberately trades accuracy for speed, which suits adaptive teams.

| Relative technique | How it works |
|---|---|
| **Story points** | A unit the team agrees on for the relative size of a backlog item |
| **T-shirt sizing** | Items are sized XS, S, M, L, XL. Sizes are often given Fibonacci values: 1, 2, 3, 5, 8, 13. |
| **Planning poker** | Each member privately picks a card with a point value; all cards are revealed **at the same time**; large differences are discussed and the team votes again |
| **Affinity grouping** | Items are placed in groups of similar size. Quick for a large number of items. |

Revealing the cards together in planning poker prevents **anchoring** on the first number spoken.

**Parametric example.** 1,000 meters of cable, and a crew installs 25 meters per hour: 1,000 ÷ 25 = **40 hours**.

**Three-point example.** Optimistic (O) = 4 days, most likely (M) = 6 days, pessimistic (P) = 14 days.

| Formula | Calculation | Result |
|---|---|---|
| **Triangular** (simple average): (O + M + P) ÷ 3 | (4 + 6 + 14) ÷ 3 | **8 days** |
| **Beta, or PERT** (weighted average): (O + 4M + P) ÷ 6 | (4 + 24 + 14) ÷ 6 | **7 days** |

The three estimates are defined as: **optimistic**, the shortest duration under the most favorable conditions; **most likely**, the duration that will occur most often; **pessimistic**, the duration under the least favorable conditions.

If a question says "PERT", "beta" or "weighted", use the formula with **4M and 6**. If it says "triangular" or "simple average", divide by **3**.

## Step 4: Adjust, and the finished schedule

@source PMBOK 8, Guide 2.3.2.2; PMBOK 8, Guide section 4, Project schedule; PMBOK 6, 6.5.3.2

The draft schedule is reviewed against resources and constraints. If it is not acceptable, it is reworked using techniques such as the **critical path method**, **schedule compression** and **resource leveling** (covered in the next module). Team members confirm that their dates do not clash with other work. Then the schedule is **approved and becomes the schedule baseline**.

The same schedule can be presented in different ways:

| Format | Shows | Best for |
|---|---|---|
| **Milestone chart** | Only the key events | Reporting to senior management |
| **Bar chart (Gantt chart)** | Activities as bars over time | Tracking progress and communicating with the team |
| **Project schedule network diagram** | Activities and the logic between them | Seeing dependencies and the critical path |

## Monitor and Control Schedule

@source PMBOK 8, Guide 2.3.2.3; PMBOK 8, Guide Figure 2-24

Monitors the status of the project to **update the schedule** and **manage changes** to the schedule baseline. Its key benefit is keeping the schedule **realistic** throughout the project.

| Inputs | Tools and techniques | Outputs |
|---|---|---|
| Schedule management plan, schedule baseline, project schedule, **work performance data** | Earned value analysis, variance analysis, trend analysis, critical path method, schedule compression, burnup and burndown charts | **Work performance information**, **schedule forecasts**, **change requests** |

- In a predictive project, a change to the **schedule baseline** can be approved only through **Assess and Implement Changes** (integrated change control).
- The process is also about **influencing the factors** that cause schedule changes, not just recording them.
- For contracted work, regular status updates and reviews with the supplier keep the schedule under control.

## Scheduling in adaptive projects

@source PMBOK 8, Guide 2.3.2.3; PMBOK 8, Guide 2.3.3.1

| Predictive | Adaptive |
|---|---|
| Schedule defined up front, baselined and changed through formal change control | Work divided into **timeboxed** iterations or sprints with short planning horizons |
| Progress measured against the schedule baseline | Progress measured by work **delivered and accepted** per iteration |
| Critical path, milestones | **Velocity**, burndown and burnup charts, backlog reprioritization |

- **Velocity** is the rate at which the team produces, validates and accepts deliverables per iteration.
- An iteration is an agreed, fixed work cycle, typically two weeks to one month.
- A **hybrid** project often plans the high-level milestones predictively and runs the detailed work in iterations.

## Exam tips

- "Which relationship is most common?" **Finish-to-start.** "Least common?" **Start-to-finish.**
- "Waiting for paint to dry" or "concrete to cure" is a **lag**. Starting a successor early is a **lead**.
- "Limited information, early in the project, quick estimate": **analogous**. "Cost or time per unit": **parametric**. "Most accurate, most effort": **bottom-up**.
- Read three-point questions carefully for the word **PERT**, **beta** or **weighted** (divide by 6) versus **triangular** (divide by 3).
- A **milestone** has **zero duration**.
- Activities are **not** in the WBS. They come from decomposing work packages.
- A dependency on a permit, a supplier or another project is **external**. "Best practice" or "preferred" means **discretionary**.
- Changing the schedule baseline always needs an **approved change request**.

---

*Source: PMBOK Guide, Eighth Edition, the Guide section 2.3 (Schedule performance domain) and sections 4 and 5; Practice Standard for Scheduling, Third Edition, sections 3.4.3, 3.4.5, 3.4.7 and 3.4.8 (the beta or PERT formula, open ends, leads and lags, and the start-to-finish example); Practice Standard for Project Estimating, Second Edition, sections 2.4, 4.3 and 4.5 (evolving estimates, relative estimating, optimism, padding and anchoring). The schedule formats (milestone chart, bar chart, network diagram) are described in the PMBOK Guide, Sixth Edition, section 6.5.3.2. The difference between duration and work effort is in Wysocki's Effective Project Management, Eighth Edition, chapter 7. Wysocki uses "elapsed time" for duration in working days; counting elapsed time in calendar days, as the table does, is the usual exam-preparation wording. Written in original wording for personal study.*
