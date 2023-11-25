import 'dotenv/config'
import ProductServiceCnn from "../grpc/ProductServiceCnn"

interface performanceData {
    freeRam: number,
    freeCpu: number,
    processes: number,
    time: number,
    error: boolean
}

class Balancer {
    table: Map<string, performanceData> = new Map()
    m1: ProductServiceCnn
    m2: ProductServiceCnn
    m3: ProductServiceCnn

    constructor(){
        // se inicializa una conexion para 3 microservicios
        this.m1 = new ProductServiceCnn(<string> process.env.M1)
        this.m2 = new ProductServiceCnn(<string> process.env.M2)
        this.m3 = new ProductServiceCnn(<string> process.env.M3)

        // se hacen 3 llamadas para obtener datos iniciales de rendimiento y asi ubicarlos en la tabla
    }   

    // el balanceador procede a elegir el microservicio y devolver los datos
    call(){

    }
    
    setTable(){
        this.table.set('m1', {
            freeRam: this.m1.getFreeRam(), 
            freeCpu: this.m1.getFreeCpu(), 
            processes: this.m1.getProcesses(), 
            time: this.m1.getTime(), 
            error: this.m1.getError()
        })
        
        this.table.set('m2', {
            freeRam: this.m2.getFreeRam(), 
            freeCpu: this.m2.getFreeCpu(), 
            processes: this.m2.getProcesses(), 
            time: this.m2.getTime(), 
            error: this.m2.getError()
        })
        
        this.table.set('m3', {
            freeRam: this.m3.getFreeRam(), 
            freeCpu: this.m3.getFreeCpu(), 
            processes: this.m3.getProcesses(), 
            time: this.m3.getTime(), 
            error: this.m3.getError()
        })
    }
    
    printLogs(){
        console.log('--------------------------------------------------')
        console.log(`Servicio 1\n
                    Ram libre -> ${this.m1.getFreeRam()}GB\n
                    Cpu libre -> ${this.m1.getFreeCpu()}%\n
                    Procesos -> ${this.m1.getProcesses()}\n
                    Tiempo de respuesta -> ${this.m1.getTime()}\n
                    Error -> ${this.m1.getError()}`)
        console.log('--------------------------------------------------')
        console.log(`Servicio 2\n
                    Ram libre -> ${this.m2.getFreeRam()}GB\n
                    Cpu libre -> ${this.m2.getFreeCpu()}%\n
                    Procesos -> ${this.m2.getProcesses()}\n
                    Tiempo de respuesta -> ${this.m2.getTime()}\n
                    Error -> ${this.m2.getError()}`)
        console.log('--------------------------------------------------')
        console.log(`Servicio 3\n
                    Ram libre -> ${this.m3.getFreeRam()}GB\n
                    Cpu libre -> ${this.m3.getFreeCpu()}%\n
                    Procesos -> ${this.m3.getProcesses()}\n
                    Tiempo de respuesta -> ${this.m3.getTime()}\n
                    Error -> ${this.m3.getError()}`)
        console.log('--------------------------------------------------')
    }

    async firstConnection(){
        await this.m1.readProducts()
        await this.m2.readProducts()
        await this.m3.readProducts()
    }
}

export default Balancer