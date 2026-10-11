## Key points

- **Quality** means meeting requirements and stakeholder expectations. **Prevention is better than inspection.**
- **Quality assurance** looks at the **process** (audits). **Quality control** looks at the **deliverables** (inspection, testing).
- A **control chart** shows whether a process is **stable**. A **cause-and-effect (fishbone) diagram** traces a problem to its **root cause**.
- A **make-or-buy analysis** decides whether work is done by the team or purchased.
- **Fixed-price** contract: cost risk is on the **seller**. **Cost-reimbursable** contract: cost risk is on the **buyer**. **Time and materials** is a hybrid.
- **RFI** gathers information, **RFP** asks for a solution, **RFQ** asks for a price.
- Disputes are settled by **negotiation first**. **Litigation is the last resort.**

## Where quality and procurement sit in the 8th edition

@source PMBOK 8, Guide 2.2; PMBOK 8, Appendix X4.1; Process Groups: A Practice Guide, Table 1-4; PMBOK 6, 1.2.4.6

Neither has its own performance domain. Their content is spread across other domains:

| Topic | Where it is in the 8th edition | Older process name you may see |
|---|---|---|
| Planning for quality | **Plan Scope Management**, **Define Scope** (Scope domain) | Plan Quality Management |
| Quality assurance | **Manage Quality Assurance** (Governance domain) | Manage Quality |
| Quality control | **Monitor and Control Scope** (Scope domain) | Control Quality |
| Procurement planning | **Plan Sourcing Strategy** (Governance domain) | Plan Procurement Management |
| Selecting sellers and managing contracts | **Appendix X4, Procurement** | Conduct Procurements, Control Procurements |

Procurement is not a separate domain because project purchasing is usually run through the **organization's procurement department**, using its established policies and supplier relationships.

> **On the exam.** Quality and procurement are **knowledge areas of their own** in the exam's references, with three processes each. **Quality:** Plan Quality Management (Planning), Manage Quality (Executing), Control Quality (Monitoring and Controlling). **Procurement:** Plan Procurement Management (Planning), Conduct Procurements (Executing), Control Procurements (Monitoring and Controlling). Module 1.12 has the full table of 49 processes.

## Quality basics

@source PMBOK 8, Standard 3.5; PMBOK 8, Guide section 4, Quality management plan; PMBOK 6, X4.5; Process Groups: A Practice Guide, Glossary (Quality Policy); Process Groups: A Practice Guide, Glossary (Test and Evaluation Documents)

| Idea | Meaning |
|---|---|
| **Quality** | The degree to which the result **meets requirements** and stakeholder expectations |
| **Grade** | A **category** for products with the same use but different technical features. Low grade can be fine; **low quality is always a problem**. |
| **Prevention over inspection** | Quality is **built in**, not inspected in. Preventing a defect costs less than finding and fixing it. |
| **Continuous improvement** | An ongoing effort to improve processes and products in small steps. Approaches include **plan-do-check-act (PDCA)**, Lean, Total Quality Management and Six Sigma. |
| **Customer satisfaction** | Understanding and meeting expectations: conformance to requirements and fitness for use |

Example of grade and quality: an economy hotel room (low grade) that is clean and works as promised is **good quality**. A luxury suite (high grade) with a broken shower is **poor quality**.

| Document | What it contains |
|---|---|
| **Quality management plan** | How the organization's quality policies and procedures will be applied to meet the project's quality objectives |
| **Quality metrics** | The specific attributes to measure and how compliance will be verified: defects per day, failure rate, percentage of tasks on time |
| **Quality report** | Quality issues, recommendations for corrective action, and a summary of findings from quality control |
| **Quality control measurements** | The documented results of quality control activities |

> **On the exam.** The process guide defines the **quality policy** as the policy that sets the basic principles governing the organization's actions as it implements its system for quality management. It comes from the organization, not from the project. **Test and evaluation documents** are project documents that describe the activities used to determine whether the product meets the quality objectives stated in the quality management plan.

## Quality assurance and quality control

@source PMBOK 8, Guide section 5, Audits; PMBOK 8, Guide section 5, Inspections; PMBOK 8, Guide section 5, Testing/product evaluations

