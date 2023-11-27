const express = require('express')
const cors = require('cors')
const { errorHandler } = require('../middlewares/error.middleware.js')
const router = require('../routes/index.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

module.exports = app