const path = require('path')

const protoFilePath = path.join(__dirname, 'proto/ProductService.proto') 

// componente acoplado para generar una conexion a un especifico microservicio
class ProductServiceCnn {
    constructor(name, url){
        this.name = name
        this.url = url
        this.freeRam = 0
        this.freeCpu = 0 
        this.time = 0
        this.processes = 0 
        this.error = false
    }

    // el metodo debe ser envuelto en una promesa para que devuelva los datos correctamente
    readProducts(){
        const client = this.newGrpcClient()
        return new Promise((resolve, reject)=>{
            client.readProducts({}, (err, response) => {
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

    newGrpcClient(){
        const grpc = require('@grpc/grpc-js')
        const proto = require('@grpc/proto-loader')
        const protoFile = proto.loadSync(protoFilePath, {})
        const protoBuffer = grpc.loadPackageDefinition(protoFile)
        const packageObject = protoBuffer['productPackage']
        
        const credentials = grpc.credentials.createInsecure()
        const client = new packageObject['ProductService'](this.url, credentials)
        return client
    }

    setProducts(products){
        this.products = products
    }

    getProducts(){
        return this.products
    }

    setFreeRam(freeRam){
        this.freeRam = freeRam
    }

    getFreeRam(){
        return this.freeRam
    }

    setFreeCpu(freeCpu){
        this.freeCpu = freeCpu        
    }

    getFreeCpu(){
        return this.freeCpu
    }

    setError(error){
        this.error = error
    }

    getError(){
        return this.error
    }

    setProcesses(processes){
        this.processes = processes
    }

    getProcesses(){
        return this.processes
    }

    setTime(time){
        this.time = time
    }

    getTime(){
        return this.time
    }
}

module.exports = ProductServiceCnn