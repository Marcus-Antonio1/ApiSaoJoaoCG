# 🎉 API São João de Campina Grande

> API REST do **Maior São João do Mundo** — Campina Grande, Paraíba, Brasil.

Projeto de portfólio desenvolvido em Java com Spring Boot, fornecendo dados sobre polos culturais, artistas, shows e atrações do São João de Campina Grande.

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Java | 21 | Linguagem |
| Spring Boot | 4.0.6 | Framework principal |
| Spring Data JPA | — | Persistência |
| PostgreSQL | 16 | Banco de dados |
| Flyway | — | Migrations |
| Lombok | — | Redução de boilerplate |
| SpringDoc OpenAPI | 2.8.9 | Swagger / Documentação |
| Docker Compose | — | Ambiente local |

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Java 21+
- Maven 3.9+
- Docker e Docker Compose

### Opção 1 — Só o banco no Docker (recomendado para desenvolvimento)

```bash
# Sobe apenas o PostgreSQL e o pgAdmin
docker-compose up postgres pgadmin -d

# Roda a API localmente
./mvnw spring-boot:run
```

### Opção 2 — Tudo no Docker

```bash
docker-compose up --build
```

A API estará disponível em: `http://localhost:8080`

---

## 📖 Documentação (Swagger)

Acesse o Swagger UI em:

```
http://localhost:8080/swagger-ui.html
```

JSON do OpenAPI em:
```
http://localhost:8080/api-docs
```

---

## 🔌 Endpoints

### Polos Culturais
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/polos` | Lista todos os polos |
| GET | `/api/polos?tipo=PUBLICO` | Filtra por tipo |
| GET | `/api/polos?gratuito=true` | Apenas gratuitos |
| GET | `/api/polos/{id}` | Detalhe + programação completa |

### Shows
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/shows` | Todos os shows |
| GET | `/api/shows?poloId=1` | Shows de um polo |
| GET | `/api/shows?artistaId=4` | Shows de um artista (por ID) |
| GET | `/api/shows?data=2025-06-23` | Shows em uma data específica |
| GET | `/api/shows?mes=6&ano=2025` | Shows de um mês inteiro |
| GET | `/api/shows/{id}` | Show por ID |

### Artistas
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/artistas` | Todos os artistas |
| GET | `/api/artistas?nome=Elba` | Busca por nome (parcial) |
| GET | `/api/artistas?genero=Forró` | Filtra por gênero musical |
| GET | `/api/artistas/{id}` | Artista com seus shows |
| GET | `/api/artistas/{id}/shows` | Só os shows do artista |
| GET | `/api/artistas/busca?nome=João Gomes` | **Busca shows por nome do artista** |

---

## 🗺️ Polos Cadastrados

| Polo | Tipo | Entrada |
|---|---|---|
| Parque do Povo | Público | Gratuita |
| Vila Sítio São João | Privado | Paga |
| Vila do Artesão | Público | Gratuita |
| Vila Forró | Público | Gratuita |
| Trem do Forró | Público | Paga |
| Arraiá de Cumpade | Privado | Paga |
| Campestre | Privado | Paga |

---

## 🗄️ Banco de dados (pgAdmin)

Acesse o pgAdmin em `http://localhost:5050`

- Email: `admin@saojoao.com`
- Senha: `admin`
- Host do servidor: `postgres`
- Usuário/Senha do banco: `postgres` / `postgres`

---

## 📂 Estrutura do Projeto

```
src/main/java/com/campinagramde/saojoao/
├── config/          # Swagger, CORS
├── controller/      # Controllers REST
├── dto/             # Data Transfer Objects
├── entity/          # Entidades JPA
├── exception/       # Tratamento de erros
├── repository/      # Interfaces JPA
└── service/         # Regras de negócio

src/main/resources/
├── application.properties
└── db/migration/    # Scripts Flyway
    ├── V1__create_tables.sql
    ├── V2__seed_polos.sql
    ├── V3__seed_artistas.sql
    ├── V4__seed_shows.sql
    └── V5__seed_atracoes_culturais.sql
```
