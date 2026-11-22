# Study: bringing Road to PMP in line with the guideline

**23 Nov 2026** · Guideline version 2.3 (20 Nov 2026) · New skills installed since the last session (15 Oct 2026)

Please write your choice after each **Answer:** line (just the letter is enough), save the file, and tell me. I
change nothing else until then.

---

## 1. What was done already in this session

These two steps are what the guideline itself says to do for every project, so I did them:

- Copied `CLAUDE-Ansell.md` into the project folder, unchanged (checked: it is identical to the master copy).
- Created `CLAUDE.md` (the project had none). Its first line is `@CLAUDE-Ansell.md`, so Claude reads the guideline
  every session. Below it is a short "This project" part.
- I checked that neither file contains any of your private details, so both can be uploaded.

Nothing is committed yet.

## 2. What was found

### Already in line with the guideline

| Guideline rule | How the project already does it |
|---|---|
| Nothing installed in Windows (ch. 2) | Node and git in `.tools/`, Python in `.venv/`, `env.ps1`, `start.bat` |
| Only free services (ch. 3) | GitHub (private), Vercel and Supabase, all free tiers |
| Plain language, study first, stay in scope (ch. 4) | Already your standing rules; CAPM is closed and protected |
| Tracking (ch. 6) | `PROJECT-PLAN.md`, plus one plan and one issues file per certification |
| Readable, consistent UI (ch. 8) | Shared colours and sizes in `web/src/index.css`, light and dark mode, contrast check |
| Privacy (ch. 9) | `upload.bat` runs `tools/check_publish.py`: no books, no private details |
| Local app started every session (ch. 10) | Done this session too: http://localhost:5173 is running |

### Missing ("Must" rules)

| # | Guideline rule | What is missing now |
|---|---|---|
| M1 | Version log (ch. 6) | No version number in the app, no `CHANGELOG.md`, no "What's new" page |
| M2 | User guide inside the app (ch. 6) | The how-to text lives only in `PROJECT-PLAN.md`; the app has no Guide page |
| M3 | Check the live site after every release (ch. 10) | The website cannot show which version it runs, so it can't be checked |
| M4 | `docs/SETTINGS.md` (ch. 6) | Not there. Settings you can change: theme, text size |
| M5 | Tracking file names (ch. 6) | The guideline expects `docs/ISSUES.md` and `docs/milestones/`; you chose per-certification files (see Q1) |

### Missing ("Should" rules)

| # | What is missing |
|---|---|
| S1 | `docs/BRIEF.md`, `docs/DECISIONS.md`, `docs/ACCOUNTS.md` (GitHub, Vercel, Supabase: free limits, the Supabase pause after a week), `docs/TROUBLESHOOTING.md` |
| S2 | `.env` is not in `.gitignore`, and the upload check doesn't search for passwords or keys (secrets) |
| S3 | Python libraries are not written down with exact versions (`requirements.txt`) |
| S4 | No `test.bat`; versions are not tagged in git, so going back to an older version takes more steps |
| S5 | No warning when the free Supabase project has been paused |
| S6 | No check yet for leftover one-off scripts and unused files (ch. 12) |

### The new skills, and how I would use them

| Skill | Use in this project |
|---|---|
| **modern-web-guidance** | Look up current good practice before any page, style or browser code change. I use it from now on; no question needed. |
| **karpathy-guidelines** | Small, simple, targeted code changes that are checked afterwards. Matches the guideline (ch. 7, 12); I follow it from now on. |
| **watermarks-remover** | It can find hidden invisible characters in text, which can break search and copy-paste. It can also rewrite text. See Q6. |
| **design: accessibility-review** | Checks touch-target size (44 px), contrast and keyboard use for the new pages (ch. 8). |

## 3. The proposal

One small milestone, **"Guideline milestone G1"**, done **before PMP Session 4**. It does not touch CAPM content;
the CAPM checks and click tests must still pass unchanged.

1. Version number in the app footer, with the commit it was built from (so the live site can be checked).
2. `CHANGELOG.md` with a first entry, and a **What's new** page in the app that shows it, newest first.
3. A **Guide** page in the app, one part per feature (what it does / how to use it / rules and limits / an
   example), written from the how-to text in `PROJECT-PLAN.md`. That text then moves to the guide, and the plan
   links to it, so it exists only once.
