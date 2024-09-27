require('dotenv/config.js')
const pool = require('../config/database.js')

const getProducts = async () => {
    let products = []

    // executing microservice operation (read products) by querying a random table
    const tables = ['products', 'products2', 'products3']
    const index = Math.floor(Math.random() * tables.length)

    const query = await pool.query(`SELECT * FROM ${tables[index]}`)
    const result = query.rows   
    
    for (const row of result) {
        products.push({
            "description": row.descrip,
            "id": row.cod
        })
    }

    return products
}

module.exports = {
    getProducts
}