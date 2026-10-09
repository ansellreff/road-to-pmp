"""Make browser-readable copies of the protected books.

Some PMI PDFs are encrypted with a blank password. Desktop PDF readers open them
without asking, but the Edge browser's viewer shows a password prompt and will
not accept a blank one. This writes an unencrypted copy of each such book to
.cache/pdf/<id>.pdf, which the local source links then use.

The copies are for viewing on this PC only: .cache/ is excluded from git and is
never deployed. The pages are unchanged, including the "Licensed To" line.

Usage: python tools/unlock_pdfs.py
Run again after adding a book to web/src/content/books.json.
"""
import json
import logging
from pathlib import Path

from pypdf import PdfReader, PdfWriter

logging.getLogger("pypdf").setLevel(logging.ERROR)

ROOT = Path(__file__).resolve().parent.parent
BOOKS = json.loads((ROOT / "web" / "src" / "content" / "books.json").read_text(encoding="utf-8"))
OUT = ROOT / ".cache" / "pdf"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for book_id, info in BOOKS.items():
        source = ROOT / "PMI Learning Material" / info["file"]
        target = OUT / f"{book_id}.pdf"
        if not source.is_file():
            print(f"{book_id}: '{info['file']}' is not in PMI Learning Material, skipped")
            continue
        reader = PdfReader(source)
        if not reader.is_encrypted:
            target.unlink(missing_ok=True)
            print(f"{book_id}: not protected, the original is used")
            continue
        if not reader.decrypt(""):
            print(f"{book_id}: needs a real password, cannot be opened; skipped")
            continue
        writer = PdfWriter(clone_from=reader)
        with target.open("wb") as f:
            writer.write(f)

        check = PdfReader(target)
        same_pages = len(check.pages) == len(reader.pages)
        same_text = check.pages[30].extract_text() == reader.pages[30].extract_text()
        if check.is_encrypted or not same_pages or not same_text:
            target.unlink()
            print(f"{book_id}: the copy did not verify, removed")
            continue
        print(f"{book_id}: copy written, {len(check.pages)} pages, {target.stat().st_size // 1_000_000} MB")


if __name__ == "__main__":
    main()
