## Key points

- Agile planning works in levels: **product vision → product roadmap → release plan → iteration plan → tasks**. A release plan typically covers **3 to 6 months** and sets the number of iterations.
- **Story points** estimate **relative** effort or complexity, not hours. Teams estimate together with **planning poker**, **affinity grouping** or **T-shirt sizes**, often on a **Fibonacci** scale.
- **Velocity** is the sum of story points completed and accepted in an iteration. It is a **team-specific planning aid**: never compare teams by it or use it as a target.
- **Release forecast:** remaining points ÷ the team's average velocity = iterations still needed.
- In **iteration planning**, the team commits only to what fits its **capacity**; lower-priority stories go back to the backlog.
- Track with **burndown** (work remaining) and **burnup** (work completed toward a goal) charts, and with **flow metrics**: throughput, cycle time, lead time, WIP.

## Planning levels: vision to tasks

@source PMBOK 8, Guide section 5, Agile release planning; PMBOK 8, Guide Figure 5-1; Agile Practice Guide, 5.2.1; Practice Standard for Scheduling, 2.6

| Level | What it holds |
|---|---|
| **Product vision** | Why the product exists; drives the roadmap |
| **Product roadmap** | The anticipated sequence of deliverables over time; the product owner **replans** it as the team delivers and information emerges |
| **Release plan** | A high-level timeline (typically **3 to 6 months**) with the **number of iterations** and which features come when |
| **Iteration plan** | The stories for the current iteration, broken into tasks |
| **Tasks** | Often estimated in hours; stories in **story points** |

- **Agile release planning** lets the product owner and team set scope, timelines and a releasable product, considering business goals, **dependencies**, impediments and resource availability.
- Features are value to the customer, so a release plan is an **easily understood schedule**: it shows which features will be available after each iteration.
- The backlog does not need every story up front: only enough to understand the **first release** in broad strokes, and enough items for the **next iteration**.
- There is **more planning** in agile, but it is **distributed** over the life cycle. Too little up-front planning risks rework; too much creates a detailed but inaccurate plan.

## Relative estimating: story points

@source Practice Standard for Project Estimating, 4.3; PMBOK 8, Glossary (story point); PMBOK 8, Guide 2.3.2.2; Practice Standard for Project Estimating, 2.6.2

The enabler of Process task 8: **estimate project tasks (milestones, dependencies, story points)**.

- A **story point** is a unit of the **relative** effort needed for a user story. Teams are better at **comparing** items than at predicting exact durations.
- Relative estimating is **fast** and deliberately trades some accuracy for speed. Teams use proxies such as **T-shirt sizes** (XS to XXL), often mapped to the **Fibonacci** series (1, 2, 3, 5, 8, 13).
- The units are **specific to the team**: a 5 for one team is not a 5 for another.
- A non-numerical unit stops management from treating the estimate as a **firm commitment** to a date.
- Initial **ROM** estimates of the number of iterations are soon replaced by relative estimates.

| Technique | How it works |
|---|---|
| **Affinity grouping** | Items are placed on a wall from smaller (left) to larger (right); good for **many items** quickly |
| **Planning poker** | Each member picks a card privately; all **reveal at once**; the **lowest and highest** explain their reasons; the team re-votes until the estimates **converge** |
| **T-shirt sizing** | XS, S, M, L, XL for a quick, coarse size |

> **On the exam.** The people who will **do the work** estimate it. A manager who assigns story points, or turns them into hours to set deadlines, defeats the purpose.

## Velocity and capacity

@source PMBOK 8, Guide section 5, Velocity; Practice Standard for Project Estimating, 2.6.2; Agile Practice Guide, 5.2.3; Agile Practice Guide, 5.5.1

- **Velocity** is the rate at which deliverables are **produced, validated and accepted** in a set interval, usually the sum of story points of the **accepted** stories in one iteration.
- It **normalizes over several iterations**, so the team plans from its **average** of recent iterations, not from one good or bad iteration.
- **Capacity** changes: holidays, vacations or absences lower it, and the team then **plans only for the reduced capacity**.
- Velocity is **specific to each team** and cannot be used to compare teams.

> **Edition note.** The Agile Practice Guide, Second Edition, warns against **misusing velocity**: comparing or ranking people, treating points as interchangeable across teams, or making velocity a **target** (teams then inflate estimates or cut quality). It no longer recommends tracking velocity outside the team or using it to set delivery targets. It suggests **flow metrics** instead (below).

## Release forecasting

@source PMBOK 8, Guide section 5, Agile release planning; Practice Standard for Project Estimating, 2.6.2; Agile Practice Guide, 5.2.3

The team forecasts from its own history:

**Iterations needed = remaining story points ÷ average velocity** (rounded up).

