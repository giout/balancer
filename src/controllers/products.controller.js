const { Worker } = require('worker_threads')
const path = require('path')
const { addProcess, removeProcess, getProcesses, setService } = require('../utils/table.util.js')
const { addLog } = require('../utils/logs.util')
const CustomError = require('../utils/error.util')

const getProducts = async (req, res, next) => {
    try {
        // se elige el microservicio
        // se inicia el proceso
        let initial = new Date().getTime()
        addProcess('m1')
        
        // se inicia el worker        
        const worker = new Worker(path.join(__dirname, '../balancing/worker.js'))
        worker.postMessage('')

        worker.on('message', (response) => {
            removeProcess('m1')

            // se obtiene y manipula la respuesta del microservicio
            const { ram, cpu, error } = response.performance

            if (error)
                throw new CustomError('Service failed', 500)

            // se recopilan los datos de rendimiento
            const data = {
                ram,
                cpu,
                processes: getProcesses('m1'),
                time: new Date().getTime() - initial
            }

            // se imprime el log
            addLog('m1', data)

            // se actualiza la tabla
            setService('m1', data)

            res.status(200).json(response.products)
        })
    } catch (e) {
        next(e)
    }
    
}

module.exports = {
    getProducts
}