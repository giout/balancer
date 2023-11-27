const { Worker } = require('worker_threads')
const path = require('path')

const getProducts = async (req, res, next) => {
    // se inicia el worker
    const worker = new Worker(path.join(__dirname, '../balancing/worker.js'))
    
    worker.postMessage('data')

    worker.on('message', (message) => {
        console.log('worker response -> ', message)
    })
    
    res.end()
}

module.exports = {
    getProducts
}