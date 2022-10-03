const serialConfig = {
    selectedPort: null,
    writableStreamClosed: null,
    readableStreamClosed: null,
    writer: null,
    reader: null,
    serialDataValue: null,
    data: null
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function openSerialPort(config = { baudRate: 115200 }) {
    if (!checkSerialPortSupported()) return false
    if (serialConfig.selectedPort) {
        console.log('### Already connected. Disconnect first!')
        return true
    }

    try {
        serialConfig.selectedPort = await navigator.serial.requestPort()
        serialConfig.selectedPort.addEventListener('connect', event => {
            console.log('### Connected from Serial Port!')
        })

        serialConfig.selectedPort.addEventListener('disconnect', () => {
            serialConfig.selectedPort = null
            console.log('### Disconnected from Serial Port!')
        })

        // Wait for the serial port to open.
        await serialConfig.selectedPort.open(config)
        // do not await
        startSerialPortReading2()
        // wait to init
        sleep(1000)

        const textEncoder = new TextEncoderStream()
        serialConfig.writableStreamClosed = textEncoder.readable.pipeTo(
            serialConfig.selectedPort.writable
        )

        serialConfig.writer = textEncoder.writable.getWriter()
        console.log('### serialConfig', serialConfig)

    } catch (error) {
        serialConfig.selectedPort = null
        console.log('### Cannot open serial port!')
    }
}

function checkSerialPortSupported() {
    if (!navigator.serial) {
        console.log('### Serial port communication not supported!')
        return false
    }
    return true
}

async function startSerialPortReading2() {
    const port = serialConfig.selectedPort

    while (port && port.readable) {
        const textDecoder = new TextDecoderStream()
        serialConfig.selectedPort.readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
        serialConfig.selectedPort.reader = textDecoder.readable.getReader()
        const readStringUntil = readFromSerialPort(serialConfig.selectedPort.reader)

        try {
            while (true) {
                const { value, done } = await readStringUntil('\n')
                if (value) {
                    // console.log("### serialPortValue: ", value);
                    const [command, ...values] = value.split(" ")
                    handleSerialPortResponse(command, values.join(' '))
                }


                if (done) return
            }
        } catch (error) {
            console.log("### Serial port communication error!", error)
        }
    }
}

async function sendSerialData(data) {
    console.log("### sendSerialData:", data)
    await serialConfig.writer.write(data + '\n')
}

const readFromSerialPort = reader => {
    let partialChunk
    let fulliness = []

    const readStringUntil = async (separator = '\n') => {
        if (fulliness.length) {
            return { value: fulliness.shift().trim(), done: false }
        }
        const chunks = []
        if (partialChunk) {
            // leftovers from previous read
            chunks.push(partialChunk)
            partialChunk = undefined
        }
        while (true) {
            const { value, done } = await reader.read()
            if (value) {
                const values = value.split(separator)
                // found one or more separators
                if (values.length > 1) {
                    chunks.push(values.shift()) // first element
                    partialChunk = values.pop() // last element
                    fulliness = values // full lines
                    return { value: chunks.join('').trim(), done: false }
                }
                chunks.push(value)
            }
            if (done) return { value: chunks.join('').trim(), done: true }
        }
    }
    return readStringUntil
}

function handleSerialPortResponse(command, data = '') {
    if (command === '/file-read') {
        serialConfig.data += data
    }
    if (command === '/file-done') {
        const configText = document.getElementById('config-file-text');
        configText.value = serialConfig.data
    }
}