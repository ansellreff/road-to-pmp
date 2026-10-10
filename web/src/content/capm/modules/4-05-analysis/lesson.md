## Key points

- **Analysis** examines, breaks down and clarifies information to **understand, complete and improve** it. It runs side by side with elicitation.
- It has **nine processes**: determine the approach, create and analyze models, define and elaborate requirements, define acceptance criteria, verify, validate, prioritize, analyze product risks, assess design options.
- **Models** come in **five categories**: scope, process, rule, data and interface. No single model shows everything.
- **Verify** asks "are the requirements **written right**?" **Validate** asks "are they the **right requirements**?"
- **Acceptance criteria** are the conditions that must be met for the solution to be accepted. A common format is **given, when, then**.
- **Definition of ready**: a story can be **started**. **Definition of done**: an item can be **accepted**.
- A **user story** is short and invites a conversation. A **use case** is a detailed narrative of the interaction between user and system.
- The business analyst **facilitates** prioritization. Those **accountable**, such as the product owner or sponsor, **decide**.

## What analysis is

@source PMI Guide to Business Analysis, 7.1; PMI Guide to Business Analysis, Table 1-2

**Analysis** is the process of examining, breaking down, synthesizing and clarifying information to further understand it, complete it and improve it. It makes sure the product information is **correct**, **meets standards**, **traces to goals**, has its **risks identified**, and can be **turned into a solution**.

| # | Process | Main output | Process group |
|---|---|---|---|
| 1 | **Determine Analysis Approach** | Analysis approach | Planning |
| 2 | **Create and Analyze Models** | Analysis models | Executing |
| 3 | **Define and Elaborate Requirements** | Requirements and other product information | Executing |
| 4 | **Define Acceptance Criteria** | Acceptance criteria | Executing |
| 5 | **Verify Requirements** | Verified requirements | Executing |
| 6 | **Validate Requirements** | Validated requirements | Executing |
| 7 | **Prioritize Requirements and Other Product Information** | Prioritized requirements | Executing |
| 8 | **Identify and Analyze Product Risks** | Product risk analysis | Executing |
| 9 | **Assess Product Design Options** | Viable product design options | Executing |

These are **not steps done once in order**. They repeat, overlap, and loop back to elicitation.

**Determine Analysis Approach** thinks ahead: what will be analyzed, which **models** will help most, and how requirements will be **verified, validated and prioritized**.

## Models and their five categories

@source PMI Guide to Business Analysis, 7.2; PMI Guide to Business Analysis, Table 7-2

**Models** are visual representations of information, as diagrams, tables or structured text, that convey a lot in a small space.

Why model?

- Models **find gaps** and extra, unneeded information.
- They give stakeholders something concrete to react to.
- They often explain a complex relationship **more clearly than text**.

| Category | Answers | Models |
|---|---|---|
| **Scope** | What is **in and out** of the solution? | Context diagram, ecosystem map, event list, feature model, goal model and business objectives model, organizational chart, use case diagram |
| **Process** | **How** will the solution be used? | Process flow, use case, user story |
| **Rule** | Which **rules** must the solution enforce? | Business rules catalog, decision table, decision tree |
| **Data** | Which **data** is used, and how does it change? | Data dictionary, data flow diagram, entity relationship diagram, state table and state diagram |
| **Interface** | How does the solution **connect** to users and other systems? | Prototype, wireframe, display-action-response model, report table, system interface table, user interface flow |

- **No single model shows everything**, and no situation needs every model. Choose the useful ones.
- **Modeling elaboration** means using several models together to find gaps and inconsistencies, for example checking a process flow against the organizational chart.
- Scope models are usually created **first**.

## Scope models

@source PMI Guide to Business Analysis, 7.2.2.1; PMI Guide to Business Analysis, 7.2.2.5; PMI Guide to Business Analysis, 7.2.2.8; PMI Guide to Business Analysis, 7.2.2.18

| Model | What it shows |
|---|---|
| **Context diagram** | The solution in the middle, with every **system and person that interfaces directly** with it, and the inputs and outputs between them |
| **Ecosystem map** | **All** the relevant systems and the relationships between them. Wider than a context diagram. |
| **Event list** | External **events that trigger** the solution to do something |
| **Feature model** | All the features as a **tree**: level 1 features, their sub-features, and so on |
| **Goal model / business objectives model** | How business problems, objectives and top-level features relate |
| **Organizational chart** | The reporting structure, used to find who will **use or be affected by** the solution |
| **Use case diagram** | The **users (actors)** and the use cases that are in scope |

