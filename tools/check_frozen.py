"""Closed certifications stay unchanged. This check fails if any of their content files has changed.

Closed: CAPM (13 Oct 2026) and PMP (24 Nov 2026).

Usage: python tools/check_frozen.py                 check every closed certification
       python tools/check_frozen.py --record pmp    write one certification's fingerprints (only when it is
                                                    closed, or deliberately reopened by the owner)

Every file under web/src/content/<cert>/ is fingerprinted with line endings ignored, so a Windows
checkout does not count as a change. The records are tools/<cert>-frozen.json.
"""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "web" / "src" / "content"
CLOSED = ["capm", "pmp"]


def record_path(cert: str) -> Path:
    return ROOT / "tools" / f"{cert}-frozen.json"


def fingerprints(cert: str) -> dict[str, str]:
    folder = CONTENT / cert
    found = {}
    for path in sorted(folder.rglob("*")):
        if path.is_file():
            data = path.read_bytes().replace(b"\r\n", b"\n")
            found[path.relative_to(folder).as_posix()] = hashlib.sha256(data).hexdigest()
    return found


def check(cert: str) -> bool:
    now = fingerprints(cert)
    frozen = json.loads(record_path(cert).read_text(encoding="utf-8"))
    changed = [name for name in frozen if name in now and now[name] != frozen[name]]
    missing = [name for name in frozen if name not in now]
    added = [name for name in now if name not in frozen]
    name = cert.upper()
    for label, names in (("changed", changed), ("missing", missing), ("added", added)):
        for file in names:
            print(f"{name} file {label}: {file}")
    differ = len(changed) + len(missing) + len(added)
    if differ:
        print(f"{name} is closed: {differ} file(s) differ from the frozen record")
        return False
    print(f"{name} unchanged: {len(now)} files match the frozen record")
    return True


def main() -> None:
    if "--record" in sys.argv:
        cert = sys.argv[sys.argv.index("--record") + 1].lower()
        if cert not in CLOSED:
            sys.exit(f"{cert} is not in the list of closed certifications")
        now = fingerprints(cert)
        record_path(cert).write_text(json.dumps(now, indent=1) + "\n", encoding="utf-8")
        print(f"recorded {len(now)} {cert.upper()} files")
        return
    results = [check(cert) for cert in CLOSED]
    if not all(results):
        sys.exit("A closed certification changed. Undo the change, or ask the owner to reopen it.")


if __name__ == "__main__":
    main()
