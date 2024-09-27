const bytesToGigabytes = (bytes) => {
    return ((bytes / 1024) / 1024) / 1024
}

module.exports = {
    bytesToGigabytes
}