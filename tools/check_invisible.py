"""Look for invisible characters in the text the app shows: lessons, quizzes, flashcards, the guide and the version log.

Usage: python tools/check_invisible.py

Invisible characters (zero-width spaces, joiners, direction marks, byte order marks, tag characters,
variation selectors) cannot be seen, but they break search, copy and paste, and word counts.
This check only reports them; it changes nothing. CAPM is closed, so a finding there is
reported for your decision and does not fail the check.
Exits with code 1 if one is found outside CAPM.
"""
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "web" / "src" / "content"
EXTRA = [ROOT / "CHANGELOG.md"]

# Characters never wanted in this text. Unusual spaces (no-break, thin) are listed apart:
# they are visible as spaces and sometimes intended, so they are reported for information only.
INVISIBLE = {0x00AD, 0x034F, 0x061C, 0x115F, 0x1160, 0x17B4, 0x17B5, 0x180E, 0x3164, 0xFEFF, 0xFFA0}
INVISIBLE |= set(range(0x200B, 0x2010)) | set(range(0x202A, 0x202F)) | set(range(0x2060, 0x2070))
INVISIBLE |= set(range(0xFE00, 0xFE10)) | set(range(0xE0000, 0xE0080)) | set(range(0xE0100, 0xE01F0))
ODD_SPACES = {0x00A0, 0x2007, 0x202F, 0x3000} | set(range(0x2000, 0x200B))


def scan(path: Path) -> tuple[dict[str, int], dict[str, int]]:
    text = path.read_text(encoding="utf-8")
    hidden: dict[str, int] = {}
    spaces: dict[str, int] = {}
    for ch in text:
        code = ord(ch)
        if code in INVISIBLE or unicodedata.category(ch) == "Cf":
            name = f"U+{code:04X} {unicodedata.name(ch, 'unnamed')}"
            hidden[name] = hidden.get(name, 0) + 1
        elif code in ODD_SPACES:
            name = f"U+{code:04X} {unicodedata.name(ch, 'unnamed')}"
            spaces[name] = spaces.get(name, 0) + 1
    return hidden, spaces


def main() -> None:
    files = sorted(p for p in CONTENT.rglob("*") if p.suffix in (".md", ".json") and p.is_file()) + EXTRA
    failing = 0
    found_any = False
    for path in files:
        hidden, spaces = scan(path)
        if not hidden and not spaces:
            continue
        found_any = True
        name = path.relative_to(ROOT).as_posix()
        closed = name.startswith("web/src/content/capm/")
        for label, count in hidden.items():
            print(f"{name}: {count} x {label}" + (" (CAPM is closed: for your decision)" if closed else ""))
        for label, count in spaces.items():
            print(f"{name}: {count} x {label} (a visible space, for information)")
        if hidden and not closed:
            failing += 1
    print(f"{len(files)} files checked")
    if failing:
        sys.exit(f"Invisible characters found in {failing} file(s)")
    print("No invisible characters." if not found_any else "No invisible characters outside CAPM.")


if __name__ == "__main__":
    main()
