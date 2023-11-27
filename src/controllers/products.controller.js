const ProductServiceCnn = require("../grpc/ProductServiceCnn.js")
const Balancer = require("../balancing/Balancer.js")

const getProducts = async (req, res, next) => {
    /* const microservice = new ProductService('localhost:4000')
    const response = await microservice.readProducts()
    res.json(response) */

    // inicia un nuevo hilo
    const balancer = new Balancer()
    await balancer.call()
    res.end()
}

module.exports = {
    getProducts
}