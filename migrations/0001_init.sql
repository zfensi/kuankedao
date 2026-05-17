DROP TABLE IF EXISTS partner_client_industries;
DROP TABLE IF EXISTS partner_service_regions;
DROP TABLE IF EXISTS partner_service_categories;
DROP TABLE IF EXISTS partner_applications;
DROP TABLE IF EXISTS request_promotion_goals;
DROP TABLE IF EXISTS request_target_markets;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS resource_advantages;
DROP TABLE IF EXISTS resource_scenarios;
DROP TABLE IF EXISTS resource_regions;
DROP TABLE IF EXISTS resource_tags;
DROP TABLE IF EXISTS resource_cases;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS articles;

CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_range TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  recommended INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE resource_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);

CREATE TABLE resource_regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id TEXT NOT NULL,
  region TEXT NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);

CREATE TABLE resource_scenarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id TEXT NOT NULL,
  scenario TEXT NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);

CREATE TABLE resource_advantages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id TEXT NOT NULL,
  advantage TEXT NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);

CREATE TABLE resource_cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id TEXT NOT NULL,
  title TEXT NOT NULL,
  result TEXT NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);

CREATE TABLE requests (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_value TEXT NOT NULL,
  industry TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  project_cycle TEXT NOT NULL,
  requirement_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE request_target_markets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL,
  market TEXT NOT NULL,
  FOREIGN KEY (request_id) REFERENCES requests(id)
);

CREATE TABLE request_promotion_goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL,
  goal TEXT NOT NULL,
  FOREIGN KEY (request_id) REFERENCES requests(id)
);

CREATE TABLE partner_applications (
  id TEXT PRIMARY KEY,
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_value TEXT NOT NULL,
  case_summary TEXT NOT NULL,
  website TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reviewing',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE partner_service_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL,
  category TEXT NOT NULL,
  FOREIGN KEY (application_id) REFERENCES partner_applications(id)
);

CREATE TABLE partner_service_regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL,
  region TEXT NOT NULL,
  FOREIGN KEY (application_id) REFERENCES partner_applications(id)
);

CREATE TABLE partner_client_industries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL,
  industry TEXT NOT NULL,
  FOREIGN KEY (application_id) REFERENCES partner_applications(id)
);

CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  cover TEXT NOT NULL,
  topic TEXT NOT NULL,
  summary TEXT NOT NULL,
  content_md TEXT NOT NULL,
  published_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_articles_topic ON articles(topic);
