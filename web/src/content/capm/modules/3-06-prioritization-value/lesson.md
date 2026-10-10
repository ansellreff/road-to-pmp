## Key points

- Agile is **value-driven**: the team works on the **most valuable items first** and delivers them **early and often**.
- The **product owner** orders the backlog by **business value**.
- **MoSCoW**: must have, should have, could have, will not have. **Kano**: basic, performance, delighter.
- **MVP** is for **learning**, **MMP** is for **selling**, **MBI** is the smallest piece with **business value**.
- Only a **released** increment confirms value. Frequent delivery **reduces risk**.
- **Stakeholders are engaged continuously**, mainly through regular **demonstrations** of working product.
- **Technical debt** is the deferred cost of work not done earlier. Left alone, it slows the team down.

## Value-driven delivery

@source Agile Practice Guide, 2.1; Agile Practice Guide, 5.2.8

**Value-based delivery** means checking that each outcome is **worth the time, effort and money** put into it.

| | How value is protected |
|---|---|
| **Definable work** (predictive) | Detailed scope, controlled change and cost control |
| **High-uncertainty work** (agile) | **Short cycles and rapid feedback**, to confirm value early and avoid investing in the wrong solution |

Why delivering in small increments matters:

| Reason | Meaning |
|---|---|
| **It confirms value** | Only a released increment lets customers decide whether the result is worth the investment |
| **It surfaces hidden work** | Packaging, deployment, documentation and compliance checks become visible when the team ships often |
| **It reduces risk** | Getting a requirement wrong costs little when it is found after two weeks, not twelve months |
| **It returns value sooner** | The highest-value features start earning or saving money while the rest are still being built |

A working product, even in the smallest increment, is the **primary measure of progress**. Delivering it and learning from its real use is what turns **outputs** (things built) into **outcomes** (benefits achieved).

## Who decides the order

@source Agile Practice Guide, 4.4.2; Agile Practice Guide, 5.2.1

- The **product owner** ranks the work by **business value**, working with stakeholders and customers.
- The **team** advises on effort, risk and dependencies, and decides **how much** it can take into an iteration.
- The order is **never final**. It is revisited whenever something is learned: a demonstration, a market change, a new risk.
- The product owner may keep a **product roadmap** showing the expected sequence of deliverables, and replans it from what the team actually produces.

Things that affect the order besides value: **risk** (do risky items early to learn sooner), **dependencies** between items, and **effort**.

## Prioritization techniques

@source Agile Practice Guide, 5.2.1; PMBOK 8, Guide section 5, Prioritization/ranking; PMI Guide to Business Analysis, 7.7.2.5; PMI Guide to Business Analysis, 4.3.2.7

| Technique | How it works | Good for |
|---|---|---|
| **MoSCoW** | Sort into **must have, should have, could have, will not have** | Quick workshops; coarse and subjective |
| **Stack rank (forced ranking)** | One ordered list with **no ties** | Total clarity; needs one decision owner |
| **Value versus effort matrix** | Plot each item by impact and effort on a 2 × 2 grid | Seeing quick wins at a glance |
| **Cost of delay** | Rank by what it costs to **wait**: time-sensitivity and economic impact | Time-critical items |
| **Weighted shortest job first (WSJF)** | **Cost of delay ÷ job size**. Highest score goes first. | Large backlogs |
| **Kano analysis** | Classify features as **basic, performance or delighter** | Choosing the right mix of features |
| **Buy a feature / 100-point method** | Stakeholders "**spend**" a fixed budget of money or points on the items they want | Revealing true preferences |

**MoSCoW in detail:**

| | Meaning | Rule of thumb |
|---|---|---|
| **Must have** | Without it the release fails | Non-negotiable |
| **Should have** | Important, but the release works without it | Include if at all possible |
| **Could have** | Nice to have | First to be dropped if time runs short |
| **Will not have** | Agreed as out, for now | Manages expectations |

**Kano in detail:**

| Category | Customer reaction | Example for a hotel |
|---|---|---|
| **Basic** | Expected. Its absence causes dissatisfaction; its presence is not noticed. | A clean room |
| **Performance** | The more, the better | Faster internet |
| **Delighter** | Unexpected. Its presence delights; its absence is not missed. | A free room upgrade |

**WSJF example.** Item A has a cost of delay of 12 and a size of 6: 12 ÷ 6 = **2**. Item B has a cost of delay of 9 and a size of 3: 9 ÷ 3 = **3**. **B goes first**, although A is worth more, because B delivers value faster.

PMI's business analysis guide writes the top of the fraction out in full: WSJF = (business value + time criticality + risk reduction or opportunity enablement) ÷ effort. It also notes that the full Kano model has five categories and that many organizations use only the three above.

## MVP, MMP and MBI

@source Agile Practice Guide, Glossary (minimum viable product); Agile Practice Guide, Glossary (minimum marketable product); Agile Practice Guide, Glossary (minimum business increment)

| Term | Purpose | Definition |
|---|---|---|
| **Minimum viable product (MVP)** | **Learning** | The smallest version of a product that lets the team **test assumptions** and get feedback from real users. Reduces uncertainty about whether the product is valuable or usable. |
| **Minimum marketable product (MMP)** | **Release** | The smallest version with enough features to be **offered to the market** and deliver value customers will pay for or adopt |
| **Minimum business increment (MBI)** | **Business value** | The smallest deliverable piece of functionality that has **value to the business** |

