"""One-time: add an @source line under each lesson section of Domain 1.

New lessons are written with their @source lines from the start, so this script
only documents how the first eleven modules were tagged. Safe to re-run.

Usage: python tools/section_sources_d1.py
"""
import re
from pathlib import Path

MODULES = Path(__file__).resolve().parent.parent / "web" / "src" / "content" / "capm" / "modules"
S, G = "PMBOK 8, Standard ", "PMBOK 8, Guide "
PG, ETH = "Process Groups: A Practice Guide, ", "PMI Code of Ethics, "

SOURCES = {
    "1-01-project-basics": {
        "What is a project?": [S + "1.2", S + "1.3.1"],
        "Why projects get started": [S + "1.3.2.1"],
        "What is project management?": [S + "1.2"],
        "Programs": [S + "1.2", S + "1.3.4"],
        "Portfolios": [S + "1.3.4"],
        "Operations": [S + "1.3.3"],
        "Side-by-side comparison": [S + "1.3.4"],
        "From deliverable to value": [S + "1.2", S + "2.1"],
        "The value delivery system": [S + "2.1.1"],
        "Assessing project success": [S + "2.1.2"],
    },
    "1-02-governance-environment": {
        "Two levels of governance": [S + "1.3.2"],
        "The project environment": [S + "2.2"],
        "Enterprise environmental factors (EEFs)": [S + "2.2.1"],
        "Organizational process assets (OPAs)": [S + "2.2.2", S + "2.2.3", S + "2.2.4"],
        "EEF or OPA?": [S + "2.2"],
        "Organizational structures": [S + "2.2.5", S + "2.2.5, Table 2-1"],
    },
    "1-03-functions-roles": {
        "Functions associated with projects": [S + "2.4"],
        "How the work is coordinated": [S + "2.4"],
        "The project management team": [S + "2.5.1"],
        "Five competencies of a project management team": [S + "2.5.1.1", S + "2.5.1.2", S + "2.5.1.3"],
        "Sponsor, customer or product owner": [S + "2.5.2"],
        "Project team, end users and other stakeholders": [S + "2.5.3", S + "2.5.4"],
        "Product management and the product life cycle": [S + "2.3"],
    },
    "1-04-principles-part-1": {
        "What a principle is": [S + "section 3"],
        "The six principles and the mindset": [S + "3.1"],
        "Principles and performance domains": [S + "3.2"],
        "Principle 1: Adopt a Holistic View": [S + "3.3"],
        "Principle 2: Focus on Value": [S + "3.4"],
        "Principle 3: Embed Quality Into Processes and Deliverables": [S + "3.5"],
    },
    "1-05-principles-part-2": {
        "Principle 4: Be an Accountable Leader": [S + "3.6"],
        "Principle 5: Integrate Sustainability Within All Project Areas": [S + "3.7"],
        "Principle 6: Build an Empowered Culture": [S + "3.8"],
        "The six principles at a glance": [S + "3.1"],
    },
    "1-06-phases-development-approaches": {
        "Project life cycle and phases": [S + "4.1"],
        "Phase gates": [S + "4.1"],
        "What changes over the life of a project": [S + "4.1, Figure 4-1"],
        "Development approach": [S + "4.2"],
        "Predictive approach": [S + "4.2.1"],
        "Adaptive approach": [S + "4.2.2"],
        "The inverted triangle": [S + "4.2, Figure 4-3"],
        "Hybrid approach": [S + "4.2.3"],
        "Choosing an approach": [S + "4.3"],
        "Delivery cadence": [S + "4.4"],
    },
    "1-07-focus-areas": {
        "What the Focus Areas are": [S + "4.5"],
        "Initiating": [S + "4.5.1"],
        "Planning": [S + "4.5.2"],
        "Executing": [S + "4.5.3"],
        "Monitoring and Controlling": [S + "4.5.4"],
        "Closing": [S + "4.5.5"],
        "Focus Areas are not phases": [S + "4.5.6"],
    },
    "1-08-performance-domains-tailoring": {
        "What a performance domain is": [G + "section 2"],
        "The seven domains": [G + "section 2", G + "2.1"],
        "The 40 processes": [G + "Table 2-1"],
        "Tailoring": [G + "section 3", G + "3.2"],
        "What can be tailored": [G + "3.3"],
        "The four-step tailoring process": [G + "3.4"],
        "Diagnostics: when to tailor further": [G + "3.6", G + "Table 3-1"],
    },
    "1-09-constraints-risks-issues": {
        "The four terms side by side": [G + "2.7.1"],
        "Assumptions": ["PMBOK 8, Glossary (assumption)"],
        "Constraints": ["PMBOK 8, Glossary (constraint)"],
        "The assumption log": [G + "section 4, Assumption log"],
        "Risk": [G + "2.7.1"],
        "Risk classification": [G + "Figure 2-46"],
        "Issue": [G + "2.7.1", G + "section 4, Issue log"],
        "Risk appetite, threshold and exposure": [G + "2.7.1", "PMBOK 8, Glossary (risk appetite)"],
        "Risk responses": ["PMBOK 8, Glossary (risk acceptance)"],
        "Reserves": ["PMBOK 8, Glossary (contingency reserve)", "PMBOK 8, Glossary (management reserve)"],
        "Baseline": ["PMBOK 8, Glossary (baseline)"],
        "Resilience, uncertainty and related terms": [G + "2.7.1"],
    },
    "1-10-leadership-ethics": {
        "Leadership and management": [G + "section 5, Leadership", PG + "3.3.2"],
        "Leadership structures and styles": [
            G + "section 5, Centralized management and leadership",
            G + "section 5, Servant leadership",
        ],
        "Emotional intelligence": [G + "section 5, Interpersonal skills"],
        "What makes a high-performing team": [G + "2.6.2.4.2"],
        "Conflict management": [G + "section 5, Conflict management"],
        "The PMI Code of Ethics and Professional Conduct": [ETH + "1.2", ETH + "1.5"],
        "The four values": [ETH + "1.4"],
        "Responsibility": [ETH + "chapter 2"],
        "Respect": [ETH + "chapter 3"],
        "Fairness": [ETH + "chapter 4"],
        "Honesty": [ETH + "chapter 5"],
    },
    "1-11-edition-bridge": {
        "Why this module exists": ["PMBOK 8, Appendix X5.3"],
        "The 12 principles and where they went": ["PMBOK 8, Appendix X5, Table X5-2", "PMBOK 7, Standard section 3"],
        "The 8 performance domains of the 7th edition": ["PMBOK 7, Guide section 2"],
        "Process Groups, Knowledge Areas and the 49 processes": [PG + "1.7.5", PG + "section 4"],
        "How the Knowledge Areas map to the 8th edition domains": [G + "Table 2-1"],
        "Process names that changed": [PG + "section 5", G + "Table 2-1"],
    },
}


def main() -> None:
    for module, sections in SOURCES.items():
        path = MODULES / module / "lesson.md"
        lines = [line for line in path.read_text(encoding="utf-8").split("\n") if not line.startswith("@source ")]
        text = re.sub(r"\n{3,}", "\n\n", "\n".join(lines))
        used = set()
        out = []
        for line in text.split("\n"):
            out.append(line)
            heading = re.match(r"^#{2,3} (.+)$", line)
            if heading and heading.group(1) in sections:
                used.add(heading.group(1))
                out += ["", "@source " + "; ".join(sections[heading.group(1)])]
        missing = set(sections) - used
        if missing:
            raise SystemExit(f"{module}: no such heading(s): {sorted(missing)}")
        path.write_text("\n".join(out), encoding="utf-8")
        print(f"{module}: {len(used)} sections tagged")


if __name__ == "__main__":
    main()
