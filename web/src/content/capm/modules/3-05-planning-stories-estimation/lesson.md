## Key points

- Agile planning happens at several levels: **vision → roadmap → release → iteration → day**. Detail is added only when it is needed.
- A **user story** is a short description of an outcome for a specific user, and a **promise for a conversation**.
- Story format: **As a** (role), **I want** (goal), **so that** (benefit).
- Good stories follow **INVEST**: independent, negotiable, valuable, estimable, small, testable.
- **Story points** estimate **relative** effort, not hours. Teams compare items with each other.
- **Velocity** is how much the team completes per iteration. It is used to **forecast**, and it belongs to **one team only**.
- A **spike** is a timeboxed piece of research to answer a question or reduce a risk.

## Planning at several levels

@source PMBOK 8, Guide section 5, Agile release planning; Agile Practice Guide, 5.2.3

Agile teams **plan a little, deliver, learn, and replan**. They do not plan the whole project in detail at the start. Plans exist at several levels, each more detailed and shorter-range than the one above:

| Level | Answers | Time horizon | Who leads |
|---|---|---|---|
| **Product vision** | Why are we building this, and for whom? | The life of the product | Product owner |
| **Product roadmap** | In what order will major capabilities arrive? | Months to years | Product owner |
| **Release plan** | Which features are in the next release, and how many iterations will it take? | Typically **3 to 6 months** | Product owner and team |
| **Iteration plan** | Which stories will we finish in this iteration, and what tasks do they need? | 1 to 4 weeks | The team |
| **Daily plan** | What will we do today? | One day | The team |

- **Release planning** gives a high-level timeline based on the roadmap and the vision, and sets the **number of iterations** in the release.
- Because features carry value for the customer, a release plan that shows **which features are ready after each iteration** is easy for stakeholders to understand.
- This is **rolling wave planning**, or **progressive elaboration**: near-term work in detail, later work in outline.

## The product backlog and its items

@source PMBOK 8, Guide section 4, Backlog; Agile Practice Guide, 5.2.1; PMBOK 8, Guide section 5, Backlog refinement

The **backlog** is an **ordered list of the work to be done**, often written as user stories and prioritized by the business. It reflects current needs and is **re-prioritized** as things change.

| Item | Size | Example for an online shop |
|---|---|---|
| **Epic** | A large body of work, too big for one iteration | "Customers can pay online" |
| **Feature** | A capability that delivers value; a group of related stories | "Pay by credit card" |
| **User story** | Small enough to finish within one iteration | "As a shopper, I want to save my card so that I can pay faster next time" |
| **Task** | A piece of work needed to complete a story, usually hours | "Add the card field to the form" |

- Items near the **top** are small, clear and estimated. Items further down are large and vague.
- Not everything needs to be written before work begins: enough to see the first release in outline, and enough detail for the **next iteration**.
- **Backlog refinement** is the ongoing work of reviewing, revising, ranking and splitting backlog items to get them ready.
- **Story mapping** arranges stories visually to show the sets of high-value features over time, reveal gaps in the backlog and plan releases.

## User stories

@source PMBOK 8, Guide section 4, User stories; Agile Practice Guide, Glossary (user story); PMI Guide to Business Analysis, 7.3.2.9

A **user story** is a brief description of an **outcome for a specific user**. It is a **promise for a conversation** to clarify the details, not a complete specification.

**Format:**

> **As a** (role), **I want** (goal), **so that** (benefit).

Example: "**As a** frequent traveler, **I want** to store my passport details **so that** I do not retype them for every booking."

| Part | Tells you |
|---|---|
| **Role** | Who benefits |
| **Goal** | What they need to accomplish |
| **Benefit** | Why it matters: the value |

**The three Cs:**

| C | Meaning |
|---|---|
| **Card** | The story is short enough to fit on an index card |
| **Conversation** | The details are worked out by talking, between the team and the product owner |
| **Confirmation** | **Acceptance criteria** say how to tell the story is done |

**Acceptance criteria** are the specific conditions a story must meet to be accepted. Example for the passport story: "Details are saved only after the traveler confirms"; "Saved details can be deleted".

## What makes a good story: INVEST

