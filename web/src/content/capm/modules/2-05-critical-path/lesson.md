## Key points

- The **critical path** is the **longest path** through the network. It gives the **shortest possible project duration**.
- Activities on the critical path normally have **zero total float**. Delay one of them and the project is delayed.
- The **forward pass** gives the **early** start and finish dates. The **backward pass** gives the **late** start and finish dates.
- **Total float = late start − early start** (or late finish − early finish).
- **Total float** protects the **project end date**. **Free float** protects the **next activity**.
- **Crashing** adds resources and **costs money**. **Fast tracking** overlaps activities and **adds risk**.
- **Resource leveling** may change the critical path and delay the project. **Resource smoothing** does not.

## What the critical path method does

@source PMBOK 8, Guide section 5, Critical path method (CPM); Practice Standard for Scheduling, 2.2.1; Practice Standard for Scheduling, 3.4.1.1

The **critical path method (CPM)** estimates the **minimum project duration** and shows how much **scheduling flexibility (float)** each activity has. It works on the network diagram and ignores resource limits.

| Term | Meaning |
|---|---|
| **Path** | A sequence of activities from the start of the network to the end |
| **Critical path** | The **longest** path. It determines the shortest time in which the project can be finished. |
| **Critical path activity** | An activity on the critical path |
| **Near-critical path** | A path with very little float. A small delay turns it into a critical path. |
| **Float (slack)** | The time an activity can be delayed without causing a problem |

- A project can have **more than one critical path**. More critical paths means **more risk**.
- The critical path can **change** during the project, when durations or logic change.
- The early and late dates are not the actual schedule. They are **time windows** within which each activity may be done.
- The critical path is not fixed once and for all. It should be **reviewed after every schedule update**.

**Critical path activity or critical activity?** PMI's scheduling standard separates the two. A **critical path activity** is on the critical path. A **critical activity** is any activity vital to the project's success, usually because it is high risk, **even if it is not on the critical path**. Every critical path activity is a critical activity, but not the other way round.

## Finding the critical path by adding up paths

@source PMBOK 8, Guide section 5, Critical path method (CPM); PMBOK 8, Guide Figure 5-4

The quickest way: list every path, add up the durations, and pick the longest.

The example used in this lesson has six activities (durations in days):

| Activity | Duration | Predecessor |
|---|---|---|
| A | 3 | none (start) |
| B | 4 | A |
| C | 6 | A |
| D | 2 | B |
| E | 5 | C |
| F | 3 | D and E |

| Path | Calculation | Duration |
|---|---|---|
| A – B – D – F | 3 + 4 + 2 + 3 | 12 days |
| A – C – E – F | 3 + 6 + 5 + 3 | **17 days** |

The critical path is **A – C – E – F** and the project takes **17 days**. Path A – B – D – F is 5 days shorter, so its activities have float.

## The forward pass: early start and early finish

@source PMBOK 8, Guide section 5, Critical path method (CPM)

Start at the beginning of the network and work **forward**.

- **Early start (ES):** the earliest an activity can start.
- **Early finish (EF):** the earliest it can finish. **EF = ES + duration − 1.**
- The ES of the next activity is the **EF of its predecessor + 1**.
- Where several activities **merge** into one, take the **largest** EF.

| Activity | Duration | ES | EF | How |
|---|---|---|---|---|
| A | 3 | 1 | 3 | 1 + 3 − 1 |
| B | 4 | 4 | 7 | starts the day after A |
| C | 6 | 4 | 9 | starts the day after A |
| D | 2 | 8 | 9 | starts the day after B |
| E | 5 | 10 | 14 | starts the day after C |
| F | 3 | **15** | **17** | D ends on day 9, E on day 14: take the larger, 14, then + 1 |

The EF of the last activity, **day 17**, is the project duration.

> **Two conventions.** This lesson starts the project on **day 1**, as the PMBOK Guide's example does, which is why the "− 1" and "+ 1" appear. Some courses start on **day 0** and drop them (EF = ES + duration). Both give the same durations, the same critical path and the same float. Use whichever the question uses.

