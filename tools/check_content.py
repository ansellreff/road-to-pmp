"""Check all course content for mistakes before it is published.

Usage: python tools/check_content.py [--report]
Exits with code 1 if any problem is found. Warnings (quiz quality) do not fail the
check; --report lists each one.
"""
import difflib
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
# Drawings a lesson may place with "@diagram name": the names registered in the app.
_registry = (CONTENT.parent / "components" / "diagrams" / "index.tsx").read_text(encoding="utf-8").split("export const diagrams")[-1]
DIAGRAMS = set(re.findall(r"^\s+'?([\w-]+)'?:", _registry, re.MULTILINE))
# Drawings made for questions (hot spot and graphic-based), registered in diagrams/figures.tsx.
_figures = (CONTENT.parent / "components" / "diagrams" / "figures.tsx").read_text(encoding="utf-8").split("export const figures")[-1]
FIGURES = set(re.findall(r"^\s+'?([\w-]+)'?:", _figures, re.MULTILINE))
APPROACHES = ("predictive", "agile", "hybrid")

# Questions a module quiz must keep after some are reserved for the unseen mock exam.
MIN_MODULE_QUIZ = 10
# How alike two question texts must be to count as a near copy (0 to 1, from difflib).
NEAR_COPY = 0.85
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
        if line.startswith("@diagram "):
            name = line[9:].strip()
            if name not in DIAGRAMS:
                problems.append(f"{path}: line {i + 1} asks for a diagram that does not exist: {name}")
            if not (lines[i - 1] == "" and (i + 1 == len(lines) or lines[i + 1] == "")):
                problems.append(f"{path}: @diagram on line {i + 1} needs an empty line before and after it")
        if line.count("**") % 2:
            problems.append(f"{path}: unbalanced ** on line {i + 1}")


def near_copy(key: str, earlier: list[tuple[str, set[str], str]]) -> str | None:
    """The question of an earlier course that this one nearly copies, if any. Information only:
    a later course (PMP) may build on an earlier one (CAPM), so a near copy is allowed."""
    words = set(key.split())
    for other, other_words, where in earlier:
        # Cheap word-overlap filter first; the exact comparison only for likely pairs.
        if not words or len(words & other_words) / len(words | other_words) < 0.5:
            continue
        if difflib.SequenceMatcher(None, key, other).ratio() >= NEAR_COPY:
            return where
    return None