Example for a food-delivery app:

- **MVP:** a simple page where ten local customers can order from one restaurant, to find out whether anyone wants the service.
- **MMP:** the app with several restaurants, payment and delivery tracking, good enough to launch publicly.
- **MBI:** adding "reorder my last meal", a small addition that increases repeat orders.

## Demonstrations and feedback

@source Agile Practice Guide, 5.2.6; Agile Practice Guide, Glossary (demonstrations)

A **demonstration** (review) is an event in which the team **presents completed work to stakeholders** to obtain feedback and validate progress.

- In iteration-based agile, all completed items are shown at the **end of each iteration**.
- In flow-based agile, work is shown when enough features have built up into a coherent set.
- As a guide, demonstrate working product **at least every two weeks**. That is frequent enough to stop the team heading in the wrong direction.
- The **product owner accepts or declines** each story.
- Only **working** product is shown. Slides about progress are not a demonstration.
- A team that never demonstrates or releases **cannot learn fast enough** and is probably not working in an agile way.

Feedback from a demonstration goes back into the backlog: new items, changed priorities, items dropped.

## Engaging and informing stakeholders

@source PMBOK 8, Guide 2.5.3; Agile Practice Guide, 5.2.6

Agile projects need **continuous feedback** on features and stories, so stakeholders are involved **throughout**, not just at the start and at acceptance.

| Predictive | Agile |
|---|---|
| Requirements gathered up front, then periodic formal reports | Stakeholders see and comment on working product every iteration |
| Communication planned and pushed out | Information kept **visible** for anyone to see |
| Change is negotiated | Change is expected; the product owner re-prioritizes |

How agile teams keep stakeholders informed:

| Practice | What it does |
|---|---|
| **Demonstrations / reviews** | Show working product and gather feedback |
| **Information radiators** | Visible displays such as task boards and burndown charts, updated often |
| **Daily coordination meetings** | Keep the team aligned; stakeholders may observe |
| **Product roadmap** | Shows where the product is heading |
| **Face-to-face conversation** | The most effective way to share information; video where teams are remote |

The **product owner** is the main link between the team and the stakeholders, and represents their interests in every decision about the backlog.

## Releasing: cadence and on demand

@source Agile Practice Guide, 5.2.8; Agile Practice Guide, Glossary (continuous delivery)

Once the **definition of done** is met, an increment **can** be released. Whether it **is** released is a business decision for the **product owner**.

| Option | Meaning | Benefit |
|---|---|---|
| **Release on a cadence** | At regular intervals, for example every two weeks | A predictable rhythm for marketing, training and support |
| **Release on demand** | Whenever an increment is worth releasing | Value reaches the customer as soon as possible |
| **Continuous delivery** | Feature increments are delivered to customers **immediately**, using small batches and automation | The shortest path from idea to value |

Practical habits that make frequent release possible:

1. **Build in deliverability:** integrate, test and review continuously.
2. **Keep work small and independent.**
3. **Use lightweight governance:** short checklists and automated checks instead of long approvals.
4. **Collect outcome data** after each release and feed it into the backlog.

## Technical debt and sustainable pace

@source Agile Practice Guide, Glossary (technical debt); Agile Practice Guide, Glossary (refactoring)

**Technical debt** is the **deferred cost of work not done** at an earlier point in the product's life: shortcuts, missing tests, messy design.

- Like financial debt, it charges "interest": every later change takes longer.
- It is paid down by **refactoring**: improving the design of the product without changing its expected behavior.
- Paying it down is real work and belongs in the backlog, so the product owner can weigh it against new features.
- A **sustainable pace** matters for the same reason: a team pushed to deliver faster than it can sustain cuts corners and builds up debt.

Delivering value is not only about speed. **Continuous attention to technical excellence** keeps the team able to deliver value in future iterations too.

## Exam tips

- "Who prioritizes the backlog?" The **product owner**, by **business value**.
- "What is done first?" The **highest-value** items, and often the **highest-risk** ones.
- **Could have** items are dropped first when time runs short. **Must have** items are never dropped.
- **MVP = learn. MMP = sell.**
- Kano: missing a **basic** feature causes dissatisfaction; a **delighter** is unexpected.
- WSJF: divide cost of delay by size; the **highest** score goes first.
- A stakeholder wants to see progress: invite them to the **demonstration**, or point them to the **information radiator**. Do not write a long status report.
- A request to skip testing to "go faster" creates **technical debt**.
- Value is confirmed only when the increment is **in the hands of users**.

---

*Source: Agile Practice Guide, Second Edition, sections 2.1, 4.4.2, 5.2.1, 5.2.6 and 5.2.8 and its glossary; PMBOK Guide, Eighth Edition, the Guide section 2.5.3 and the section 5 entry on prioritization. MoSCoW, Kano, buy a feature and WSJF are described in The PMI Guide to Business Analysis, sections 7.7.2.5 and 4.3.2.7. The MoSCoW rules of thumb, the hotel and food-delivery examples, the WSJF example, risk as a factor in ordering, and the predictive versus agile stakeholder comparison follow standard PMI teaching or are my own. Written in original wording for personal study.*
