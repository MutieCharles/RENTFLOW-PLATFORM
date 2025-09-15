/*--Core DB schema for RentRoll application
--Add indexes, FKs, and partitioning as needed.


-- users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- properties/rooms
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id),
  name text NOT NULL
);

CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id),
  number text,
  status text,
  created_at timestamptz DEFAULT now()
);

-- tenants
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  room_id uuid REFERENCES rooms(id),
  created_at timestamptz DEFAULT now()
);

-- payments ledger (append-only)
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  room_id uuid,
  property_id uuid,
  amount numeric(12,2) NOT NULL,
  currency text DEFAULT 'KES',
  provider text,               -- 'safaricom'|'jenga'|'coop'
  provider_txn_id text,        -- id from provider
  idempotency_key text,        -- ensure no double-processing
  status text NOT NULL,        -- 'initiated'|'pending'|'success'|'failed'|'reversed'
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_payments_tenant ON payments(tenant_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_provider_txn ON payments(provider_txn_id);

-- provider_events (raw webhook receipts; persisted for audit)
CREATE TABLE provider_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  raw_payload jsonb,
  received_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false
);

-- batch processing
CREATE TABLE batch_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid,
  scheduled_date date,
  status text,
  created_at timestamptz DEFAULT now()
);
*/

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    number VARCHAR(10) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'vacant' 
        CHECK (status IN ('vacant', 'occupied', 'overdue'))
);

-- Optional: create tenants table for future relations
CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    room_id INT REFERENCES rooms(id) ON DELETE SET NULL
);