| | Quality assurance | Quality control |
|---|---|---|
| Looks at | The **process**: are we following the right procedures? | The **deliverable**: is the result correct? |
| Main technique | **Quality audit** | **Inspection**, **testing** |
| Who | Often a team **outside** the project: internal audit, the PMO, an external auditor | The project team |
| Output | Quality reports | Verified deliverables, quality control measurements |
| Aim | **Prevent** defects | **Find** defects |

- An **audit** is a structured, **independent** review of whether activities comply with policies, processes and procedures.
- An **inspection** examines a work product to see if it conforms to documented standards. It is also used to check that a **defect repair** worked.
- **Testing** is an organized investigation to find errors and defects. Testing **early** is cheaper than testing only at the end.

## Quality tools

@source PMBOK 8, Guide section 5, Control charts; PMBOK 8, Guide section 5, Cause-and-effect diagram; PMBOK 8, Guide section 5, Flowchart; PMBOK 6, 8.2.2.4; PMBOK 6, 8.3.2.1; PMI Guide to Business Analysis, 4.2.2.7; The Project Management Answer Book, Chapter 7, Q22; Process Groups: A Practice Guide, Glossary (Statistical Sampling); Process Groups: A Practice Guide, Glossary (Tolerance); Process Groups: A Practice Guide, Glossary (Control Limits); Process Groups: A Practice Guide, section 10, Design for X; Process Groups: A Practice Guide, section 10, Matrix diagrams; Process Groups: A Practice Guide, section 10, Test and inspection planning; Process Groups: A Practice Guide, section 10, Logical data model

| Tool | What it shows | Use it to |
|---|---|---|
| **Cause-and-effect diagram** (fishbone, Ishikawa) | Possible causes branching off a problem statement | Find the **root cause** |
| **Control chart** | Measurements over time against a mean and upper and lower **control limits** | See whether a process is **stable** and predictable |
| **Flowchart** (process map) | The steps and decision points of a process | Find where problems can occur |
| **Pareto chart** | Bars sorted from most to least frequent cause | Find the **vital few** causes: about 80% of problems come from 20% of causes |
| **Histogram** | Bars showing how often each value occurs | See the distribution of data |
| **Scatter diagram** | Points plotting one variable against another | See whether two variables are **related** |
| **Check sheet** (tally sheet) | A form for counting occurrences as they happen | Collect data on defects |
| **Checklist** | A list of items or steps to confirm | Make sure nothing is forgotten |

**Reading a control chart.**

- **Control limits** are calculated from the process data. They show what the process normally does.
- **Specification limits** come from the **requirements**: the maximum and minimum the customer will accept. They are different from control limits.
- A process is **out of control** when a point falls **outside a control limit**, or when **seven points in a row** fall on one side of the mean (the rule of seven). Then the cause is investigated.

**Root cause analysis** finds the basic underlying reason for a defect. When all root causes are removed, the problem does not come back.

> **On the exam.** Three definitions from the process guide. **Statistical sampling** is choosing part of a population of interest for inspection, instead of inspecting every item. **Tolerance** is the quantified description of acceptable variation for a quality requirement: it comes from the **requirement**. **Control limits** are the area of three standard deviations on either side of the mean on a control chart: they come from the **process**, and show the variation to be expected from it. A result can be inside the tolerance and still show a process that is out of control.

@diagram control-chart

> **On the exam.** Four more quality tools from the process guide. **Design for X (DfX)** is a set of technical guidelines applied during design to optimize one aspect of the product: the X may be reliability, assembly, manufacturing, cost, service, usability or safety. **Matrix diagrams** show the strength of the relationships between factors, causes and objectives set out in rows and columns; they come in shapes named L, T, Y, X, C and roof. **Test and inspection planning** is deciding, during planning, how the product will be tested or inspected: alpha and beta tests for software, strength tests in construction, field tests in engineering. A **logical data model** pictures an organization's data in business language, independent of any technology, and shows where data quality problems can arise.

## Make-or-buy and the procurement steps

@source PMBOK 8, Appendix X4.2; PMBOK 8, Appendix X4.3; PMBOK 8, Guide section 4, Procurement management plan

A **buyer** purchases products or services. A **seller** (vendor, contractor, supplier) provides them.

