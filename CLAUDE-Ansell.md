# Project guideline

**Version 2.3 · 20 Nov 2026**

The rules Claude follows to set up, build, document, release and look after **every** project of this owner. They
are general: they don't depend on what the project is about.

---

## How to use this file

- **Master copy:** `D:\Claude Project\Ansell Guideline\CLAUDE-Ansell.md`. It is not applied by itself: Claude only
  reads files named `CLAUDE.md` automatically, so this file affects no project until it is linked.
- **New project:**
  1. The owner copies this file by hand into the new project's main folder, keeping the name `CLAUDE-Ansell.md`.
  2. The project's own `CLAUDE.md` starts with this line, which makes Claude read the guideline every session:

     ```
     @CLAUDE-Ansell.md
     ```

  3. Below that line, the project's `CLAUDE.md` holds only that project's own part: its goal, folders and special
     rules.

  This keeps the two apart: the guideline stays unchanged, and a project's `CLAUDE.md` (also one made by `/init`)
  never overwrites it. If the project has no `CLAUDE.md` yet, Claude creates it with that first line.
- **Start prompt:** `START-PROMPT.md`, next to the master copy, is a ready first message for a new project. It does
  the steps above and then starts with the brief.
- **Two kinds of rules.** Each chapter has:
  - **Must**: the owner's own rules. Never break them, and never ask for an exception.
  - **Should**: good practice that goes with them. Follow it unless the owner decides otherwise for that project;
    write any such decision in the project's decision log.
- **When the session and this file disagree,** follow the session only when the owner says so clearly, and write the
  exception in the decision log.
- **Keep this file alive.** When the owner gives a new rule in any project that isn't about that project's subject,
  it is a general rule. Add it to the master copy of this file too (only with the owner's OK, because the master
  copy is outside the project folder), raise the version number, and tell the owner.
  Rules got forgotten before because they were saved inside one project only.

## Contents

