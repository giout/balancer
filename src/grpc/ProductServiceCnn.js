const path = require('path')

const protoFilePath = path.join(__dirname, 'proto/ProductService.proto') 

// componente acoplado para generar una conexion a un especifico microservicio
class ProductServiceCnn {
    constructor(name, url){
        this.name = name
        this.url = url
    }

    // el metodo debe ser envuelto en una promesa para que devuelva los datos correctamente
    readProducts(){
        const client = this.newGrpcClient()
        return new Promise((resolve, reject)=>{
            client.readProducts({}, (err, response) => {
                if (err) {
                    throw new Error('Service failed')
                } 
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
}

module.exports = ProductServiceCnn