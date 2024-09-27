// this method obtains file path, name of the proto package and returns a reference of the buffer
const protoFile = (filePath, packageName) => {
    const grpc = require('@grpc/grpc-js')

    // compile proto file to define communication scheme
    const proto = require('@grpc/proto-loader')
    // load file
    const protoFile = proto.loadSync(filePath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }) 
    // parse file to object
    const protoBuffer = grpc.loadPackageDefinition(protoFile) 
    
    // obtain proto package
    return protoBuffer[packageName] 
}

module.exports = { protoFile }