def check_quiz(path: Path, problems: list[str], warnings: list[str], seen: dict[str, str], course: dict | None = None, cases: set | None = None,
               notes: list[str] | None = None, earlier: list | None = None) -> int:
    """course and cases are given for the courses that use PMP's rules: case sets, the approach tag, a test course.
    seen holds this course's questions (a repeat inside a course is a warning); earlier holds other courses'
    questions, and a near copy of one is listed in notes, for information only."""
    course = course or {}
    test_only = bool(course.get("testOnly"))
    needs_approach = bool(course.get("exam", {}).get("approach"))
    questions = json.loads(path.read_text(encoding="utf-8"))
    longest = 0
    for q in questions:
        options = q.get("options", [])
        lengths = [len(o) for o in options]
        answer = q.get("answer")
        if not q.get("type") and isinstance(answer, int) and 0 <= answer < len(lengths):
            if lengths[answer] == max(lengths) and lengths.count(max(lengths)) == 1:
                longest += 1
        for option in options:
            if CATCH_ALL.search(option):
                warnings.append(f"{path.parent.name} [{q.get('id')}]: catch-all option \"{option}\"")
        key = re.sub(r"\W+", " ", str(q.get("q", "")).lower()).strip()
        if key in seen:
            warnings.append(f"{path.parent.name} [{q.get('id')}]: same question as {seen[key]}")
        seen.setdefault(key, f"{path.parent.name} [{q.get('id')}]")
        if notes is not None and earlier:
            match = near_copy(key, earlier)
            if match:
                notes.append(f"{path.parent.name} [{q.get('id')}]: close to {match}")
    plain = [q for q in questions if not q.get("type")]
    if plain and longest / len(plain) > LONGEST_LIMIT:
        warnings.append(
            f"{path.parent.name}: correct answer is the longest option in {longest} of {len(plain)} "
            f"questions ({longest / len(plain):.0%}, limit {LONGEST_LIMIT:.0%})"
        )
    ids = [q.get("id") for q in questions]
    for dup, n in Counter(ids).items():
        if n > 1:
            problems.append(f"{path}: duplicate question id {dup}")
    for q in questions:
        where = f"{path} [{q.get('id')}]"
        options = q.get("options", [])
        kind = q.get("type")
        if kind not in (None, "match", "hotspot", "multi", "dropdown"):
            problems.append(f"{where}: unknown question type {kind}")
        if kind == "multi":
            # Multiple response: five or six options, two or three of them right, listed in answers.
            right = q.get("answers", [])
            if not 5 <= len(options) <= 6:
                problems.append(f"{where}: multiple response needs 5 or 6 options, has {len(options)}")
            if len(set(options)) != len(options):
                problems.append(f"{where}: two options are identical")
            if not 2 <= len(set(right)) == len(right) <= 3 or any(not isinstance(i, int) or not 0 <= i < len(options) for i in right):
                problems.append(f"{where}: multiple response needs 2 or 3 different right options in answers")
            if "answer" in q:
                problems.append(f"{where}: a multiple response question lists its right options in answers, not answer")
        elif kind == "dropdown":
            # Pull-down list: two to five blanks, each with two to five choices and one right one.
            blanks = q.get("blanks", [])
            if not 2 <= len(blanks) <= 5:
                problems.append(f"{where}: a pull-down list needs 2 to 5 blanks, has {len(blanks)}")
            for b in blanks:
                choices = b.get("choices", [])
                if not str(b.get("text", "")).strip() or not 2 <= len(choices) <= 5 or len(set(choices)) != len(choices):
                    problems.append(f"{where}: each blank needs a text and 2 to 5 different choices")
                if not isinstance(b.get("answer"), int) or not 0 <= b["answer"] < len(choices):
                    problems.append(f"{where}: a blank's answer is not one of its choices")
            if len(blanks) >= 2 and all(b.get("answer") == 0 for b in blanks):
                problems.append(f"{where}: the right choice is first in every blank")
            if "options" in q or "answer" in q:
                problems.append(f"{where}: a pull-down list question has blanks, not options and answer")
        elif kind == "match":
            # Pairs: left[i] belongs to right[i]. The screen mixes the right-hand side.
            left, right = q.get("left", []), q.get("right", [])
            if not 3 <= len(left) <= MAX_PAIRS or len(left) != len(right):
                problems.append(f"{where}: matching needs 3 to {MAX_PAIRS} pairs, with as many right-hand as left-hand items")
            if len(set(left)) != len(left) or len(set(right)) != len(right):
                problems.append(f"{where}: two items of a matching question are identical")
            if "options" in q or "answer" in q:
                problems.append(f"{where}: a matching question has left and right, not options and answer")
        else:
            if kind == "hotspot":
                spots = hotspots().get(q.get("diagram"))
                if spots is None:
                    problems.append(f"{where}: drawing \"{q.get('diagram')}\" has no areas to select")
                elif not 3 <= len(options) <= 8 or any(o not in spots for o in options):
                    problems.append(f"{where}: hot spot options must be 3 to 8 areas of the drawing: {spots}")
            elif len(options) != 4:
                problems.append(f"{where}: needs exactly 4 options, has {len(options)}")
            if len(set(options)) != len(options):
                problems.append(f"{where}: two options are identical")
            if not isinstance(q.get("answer"), int) or not 0 <= q["answer"] < len(options):
                problems.append(f"{where}: answer index is not valid")
        if q.get("diagram") and kind != "hotspot" and q["diagram"] not in DIAGRAMS | FIGURES:
            problems.append(f"{where}: no drawing is called \"{q['diagram']}\"")
        if q.get("diagram") and kind in ("match", "dropdown"):
            problems.append(f"{where}: a {kind} question has no drawing")
        if "case" in q and (cases is None or q["case"] not in cases):
            problems.append(f"{where}: no case is called \"{q.get('case')}\" in cases.json")
        if needs_approach and q.get("approach") not in APPROACHES:
            problems.append(f"{where}: approach must be one of {APPROACHES}")
        if "approach" in q and q["approach"] not in APPROACHES:
            problems.append(f"{where}: approach must be one of {APPROACHES}")
        for panel in q.get("strip", []):
            if not str(panel.get("who", "")).strip() or not str(panel.get("says", "")).strip():
                problems.append(f"{where}: a comic strip panel needs who and says")
        if "strip" in q and not 2 <= len(q["strip"]) <= 6:
            problems.append(f"{where}: a comic strip has 2 to 6 panels")
        for field in ("q", "explanation", "ref"):
            if not str(q.get(field, "")).strip():
                problems.append(f"{where}: missing {field}")
        if not q.get("links") and not test_only:
            problems.append(f"{where}: no book page link (run tools/link_sources.py)")
    # A quiz where the answer is nearly always the same letter can be gamed.
    # Questions reserved for the unseen mock exam are not part of the module quiz.
    visible = [q for q in questions if not q.get("examOnly")]
    spread = Counter(q.get("answer") for q in visible if not q.get("type"))
    if spread and max(spread.values()) > sum(spread.values()) * 0.45 and not test_only:
        problems.append(f"{path}: answers are not spread across A-D ({dict(sorted(spread.items()))})")
    # A case set: three to five questions of the same module.
    for case_id, n in Counter(q["case"] for q in questions if "case" in q).items():
        if not 3 <= n <= 5 and not test_only:
            problems.append(f"{path}: case {case_id} has {n} questions; a case set has 3 to 5")
    if questions and len(visible) < MIN_MODULE_QUIZ and not test_only:
        problems.append(f"{path}: only {len(visible)} questions left for the module quiz (minimum {MIN_MODULE_QUIZ})")
    return len(questions)


