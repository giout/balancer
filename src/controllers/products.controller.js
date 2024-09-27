const { Worker } = require('worker_threads')
const path = require('path')
const { addProcess, removeProcess, getProcesses, setService, chooseService } = require('../utils/table.util.js')
const { addLog } = require('../utils/logs.util')
const CustomError = require('../utils/error.util')

let requests = 0

const getProducts = async (req, res, next) => {
    try {   
        requests++
        const requestNumber = requests

        // choose microservice
        const service = chooseService()

        // start execution
        let initial = new Date().getTime()
        addProcess(service)

        // start worker        
        const worker = new Worker(path.join(__dirname, '../balancing/worker.js'))
        worker.postMessage(service)

        worker.on('message', (response) => {
            removeProcess(service)

            // obtain and manipulate microservice response
            const { ram, cpu, error } = response.performance

            if (error)
                throw new CustomError('Service failed', 500)

            // obtain performance data
            const data = {
                ram,
                cpu,
                processes: getProcesses(service),
                time: new Date().getTime() - initial
            }

            // print logs
            addLog(requestNumber, service, data)

            // update logs table
            setService(service, data)

            worker.terminate()

            res.status(200).json(response.products)
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getProducts
}