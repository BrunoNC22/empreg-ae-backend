# Empreg-ae Backend

Este é o backend da aplicação **Empreg-ae**, uma plataforma que facilita o processo de recrutamento e empregabilidade.

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Docker**
- **Docker Compose**
- **TypeORM**
- **Swagger**

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## Instruções para Clonar o Repositório

Clone o repositório em sua máquina local:

```bash
git clone https://github.com/BrunoNC22/empreg-ae-backend.git
cd empreg-ae-backend
```

## Configuração do Ambiente

1 - Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```
# Configuração do CORS
CORS_ORIGIN=http://empregae-frontend:8080

# Configuração da Aplicação
APP_PORT=9999

# Configuração do Banco de Dados
DATABASE_TYPE=postgres
DATABASE_HOST=empregae-db
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=empregae
DATABASE_AUTO_LOAD_ENTITIES=true
DATABASE_SYNCHRONIZE=true

# Configuração do PgAdmin
PGADMIN_USER=your_pgadmin_email
PGADMIN_PASSWORD=your_pgadmin_password
```

## Executando a Aplicação com Docker Compose MODO DE DESENVOLVIMENTO
Para subir a aplicação e seus serviços (banco de dados, PgAdmin), execute:

```
docker compose up
```

Este comando irá:

 - Construir as imagens necessárias.
 - Criar e iniciar os containers para o backend, PostgreSQL e PgAdmin.

 ## Executando a Aplicação com Docker Compose MODO DE PRODUÇÃO
Para subir a aplicação e seus serviços (banco de dados, PgAdmin), execute:

```
docker compose -f docker-compose.prod.yaml up
```

Este comando irá:

 - Construir as imagens necessárias.
 - Criar e iniciar os containers para o backend, PostgreSQL e o frontend.

**A aplicação estará rodando em: http://localhost:9999**

### Acessando o PgAdmin (somente desenvolvimento)
PgAdmin estará disponível em: http://localhost:8080
Utilize o e-mail e senha configurados no arquivo .env para acessar o PgAdmin.

### Acessando o frontend (somente produção)
O frontend estará disponivel em: http://localhost:8080/login
Entre com suas informações para explorar a aplicação

### Documentação da API
A documentação da API pode ser acessada via Swagger em: http://localhost:9999/documentation
