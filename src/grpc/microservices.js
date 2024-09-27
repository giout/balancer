require("dotenv/config.js");
const ProductServiceCnn = require("./ProductServiceCnn.js");

// microservice connections
const m1 = new ProductServiceCnn(
    "m1",
    `localhost:${process.env.M1_PORT}`
)
const m2 = new ProductServiceCnn(
    "m2",
    `localhost:${process.env.M2_PORT}`
)
const m3 = new ProductServiceCnn(
    "m3",
    `localhost:${process.env.M3_PORT}`
)

module.exports = { m1, m2, m3 };