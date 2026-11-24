## Key points

- A **risk** is an uncertain event or condition that, if it occurs, affects objectives: **threats** are negative, **opportunities** positive. Write risks as **cause, event and consequence**.
- **Overall project risk** is the effect of uncertainty on the project as a whole; if it is too high, the project may be cancelled.
- **Risk appetite** is how much uncertainty is acceptable for a reward; **risk thresholds** express it as measurable limits (for example ±5% on cost).
- The **risk management plan** sets the strategy, methods, roles, funding, timing, risk categories (often a **risk breakdown structure**), stakeholder thresholds and the **probability and impact definitions**.
- **Identify risks** iteratively, with brainstorming, checklists, interviews, root cause, assumption and constraint, SWOT and document analysis, **prompt lists** (PESTLE, TECOP, VUCA) and AI. Record them in the **risk register**.
- **Analyze**: **qualitatively** for every risk (probability and impact, the matrix, categories), and **quantitatively** when needed (Monte Carlo **simulation**, **sensitivity analysis**, **decision trees** with **EMV**).

## Risk concepts

@source PMBOK 8, Guide 2.7; PMBOK 8, Guide 2.7.1; PMBOK 8, Guide Figure 2-46

The Risk domain builds **project resilience**: the ability to anticipate, prepare for, respond to and adapt to risks and disruptions.

| Concept | Meaning |
|---|---|
| **Threat** | A risk that could harm objectives: delays, overruns, damaged reputation |
| **Opportunity** | A risk that could help objectives: market share, cost savings, a positive environmental impact |
| **Overall risk** | The effect of uncertainty on the project as a whole, including all individual risks |
| **Risk appetite** | The degree of uncertainty an organization or person will accept in anticipation of a reward |
| **Risk threshold** | Measurable acceptable variation around an objective: ±5% on cost shows a **lower** appetite than ±10% |
| **Risk exposure** | The aggregate potential impact of all risks at a point in time |
| **Resilience** | The ability to absorb impacts and recover quickly, including from **black swan** events and emergent risks |

| Classification | Meaning |
|---|---|
| **Known-known** | Facts and requirements; managed as scope, **not a risk** |
| **Known-unknown** | A classic risk: enough is known to estimate probability and impact |
| **Unknown-known** | A hidden fact: the knowledge exists, but not with the project team |
| **Unknown-unknown** | An emergent risk: the knowledge does not exist within reach |

## Developing the risk management plan

@source PMBOK 8, Guide 2.7.2.1; PMBOK 8, Guide section 4, Risk management plan; PMBOK 8, Guide Table 4-2

The enabler of Business Environment task 5: **develop a risk management plan**.

**Plan Risk Management** defines how to do risk management. It starts when the project is **conceived** and is completed **early**. Tools: expert judgment, interviews, **stakeholder analysis**, meetings.

| Element | What it holds |
|---|---|
| **Risk strategy** | The general approach to risk on the project |
| **Methodology** | Approaches, tools and data sources |
| **Roles and responsibilities** | Lead, support and team members for each risk activity |
| **Funding** | Money for risk activities, and the rules for using **contingency and management reserves** |
| **Timing** | When and how often the risk processes run, with activities in the schedule |
| **Risk categories** | Often a **risk breakdown structure (RBS)**: technical, management, commercial and external sources |
| **Stakeholder risk appetite** | Expressed as **measurable thresholds** around each objective |
| **Probability and impact definitions** | Project-specific scales, typically **five levels** for a detailed process, **three** for a simple one |

> The same impact scales serve threats and opportunities: a delay or extra cost for a threat, time or money saved for an opportunity. Some risks, such as ethical or reputational ones, do not fit the scales easily.

## Identifying risks

@source PMBOK 8, Guide 2.7.2.2; PMBOK 8, Guide section 5, Prompt lists; PMBOK 8, Guide section 5, SWOT (strengths, weaknesses, opportunities, threats) analysis; PMBOK 8, Guide section 5, Assumption and constraint analysis

The enabler: **identify risks**.

- Identify **both threats and opportunities**, and separate genuine risks from **non-risks** such as concerns and issues.
- Not every risk can be found at the start: identification is **iterative** throughout the project.

| Tools and techniques | Outputs |
|---|---|
| Expert judgment; **brainstorming**, **checklists**, **interviews**; **root cause analysis**, **assumption and constraint analysis**, **SWOT**, document analysis; facilitation; **prompt lists**; meetings; **artificial intelligence** | **Risk register**, **risk report**, updates to the assumption log, issue log and lessons learned register |

| Technique | How it finds risks |
|---|---|
| **Prompt lists** | Predetermined risk categories to prompt ideas: the lowest RBS level for individual risks; **PESTLE**, **TECOP** or **VUCA** for sources of overall risk |
| **SWOT** | Opportunities from strengths, threats from weaknesses; widens the search to internally generated risks |
| **Assumption and constraint analysis** | Tests whether assumptions and constraints are inaccurate, unstable, inconsistent or incomplete |
| **Root cause analysis** | Finds the underlying causes that can produce several risks |

## Maintaining the risk register

@source PMBOK 8, Guide section 4, Risk register; PMBOK 8, Guide section 4, Risk report

