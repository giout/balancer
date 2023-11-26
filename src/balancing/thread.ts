import { parentPort } from 'worker_threads'

if (parentPort)
parentPort.on('message', ()=>{
    // el hilo elige un microservicio
    // añade proceso a variable de microservicio
    // inicia tiempo
    // hace la llamada a ese microservicio
    // resta proceso a variable de microservicio
    // asigna tiempo
    // devuelve los datos de bd obtenidos, junto con el objeto PerformanceData perteneciente a dicho microservicio (ThreadResponse)
})