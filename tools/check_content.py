"""Check all course content for mistakes before it is published.

Usage: python tools/check_content.py
Exits with code 1 if any problem is found.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "web" / "src" / "content"

# Lesson sections that summarize the module and so carry no source of their own.
SUMMARY_SECTION = re.compile(r"Key points|Exam tips|How to handle it in the exam|Other terms that shifted", re.IGNORECASE)


def check_quiz(path: Path, problems: list[str]) -> int:
    questions = json.loads(path.read_text(encoding="utf-8"))
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
    spread = Counter(q.get("answer") for q in questions)
    if questions and max(spread.values()) > len(questions) * 0.45:
        problems.append(f"{path}: answers are not spread across A-D ({dict(sorted(spread.items()))})")
    return len(questions)


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
                linked = {s["label"] for s in json.loads((folder / "sources.json").read_text(encoding="utf-8"))} \
                    if (folder / "sources.json").is_file() else set()
                for line in lesson.splitlines():
                    if line.startswith("@source "):
                        for ref in (r.strip() for r in line[8:].split(";")):
                            if ref and ref not in linked:
                                problems.append(f"{folder}/lesson.md: source not linked (run tools/link_sources.py): {ref}")
            if (folder / "quiz.json").is_file():
                questions += check_quiz(folder / "quiz.json", problems)
            if (folder / "flashcards.json").is_file():
                cards += check_cards(folder / "flashcards.json", problems)
        print(f"{course['id']}: {ready} of {len(modules)} modules ready, {questions} questions, {cards} flashcards")

    if problems:
        print(f"\n{len(problems)} problem(s):")
        for p in problems:
            print(" -", p)
        sys.exit(1)
    print("No problems found.")


if __name__ == "__main__":
    main()
