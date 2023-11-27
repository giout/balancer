require('dotenv/config.js')
const ProductServiceCnn = require("./ProductServiceCnn.js")

// se inicializa una conexion para 3 microservicios, estos objetos son globales
const m1 = new ProductServiceCnn('m1', process.env.M1)
const m2 = new ProductServiceCnn('m2', process.env.M2)
const m3 = new ProductServiceCnn('m3', process.env.M3)

const printLogs = () => {
    console.log('--------------------------------------------------')
    console.log(`Servicio 1`)
    console.log('--------------------------------------------------')
    console.log(`
    Ram libre -> ${m1.getFreeRam()}GB\n
    Cpu libre -> ${m1.getFreeCpu()}%\n
    Procesos -> ${m1.getProcesses()}\n
    Tiempo de respuesta -> ${m1.getTime()}\n
    Error -> ${m1.getError()}`)
    console.log('--------------------------------------------------')
    console.log(`Servicio 2`)
    console.log('--------------------------------------------------')
    console.log(`
    Ram libre -> ${m2.getFreeRam()}GB\n
    Cpu libre -> ${m2.getFreeCpu()}%\n
    Procesos -> ${m2.getProcesses()}\n
    Tiempo de respuesta -> ${m2.getTime()}\n
    Error -> ${m2.getError()}`)
    console.log('--------------------------------------------------')
    console.log(`Servicio 3`)
    console.log('--------------------------------------------------')
    console.log(`
    Ram libre -> ${m3.getFreeRam()}GB\n
    Cpu libre -> ${m3.getFreeCpu()}%\n
    Procesos -> ${m3.getProcesses()}\n
    Tiempo de respuesta -> ${m3.getTime()}\n
    Error -> ${m3.getError()}`)
    console.log('--------------------------------------------------')
}

module.exports = {
    m1, 
    m2,
    m3,
    printLogs
}