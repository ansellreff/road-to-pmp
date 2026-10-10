"""Build the fixed mock exams for a course from its quiz questions.

Usage: python tools/build_exams.py [course] [--rebuild]

Each question goes into at most one exam. Every exam follows the domain weights
of the real exam and is spread evenly over the modules of each domain. The last
exam is kept unseen: its questions are marked "examOnly" in their quiz.json, so
the module quizzes leave them out.

The result, exams.json, is committed. Without --rebuild an existing file is left
alone, so an exam does not change when questions are added later.
"""
import json
import random
import re
import sys
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "web" / "src" / "content"
EXAMS = 4
SEED = 26
# An explanation that points at an option by its position needs the original order.
POSITIONAL = re.compile(r"\b(first|second|third|fourth) option\b", re.IGNORECASE)


def split(total: int, sizes: list[int]) -> list[int]:
    """Share total over groups in proportion to their sizes (largest remainder)."""
    exact = [total * s / sum(sizes) for s in sizes]
    shares = [int(x) for x in exact]
    by_remainder = sorted(range(len(sizes)), key=lambda i: exact[i] - shares[i], reverse=True)
    for i in by_remainder[: total - sum(shares)]:
        shares[i] += 1
    return shares


def build(course_id: str) -> None:
    folder = CONTENT / course_id
    course = json.loads((folder / "course.json").read_text(encoding="utf-8"))
    rng = random.Random(SEED)
    size = course["exam"]["questions"]
    quotas = split(size, [d["weight"] for d in course["domains"]])

    quizzes = {}
    for domain in course["domains"]:
        for module in domain["modules"]:
            path = folder / "modules" / module["id"] / "quiz.json"
            quizzes[module["id"]] = json.loads(path.read_text(encoding="utf-8")) if path.is_file() else []

    exams = [[] for _ in range(EXAMS)]
    for domain, quota in zip(course["domains"], quotas):
        pools = {}
        for module in domain["modules"]:
            ids = [q["id"] for q in quizzes[module["id"]]]
            rng.shuffle(ids)
            pools[module["id"]] = ids
        have = sum(len(p) for p in pools.values())
        if have < quota * EXAMS:
            sys.exit(f"{domain['id']}: {have} questions, {quota * EXAMS} needed for {EXAMS} exams")
        # The unseen exam is filled first, so it takes an even share of every module.
        for exam in reversed(exams):
            names = list(pools)
            for name, count in zip(names, split(quota, [len(pools[n]) for n in names])):
                exam += [(name, pools[name].pop()) for _ in range(count)]

    by_id = {(m, q["id"]): q for m, qs in quizzes.items() for q in qs}
    result = []
    for number, exam in enumerate(exams, start=1):
        rng.shuffle(exam)
        # Each answer letter is used equally often, in an order that cannot be guessed.
        letters = [i % 4 for i in range(len(exam))]
        rng.shuffle(letters)
        rows = []
        for (module, qid), letter in zip(exam, letters):
            question = by_id[(module, qid)]
            order = [0, 1, 2, 3]
            if not POSITIONAL.search(question["explanation"]):
                others = [i for i in order if i != question["answer"]]
                rng.shuffle(others)
                order = others[:letter] + [question["answer"]] + others[letter:]
            rows.append([module, qid, order])
        result.append({"id": f"mock-{number}", "title": f"Mock exam {number}", "unseen": number == EXAMS, "questions": rows})

    reserved = {(m, q) for m, q, _ in result[-1]["questions"]}
    for module, questions in quizzes.items():
        if not questions:
            continue
        for q in questions:
            q.pop("examOnly", None)
            if (module, q["id"]) in reserved:
                q["examOnly"] = True
        path = folder / "modules" / module / "quiz.json"
        path.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    lines = ",\n".join(
        "  " + json.dumps({k: v for k, v in exam.items() if k != "questions"}, ensure_ascii=False)[:-1]
        + ', "questions": [\n'
        + ",\n".join("    " + json.dumps(row, ensure_ascii=False) for row in exam["questions"])
        + "\n  ]}"
        for exam in result
    )
    (folder / "exams.json").write_text("[\n" + lines + "\n]\n", encoding="utf-8")
    print(f"{course_id}: {EXAMS} exams of {size} questions ({' / '.join(map(str, quotas))} by domain), "
          f"{len(reserved)} questions reserved for {result[-1]['title']}")


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    course_id = args[0] if args else "capm"
    if (CONTENT / course_id / "exams.json").exists() and "--rebuild" not in sys.argv:
        sys.exit(f"{course_id}/exams.json already exists. Use --rebuild to replace it (this changes every exam).")
    build(course_id)


if __name__ == "__main__":
    main()