## The backward pass: late start and late finish

@source PMBOK 8, Guide section 5, Critical path method (CPM)

Start at the end of the network and work **backward**.

- **Late finish (LF):** the latest an activity can finish without delaying the project.
- **Late start (LS):** the latest it can start. **LS = LF − duration + 1.**
- The LF of the last activity equals its EF.
- The LF of an earlier activity is the **LS of its successor − 1**.
- Where an activity has several successors, take the **smallest** LS.

| Activity | Duration | LS | LF | How |
|---|---|---|---|---|
| F | 3 | 15 | 17 | LF = project end; 17 − 3 + 1 |
| E | 5 | 10 | 14 | must finish the day before F starts |
| D | 2 | 13 | 14 | must finish the day before F starts |
| C | 6 | 4 | 9 | must finish the day before E starts |
| B | 4 | 9 | 12 | must finish the day before D starts |
| A | 3 | **1** | **3** | B's LS is 9, C's is 4: take the smaller, 4, then − 1 |

## Total float and free float

@source PMBOK 8, Guide section 5, Critical path method (CPM); PMBOK 8, Guide Figure 5-4; Practice Standard for Scheduling, 3.4.2

| | Meaning | Formula |
|---|---|---|
| **Total float** | How long an activity can be delayed without delaying the **project finish date** | **LS − ES**, or **LF − EF** |
| **Free float** | How long an activity can be delayed without delaying the **early start of its successor** | ES of successor − EF of the activity − 1 (day-1 convention) |

| Activity | ES | EF | LS | LF | Total float | Free float |
|---|---|---|---|---|---|---|
| A | 1 | 3 | 1 | 3 | **0** | 0 |
| B | 4 | 7 | 9 | 12 | 5 | **0** |
| C | 4 | 9 | 4 | 9 | **0** | 0 |
| D | 8 | 9 | 13 | 14 | 5 | **5** |
| E | 10 | 14 | 10 | 14 | **0** | 0 |
| F | 15 | 17 | 15 | 17 | **0** | 0 |

- Activities with **zero total float** (A, C, E, F) form the **critical path**. The result matches the path method.
- Activity **B** has 5 days of total float but **zero free float**: any delay to B pushes D, even though the project end is safe.
- **Total float is shared along a path; free float belongs to one activity.** B and D share the same 5 days. If B uses 3 of them, D has only 2 left.
- Watch float after each update. **Shrinking total float** is a threat to the project end date. **Shrinking free float** means the next activities may start late.
- A critical activity delayed by 2 days delays the project by **2 days**. A non-critical activity delays the project only by the amount its delay **exceeds its total float**.

@diagram network-diagram

## Negative float

@source PMBOK 8, Guide section 5, Critical path method (CPM); PMBOK 8, Guide section 5, Schedule compression; Practice Standard for Scheduling, 3.4.4

**Negative float** appears when an imposed date or constraint is **earlier than the logic and durations allow**. It means the schedule cannot meet the required date as planned.

- Example: the calculation shows 17 days, but the customer needs the result in 15. The critical path has **−2 days** of float.
- The response is to change durations, logic, leads and lags, or to **compress the schedule**.
- **Date constraints** such as "must start on" or "finish no later than" remove flexibility and can distort the critical path. They should be used only when logic cannot model the situation, and the reason should be noted.

## Schedule compression: crashing and fast tracking

@source PMBOK 8, Guide section 5, Schedule compression; PMBOK 8, Guide Figure 5-20

Schedule compression **shortens the schedule without reducing scope**. Both techniques are applied to activities **on the critical path**, because shortening other activities does not shorten the project.

| | **Crashing** | **Fast tracking** |
|---|---|---|
| How | **Add resources**: overtime, extra people, paying for faster delivery | Do activities **in parallel** that were planned in sequence |
| Main downside | **Higher cost** | **Higher risk** and possible **rework** |
| Works when | Extra resources really shorten the activity | The activities can be overlapped (the dependency is discretionary) |
| Example | Paying a second crew to paint | Starting the foundation before all drawings are complete |

