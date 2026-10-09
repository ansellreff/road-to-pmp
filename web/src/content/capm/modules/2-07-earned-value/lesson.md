## Key points

- Earned value management compares three numbers: **planned value (PV)**, **earned value (EV)** and **actual cost (AC)**.
- **EV always comes first** in the formulas: CV = **EV** − AC, SV = **EV** − PV, CPI = **EV** ÷ AC, SPI = **EV** ÷ PV.
- **Negative variance is bad. Index below 1.0 is bad.** Positive variance and an index above 1.0 are good.
- **Cost** formulas use **AC**. **Schedule** formulas use **PV**.
- **EAC = BAC ÷ CPI** is the most common forecast of the final cost.
- **TCPI** is the cost efficiency needed on the remaining work. **Above 1.0 means harder** to achieve.

## What earned value management is

@source PMBOK 8, Guide section 5, Earned value (EV) analysis; The Standard for Earned Value Management, 1.3.4

Knowing how much has been spent does not tell you how the project is doing. Spending half the budget is good news if 60% of the work is done and bad news if 30% is done.

**Earned value management (EVM)** integrates the **scope**, **schedule** and **cost** baselines into the **performance measurement baseline (PMB)** and compares it with actual performance. Everything is expressed in **money**, including schedule.

| Abbreviation | Name | Question it answers |
|---|---|---|
| **BAC** | Budget at completion | What is the total budget for the work? |
| **PV** | Planned value | How much work **should** be done by now? |
| **EV** | Earned value | How much work **is** done, valued at its budget? |
| **AC** | Actual cost | How much has the completed work **actually cost**? |

- **PV** is the authorized budget assigned to the scheduled work. It does **not include management reserve**. The total PV equals the BAC.
- **EV** is the budget of the work actually completed. It can never be more than the budget for that work.
- **AC** has no upper limit. Whatever was spent to achieve the EV is counted.
- A quick way to find EV: **EV = percent complete × BAC**.

## The example used in this lesson

@source PMBOK 8, Guide Table 5-1

A project builds **10 km of road in 10 weeks** for **$100,000**: $10,000 and one week per kilometer.

At the end of **week 4**, **3 km** are finished and **$36,000** has been spent.

| Value | How | Amount |
|---|---|---|
| **BAC** | Total budget | $100,000 |
| **PV** | 4 km should be done: 4 × $10,000 | $40,000 |
| **EV** | 3 km are done: 3 × $10,000 | $30,000 |
| **AC** | Money spent | $36,000 |

## Variances: CV and SV

@source PMBOK 8, Guide Table 5-1; The Standard for Earned Value Management, 4.4.1.1; The Standard for Earned Value Management, 4.4.1.2

| Formula | Example | Meaning |
|---|---|---|
| **Cost variance: CV = EV − AC** | 30,000 − 36,000 = **−$6,000** | Negative = **over budget**. Positive = under budget. |
| **Schedule variance: SV = EV − PV** | 30,000 − 40,000 = **−$10,000** | Negative = **behind schedule**. Positive = ahead of schedule. |

The road project has done $30,000 worth of work for $36,000, and is $10,000 worth of work behind plan.

- Zero means exactly on plan.
- Schedule variance is measured in **money**, not in days.
- At the end of a project **SV is always zero**, because all planned work has been earned (EV = PV = BAC), even if the project finished late.

## Indices: CPI and SPI

@source PMBOK 8, Guide Table 5-1; The Standard for Earned Value Management, 4.4.1.3

| Formula | Example | Meaning |
|---|---|---|
| **Cost performance index: CPI = EV ÷ AC** | 30,000 ÷ 36,000 = **0.83** | Below 1.0 = **over budget**. Above 1.0 = under budget. |
| **Schedule performance index: SPI = EV ÷ PV** | 30,000 ÷ 40,000 = **0.75** | Below 1.0 = **behind schedule**. Above 1.0 = ahead of schedule. |

How to read them:

- **CPI 0.83:** for every $1 spent, the project gets only **83 cents** of work.
- **SPI 0.75:** the project is progressing at **75%** of the planned rate.
- An index of exactly 1.0 means on plan.
- Variances give an **amount**; indices give a **ratio**, which lets you compare projects of different sizes.

| | Under 1.0 | Exactly 1.0 | Over 1.0 |
|---|---|---|---|
| **CPI** | Over budget | On budget | Under budget |
| **SPI** | Behind schedule | On schedule | Ahead of schedule |

## Forecasting: EAC, ETC and VAC

@source PMBOK 8, Guide Table 5-1

| Abbreviation | Name | Question it answers |
|---|---|---|
| **EAC** | Estimate at completion | What do we now expect the **whole project** to cost? |
| **ETC** | Estimate to complete | How much **more** will it cost from now? |
| **VAC** | Variance at completion | How much over or under budget will we **finish**? |

There are several EAC formulas. The right one depends on what is assumed about the future:

