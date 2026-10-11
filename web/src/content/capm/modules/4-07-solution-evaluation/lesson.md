## Key points

- **Solution evaluation** checks whether a solution **does what was wanted** and **delivers the business value** expected.
- It has **four processes**: evaluate solution performance, determine the solution evaluation approach, evaluate acceptance results and address defects, obtain solution acceptance for release.
- **Plan evaluation early.** If the data needed is not designed in from the start, it may be costly or impossible to get later.
- **Testers** decide pass or fail. The **business analyst** analyzes the failures: how serious, why, and what to do.
- A **release decision** is **go, go in part, delay, or no-go**. It rests on four things: acceptable results, organizational readiness, completed transition activities, and accepted remaining risks.
- **Business value** is usually measured **after release**, by comparing performance data with a **baseline**.
- Accountable stakeholders **make** the release decision. The business analyst **facilitates** it.

## What solution evaluation is

@source PMI Guide to Business Analysis, Key Concepts for Solution Evaluation; PMI Guide to Business Analysis, Table 1-2

**Solution evaluation** activities assess **whether a solution has achieved the desired business results**. They compare actual results with the expected values set by the **acceptance criteria**, and over the long term they check whether the **expected business value** was achieved.

| # | Process | Main output | Process group |
|---|---|---|---|
| 1 | **Evaluate Solution Performance** | Assessment of business value | Defining and Aligning |
| 2 | **Determine Solution Evaluation Approach** | Solution evaluation approach | Planning |
| 3 | **Evaluate Acceptance Results and Address Defects** | Evaluated acceptance results | Executing |
| 4 | **Obtain Solution Acceptance for Release** | Release decision | Releasing |

The numbering follows PMI's guide, not the order in time. In time, the **approach** comes first, then acceptance results, then the release decision, and **performance** is evaluated after release.

**When evaluation happens:**

| When | Purpose |
|---|---|
| Whenever a **go/no-go or release decision** is needed | Is this solution, or this part of it, acceptable? |
| **Shortly after** going into operation, for example after a warranty period | Is it working as expected in real use? |
| **Well after** going into operation | Were the business goals met? Is the value still being delivered? |

**What evaluation can lead to:**

- **New or changed requirements**, and so refinement or a new solution
- A **go/no-go** decision
- A decision to **stop early**: the point of **diminishing returns**, where more functionality would not justify the effort, so the money goes to more valuable work
- Recommendations to **improve, replace or phase out** the product

## Determine Solution Evaluation Approach

@source PMI Guide to Business Analysis, 9.2; PMI Guide to Business Analysis, 9.2.3.1

The process of determining **which aspects** of the solution will be evaluated, **how** and **when** performance will be measured, and **by whom**.

The approach covers:

- **when and how often** to evaluate
- which **techniques** to use
- how results will be **analyzed and reported**
- how progress will be **communicated**
- which **metrics** to use and how they tie to the business goals

A **metric** is a set of quantifiable measures used to evaluate a solution or business.

| Kind of metric | Used |
|---|---|
| **Acceptance metrics** | During or shortly after development. **Acceptance criteria** set the acceptable range. |
| **Business value metrics** | Later, to see whether the value was delivered |

A **key performance indicator (KPI)** is a metric, usually set by executives, for judging progress toward the organization's goals. An existing KPI is worth reusing, because it is already being measured.

Questions to settle for each metric:

1. What data will be collected, **when** and **how often**?
2. **Who** collects and reports it?
3. Is there already a way to collect it? If not, what must be built, and **who pays**?

**Define the approach as early as possible.** Some metrics need information the product would not otherwise capture. Left late, that information is **expensive or impossible** to obtain. If a metric costs too much, choose the **next-best alternative**.

| | Predictive | Adaptive |
|---|---|---|
| **Form** | Defined in planning, before acceptance criteria; part of the business analysis plan | Not a separate deliverable. Considered in initial planning and when writing acceptance criteria and the **definition of done**. |

## Evaluate Acceptance Results and Address Defects

@source PMI Guide to Business Analysis, 9.3; PMI Guide to Business Analysis, 9.3.3.1

The process of **deciding what to do** with the results of comparing the acceptance criteria against the solution. Its benefit: an **informed decision** on whether to release and whether to make changes.

**Who does what:**

| | Testing (quality control) | Business analysis |
|---|---|---|
| **Does** | Runs the tests; reports **pass or fail** against the acceptance criteria | Works out what the results **mean** |
| **Output** | **Actual acceptance results** | **Evaluated acceptance results** |

For each failure, business analysis considers:

1. its **magnitude and severity**
2. its **root cause**
3. the **risks** attached to it
4. the **cost** of fixing it
5. the **business impact** of fixing it, working around it, or releasing with it

**Possible recommendations for a defect:**

| Recommendation | Meaning |
|---|---|
| **A workaround** | A change in business practice or use that avoids the defect without side effects |
| **A modification to the product** | May need a **change request** |
| **An adjustment to the measurement** | The result was measured wrongly, or the wrong thing was measured |
| **Technical investigation** | The cause is not yet known |
| **Communication to users** | Explain how the product is meant to be used |