- When crashing, choose the critical activity with the **least additional cost** per unit of time saved.
- After compressing, **recalculate**: a different path may now be critical.
- If the schedule must be shortened and there is **no extra budget**, the answer is **fast tracking**. If **risk** must be kept low and money is available, the answer is **crashing**.

## Resource optimization: leveling and smoothing

@source PMBOK 8, Guide section 5, Resource optimization technique; PMBOK 8, Guide Figure 5-18

The critical path method ignores resource limits. Resource optimization adjusts start and finish dates to **match resource demand with supply**.

| | **Resource leveling** | **Resource smoothing** |
|---|---|---|
| Used when | A resource is **overallocated** or available only at certain times | Resource use should stay under a set limit |
| Activities moved | As needed, even beyond their float | Only **within their free and total float** |
| Critical path | **May change**, and the project may finish later | **Does not change**; the finish date is not delayed |
| Limitation | Can lengthen the schedule | May not be able to fix every overallocation |

Example of leveling: Sue is assigned 16 hours of work on the same day. One of her activities is moved to the next day.

## Other schedule analysis techniques

@source PMBOK 8, Guide section 5, Schedule network analysis; PMBOK 8, Guide section 5, What-if analysis; PMBOK 8, Guide section 5, Simulation; PMBOK 8, Guide section 5, Critical chain method; Practice Standard for Scheduling, 2.2.2; PMBOK 8, Guide section 4, Project schedule network diagram

| Technique | What it does |
|---|---|
| **Schedule network analysis** | The overall technique for producing the schedule model. It uses the critical path method, resource optimization and modeling. |
| **What-if analysis** | Evaluates scenarios ("what if the supplier is two weeks late?") to predict their effect on the schedule |
| **Simulation (Monte Carlo analysis)** | Runs the schedule many times with different assumptions to show the range and probability of possible finish dates |
| **Critical chain method** | Places **buffers** on schedule paths to account for limited resources and uncertainty, and protects the project due date with a shared project buffer |

The **critical chain** is the longest **resource-leveled** path through the schedule, including buffers. It is often different from the critical path. Safety time is taken out of the individual activities and collected in buffers:

| Buffer | Where it sits | Purpose |
|---|---|---|
| **Project buffer** | At the end, between the last activity and the delivery date | Protects the project end date |
| **Feeding buffer** | Where a chain of non-critical activities joins the critical chain | Stops delays on side paths from reaching the critical chain |
| **Resource buffer** | Along the critical chain | An early warning that a resource will be needed soon. It adds no time. |

Progress is managed by watching how fast the project buffer is used up (**buffer management**).

- **Path convergence** (an activity with several predecessors) and **path divergence** (several successors) are points of **higher schedule risk**.

## Exam tips

- "Longest path" and "shortest project duration" both describe the **critical path**. Do not choose "shortest path".
- For most questions, **add up the paths**. Use the forward and backward pass only when asked for ES, EF, LS, LF or float.
- **Total float = LS − ES = LF − EF.** If the two give different numbers, recheck your passes.
- In a forward pass take the **largest** value at a merge. In a backward pass take the **smallest**.
- Check whether the question starts on **day 0 or day 1**. The float and duration are the same either way.
- "Add resources" or "overtime" means **crashing** (cost goes up). "In parallel" or "overlap" means **fast tracking** (risk goes up).
- Compress activities **on the critical path** only.
- "Can delay the project" points to **leveling**. "Uses only float" points to **smoothing**.
- Negative float means the schedule is **behind an imposed date**.

---

*Source: PMBOK Guide, Eighth Edition, the Guide section 5 (critical path method, schedule compression, resource optimization technique and related entries); Practice Standard for Scheduling, Third Edition, sections 2.2.1, 2.2.2, 3.4.1, 3.4.2 and 3.4.4 (critical path, critical chain and buffers, float, date constraints). The six-activity example is my own, calculated with the same day-1 convention as the Guide's Figure 5-4. Written in original wording for personal study.*