# A matching question has at most this many pairs (each choice is stored as one digit; see answers.ts).
MAX_PAIRS = 5


def hotspots() -> dict[str, list[str]]:
    """The areas of each drawing that can be selected: the list in diagrams/hotspots.ts."""
    path = CONTENT.parent / "components" / "diagrams" / "hotspots.ts"
    if not path.is_file():
        return {}
    found = {}
    # Each drawing is a block: 'name': [ { name: 'Area', at: [...] }, ... ], closed by a line "  ],".
    for name, items in re.findall(r"^  '?([a-z-]+)'?: \[\n(.*?)^  \],", path.read_text(encoding="utf-8"), re.MULTILINE | re.DOTALL):
        found[name] = re.findall(r"name: '((?:[^'\\]|\\.)*)'", items)
    return found


def check_sheet(course_file: Path, problems: list[str]) -> None:
    """The formula sheet teaches nothing new: each entry must point at a lesson section that has a source."""
    path = course_file.parent / "sheet.json"
    if not path.is_file():
        return
    for group in json.loads(path.read_text(encoding="utf-8")):
        for entry in group["entries"]:
            where = f"{path} [{entry.get('name')}]"
            lesson = course_file.parent / "modules" / str(entry.get("module")) / "lesson.md"
            if not lesson.is_file():
                problems.append(f"{where}: module {entry.get('module')} does not exist")
                continue
            # The section heading, then an empty line, then its @source line.
            section = re.search(rf"^## {re.escape(entry.get('section', ''))}\n\n@source .+$", lesson.read_text(encoding="utf-8"), re.MULTILINE)
            if not section:
                problems.append(f"{where}: no section \"{entry.get('section')}\" with a source in {entry['module']}")
            if not (entry.get("formula") or entry.get("items") or entry.get("reading")):
                problems.append(f"{where}: has no formula, list or text")


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
            kind = question.get("type")
            count = len(question["right"]) if kind == "match" else len(question["blanks"]) if kind == "dropdown" else len(question.get("options", []))
            if sorted(order) != list(range(count)):
                problems.append(f"{path} [{exam['id']}]: {module} {qid} has a bad option order {order}")
                continue
            if question.get("type") == "match" and order == sorted(order):
                problems.append(f"{path} [{exam['id']}]: {module} {qid} shows each item beside its partner")
            if bool(question.get("examOnly")) != bool(exam.get("unseen")):
                problems.append(f"{path} [{exam['id']}]: {module} {qid} examOnly mark does not match the exam")
            split[domain_of[module]] += 1
            if not question.get("type"):
                letters[order.index(question["answer"])] += 1
        problems += sectioned_rules(path, exam, course, bank)
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


