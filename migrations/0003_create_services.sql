CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('image', 'text')),
  sort_order INTEGER NOT NULL,
  created_date TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  alt TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS services_sort_order_idx ON services (sort_order ASC);
