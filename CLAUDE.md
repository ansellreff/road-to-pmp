@CLAUDE-Ansell.md

# This project

**Goal:** a personal web learning platform for PMI certifications (CAPM, then PMP, PMI-ACP, PMI-SP). Overview,
status and how to run it: [PROJECT-PLAN.md](PROJECT-PLAN.md).

**Folders**
- `web/`: the app (Vite + React + TypeScript). Its click tests are in `web/tests/`.
- `tools/`: helper and check scripts (Python, run with `.venv`).
- `docs/`: one plan file and one issues file per certification (`docs/<CERT>-PLAN.md`, `docs/<CERT>-ISSUES.md`).
- `PMI Learning Material/`, `Resources from Instructor/`, `.cache/`: the owner's books and extracts. Never uploaded.

**Special rules**
- The per-certification plan and issues files take the place of the guideline's `docs/milestones/` and
  `docs/ISSUES.md` (see [docs/GUIDELINE-study.md](docs/GUIDELINE-study.md), Q1).
- CAPM (13 Oct 2026) and PMP (24 Nov 2026) are closed. `tools/check_frozen.py` and their click tests must pass
  unchanged before every commit. A closed certification reopens only at the owner's request.
- Only the owner uploads, by double-clicking `upload.bat`. Website: https://road-to-pmp.vercel.app.
- **Release:** the version number is written only in `CHANGELOG.md` (one version per day). The user guide is
  `web/src/content/guide.md`; its first line names the version. Write both, commit, run `tools/release.py`; after the
  owner's upload, run `tools/check_live.py`. Project-wide decisions: [docs/DECISIONS.md](docs/DECISIONS.md).
