"""Report how many quiz questions describe a situation, per domain and module.

Usage: python tools/scenario_report.py [--modules]

A question counts as a scenario when it sets a scene before asking: it has at least two
sentences, the first of which is a statement, and it is not a bare definition question.
This is a rough count for steering the writing, not a quality judgement.
"""
import json
import re
import sys
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "web" / "src" / "content"


def is_scenario(text: str) -> bool:
    sentences = [s for s in re.split(r"(?<=[.?!:])\s+", text.strip()) if s]
    return len(sentences) >= 2 and not sentences[0].endswith("?") and len(text) >= 90


def main() -> None:
    for course_file in sorted(CONTENT.glob("*/course.json")):
        course = json.loads(course_file.read_text(encoding="utf-8"))
        total = [0, 0]
        for number, domain in enumerate(course["domains"], start=1):
            counts = [0, 0]
            rows = []
            for module in domain["modules"]:
                path = course_file.parent / "modules" / module["id"] / "quiz.json"
                if not path.is_file():
                    continue
                questions = json.loads(path.read_text(encoding="utf-8"))
                scenarios = sum(is_scenario(q["q"]) for q in questions)
                counts[0] += scenarios
                counts[1] += len(questions)
                rows.append(f"    {module['id']}: {scenarios} of {len(questions)} ({scenarios / len(questions):.0%})")
            total[0] += counts[0]
            total[1] += counts[1]
            if not counts[1]:
                # A course that is still being written has domains with no questions yet.
                print(f"Domain {number}: no questions yet")
                continue
            print(f"Domain {number}: {counts[0]} of {counts[1]} questions are scenarios ({counts[0] / counts[1]:.0%})")
            if "--modules" in sys.argv:
                print("\n".join(rows))
        if total[1]:
            print(f"{course['id']}: {total[0]} of {total[1]} ({total[0] / total[1]:.0%})")


if __name__ == "__main__":
    main()
