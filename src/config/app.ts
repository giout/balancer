import express from 'express'
import cors from 'cors'
import { errorHandler } from '../middlewares/error'
import router from '../routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

export default app