The enabler: **maintain a risk register (e.g., poor IT security)**.

The **risk register** records the results of Identify Risks, Perform Risk Analysis, Plan Risk Responses, Implement Risk Responses and Monitor Risks. After identification it holds:

- the **list of identified risks**, each with a unique identifier and a structured **risk statement** that separates cause, risk and effect;
- **potential risk owners** and **potential responses**, confirmed later;
- as needed: a short title, **category**, current **status**, causes, effects on objectives, **risk triggers** (signs that a risk is about to occur), affected WBS items, and **timing** (when it might occur, deadline for action).

**Example of a risk statement.** "Because our IT security controls have not been tested (cause), attackers may access customer data (risk), which would breach data protection law and delay go-live (effect)."

The **risk report** summarizes **sources of overall project risk** and individual risks: numbers of threats and opportunities, distribution by category, metrics and trends. Both documents are updated **iteratively** so they stay current and actionable.

## Qualitative risk analysis

@source PMBOK 8, Guide 2.7.2.3; PMBOK 8, Guide section 5, Risk probability and impact assessment; PMBOK 8, Guide section 5, Probability and impact matrix; PMBOK 8, Guide section 5, Risk categorization

The enabler: **analyze risks**. **Qualitative analysis** is done **throughout the project** for every individual risk.

- **Probability and impact assessment**: in interviews or meetings with people familiar with the risks, inside and outside the team, using the plan's definitions. **Explore differences** in how stakeholders see a risk, and record the assumptions.
- Other characteristics: degree of impact, **manageability**, **timing**, relationships with other risks, common causes.
- **Probability and impact matrix**: maps each risk's probability against its impact. With numbers, multiply them for a **probability-impact score**; prioritization rules may come from the organization.
- **Risk categorization** by source (RBS), affected area (WBS), phase or **common root cause** shows where exposure is highest and allows **generic responses** for groups of risks.
- Low-probability, low-impact risks go on a **watch list** in the register for monitoring.

**Example.** A risk with probability 0.5 and impact 0.4 scores 0.5 × 0.4 = 0.2; one with probability 0.9 and impact 0.1 scores 0.9 × 0.1 = 0.09. The first gets attention first.

## Quantitative risk analysis

@source PMBOK 8, Guide 2.7.2.3; PMBOK 8, Guide section 5, Simulation; PMBOK 8, Guide section 5, Sensitivity analysis; PMBOK 8, Guide section 5, Decision tree analysis; PMBOK 8, Guide Figure 5-5; PMBOK 8, Glossary (expected monetary value); PMBOK 8, Guide section 5, Influence diagrams

**Quantitative analysis** numerically analyzes the **combined effect** of individual risks and other uncertainty on the **overall** objectives. It is **not always required**; when it is, it is repeated throughout.

| Technique | What it shows |
|---|---|
| **Simulation (Monte Carlo)** | Runs the model many times with different values to give a probability distribution: for example a 10% chance of finishing by 13 May, 90% by 28 May |
| **Sensitivity analysis** | Which risks or uncertainties drive the outcome most; shown as a **tornado diagram** ordered by strength of correlation |
| **Decision tree analysis** | Compares options under uncertainty; each branch's **expected monetary value** is calculated and the best path chosen |
| **Influence diagrams** | Causal influences and relationships among variables, evaluated by simulation |

**Expected monetary value (EMV)** = probability × impact; threats negative, opportunities positive.

**Example (Figure 5-5).** Build a new plant: 0.60 × 80 + 0.40 × −30 = 36 (in millions, before costs). Upgrade the plant: 0.60 × 70 + 0.40 × 10 = 46. The decision is to **upgrade**, the larger EMV of 46.

**Example.** A threat has a 30% chance of costing 50,000: EMV = 0.3 × −50,000 = −15,000. An opportunity has a 20% chance of saving 40,000: EMV = 0.2 × 40,000 = 8,000.

## Predictive and agile

@source PMBOK 8, Guide 2.7.3; PMBOK 8, Guide 2.7.3.1; PMBOK 8, Guide 2.7.4

- Tailor to **size and complexity**, **appetite and thresholds**, strategic importance, regulation and the **development approach**.
- In an **agile** project the team assesses risks **at the start of each sprint**, reviews them with stakeholders at the end of each iteration, and uses a **risk-adjusted backlog**.
- A large **predictive** project, such as a solar power plant, may appoint **dedicated risk managers** and use **simulation models**.
- Stakeholders are key **sources** of risk information; predictive projects with stable scope rely on **schedule reserves**, adaptive ones adjust plans as new risks appear.

| | Predictive | Agile |
|---|---|---|
| Planning | A full risk management plan early | Lightweight; risks handled in each iteration |
| Identification | Workshops at the start and at set points | At sprint planning and in daily meetings |
| Tracking | Risk register and risk report | Risk-adjusted backlog, visible boards |

## Exam tips

- Threats and opportunities are both risks; identify both.
- A risk is future and uncertain; an issue has happened.
- Write risks as cause, event, consequence.
- Qualitative for every risk; quantitative only when needed.
- EMV = probability × impact; choose the decision tree branch with the best EMV.
- Lower threshold = lower risk appetite. Identification never stops.
