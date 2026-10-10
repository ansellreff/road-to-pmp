"""Check all course content for mistakes before it is published.

Usage: python tools/check_content.py [--report]
Exits with code 1 if any problem is found. Warnings (quiz quality) do not fail the
check; --report lists each one.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "web" / "src" / "content"

# Lesson sections that summarize the module and so carry no source of their own.
SUMMARY_SECTION = re.compile(r"Key points|Exam tips|How to handle it in the exam|Other terms that shifted", re.IGNORECASE)

# A quiz where the correct answer is usually the longest option can be passed by
# test-taking skill alone. With four options, chance is 25%.
LONGEST_LIMIT = 0.35
# Questions a module quiz must keep after some are reserved for the unseen mock exam.
MIN_MODULE_QUIZ = 10
CATCH_ALL = re.compile(r"^(all|none|both) of (the|these)|^both [a-d] and [a-d]\b|all of the above|none of the above", re.IGNORECASE)


def check_tables(path: Path, lesson: str, problems: list[str]) -> None:
    """Every row of a markdown table must have as many cells as its header."""
    width, start = None, 0
    for number, line in enumerate(lesson.splitlines(), start=1):
        if line.lstrip().startswith("|"):
            cells = len(re.split(r"(?<!\\)\|", line.strip())) - 2
            if width is None:
                width, start = cells, number
            elif cells != width:
                problems.append(f"{path}: table starting on line {start} has {width} columns, line {number} has {cells}")
        else:
            width = None


def check_markup(path: Path, lesson: str, problems: list[str]) -> None:
    """An @source line belongs directly under a ## or ### heading (one blank line between)."""
    lines = lesson.splitlines()
    for i, line in enumerate(lines):
        if line.startswith("@source ") and not (i >= 2 and lines[i - 1] == "" and lines[i - 2].startswith(("## ", "### "))):
            problems.append(f"{path}: @source on line {i + 1} is not directly under a section heading")
        if line.count("**") % 2:
            problems.append(f"{path}: unbalanced ** on line {i + 1}")


def check_quiz(path: Path, problems: list[str], warnings: list[str], seen: dict[str, str]) -> int:
    questions = json.loads(path.read_text(encoding="utf-8"))
    longest = 0
    for q in questions:
        options = q.get("options", [])
        lengths = [len(o) for o in options]
        answer = q.get("answer")
        if isinstance(answer, int) and 0 <= answer < len(lengths):
            if lengths[answer] == max(lengths) and lengths.count(max(lengths)) == 1:
                longest += 1
        for option in options:
            if CATCH_ALL.search(option):
                warnings.append(f"{path.parent.name} [{q.get('id')}]: catch-all option \"{option}\"")
        key = re.sub(r"\W+", " ", str(q.get("q", "")).lower()).strip()
        if key in seen:
            warnings.append(f"{path.parent.name} [{q.get('id')}]: same question as {seen[key]}")
        seen.setdefault(key, f"{path.parent.name} [{q.get('id')}]")
    if questions and longest / len(questions) > LONGEST_LIMIT:
        warnings.append(
            f"{path.parent.name}: correct answer is the longest option in {longest} of {len(questions)} "
            f"questions ({longest / len(questions):.0%}, limit {LONGEST_LIMIT:.0%})"
        )
    ids = [q.get("id") for q in questions]
    for dup, n in Counter(ids).items():
        if n > 1:
            problems.append(f"{path}: duplicate question id {dup}")
    for q in questions:
        where = f"{path} [{q.get('id')}]"
        options = q.get("options", [])
        if len(options) != 4:
            problems.append(f"{where}: needs exactly 4 options, has {len(options)}")
        if len(set(options)) != len(options):
            problems.append(f"{where}: two options are identical")
        if not isinstance(q.get("answer"), int) or not 0 <= q["answer"] < len(options):
            problems.append(f"{where}: answer index is not valid")
        for field in ("q", "explanation", "ref"):
            if not str(q.get(field, "")).strip():
                problems.append(f"{where}: missing {field}")
        if not q.get("links"):
            problems.append(f"{where}: no book page link (run tools/link_sources.py)")
    # A quiz where the answer is nearly always the same letter can be gamed.
    # Questions reserved for the unseen mock exam are not part of the module quiz.
    visible = [q for q in questions if not q.get("examOnly")]
    spread = Counter(q.get("answer") for q in visible)
    if visible and max(spread.values()) > len(visible) * 0.45:
        problems.append(f"{path}: answers are not spread across A-D ({dict(sorted(spread.items()))})")
    if questions and len(visible) < MIN_MODULE_QUIZ:
        problems.append(f"{path}: only {len(visible)} questions left for the module quiz (minimum {MIN_MODULE_QUIZ})")
    return len(questions)


