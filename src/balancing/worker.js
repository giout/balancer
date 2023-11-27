const { parentPort } = require('worker_threads')

if (parentPort)
parentPort.on('message', (message)=>{
    console.log('server message -> ', message)
    parentPort.postMessage('si.')
})
