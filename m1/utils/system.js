const os = require('os')
const bytes = require('./bytes.js')

const getFreeRam = () => {
    const ramBytes = os.freemem()
    return bytes.bytesToGigabytes(ramBytes)
}

const getCpuSpeed = () => {
    return os.cpus()[0].speed
}

module.exports = {
    getFreeRam,
    getCpuSpeed
}