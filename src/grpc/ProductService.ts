import path from 'path'
/* import grpc from '@grpc/grpc-js'
import proto from '@grpc/proto-loader' */

const protoFilePath = path.join(__dirname, 'proto/ProductService.proto') 
// componente acoplado para generar varios microservicios en base al mismo archivo proto
class ProductService {
    public url: string
    private freeRam: number = 0
    private freeCpu: number = 0
    private error: boolean = false

    constructor(url: string){
        this.url = url
    }

    // el metodo debe ser envuelto en una promesa para que devuelva los datos correctamente
    public readProducts(){
        const client = this.newGrpcClient()
        return new Promise((resolve, reject)=>{
            client.readProducts({}, (err: any, response: any) => {
                if (err) {
                    throw new Error('Service failed')
                } 
                
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
}

export default ProductService