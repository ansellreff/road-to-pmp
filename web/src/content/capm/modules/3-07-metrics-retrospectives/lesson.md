## Key points

- Agile measures **finished, working product**, not "percent done". The data is **empirical**: it comes from what the team actually delivered.
- **Velocity** is the work a team completes per iteration. It is a **planning aid for that team only**, never a way to compare or judge teams.
- A **burndown chart** shows **work remaining**. A **burnup chart** shows **work completed** against the total scope.
- **Lead time** runs from the **request** to delivery. **Cycle time** runs from the **start of work** to completion. Lead time is always the longer of the two.
- A **cumulative flow diagram** shows work in each state over time and makes **bottlenecks** visible.
- **Information radiators** keep this data visible to everyone, so nobody has to ask for a status report.
- The **retrospective** is where the team improves its **process**. It is **not about blame**, and it ends with a **small number of actions**.

## Why agile measures differently

@source Agile Practice Guide, 5.5

Predictive status reports depend on the team **predicting** how much is done. A project reported as "90% done" may find missing requirements at integration and turn out to be far less complete.

| Predictive-style measure | Problem | Agile alternative |
|---|---|---|
| **Percent done** | A guess (a **surrogate** measure) | **Finished features** that work (an **empirical** measure) |
| **Traffic-light status** | Stays green until shortly before the deadline, then turns red | Regular delivery shows the real state every iteration |

A project that looks green from outside but is red inside is called a **watermelon project**.

Because an agile team delivers finished work on a regular basis, its metrics build a **track record**. That record is what makes forecasts and decisions better.

Teams may also track **qualitative** measures, for example business satisfaction with the delivered features and **team morale**.

## Velocity

@source PMBOK 8, Guide section 5, Velocity; Agile Practice Guide, 5.5.1; Agile Practice Guide, First Edition, 5.4.1

**Velocity** is the rate at which the team produces, validates and accepts deliverables in a set interval. In practice it is the **story points completed per iteration**.

Example: a team completes 18, 22 and 20 points in three iterations. Its average velocity is (18 + 22 + 20) ÷ 3 = **20 points**. With 100 points left in the backlog, about 100 ÷ 20 = **5 iterations** remain.

| Velocity is | Velocity is not |
|---|---|
| A **planning aid** for the team that produced it | A performance target |
| Based on **finished and accepted** work | A count of work started |
| Stable after a few iterations | Comparable **between teams** |

Three ways velocity is misused:

| Misuse | What goes wrong |
|---|---|
| **Comparing or ranking teams** | Creates fear, and the team stops being transparent |
| **False precision** | Story points mean different things to different teams, so they cannot be added up or compared |
| **Making it a target** | Teams inflate estimates, split work unnaturally or cut quality to hit the number |

> **Edition note.** The second edition of the Agile Practice Guide no longer recommends tracking story-point velocity outside the team, or using it to assess performance or set delivery targets. It prefers the flow metrics below. Velocity and burn charts remain in the PMBOK Guide and are still standard exam material, so learn both.

## Burndown and burnup charts

@source PMBOK 8, Guide section 5, Burndown chart; PMBOK 8, Guide section 5, Burnup chart; Agile Practice Guide, First Edition, 5.4.1

| | Burndown chart | Burnup chart |
|---|---|---|
| **Shows** | Work **remaining** versus time left in a timebox | Work **completed** toward a milestone |
| **Line moves** | **Down** toward zero | **Up** toward the total-scope line |
| **Scope change** | Hard to see: the line just stops falling or rises | **Easy to see**: the total-scope line moves |
| **Typical use** | One iteration | A release or the whole project |

**Reading a burndown chart.** An iteration holds 40 points over 10 days, so the ideal line falls 4 points a day.

| Day | Ideal remaining | Actual remaining | Reading |
|---|---|---|---|
| 0 | 40 | 40 | Start |
| 5 | 20 | 26 | Actual line is **above** the ideal: **behind** |
| 8 | 8 | 6 | Actual line is **below** the ideal: **ahead** |
| 10 | 0 | 0 | All work finished |

- Actual line **above** the ideal line: the team is **behind**.
- Actual line **below** the ideal line: the team is **ahead**.
- A **flat** actual line: nothing is being finished. Look for an impediment.

@diagram burndown-chart

**Reading a burnup chart.** There are two lines: total scope across the top, and completed work rising from zero. The gap between them is the work left. If the scope line steps up from 120 to 135 points, scope was **added**. A burndown chart would hide that.

@diagram burnup-chart

## Flow metrics

@source Agile Practice Guide, 5.5.2; Agile Practice Guide, Glossary (flow metrics)