4. `docs/SETTINGS.md`, and the small "Should" items you approve in Q5.
5. A release step for me: set the version, write the log, update the guide, run the tests and checks, commit and tag.
   **You still upload with `upload.bat`**, and afterwards I check that the website shows the new version.

**Acceptance checklist for G1** (for you to tick when you review):
- [ ] I see the version number at the bottom of every page, on this PC and on the website.
- [ ] I can open What's new and Guide from the top bar, on the PC and the phone.
- [ ] The guide explains every feature I use, in plain words.
- [ ] CAPM looks and works exactly as before.

## 4. Questions

**Q1. Tracking files.** The guideline expects one `docs/ISSUES.md` and a `docs/milestones/` folder. You asked on
11 Oct 2026 for one plan file and one issues file per certification.
- **A. Keep the per-certification files, and write this down as a decision (recommended).** It works, and you chose it.
- B. Switch to the guideline's names.

**Answer:** A. 

**Q2. First version number.**
- **A. 1.0 = the app as it is today: CAPM finished, PMP Sessions 1 to 3 (recommended).** The CAPM course is complete and in use.
- B. 0.9, and 1.0 once PMP is finished.

**Answer:** A.

**Q3. Several releases on one day.**
- **A. One version per day: all of that day's changes in one entry (recommended).** Fewer, clearer entries.
- B. A new version for every upload.

**Answer:** A.

**Q4. Where Guide and What's new go.**
- **A. One "Help" item in the top bar, opening the Guide, with What's new as a tab on that page (recommended).** One home for help, and the top bar stays short.
- B. Two separate items in the top bar.

**Answer:** A.

**Q5. The smaller "Should" items (S1 to S6).**
- **A. All of them in G1, except S5 (recommended).** They are small. S5 means building a new warning, so it can come later.
- B. All of them, including S5.
- C. Only the "Must" items now; the rest later.

**Answer:** A.

**Q6. watermarks-remover.**
- **A. Only the invisible-character check, on the lesson, quiz and flashcard files; nothing is rewritten (recommended).** Rewriting could change text that has been checked against the books.
- B. Don't use it in this project.

**Answer:** A.

**Q7. Order.**
- **A. G1 first, then PMP Session 4 (recommended).** From then on, every PMP session gets its version and guide update straight away.
- B. PMP Session 4 first, G1 after.

**Answer:** A.

## 5. My review of your answers

You chose A for every question (23 Nov 2026). What I understood:

- **Q1:** the per-certification plan and issues files stay. I write this into `docs/DECISIONS.md` as a decision
  that differs from the guideline, with the reason.
- **Q2, Q3:** the app starts at version **1.0** (today's app). After that, one version per day, with all of that
  day's changes in one entry.
- **Q4:** one **Help** item in the top bar. It opens the Guide, and What's new is a tab on the same page.
- **Q5:** G1 includes S1 to S4 and S6. S5 (a warning when Supabase is paused) is left for later. S6 only lists
  leftover files; I ask you before removing any of them.
- **Q6:** watermarks-remover is used only to look for invisible characters in lessons, quizzes and flashcards.
  Nothing is rewritten.
- **Q7:** G1 comes before PMP Session 4.

**A new finding:** the website still runs CAPM's last version (13 Oct 2026). PMP Sessions 2 and 3 were never uploaded.
They will go online with your first upload after G1.

No last questions. G1 starts when you say go.

## 6. Leftover files (S6), for your decision

I looked for scripts and files that are no longer used (G1, 23 Nov 2026). Nothing has been moved or deleted.

| File | What it is | My proposal |
|---|---|---|
| `tools/section_sources_d1.py` | A one-time script from 10 Oct 2026 that added source lines to CAPM Domain 1. It is finished, and no other file uses it | Move it to `tools/archive/` |
| `tools/slice_image.py` | Cuts a very tall screenshot into pieces | Keep: needed again when the PMI-ACP and PMI-SP instructor screenshots arrive |
| `tools/build_toc_agile1.py` | Rebuilds the contents list of the Agile Practice Guide, 1st edition | Keep: needed if the book cache is ever rebuilt |

No two features, files or steps do the same job, apart from the how-to text in `PROJECT-PLAN.md`. That text moved
into the in-app guide in G1, and the plan now links to the guide.

**Q8. Move `tools/section_sources_d1.py` to `tools/archive/`?**
- **A. Yes (recommended).** It is finished work, but its record is kept.
- B. Delete it.
- C. Leave it where it is.

**Answer:**
