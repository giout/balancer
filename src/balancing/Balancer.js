require('dotenv/config.js')
const { Worker } = require('worker_threads')
const { m1, m2, m3 } = require('../grpc/microservices.js')
const path = require('path')

class Balancer {
    constructor(){
        // se hacen 3 llamadas para obtener datos iniciales de rendimiento y asi ubicarlos en la tabla
    }   

    // el balanceador procede a elegir el microservicio y devolver los datos
    async call(){
        await m1.readProducts()
        await m2.readProducts()
        await m3.readProducts()
        
        // inicia hilo 
        const thread = new Worker(path.join(__dirname, 'thread.js'))
        thread.postMessage('')
        /* thread.on('message', () => {

        }) */
    }
}

module.exports = Balancer