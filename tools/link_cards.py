"""Gives every flashcard the lesson section it comes from, and that section's best-matching book source.

Usage: python tools/link_cards.py            write web/src/content/card-links/<course>.json
       python tools/link_cards.py --report   also list how each card was matched (for checking by hand)

The cards themselves are not changed (CAPM and PMP are closed, tools/check_frozen.py): the links live in
their own file per course, which the app reads to show "Source: ... Open the PDF at page ..." and
"In the lesson: ..." under a turned card.

How a card finds its section, in this order:
  1. tools/card-links-fixes.json, "<course>/<module>/<card id>": "<section title>" (checked by hand);
  2. the first section whose heading or text contains the card's term (its front, without brackets);
  3. the section sharing the most words with the card, rare words counting more.
Within that section, the source whose label shares the most words with the card; else its first source.
"""
import json
import math
import re
import sys
from pathlib import Path

# The sections without a book source of their own (summaries and exam tips), as the content check knows them.
from check_content import SUMMARY_SECTION as SUMMARY

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "web" / "src" / "content"
OUT = CONTENT / "card-links"
FIXES = ROOT / "tools" / "card-links-fixes.json"
# Words in every source label, which say nothing about the topic.
NOISE = {"pmbok", "guide", "section", "standard", "figure", "table", "edition", "agile", "practice", "with", "that",
         "this", "from", "their", "when", "what", "which", "into", "than", "more", "they", "each", "does", "used"}


def words(text: str) -> set[str]:
    return {w for w in re.findall(r"[a-z0-9]+", text.lower()) if len(w) > 3 and w not in NOISE}


def sections(lesson: str) -> list[dict]:
    """The lesson's "## " sections (summaries and exam tips left out): title, text and source labels."""
    found, current = [], None
    for line in lesson.splitlines():
        if line.startswith("## "):
            current = {"title": line[3:].replace("*", "").replace("`", "").strip(), "text": "", "refs": [], "lines": []}
            found.append(current)
        elif current is not None:
            if line.startswith("@source "):
                current["refs"] = [r.strip() for r in line[8:].split(";") if r.strip()]
            else:
                current["text"] += " " + line
                if line.strip():
                    current["lines"].append(line)
    return [s for s in found if not SUMMARY.match(s["title"])]


def term_of(front: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"\(.*?\)", "", front)).strip().lower().rstrip("?.:")


def link_module(course: str, folder: Path, fixes: dict, report: list[str]) -> dict:
    secs = sections((folder / "lesson.md").read_text(encoding="utf-8"))
    linked = {s["label"] for s in json.loads((folder / "sources.json").read_text(encoding="utf-8"))} \
        if (folder / "sources.json").is_file() else set()
    cards = json.loads((folder / "flashcards.json").read_text(encoding="utf-8"))
    # Every line of the lesson (bullet, paragraph, table row) with its section: a card restates one of them.
    rows = [(i, words(s["title"] + " " + line)) for i, s in enumerate(secs) for line in s["lines"]]
    df: dict[str, int] = {}
    for _, bag in rows:
        for w in bag:
            df[w] = df.get(w, 0) + 1
    out = {}
    for card in cards:
        key = f"{course}/{folder.name}/{card['id']}"
        term = term_of(card["front"])
        how, section = "", None
        if key in fixes:
            section = next((s for s in secs if s["title"] == fixes[key]), None)
            how = "fixed" if section else "FIX NOT FOUND"
        mine = words(card["front"] + " " + card["back"])
        # A section's score: its line closest to the card, rare words counting more.
        line_score = lambda bag: sum(math.log(1 + len(rows) / df[w]) for w in mine & bag)
        best_line: dict[int, float] = {}
        for i, bag in rows:
            best_line[i] = max(best_line.get(i, 0.0), line_score(bag))
        weight = lambda i: best_line.get(i, 0.0)
        if section is None and len(term) > 3:
            # Of the sections that use the term, the one closest to the whole card (a passing mention loses).
            having = [i for i, s in enumerate(secs) if term in (s["title"] + " " + s["text"]).lower()]
            if having:
                section, how = secs[max(having, key=weight)], "term"
        if section is None and secs:
            best = max(range(len(secs)), key=weight)
            if weight(best) > 0:
                section, how = secs[best], f"words {weight(best):.1f}"
        if section is None:
            report.append(f"NONE   {key} | {card['front']}")
            continue
        refs = [r for r in section["refs"] if r in linked]
        ref = max(refs, key=lambda r: (len(mine & words(r)), -refs.index(r))) if refs else None
        out[card["id"]] = {"section": section["title"], **({"ref": ref} if ref else {})}
        report.append(f"{how:<12} {key} | {card['front']} -> {section['title']} [{ref or 'no source'}]")
    return out


def main() -> None:
    fixes = json.loads(FIXES.read_text(encoding="utf-8")) if FIXES.is_file() else {}
    report: list[str] = []
    OUT.mkdir(exist_ok=True)
    for course_file in sorted(CONTENT.glob("*/course.json")):
        course = json.loads(course_file.read_text(encoding="utf-8"))
        if course.get("testOnly"):
            continue
        links = {}
        for module in (m for d in course["domains"] for m in d["modules"] if m["ready"]):
            folder = course_file.parent / "modules" / module["id"]
            links[module["id"]] = link_module(course["id"], folder, fixes, report)
        path = OUT / f"{course['id']}.json"
        # Written without a byte order mark, one module per line, so a change shows clearly in git.
        body = "{\n" + ",\n".join(f"{json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}" for k, v in links.items()) + "\n}\n"
        path.write_bytes(body.encode("utf-8"))
        count = sum(len(v) for v in links.values())
        print(f"{course['id']}: {count} cards linked")
    kinds: dict[str, int] = {}
    for line in report:
        kind = line.split()[0]
        kinds[kind] = kinds.get(kind, 0) + 1
    print("how:", ", ".join(f"{k} {v}" for k, v in sorted(kinds.items())))
    if "--report" in sys.argv:
        print("\n".join(report))


if __name__ == "__main__":
    main()
