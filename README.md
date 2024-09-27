# Load balancer
This is a didactical project about a simple implementation of a load balancer that is connected to three gRPC microservices, these connected to a Postgres database. Balancer receives an http request at the corresponding endpoint and it must execute a SELECT query, but instead of doing it itself, it chooses between the three microservices to perform the action basing on their performance. The history of all requests and the performance of the chosen microservice to each one of them will be printed in a txt file.

A load balancer is useful when the server receives many requests in a short amount of time. To test this balancer, there was developed a client emulator that can send any number of requests at the same time.

It is important to clarify that this project is developed to be tested in one computer, for it is a didactal project about load balancing and microservices.

- [Demo](#demo)
- [Tech stack](#tech-stack)
- [Required installations](#required-installations)
- [Environment variables](#environment-variables)
- [How to test balancer](#how-to-test-balancer)
- [Balancer algorithm](#balancer-algorithm)
- [Client emulator algorithm](#cliente-emulator-algorithm)

## Demo
https://youtu.be/i2Co2rB6ygc

## Tech stack
* [Node.js](https://nodejs.org)
* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [Express](https://expressjs.com)
* [PostgreSQL](https://www.postgresql.org/)
* [gRPC](https://grpc.io/)

## Required installations
* [Node.js](https://nodejs.org/) - This project was developed using Node v20.10.0.
* [PostgreSQL](https://www.postgresql.org/) - This project was developed using Postgres 12

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
<td>REQUESTS</td>
<td>Number of requests client emulator will send</td>
</tr>
</table>

## How to test balancer

### 1. Create .env file in / and add the corresponding values
You can see .env.example to have a reference

### 2. Create logs.txt file in /
This file will be written with the history of the requests that are made.

### 3. Start server (balancer)
```sh
$ npm run start
```

### 4. Start microservices
Microservice 1
```sh
$ npm run m1
```
Microservice 2
```sh
$ npm run m2
```
Microservice 3
```sh
$ npm run m3
```

### 5. Run client emulator to send requests
```sh
$ npm run client
```

### 6. Watch balancing results in logs.txt
Every request has its number according to the moment it was sent. For example: request 1 was sent before request 2. However, request 2 can finish before request 1. In logs.txt, requests are written when they are finished and there is a register of the microservice that took that request and the description of its resources the moment the request was made.

Let's see an example: 

Request 23 -> m2
------------------------------------------------
Free RAM -> 0.5025482177734375GB
CPU speed -> 2400MHZ
Amount of current processes -> 16
Response time -> 25918ms
------------------------------------------------


Request 12 -> m3
------------------------------------------------
Free RAM -> 0.5032691955566406GB
CPU speed -> 2400MHZ
Amount of current processes -> 15
Response time -> 26046ms
------------------------------------------------

We can visualize that request 23 was finished before request 12, with the next details:
- It was taken by microservice 2.
- When microservice 2 took the request and made the SQL query, it had 2400MHZ of CPU speed, 0.50GB of free RAM, 15 processes running and it lasted 26046ms to perform the action.

## Balancer algorithm
This is the process that occurs when one http request is sent to the server.
- Server (balancer) receives a http request GET /products.
- Server registers the number of request.
- Server chooses a microservice. To do this, it executes these calculations:
    - The microservice with the most free RAM, gets 4 points.
    - The microservice with the most CPU speed, gets 3 points.
    - The microservice with the least amount of processes, gets 5 points.
    - The microservice that had the least reponse time in the last request, gets 4 points.
    - The microservice with the most points is chosen.
- Server register a new process to that microservice.
- Server creates a worker and inside that worker it sends a http/2 request (gRPC) to the chosen microservice to perform the requested action.
- Microservice performs the requested action and sends the response. In the response object, it will also send its resources (free RAM, CPU speed).
- When microservice response arrives, server calculates response time, store in memory all current performance attributes of that microservice (processes, CPU speed, free RAM, response time).
- Server prints a new entry in logs.txt.

## Client emulator algorithm
Client emulator consists on a script that contains a for loop of n (REQUESTS) iterations, inside of this loop the next logic block is executed:
- Create a worker.
- Inside that worker, send a request to the server.