| Assumption | Formula | Example |
|---|---|---|
| Current cost performance will **continue** (the most common) | **EAC = BAC ÷ CPI** | 100,000 ÷ 0.8333 = **$120,000** |
| The variance was a **one-time event**; remaining work goes as planned | **EAC = AC + (BAC − EV)** | 36,000 + 70,000 = **$106,000** |
| The original plan is **no longer valid** | **EAC = AC + bottom-up ETC** | 36,000 + a new estimate of the remaining work |
| Both cost **and schedule** performance affect the remaining work | **EAC = AC + (BAC − EV) ÷ (CPI × SPI)** | 36,000 + 70,000 ÷ (0.8333 × 0.75) = **$148,000** |

Then, using EAC = $120,000:

| Formula | Example | Meaning |
|---|---|---|
| **ETC = EAC − AC** | 120,000 − 36,000 = **$84,000** | Still to be spent |
| **VAC = BAC − EAC** | 100,000 − 120,000 = **−$20,000** | Negative = expected to finish **over budget** |

If a question gives no hint about the assumption, use **EAC = BAC ÷ CPI**.

## To-complete performance index (TCPI)

@source PMBOK 8, Guide section 5, To-complete performance index (TCPI); PMBOK 8, Guide Figure 5-24

**TCPI** is the cost efficiency that must be achieved on the **remaining work** to meet a goal. It is **work remaining ÷ funds remaining**.

| Goal | Formula | Example |
|---|---|---|
| Finish within the original budget (**BAC**) | **TCPI = (BAC − EV) ÷ (BAC − AC)** | 70,000 ÷ 64,000 = **1.09** |
| Finish within a new approved forecast (**EAC**) | TCPI = (BAC − EV) ÷ (EAC − AC) | 70,000 ÷ 84,000 = 0.83 |

- TCPI of **1.09** means every remaining $1 must produce **$1.09** of work. The team has been producing 83 cents, so meeting the original budget is unlikely.
- **Above 1.0 = harder** to complete within the goal. **Below 1.0 = easier.** This is the opposite direction from CPI.
- If the BAC is clearly no longer achievable, the project manager forecasts an EAC. Once **approved**, the EAC replaces the BAC in the calculation.

## How earned value is credited

@source The Standard for Earned Value Management, 3.2.2.2

To calculate EV, the team must agree in advance how unfinished work is counted. These rules are set in planning.

| Method | How EV is credited | Used for |
|---|---|---|
| **0/100** | Nothing until the work is **finished**, then 100% | Short work that starts and ends within one reporting period |
| **50/50** (also 25/75 and similar) | A fixed share when the work **starts**, the rest when it finishes | Work that spans two or three reporting periods |
| **Weighted milestone** | A set share at each milestone reached | Longer work with clear, verifiable milestones |
| **Percent complete** | An estimate of the percentage done | Longer work; needs measurable criteria, or it becomes subjective |
| **Apportioned effort** | In proportion to the work it supports | Supporting work such as inspection and testing |
| **Level of effort (LOE)** | With the passage of time | Work that cannot be measured, such as project management. Keep to a minimum. |

**Example.** A $2,000 work package is half finished. With the **0/100** rule EV = **$0**. With the **50/50** rule EV = **$1,000**.

## Earned value in adaptive projects

@source PMBOK 8, Guide section 5, Earned value (EV) analysis

The same idea works with **story points**:

- **PV** = story points planned to be done by the end of the iteration.
- **EV** = story points of the user stories that are actually **done**.
- **AC** = cost of the team for the iteration.

Adaptive teams usually show the same information with **burndown** and **burnup charts**.

## Formula sheet

@source PMBOK 8, Guide Table 5-1

| Formula | Good result |
|---|---|
| **CV = EV − AC** | Positive |
| **SV = EV − PV** | Positive |
| **CPI = EV ÷ AC** | Above 1.0 |
| **SPI = EV ÷ PV** | Above 1.0 |
| **EAC = BAC ÷ CPI** | Lower than BAC |
| **ETC = EAC − AC** | |
| **VAC = BAC − EAC** | Positive |
| **TCPI = (BAC − EV) ÷ (BAC − AC)** | **Below** 1.0 |

## Exam tips

- **EV is first in every variance and index formula.** If you remember that, you only need to remember what comes second: AC for cost, PV for schedule.
- Negative or below 1.0 is **bad**, with one exception: **TCPI** above 1.0 is bad.
- Work out **EV = percent complete × BAC** first when a question gives a percentage.
- "How is the project doing?" Check both: CPI for cost **and** SPI for schedule. A project can be under budget and behind schedule at the same time.
- "What is the project expected to cost?" is **EAC**. "How much more?" is **ETC**. "How far over or under at the end?" is **VAC**.
- EAC larger than BAC means the project is forecast to **overrun**.
- **PV** is sometimes called BCWS, **EV** BCWP and **AC** ACWP in older material.
- Round only at the end. Use the unrounded CPI when calculating EAC.

---

*Source: PMBOK Guide, Eighth Edition, the Guide section 5 (earned value analysis, to-complete performance index and Table 5-1); The Standard for Earned Value Management, sections 1.3.4, 3.2.2.2 and 4.4.1 (terminology, rules for crediting earned value, variances and indices). The road example is my own. The older abbreviations BCWS, BCWP and ACWP follow standard PMI teaching. Written in original wording for personal study.*
