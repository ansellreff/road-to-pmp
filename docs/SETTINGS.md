# Settings you can change

Every setting you asked to be changeable: where it is, what it does, and its default. When you ask "what changed?",
these are compared before and after.

## In the app

| Setting | Where | Choices | Default | Kept where |
|---|---|---|---|---|
| Theme | Top right: **Dark** / **Light** | Light, dark | Follows your device's setting until you choose | This browser only; not synced |
| Text size | Top right: the three **A** buttons | Normal, large, larger | Normal | This browser only; not synced |
| Exam day | **Study plan** | Any date | None (no plan) | Your progress, so it is in backups and sync |

The certification you opened last is remembered by itself, so the menus follow it. It is not a setting.

## In the project (changed by Claude on request)

| Setting | Where | Now |
|---|---|---|
| Colours and fonts | `web/src/index.css` (every page reads them from there) | See [DECISIONS.md](DECISIONS.md), visual design |
| Website address | Vercel, and in `tools/check_live.py` | https://road-to-pmp.vercel.app |
| Flashcard intervals | `web/src/lib/progress.ts` | 1, 3, 7, 14 and 30 days |
| Final review before the exam | `web/src/lib/plan.ts` | A quarter of the time left, at most 7 days |
