"""Make a release: check everything, then mark the version in git.

Usage: python tools/release.py            (or double-click release.bat)

Before running it, Claude has written the version's entry at the top of CHANGELOG.md, updated
web/src/content/guide.md, and committed. This script then:
  1. reads the version from CHANGELOG.md, the only place it is written, and checks that the guide
     says the same version;
  2. sets the same number in web/package.json;
  3. runs every check: CAPM unchanged, content, invisible characters, colour contrast, the build,
     the click tests (the app must be running, see start.bat) and the upload check;
  4. marks the commit with the tag v<version>, so it can be found and restored later.
It stops at the first failure and marks nothing. Uploading stays with you: double-click upload.bat.
Several releases on one day share one version; the tag then moves to the newest of them.
"""
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web"
PYTHON = str(ROOT / ".venv" / "Scripts" / "python.exe")
HEADING = re.compile(r"^## (\d+\.\d+) · (\d{1,2} [A-Z][a-z]{2} \d{4}) · (.+)$", re.MULTILINE)

# The project's own Node.js and git first, for this run only (nothing changes in Windows).
os.environ["PATH"] = os.pathsep.join([str(ROOT / ".tools" / "node"), str(ROOT / ".tools" / "git" / "cmd"), os.environ["PATH"]])
os.environ["npm_config_cache"] = str(ROOT / ".tools" / "npm-cache")


def stop(message: str) -> None:
    sys.exit(f"\nRELEASE STOPPED: {message}")


def run(label: str, command: list[str], cwd: Path = ROOT) -> None:
    print(f"\n== {label}")
    if subprocess.run(command, cwd=cwd, shell=command[0] == "npm").returncode != 0:
        stop(f"{label} failed. Nothing was marked.")


def git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()


def main() -> None:
    newest = HEADING.search((ROOT / "CHANGELOG.md").read_text(encoding="utf-8"))
    if not newest:
        stop('CHANGELOG.md has no version heading such as "## 1.0 · 23 Nov 2026 · Title".')
    version, date, title = newest.groups()
    print(f"Version {version} of {date}: {title}")

    stamp = (WEB / "src" / "content" / "guide.md").read_text(encoding="utf-8").splitlines()[0]
    if not stamp.startswith(f"Guide for version {version} · "):
        stop(f'the guide still says "{stamp}". Update the guide for version {version} first.')

    if git("status", "--porcelain"):
        stop("there are changes not yet committed. Commit them first, so the tag marks exactly what was checked.")

    package = WEB / "package.json"
    text = package.read_text(encoding="utf-8")
    updated = re.sub(r'"version": "[^"]*"', f'"version": "{version}.0"', text, count=1)
    if updated != text:
        # Written without a byte order mark: Node cannot read package.json with one.
        package.write_bytes(updated.encode("utf-8"))
        git("commit", "-m", f"Version {version}: the same number in web/package.json", "--", "web/package.json")
        print(f"web/package.json set to {version}.0 and committed")

    try:
        urllib.request.urlopen("http://localhost:5173", timeout=3)
    except OSError:
        stop("the app is not running, so the click tests cannot run. Double-click start.bat, then try again.")

    run("CAPM and PMP unchanged", [PYTHON, "tools/check_frozen.py"])
    run("Content", [PYTHON, "tools/check_content.py"])
    run("Invisible characters", [PYTHON, "tools/check_invisible.py"])
    run("Colour contrast", [PYTHON, "tools/check_contrast.py"])
    run("Build", ["npm", "run", "build"], WEB)
    run("Click tests", ["npm", "test"], WEB)
    run("Upload check (private details, books, secrets)", [PYTHON, "tools/check_publish.py"])

    built = json.loads((WEB / "dist" / "version.json").read_text(encoding="utf-8"))
    if built["version"] != version:
        stop(f"the build says version {built['version']}, the log says {version}.")

    tag = f"v{version}"
    subprocess.run(["git", "tag", "-f", "-a", tag, "-m", f"{version} · {date} · {title}"], cwd=ROOT, check=True)
    print(f"\nReleased: version {version}, build {built['commit']}, tagged {tag}.")
    print("Next: double-click upload.bat. Then Claude runs tools/check_live.py to confirm the website runs it.")


if __name__ == "__main__":
    main()
