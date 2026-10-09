"""Turn text references into book + PDF page links.

References come from two places in each module:
  - quiz.json: each question's "ref", for example "PMBOK 8, Standard 1.2"
  - lesson.md: an "@source ref; ref" line under a section heading

For each reference this finds the PDF page where that section, figure, table,
glossary term or tool description starts. It writes the result into each quiz
question as "links", and writes sources.json for the module: every reference
used, with its book and page. The app reads both.

Usage: python tools/link_sources.py
Needs the extracted book text in .cache/books/ (see tools/extract_pdf.py).
Exits with code 1 if a reference cannot be matched to a book.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "web" / "src" / "content"
CACHE = ROOT / ".cache" / "books"

# Page ranges (PDF pages) of the parts of each book, used to search in the right place.
REGIONS = {
    "pmbok8": {"standard": (24, 107), "guide": (108, 321), "appendix": (322, 369), "glossary": (370, 381)},
    "pmbok7": {"standard": (28, 87), "guide": (96, 291)},
}

_pages: dict[str, list[str]] = {}
_tocs: dict[str, str] = {}


def pages(book: str) -> list[str]:
    if book not in _pages:
        files = sorted((CACHE / book / "pages").glob("*.txt"))
        if not files:
            sys.exit(f"No extracted text for '{book}'. Run tools/extract_pdf.py first.")
        _pages[book] = [f.read_text(encoding="utf-8") for f in files]
    return _pages[book]


def toc(book: str) -> str:
    if book not in _tocs:
        _tocs[book] = (CACHE / book / "toc.txt").read_text(encoding="utf-8")
    return _tocs[book]


def find_line(book: str, pattern: str, first: int = 1, last: int | None = None, flags: int = re.IGNORECASE) -> int | None:
    """First PDF page in [first, last] with a line matching the pattern."""
    text = pages(book)
    rx = re.compile(pattern, re.MULTILINE | flags)
    for number in range(first, (last or len(text)) + 1):
        if rx.search(text[number - 1]):
            return number
    return None


def which_book(part: str) -> str | None:
    lowered = part.lower()
    if "pmbok 8" in lowered:
        return "pmbok8"
    if "pmbok 7" in lowered:
        return "pmbok7"
    if "code of ethics" in lowered:
        return "ethics"
    if "process groups" in lowered:
        return "processgroups"
    return None


def resolve(part: str) -> tuple[str, int] | None:
    book = which_book(part)
    if not book:
        return None
    lowered = part.lower()

    if book == "ethics":
        number = re.search(r"\b(\d\.\d(?:\.\d)?)\b", part)
        if number:
            page = find_line("ethics", rf"^\s*{re.escape(number.group(1))}\b", 4)
            if page:
                return book, page
        chapter = re.search(r"chapter (\d)", lowered)
        if chapter:
            page = find_line("ethics", rf"^Chapter {chapter.group(1)}\b", 4)
            if page:
                return book, page
        return book, 4

    if book == "processgroups":
        # Its table of contents lists every section as "3.3.2. Title  [p83]".
        number = re.search(r"\b(\d+(?:\.\d+)+)\b", part)
        section = re.search(r"sections? (\d+)", lowered)
        wanted = number.group(1) if number else section.group(1) if section else None
        if wanted:
            hit = re.search(rf"^\s*{re.escape(wanted)}\. .*\[p(\d+)\]", toc(book), re.MULTILINE)
            if hit:
                return book, int(hit.group(1))
        return book, 22

    regions = REGIONS[book]
    only_glossary = "glossary" in lowered and not re.search(r"\d\.\d", part)
    if only_glossary and "glossary" in regions:
        term = re.search(r"\(([^)]+)\)", part)  # "Glossary (risk mitigation)" opens that term's page
        if term:
            page = find_line(book, rf"^{re.escape(term.group(1))}\. ", *regions["glossary"])
            if page:
                return book, page
        return book, regions["glossary"][0]
    if "appendix" in lowered and "appendix" in regions:
        region = regions["appendix"]
    elif "standard" in lowered:
        region = regions["standard"]
    else:
        region = regions["guide"]

    # Most specific first: a named figure or table, then a named tool, then a section number.
    figure = re.search(r"(figure|table) (x?\d+-\d+)", lowered)
    if figure:
        page = find_line(book, rf"^{figure.group(1)} {figure.group(2)}\.", *region)
        if page:
            return book, page

    # "Guide section 5, Conflict management": the tool's own entry in the alphabetical list.
    named = re.search(r"section ([45]), (.+)$", part.strip(), re.IGNORECASE)
    if named and book == "pmbok8":
        listing = (218, 249) if named.group(1) == "4" else (250, 321)
        name = named.group(2).strip()
        for candidate in (name, name.split(" and ")[0]):
            page = find_line(book, rf"^[^A-Za-z\n]*{re.escape(candidate)}\.", *listing, flags=0)
            if page:
                return book, page

    # A section heading looks like "3.4<space>Focus on Value" (the books use an en space).
    number = re.search(r"\b(x?\d+(?:\.\d+)+)\b", part, re.IGNORECASE)
    if number:
        wanted = number.group(1)
        while "." in wanted:
            page = find_line(book, rf"^{re.escape(wanted)}:?\s+[A-Z][a-z]", *region, flags=0)
            if page:
                return book, page
            wanted = wanted.rpartition(".")[0]  # fall back to the parent section

    section = re.search(r"section (\d+)", lowered)
    if section:
        hits = re.findall(rf"^\s*(?:Section )?{section.group(1)}[:.] .*\[p(\d+)\]", toc(book), re.MULTILINE)
        for hit in hits:
            if region[0] <= int(hit) <= region[1]:
                return book, int(hit)
    return book, region[0]


def split_refs(text: str) -> list[str]:
    return [part.strip() for part in text.split(";") if part.strip()]


def main() -> None:
    unresolved = []
    for module in sorted(p.parent for p in CONTENT.glob("*/modules/*/quiz.json")):
        found: dict[str, dict] = {}

        def link(part: str, where: str) -> dict | None:
            result = resolve(part)
            if not result:
                # A reference such as "PMI standard teaching" names no book: shown as text only.
                if "teaching" in part.lower():
                    return None
                unresolved.append(f"{module.name} ({where}): {part}")
                return None
            entry = {"book": result[0], "page": result[1], "label": part}
            found[part] = entry
            return entry

        quiz_file = module / "quiz.json"
        questions = json.loads(quiz_file.read_text(encoding="utf-8"))
        for q in questions:
            q["links"] = [e for e in (link(part, q["id"]) for part in split_refs(q.get("ref", ""))) if e]
        quiz_file.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        lesson = module / "lesson.md"
        sections = 0
        if lesson.is_file():
            for line in lesson.read_text(encoding="utf-8").splitlines():
                if line.startswith("@source "):
                    sections += 1
                    for part in split_refs(line[len("@source "):]):
                        link(part, "lesson")

        sources = sorted(found.values(), key=lambda e: (e["book"], e["page"], e["label"]))
        (module / "sources.json").write_text(json.dumps(sources, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"{module.name}: {len(questions)} questions, {sections} lesson sections, {len(sources)} references")

    if unresolved:
        print(f"\n{len(unresolved)} reference(s) could not be matched to a book:")
        for line in unresolved:
            print(" -", line)
        sys.exit(1)


if __name__ == "__main__":
    main()
