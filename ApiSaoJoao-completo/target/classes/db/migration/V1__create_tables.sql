-- V1__create_tables.sql
-- Criação das tabelas do São João de Campina Grande

CREATE TABLE polos (
    id                  BIGSERIAL PRIMARY KEY,
    nome                VARCHAR(150) NOT NULL,
    descricao           TEXT,
    endereco            VARCHAR(255) NOT NULL,
    bairro              VARCHAR(100) NOT NULL,
    latitude            DOUBLE PRECISION,
    longitude           DOUBLE PRECISION,
    imagem_url          VARCHAR(500),
    tipo                VARCHAR(20) NOT NULL CHECK (tipo IN ('PUBLICO', 'PRIVADO')),
    capacidade_estimada INTEGER,
    tem_entrada_gratuita BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE artistas (
    id              BIGSERIAL PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    genero_musical  VARCHAR(100),
    bio             TEXT,
    imagem_url      VARCHAR(500),
    instagram       VARCHAR(150)
);

CREATE TABLE shows (
    id               BIGSERIAL PRIMARY KEY,
    data_hora        TIMESTAMP NOT NULL,
    duracao_minutos  INTEGER DEFAULT 60,
    observacoes      TEXT,
    polo_id          BIGINT NOT NULL REFERENCES polos(id),
    artista_id       BIGINT NOT NULL REFERENCES artistas(id)
);

CREATE TABLE atracoes_culturais (
    id                   BIGSERIAL PRIMARY KEY,
    nome                 VARCHAR(150) NOT NULL,
    descricao            TEXT,
    tipo                 VARCHAR(50) NOT NULL CHECK (tipo IN ('ARTESANATO','CULINARIA','DANCA','EXPOSICAO','PARQUE_DIVERSOES','CULTURAL')),
    horario_funcionamento VARCHAR(100),
    imagem_url           VARCHAR(500),
    polo_id              BIGINT NOT NULL REFERENCES polos(id)
);

CREATE INDEX idx_shows_data_hora  ON shows(data_hora);
CREATE INDEX idx_shows_polo_id    ON shows(polo_id);
CREATE INDEX idx_shows_artista_id ON shows(artista_id);
CREATE INDEX idx_artistas_nome    ON artistas(nome);
