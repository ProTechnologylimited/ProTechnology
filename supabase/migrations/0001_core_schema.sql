-- ProTech core schema. Money = integer minor units (kobo/cents). Never floats.
create extension if not exists pgcrypto;

create type app_role as enum ('customer','staff','admin');
create type sub_status as enum ('pending','active','past_due','cancelled_pending_end','cancelled','expired');
create type txn_status as enum ('initiated','succeeded','failed','refunded');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null, business_name text, country text not null,
  intended_service text, created_at timestamptz not null default now()
);

create table user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null, primary key (user_id, role)
);

create or replace function has_role(r app_role) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from user_roles where user_id = auth.uid() and role = r) $$;

create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name, country, business_name, intended_service)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(new.raw_user_meta_data->>'country',''),
          new.raw_user_meta_data->>'business_name', new.raw_user_meta_data->>'intended_service');
  insert into user_roles (user_id, role) values (new.id, 'customer');  -- always customer; never from client input
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

create table pricing_plans (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  description text, amount_minor bigint check (amount_minor >= 0), currency char(3) not null default 'USD',
  billing_interval text not null check (billing_interval in ('monthly','annual','custom')),
  usage_limits jsonb not null default '{}', is_active boolean not null default true, display_order int not null default 0,
  created_at timestamptz not null default now()
);
create table plan_features (
  id uuid primary key default gen_random_uuid(), plan_id uuid not null references pricing_plans(id) on delete cascade,
  label text not null, is_limitation boolean not null default false, display_order int not null default 0
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
  plan_id uuid not null references pricing_plans(id), status sub_status not null default 'pending',
  provider text not null, provider_subscription_ref text,
  current_period_end timestamptz, cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(), unique (provider, provider_subscription_ref)
);
create index on subscriptions (user_id);

create table payment_transactions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
  subscription_id uuid references subscriptions(id), provider text not null, reference text not null,
  amount_minor bigint not null check (amount_minor > 0), currency char(3) not null,
  status txn_status not null default 'initiated', verified_at timestamptz,
  created_at timestamptz not null default now(), unique (provider, reference)
);
create index on payment_transactions (user_id);

create table payment_webhook_events (
  id uuid primary key default gen_random_uuid(), provider text not null, event_id text not null,
  event_type text not null, payload jsonb not null, processed_at timestamptz,
  received_at timestamptz not null default now(), unique (provider, event_id)
);

create table enquiries (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, company text,
  subject text not null, service_of_interest text, message text not null, consent boolean not null,
  status text not null default 'new' check (status in ('new','contacted','qualified','proposal_sent','won','lost','archived')),
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id),
  action text not null, target text, meta jsonb, created_at timestamptz not null default now()
);

-- ===== Row Level Security =====
alter table profiles enable row level security;
alter table user_roles enable row level security;
alter table pricing_plans enable row level security;
alter table plan_features enable row level security;
alter table subscriptions enable row level security;
alter table payment_transactions enable row level security;
alter table payment_webhook_events enable row level security;
alter table enquiries enable row level security;
alter table audit_logs enable row level security;

create policy profiles_read on profiles for select using (id = auth.uid() or has_role('admin') or has_role('staff'));
create policy profiles_self_update on profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy roles_read on user_roles for select using (user_id = auth.uid() or has_role('admin'));
-- No write policies on user_roles: only the service role can change roles.
create policy plans_read on pricing_plans for select using (is_active or has_role('admin'));
create policy plans_admin_write on pricing_plans for all using (has_role('admin')) with check (has_role('admin'));
create policy features_read on plan_features for select using (true);
create policy features_admin_write on plan_features for all using (has_role('admin')) with check (has_role('admin'));
create policy subs_read on subscriptions for select using (user_id = auth.uid() or has_role('admin'));
create policy txns_read on payment_transactions for select using (user_id = auth.uid() or has_role('admin'));
-- subscriptions, payment_transactions, payment_webhook_events: no client write policies (service role only).
create policy enquiries_read on enquiries for select using (has_role('admin') or has_role('staff'));
create policy enquiries_update on enquiries for update using (has_role('admin') or has_role('staff'));
create policy audit_read on audit_logs for select using (has_role('admin'));
-- Enquiry inserts go through a server route (validation + spam protection), not direct client access.
