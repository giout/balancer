// metodos para la manipulacion de table.js
let table = require('../balancing/table.js')

const chooseService = () => {
    const points = { m1: 0, m2: 0, m3: 0 }

    // se calculan los valores maximos/minimos
    const maxRam = Math.max(
        table['m1'].ram,
        table['m2'].ram,
        table['m3'].ram
    )

    const maxCpu = Math.max(
        table['m1'].cpu,
        table['m2'].cpu,
        table['m3'].cpu
    )

    const minProcesses = Math.min(
        table['m1'].processes,
        table['m2'].processes,
        table['m3'].processes
    )

    const minTime = Math.min(
        table['m1'].time,
        table['m2'].time,
        table['m3'].time
    )

    // se agregan los puntos
    for (const s of ['m1', 'm2', 'm3']) {
        if (table[s].ram == maxRam) 
            points[s] += 4

        if (table[s].cpu == maxCpu){
            points[s] += 3
        }

        if (table[s].processes == minProcesses){
            points[s] += 5
        }

        if (table[s].time == minTime){
            points[s] += 4
        }
    }

    // se elige el que tenga mas puntos
    const { m1, m2, m3 } = points
    if (m1 >= m2 && m1 >= m3) 
        return 'm1'

    if (m2 > m1 && m2 >= m3) 
        return 'm2'

    if (m3 > m1 && m3 > m2) 
        return 'm3'
}

const setService = (name, data) => {
    table[name] = data
}

const getService = (name) => {
    const obj = fileToObj()
    return obj[name]
}

const addProcess = (name) => {
    table[name].processes++
}

const removeProcess = (name) => {
    table[name].processes--
}

const getProcesses = (name) => {
    return table[name].processes
}

const restartTable = () => {
    table = {
        m1: { ram: 0, cpu: 0, processes: 0, time: 0 },
        m2: { ram: 0, cpu: 0, processes: 0, time: 0 },
        m3: { ram: 0, cpu: 0, processes: 0, time: 0 }
    }
}

module.exports = {
    setService,
    getService,
    restartTable,
    addProcess,
    removeProcess,
    getProcesses,
    chooseService
}