const { parentPort } = require('worker_threads')
const services = require('../grpc/microservices.js')

parentPort.on('message', async (service)=>{
    const data = await services[service].readProducts()
    parentPort.postMessage(data)
})
