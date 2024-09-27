require('dotenv/config.js')
const path = require('path')
const { Worker } = require('worker_threads')

const requests = Number(process.env.REQUESTS)
for (let i=0; i<requests; i++){
    const workerRequest = new Worker(path.join(__dirname, './worker.js'))
    // start worker
    workerRequest.postMessage('')
    // retrieve worker response
    workerRequest.on('message', (msg) => {
        console.log(msg)
        workerRequest.terminate()
    })
}