# Settings you can change

Every setting you asked to be changeable: where it is, what it does, and its default. When you ask "what changed?",
these are compared before and after.

## In the app

| Setting | Where | Choices | Default | Kept where |
|---|---|---|---|---|
| Theme | **Settings**, Display; also top right: **Dark** / **Light** | Light, dark | Follows your device's setting until you choose | This browser only; not synced |
| Text size | **Settings**, Display; also top right: the three **A** buttons | Normal, large, larger | Normal | This browser only; not synced |
| Exam day | **Study plan** (shown in **Settings**, Certifications and exam days) | Any date | None (no plan) | Your progress, so it is in backups and sync |
| Passed certifications | **Settings**, Certifications and exam days; also each certification's page | Passed, not passed | Not passed | Your progress, so it is in backups and sync |
| Books on this device | **Settings**, Books on this device (website only, signed in) | Save all; remove the ticked books; a book opened is saved by itself | None saved | This browser only; removed on sign out |
| Backup and restore | **Settings**, Your saved progress (was at the bottom of the home page) | Download, restore, delete all | | A file you keep |

The certification you opened last is remembered by itself, so the menus follow it. It is not a setting.

## In the project (changed by Claude on request)

| Setting | Where | Now |
|---|---|---|
| Colours and fonts | `web/src/index.css` (every page reads them from there) | See [DECISIONS.md](DECISIONS.md), visual design |
| Website address | Vercel, and in `tools/check_live.py` | https://road-to-pmp.vercel.app |
| Flashcard intervals | `web/src/lib/progress.ts` | 1, 3, 7, 14 and 30 days |
| Final review before the exam | `web/src/lib/plan.ts` | A quarter of the time left, at most 7 days |
