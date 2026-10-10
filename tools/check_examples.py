"""Recompute every calculation written out in the course content.

Finds text of the form "<numbers and operators> = <number>" in lessons, quizzes and
flashcards (for example "(18 + 22 + 20) ÷ 3 = 20" or "3 × 0.4 = 1.2") and checks
that the two sides really are equal. Chains such as "1.2 + 0.6 = 1.8" inside a longer
line are each checked.

Usage: python tools/check_examples.py [--all]
Exits with code 1 if a calculation does not add up. --all also lists the ones that do.
"""
import json
import re
import sys
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "web" / "src" / "content"

NUMBER = r"\d+(?:\.\d+)?%?"
# One side of an equation: numbers joined by operators, with optional brackets.
SIDE = rf"\(*-?{NUMBER}\)*(?:\s*[-+*/]\s*\(*-?{NUMBER}\)*)*"
TAIL = re.compile(rf"({SIDE})\s*$")
HEAD = re.compile(rf"^\s*({SIDE})")


def clean(text: str) -> str:
    text = text.replace("**", "").replace("`", "").replace("$", "").replace("US", "")
    text = text.replace("×", "*").replace("÷", "/").replace("−", "-").replace("–", "-")
    text = re.sub(r"(?<=\d),(?=\d{3}\b)", "", text)  # 400,000 -> 400000
    return text


def values(side: str) -> set[float] | None:
    """The value of one side. A percentage is tried both as written and divided by 100."""
    results = set()
    for percent in ("/100", ""):
        expression = re.sub(r"(\d+(?:\.\d+)?)%", rf"(\1{percent})", side)
        if not re.fullmatch(r"[\d.+\-*/() ]+", expression):
            return None
        try:
            results.add(float(eval(expression, {"__builtins__": {}})))  # digits and operators only
        except (SyntaxError, ZeroDivisionError, TypeError):
            return None
    return results


def decimals(side: str) -> int:
    shown = re.findall(r"\d+\.(\d+)", side)
    return max((len(d) for d in shown), default=0)


def agree(left: str, right: str) -> bool | None:
    a, b = values(left), values(right)
    if a is None or b is None:
        return None
    # The result may be rounded to the number of decimals it is written with.
    places = decimals(right)
    for x in a:
        for y in b:
            if abs(x - y) <= 0.5 * 10 ** -places + 1e-9 or (y and abs(x - y) / abs(y) < 0.005):
                return True
    return False


def equations(text: str):
    parts = re.split(r"\s*[=≈]\s*", clean(text))
    for left, right in zip(parts, parts[1:]):
        tail, head = TAIL.search(left), HEAD.search(right)
        if not tail or not head:
            continue
        # "ES + duration - 1 = 6 + 5 - 1": the left side is part of a formula in words, not a sum.
        if re.search(r"[-+*/(]\s*$", left[: tail.start()]) or re.match(r"\s*[-+*/]", right[head.end():]):
            continue
        lhs, rhs = tail.group(1), head.group(1)
        if not re.search(r"\d\s*[-+*/]\s*\(*-?\d", lhs + " " + rhs):
            continue  # "x = 5": nothing to compute
        yield lhs.strip(), rhs.strip()


def texts(module: Path):
    lesson = module / "lesson.md"
    if lesson.is_file():
        for number, line in enumerate(lesson.read_text(encoding="utf-8").splitlines(), start=1):
            yield f"lesson.md line {number}", line
    for q in json.loads((module / "quiz.json").read_text(encoding="utf-8")):
        for field in ("q", "explanation"):
            yield f"quiz {q['id']} {field}", q.get(field, "")
        for i, option in enumerate(q.get("options", [])):
            yield f"quiz {q['id']} option {'ABCD'[i]}", option
    for c in json.loads((module / "flashcards.json").read_text(encoding="utf-8")):
        yield f"flashcard {c['id']}", c.get("front", "") + " | " + c.get("back", "")