Tests that feed this process: exploratory and **user acceptance tests**, **day-in-the-life** tests, pre-production tests, scenario tests and tests of nonfunctional requirements.

| Technique | Use here |
|---|---|
| **Root cause analysis** | Why did the result miss the criterion? |
| **Variance analysis** | How large is the gap between expected and actual, and what caused it? |
| **Traceability matrix** | Which business objective does the failed feature trace to? A defect in a feature tied to a **high-priority objective** matters most. |
| **Prioritization schemes** | Rank defects by severity, how likely a user is to meet them, and the impact of not fixing them |

| | Predictive | Adaptive |
|---|---|---|
| **Scope** | A release or the whole product | A **slice**, at the end of each iteration |
| **How** | Documented results with change requests | At the **demonstration**: stakeholders give feedback, and defects go into the **backlog** to be prioritized |
| **A story that fails its criteria** | Raised as a defect | The **whole story can be rejected** and returned to the backlog |

## Obtain Solution Acceptance for Release

@source PMI Guide to Business Analysis, 9.4; PMI Guide to Business Analysis, 9.4.3.1; Business Analysis for Practitioners, Facilitate Go/No-Go Decision

The process of **facilitating a decision** on whether to release all or part of a solution, and of **handing over knowledge** about the product, its risks, known issues and workarounds. Its benefit: an **agreed break** between building the solution and releasing it.

**A release decision rests on four things:**

| Basis | Evidence |
|---|---|
| **The solution is acceptable** | Evaluated acceptance results |
| **The organization is ready** | Readiness assessment |
| **Transition activities are complete** | Transition plan checklist, including coordination with other releases |
| **Remaining risks and workarounds are accepted** | Product risk analysis |

**Possible decisions:**

| Decision | Meaning |
|---|---|
| **Release** (go) | The whole solution is released |
| **Partial release** | Part is released; the rest waits |
| **Delay** | Not yet: something must be finished or fixed first |
| **Disapprove** (no-go) | The release is prevented |

- The **accountable stakeholders** decide. The stakeholder engagement approach says **who** and **how**.
- The business analyst **facilitates**, ideally in a **facilitated workshop**, so everyone hears the reasoning.
- Give decision makers a **summary**: acceptance results, remaining product and readiness risks, unfinished transition activities, and **gaps between the approved requirements and what was built**.
- In many organizations the **project manager** is accountable for obtaining the sign-off.
- Product risks not dealt with during the project may be **handed to the operational team**.

A **warranty period** is a time after release during which the **development team** remains responsible for fixing defects. Handover to operations waits until it ends.

"**Release**" can mean release to **production** while the team still owns the solution, or release to the **operational area** that takes it over.

| | Predictive | Adaptive |
|---|---|---|
| **When** | Usually at the **end**, just before release or after the warranty period | **Informal** acceptance at the end of each iteration; formal sign-off, if needed, before each production release |
| **How** | A formal meeting, perhaps within release management | Often the **product owner's verbal approval** at the demonstration that the work meets the **definition of done** |

## Evaluate Solution Performance

@source PMI Guide to Business Analysis, 9.1; PMI Guide to Business Analysis, 9.1.1.4; PMI Guide to Business Analysis, 9.1.3.1; Business Analysis for Practitioners, Figure 7-11

The process of evaluating a solution **in operation** to determine whether it is **delivering the business value intended**. It gives **tangible data** on whether the investment is paying off.

- It usually happens **after release**, so it mostly belongs to **portfolio and program** work, not the project.
- The business case is the reference: it states the **expected benefits**.

**Performance data** is a quantified output of the product: throughput, cost reduction, number of users, revenue, sales volume, customer satisfaction.

> **Business value = performance after release − the baseline before release**

| Situation | What to do |
|---|---|
| A baseline exists | Compare before and after |
| No baseline | Estimate the original baseline, or let the after-release figures stand for the value |
| The objective cannot be measured directly | Use a **proxy**: task duration, response time, error counts |
| The benefit is **intangible** | Define a measure that gives **indirect evidence** |

**Typical reasons value is missed:**

- **Technical** causes
- **Business practices** or constraints
- **Resistance** to the product or to how it is meant to be used
- **Workarounds** users invent to get round real or imagined limitations

**Observation** is the best way to find workarounds: long-standing users forget to mention them in interviews.

The output, the **assessment of business value**, compares expected with actual value and gives the reasons. It feeds one of four decisions about the product: **enhance, maintain, replace or discontinue**. It may also start a **new needs assessment**, which closes the loop.

| Technique | Use |
|---|---|
| **Cost-benefit analysis** | Compare actual with expected costs and benefits |
| **Root cause and opportunity analysis** | Why value fell short, or exceeded expectations |
| **Elicitation techniques** | Workshops, focus groups, interviews, observation |
| **Product portfolio matrix** | See below |

**Product portfolio matrix** (growth-share matrix): products placed by **market growth** and **market share**.

