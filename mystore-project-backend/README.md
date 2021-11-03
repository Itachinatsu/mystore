# MyStore Backend API

This is a Node backend using Express framework that acts as API for creating users, products and orders to support an online storefront web application.

---

## Getting Started

The following instructions will set up the application for development and testing on your local machine.

### 1. PostgreSQL

Download and install a PostgreSQL database system on your local machine: https://www.postgresql.org/download/

Start the server on port **5432**.

The installation comes with the PSQL interactive terminal:
`/Applications/Postgres.app/Contents/Versions/latest/bin/psql`

### 2. Database instances

Create the following dev and test database instances via `psql`:

```
CREATE USER full_stack_user WITH PASSWORD 'password123';

CREATE DATABASE full_stack_dev;

GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;


CREATE USER test_user WITH PASSWORD 'password123';

CREATE DATABASE full_stack_test;

GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO test_user;
```

### 2. Application pre-requisites

Install the following prior to cloning the project repository:

- Node.js version 14 JavaScript runtime: https://nodejs.org/en/download/releases/

Clone the project repository: https://github.com/markdeleon01/mystore-project-backend

### 3. Environment setup

At the root of the project directory, create a `.env` file that contains the following entries:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_TEST_DB=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_TEST_USER=test_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=pepper
SALT_ROUNDS=10
TOKEN_SECRET=the_absolute_secret
```

### 4. Project installation

Execute the command `yarn` at the root of the project directory to install the dependencies.

Execute the command `yarn db-setup` to initialize the database schema.

---

## Running the application

To run the tests:
`yarn test`

To run the application in Node:
`yarn start`

To run the application in development watch mode:
`yarn watch`

The application runs on: http://localhost:3000

The available API endpoints are described in:  [REQUIREMENTS.md](https://github.com/markdeleon01/mystore-project-backend/blob/main/REQUIREMENTS.md)