@diagram context-diagram

## Process models: flows, use cases and user stories

@source PMI Guide to Business Analysis, 7.2.2.12; PMI Guide to Business Analysis, 7.3.2.8; PMI Guide to Business Analysis, 7.3.2.9

| Model | What it is |
|---|---|
| **Process flow** | A picture of the **steps people take** in their work or with the solution. Also called a **swim lane diagram**, process map or flow chart. A level 1 flow shows a whole process in about seven to ten steps. |
| **Use case** | A **text narrative** of the interaction between a user and the system to reach a **goal**. Has a **normal flow** plus **alternative** and **exception** flows. |
| **User story** | A requirement written from the **user's point of view**, focused on the benefit to the user |

@diagram process-flow

**User story format:** "As an **(actor)**, I want to **(function)**, so that I can **(business reason)**."

| | User story | Use case |
|---|---|---|
| **Length** | One or two sentences | A structured narrative, often a page or more |
| **Detail** | Low: a promise to have a conversation | High: every step, with alternative and exception paths |
| **Typical life cycle** | Adaptive | Predictive, or wherever interactions are complex |
| **Detail added by** | Acceptance criteria and **story elaboration** | The flows written into the use case |

**Scenario match:**

- A team works in short iterations and talks to its product owner daily: **user stories**.
- A complicated interaction, with many "what if" branches, must be specified fully for a contractor: **use cases**.

## Rule, data and interface models

@source PMI Guide to Business Analysis, 7.2.2.4; PMI Guide to Business Analysis, 7.2.2.6; PMI Guide to Business Analysis, 7.2.2.13; PMI Guide to Business Analysis, 7.3.2.1

**Rule models:**

| Model | What it shows |
|---|---|
| **Business rules catalog** | A table of business rules and their attributes. Business rules are **not processes**; they **constrain or support** how the business behaves. |
| **Decision tree** | Decisions and choices as a **branching flow** leading to outcomes; can show the order of decisions |
| **Decision table** | **Every combination** of conditions and the outcome of each, so that none is missed |

**Data models:**

| Model | What it shows |
|---|---|
| **Entity relationship diagram (ERD)** | The business **data objects** and the relationships between them, with **cardinality** (how many of one relate to how many of the other) |
| **Data flow diagram** | How data **moves** between external entities, data stores and processes |
| **Data dictionary** | The **fields** of a data object and their attributes |
| **State table / state diagram** | The valid **states** of an object and the allowed moves between them, for example order placed, paid, shipped, delivered |

@diagram entity-relationship-diagram

@diagram state-diagram

**Interface models:**

| Model | What it shows |
|---|---|
| **Prototype** | A representation of the solution before it is built. **Low fidelity** (a sketch) or **high fidelity** (interactive). |
| **Wireframe** | A mock-up of **one screen** |
| **Display-action-response model** | What each screen element displays and how it responds to the user's action |
| **User interface flow** | How the user **navigates between screens** |
| **Report table** | The detailed requirements of **one report** |
| **System interface table** | The detailed requirements of **one interface** between systems: fields, frequency, volume, validation |

## Define and Elaborate Requirements

@source PMI Guide to Business Analysis, 7.3; PMI Guide to Business Analysis, 7.3.2.4; PMI Guide to Business Analysis, 7.3.2.7

The process of **refining and documenting** requirements at the level of detail, format and formality each audience needs. It is the work business analysts are best known for.

**Confirmed elicitation results are not yet requirements.** They must still be analyzed, to avoid missing, inconsistent or conflicting requirements.

Besides requirements, this process records:

| Item | Meaning |
|---|---|
| **Assumptions** | Factors taken as true **without proof**. Track them: one may turn out false. |
| **Constraints** | **Limiting factors** on the development or implementation of the solution |
| **Dependencies** | Product information that a requirement **relies on** |
| **Issues** | Open questions, tracked until resolved |
| **Product risks** | Uncertain events that would affect the product |

Everything together is the **requirements package**. It need not be a document: it may be a backlog, or records in a requirements management tool.

**The product backlog** is the list of all items to be delivered, usually user stories, ranked by business value. A well-refined backlog is **DEEP**:

| Letter | Meaning |
|---|---|
| **D, Detailed appropriately** | The highest-priority items have the most detail |
| **E, Estimated** | Every item has at least a rough estimate; top items have better ones |
| **E, Emergent** | It keeps changing as things are learned |
| **P, Prioritized** | Ranked, with the most important at the top |

