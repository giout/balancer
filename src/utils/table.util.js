// metodos para la manipulacion de table.json
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../balancing/table.json')

const setService = (name, data) => {
    const obj = fileToObj()
    obj[name] = data
    objToFile(obj)
}

const getService = (name) => {
    const obj = fileToObj()
    return obj[name]
}

const addProcess = (name) => {
    const obj = fileToObj()
    obj[name].processes++
    setTable(obj)
}

const removeProcess = (name) => {
    const obj = fileToObj()
    obj[name].processes--
    setTable(obj)
}

const getProcesses = (name) => {
    const obj = fileToObj()
    return obj[name].processes
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