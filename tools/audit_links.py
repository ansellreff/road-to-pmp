"""Audit every source link after tools/link_sources.py has run.

Checks that each figure or table link opens the page carrying that caption, and lists
links that sit on a book's default page (where a silent fallback would land), so each
can be confirmed by eye.

Usage: python tools/audit_links.py
"""
import json
import re
from pathlib import Path

MODS = Path("web/src/content/capm/modules")
CACHE = Path(".cache/books")
FALLBACK = {"processgroups": 22, "scheduling": 16, "evm": 14, "riskstd": 18, "wbs": 18, "estimating": 12,
            "riskguide": 16, "agile": 18, "pmbok6": 33, "agile1": 16, "baguide": 48, "scrum": 2, "bapg": 12,
            "pmbok8": {24, 108, 322, 370}, "pmbok7": {28, 96, 328}, "ethics": 4, "answerbook": 18, "eco": 5}

def text(book, page):
    return (CACHE / book / "pages" / f"{page:04d}.txt").read_text(encoding="utf-8")

figures = bad = 0
fallbacks = []
seen = set()
for module in sorted(MODS.iterdir()):
    for link in json.loads((module / "sources.json").read_text(encoding="utf-8")):
        key = (link["book"], link["page"], link["label"])
        if key in seen:
            continue
        seen.add(key)
        m = re.search(r"(figure|table) ([AX]?\d+-\d+)", link["label"], re.IGNORECASE)
        if m:
            figures += 1
            caption = re.compile(rf"^{m.group(1)} {m.group(2)}\.", re.IGNORECASE | re.MULTILINE)
            if not caption.search(text(link["book"], link["page"])):
                bad += 1
                print(f"FIGURE NOT ON PAGE: {module.name}: {link['label']} -> {link['book']} p{link['page']}")
        fb = FALLBACK.get(link["book"])
        if fb is not None and (link["page"] in fb if isinstance(fb, set) else link["page"] == fb):
            fallbacks.append(f"{module.name}: {link['label']} -> {link['book']} p{link['page']}")

print(f"{len(seen)} distinct links checked; {figures} figure/table links, {bad} not on their page")
print(f"{len(fallbacks)} links on a book's fallback page:")
for line in fallbacks:
    print("  ", line)
