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


def write_exams(folder: Path, exams: list[dict]) -> None:
    lines = ",\n".join(
        "  " + json.dumps({k: v for k, v in exam.items() if k != "questions"}, ensure_ascii=False)[:-1]
        + ', "questions": [\n'
        + ",\n".join("    " + json.dumps(row, ensure_ascii=False) for row in exam["questions"])
        + "\n  ]}"
        for exam in exams
    )
    (folder / "exams.json").write_text("[\n" + lines + "\n]\n", encoding="utf-8")


# Questions on topics that fall under an outline task but that no enabler names (see "The outline
# rule" in PROJECT-PLAN.md). They stay in their module quizzes and are kept out of an added exam.
NOT_FOR_EXAMS = ("list of things that can be tailored", "Drexler / Sibbet", "six ways of addressing conflict")


def add_exam(course_id: str) -> None:
    """Add one more unseen exam from questions that are in no exam yet. The existing exams do not change.

    The newest questions of each module are taken first, one module after another, so the exam
    is spread over the modules and holds the questions least likely to have been seen.
    """
    folder = CONTENT / course_id
    course = json.loads((folder / "course.json").read_text(encoding="utf-8"))
    exams = json.loads((folder / "exams.json").read_text(encoding="utf-8"))
    number = len(exams) + 1
    rng = random.Random(SEED + number)
    used = {(m, q) for exam in exams for m, q, _ in exam["questions"]}
    quotas = split(course["exam"]["questions"], [d["weight"] for d in course["domains"]])

    quizzes, picked = {}, []
    for domain, quota in zip(course["domains"], quotas):
        pools = {}
        for module in domain["modules"]:
            path = folder / "modules" / module["id"] / "quiz.json"
            questions = quizzes[module["id"]] = json.loads(path.read_text(encoding="utf-8"))
            free = [q for q in questions if (module["id"], q["id"]) not in used and not any(t in q["q"] for t in NOT_FOR_EXAMS)]
            pools[module["id"]] = [q["id"] for q in sorted(free, key=lambda q: int(q["id"][1:]))]
        if sum(map(len, pools.values())) < quota:
            sys.exit(f"{domain['id']}: {sum(map(len, pools.values()))} unused questions, {quota} needed")
        taken = 0
        while taken < quota:
            for name in pools:
                if pools[name] and taken < quota:
                    picked.append((name, pools[name].pop()))
                    taken += 1

    by_id = {(m, q["id"]): q for m, qs in quizzes.items() for q in qs}
    rng.shuffle(picked)
    letters = [i % 4 for i in range(len(picked))]
    rng.shuffle(letters)
    rows = []
    for (module, qid), letter in zip(picked, letters):
        question = by_id[(module, qid)]
        order = [0, 1, 2, 3]
        if not POSITIONAL.search(question["explanation"]):
            others = [i for i in order if i != question["answer"]]
            rng.shuffle(others)
            order = others[:letter] + [question["answer"]] + others[letter:]
        rows.append([module, qid, order])
        question["examOnly"] = True
    exams.append({"id": f"mock-{number}", "title": f"Mock exam {number}", "unseen": True, "questions": rows})

    for module in {m for m, _ in picked}:
        path = folder / "modules" / module / "quiz.json"
        path.write_text(json.dumps(quizzes[module], indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    write_exams(folder, exams)
    print(f"{course_id}: Mock exam {number} added, {len(rows)} questions ({' / '.join(map(str, quotas))} by domain), all kept out of the module quizzes")


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    course_id = args[0] if args else "capm"
    if "--add" in sys.argv:
        add_exam(course_id)
        return
    if (CONTENT / course_id / "exams.json").exists() and "--rebuild" not in sys.argv:
        sys.exit(f"{course_id}/exams.json already exists. Use --rebuild to replace it (this changes every exam).")
    build(course_id)


if __name__ == "__main__":
    main()
