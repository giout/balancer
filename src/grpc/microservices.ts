import 'dotenv/config'
import ProductServiceCnn from "./ProductServiceCnn"

// se inicializa una conexion para 3 microservicios, estos objetos son globales
export const m1 = new ProductServiceCnn('m1', <string> process.env.M1)
export const m2 = new ProductServiceCnn('m2', <string> process.env.M2)
export const m3 = new ProductServiceCnn('m3', <string> process.env.M3)

export const printLogs = () => {
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