"""Check that nothing private or copyrighted would be uploaded.

Usage: python tools/check_publish.py
Run before every upload to GitHub. Exits with code 1 if anything is wrong.

Checks every file Git tracks, and the built site in web/dist if it exists:
  - no PDF, and nothing from the book folders or the local caches
  - no file larger than 1 MB
  - none of your private details (name, member ID, email). These are read from
    .cache/private-terms.txt, one per line. That file stays on this PC, so the
    details themselves are never written into a tracked file, not even this one.
  - no secret: a password file (.env), a private key, a GitHub token, or a Supabase
    key that gives full access. A secret found is named by its kind and line only,
    never shown. The Supabase key in web/src/lib/syncConfig.ts is the public one and
    is meant to be there.
"""
import base64
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOCKED_FOLDERS = ("PMI Learning Material/", "Resources from Instructor/", ".cache/", ".tools/", ".venv/")
BLOCKED_ENDINGS = (".pdf", ".epub", ".docx", ".pptx", ".zip")
MAX_BYTES = 1_000_000
SEARCH_INDEX_MAX_BYTES = 5_000_000
TERMS = ROOT / ".cache" / "private-terms.txt"

SECRETS = [
    ("a private key", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("a GitHub token", re.compile(r"\b(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{40,})")),
    ("a Supabase secret key", re.compile(r"\bsb_secret_[A-Za-z0-9_-]{20,}")),
]
JWT = re.compile(r"\beyJ[A-Za-z0-9_-]+\.(eyJ[A-Za-z0-9_-]+)\.[A-Za-z0-9_-]+")


def full_access_jwt(payload: str) -> bool:
    """A Supabase key is a signed token; the "service_role" one opens every row, so it must never be uploaded."""
    try:
        claims = json.loads(base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4)))
    except ValueError:
        return False
    return isinstance(claims, dict) and claims.get("role") == "service_role"


def secrets_in(text: str) -> list[tuple[str, int]]:
    found = [(kind, m.start()) for kind, pattern in SECRETS for m in pattern.finditer(text)]
    found += [("a Supabase key with full access", m.start()) for m in JWT.finditer(text) if full_access_jwt(m.group(1))]
    return [(kind, text[:at].count("\n") + 1) for kind, at in found]


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
        if Path(name).name.startswith(".env") and Path(name).name != ".env.example":
            problems.append(f"{name}: a password file (.env) is never uploaded")
        # The search file is built from the lessons and flashcards of every course, so it grows with the
        # content; it gets a larger allowance. Every file is still searched for private details below.
        # The PDF.js worker of the book reader (pages/ReaderPage.tsx) is program code of about 1.2 MB and gets the
        # same allowance; it is still searched for private details below, and a PDF is blocked by its ending.
        large = "_virtual_search-index" in name or Path(name).name.startswith("pdf.worker.min-")
        limit = SEARCH_INDEX_MAX_BYTES if large else MAX_BYTES
        if path.stat().st_size > limit:
            problems.append(f"{name}: {path.stat().st_size / 1_000_000:.1f} MB, larger than expected for this project")
        original = path.read_bytes().decode("utf-8", errors="ignore")
        for kind, line in secrets_in(original):
            problems.append(f"{name}: contains {kind} (line {line}). Remove it, and replace the key at its service")
        text = original.lower()
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
