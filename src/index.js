require('dotenv/config.js')
const { cleanLogs } = require('./utils/logs.util.js')
const app = require('./config/app.js') 

const port = process.env.PORT || 4000

app.listen(port, () => {
    cleanLogs()
    console.log('Listening on port', port)
})