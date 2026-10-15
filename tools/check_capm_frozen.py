"""CAPM is closed (2026-10-13). This check fails if any of its content files has changed.

Usage: python tools/check_capm_frozen.py            check against tools/capm-frozen.json
       python tools/check_capm_frozen.py --record   write the fingerprints (only when CAPM is deliberately reopened)

Every file under web/src/content/capm/ is fingerprinted with line endings ignored, so a
Windows checkout does not count as a change.
"""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CAPM = ROOT / "web" / "src" / "content" / "capm"
RECORD = ROOT / "tools" / "capm-frozen.json"


def fingerprints() -> dict[str, str]:
    found = {}
    for path in sorted(CAPM.rglob("*")):
        if path.is_file():
            data = path.read_bytes().replace(b"\r\n", b"\n")
            found[path.relative_to(CAPM).as_posix()] = hashlib.sha256(data).hexdigest()
    return found


def main() -> None:
    now = fingerprints()
    if "--record" in sys.argv:
        RECORD.write_text(json.dumps(now, indent=1) + "\n", encoding="utf-8")
        print(f"recorded {len(now)} CAPM files")
        return
    frozen = json.loads(RECORD.read_text(encoding="utf-8"))
    changed = [name for name in frozen if name in now and now[name] != frozen[name]]
    missing = [name for name in frozen if name not in now]
    added = [name for name in now if name not in frozen]
    for label, names in (("changed", changed), ("missing", missing), ("added", added)):
        for name in names:
            print(f"CAPM file {label}: {name}")
    if changed or missing or added:
        sys.exit(f"CAPM is closed: {len(changed) + len(missing) + len(added)} file(s) differ from the frozen record")
    print(f"CAPM unchanged: {len(now)} files match the frozen record")


if __name__ == "__main__":
    main()
