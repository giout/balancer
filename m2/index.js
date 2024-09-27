require('dotenv/config.js') 

const { ServerCredentials } = require('@grpc/grpc-js')
const server = require('./config/server.js')

// credentials are a mandatory to start the server 
// in this case, the project won't have secure credentials
const credentials = ServerCredentials.createInsecure()
const port = process.env.M2_PORT

server.bindAsync(`localhost:${port}`, credentials, () => {
    server.start()
    console.log(`Port ${port}`)
})
