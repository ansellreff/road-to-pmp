"""Turn the text reference of every quiz question into book + PDF page links.

For each question's "ref" (for example "PMBOK 8, Standard 1.2") this finds the
PDF page where that section, figure, table or tool description starts, and
writes it into the question as "links". It also writes sources.json for each
module: the list of all sections that module draws on.

Usage: python tools/link_sources.py
Needs the extracted book text in .cache/books/ (see tools/extract_pdf.py).
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


def pages(book: str) -> list[str]:
    if book not in _pages:
        files = sorted((CACHE / book / "pages").glob("*.txt"))
        if not files:
            sys.exit(f"No extracted text for '{book}'. Run tools/extract_pdf.py first.")
        _pages[book] = [f.read_text(encoding="utf-8") for f in files]
    return _pages[book]


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
        section = re.search(r"sections? (\d+)", lowered)
        if section:
            toc = (CACHE / book / "toc.txt").read_text(encoding="utf-8")
            hit = re.search(rf"^{section.group(1)}\. .*\[p(\d+)\]", toc, re.MULTILINE)
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
            page = find_line(book, rf"^{re.escape(wanted)}:?\s+[A-Z]\w+ ?[A-Za-z]", *region, flags=0)
            if page:
                return book, page
            wanted = wanted.rpartition(".")[0]  # fall back to the parent section

    section = re.search(r"section (\d+)", lowered)
    if section:
        folder_toc = (CACHE / book / "toc.txt").read_text(encoding="utf-8")
        hits = re.findall(rf"^\s*(?:Section )?{section.group(1)}[:.] .*\[p(\d+)\]", folder_toc, re.MULTILINE)
        for hit in hits:
            if region[0] <= int(hit) <= region[1]:
                return book, int(hit)
    return book, region[0]


def main() -> None:
    unresolved = []
    for quiz_file in sorted(CONTENT.glob("*/modules/*/quiz.json")):
        questions = json.loads(quiz_file.read_text(encoding="utf-8"))
        module_sources: dict[tuple[str, int], str] = {}
        for q in questions:
            links = []
            for part in re.split(r";", q.get("ref", "")):
                found = resolve(part)
                if found:
                    book, page = found
                    label = part.strip()
                    links.append({"book": book, "page": page, "label": label})
                    module_sources.setdefault((book, page), label)
            q["links"] = links
            if not links:
                unresolved.append(f"{quiz_file.parent.name} [{q['id']}]: {q.get('ref')}")
        quiz_file.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        sources = [
            {"book": book, "page": page, "label": label}
            for (book, page), label in sorted(module_sources.items())
        ]
        (quiz_file.parent / "sources.json").write_text(
            json.dumps(sources, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
        print(f"{quiz_file.parent.name}: {len(questions)} questions, {len(sources)} source pages")

    if unresolved:
        print(f"\n{len(unresolved)} question(s) have no book reference:")
        for line in unresolved:
            print(" -", line)


if __name__ == "__main__":
    main()
