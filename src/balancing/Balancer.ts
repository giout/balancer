import 'dotenv/config'
import ProductServiceCnn from "../grpc/ProductServiceCnn"
import { Worker } from 'worker_threads'

class Balancer {
    constructor(){
        // se hacen 3 llamadas para obtener datos iniciales de rendimiento y asi ubicarlos en la tabla
    }   

    // el balanceador procede a elegir el microservicio y devolver los datos
    call(){
        // inicia hilo 
        const thread = new Worker('./thread')
        /* thread.postMessage()
        thread.on('message', () => {

        }) */
    }
}

export default Balancer