| Technique | Meaning |
|---|---|
| **Story elaboration** | Adding detail to a story until it is ready for development. Also called **backlog refinement**. Done **just in time**. |
| **Story slicing** | **Splitting** an epic or story into smaller ones, each still delivering value, small enough for one iteration |
| **Definition of ready** | The conditions the team agrees a story must meet **before work on it begins** |
| **Glossary** | Agreed definitions of terms and acronyms |

## Define Acceptance Criteria

@source PMI Guide to Business Analysis, 7.4; PMI Guide to Business Analysis, 7.4.2.1; PMI Guide to Business Analysis, 7.4.2.2

**Acceptance criteria** are **concrete and demonstrable conditions** that must be met for the business stakeholders or customers to **accept** an item. They are the basis of **acceptance tests**.

- They can be set at several levels: **requirement or user story, iteration, release, product**.
- Writing them **helps refine the requirements**: a requirement for which no test can be written is unclear.
- Quality control staff can help write them.

**Behavior-driven development (BDD)** starts from how the user will use the product, writes tests for that behavior, then builds to pass the tests. Its usual format:

> **Given** (the preconditions), **when** (the user does something), **then** (the product's reaction).

Example for the story "As a customer, I want to reset my password, so that I can regain access":

> **Given** I am on the sign-in page and have a registered email address, **when** I request a password reset, **then** a reset link is sent to that address within one minute.

| | Definition of ready | Definition of done | Acceptance criteria |
|---|---|---|---|
| **Answers** | Can we **start** this story? | Is this item **complete**? | Does **this** item do what was wanted? |
| **Applies to** | Stories entering an iteration | Every item of that kind | One specific item |
| **Example** | Has acceptance criteria and an estimate | Tested, standards met, nonfunctional requirements met | The reset link arrives within one minute |

The definition of done is part of the acceptance criteria output and is used later when the solution is evaluated for release.

## Verify and validate

@source PMI Guide to Business Analysis, 7.5; PMI Guide to Business Analysis, 7.6; PMI Guide to Business Analysis, 7.5.2.2

| | Verify Requirements | Validate Requirements |
|---|---|---|
| **Question** | Are the requirements of **sufficient quality**? ("built right") | Do the requirements **meet the business goals**? ("the right thing") |
| **Checks against** | **Standards**, regulations, specifications | **Business goals and objectives**, stakeholder needs |
| **Looks for** | Errors, conflicts, unclear wording | Missing, unnecessary or wrong requirements |
| **Usually done by** | Peers: other analysts, quality control | **Stakeholders**: functional managers, subject matter experts |
| **Main techniques** | Peer review, INVEST | Walkthrough, traceability matrix, goal model, Delphi |

- A **verified** requirement is not necessarily needed. A **validated** requirement is not necessarily well written. **Both are required**, in either order or together.
- After both, requirements still have to be **prioritized and approved**.

**Verification checks the three Cs: correct, complete, consistent.** Other quality characteristics: feasible, concise, measurable, testable, traceable, unambiguous, precise.

**INVEST** is the main verification check for user stories: **independent, negotiable, valuable, estimable, small, testable**.

**Peer reviews, from least to most formal:**

| Type | How it works |
|---|---|
| **Peer desk check** | An informal look by one or more peers, often working through an example to check the logic |
| **Walkthrough** | The **author leads** the reviewers through the material; feedback is spoken |
| **Inspection** | Formal and rigorous. Reviewers check completeness, consistency and conformance to standards, usually with a **checklist**. |

**Validation techniques:**

- **Traceability matrix:** every requirement must trace back to a business goal or objective.
- **Walkthrough** with stakeholders.
- **Delphi:** anonymous rounds of expert input until the group converges.

## Prioritize requirements

@source PMI Guide to Business Analysis, 7.7; PMI Guide to Business Analysis, 7.7.2.5

The process of understanding how each piece of product information achieves stakeholder objectives, and using that to **rank the work**. It also decides how requirements are **allocated to iterations or releases**.

**Two inputs to every priority:**

1. **Business value**, judged by business stakeholders, subject matter experts or the product owner
2. **Effort and risk**, estimated by the project team

| Who | Role in prioritization |
|---|---|
| **Business analyst** | **Facilitates and negotiates**; may recommend |
| **Product owner / product manager** | Usually the most influential; decides the order |
| **Sponsor** | Can set and approve priorities; consulted when there is **no consensus** |
| **Product team** | Supplies size and risk estimates |

- Priorities are **not final**. They change as things are learned.
- **Tell stakeholders early** how prioritization will work, so nobody is surprised when their item ranks low.
- Low-priority items are the first to be **cut** when time or budget runs short.

Schemes used: **MoSCoW**, **buy a feature**, **multivoting** (dot voting), **Delphi**, **weighted ranking**, **weighted shortest job first**, **minimum viable product**, timeboxing. Module 3.6 explains them.

## Identify and Analyze Product Risks

@source PMI Guide to Business Analysis, 7.8; PMI Guide to Business Analysis, 7.8.3.1

**Product risks** are uncertainties that can affect success in the **definition, development and expected results** of the product. They are a **subset** of the project's risks, so this work is done **with the project manager**.

The activities mirror project risk management: identify, qualitative analysis, quantitative analysis, plan responses, implement responses, monitor.

| Threats | Opportunities |
|---|---|
| **Avoid**, **transfer**, **mitigate**, **accept** | **Exploit**, **enhance**, **share**, **accept** |

What is special about product risk:

- A risk response often means **adding or changing a requirement**. Risk work therefore **closes gaps in the requirements**.
- **Assumptions, constraints, dependencies and open issues** are all sources of risk. Treating them as risks gets them reviewed more often.
- A risk that occurs with no adequate response becomes an **issue**.

Tools: risk register, **risk burndown chart**, root cause analysis, SWOT, context diagram, ecosystem map.

## Assess Product Design Options

@source PMI Guide to Business Analysis, 7.9; PMI Guide to Business Analysis, 7.9.3.1

The process of identifying, analyzing and comparing **design options** against the business goals, cost, feasibility and risk, and recommending among them.

- Requirements say **what** the product should do. Design is about **how** it is built or how it looks.
- The analyst **assesses and recommends**; the analyst does not have to create the designs.
- Each option is presented with its **pros and cons**. Options that are not viable are dropped.
- Design can start as soon as an **increment** of requirements is ready. Requirements must be **prioritized** first, so the design serves the most important ones.
- A **badly designed** solution can meet every requirement and still **miss the business objectives**.

Techniques: affinity diagram, brainstorming, competitive analysis, focus groups, **real options** (delay the decision until the latest possible time, when most is known), and **vendor assessment** (rate vendors and their products against weighted criteria).

## Predictive and adaptive analysis

@source PMI Guide to Business Analysis, 7.3.4; PMI Guide to Business Analysis, 7.5.4; PMI Guide to Business Analysis, 7.7.4

| | Predictive | Adaptive |
|---|---|---|
| **Requirements written as** | Requirement statements, business rules, use cases, at business, stakeholder and solution level | **User stories with acceptance criteria**, in a backlog |
| **Models** | Refined and approved before design starts | Sketched as needed, often on a whiteboard |
| **Elaboration** | Mostly up front | **Just in time**, in backlog refinement |
| **Verification** | Formal reviews after requirements are written | Stories checked against **INVEST** before entering an iteration |
| **Validation** | Formal walkthroughs | Continuous, with stakeholders, during refinement |
| **Prioritization** | Before construction; later changes go through **change control** | **Continuous**: the backlog is reordered at any time |
| **Acceptance criteria** | Often at release or product level, set early | Per user story, just in time |
| **Design changes** | Costly | Expected and planned for |

On an adaptive project, anyone can write a user story, but the **product owner** decides whether and where it goes in the backlog.

## Exam tips

- **Verify = quality and standards. Validate = business goals.**
- A requirement is perfectly worded but nobody needs it: it would pass **verification** and fail **validation**.
- "The author leads reviewers through the document" is a **walkthrough**. "A checklist and a formal process" is an **inspection**.
- **Context diagram** shows what interfaces with the solution, so it defines **scope**.
- "Every combination of conditions" is a **decision table**.
- "States an order passes through" is a **state diagram**.
- "Relationships between data objects" is an **entity relationship diagram**.
- **Given, when, then** is the format for **acceptance criteria**.
- A story too large for one iteration: **slice** it.
- **Ready** is about starting. **Done** is about finishing.
- Who decides the priority? The **product owner** or other accountable stakeholders. The analyst **facilitates**.
- Requirements say **what**. Design says **how**.

---

*Source: The PMI Guide to Business Analysis, section 7 (Analysis), sections 7.1 to 7.9, and Table 1-2 for the process groups. The questions in the "answers" column of the model categories, the user story versus use case table and scenario match, the password reset example, the three-way comparison of ready, done and acceptance criteria, and the "built right" and "right thing" phrases follow standard PMI teaching or are my own. Written in original wording for personal study.*