**Flow metrics** measure how work items move through the process from arrival to completion. They show **time**, **count** and **work in process**, and need no story points.

| Metric | What it shows | Why it matters |
|---|---|---|
| **Throughput** | Number of items **finished** per time period | Stable throughput supports forecasting; a sudden drop signals a problem |
| **Cycle time** | Time from when work on an item **starts** to when it is finished | Short, predictable cycle times mean faster feedback |
| **Lead time** | Time from when the item is **requested** to when it is delivered | Shows delays across the whole system, including waiting |
| **Work in process (WIP)** | Number of items being worked on now | Limiting WIP exposes bottlenecks and reduces task switching |
| **Escaped defects and rework** | Problems found **after release**, and the effort to fix them | Indicates product quality and whether the pace is sustainable |
| **Queue length** | Number of items **waiting** in each state | Growing queues signal bottlenecks and hidden delay |

**Lead time versus cycle time.** A customer asks for a feature on 1 March. The team starts it on 11 March and delivers it on 15 March.

- **Lead time** = 1 March to 15 March = **14 days**
- **Cycle time** = 11 March to 15 March = **4 days**
- The 10 days in between were spent **waiting** in the backlog.

## The cumulative flow diagram

@source Agile Practice Guide, 5.5.2; Agile Practice Guide, 5.5.4

A **cumulative flow diagram (CFD)** plots the number of items in each state (for example to do, in process, done) over time, as stacked bands.

| What you see | What it means |
|---|---|
| **Vertical** distance between the arrival line and the done line | **Work in process** at that moment |
| **Horizontal** distance between the same two lines | Approximate **cycle time** |
| **Slope** of the done line | **Throughput** |
| A band that keeps getting **wider** | A **bottleneck**: work enters that state faster than it leaves |
| Bands rising in parallel | Smooth, steady flow |

@diagram cumulative-flow-diagram

## Measuring value and outcomes

@source Agile Practice Guide, 5.5.3

Flow metrics show how **efficiently** the team delivers. Stakeholders care about **what** was delivered and its effect.

| Outcome measure | What it tells you |
|---|---|
| **Customer satisfaction / Net Promoter Score** | How users feel; how willing they are to recommend the product |
| **Business value delivered** | Features linked to business objectives, revenue or savings |
| **Adoption and usage** | Whether released features are actually used |
| **Time to learn** | How quickly the team checks an assumption with real customer feedback |

## What the exam's guide adds on measurement

@source Agile Practice Guide, First Edition, 5.4; Agile Practice Guide, First Edition, 5.4.1; Agile Practice Guide, First Edition, Table 5-1

The lesson so far follows the second edition, which prefers flow metrics. The **2017 guide**, which the exam uses, relies more on velocity and burn charts, and it adds several points.

**Velocity** is the sum of the story point sizes of the features **actually completed** in the iteration. It can take **four to eight iterations** for a team's velocity to become stable. Once it is stable, the team can forecast:

- By velocity: 500 points remain and the team averages 50 points an iteration, so about 500 ÷ 50 = **10 iterations** remain.
- By cycle time: 30 stories remain at an average of 3 days a story, so about 30 × 3 = **90 business days** remain.

| Kind of measure | Examples | Tells the team |
|---|---|---|
| **Capacity measures** | Burnup and burndown charts | How much more work there is |
| **Predictability measures** | Lead time and cycle time | Whether the team is likely to finish on time |

**Three times for flow-based teams:**

| Measure | The 2017 guide's definition |
|---|---|
| **Lead time** | The total time to deliver an item, from when it is **added to the board** to when it is completed |
| **Cycle time** | The time required to **process** an item, from starting it to completing it |
| **Response time** | The time an item **waits** until work starts (also called reaction time) |

**Counting story points is not counting finished work.** A team that reports story points for features it has not completed measures capacity, not progress. That breaks the principle that a working product is the primary measure of progress.

**Feature charts.** A **feature burnup/burndown chart** has three lines: features complete, features remaining and total features. A rising total line shows that **requirements grew** during the project. A **product backlog burnup chart** shows completed work against the total expected at each iteration or milestone.

**Earned value in agile terms.** Earned value is based on **finished features**.

- **SPI** = completed features ÷ planned features. A team that planned 30 story points for an iteration and completed 25 has SPI = 25 ÷ 30 = **0.83**: it is working at 83% of the planned rate.
- **CPI** = earned value ÷ actual cost. With $2.2 million of features completed for $2.8 million spent, CPI = 2.2 ÷ 2.8 = **0.79**: 79 cents of value for each dollar.