@source PMBOK 8, Guide section 4, User stories; Agile Practice Guide, Glossary (definition of ready); PMI Guide to Business Analysis, 7.5.2.1

INVEST is a widely taught checklist for stories. PMI describes it in The PMI Guide to Business Analysis as the main way to check that a story is good and ready for development.

| Letter | Meaning | Why |
|---|---|---|
| **I** | **Independent** | Can be built and delivered without waiting for another story |
| **N** | **Negotiable** | A starting point for discussion, not a fixed contract |
| **V** | **Valuable** | Delivers value to a user or the customer |
| **E** | **Estimable** | The team understands it well enough to estimate it |
| **S** | **Small** | Fits within one iteration |
| **T** | **Testable** | There is a clear way to check it is done |

- A story that is too big is **split** into smaller stories, each still valuable.
- The **definition of ready (DoR)** is a checklist showing that a story has all the information the team needs to begin work on it.
- The **definition of done (DoD)** is the checklist for when it is finished. Ready is the entrance; done is the exit.

## Relative estimating and story points

@source Practice Standard for Project Estimating, 4.3; Agile Practice Guide, Glossary (story point); PMBOK 8, Guide section 5, Agile release planning

People are better at **comparing** things than at predicting exact durations. Agile teams therefore estimate **relatively**: this story is about twice as big as that one.

A **story point** is a unit for the **relative effort** needed to implement a user story. It reflects effort, complexity and uncertainty together. It is **not** a number of hours or days.

| Technique | How it works |
|---|---|
| **Story points** | The team picks a small reference story and sizes the others against it, often using a Fibonacci-like scale: 1, 2, 3, 5, 8, 13 |
| **Planning poker** | Each member privately picks a card; all cards are revealed **together**; the highest and lowest explain; the team re-votes until it converges |
| **T-shirt sizing** | XS, S, M, L, XL. Quick, for early or large-scale sizing. |
| **Affinity grouping** | Items are placed in groups of similar size. Fast for a large number of items. |

Why relative estimating is used:

- It is **fast**, and trades some accuracy for speed.
- A non-time unit stops management from treating the estimate as a **firm delivery date**.
- The **whole team** estimates, because the whole team does the work.
- Revealing cards together avoids **anchoring** on the first number spoken.

A large gap between the numbers jumps (5, 8, 13) is deliberate: the bigger the item, the less precisely it can be judged. A very large estimate is a signal to **split** the story.

## Velocity and capacity

@source PMBOK 8, Guide section 5, Velocity; Agile Practice Guide, 5.2.3

| Term | Meaning |
|---|---|
| **Velocity** | The rate at which the team produces, validates and **accepts** deliverables in a set interval: usually **story points completed per iteration** |
| **Capacity** | How much the team can take on in the coming iteration, given who is available |

- Only **finished** stories count toward velocity. A half-done story counts as zero.
- Velocity settles after a few iterations, and is then used to **forecast**.
- Velocity belongs to **one team**. Story points differ from team to team, so **comparing the velocity of two teams is meaningless**.
- Velocity is a **planning tool**, not a performance target. Pushing a team to raise it invites inflated estimates.
- If people are on holiday, capacity drops, and the team plans less.

**Forecast example.** The remaining backlog for a release is **120 story points** and the team's average velocity is **20 points per iteration**.

| | Calculation | Result |
|---|---|---|
| Iterations needed | 120 ÷ 20 | **6 iterations** |
| With two-week iterations | 6 × 2 | **12 weeks** |

## Iteration planning

@source Agile Practice Guide, 5.2.3; Agile Practice Guide, Glossary (iteration planning); Agile Practice Guide, First Edition, 5.2.3

**Iteration planning** (sprint planning in Scrum) clarifies the backlog items, their acceptance criteria and the effort needed to meet the iteration's commitment.

1. The product owner presents the **highest-priority** items.
2. The team asks questions until it understands them.
3. The team selects as many as its **capacity** and recent **velocity** allow.
4. The team breaks the stories into **tasks**.

- The **team** decides how much it takes on. It is not told.
- Teams cannot predict with complete certainty what they will deliver, because they cannot know the unexpected. Smaller stories make progress visible and forecasts better.

## Timeboxes and spikes

@source Agile Practice Guide, Glossary (timebox); Agile Practice Guide, Glossary (spike)

