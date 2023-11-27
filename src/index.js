require('dotenv/config.js')
const { cleanLogs } = require('./utils/logs.util.js')
const { restartTable } = require('./utils/table.util.js')
const app = require('./config/app.js') 

const port = process.env.PORT || 4000

app.listen(port, () => {
    // los 2 metodos que estan siendo llamados deben anularse si se esta utilizando un hot reload en desarrollo, debido a que el servidor se reiniciara infinitamente
/*     cleanLogs()
    restartTable()   */  
    console.log('Listening on port', port)
})