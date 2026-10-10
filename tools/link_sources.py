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
    "pmbok7": {"standard": (28, 87), "guide": (96, 291), "glossary": (328, 349)},
}

# Books whose sections are looked up in their table of contents, with the PDF page
# to open when a section is not found (the start of chapter 1).
TOC_BOOKS = {
    "processgroups": 22,
    "scheduling": 16,
    "evm": 14,
    "riskstd": 18,
    "wbs": 18,
    "estimating": 12,
    "riskguide": 16,
    "agile": 18,
    "pmbok6": 33,
    "agile1": 16,  # no PDF outline: its toc.txt comes from tools/build_toc_agile1.py
    "baguide": 48,
}

# Books whose headings have no numbers: a section is named by its title, for example
# "The Scrum Guide, Sprint Planning". The value is the page to open when no title is given.
TITLE_BOOKS = {
    "scrum": 2,
    "bapg": 12,
    "wysocki": 62,
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
    if "pmbok 6" in lowered:
        return "pmbok6"
    if "exam content outline" in lowered:
        return "eco"
    if "scrum guide" in lowered:
        return "scrum"
    if "project management answer book" in lowered:
        return "answerbook"
    if "effective project management" in lowered:
        return "wysocki"
    if "business analysis for practitioners" in lowered:
        return "bapg"
    if "guide to business analysis" in lowered:
        return "baguide"
    if "code of ethics" in lowered:
        return "ethics"
    if "process groups" in lowered:
        return "processgroups"
    if "practice standard for scheduling" in lowered:
        return "scheduling"
    if "standard for earned value management" in lowered:
        return "evm"
    if "standard for risk management" in lowered:
        return "riskstd"
    if "work breakdown structures" in lowered:
        return "wbs"
    if "practice standard for project estimating" in lowered:
        return "estimating"
    if "risk management: a practice guide" in lowered:
        return "riskguide"
    if "agile practice guide, first edition" in lowered:
        return "agile1"
    if "agile practice guide" in lowered:
        return "agile"
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

    if book == "eco":
        # "CAPM Exam Content Outline, Domain 3" opens that domain's task list.
        domain = re.search(r"domain (\d)", lowered)
        if domain:
            page = find_line("eco", rf"^Domain {domain.group(1)}\b", 7)
            return ("eco", page) if page else None
        return book, 5

    if book == "answerbook":
        # "Chapter 6, Q8": the book is written as numbered questions within each chapter.
        chapter = re.search(r"chapter (\d+)", lowered)
        if not chapter:
            return book, 18
        starts = {int(n): int(p) for n, p in re.findall(r"^CHAPTER (\d+):.*\[p(\d+)\]", toc(book), re.MULTILINE)}
        first = starts.get(int(chapter.group(1)))
        if not first:
            return None
        question = re.search(r"\bq(\d+)\b", lowered)
        if not question:
            return book, first
        last = starts.get(int(chapter.group(1)) + 1, first + 60) - 1
        page = find_line(book, rf"^Q{question.group(1)}\.", first, last, flags=0)
        return (book, page) if page else None

    if book in TITLE_BOOKS:
        title = part.split(",", 1)[1].strip() if "," in part else ""
        if not title:
            return book, TITLE_BOOKS[book]
        hit = re.search(
            rf"^\s*(?:\d+: )?{re.escape(title)}\s+\[p(\d+)\]", toc(book), re.MULTILINE | re.IGNORECASE
        )
        return (book, int(hit.group(1))) if hit else None

    if book in TOC_BOOKS:
        # Their tables of contents list every section: "3.3.2. Title  [p83]" or "3.4.2 TITLE  [p87]".
        # "Glossary (story point)" opens the glossary page that defines the term.
        if "glossary" in lowered:
            start = re.search(r"^\s*Glossary\s+\[p(\d+)\]", toc(book), re.MULTILINE | re.IGNORECASE)
            first = int(start.group(1)) if start else TOC_BOOKS[book]
            term = re.search(r"\(([^)]+)\)", part)
            if not term:
                return book, first
            page = find_line(book, rf"^{re.escape(term.group(1))}\s*(\([^)]*\)\s*)?\.", first)
            return (book, page) if page else None

        # Section numbers may carry an annex or appendix letter: "A3.2", "X1.4".
        number = re.search(r"\b([AX]?\d+(?:\.\d+)+)\b", part)
        section = re.search(r"sections? (\d+)", lowered)
        wanted = number.group(1) if number else section.group(1) if section else None
        if wanted:
            hit = re.search(
                # \s, not a plain space: some books put an en space after the section number.
                rf"^\s*(?:CHAPTER |Section )?{re.escape(wanted)}[.:]?\s.*\[p(\d+)\]", toc(book), re.MULTILINE
            )
            if hit:
                return book, int(hit.group(1))
            # Deeper sections (PMBOK 6 "12.1.1.6", appendix "X4.5") are not in the contents:
            # find the heading itself in the page text.
            page = find_line(book, rf"^{re.escape(wanted)}\s+[A-Z]", TOC_BOOKS[book], flags=0)
            if page:
                return book, page
            # A section was named but is not in the contents: report it instead of
            # silently linking to the first page.
            return None
        return book, TOC_BOOKS[book]

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
        # An entry starts its own line. Only if there is none, accept a bulleted sub-entry
        # (some tools, such as "Interpersonal skills", are listed inside another entry).
        for prefix in (r"^", r"^[^A-Za-z\n]+"):
            for candidate in (name, name.split(" and ")[0]):
                page = find_line(book, rf"{prefix}{re.escape(candidate)}\.", *listing, flags=0)
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
