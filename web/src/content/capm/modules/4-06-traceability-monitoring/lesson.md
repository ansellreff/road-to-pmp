## Key points

- **Traceability** links each requirement **backward** to the goal that caused it and **forward** to the design, tests and product that fulfil it.
- **Monitoring** keeps product information accurate from **approval to implementation**, mainly by managing change.
- The knowledge area has **four processes**: determine the approach, establish relationships and dependencies, select and approve requirements, manage changes.
- The **traceability matrix** is the main tool. It exposes **missing** requirements, **unneeded** requirements (scope creep) and the **impact** of a change.
- **Approved requirements** are **verified and validated**, and form the **requirements baseline**.
- A proposed change gets an **impact analysis** first. It is then **approved, deferred, rejected**, or sent back for **more information**.
- In adaptive work the **product backlog** does this job: a change is a new story, and **prioritizing the backlog** is the change control.

## What traceability and monitoring are

@source PMI Guide to Business Analysis, Key Concepts for Traceability and Monitoring; PMI Guide to Business Analysis, Table 1-2

**Traceability** is the ability to **track information across the product life cycle** by establishing links between objects. The links are called relationships or dependencies.

| Direction | From a requirement to | Answers |
|---|---|---|
| **Backward** | The scope features and **business goals and objectives** that triggered it | **Why** does this requirement exist? |
| **Forward** | **Design**, **test** components and the **final product** | Has it been **built and tested**? |
| **Lateral** | Other product information, for example a model | Are the text and the models consistent? |

Tracing in both directions is called **bidirectional** traceability.

**Monitoring** makes sure product information **stays accurate** from the time it is approved until it is implemented. It includes **managing changes**.

| # | Process | Main output | Process group |
|---|---|---|---|
| 1 | **Determine Traceability and Monitoring Approach** | The approach | Planning |
| 2 | **Establish Relationships and Dependencies** | Relationships and dependencies | Executing |
| 3 | **Select and Approve Requirements** | Approved requirements | Executing |
| 4 | **Manage Changes to Requirements and Other Product Information** | Recommended changes | Monitoring and Controlling |

This thinking applies to **every project and every life cycle**, whatever format the requirements take.

## Determine the approach

@source PMI Guide to Business Analysis, 8.1; PMI Guide to Business Analysis, 8.1.3.1

The process of deciding **how traceability will be done** and **how requirement changes will be managed**. Its benefit is that both are **sized appropriately**: enough to avoid missing requirements, not so much that it becomes wasted effort.

| Part | Decides |
|---|---|
| **Traceability** | Which objects to trace, which relationships to keep, the level of detail, where the links are stored |
| **Monitoring** | How changes are proposed and reviewed, **who can propose and approve**, how decisions are recorded and communicated, how product information is updated |

How much traceability is enough? It depends on:

- whether the business is **highly regulated**
- organizational standards
- **product complexity**
- the **risk** of product errors
- whether anyone will actually **use** the traces

**Too much traceability** takes too long to maintain. If the team then abandons it, the information goes out of date and is worse than none.

**Configuration management** makes sure the product being built conforms to its approved requirements. For business analysis it means requirements, models and the traceability matrix are stored where stakeholders can reach them, are **protected from loss**, and have **earlier versions available**.

## Establish Relationships and Dependencies

@source PMI Guide to Business Analysis, 8.2; PMI Guide to Business Analysis, 8.2.3.1

The process of **tracing**: setting links between requirements and other product information.

**What the links are for:**

| Purpose | How |
|---|---|
| **Confirm business value** | Each item traces back to a business need, goal or objective |
| **Manage scope** | An item that traces back to **nothing** adds no value. Question it. |
| **Avoid missing requirements** | Forward tracing shows whether each requirement was designed, built and tested |
| **Perform impact analysis** | The links show what else a change will touch |
| **Make release decisions** | Dependencies show what must be released together |

**Relationships between requirements:**

| Relationship | Meaning | Example |
|---|---|---|
| **Subset** (parent and child) | One requirement is part of a larger one | "Pay by card" is part of "Take payment" |
| **Implementation dependency** | A **cannot be built** until B is built | "Show order history" needs "Store orders" |
| **Benefit or value dependency** | A can be built, but gives **no value** until C exists | "Collect loyalty points" is of no use until "Redeem points" exists |

If an item cannot be traced to the product scope, either drop it or reconsider the scope.

## The traceability matrix

@source PMI Guide to Business Analysis, 8.2.2.5; PMI Guide to Business Analysis, 8.2.2.2; Business Analysis for Practitioners, Figure 7-18

