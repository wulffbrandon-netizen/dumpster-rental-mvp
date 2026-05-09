create extension if not exists "uuid-ossp";

create table if not exists admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists partner_haulers (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  contact_name text,
  phone text,
  email text,
  service_cities text[] default '{}',
  dumpster_sizes_offered text[] default '{}',
  base_pricing jsonb default '{}'::jsonb,
  notes text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  phone text not null,
  email text not null,
  address text,
  city text,
  zip text,
  delivery_date date,
  rental_duration_days int,
  dumpster_size text,
  project_type text,
  material_type text,
  estimated_weight_tons numeric,
  special_notes text,
  status text default 'New',
  quoted_price numeric,
  partner_cost numeric,
  estimated_min_price numeric,
  estimated_max_price numeric,
  partner_hauler_id uuid references partner_haulers(id),
  payment_status text default 'unpaid',
  customer_facing_notes text,
  internal_notes text,
  consent boolean default false,
  created_at timestamptz default now()
);

create table if not exists lead_notes (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  note_type text check (note_type in ('internal','customer')),
  message text not null,
  created_at timestamptz default now()
);

create table if not exists pricing_rules (
  id uuid primary key default uuid_generate_v4(),
  rule_type text not null,
  key text not null,
  value numeric not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists uploaded_photos (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete cascade,
  file_path text not null,
  public_url text,
  created_at timestamptz default now()
);
