# 🎉 API São João CG

> Plataforma Full Stack desenvolvida para centralizar informações sobre o Maior São João do Mundo, realizado em Campina Grande - PB.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)
![License](https://img.shields.io/badge/Status-Portfolio-success)

## 📌 Sobre o Projeto

Durante o período junino, informações sobre shows, polos culturais e atrações ficam espalhadas em diversos canais, como sites, redes sociais e páginas de divulgação independentes.

O **API São João CG** nasceu com o objetivo de centralizar essas informações em uma única plataforma, permitindo consultar polos culturais, programação de shows, artistas e atrações de forma simples e organizada.

Além da API REST, o projeto conta com um portal web responsivo para visualização dos dados de maneira intuitiva.

<div align="center">
<img src="https://github.com/user-attachments/assets/b864d1ae-639e-4867-ab08-4d16cca565c0" />
</div>

---

## ✨ Funcionalidades

- 🎵 Consulta da programação dos shows
- 🎤 Consulta de artistas participantes
- 🏡 Listagem dos polos culturais
- 📍 Localização dos polos em mapa interativo
  <div align="center">
    <img src="https://github.com/user-attachments/assets/7bcb2a03-7ec4-4057-8569-d666e1beb394" />
  </div>
- 🔎 Busca de artistas e atrações
- 📱 Interface responsiva
- 📊 Estatísticas do evento
- 🏷 Identificação de eventos gratuitos e pagos
- 🚂 Informação sobre disponibilidade de atrações especiais
- 📖 Documentação completa via Swagger/OpenAPI

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Uso |
|------------|---------|---------|
| Java | 21 | Linguagem principal |
| Spring Boot | 4.0.6 | Framework |
| Spring Data JPA | — | Persistência |
| PostgreSQL | 16 | Banco de dados |
| Flyway | — | Versionamento do banco |
| Lombok | — | Redução de boilerplate |
| SpringDoc OpenAPI | 2.8.9 | Swagger |
| Docker Compose | — | Ambiente local |

### Frontend

- HTML5
- CSS3
- JavaScript Vanilla
- Leaflet Maps

---

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas:

- **Controller** → Endpoints REST
- **Service** → Regras de negócio
- **Repository** → Acesso ao banco de dados
- **DTO** → Transferência de dados
- **Entity** → Mapeamento JPA
- **Flyway** → Controle das migrations

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Java 21+
- Maven 3.9+
- Docker e Docker Compose

### Opção 1 - Desenvolvimento

Subir apenas o banco:

```bash
docker-compose up postgres pgadmin -d
```

Executar a aplicação:

```bash
./mvnw spring-boot:run
```

### Opção 2 - Ambiente Completo

```bash
docker-compose up --build
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

---

## 📖 Documentação da API

### Swagger UI

```text
http://localhost:8080/swagger-ui.html
```
<div align="center">
<img src="https://github.com/user-attachments/assets/a474b955-999f-4d22-98a7-49239bd006e6" />
</div>

### OpenAPI JSON

```text
http://localhost:8080/api-docs
```

---

## 🔌 Endpoints

### Polos Culturais

| Método | Endpoint | Descrição |
|----------|------------|------------|
| GET | `/api/polos` | Lista todos os polos |
| GET | `/api/polos?tipo=PUBLICO` | Filtra por tipo |
| GET | `/api/polos?gratuito=true` | Apenas gratuitos |
| GET | `/api/polos/{id}` | Detalhes completos do polo |

### Shows

| Método | Endpoint | Descrição |
|----------|------------|------------|
| GET | `/api/shows` | Todos os shows |
| GET | `/api/shows?poloId=1` | Shows por polo |
| GET | `/api/shows?artistaId=4` | Shows por artista |
| GET | `/api/shows?data=2026-06-23` | Shows por data |
| GET | `/api/shows?mes=6&ano=2026` | Shows do mês |
| GET | `/api/shows/{id}` | Show por ID |

### Artistas

| Método | Endpoint | Descrição |
|----------|------------|------------|
| GET | `/api/artistas` | Todos os artistas |
| GET | `/api/artistas?nome=Elba` | Busca por nome |
| GET | `/api/artistas?genero=Forró` | Busca por gênero |
| GET | `/api/artistas/{id}` | Artista com shows |
| GET | `/api/artistas/{id}/shows` | Shows do artista |
| GET | `/api/artistas/busca?nome=João Gomes` | Busca de shows por artista |

---

## 🗺️ Polos Cadastrados

| Polo | Tipo | Entrada |
|--------|---------|---------|
| Parque do Povo | Público | Gratuita |
| Vila Sítio São João | Público | Gratuita |
| Vila do Artesão | Público | Gratuita |
| Carvalheira na vila | Privado | Paga |
| Trem do Forró | Público | Paga |
| Arraiá de Cumpade | Privado | Paga |
| Campestre | Privado | Paga |
| Galante | Público | Gratuita |

---

## 🗄️ Banco de Dados

### pgAdmin

```text
http://localhost:5050
```

### Credenciais

```text
Email: admin@saojoao.com
Senha: admin
```

### Servidor PostgreSQL

```text
Host: postgres
Usuário: postgres
Senha: postgres
```

---

## 📂 Estrutura do Projeto

```text
src/main/java/com/campinagrande/saojoao/
├── config/
├── controller/
├── dto/
├── entity/
├── exception/
├── repository/
└── service/

src/main/resources/
├── application.properties
└── db/migration/
    ├── V1__create_tables.sql
    ├── V2__seed_polos.sql
    ├── V3__seed_artistas.sql
    ├── V4__seed_shows.sql
    └── V5__seed_atracoes_culturais.sql

frontend/
├── css/
├── js/
├── img/
└── index.html
```

---

## 💡 Melhorias Futuras

⭐ Favoritar artistas e shows

📅 Agenda personalizada do usuário

🔔 Notificações de atrações

☁️ Deploy completo da aplicação

---

## 🎯 Objetivos de Aprendizado

Este projeto foi desenvolvido para praticar:

- Desenvolvimento de APIs REST com Spring Boot
- Modelagem de banco de dados relacional
- Integração Frontend e Backend
- Documentação de APIs
- Docker e ambientes de desenvolvimento
- Organização e arquitetura de aplicações Full Stack
- Consumo de APIs com JavaScript
- Responsividade e experiência do usuário

---

## 💡 Motivação

Como morador da Paraíba e acompanhando de perto o período junino, percebi que as informações sobre polos culturais, artistas e programação do São João estavam distribuídas em diversos locais.

O objetivo deste projeto foi criar uma solução que reunisse essas informações em uma única plataforma, facilitando o acesso para moradores, turistas e interessados no evento.

Além de resolver um problema real, o projeto serviu como laboratório para aprofundar conhecimentos em desenvolvimento backend, frontend e integração de sistemas.

---

### Contato

- LinkedIn: https://www.linkedin.com/in/marcus-toledo
