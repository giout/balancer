const { getProducts } = require('../db/products.js')
const { getFreeRam, getCpuSpeed } = require('../utils/system.js')

const readProducts = async (call, callback) => {
    let products = []
    let error = false

    try {
        products = await getProducts()

    } catch (err) {
        error = true
        console.log(err)

    } finally {
        let performance = {
            ram: getFreeRam(), // free memory (GB)
            cpu: getCpuSpeed(), // CPU speed (MHZ)
            error
        } 

        // send response
        callback(null, { 
            products,
            performance
        })
    }
}

module.exports = {
    readProducts
}
