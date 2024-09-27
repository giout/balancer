# Load balancer
This is a didactical project that shows a load balancer that performas an action by choosing one from three gRPC microservices (all performing the same action) basing on the realtime performance level. In a logs.txt file there will be displayed the whole calculation of the balancer basing on data like free RAM, response time, etc. of each microservice.

This is useful if 100 requests are sent at the same time. This can be done using a client emulator.

- [Tech stack](#tech-stack)
- [Required installations](#required-installations)
- [Commands](#commands)
- [Environment variables](#environment-variables)

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
<tr>
<td>M1</td>
<td>Microservice 1 URL to which the balancer will send the gRPC request</td>
</tr>
<tr>
<td>M2</td>
<td>Microservice 2 URL to which the balancer will send the gRPC request</td>
</tr>
<tr>
<td>M3</td>
<td>Microservice 3 URL to which the balancer will send the gRPC request</td>
</tr>
</table>