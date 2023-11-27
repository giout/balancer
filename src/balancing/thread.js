const { parentPort } = require('worker_threads')

if (parentPort)
parentPort.on('message', (table)=>{
    parentPort.postMessage('')
})
