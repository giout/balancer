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

        // se elige el microservicio
        const service = chooseService()

        // se inicia el proceso
        let initial = new Date().getTime()
        addProcess(service)

        // se inicia el worker        
        const worker = new Worker(path.join(__dirname, '../balancing/worker.js'))
        worker.postMessage(service)

        worker.on('message', (response) => {
            removeProcess(service)

            // se obtiene y manipula la respuesta del microservicio
            const { ram, cpu, error } = response.performance

            if (error)
                throw new CustomError('Service failed', 500)

            // se recopilan los datos de rendimiento
            const data = {
                ram,
                cpu,
                processes: getProcesses(service),
                time: new Date().getTime() - initial
            }

            // se imprime el log
            addLog(requestNumber, service, data)

            // se actualiza la tabla
            setService(service, data)

            res.status(200).json(response.products)
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getProducts
}