-- iForge admin panel — Supabase schema
--
-- Run this once in your Supabase project (SQL Editor → New query → paste → Run).
-- It creates the single table that stores all admin-editable site content as
-- one JSON document, and the policies that let the public read it while only
-- the service-role key (used by the server) can write.

create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Seed the single row the app reads/writes.
insert into public.site_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Row-level security: anyone may READ the published content; nobody may write
-- with the anon key. The server writes with the service-role key, which bypasses
-- RLS, so no write policy is needed.
alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content
  for select
  using (true);