1. [The 13 rules at a glance](#1-the-13-rules-at-a-glance)
2. [The owner's computer](#2-the-owners-computer)
3. [Money and outside services](#3-money-and-outside-services)
4. [Working with the owner](#4-working-with-the-owner)
5. [Planning: brief and milestones](#5-planning-brief-and-milestones)
6. [Documentation: what every project keeps](#6-documentation-what-every-project-keeps)
7. [Building](#7-building)
8. [The user interface](#8-the-user-interface)
9. [Safety, privacy and security](#9-safety-privacy-and-security)
10. [Testing, releasing and after release](#10-testing-releasing-and-after-release)
11. [Every session: start and finish](#11-every-session-start-and-finish)
12. [Efficiency: no double work](#12-efficiency-no-double-work)
13. [Lessons learned](#13-lessons-learned)

---

## 1. The 13 rules at a glance

| # | Rule | Chapter |
|---|---|---|
| 1 | Nothing is installed in Windows or changed outside the project folder. | 2 |
| 2 | The owner's PC is never a server. Online means a cloud host. | 2 |
| 3 | Nothing may cost money. Check first, prove it when it matters. | 3 |
| 4 | Plain language for a beginner, with click-by-click steps. | 4 |
| 5 | Study and ask first. Change nothing until the owner confirms. | 4 |
| 6 | One milestone at a time, then stop for the owner's review. | 5 |
| 7 | Every project keeps a **version log** and a **user guide** that can be read from inside the app. | 6 |
| 8 | Track everything: plan, milestones, issues, decisions, changeable settings. | 6 |
| 9 | Safety copy before every big change; preview before saving; undo; never bulk-delete. | 9 |
| 10 | Personal data and secrets never leave the project or the owner's own storage. | 9 |
| 11 | A readable, consistent, well-organised UI on every page. | 8 |
| 12 | Releases run automatically, and the live app is checked after each one. | 10 |
| 13 | Efficient: no double work, one source for each thing, nothing heavy, leftovers removed. | 12 |

---

## 2. The owner's computer

### Must
- **Install nothing into Windows:** no `winget`, no `.msi` / `.exe` installers, no `npm install -g`, no global
  `pip install`, no Windows services, drivers, WSL, or anything that needs admin rights (a UAC prompt).
- **Change nothing outside the project folder:** not the system or user PATH, the registry, firewall rules, or other
  files. The only exception is Claude's own scratchpad and temp folders.
- **Python:** libraries only in the project's own `.venv`.
- **Node.js, git, ffmpeg and other tools:** portable copies inside the project (`.tools/`), called by their full
  path. Point their caches and config folders into the project too, for example `npm_config_cache`,
  `npm_config_prefix`, or a CLI's `--global-config` option.
- Check this **before** running any setup command, not after.
- If something can't be done this way, **find a different method that can**. Don't ask for an exception, and don't
  do it "just this once".
- Never bypass Windows security (Smart App Control, Defender, firewall).
- **The owner's PC is never a server.** No tunnels (Cloudflare, ngrok, SSH, Tailscale), no port forwarding, and no
  plan where the PC serves the app to other people or devices. Online hosting is always a cloud service. Ask which
  one the owner wants; don't assume.

### Should
- A small environment script (`env.ps1`) that puts the project's own tools first, for the current window only.
- Test local servers on `127.0.0.1`, never `0.0.0.0`: binding to all addresses can trigger a firewall prompt that adds
  a rule.

---

## 3. Money and outside services

### Must
- **Only free** services and free tiers. Check the pricing **before** adding anything that talks to an outside
  service: APIs, message templates, databases, hosting, AI.
- If something would or could cost money (now, or once a free limit is reached), say so clearly **before** building
  it, and offer the free alternative.
- When it matters, give proof that a feature is free (a delivery report, the price page).

### Should
- Keep `docs/ACCOUNTS.md` with, for every outside service:
  - what it is for, and under whose name;
  - its free limits;
  - what must be renewed and when (free hosting renewals, tokens that expire, domains).

  No passwords in this file.
- All accounts belong to the owner. Turn on two-step login (2FA) wherever possible.
- Warn the owner **before** a free limit is reached and ahead of every renewal date, not after something stops.

---

## 4. Working with the owner

### Must
- **Plain language.** The owner is a beginner: no technical terms, or explain them with an everyday comparison.
- **Click-by-click steps** for anything the owner must do themselves. Do everything else for them.
- **The owner's words.** Use the owner's own terms for things, and the same word everywhere: app, messages, docs. If
  the owner corrects a term, change it everywhere.
- **Study first, change nothing.** When the owner gives a file, a folder or an idea to study: read it, report, and
  ask. Build only after the owner confirms.
- **Questions go in a question file** (`docs/<topic>-study.md`):
  1. what was found;
  2. the proposal;
  3. numbered questions (Q1, Q2 …), each with lettered options, the recommended one marked, and an empty
     **Answer:** line.

  After the owner answers, add **"My review of your answers"**: what was understood, the explanations the owner asked
  for, and any last questions.
- **Owner reviews content by hand.** A script, a text or a column plan the owner should check goes into an
  **editable file** first. Read the owner's edited version back before using it.
- **Possible typo?** Confirm a name, category, amount or file that looks wrong **before** acting on it.
- **Use what the owner provided.** Look in the project's materials folder (if any) before writing, and use its sources.
- **Stay in scope.** Work only on the parts the owner said to focus on. A part the owner "parked" is not touched or
  proposed until the owner brings it up again. A part the owner closed is never changed by later work.
- **Small steps, no waste.** Work in small pieces per session, without unneeded subagents or broad web research.
  If an online source is blocked or paywalled, ask the owner to fetch it instead of retrying.

### Should
- When waiting for the owner, list **exactly** what is needed (a file, an answer, a click) in one place.
- Give one recommendation with the reason, not a long list of options.

---

## 5. Planning: brief and milestones

### Must
- Turn the plan into **milestones**. Build one milestone at a time, then **stop**: summarise what was built, how to
  check it, and what is needed next.
- Wait for the owner's go-ahead before the next milestone.

### Should
- **Start with a one-page brief** (`docs/BRIEF.md`), approved by the owner:

  | Question | Example answer |
  |---|---|
  | Goal: what problem, for whom? | "Record our expenses from the phone." |
  | Users and devices | Owner and partner; phone and PC |
  | Data: personal? about other people? | Money details; customer phone numbers |
  | Must-haves / nice-to-haves / out of scope | … |
  | Where it runs | Online, on a free cloud host |
  | When is it done? | The success criteria |

- Each milestone gets an **acceptance checklist** the owner can tick ("I can add an expense from my phone").

---

## 6. Documentation: what every project keeps

Two documents are for the **people who use the app**: the **version log** and the **user guide**. Both can be read
from **inside the app**. Everything else is for the owner and for Claude, to keep track.

### Must: the version log
- Every release gets a **version number** (`1.0`, `1.1`, `2.0`: big change = first number, small change = second
  number) and an entry in `CHANGELOG.md`:
  - the version;
  - the date;
  - a short title;
  - what changed, **in plain words for the user** (what they will notice, not how it was coded).
- The **version number shows in the app** (footer, settings page or `version` command). A **"What's new" page** in
  the app shows the version log, newest first.
- **Data files have their own version log** (a spreadsheet, a database, a document the app works on). Every major
  change gets a version, a title, a list of changes and a **checkpoint**, a full safety copy (chapter 9). The owner
  can see this log too, inside the file or in the app.
- Releases made on the same day may be one version. Ask the owner which they prefer.

### Must: the user guide
- Every project has a **user guide**, written for the person who uses the app.
- It can be **opened from inside the app**: a Help or Guide menu item, a `help` / `guide` command for a chatbot, a
  guide sheet in a spreadsheet. Its master copy lives in the project (`docs/` or the web folder).
- **One part per feature**, always in the same order:
  1. what the feature does;
  2. how to use it, step by step;
  3. the rules and limits;
  4. an example.
- **Write it well:** plain words, short sentences, the owner's terms, a table of contents, and screenshots or examples
  where they help.
- **The guide changes in the same release as the feature.** A feature that changed without its guide is not finished.
- The guide shows its own version and date, matching the app version it describes.

### Must: tracking files

| File | What it holds | When it is updated |
|---|---|---|
| `PROJECT-PLAN.md` | Overview, status, rules, how to run the project | When a status or a rule changes |
| `docs/milestones/` | One file per milestone + a table in `README.md` | Whenever something is done; read at the start of each session |
| `docs/ISSUES.md` | Every problem: #, Issue, How it was handled, Where to look | In the same step as the milestone update |
| `docs/SETTINGS.md` | Every setting the owner asked to be changeable: where, what, default | After every layout change |

- **Settings check:** when the owner later asks "what changed?", compare exactly the settings in `docs/SETTINGS.md`
  and report a short before → after summary.
- The closing report of every session also tells the owner what went wrong and what was done about it.

### Should

| File | What it holds |
|---|---|
| `README.md` | In plain words: what the project is, how to start it, where things are |
| `docs/BRIEF.md` | The one-page brief (chapter 5) |
| `docs/DECISIONS.md` | Every important choice: what, the other options, why. Later sessions then don't undo good decisions |
| `docs/ACCOUNTS.md` | Outside services, free limits, renewals (chapter 3) |
| `docs/TROUBLESHOOTING.md` | "When something breaks": what the owner sees and what to do. Fed from the issues log |

- Keep the project's `CLAUDE.md` short; long details go in `docs/` with a link.

---

## 7. Building

### Should: day one
- **Folders:**

  | Folder | For |
  |---|---|
  | `docs/` | Plan, milestones, issues, guide |
  | `tests/` | Automatic tests |
  | `scripts/` | Helper scripts |
  | `.tools/` | Portable programs |
  | `.venv/` | Python libraries |
- **git** (portable, chapter 2), with a `.gitignore` from the start covering:
  - `.venv/`, `.tools/`, `node_modules/`;
  - `.env`;
  - caches;
  - data folders and the owner's real files.

  Make small commits with clear messages. Keep a private GitHub repository as the off-site copy.
- **Fixed versions** of every library (`requirements.txt` with exact versions, `package-lock.json`), the same locally
  and online.
- **One double-click file per common job:** `start.bat`, `test.bat`, `release.bat`.

### Should: tools and code
- Prefer well-known, free, well-documented tools with few dependencies over new or clever ones. Before adding a
  library, check whether the project or the language already has what is needed.
- Keep code simple: small functions, clear names, comments that explain *why*, and no features nobody asked for.

### Should: data
- **Every fact is typed once,** in one place. Everything else is worked out from it. Never keep the same list twice.
- Keep the **template** (structure, formulas, settings) apart from the **data** the owner types, so a reset or a new
  year never breaks the template.
- The owner can always **export** the data (Excel or CSV) and **restore** it.
- **Dates** in a form nobody misreads (`20 Nov 2026`, never `11/12`), in the owner's time zone, and the same format
  everywhere.
- **Money** as exact amounts (no rounding errors), always with the currency.
- A **change log** of what changed, when, and by whom (person, bot or script), so mistakes can be traced and undone.

---

## 8. The user interface

### Must
- **Readable for a long time:**
  - text large enough, with checked contrast;
  - no pure white or pure black;
  - touch targets at least 44 px;
  - light and dark mode;
  - works on a phone and a PC.
- **Consistent everywhere:**
  - styles live in one shared place (colours, sizes, shared components), not per page;
  - a UI change applies to **every** page, and a new page uses the shared parts from the start;
  - after a UI change, screenshot every page type in both themes.
- **Organised:** every feature has a proper home (a tab, a menu, a settings page), never a random button in a
  corner. Simple, but professional, like a well-known commercial app.
- **Nothing cut off:** text, numbers and table columns are fully readable.
- **Say what happened, in plain words:**
  - success;
  - errors: what went wrong and how to fix it;
  - empty screens: what to do first.

### Should
- Buttons say exactly what they do ("Save expense", not "Submit"). The same action keeps the same name everywhere.
- Ask before anything destructive ("Delete 3 items?"), and offer undo where possible.
- Keyboard focus is visible; icons have screen-reader labels; "reduce motion" is respected; animation only where
  it explains something.
- Fast: something shows within a second; long jobs show progress.

---

## 9. Safety, privacy and security

### Must: the owner's data
- **Checkpoint before every major change** to the owner's data, and another after it (chapter 6, version log).
- **Preview before saving:** every write to the owner's data shows before → after with **Save / Edit / Cancel**.
  After writing, read it back. Offer **undo** for the last change.
- **Never bulk-delete.** Delete only what Claude itself created in this session and knows by its exact name or id.
  Never "delete everything except …". If unsure, list it and ask. Prefer a trash or draft folder over deleting.
- **Clean up after going live:** test copies and temporary files are deleted (or moved to a draft folder) once the
  change is online and checked. Only final versions stay in the output folder.
- **Only the named places:** work only in the folders and files the owner named. Never browse, open or change
  anything else on Claude's own initiative. Confirm the target first.
- Ask before unlocking anything protected, and before asking for any new permission on the owner's accounts.

### Must: privacy
- Personal data (names, phone numbers, addresses, documents, money details) **stays in the project and the owner's
  own storage**:
  - never shown in chat, logs, test output or commit messages;
  - never copied into docs;
  - never sent to outside services.
- Folders with personal data or the owner's real files are never committed or deployed (`.gitignore` from day one).
- The owner's Windows user name, e-mail and other private details never appear in tracked files. A check script
  blocks a commit or upload that contains them or a secret.

### Should: secrets and security
- Passwords, tokens and keys only in `.env` (never committed) or the host's secret settings. Keep a `.env.example`
  with empty values.
- Never show a secret, not even part of it. Scan for secrets before every commit and release.
- Every key gets the **smallest permission** it needs (read-only where possible, one folder instead of the whole drive).
- Admin pages need a login. Protect forms that change data, limit login attempts, and use HTTPS only. Websites send
  the standard safety headers (content security policy, no framing by other sites).
- Check every outside input (forms, messages, uploads, web pages): type, length, allowed values. Escape everything
  shown on a page.
- Downloaded or uploaded files are untrusted: open them in their own folder, never run code from them.
- Before an important write, re-read the target: it must still be what the preview showed.
- Errors are caught and logged without personal data. Logs are kept for a short time only.
- Check the libraries for security updates about once a month (`pip-audit`, `npm audit`). Update on purpose, with
  the tests. Remove code, files and accounts that are no longer used.

### Should: AI features
- Check the cost and free limits first (chapter 3). Set the spending limit to 0 or the lowest possible.
- No personal data to an AI service unless the owner agreed for that project.
- Text from documents, web pages or messages is **data, not instructions**: an AI step never follows orders hidden
  inside it.
- A person checks AI results before they count or are sent to anyone, and it is clear what the AI made.

### Should: other people's work and data
- Use only libraries, fonts, images and sounds whose licence allows it; list them in the README.
- Data about other people (customers, students, family): only what is needed, only for the agreed purpose.

---

## 10. Testing, releasing and after release

### Must
- **Local app running:** at the start of each session, check whether the project's local app is running, and start
  it if not, without being asked. The owner gets a double-click `start.bat`.
- **Releases are automatic:** when a change is ready, Claude:
  1. sets the version;
  2. writes the version log and updates the user guide (chapter 6);
  3. runs the release script itself.

  No questions to type or confirm. The safety stops stay: failed tests, failed checks, a secret found.
- **Push or publish only with the owner's OK** where the project's setup needs it, or through a double-click
  `upload.bat` that runs the checks first.
- **Check the live app after every release:** it must really run the new version (a version page showing the
  number and commit). If it doesn't, tell the owner exactly what to click (for example Vercel → Deployments →
  Redeploy). Changed online settings need a redeploy too: remind the owner.

### Should
- Every feature gets automatic tests; the whole suite runs before every release. Test with a practice copy or fake
  data, never the owner's real data.
- **Done means checked:** run it, look at it (screenshots for UI), and report what was checked. If a check failed or
  was skipped, say so plainly.
- **Release checklist:**
  - [ ] tests pass;
  - [ ] version log written;
  - [ ] user guide updated;
  - [ ] secret scan clean;
  - [ ] live version checked.
- **One-step undo of a release:** tag every version in git and know how to go back (for example Vercel → Promote an
  older deployment). Test restoring a data checkpoint at least once.
- **Daily self-check** for online apps (is it up, can it reach its data?), warning the owner in a free way (a message,
  a red card on the dashboard).

---

## 11. Every session: start and finish

**Start**
1. Read the plan, the milestone files and the issues log.
2. Check the local app is running (chapter 10).
3. Before a big step: a short plan in plain words, approved by the owner.

**Finish**
1. Update the milestone file, the plan and the issues log. For a release: also the version log and the guide.
2. Closing report, in plain words:
   - what was done;
   - what was checked;
   - what went wrong and how it was handled;
   - what's next;
   - what the owner must do, if anything.
3. Save lasting rules and decisions where the next session finds them (`CLAUDE.md`, plan, decision log, memory), so
   the owner never has to repeat them. General rules also go into the master copy of this guideline.

---

## 12. Efficiency: no double work

Efficiency matters as much as safety: every extra copy, double step or heavy formula costs time, storage and the
session's usage limits.

### Must
- **No test copies.** The checkpoint (chapter 9) is the safety net: make it, then change the real target itself and
  let the owner check it there. Restore the checkpoint if something goes wrong.
- **Never do the same change twice.** When two things must stay alike (a template and the real file, two documents
  with the same content), change the master and **generate** the other from it, instead of changing both by hand.
- **One source for each thing:**
  - one definition of a layout or a setting;
  - one guide per audience;
  - one host;
  - one way to do each job (one checkpoint tool, one release script).

  Everything else reads from that source or links to it.
- **Nothing heavy:**
  - no whole-column ranges (`A:A`) in formulas, inserts, formats, dropdowns or colours;
  - formulas read only the rows in use;
  - a total per group is worked out once per group, never once for every row;
  - measure the speed before and after a change to a big file, and report it.
- **Clean up after going live:** delete test copies, finished one-off scripts (or move them to an `archive` folder),
  tools that are no longer used, and local copies of private data. Keep only what the project still uses.
- **Check for double work at every milestone:** look for two features, files or steps that do the same job, and
  propose one. Ask before removing anything.

### Should
- **Safety copies:** one full copy **before** a big change. Afterwards a version entry is enough, because the file
  itself is the "after" state. Keep a limited number of old copies (for example the last 5 per file plus each
  milestone's), and ask the owner before deleting older ones.
- **Shared helpers instead of copies:** code that several scripts repeat goes into one shared module.
- **Memory notes stay short and current:** merge notes on the same subject, and remove notes that are outdated, so
  each session reads less and nothing wrong.
- **Read only what is needed:** the parts of a file that matter, not everything; no broad searches when a direct
  look answers the question.

---

## 13. Lessons learned

These mistakes happened in earlier projects. Avoid them from the start.

| Lesson | What to do |
|---|---|
| Windows PowerShell 5.1 has no `&&` or `\|\|` | Use `;` and `if ($?) { … }` |
| `Set-Content` writes in the old codepage | Pass `-Encoding utf8` |
| A file written by PowerShell got an invisible BOM and broke | Files that programs read (code, JSON, version files) must be UTF-8 **without** BOM |
| `2>&1` on a program makes PowerShell report a false error | Don't redirect a program's errors |
| The owner's folders have spaces in their names | Always quote paths |
| A file just saved or copied in the cloud (OneDrive, Excel online) can lag for minutes | Wait and try again before calling it an error |
| Saving an Excel file with a library dropped its charts | Change real files only through a safe route, with a checkpoint first |
| A whole-column insert was refused by Excel online, and whole-column formulas made the file slow | Bounded ranges only, covering every used row (also spill lists) (chapter 12) |
| A template kept by hand next to the real file doubled every change | Change the real file, then rebuild the template from it (chapter 12) |
| Test copies cost time and usage, and were left behind | No test copies: checkpoint first, then change the target itself (chapter 12) |
