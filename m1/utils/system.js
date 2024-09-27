const os = require('os')
const bytes = require('./bytes.js')

// devuelve ram libre en GB
const getFreeRam = () => {
    const ramBytes = os.freemem()
    return bytes.bytesToGigabytes(ramBytes)
}

// devuelve velocidad de cpu en MHZ
const getCpuSpeed = () => {
    return os.cpus()[0].speed
}

module.exports = {
    getFreeRam,
    getCpuSpeed
}