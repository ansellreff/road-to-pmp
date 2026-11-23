## Key points

- **Earned value management (EVM)** integrates scope, schedule and cost into the **performance measurement baseline (PMB)** and compares it with what was actually done and spent.
- Three values: **planned value (PV)**, the budget for the work scheduled; **earned value (EV)**, the budget for the work done; **actual cost (AC)**, what the work done cost. **BAC** is the total budget.
- **Variances:** CV = EV − AC, SV = EV − PV. Negative is bad. **Indices:** CPI = EV / AC, SPI = EV / PV. Below 1.0 is bad.
- **Forecasts:** EAC = BAC / CPI when current cost performance continues; EAC = AC + (BAC − EV) when the rest goes as planned. ETC = EAC − AC; VAC = BAC − EAC.
- **TCPI** = (BAC − EV) / (BAC − AC): the cost efficiency needed on the remaining work. Above 1.0 means harder.
- Compare the results with the **control thresholds**, find the **cause**, and report: data becomes **information**, then **reports** for decisions. Agile EVM uses **story points** and the release burnup.

## Earned value management and the baseline

@source PMBOK 8, Guide section 5, Earned value (EV) analysis; PMBOK 8, Guide section 4, Performance measurement baseline (PMB); The Standard for Earned Value Management, 1.3

The first enabler of Process task 9 is to **develop project metrics, analysis and reconciliation**; Process task 6 asks to **monitor financial variations**. Earned value is the main tool for both.

- **Earned value analysis** compares the performance measurement baseline with the actual schedule and cost performance.
- **EVM** integrates the **scope, schedule and cost baselines** into the **performance measurement baseline (PMB)**.
- EVM develops and monitors three values for **each work package and control account**.

| Value | Meaning | Note |
|---|---|---|
| **Planned value (PV)** | The authorized budget assigned to the **scheduled** work | Excludes management reserve; the total PV is the PMB |
| **Earned value (EV)** | The budget for the work **actually performed** | Measured without reference to actual cost |
| **Actual cost (AC)** | The cost actually incurred for the work performed | For the same period as EV |
| **Budget at completion (BAC)** | The sum of all budgets for the work | The project cost baseline |

## Measuring earned value

@source The Standard for Earned Value Management, 3.2.2.2

How EV is credited is decided **during planning, before the work starts**. A poor choice gives a misleading status.

| Method | How EV is credited | Use it for |
|---|---|---|
| **Fixed formula 0/100** | Nothing until the work is finished | Work that starts and ends **within one reporting period** |
| **Fixed formula 50/50, 25/75** | A set share at the start, the rest at the end | Work spanning **two or three** periods; may give a false sense of progress |
| **Weighted milestone** | Weighted, verifiable milestones | Longer work with clear milestones |
| **Percent complete** | An estimate of percent complete at each measurement | Needs measurable criteria, or it is subjective |
| **Physical measurement** | Measured physical progress | Work with explicit, agreed measurements |
| **Apportioned effort** | A percentage of related discrete work | Support work such as quality assurance, inspection, testing |
| **Level of effort (LOE)** | EV always equals PV | Non-measurable support work; **never** shows a schedule variance, so it can hide problems |

## Variances and indices

@source PMBOK 8, Guide Table 5-1

| Measure | Formula | Good | Bad |
|---|---|---|---|
| **Cost variance (CV)** | EV − AC | Positive: under planned cost | Negative: over planned cost |
| **Schedule variance (SV)** | EV − PV | Positive: ahead of schedule | Negative: behind schedule |
| **Cost performance index (CPI)** | EV / AC | Above 1.0: under planned cost | Below 1.0: over planned cost |
| **Schedule performance index (SPI)** | EV / PV | Above 1.0: ahead of schedule | Below 1.0: behind schedule |

**Example.** BAC is 200,000. At the status date PV is 100,000, EV is 80,000 and AC is 90,000.

- CV = 80,000 − 90,000 = −10,000: over budget.
- SV = 80,000 − 100,000 = −20,000: behind schedule.
- CPI = 80,000 / 90,000 = 0.89: each dollar spent earns 89 cents of work.
- SPI = 80,000 / 100,000 = 0.8: work is done at 80% of the planned rate.

> **Remember:** every formula starts with **EV**. A variance subtracts, an index divides.

## Forecasting: EAC, ETC, VAC and TCPI

@source PMBOK 8, Guide Table 5-1; PMBOK 8, Guide section 5, To-complete performance index (TCPI); PMBOK 8, Guide Figure 5-24

**Estimate at completion (EAC)** is the expected total cost. Choose the formula by **what you expect of the remaining work**:

| Situation | Formula |
|---|---|
| The current **CPI will continue** (typical) | EAC = BAC / CPI |
| The remaining work will go **at the planned rate** (the variance was a one-off) | EAC = AC + (BAC − EV) |
| The original plan is **no longer valid** | EAC = AC + bottom-up ETC |
| **Both CPI and SPI** influence the remaining work | EAC = AC + [(BAC − EV) / (CPI × SPI)] |

| Measure | Formula | Meaning |
|---|---|---|
| **Estimate to complete (ETC)** | EAC − AC, or a bottom-up reestimate | The cost to finish the remaining work |
| **Variance at completion (VAC)** | BAC − EAC | Negative: the project will end over budget |
| **To-complete performance index (TCPI)** | (BAC − EV) / (BAC − AC), or (BAC − EV) / (EAC − AC) | Work remaining divided by funds remaining. Above 1.0: harder to complete |

**Example, continued** (BAC 200,000; EV 80,000; AC 90,000; CPI 0.889; SPI 0.8):

