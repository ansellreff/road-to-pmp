"""Build toc.txt for the Agile Practice Guide, First Edition.

That PDF has no outline, so tools/extract_pdf.py writes an empty toc.txt. This
reads the printed contents pages instead and converts printed page numbers to
PDF page numbers. Annex and appendix subsections (A3.1, X3.2 ...) are not in the
printed contents, so they are found from their headings in the page text.

Usage: python tools/build_toc_agile1.py   (after extract_pdf.py ... agile1)
"""
import re
from pathlib import Path

BOOK = Path(".cache/books/agile1")
CONTENTS = range(8, 12)  # PDF pages holding the printed table of contents
OFFSET = 15  # printed page 1 is PDF page 16


def main() -> None:
    pages = [f.read_text(encoding="utf-8") for f in sorted((BOOK / "pages").glob("*.txt"))]
    lines: list[str] = []
    seen: set[str] = set()

    for number in CONTENTS:
        text = pages[number - 1]
        # "4.2 servant Leadership ......33" (the page number may wrap to the next line)
        for m in re.finditer(r"^(\d+(?:\.\d+)*)\.? +(.+?) ?\.{3,}\s*(\d+)\s*$", text, re.MULTILINE):
            section, title, printed = m.group(1), m.group(2).strip(), int(m.group(3))
            lines.append(f"{'  ' * section.count('.')}{section}. {title}  [p{printed + OFFSET}]")
            seen.add(section)
        for m in re.finditer(r"^(AnnEX|APPEnDIX) ([AX]\d)\s*\n(.+?) ?\.{3,}\s*(\d+)\s*$", text, re.MULTILINE):
            lines.append(f"{m.group(2)}. {m.group(3).strip()}  [p{int(m.group(4)) + OFFSET}]")
            seen.add(m.group(2))
        m = re.search(r"^GLossARY ?\.{3,}\s*(\d+)", text, re.MULTILINE)
        if m:
            lines.append(f"Glossary  [p{int(m.group(1)) + OFFSET}]")

    for number, text in enumerate(pages, start=1):
        if number <= 15:
            continue
        for m in re.finditer(r"^([AX]\d(?:\.\d+)+) +([A-Za-z][^\n]{2,70})$", text, re.MULTILINE):
            if m.group(1) not in seen:
                seen.add(m.group(1))
                lines.append(f"  {m.group(1)}. {m.group(2).strip()}  [p{number}]")

    (BOOK / "toc.txt").write_text("\n".join(lines), encoding="utf-8")
    print(f"agile1: {len(lines)} toc entries written")


if __name__ == "__main__":
    main()
