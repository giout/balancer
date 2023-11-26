import path from 'path'
import { Product, ServiceResponse } from '../types/service'

const protoFilePath = path.join(__dirname, 'proto/ProductService.proto') 

// componente acoplado para generar una conexion a un especifico microservicio
class ProductServiceCnn {
    public name: string
    public url: string
    private products: Product[] = []
    private freeRam: number = 0
    private freeCpu: number = 0
    private error: boolean = false
    private processes: number = 0
    private time: number = 0

    constructor(name: string, url: string){
        this.name = name
        this.url = url
    }

    // el metodo debe ser envuelto en una promesa para que devuelva los datos correctamente
    public readProducts(){
        const client = this.newGrpcClient()
        return new Promise((resolve, reject)=>{
            client.readProducts({}, (err: Error, response: ServiceResponse) => {
                if (err) {
                    throw new Error('Service failed')
                } 
                
                this.setProducts(response.products)

                // actualizando datos actuales de rendimiento
                const { cpu, ram, error } = response.performance
                this.setFreeCpu(cpu)
                this.setFreeRam(ram)
                this.setError(error)

                resolve(response)
            })
        })
    }

    private newGrpcClient(){
        const grpc = require('@grpc/grpc-js')
        const proto = require('@grpc/proto-loader')
        const protoFile = proto.loadSync(protoFilePath, {})
        const protoBuffer = grpc.loadPackageDefinition(protoFile)
        const packageObject = protoBuffer['productPackage']
        
        const credentials = grpc.credentials.createInsecure()
        const client = new packageObject['ProductService'](this.url, credentials)
        return client
    }

    public setProducts(products: Product[]){
        this.products = products
    }

    public getProducts(){
        return this.products
    }

    public setFreeRam(freeRam: number){
        this.freeRam = freeRam
    }

    public getFreeRam(){
        return this.freeRam
    }

    public setFreeCpu(freeCpu: number){
        this.freeCpu = freeCpu        
    }

    public getFreeCpu(){
        return this.freeCpu
    }

    public setError(error: boolean){
        this.error = error
    }

    public getError(){
        return this.error
    }

    public setProcesses(processes: number){
        this.processes = processes
    }

    public getProcesses(){
        return this.processes
    }

    public setTime(time: number){
        this.time = time
    }

    public getTime(){
        return this.time
    }
}

export default ProductServiceCnn