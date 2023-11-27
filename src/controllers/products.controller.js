const { Worker } = require('worker_threads')
const path = require('path')

const getProducts = async (req, res, next) => {
    // se inicia el worker
    const worker = new Worker(path.join(__dirname, '../balancing/worker.js'))
    
    worker.postMessage('')

    worker.on('message', (products) => {
        res.json(products)
    })
}

module.exports = {
    getProducts
}