A **make-or-buy analysis** decides whether work is best done by the project team or purchased. Factors: the team's capacity and skills, the need for specialized or independent expertise, cost, and the risks of each choice.

| Stage | What happens |
|---|---|
| **1. Plan** | Identify what to buy, decide make or buy, choose the contract type, prepare the bid documents and selection criteria |
| **2. Conduct** | Get responses from sellers, evaluate them, select a seller, negotiate and **award the contract** |
| **3. Monitor and control** | Manage the relationship, monitor contract performance, make changes, and **close the contract** when all obligations are met |

| Document | What it is |
|---|---|
| **Procurement management plan** | How the team will acquire goods and services from outside the organization |
| **Statement of work (SOW)** | The description of what the seller must deliver |
| **Agreement** | A contract, purchase order, service-level agreement or memorandum of understanding. A **contract** is legally binding. |

The project manager usually **does not sign contracts**. That authority belongs to the procurement or legal function. The project manager supports negotiation and manages the seller's work.

## Bid documents and choosing a seller

@source PMBOK 8, Appendix X4.5; PMBOK 8, Appendix X4.6; PMBOK 8, Appendix X4.7; PMBOK 6, 12.2.2.5; Process Groups: A Practice Guide, Glossary (Request for Quotation); Process Groups: A Practice Guide, Glossary (Request for Information); Process Groups: A Practice Guide, section 10, Proposal evaluation

| Document | Used when |
|---|---|
| **Request for information (RFI)** | The buyer needs **more information** from the market before issuing bid documents |
| **Request for proposal (RFP)** | The scope is **complex** and the buyer wants the seller to propose a **solution** |
| **Request for quote (RFQ)** | **Price** is the main deciding factor and the product is readily available |

- A **bidder conference** is a meeting where the buyer answers sellers' questions, so that **all sellers receive the same information**.
- **Source selection criteria** are the factors used to score proposals: capability, cost and life cycle cost, delivery dates, technical approach, relevant experience, financial stability. They are usually **weighted**.

| Selection method | When it fits |
|---|---|
| **Least cost** | Standard, routine purchases with a well-defined outcome |
| **Qualifications only** | Small purchases where a full selection process is not worth the time |
| **Quality-based** (highest technical score) | The quality of the technical solution matters most |
| **Quality and cost based** | Both matter; quality weighs more when risk is higher |
| **Single source** | Only **one** supplier can meet the requirement, for example because of a patent |
| **Fixed budget** | The budget is disclosed and cannot be exceeded; the best technical proposal within it wins |

> **On the exam.** The process guide's procurement documents: a **request for information (RFI)** asks potential sellers for information about a product, a service or their own capability. A **request for quotation (RFQ)** asks for **prices** for common or standard products or services. A **request for proposal (RFP)** asks for a proposed solution. An **invitation for bid** is generally equivalent to a request for proposal.

> **On the exam.** **Proposal evaluation**, in the process guide, checks that each proposal is **complete** and responds **in full** to the bid documents, the procurement statement of work and the source selection criteria. The sellers chosen as a result are the **selected sellers**.

## Contract types

@source PMBOK 8, Appendix X4.8; PMBOK 8, Appendix X4.8.1; PMBOK 6, 12.1.1.6

| Contract type | How it works | Used when | Who carries the cost risk |
|---|---|---|---|
| **Fixed-price** | A set price for a clearly defined scope | The scope is **well defined** | The **seller** |
| **Cost-reimbursable** | The buyer pays the seller's **actual costs plus a fee** (the seller's profit) | The scope is **uncertain** or the work is high risk, such as research | The **buyer** |
| **Time and materials (T&M)** | The buyer pays for the time and materials used, at agreed rates. A **hybrid** of the two. | Smaller jobs, staff augmentation, or scope not yet clear | Shared; the buyer must monitor closely |
| **Target-cost** | A target cost is set; savings and overruns are **shared** | Large projects where efficiency should be rewarded | Shared |

| | Buyer's view | Seller's view |
|---|---|---|
| **Fixed-price** | Budget certainty, but may pay a risk premium | Profit if efficient, loss if costs overrun |
| **Cost-reimbursable** | Flexibility, but costs can escalate | Low financial risk, limited profit |
| **Time and materials** | Flexibility; needs close monitoring | Costs are covered; hours are scrutinized |

