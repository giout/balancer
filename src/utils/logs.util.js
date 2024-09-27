// write logs.txt file
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../../logs.txt')

const addLog = (request, service, data) => {
    const content = fs.readFileSync(filePath, 'utf-8')

    const newContent = `\n
Request ${request} -> ${service}
------------------------------------------------
Free RAM -> ${data.ram}GB
CPU speed -> ${data.cpu}MHZ
Amount of current processes -> ${data.processes}
Response time -> ${data.time}ms
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