A **timebox** is a short, **fixed** period in which work is to be completed. Iterations, daily meetings and reviews are all timeboxed.

- When the time is up, the work **stops**. What is not finished goes back to the backlog.
- In a timebox, **time is fixed and scope varies**, which forces the most valuable work to be done first.
- A regular rhythm of timeboxes is called a **cadence**.

A **spike** is a **timeboxed** story or task created to **research a question or resolve a problem**.

| Kind of iteration or item | Purpose |
|---|---|
| **Spike** | Research an unknown or reduce a risk before committing to the real work |
| **Iteration zero** | Set up before development starts: environment, initial backlog, team agreements |
| **Development iteration** | Build and deliver stories |
| **Hardening or release iteration** | Final stabilizing and preparing a release, if needed |

Example of a spike: "Spend two days finding out whether the payment provider's interface supports refunds."

## Iterations: units, pros and cons, and turning a WBS into a backlog

@source Agile Practice Guide, First Edition, 3.1.4; Agile Practice Guide, First Edition, 5.2.6; PMI Guide to Business Analysis, 7.3.2.7

**The logical units of iteration-based work**, from large to small:

| Unit | Holds |
|---|---|
| **Release** | Several iterations; a version that can go to users |
| **Iteration** (sprint) | A **timebox of the same length each time**, ending in working, tested features |
| **User story** | A piece of value small enough for one iteration |
| **Task** | The work the team does to finish a story |

**Pros and cons of working in iterations:**

| Advantages | Disadvantages |
|---|---|
| A regular rhythm for planning, demonstrating and improving | A story must be made small enough to fit, which is not always natural |
| Feedback at least every few weeks | Planning and review meetings take time every iteration |
| Progress is measured in finished work | Urgent work arriving mid-iteration disturbs the plan |
| Risk is exposed early | The fixed timebox can tempt a team to cut quality to "finish" |

Teams whose work arrives unpredictably often prefer **flow-based** agile: no timebox, a limit on work in process, and items pulled when there is capacity.

**Translating a WBS into an adaptive plan.** A WBS breaks the scope into deliverables; a backlog orders value for users. The usual mapping:

| Predictive | Adaptive |
|---|---|
| Project scope statement | Product vision |
| Major deliverable (upper WBS level) | **Epic** or feature |
| Work package | **User stories**, each delivering something usable |
| Activity | Task within a story |
| Fixed sequence and schedule baseline | Backlog **ordered by value**, pulled into iterations by capacity |

Two things change in the translation: items are rewritten **from the user's point of view**, and large ones are **sliced** until each fits one iteration.

## Exam tips

- The story format is **role, goal, benefit**: "As a…, I want…, so that…".
- A user story is a **promise for a conversation**, not a full requirement document.
- **INVEST**: independent, negotiable, valuable, estimable, small, testable.
- Story points are **relative** and are **not hours**. "This story is 3 points, so it takes 3 days" is wrong.
- **Never compare velocity between teams.**
- A story too large to estimate or finish in one iteration: **split it**.
- A technical unknown blocks estimation: run a **spike**.
- "Who estimates?" **The team that will do the work.** Not the product owner, not the project manager.
- Half-finished stories earn **no** velocity.
- Release planning: **3 to 6 months**, driven by the roadmap. Iteration planning: **1 to 4 weeks**, driven by the backlog.

---

*Source: PMBOK Guide, Eighth Edition, the Guide sections 4 and 5 (backlog, user stories, agile release planning, backlog refinement, velocity); Agile Practice Guide, Second Edition, sections 5.2.1 to 5.2.3 and its glossary; Practice Standard for Project Estimating, Second Edition, section 4.3 (relative estimating); The PMI Guide to Business Analysis, sections 7.3.2.9 (user story), 7.5.2.1 (INVEST) and 4.6.2.5 (epics). The five planning levels as a table, the feature and task definitions, the three Cs, the kinds of iteration, and the forecast example follow standard PMI teaching or are my own. The pros and cons of iterations and the WBS-to-backlog mapping follow standard PMI teaching; the Agile Practice Guide, First Edition, section 3.1.4 describes iteration-based and flow-based agile. Written in original wording for personal study.*