def sectioned_rules(path: Path, exam: dict, course: dict, bank: dict) -> list[str]:
    """PMP's rules for an exam: a case set stays together inside one section; the predictive share is near its target."""
    found = []
    rows = exam["questions"]
    sections = course["exam"].get("sections", 2)
    size = len(rows)
    starts = [-(-size * i // sections) for i in range(sections + 1)]
    section_of = lambda pos: max(i for i in range(sections) if starts[i] <= pos)
    places: dict[str, list[int]] = {}
    for pos, (module, qid, _) in enumerate(rows):
        case = bank.get((module, qid), {}).get("case")
        if case:
            places.setdefault(case, []).append(pos)
    for case, where in places.items():
        if where != list(range(where[0], where[0] + len(where))):
            found.append(f"{path} [{exam['id']}]: the questions of case {case} are not together")
        elif section_of(where[0]) != section_of(where[-1]):
            found.append(f"{path} [{exam['id']}]: case {case} is split by a break")
    target = course["exam"].get("approach", {}).get("predictive")
    if target is not None:
        predictive = sum(1 for m, q, _ in rows if bank.get((m, q), {}).get("approach") == "predictive")
        if abs(predictive - size * target / 100) > max(1, size * 0.03):
            found.append(f"{path} [{exam['id']}]: {predictive} of {size} questions are predictive; the target is {target}%")
    return found


def check_cards(path: Path, problems: list[str]) -> int:
    cards = json.loads(path.read_text(encoding="utf-8"))
    for dup, n in Counter(c.get("id") for c in cards).items():
        if n > 1:
            problems.append(f"{path}: duplicate card id {dup}")
    for c in cards:
        if not str(c.get("front", "")).strip() or not str(c.get("back", "")).strip():
            problems.append(f"{path} [{c.get('id')}]: empty front or back")
    return len(cards)


def check_card_links(course_id: str, folder: Path, card_links: dict, problems: list[str]) -> None:
    """Every flashcard has its lesson section and, where linked, its book source (tools/link_cards.py)."""
    cards = json.loads((folder / "flashcards.json").read_text(encoding="utf-8"))
    lesson = (folder / "lesson.md").read_text(encoding="utf-8")
    headings = {h.replace("*", "").replace("`", "").strip() for h in re.findall(r"^## (.+)$", lesson, re.MULTILINE)}
    linked = {s["label"] for s in json.loads((folder / "sources.json").read_text(encoding="utf-8"))} \
        if (folder / "sources.json").is_file() else set()
    mine = card_links.get(folder.name, {})
    for card in cards:
        link = mine.get(card["id"])
        where = f"{course_id}/{folder.name} [{card['id']}]"
        if not link:
            problems.append(f"{where}: flashcard has no source link (run tools/link_cards.py)")
        elif link["section"] not in headings:
            problems.append(f"{where}: flashcard links to a lesson section that does not exist: {link['section']}")
        elif link.get("ref") and link["ref"] not in linked:
            problems.append(f"{where}: flashcard source is not a linked source of the lesson: {link['ref']}")


def main() -> None:
    problems: list[str] = []
    warnings: list[str] = []
    notes: list[str] = []
    # Questions of the courses already checked (CAPM before PMP): text, its words, and where it is.
    earlier: list[tuple[str, set[str], str]] = []
    # --content <folder> checks the courses in another folder, such as the click tests' web/tests/lab-course.
    root = Path(sys.argv[sys.argv.index("--content") + 1]) if "--content" in sys.argv else CONTENT
    for course_file in sorted(root.glob("*/course.json")):
        course = json.loads(course_file.read_text(encoding="utf-8"))
        test_only = bool(course.get("testOnly"))
        cases_file = course_file.parent / "cases.json"
        cases = {c["id"] for c in json.loads(cases_file.read_text(encoding="utf-8"))} if cases_file.is_file() else set()
        modules = [m for d in course["domains"] for m in d["modules"]]
        for dup, n in Counter(m["id"] for m in modules).items():
            if n > 1:
                problems.append(f"{course_file}: duplicate module id {dup}")
        weight = sum(d["weight"] for d in course["domains"])
        if weight != 100:
            problems.append(f"{course_file}: domain weights add up to {weight}, not 100")

        ready, questions, cards = 0, 0, 0
        seen: dict[str, str] = {}
        links_file = root / "card-links" / f"{course['id']}.json"
        card_links = json.loads(links_file.read_text(encoding="utf-8")) if links_file.is_file() else {}
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
            if (folder / "lesson.md").is_file() and not test_only:
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
                questions += check_quiz(folder / "quiz.json", problems, warnings, seen, course, cases, notes, earlier)
            if (folder / "flashcards.json").is_file():
                cards += check_cards(folder / "flashcards.json", problems)
                if not test_only and (folder / "lesson.md").is_file():
                    check_card_links(course["id"], folder, card_links, problems)
        check_sheet(course_file, problems)
        exams = check_exams(course_file, course, problems)
        print(f"{course['id']}: {ready} of {len(modules)} modules ready, {questions} questions, {cards} flashcards{exams}")
        earlier += [(key, set(key.split()), f"{course['id'].upper()} {where}") for key, where in seen.items()]

    if notes:
        # Not a fault: a later course may reuse an earlier course's questions. Listed so it is a known choice.
        print(f"{len(notes)} question(s) close to another course's question (information only)" + ("" if "--report" in sys.argv else "; --report lists them"))
        if "--report" in sys.argv:
            for n in notes:
                print(" i", n)
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
