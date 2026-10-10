"""Check the colour tokens in web/src/index.css against WCAG AA, in both themes.

Usage: python tools/check_contrast.py
Text needs 4.5:1 against its background; the outline of a control needs 3:1.
Exits with code 1 if a pair falls short.
"""
import re
import sys
from pathlib import Path

CSS = Path(__file__).resolve().parent.parent / "web" / "src" / "index.css"

# (foreground, background, minimum ratio)
TEXT, OUTLINE = 4.5, 3.0
PAIRS = [
    ("ink", "paper", TEXT), ("ink", "surface", TEXT),
    ("muted", "paper", TEXT), ("muted", "surface", TEXT),
    ("plan", "paper", TEXT), ("plan", "surface", TEXT), ("plan", "plan-soft", TEXT),
    ("on-plan", "plan", TEXT), ("on-plan", "plan-strong", TEXT),
    ("done", "paper", TEXT), ("done", "surface", TEXT), ("done", "done-soft", TEXT),
    ("critical", "paper", TEXT), ("critical", "surface", TEXT), ("critical", "critical-soft", TEXT),
    ("milestone", "milestone-soft", TEXT), ("milestone", "surface", TEXT),
    ("ink", "plan-soft", TEXT), ("ink", "done-soft", TEXT), ("ink", "critical-soft", TEXT), ("ink", "milestone-soft", TEXT),
    ("muted", "plan-soft", TEXT), ("muted", "done-soft", TEXT), ("muted", "critical-soft", TEXT),
    ("edge", "paper", OUTLINE), ("edge", "surface", OUTLINE),
    ("plan", "line", OUTLINE),
    ("d1", "paper", TEXT), ("d1", "surface", TEXT), ("d2", "paper", TEXT), ("d2", "surface", TEXT),
    ("d3", "paper", TEXT), ("d3", "surface", TEXT), ("d4", "paper", TEXT), ("d4", "surface", TEXT),
]


def luminance(hex_colour: str) -> float:
    channels = [int(hex_colour[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    r, g, b = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a: str, b: str) -> float:
    high, low = sorted((luminance(a), luminance(b)), reverse=True)
    return (high + 0.05) / (low + 0.05)


def tokens(block: str) -> dict[str, str]:
    return dict(re.findall(r"--color-([\w-]+):\s*(#[0-9a-fA-F]{6})", block))


def main() -> None:
    css = CSS.read_text(encoding="utf-8")
    light = tokens(re.search(r"@theme \{(.*?)\n\}", css, re.S).group(1))
    dark = {**light, **tokens(re.search(r'\[data-theme="dark"\] \{(.*?)\n\}', css, re.S).group(1))}
    failed = 0
    for name, theme in (("light", light), ("dark", dark)):
        print(name)
        for fg, bg, need in PAIRS:
            value = ratio(theme[fg], theme[bg])
            ok = value >= need
            failed += not ok
            print(f"  {'ok  ' if ok else 'FAIL'} {fg} on {bg}: {value:.1f} (needs {need})")
    if failed:
        sys.exit(f"{failed} pair(s) below the limit")
    print("Every pair meets WCAG AA.")


if __name__ == "__main__":
    main()
