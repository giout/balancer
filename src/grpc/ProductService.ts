import { generateInsecureClient, readProtoFile } from "../utils/grpc.util"

// componente acoplado para generar varios microservicios en base al mismo archivo proto
class ProductService {
    public url: string
    private protoFilePath: string = './proto/ProductService.proto' 
    private freeRam: number = 0
    private freeCpu: number = 0
    private error: boolean = false

    constructor(url: string){
        this.url = url
    }

    public readProducts(){
        const client = this.newGrpcClient()
        client.readProducts({}, (err: any, response: any) => {
            if (err) {
                throw new Error('Service failed')
            } 

            const { products, performance } = response
            return { products, performance }
        })
    }

    private newGrpcClient(){
        const productPackage = readProtoFile(
            this.protoFilePath, 
            'productPackage')

        return generateInsecureClient(
            productPackage, 
            'ProductService', 
            this.url)
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