**Retrospectives.** Where a team is improving slowly, the guide's advice is to capture **no more than three items** to improve at each retrospective.

## Information radiators

@source PMBOK 8, Guide section 5, Information radiators; PMBOK 8, Guide section 5, Visual controls

An **information radiator** is a **visible display** that shares information with the rest of the organization. It is also called a **big visible chart** and, in lean environments, a **visual control**.

- Placed where people **can easily see it**, not hidden in a reporting tool.
- **Easy to update**, and updated often.
- Often "**low tech, high touch**": kept by hand, not generated by software.

| Radiator | Shows |
|---|---|
| **Task board** | Work to do, in progress and done |
| **Kanban board** | Work in each state, with **WIP limits** per column |
| **Burn charts** | Work remaining or completed, and the team's velocity |

When a column on the board nears its WIP limit, team members **swarm**: they help finish the work that is slowing the flow before starting anything new.

## Using and reporting metrics

@source Agile Practice Guide, 5.5.4; Agile Practice Guide, 5.5.5

The purpose of measurement is **insight for decisions**, not judging the people who do the work.

| Guideline | Meaning |
|---|---|
| **Start small and evolve** | Use a few metrics that reveal constraints |
| **Visualize openly** | Put data on information radiators; invite questions, not judgment |
| **Review and act** | Inspect metrics in retrospectives; agree on **one experiment at a time** |
| **Drop low-value metrics** | Stop collecting data that no longer affects decisions |

**Reporting to sponsors.** Sponsors still need to know when a body of scope is likely to be finished. Give a **range with a confidence level**, for example "an 85% chance of delivering the remaining 45 stories within 10 iterations". Do **not** give a single-date commitment.

## Retrospectives

@source Agile Practice Guide, 5.2.7; PMBOK 8, Guide section 5, Retrospectives

A **retrospective** is a regularly occurring workshop in which the team explores its work and results in order to **improve both the process and the product**. The Agile Practice Guide treats it as possibly the most important agile practice.

**When to hold one:**

- At the **end of each iteration**, as a minimum
- After a release, however small
- When more than a few weeks have passed since the last one
- When the team is **stuck** and work is not flowing
- At any other milestone

**How it works:**

1. **Gather data:** both **qualitative** (how people feel) and **quantitative** (measurements).
2. **Find root causes** of what the data shows.
3. **Decide what to try:** design countermeasures and an action plan.
4. **Rank** the improvement items and **pick only as many as the team has capacity for**.
5. **Decide how to measure** each improvement, then check the result in the next period.

Rules to remember:

- It is **not about blame**. The room must be **psychologically safe**, so people can speak candidly.
- The **whole team** takes part. A facilitator from the team leads it.
- **Few actions, finished** is far better than many actions, none finished.
- Actions have **owners** and are followed up.

| Event | Looks at | Who attends | Result |
|---|---|---|---|
| **Demonstration / review** | The **product** | Team and stakeholders | Feedback; changes to the backlog |
| **Retrospective** | The **process** and how the team works | The team | Improvement actions |
| **Lessons learned session** (predictive) | The project or phase | Team and stakeholders | Updates to the lessons learned register |

A retrospective is a form of lessons learned meeting. The difference is **timing**: it happens throughout the project, so improvements help **this** project, not only the next one.

## Exam tips

- "Work **remaining**" means **burndown**. "Work **completed**" against total scope means **burnup**.
- To show that **scope was added**, choose the **burnup** chart.
- Burndown line **above** the ideal line: **behind** schedule.
- **Lead time** starts at the **request**. **Cycle time** starts when **work begins**.
- A **widening band** on a cumulative flow diagram is a **bottleneck**.
- A manager wants to compare two teams by velocity: explain that **velocity is team-specific** and cannot be compared.
- A stakeholder asks for status: point to the **information radiator**.
- The team keeps repeating the same problem: raise it at the **retrospective**.
- Retrospective = **process**, team only. Review / demonstration = **product**, with stakeholders.
- The retrospective is held **after** the review, at the end of the iteration.

---

*Source: Agile Practice Guide, Second Edition, sections 5.2.7 and 5.5 to 5.5.5 and its glossary; PMBOK Guide, Eighth Edition, the section 5 entries on burndown chart, burnup chart, velocity, information radiators, visual controls and retrospectives. Burndown and burnup charts with a planned line, and velocity as a planning aid, are also described in the Agile Practice Guide, First Edition, section 5.4.1. The burndown and burnup comparison table, the reading rules for the ideal line, the worked numbers, the lead time example, the event comparison table and the order of review then retrospective follow standard PMI teaching or are my own. Written in original wording for personal study.*
