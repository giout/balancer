require('dotenv/config.js')
const app = require('./config/app.js')

const port = process.env.PORT || 4000

app.listen(port, () => {
    // borrar contenido de logs.txt 
    // reiniciar valores en table.json
    console.log('Listening on port', port)
})