| | **High market share** | **Low market share** |
|---|---|---|
| **High market growth** | The most beneficial products (stars) | Good potential (question marks) |
| **Low market growth** | A dependable income stream (cash cows) | Weak products (dogs) |

## Readiness and the go/no-go decision in the practice guide

@source Business Analysis for Practitioners, Figure 7-16; Business Analysis for Practitioners, How to Facilitate Go/No-Go Decision; Business Analysis for Practitioners, How to Enable Organizational Transition; Business Analysis for Practitioners, Value of Facilitating Go/No-Go Decision; Business Analysis for Practitioners, How to Evaluate Solution Performance

A **readiness assessment** checks whether the organization is ready to move the solution into production or into maintenance and operations. It may be a report or a checklist, and may be repeated. Gaps it finds are treated as **risks**, with responses. Five kinds of readiness:

| Readiness | The question |
|---|---|
| **People** | Have people been trained, and can they use the solution? |
| **Data** | Has the data been validated? |
| **Production environment** | Are the hardware and software installed, tested and secure? |
| **Transition and production support** | Are operations and support ready to answer questions? Are release notes, workarounds and contingency plans in place? |
| **Cultural** | Is the culture supportive of the change? Are champions engaged? |

**The go/no-go decision:**

- A **go** permits the release of the solution, **in whole or in part**. A **no-go** either **delays** or **disapproves** the release.
- The way the decision will be reached (the **decision model**) should be agreed **beforehand**.
- Make the meeting as interactive as possible, show the evaluation results in tables or pictures, and let stakeholders ask their questions before the decision.

**More from the practice guide on transition and evaluation:**

- **Transition requirements** describe **temporary** capabilities needed to move from the current state: data conversion, training, operational changes.
- The **transition approach** has three parts: a **transition plan** (the tasks to finish before the go-live date, with dates and resources), a **transition strategy** and a **readiness assessment plan** (what will be measured, how, and who is responsible).
- Its strategies are a **massive one-time cutover**, a **segmented cutover** (by region, role or function, with the old and new coexisting for a time) and a **timeboxed coexistence**. Reasons to segment: many or complex transition requirements, several sites, urgency from compliance, or earlier delivery of value. "Segmented cutover" is the practice guide's name for the staged release.
- **Go fever** is the pull to launch regardless: people become over-committed to a course already chosen because of the time and money spent, even when the benefit is small or the risk large. A proper go/no-go decision guards against it.
- A **formal sign-off** is usual where the impact is enterprise-wide, where failure could cost life, property or solvency, in strictly predictive organizations, and in heavily regulated industries.
- When a solution **misses its expected value**, the typical reasons are technical causes, business practices or constraints, **resistance** to the product or to the way it is meant to be used, and **workarounds** that users invent to get round its limits. When the value is **above** what was expected, that is treated as an **opportunity** to build on.

## How it all connects

@source PMI Guide to Business Analysis, 1.3.3; PMI Guide to Business Analysis, 9.1.3.1

| Earlier work | Used in solution evaluation |
|---|---|
| **Business case** and business objectives (needs assessment) | The value to measure against |
| **Acceptance criteria** and definition of done (analysis) | The conditions the tests check |
| **Approved requirements** (traceability and monitoring) | The baseline for "what was approved versus what was built" |
| **Product risk analysis** (analysis) | The remaining risks to accept |
| **Readiness assessment** and **transition plan** (stakeholder engagement) | Is the organization ready? |
| **Traceability matrix** | Which objective each defect threatens |

Solution evaluation ends one cycle and can begin the next: its findings may trigger a new **needs assessment**.

## Exam tips

- **Pass or fail** is the tester's job. **Why, how serious, and what to do** is business analysis.
- A defect is found before release: analyze its **severity, cause and business impact**, then **recommend**. Do not decide alone.
- Who makes the release decision? The **accountable stakeholders**. The analyst **facilitates**.
- Four bases for a go decision: **acceptable results, readiness, transition complete, risks accepted**.
- "Is the organization ready?" uses the **readiness assessment**.
- Business value is measured **after release**, against a **baseline**. No baseline, no comparison: plan it early.
- Cannot measure the benefit directly: use a **proxy** or a **leading indicator**.
- Users are bypassing a feature: use **observation** to find the workaround.
- On an agile project, acceptance happens at the **demonstration**, against the **definition of done**, by the **product owner**.
- A story that fails its acceptance criteria goes **back to the backlog**.
- **Warranty period**: the development team still fixes defects.
- Evaluation showing little further value to gain may justify **ending early**.

---

*Source: The PMI Guide to Business Analysis, section 9 (Solution Evaluation), sections 9.1 to 9.4, and Table 1-2 for the process groups; Business Analysis for Practitioners: A Practice Guide, Second Edition, "Facilitate Go/No-Go Decision". The order "in time", the "go" and "no-go" labels on the four release decisions, the names stars, question marks, cash cows and dogs (the guide describes the quadrants without naming them and does not describe the fourth), the "how it all connects" table, the business value formula, and the flashcard definition of a day-in-the-life test (the guide names the test without defining it) follow standard PMI teaching or are my own. Written in original wording for personal study.*
