const { parentPort } = require('worker_threads')
const { m1, m2, m3 } = require('../grpc/microservices.js')

if (parentPort)
parentPort.on('message', ()=>{
    // el hilo elige un microservicio
    chooseMicroservice()
    // añade proceso a variable de microservicio
    // inicia tiempo
    // hace la llamada a ese microservicio
    // resta proceso a variable de microservicio
    // asigna tiempo
    // devuelve los datos de bd obtenidos, junto con el objeto PerformanceData perteneciente a dicho microservicio (ThreadResponse)
})

const chooseMicroservice = () => {
    // se comparan los valores de todos los microservicios y se obtienen los maximos

    console.log(m1.getFreeRam())
    console.log(m1.getFreeCpu())
    console.log(m1.getTime())
    console.log(m1.getProcesses())


    const maxRam = Math.max(m1.getFreeRam(), m2.getFreeRam(), m3.getFreeRam())
    const maxCpu = Math.max(m1.getFreeCpu(), m2.getFreeCpu(), m3.getFreeCpu())
    const minTime = Math.min(m1.getTime(), m2.getTime(), m3.getTime())
    const minProcesses = Math.min(m1.getProcesses(), m2.getProcesses(), m3.getProcesses())                              

    console.log('ram -> ', maxRam)
    console.log('cpu -> ', maxCpu)
    console.log('time -> ', minTime)
    console.log('processes -> ', minProcesses)

    // contadores de puntos
    let m1Pts = 0
    let m2Pts = 0
    let m3Pts = 0

    // se asignan los puntos
    if (m1.getFreeRam() == maxRam) 
        m1Pts += 5
    if (m1.getFreeCpu() == maxCpu)
        m1Pts += 3
    if (m1.getTime() == minTime)
        m1Pts += 4
    if (m1.getProcesses() == minProcesses)
        m1Pts += 5

    if (m2.getFreeRam() == maxRam) 
        m2Pts += 5
    if (m2.getFreeCpu() == maxCpu)
        m2Pts += 3
    if (m2.getTime() == minTime)
        m2Pts += 4
    if (m2.getProcesses() == minProcesses)
        m2Pts += 5
    
    if (m3.getFreeRam() == maxRam) 
        m3Pts += 5
    if (m3.getFreeCpu() == maxCpu)
        m3Pts += 3
    if (m3.getTime() == minTime)
        m3Pts += 4
    if (m3.getProcesses() == minProcesses)
        m3Pts += 5

    console.log('Puntos m1 -> ', m1Pts)
    console.log('Puntos m2 -> ', m2Pts)
    console.log('Puntos m3 -> ', m3Pts)

    // se compara y elige el microservicio
}
