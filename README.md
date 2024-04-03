# improvements:
I changed the architecture of this project from the ground up and migrated to a civilized and scalable project.

* Dependency injection

* Domain Driven Design (DDD)
* Repository Pattern
* Event Sourcing: Use MongoDB to save events/states
* CQRS: use @nest/cqrs  and also Separate Command and Query in repository patterns but in the same database for simplification 

## Installation

```bash
$ yarn install
$ docker-compose up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Unit test

<p align="center">
  <img src="./assets/Screenshot 2024-03-19 094020.png" width="1000" alt="Nest Logo" />
</p>
# E2E test

<p align="center">
  <img src="./assets/Screenshot 2024-03-19 104503.png" width="1000" alt="Nest Logo" />
</p>
