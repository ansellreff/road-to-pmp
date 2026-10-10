"""Check that nothing private or copyrighted would be uploaded.

Usage: python tools/check_publish.py
Run before every upload to GitHub. Exits with code 1 if anything is wrong.

Checks every file Git tracks, and the built site in web/dist if it exists:
  - no PDF, and nothing from the book folders or the local caches
  - no file larger than 1 MB
  - none of your private details (name, member ID, email). These are read from
    .cache/private-terms.txt, one per line. That file stays on this PC, so the
    details themselves are never written into a tracked file, not even this one.
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOCKED_FOLDERS = ("PMI Learning Material/", "Resources from Instructor/", ".cache/", ".tools/", ".venv/")
BLOCKED_ENDINGS = (".pdf", ".epub", ".docx", ".pptx", ".zip")
MAX_BYTES = 1_000_000
TERMS = ROOT / ".cache" / "private-terms.txt"


def main() -> None:
    problems: list[str] = []
    terms = [t.strip().lower() for t in TERMS.read_text(encoding="utf-8-sig").splitlines() if t.strip()] if TERMS.is_file() else []
    if not terms:
        problems.append(f"{TERMS} is missing or empty, so private details cannot be searched for")

    tracked = subprocess.run(["git", "ls-files", "-z"], cwd=ROOT, capture_output=True, check=True).stdout.decode("utf-8").split("\0")
    built = [str(p.relative_to(ROOT)).replace("\\", "/") for p in (ROOT / "web" / "dist").rglob("*") if p.is_file()]
    for name in [n for n in tracked if n] + built:
        path = ROOT / name
        if not path.is_file():
            continue
        if name.startswith(BLOCKED_FOLDERS):
            problems.append(f"{name}: comes from a folder that must stay on this PC")
        if name.lower().endswith(BLOCKED_ENDINGS):
            problems.append(f"{name}: books and documents are never uploaded")
        if path.stat().st_size > MAX_BYTES:
            problems.append(f"{name}: {path.stat().st_size / 1_000_000:.1f} MB, larger than expected for this project")
        text = path.read_bytes().decode("utf-8", errors="ignore").lower()
        for term in terms:
            if term in text:
                problems.append(f"{name}: contains one of your private details (line {text[: text.index(term)].count(chr(10)) + 1})")

    print(f"{len([n for n in tracked if n])} tracked files and {len(built)} built files checked")
    if problems:
        print(f"\n{len(problems)} problem(s):")
        for p in problems:
            print(" -", p)
        sys.exit(1)
    print("Nothing private or copyrighted would be uploaded.")


if __name__ == "__main__":
    main()