def critical_path(module: Path) -> list[str]:
    """Recompute the forward and backward pass of the lesson's network (day-1 convention)."""
    lesson = (module / "lesson.md").read_text(encoding="utf-8")
    network = re.findall(r"^\| ([A-Z]) \| (\d+) \| (none[^|]*|[A-Z](?: and [A-Z])*) \|$", lesson, re.MULTILINE)
    # Pass tables: activity, duration, start, finish, a note in words.
    passes = re.findall(r"^\| ([A-Z]) \| (\d+) \| \**(\d+)\** \| \**(\d+)\** \| [^|]+\|$", lesson, re.MULTILINE)
    # Float table: activity, ES, EF, LS, LF, total float, free float.
    floats = re.findall(r"^\| ([A-Z]) \| " + r" \| ".join([r"\**(\d+)\**"] * 6) + r" \|$", lesson, re.MULTILINE)
    if not network or len(passes) != 2 * len(network) or len(floats) != len(network):
        return [f"{module.name}: could not read the network example ({len(network)} activities, {len(passes)} pass rows, {len(floats)} float rows)"]
    duration = {a: int(d) for a, d, _ in network}
    before = {a: [] if p.startswith("none") else p.split(" and ") for a, _, p in network}
    after = {a: [b for b in duration if a in before[b]] for a in duration}
    es, ef, ls, lf = {}, {}, {}, {}
    for a in duration:  # listed in dependency order
        es[a] = max((ef[p] for p in before[a]), default=0) + 1
        ef[a] = es[a] + duration[a] - 1
    end = max(ef.values())
    for a in reversed(list(duration)):
        lf[a] = min((ls[s] for s in after[a]), default=end + 1) - 1
        ls[a] = lf[a] - duration[a] + 1
    found = []
    forward, backward = passes[: len(network)], passes[len(network):]
    for a, _, start, finish in forward:
        if (int(start), int(finish)) != (es[a], ef[a]):
            found.append(f"{module.name}: forward pass {a} shows {start}-{finish}, should be {es[a]}-{ef[a]}")
    for a, _, start, finish in backward:
        if (int(start), int(finish)) != (ls[a], lf[a]):
            found.append(f"{module.name}: backward pass {a} shows {start}-{finish}, should be {ls[a]}-{lf[a]}")
    for a, *shown in floats:
        free = min((es[s] for s in after[a]), default=end + 1) - ef[a] - 1
        correct = [es[a], ef[a], ls[a], lf[a], ls[a] - es[a], free]
        if [int(x) for x in shown] != correct:
            found.append(f"{module.name}: float table {a} shows {shown}, should be {correct}")
    stated = re.search(r"project takes \**(\d+) days", lesson)
    if stated and int(stated.group(1)) != end:
        found.append(f"{module.name}: lesson says {stated.group(1)} days, network gives {end}")
    return found


def main() -> None:
    checked, wrong = 0, []
    cpm = CONTENT / "capm" / "modules" / "2-05-critical-path"
    if cpm.is_dir():
        wrong += critical_path(cpm)
        checked += 1
    for module in sorted(p.parent for p in CONTENT.glob("*/modules/*/quiz.json")):
        for where, text in texts(module):
            for lhs, rhs in equations(text):
                result = agree(lhs, rhs)
                if result is None:
                    continue
                checked += 1
                if not result:
                    wrong.append(f"{module.name}, {where}: {lhs} = {rhs}")
                elif "--all" in sys.argv:
                    print(f"  ok  {module.name}, {where}: {lhs} = {rhs}")
    # The formula sheet repeats worked examples from the lessons.
    for sheet in sorted(CONTENT.glob("*/sheet.json")):
        for group in json.loads(sheet.read_text(encoding="utf-8")):
            for entry in group["entries"]:
                for lhs, rhs in equations(entry.get("example", "")):
                    result = agree(lhs, rhs)
                    if result is None:
                        continue
                    checked += 1
                    if not result:
                        wrong.append(f"{sheet.parent.name} formula sheet, {entry['name']}: {lhs} = {rhs}")
                    elif "--all" in sys.argv:
                        print(f"  ok  formula sheet, {entry['name']}: {lhs} = {rhs}")
    print(f"{checked} calculations checked, {len(wrong)} do not add up")
    for line in wrong:
        print(" -", line)
    sys.exit(1 if wrong else 0)


if __name__ == "__main__":
    main()