Older material names sub-types that may still appear in questions:

| Abbreviation | Name | Key point |
|---|---|---|
| **FFP** | Firm fixed price | The price does not change unless the scope changes. Most risk on the seller. |
| **FPIF** | Fixed price incentive fee | A fixed price plus a bonus for meeting targets |
| **FP-EPA** | Fixed price with economic price adjustment | For long contracts; the price adjusts for inflation |
| **CPFF** | Cost plus fixed fee | Actual costs plus a fee that does not change |
| **CPIF** | Cost plus incentive fee | Actual costs plus a fee tied to performance targets |
| **CPAF** | Cost plus award fee | Actual costs plus a fee decided by the buyer's judgment of performance |

## Newer contract practices

@source PMBOK 8, Appendix X4.8.2; PMBOK 8, Appendix X4.4

| Practice | Meaning |
|---|---|
| **Agile contracting** | Applying agile principles to a standard contract type: flexibility, iterative delivery, collaboration. Example: a T&M contract with deliverables per iteration. |
| **Outcome-based contract** | Payment is tied to measurable **results**, not to the effort put in |
| **Collaborative contracting** | Stronger sharing of risk and reward, with joint problem-solving |
| **Sustainable contracting** | Environmental, social and governance requirements are written into the contract |
| **Integrated project delivery (IPD)** | One multiparty agreement between owner, designer and contractor, with shared risks and rewards |

## Claims and disputes

@source PMBOK 8, Appendix X4.9; PMBOK 8, Appendix X4.9.1

A **claim** is a disagreement between buyer and seller, often about a change or its cost. Disputes are resolved in this order of preference:

| Method | What it is |
|---|---|
| **Negotiation** | The parties talk directly, with **no third party**. Always tried first. |
| **Mediation** | A neutral third party **helps** the parties reach their own agreement |
| **Arbitration** | A neutral arbitrator hears both sides and makes a **binding decision** |
| **Litigation** | The dispute goes to **court**. The **last option**. |

Mediation and arbitration are forms of **alternative dispute resolution (ADR)**. Other forms are dispute review boards and expert determination.

To avoid and handle claims, the project manager should **know the contract terms**, **keep detailed records** of activities, changes and communications, and raise potential conflicts **early**. Remember that written messages, including emails, can become evidence.

A **procurement audit** is a structured review of the procurement process and contracts for completeness, accuracy and effectiveness.

## Exam tips

- **Audit** = quality **assurance** (process). **Inspection** or **testing** = quality **control** (deliverable).
- A product with few features that works perfectly is **low grade, high quality**. That is acceptable.
- "Find the root cause": **cause-and-effect diagram**. "Is the process stable?": **control chart**. "Which causes matter most?": **Pareto chart**. "Are two variables related?": **scatter diagram**.
- Seven points in a row on one side of the mean: the process is **out of control**, even if all points are inside the limits.
- **Scope well defined** → **fixed-price**. **Scope unclear** → **cost-reimbursable** or **T&M**.
- "Which contract is riskiest for the **buyer**?" **Cost-reimbursable.** "For the **seller**?" **Fixed-price.**
- Seller asks a question during bidding: answer it for **all** sellers (bidder conference), not privately.
- A dispute with a seller: **negotiate first**. Do not jump to court, and do not stop paying.
- Any change to a contract must follow the contract's **change process** and be in **writing**.

---

*Source: PMBOK Guide, Eighth Edition, Appendix X4 (Procurement), the Standard section 3.5, and the Guide sections 4 and 5. Several points are not in the 8th edition text and come from the PMBOK Guide, Sixth Edition: grade versus quality (X4.5 and the introduction to section 8); the histogram, scatter diagram and check sheet (8.2.2.4 and 8.3.2.1); the fixed-price and cost-plus sub-types FFP, FPIF, FP-EPA, CPFF, CPIF and CPAF (12.1.1.6); and who has the authority to sign contracts (12.2.2.5). The Pareto chart is described in The PMI Guide to Business Analysis, section 4.2.2.7. The rule of seven is described in The Project Management Answer Book, chapter 7, as seven consecutive cases that need investigating; "on one side of the mean" is the usual exam wording. Written in original wording for personal study.*
