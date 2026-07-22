-- Run this once in Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists kv_store (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists review_history (
  id bigserial primary key,
  timestamp timestamptz not null,
  evidence_id text,
  extraction_id text,
  reviewer_initials text,
  action text,
  changed_fields jsonb,
  previous_value_summary text,
  new_value_summary text
);

alter table kv_store enable row level security;
alter table review_history enable row level security;

-- Service role key bypasses RLS entirely (used server-side only via SUPABASE_SERVICE_ROLE_KEY).
-- No public/anon policies are created, so anon key has zero access to these tables.

-- Storage buckets: create via Storage UI, or here.
insert into storage.buckets (id, name, public)
values ('evidence-private', 'evidence-private', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('evidence-public', 'evidence-public', true)
on conflict (id) do nothing;