A **traceability matrix** is a grid that **links product requirements from their origin to the deliverables that satisfy them**.

| Business objective | Requirement | Design element | Test case | Status |
|---|---|---|---|---|
| Cut checkout time by 30% | R1 Pay by saved card | Payment screen v2 | T-14 | Passed |
| Cut checkout time by 30% | R2 One-click reorder | Order history panel | T-15 | In test |
| *(none)* | R3 Animated logo | Home page | T-16 | Passed |
| Meet data protection law | R4 Delete account on request | *(none)* | *(none)* | Not started |

How to read it:

- **R3 has no objective.** It traces back to nothing: **scope creep** or gold plating. Question it.
- **R4 has no design or test.** It has been **dropped** somewhere: a **missing requirement** in the product.
- If R1 changes, the matrix shows **what else is affected**: the payment screen and test T-14.

**Is the product ready for delivery?** Use the matrix: every approved requirement should trace forward to a **test that has passed**. Any row without one is not ready.

Other tools:

| Tool | Use |
|---|---|
| **Requirements management tool** | Stores requirements, keeps **audit trails** and **version control**, supports review workflow and trace links. It stores product information; it does **not** make it good. |
| **Feature model** | Shows features and sub-features |
| **Story mapping** | Links stories to iterations and to higher-level groups |
| **Story slicing** | The sliced stories are subsets of the epic |
| **Interaction matrix** | A **lightweight, temporary** traceability matrix: a snapshot used to check whether requirements are detailed enough |

> **On the exam.** *Business Analysis for Practitioners* also calls the requirements traceability matrix a **traceability matrix** or **coverage matrix**. Its links are **bidirectional**: back to the business and stakeholder requirements a solution requirement comes from, and forward to the deliverables and test cases that satisfy it. It is typical of **predictive** work; adaptive teams sometimes keep a lighter version. Trace only what is worth the effort: the benefit is weighed against the time needed to create and maintain the matrix. Typical attributes are a requirement ID that never changes, description, objectives, status, priority, owner, source, stability, complexity and acceptance criteria.

## Select and Approve Requirements

@source PMI Guide to Business Analysis, 8.3; PMI Guide to Business Analysis, 8.3.3.1

The process of facilitating discussion with stakeholders to **negotiate and confirm which requirements** go into an iteration, release or project. Its benefit: it gives **authorization** to build.

**Approved requirements** are requirements that are:

- **verified**: of sufficient quality, and
- **validated**: they meet business needs

and that those **with authority** agree are what the team should build.

The approved set is the **requirements baseline**: the boundary containing all approved requirements for the solution, release or iteration.

| | Predictive | Adaptive |
|---|---|---|
| **Approval looks like** | **Sign-off** on a requirements package, for example a business requirements document; sometimes verbal | The product owner's **prioritization of the backlog**, or stories chosen in **iteration planning**. The **definition of ready** can stand in for approval. |
| **When** | After verification and validation, **before design** | Continuously, until items move into an iteration |
| **After approval** | Changes only through the **change management procedure** | Items in the iteration change only if the **team agrees**, or the product owner ends the story or iteration early |

- The business analyst **facilitates**; the analyst does **not** approve.
- **Conflicting requirements are normal.** Agreement usually comes by **negotiation**.
- If the team cannot agree, follow the **authority levels** set in the stakeholder engagement approach.
- **Track approvals.** If a stakeholder hesitates, find out why.
- For the project manager, approved requirements are a major **milestone**: they confirm scope and allow estimates to be refined.

| Technique | Use |
|---|---|
| **Facilitated workshop** | The main way to reconcile differences |
| **Delphi** | Anonymous rounds until experts converge |
| **Force field analysis** | Lists the forces **for** and **against** a change, weights them and compares the totals, to see whether there is enough support |
| **Group decision-making, prioritization schemes, iteration planning** | Reach and record the decision |

## Manage Changes

@source PMI Guide to Business Analysis, 8.4; PMI Guide to Business Analysis, 8.4.2.4; PMI Guide to Business Analysis, 8.4.3.1

The process of **examining changes or defects** that arise, by understanding their **value and impact**. Its benefits: important changes get in, **unnecessary ones are limited**, and everyone understands the effect on the product.

A **change request** is an appeal to change a requirement **after the requirements are baselined**. Sources: new regulations, constraints, missed requirements, or stakeholders who have now seen part of the solution.

**Impact analysis** evaluates a proposed change by how it will affect everything related to it. It covers:

