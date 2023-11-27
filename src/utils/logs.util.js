// metodos para la escritura de archivos
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../balancing/logs.txt')

const addLog = (name, data) => {
    const content = fs.readFileSync(filePath, 'utf-8')

    const newContent = `\n
${name}
------------------------------------------------
RAM disponible -> ${data.ram}
CPU disponible -> ${data.cpu}
Cantidad de procesos -> ${data.processes}
Tiempo de respuesta -> ${data.time}
------------------------------------------------
`

    fs.writeFileSync(filePath, content+newContent, 'utf-8')
}

const cleanLogs = () => {
    fs.writeFileSync(filePath, '', 'utf-8')
}

module.exports = {
    addLog, 
    cleanLogs
}

