function downloadFromDevice() {
    const configFile = document.getElementById("config-file-path").value
    if (!configFile) {
        alert('No file path specified!')
        return
    }
    serialConfig.data = ''
    sendSerialData(`/file-read ${configFile}`)
}

function saveToDevice() {
    const configFile = document.getElementById("config-file-path").value
    if (!configFile) {
        alert('No file path specified!')
        return
    }
    // todo: revisit
    refreshDataView()
    sendSerialData(`/file-remove ${configFile}`)
    const lines = configText.value.split('\n')
    console.log('### lines', lines)
    lines.forEach(line => {
        sendSerialData(`/file-append ${configFile} ${line}`)
    })

}

function connectToDevice() {
    const baudRate = document.getElementById("baud-rate").value || 115200
    openSerialPort({ baudRate })
}