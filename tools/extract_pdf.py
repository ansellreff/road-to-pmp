"""Extract a PDF to one text file per page, plus its table of contents.

Usage: python tools/extract_pdf.py <pdf> <slug>
Output: .cache/books/<slug>/pages/0001.txt ... and .cache/books/<slug>/toc.txt
Page numbers are PDF page numbers (1-based), not the numbers printed in the book.
"""
import logging
import sys
from pathlib import Path

from pypdf import PdfReader

logging.getLogger("pypdf").setLevel(logging.ERROR)


def walk(reader: PdfReader, items, depth: int, lines: list[str]) -> None:
    for item in items:
        if isinstance(item, list):
            walk(reader, item, depth + 1, lines)
            continue
        try:
            page = reader.get_destination_page_number(item) + 1
        except Exception:
            page = 0
        lines.append(f"{'  ' * depth}{item.title}  [p{page}]")


def main() -> None:
    pdf, slug = Path(sys.argv[1]), sys.argv[2]
    out = Path(".cache/books") / slug
    pages_dir = out / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(pdf)

    lines: list[str] = []
    walk(reader, reader.outline, 0, lines)
    (out / "toc.txt").write_text("\n".join(lines), encoding="utf-8")

    empty = 0
    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        if len(text.strip()) < 20:
            empty += 1
        (pages_dir / f"{i:04d}.txt").write_text(text, encoding="utf-8")
    print(f"{pdf.name}: {len(reader.pages)} pages, {len(lines)} toc entries, {empty} near-empty pages -> {out}")


if __name__ == "__main__":
    main()