def check_exams(course_file: Path, course: dict, problems: list[str]) -> str:
    """The fixed mock exams: right size, right domain split, no question used twice."""
    path = course_file.parent / "exams.json"
    if not path.is_file():
        return ""
    exams = json.loads(path.read_text(encoding="utf-8"))
    domain_of = {m["id"]: d["id"] for d in course["domains"] for m in d["modules"]}
    bank = {}
    for module in domain_of:
        quiz = course_file.parent / "modules" / module / "quiz.json"
        for q in json.loads(quiz.read_text(encoding="utf-8")) if quiz.is_file() else []:
            bank[(module, q["id"])] = q
    size = course["exam"]["questions"]
    used: dict[tuple, str] = {}
    for exam in exams:
        rows = exam["questions"]
        if len(rows) != size:
            problems.append(f"{path} [{exam['id']}]: {len(rows)} questions, the exam has {size}")
        split = Counter()
        letters = Counter()
        for module, qid, order in rows:
            question = bank.get((module, qid))
            if question is None:
                problems.append(f"{path} [{exam['id']}]: {module} {qid} does not exist")
                continue
            if (module, qid) in used:
                problems.append(f"{path} [{exam['id']}]: {module} {qid} is also in {used[(module, qid)]}")
            used[(module, qid)] = exam["id"]
            if sorted(order) != [0, 1, 2, 3]:
                problems.append(f"{path} [{exam['id']}]: {module} {qid} has a bad option order {order}")
                continue
            if bool(question.get("examOnly")) != bool(exam.get("unseen")):
                problems.append(f"{path} [{exam['id']}]: {module} {qid} examOnly mark does not match the exam")
            split[domain_of[module]] += 1
            letters[order.index(question["answer"])] += 1
        for domain in course["domains"]:
            want = round(size * domain["weight"] / 100)
            if abs(split[domain["id"]] - want) > 1:
                problems.append(f"{path} [{exam['id']}]: {split[domain['id']]} questions from {domain['id']}, expected {want}")
        if letters and max(letters.values()) > size * 0.3:
            problems.append(f"{path} [{exam['id']}]: answers are not spread across A-D ({dict(sorted(letters.items()))})")
    stray = [f"{m} {q}" for (m, q), question in bank.items() if question.get("examOnly") and (m, q) not in used]
    if stray:
        problems.append(f"{path}: marked examOnly but in no exam: {stray}")
    return f", {len(exams)} mock exams"


def check_cards(path: Path, problems: list[str]) -> int:
    cards = json.loads(path.read_text(encoding="utf-8"))
    for dup, n in Counter(c.get("id") for c in cards).items():
        if n > 1:
            problems.append(f"{path}: duplicate card id {dup}")
    for c in cards:
        if not str(c.get("front", "")).strip() or not str(c.get("back", "")).strip():
            problems.append(f"{path} [{c.get('id')}]: empty front or back")
    return len(cards)


def main() -> None:
    problems: list[str] = []
    warnings: list[str] = []
    seen: dict[str, str] = {}
    for course_file in sorted(CONTENT.glob("*/course.json")):
        course = json.loads(course_file.read_text(encoding="utf-8"))
        modules = [m for d in course["domains"] for m in d["modules"]]
        for dup, n in Counter(m["id"] for m in modules).items():
            if n > 1:
                problems.append(f"{course_file}: duplicate module id {dup}")
        weight = sum(d["weight"] for d in course["domains"])
        if weight != 100:
            problems.append(f"{course_file}: domain weights add up to {weight}, not 100")

        ready, questions, cards = 0, 0, 0
        for m in modules:
            folder = course_file.parent / "modules" / m["id"]
            if not m["ready"]:
                if folder.exists():
                    problems.append(f"{folder}: has content but is not marked ready in course.json")
                continue
            ready += 1
            for name in ("lesson.md", "quiz.json", "flashcards.json"):
                if not (folder / name).is_file():
                    problems.append(f"{folder}: missing {name}")
            if (folder / "lesson.md").is_file():
                lesson = (folder / "lesson.md").read_text(encoding="utf-8")
                if len(lesson) < 1500:
                    problems.append(f"{folder}/lesson.md: suspiciously short")
                # Every section needs a source under its heading, except the summaries.
                untagged = [
                    heading
                    for heading, body in re.findall(r"^## (.+)\n+(.*)$", lesson, re.MULTILINE)
                    if not body.startswith("@source ") and not SUMMARY_SECTION.match(heading)
                ]
                if untagged:
                    problems.append(f"{folder}/lesson.md: sections without @source: {untagged}")
                check_tables(folder / "lesson.md", lesson, problems)
                check_markup(folder / "lesson.md", lesson, problems)
                linked = {s["label"] for s in json.loads((folder / "sources.json").read_text(encoding="utf-8"))} \
                    if (folder / "sources.json").is_file() else set()
                for line in lesson.splitlines():
                    if line.startswith("@source "):
                        for ref in (r.strip() for r in line[8:].split(";")):
                            if ref and ref not in linked:
                                problems.append(f"{folder}/lesson.md: source not linked (run tools/link_sources.py): {ref}")
            if (folder / "quiz.json").is_file():
                questions += check_quiz(folder / "quiz.json", problems, warnings, seen)
            if (folder / "flashcards.json").is_file():
                cards += check_cards(folder / "flashcards.json", problems)
        exams = check_exams(course_file, course, problems)
        print(f"{course['id']}: {ready} of {len(modules)} modules ready, {questions} questions, {cards} flashcards{exams}")

    if warnings:
        print(f"{len(warnings)} quiz quality warning(s)" + ("" if "--report" in sys.argv else " (run with --report to list them)"))
        if "--report" in sys.argv:
            for w in warnings:
                print(" ~", w)
    if problems:
        print(f"\n{len(problems)} problem(s):")
        for p in problems:
            print(" -", p)
        sys.exit(1)
    print("No problems found.")


if __name__ == "__main__":
    main()
