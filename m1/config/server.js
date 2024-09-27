const { Server } = require('@grpc/grpc-js')
const { protoFile } = require('../utils/proto.js')
const { readProducts } = require('../services/productService.js')

const server = new Server()

const protoFilePath = __dirname + '/../ProductService.proto'
const package = protoFile(protoFilePath, 'productPackage')

server.addService(package.ProductService.service, {
    'readProducts': readProducts
})

module.exports = server