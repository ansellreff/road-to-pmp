"""Build the fixed mock exams for a course from its quiz questions.

Usage: python tools/build_exams.py [course] [--rebuild]
       python tools/build_exams.py [course] --add            one more unseen exam
       python tools/build_exams.py [course] --add --mixed    one more exam with the real exam's question types

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


def option_order(question: dict, letter: int, rng: random.Random) -> list[int]:
    """The order in which an exam shows a question's options: order[shown position] = position in the file.

    Single answer: the right option goes to the given letter, the others are mixed around it.
    Matching: the right-hand items are mixed, never left beside their partners.
    Hot spot: the areas are fixed on the drawing, so the order is left alone.
    """
    if question.get("type") == "match":
        order = list(range(len(question["right"])))
        while order == sorted(order):
            rng.shuffle(order)
        return order
    order = list(range(len(question["options"])))
    if question.get("type") == "hotspot" or POSITIONAL.search(question["explanation"]):
        return order
    others = [i for i in order if i != question["answer"]]
    rng.shuffle(others)
    letter = min(letter, len(others))
    return others[:letter] + [question["answer"]] + others[letter:]


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
            rows.append([module, qid, option_order(question, letter, rng)])
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
# rule" in docs/CAPM-PLAN.md). They stay in their module quizzes and are kept out of an added exam.
NOT_FOR_EXAMS = ("list of things that can be tailored", "Drexler / Sibbet", "six ways of addressing conflict")


# In a mixed exam, the share of questions that are not plain multiple choice. PMI does not
# publish the real share; it says only that most questions are multiple choice.
TYPED_SHARE = 0.15


def kind_of(question: dict) -> str:
    if question.get("type"):
        return question["type"]
    return "strip" if "strip" in question else "plain"


def take(pools: dict[str, list[str]], count: int) -> list[tuple[str, str]]:
    """Take count questions, one module after another, the newest of each module first."""
    taken = []
    while len(taken) < count and any(pools.values()):
        for name in pools:
            if pools[name] and len(taken) < count:
                taken.append((name, pools[name].pop()))
    return taken


def add_exam(course_id: str, mixed: bool = False) -> None:
    """Add one more exam from questions that are in no exam yet. The existing exams do not change.

    The newest questions of each module are taken first, one module after another, so the exam
    is spread over the modules and holds the questions least likely to have been seen.

    Without mixed: multiple choice only, and unseen (its questions leave the module quizzes).
    With mixed: about 15% matching, hot spot and comic strip questions, half of them matching.
    Its questions stay in the module quizzes, which would otherwise be left too small.
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
            pools[module["id"]] = sorted(free, key=lambda q: int(q["id"][1:]))
        of_kind = lambda kind: {name: [q["id"] for q in free if kind_of(q) == kind] for name, free in pools.items()}
        typed = round(quota * TYPED_SHARE) if mixed else 0
        wanted = {"match": typed - typed // 2, "hotspot": typed // 4, "strip": typed // 2 - typed // 4}
        chosen = []
        for kind, count in wanted.items():
            got = take(of_kind(kind), count)
            if len(got) < count:
                sys.exit(f"{domain['id']}: {len(got)} unused {kind} questions, {count} needed")
            chosen += got
        plain = take(of_kind("plain"), quota - len(chosen))
        if len(chosen) + len(plain) < quota:
            sys.exit(f"{domain['id']}: {len(chosen) + len(plain)} unused questions, {quota} needed")
        picked += chosen + plain

    by_id = {(m, q["id"]): q for m, qs in quizzes.items() for q in qs}
    rng.shuffle(picked)
    letters = [i % 4 for i in range(len(picked))]
    rng.shuffle(letters)
    rows = []
    for (module, qid), letter in zip(picked, letters):
        question = by_id[(module, qid)]
        rows.append([module, qid, option_order(question, letter, rng)])
        if not mixed:
            question["examOnly"] = True
    exams.append({"id": f"mock-{number}", "title": f"Mock exam {number}", "unseen": not mixed, **({"mixed": True} if mixed else {}), "questions": rows})

    if not mixed:
        for module in {m for m, _ in picked}:
            path = folder / "modules" / module / "quiz.json"
            path.write_text(json.dumps(quizzes[module], indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    write_exams(folder, exams)
    kinds = {}
    for module, qid in picked:
        kinds[kind_of(by_id[(module, qid)])] = kinds.get(kind_of(by_id[(module, qid)]), 0) + 1
    print(f"{course_id}: Mock exam {number} added, {len(rows)} questions ({' / '.join(map(str, quotas))} by domain), {kinds}, "
          + ("left in the module quizzes" if mixed else "all kept out of the module quizzes"))


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    course_id = args[0] if args else "capm"
    if "--add" in sys.argv:
        add_exam(course_id, mixed="--mixed" in sys.argv)
        return
    if (CONTENT / course_id / "exams.json").exists() and "--rebuild" not in sys.argv:
        sys.exit(f"{course_id}/exams.json already exists. Use --rebuild to replace it (this changes every exam).")
    build(course_id)


if __name__ == "__main__":
    main()
