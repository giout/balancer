# Load balancer
This is a didactical project about a simple implementation of a load balancer that is connected to three gRPC microservices, these connected to a Postgres database. 

A load balancer is useful when the server receives many requests in a short amount of time. To test this balancer, there was developed a client emulator that can send any number of requests at the same time.

- [Tech stack](#tech-stack)
- [Required installations](#required-installations)
- [Commands](#commands)
- [Environment variables](#environment-variables)
- [How to test balancer](#how-to-test-balancer)
- [Algorithm](#algorithm)

## Tech stack
* [Node.js](https://nodejs.org)
* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [Express](https://expressjs.com)
* [PostgreSQL](https://www.postgresql.org/)
* [gRPC](https://grpc.io/)

## Required installations
* [Node.js](https://nodejs.org/) - This project was developed using Node v20.10.0.
* [PostgreSQL](https://www.postgresql.org/) - This project was developed using Postgres 12

## Commands

### Start balancer
```sh
$ npm run start
```

### Start microservice 1
```sh
$ npm run m1
```

### Start microservice 2
```sh
$ npm run m2
```

### Start microservice 3
```sh
$ npm run m3
```

## Environment variables
Environment variables should be added to a .env in the root directory, following the structure of .env.example
<table>
<tr>
<th>Variable</th>
<th>Description</th>
</tr>
<tr>
<td>DB_URI</td>
<td>URI to connect to database</td>
</tr>
<tr>
<td>PORT</td>
<td>Server listening port</td>
</tr>
<tr>
<td>M1_PORT</td>
<td>Microservice 1 listening port</td>
</tr>
<tr>
<td>M2_PORT</td>
<td>Microservice 1 listening port</td>
</tr>
<tr>
<td>M3_PORT</td>
<td>Microservice 1 listening port</td>
</tr>
</table>