**Example.** The release backlog holds 240 points. The last three iterations delivered 28, 32 and 30 points, an average of (28 + 32 + 30) / 3 = 30. Iterations needed: 240 / 30 = 8. With two-week iterations, that is about 16 weeks.

- If a team member will be away for one iteration, plan that iteration at **reduced capacity** and move the forecast.
- When the product owner **adds** scope, the forecast moves out; the **burnup** chart shows this clearly.
- Agile teams plan a little, deliver, learn and **replan** in an ongoing cycle.

## Iteration planning and daily coordination

@source Practice Standard for Scheduling, 2.6; Agile Practice Guide, 5.2.3; Agile Practice Guide, 5.2.4; Agile Practice Guide, 5.2.2

- **Iterations** last **1 to 4 weeks** and keep the same length to set a **cadence**.
- In **iteration planning**, held on the first day, the whole team agrees which features it can complete and the tasks for them. If the work does not fit, **lower-priority** features go **back to the product backlog** until the team can commit.
- **Backlog refinement** prepares upcoming stories, often in the middle of the iteration; a common goal is **no more than 1 hour a week**.
- The **daily coordination meeting** is **timeboxed to 15 minutes**. In iteration-based agile: what I completed, what I will complete, my impediments. In flow-based agile, the team walks the board **from right to left**, looking for blockers to flow.
- Progress is shown on **information boards**: the task board (to do, in progress, done), burndown and burnup charts.

## Tracking progress: burn charts and flow metrics

@source PMBOK 8, Guide section 5, Burndown chart; PMBOK 8, Guide section 5, Burnup chart; PMBOK 8, Guide section 5, Iteration burndown chart; Agile Practice Guide, 5.5.2; Agile Practice Guide, 5.5

| Chart | What it shows |
|---|---|
| **Burndown** | Work **remaining** against the time left in a timebox |
| **Iteration burndown** | Remaining work against an **ideal** line from the iteration's commitment; a **trend line** forecasts the finish so the team can act during the iteration |
| **Burnup** | Work **completed** rising toward a total-scope line at the top; a **change in scope** shows as the top line moving |

| Flow metric | What it shows |
|---|---|
| **Throughput** | Items finished per time period; stable throughput allows statistical forecasts |
| **Cycle time** | Time from when work on an item **starts** until it is finished |
| **Lead time** | Time from when an item is **requested** until it is delivered |
| **Work in process (WIP)** | Items being worked on now; limiting it exposes bottlenecks |
| **Queue length** | Items waiting in each state; growing queues signal bottlenecks |

These can be plotted on a **cumulative flow diagram**. **Empirical** measures (finished features) beat **surrogate** ones (percent done): a "watermelon" project is green outside and red inside.

## Kanban and flow-based scheduling

@source PMBOK 8, Guide section 5, Visual controls; Practice Standard for Scheduling, 2.6; PMBOK 8, Guide 2.3.3.6

- **Scrum** limits the **time** for a set of work (the sprint); **Kanban** limits the **amount of work** in each state (WIP limits).
- A **scrum board** is cleared after each iteration; a **kanban board** keeps flowing, with new items added as needed.
- When a column nears its WIP limit, the team **swarms** to finish work before starting more.
- Kanban has no iterations; forecasts come from **throughput** and **cycle time**.

## Agile schedules in a hybrid project

@source PMBOK 8, Guide 2.3.3.1; PMBOK 8, Guide 2.3.2.3; PMBOK 8, Guide section 5, Earned value (EV) analysis

- The **predictive** high-level schedule sets the milestones; agile streams plan **releases and iterations** inside them.
- **Monitor and Control Schedule** in agile compares work **delivered and accepted** with the estimate, reprioritizes the backlog and measures velocity.
- Story points can feed **earned value**: PV is the points planned to a date, EV the points done, AC the team's cost (module 2.10).

## Predictive and agile

@source PMBOK 8, Guide 2.3.3.1; Practice Standard for Project Estimating, 4.3; PMBOK 8, Guide section 5, Agile release planning

| | Predictive | Agile |
|---|---|---|
| Unit of estimate | Hours, days, cost | Story points, T-shirt sizes |
| Who estimates | Those most familiar with the work, often per activity | The whole team, together |
| Plan horizon | Whole project, baselined | Release (3 to 6 months), detailed one iteration at a time |
| Progress | Critical path, SPI | Velocity, burn charts, flow metrics |
| Change | Change control on the baseline | Backlog reprioritized; forecast moves |

## Exam tips

- Story points are relative and team-specific; never compare teams by velocity.
- Forecast: remaining points ÷ average velocity.
- Plan the iteration to the team's real capacity, including absences.
- Burndown shows work remaining; burnup shows work done and scope changes.
- Cycle time starts when work starts; lead time starts when the request is made.
- Planning poker: reveal together, the extremes explain, re-vote.
