async function downloadFromDevice() {
    const configFile = document.getElementById("config-file-path").value
    if (!configFile) {
        alert('No file path specified!')
        return
    }
    serialConfig.data = ''
    await sendSerialData(`/file-read ${configFile}`)
}

async function saveToDevice(btn) {
    const configFile = document.getElementById("config-file-path").value
    const progressBar = document.getElementById("progress-bar-top")
    const progressBarValue = document.getElementById("progress-bar-value")

    if (!configFile) {
        alert('No file path specified!')
        return
    }
    progressBarValue.style.width = '0%'
    progressBar.classList.remove('d-none')
    btn.classList.add('d-none')
    try {
       

        refreshTextConfig()
        await sendSerialData(`/file-remove ${configFile}`)
        const lines = configText.value.split('\n')

        let i = 0;
        for (const line of lines) {
            await sendSerialData(`/file-append ${configFile} ${line}`)
            await sleep(200)
            progressBarValue.style.width = Math.trunc((i * 100) / lines.length) + '%'
            i++
        }
    } catch (error) {
        alert('Cannot update file!')
    } finally {
        progressBar.classList.add('d-none')
        btn.classList.remove('d-none')
    }


}

function connectToDevice() {
    const baudRate = document.getElementById("baud-rate").value || 115200
    openSerialPort({ baudRate })
}

function updateBinVersion(versionDropdown) {
    const espInstallButton = document.getElementById("espInstallButton")
    espInstallButton.manifest = `./firmware/esp32/${versionDropdown.value}/manifest.json`;
}