- EAC, CPI continues: 200,000 / 0.889 = 225,000.
- EAC, rest at planned rate: 90,000 + (200,000 − 80,000) = 210,000.
- EAC, CPI and SPI: 90,000 + 120,000 / (0.889 × 0.8) = 258,750.
- ETC = 225,000 − 90,000 = 135,000; VAC = 200,000 − 225,000 = −25,000.
- TCPI = (200,000 − 80,000) / (200,000 − 90,000) = 1.09: the rest of the work must be done at 109% efficiency to meet the BAC.

If the BAC is clearly no longer viable, the project manager considers the forecast EAC; **once approved**, the EAC may replace the BAC in the TCPI.

## Acting on variances: thresholds and causes

@source The Standard for Earned Value Management, 4.4.1.4; The Standard for Earned Value Management, 4.4.1.5; The Standard for Earned Value Management, 4.4.4.1; PMBOK 8, Guide section 5, Variance analysis; PMBOK 8, Guide section 5, Trend analysis

The enabler: **monitor financial variations and work with the governance process**.

- **Management by exception:** EVM measures, the WBS and the **control thresholds** let managers act only where needed. Example: a CV within ±10% of EV is acceptable. Thresholds set **formal reporting**; a growing variance can be dealt with before it crosses one. A positive variance may be an **opportunity**.
- **Variance analysis** finds the **cause and degree** of the difference between baseline and actual, looking at cost, time, technical and resource variances **together**.
- **Trend analysis** forecasts from past results and warns early, in time for **preventive** action.

| | SPI < 1 (behind) | SPI > 1 (ahead) |
|---|---|---|
| **CPI < 1 (over budget)** | Underestimated? Unexpected scope complexity? | Over-resourced? Work done out of sequence? |
| **CPI > 1 (under budget)** | Under-resourced? Value engineering? | Overestimated? Scope simpler than expected? Effective risk management? |

Document each cause, list possible actions, and analyze their impact **before** deciding. Record variances, causes, actions and decisions; they improve future estimates.

## Rebaselining

@source The Standard for Earned Value Management, 4.6.3; PMBOK 8, Guide section 4, Cost baseline

- **Rebaselining** updates the PMB after **approved changes** to scope, schedule or cost. Managing against an obsolete baseline has no value.
- **Replanning** realigns the remaining schedule or budget to meet the **original** target.
- **Reprogramming** revamps the PMB, giving an **over-target baseline (OTB)** or **over-target schedule (OTS)** when the original objectives can no longer be met.
- A rebaseline changes only **future** work, **does not hide** past problems, and must be formally **approved, communicated and accepted**. Unless the causes of the variances are fixed, a new baseline will not help.

> **On the exam.** A poor CPI is not a reason to rebaseline on your own. Analyze the cause, then use change control; the baseline changes only through an approved change.

## Financial reporting and status

@source PMBOK 8, Guide section 4, Work performance data; PMBOK 8, Guide section 4, Work performance information; PMBOK 8, Guide section 4, Work performance reports; PMBOK 8, Guide 2.4.5; The Standard for Earned Value Management, 4.5.1

Enablers: **plan financial reporting** (task 6), **measure, analyze and update project metrics** and **communicate project status** (task 9).

| Stage | What it is | Example |
|---|---|---|
| **Work performance data** | Raw observations from the work | Actual costs incurred, work completed, story points completed |
| **Work performance information** | Data **compared with the plan**, so it shows a variance | "Over budget by 10,000, CPI 0.89" |
| **Work performance reports** | Information compiled for decisions and communication | Status report, dashboard |

The metrics for scope, schedule, budget and quality are **defined at the start**, in the project management plan. **Table 2-8** checks the Finance outcomes with **CV and CPI**, earned value management, trend analysis and forecasting.

## EVM in agile and hybrid projects

@source The Standard for Earned Value Management, 4.4.3.1; The Standard for Earned Value Management, 4.4.3.2; The Standard for Earned Value Management, 4.4.3.3

- Agile burndown and burnup charts **do not show cost** or a cost at completion. Agile EVM adds this to the release burnup.
- **PV** is the planned story points up to a date; **EV** is the story points of **completed** user stories; **AC** is the actual cost, usually from recorded hours. Points are converted to money at a rate per point.
- **No partial credit:** a backlog item is done (100%) when the **customer accepts** it, or not done (0%).
- Backlog changes after each iteration **re-plan** the PV, without formally rebaselining the PMB. Iteration boundaries are a natural time to calculate.

**Example.** At 3,500 per point, 390 completed points give EV = 390 × 3,500 = 1,365,000; 450 planned points give PV = 450 × 3,500 = 1,575,000. With AC 1,507,000: CPI = 1,365,000 / 1,507,000 = 0.91 and SPI = 1,365,000 / 1,575,000 = 0.87.

## Predictive and agile

@source PMBOK 8, Guide Table 5-1; The Standard for Earned Value Management, 4.4.3.2; The Standard for Earned Value Management, 4.4.3.3

| | Predictive | Agile |
|---|---|---|
| Planned value | Budget of the scheduled work packages | Planned story points × rate per point |
| Earned value | Credited by the method set in planning | Points of **accepted** stories only (0 or 100%) |
| Baseline changes | Rebaselining after approved changes | PV re-planned after each iteration from the backlog |
| Reporting | EV reports by control account | Burnup chart with EV, PV and AC |

## Exam tips

- EV first: CV = EV − AC, SV = EV − PV, CPI = EV / AC, SPI = EV / PV.
- Negative variance or an index below 1.0 is bad.
- "Current performance will continue": EAC = BAC / CPI. "A one-off problem": EAC = AC + (BAC − EV).
- TCPI above 1.0: the remaining work must be done more efficiently.
- Level of effort never shows a schedule variance.
- A variance past the threshold: find the cause, then act through change control.
