const { parentPort } = require('worker_threads')
const { getTable, setTable, setService, getService } = require('../utils/table.util.js')
const { m1 } = require('../grpc/microservices.js')
const { addLog } = require('../utils/logs.util.js')

parentPort.on('message', async ()=>{
    const data = await m1.readProducts()
    const { ram, cpu, error } = data.performance
    setService('m1', {
        ram,
        cpu,
        processes: 0,
        time: 0,
        error
    })
    addLog('m1', getService('m1'))
    parentPort.postMessage(data.products)
})