- the **requirements and other product information** affected (found through the traceability links)
- the **risks** of the change
- the **work** needed
- the **schedule and cost** implications
- the effect on **business value**

**Four possible outcomes:**

| Outcome | What happens | Adaptive equivalent |
|---|---|---|
| **Approved** | Affected deliverables and planned work are updated | The item is added to the backlog |
| **Deferred** | The decision and reason are recorded; a future date or release is noted | The item is ranked **low** in the backlog |
| **Rejected** | The decision and reason are recorded; nothing is scheduled | The item is not added, or is removed |
| **More information required** | Another round of elicitation and analysis, then resubmission | Normal: items are elaborated further when chosen |

**The analyst's part:** analyze the change and **recommend** a course of action. The decision belongs to the authorized body, often a **change control board (CCB)**.

| Tool | Use |
|---|---|
| **Configuration management system (CMS)** | Ensures the solution conforms to approved product information; records changes, their status and approval levels |
| **Version control system (VCS)** | Tracks the **history of revisions** of a work product. One function within configuration management. |
| **Traceability matrix** | Shows quickly what a change touches, and so how large it is |
| **Backlog management** | The adaptive way of managing change |

## The product backlog as traceability and change control

@source PMI Guide to Business Analysis, 8.4.4; PMI Guide to Business Analysis, 8.2.4; PMI Guide to Business Analysis, 8.4.2.1

| | Predictive | Adaptive |
|---|---|---|
| **Traceability** | A traceability matrix, small to large; often required by regulators | Built in: **stories linked to acceptance criteria**, story maps, story slicing, an interaction matrix |
| **Change** | Harder and more expensive. Starts **after approval**. A **formal process** with roles and steps. | **Expected and welcomed.** No formal procedure. |
| **A new request** | A **change request**, treated like a mini-project | A **new user story**, added to the backlog |
| **Decision** | By a governing body such as a change control board | By the **product owner**, through **prioritization** |
| **Impact analysis** | Full, with a recommended course of action | Scaled down: where should it sit in the backlog? |
| **Scope** | Fixed; a change outside scope needs a decision to modify scope | **Evolves** as items are added and prioritized |

In an adaptive project a new story goes to the **bottom of the backlog** until the next time it is prioritized. Detail can be added to a story **inside** an iteration only if the team agrees.

**Is the product ready for delivery?** With a backlog: the stories planned for the release are **done**, meaning each meets its **acceptance criteria** and the **definition of done**.

## Story mapping in the practice guide

@source Business Analysis for Practitioners, Figure 7-20

A **story map** gives the product backlog a second dimension. A flat backlog shows priority only; the map also shows **how the user moves through the product**.

| Part | Meaning |
|---|---|
| **User role** | At the top: whose story the map tells |
| **Backbone** | The top row: the user's activities, or epics, in the order they happen from **left to right** |
| **Walking skeleton** | The row directly beneath: the stories that make the product **minimally functional** from end to end, often called the **minimum viable product (MVP)** |
| **User stories** | Below that, ordered **top to bottom** by priority: functionality for later releases |
| **Release slices** | Horizontal lines that group the stories into releases |

Why it matters: the top items of a flat backlog may be the highest priority and still make no sense to release together. The map shows which stories a user needs **as a set** to reach a goal.

## Exam tips

- **Backward** tracing reaches the business objective. **Forward** tracing reaches design, test and the product.
- A requirement that traces back to **no** objective: **scope creep**. Question it.
- A requirement with **no** test case: at risk of being **missed**.
- "What will this change affect?" is answered by **impact analysis**, using the **traceability matrix**.
- A stakeholder asks for a change on a predictive project: **analyze the impact first**, then take it through change control. Do not just add it, and do not just refuse.
- A stakeholder asks for a change on an agile project: write it as a **story**, add it to the **backlog**, and let the **product owner prioritize** it.
- Approved requirements are both **verified and validated**.
- The approved set is the **requirements baseline**.
- The business analyst **recommends**; the change control board or product owner **decides**.
- **Deferred** has a future date. **Rejected** does not.
- More traceability is **not** always better. It must be worth maintaining.

---

*Source: The PMI Guide to Business Analysis, section 8 (Traceability and Monitoring), sections 8.1 to 8.4, and Table 1-2 for the process groups. The checkout example and its sample matrix, the examples of the three relationships, the "answers" column for the directions of tracing, and the two "ready for delivery" checks follow standard PMI teaching or are my own; the guide describes what the matrix and backlog show but does not set out a readiness check in these words. Written in original wording for personal study.*
