// metodos para la manipulacion de table.json
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../balancing/table.json')

const chooseMicroservices = () => {
    const table = fileToObj()
    const points = { m1: 0, m2: 0, m3: 0 }

    // se calculan los valores maximos
    // mayor cantidad de ram libre
    const maxRam = Math.max()

    // mayor cantidad de cpu libre
    

    // menor cantidad de procesos
    

    // menor tiempo de respuesta

}

const setService = (name, data) => {
    const table = fileToObj()
    table[name] = data
    objToFile(table)
}

const getService = (name) => {
    const obj = fileToObj()
    return obj[name]
}

const addProcess = (name) => {
    const table = fileToObj()
    table[name].processes++
    setTable(table)
}

const removeProcess = (name) => {
    const table = fileToObj()
    table[name].processes--
    setTable(table)
}

const getProcesses = (name) => {
    const table = fileToObj()
    return table[name].processes
}

const setTable = (data) => {
    objToFile(data)
}   

const getTable = () => {
    return fileToObj()
}

const restartTable = () => {
    setTable({
        m1: { ram: 0, cpu: 0, processes: 0, time: 0 },
        m2: { ram: 0, cpu: 0, processes: 0, time: 0 },
        m3: { ram: 0, cpu: 0, processes: 0, time: 0 }
    })
}

const fileToObj = () => {
    // almacena el archivo en un objeto
    const file = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(file)
}

const objToFile = (obj) => {
    // almacena el objeto en el archivo
    const string = JSON.stringify(obj)
    fs.writeFileSync(filePath, string, 'utf-8')
}

module.exports = {
    setService,
    getService,
    setTable,
    getTable,
    restartTable,
    addProcess,
    removeProcess,
    getProcesses
}