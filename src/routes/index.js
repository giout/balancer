const { Router } = require('express')
const productsRouter = require('./products.route.js')

const router = Router()

router.use('/products', productsRouter)

module.exports = router
