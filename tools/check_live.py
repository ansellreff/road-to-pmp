"""Check that the website runs the newest version: the one committed on this PC.

Usage: python tools/check_live.py [address]
Reads version.json from the website (written by every build) and compares it with the
version in CHANGELOG.md and the newest commit here. Exits with code 1 if they differ.
"""
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://road-to-pmp.vercel.app"


def main() -> None:
    site = (sys.argv[1] if len(sys.argv) > 1 else SITE).rstrip("/")
    version = re.search(r"^## (\d+\.\d+) · ", (ROOT / "CHANGELOG.md").read_text(encoding="utf-8"), re.MULTILINE).group(1)
    commit = subprocess.run(["git", "rev-parse", "--short=7", "HEAD"], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    try:
        with urllib.request.urlopen(f"{site}/version.json", timeout=15) as response:
            live = json.loads(response.read())
    except (OSError, ValueError):
        sys.exit(f"{site} gives no version.json: it still runs a version from before 1.0, or the upload has not finished building.")
    print(f"Website: version {live['version']}, build {live['commit']}")
    print(f"This PC: version {version}, build {commit}")
    if live["version"] != version or not commit.startswith(live["commit"]):
        sys.exit("The website does not run the newest version yet. Wait a minute after upload.bat and check again.")
    print("The website runs the newest version.")


if __name__ == "__main__":
    main()
