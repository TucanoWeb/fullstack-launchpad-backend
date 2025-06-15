-- Criação da tabela para requisições de boilerplate IA
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS ai_boilerplate_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  overview TEXT,
  tech_rationale TEXT,
  directory_structure TEXT,
  frontend_guide TEXT,
  backend_guide TEXT,
  database_guide TEXT,
  docker_guide TEXT,
  next_steps TEXT,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
