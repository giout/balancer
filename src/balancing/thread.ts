import { parentPort } from 'worker_threads'
import { PerformanceData } from '../types/balancer'

if (parentPort)
parentPort.on('message', (table: PerformanceData[])=>{
    // el hilo elige un microservicio
    // hace la llamada a ese microservicio
    // devuelve los datos de bd obtenidos, junto con el objeto PerformanceData perteneciente a dicho microservicio (ThreadResponse)
})