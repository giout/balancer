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
            ram: getFreeRam(), // memoria libre (GB)
            cpu: getCpuSpeed(), // velocidad de cpu (MHZ)
            error
        } 

        // enviando respuesta
        callback(null, { 
            products,
            performance
        })
    }
}

module.exports = {
    readProducts
}
