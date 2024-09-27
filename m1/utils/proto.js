// obtiene la ruta del archivo, el nombre del paquete y devuelve una referencia del buffer de protocolo manipulable

const protoFile = (filePath, packageName) => {
    const grpc = require('@grpc/grpc-js')

    // compila los archivos proto para poder definir el esquema de transferencia
    const proto = require('@grpc/proto-loader')
    const protoFile = proto.loadSync(filePath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }) // carga archivo
    const protoBuffer = grpc.loadPackageDefinition(protoFile) // parsea de archivo a objeto
    
    return protoBuffer[packageName] // extrae package
}

module.exports = { protoFile }