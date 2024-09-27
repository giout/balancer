require('dotenv/config.js')
const axios = require('axios')
const { parentPort } = require('worker_threads')

parentPort.on('message', async () => {
    try {
        // send request to server
        const url = `http://127.0.0.1:${process.env.PORT}/products`
        await axios.get(url)
        // finish process
        parentPort.postMessage(`Request sent`)
    } catch(e) {
        console.log(e)
    }
})