-- Road to PMP: your PMI books online, for every signed-in account.
--
-- How to run it: in your Supabase project, open "SQL Editor", paste all of this, and press Run.
-- It is safe to run more than once, and it replaces the earlier version (with a readers list).
-- Then upload the books into the "books" storage (steps in docs/ACCOUNTS.md, "One-time setup of
-- the online books").
--
-- What it makes:
--   - a private storage place "books" for the PDFs, never public: nobody who is signed out can
--     open them, and no plain web address leads to them;
--   - every signed-in account may open the books;
--   - a record of every new book link with the book's size, and a monthly stop at 4 GB, which keeps
--     the downloads 1 GB under the free plan's 5 GB a month. The stop is checked here, in the
--     project, so no app or browser can go past it.
--
-- Who can sign in: anyone who signs up on the website, unless you switch off new sign-ups in
-- Authentication (see docs/ACCOUNTS.md). Then only the accounts that already exist can.

-- The private storage place. Only PDFs, at most 50 MB each (the free plan's limit).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('books', 'books', false, 52428800, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 52428800, allowed_mime_types = array['application/pdf'];

-- The earlier version's readers list is no longer used.
drop policy if exists "books: readers make links" on storage.objects;
drop table if exists public.book_readers;

-- Every new link to a book, with the book's size in bytes.
create table if not exists public.book_downloads (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  book text not null,
  bytes bigint not null,
  at timestamptz not null default now()
);
alter table public.book_downloads enable row level security;
revoke all on public.book_downloads from anon, authenticated;

-- The bytes counted this calendar month (UTC), for all accounts together.
create or replace function public.book_month_bytes() returns bigint
language sql stable security definer set search_path = public as $$
  select coalesce(sum(bytes), 0)::bigint from public.book_downloads where at >= date_trunc('month', now())
$$;
revoke all on function public.book_month_bytes() from public, anon;
grant execute on function public.book_month_bytes() to authenticated;

-- Called by the app before it asks for a new link: checks the monthly stop, then records the whole
-- book's size (more than a browser usually downloads, so the count errs on the safe side).
create or replace function public.open_book(book text) returns json
language plpgsql security definer set search_path = public as $$
declare
  size bigint;
  used bigint;
  cap constant bigint := 4000000000;
begin
  if auth.uid() is null then
    raise exception 'sign in first';
  end if;
  select (metadata->>'size')::bigint into size from storage.objects where bucket_id = 'books' and name = book || '.pdf';
  if size is null then
    raise exception 'book not uploaded: %', book;
  end if;
  used := public.book_month_bytes();
  if used + size > cap then
    raise exception 'monthly limit reached';
  end if;
  insert into public.book_downloads (user_id, book, bytes) values (auth.uid(), book, size);
  return json_build_object('used', used + size, 'cap', cap);
end $$;
revoke all on function public.open_book(text) from public, anon;
grant execute on function public.open_book(text) to authenticated;

-- Signed-in accounts may make links to the books, but not once the month's 4 GB is used.
-- Nobody can upload, change or delete books from the app: you upload them in the dashboard.
drop policy if exists "books: signed-in accounts make links" on storage.objects;
create policy "books: signed-in accounts make links" on storage.objects for select to authenticated
  using (bucket_id = 'books' and public.book_month_bytes() < 4000000000);
