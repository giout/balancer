import grpc from '@grpc/grpc-js'
import proto from '@grpc/proto-loader'

// obtiene la ruta del archivo, el nombre del paquete y devuelve una referencia del buffer de protocolo manipulable

export const readProtoFile = (filePath: string, packageName: string) => {
    // compila los archivos proto para poder definir el esquema de transferencia
    const protoFile = proto.loadSync(filePath, {})
    const protoBuffer = grpc.loadPackageDefinition(protoFile)
    
    // se extrae el paquete especifico del buffer
    return protoBuffer[packageName]
}

// obtiene como parametro el resultado del metodo anterior, el nombre del servicio en el proto y el dominio en el que se ecneuntra el servidor
export const generateInsecureClient = (packageObject: any, serviceName: string, domain: string) => { 
    const credentials = grpc.credentials.createInsecure()
    const client = new packageObject[serviceName](domain, credentials)
    return client
}
