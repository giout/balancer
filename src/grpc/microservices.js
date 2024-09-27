require('dotenv/config.js')
const ProductServiceCnn = require("./ProductServiceCnn.js")

// microservice connections
const m1 = new ProductServiceCnn('m1', process.env.M1)
const m2 = new ProductServiceCnn('m2', process.env.M2)
const m3 = new ProductServiceCnn('m3', process.env.M3)

module.exports = { m1, m2, m3 }