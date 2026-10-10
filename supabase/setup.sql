-- Road to PMP: one-time setup for syncing progress between devices.
--
-- How to run it: in your Supabase project, open "SQL Editor", paste all of this,
-- and press Run. It is safe to run more than once.
--
-- What it makes: one table with one row per signed-in person, holding a copy of
-- that person's progress. The rules at the end let each person read and change
-- their own row only. Nobody else, signed in or not, can see it.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "own progress: read"   on public.progress;
drop policy if exists "own progress: insert" on public.progress;
drop policy if exists "own progress: update" on public.progress;
drop policy if exists "own progress: delete" on public.progress;

create policy "own progress: read"   on public.progress for select to authenticated using (auth.uid() = user_id);
create policy "own progress: insert" on public.progress for insert to authenticated with check (auth.uid() = user_id);
create policy "own progress: update" on public.progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own progress: delete" on public.progress for delete to authenticated using (auth.uid() = user_id);

-- People who are not signed in get nothing at all.
revoke all on public.progress from anon;
grant select, insert, update, delete on public.progress to authenticated;
