const path = require('path')

const protoFilePath = path.join(__dirname, 'proto/ProductService.proto') 

// component to generate a connection to a specific microservice
class ProductServiceCnn {
    constructor(name, url){
        this.name = name
        this.url = url
    }

    // method is wrapped in a promise to return data properly
    readProducts(){
        const client = this.newGrpcClient()
        return new Promise((resolve, reject)=>{
            client.readProducts({}, (err, response) => {
                if (err) {
                    console.log(err)
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