import { UtilsConfig } from "./UtilsConfig.js"
import { Pen } from "./Pen.js"
import { Eraser } from "./Eraser.js"
import { Line } from "./Line.js"
import { Ellipse } from "./Elipse.js"
import { HandCanvas } from "./HandCanvas.js"

const utils = document.querySelectorAll(".util")
const utilsConfig = new UtilsConfig(utils)

const recorder = document.getElementById("recorder")

export class Canvas {
    canvas = null
    ctx = null

    toolType = null
    tools = []

    mainChunks = []
    handChunks = []
    isRecording = false
    downloadable = null

    constructor(canvas, ctx) {
        this.ctx = ctx
        this.canvas = canvas
        this.ctx.lineCap = 'round'

        this.tools.push(new Pen(canvas, ctx))
        this.tools.push(new Eraser(canvas, ctx))
        this.tools.push(new Line(canvas, ctx))
        this.tools.push(new Ellipse(canvas, ctx))

        this.#changeToolType(utilsConfig.currentUtilType)
        utilsConfig.addObserver(this.handleUtilTypeChange.bind(this))

        document.getElementById("clear-accept").addEventListener("click", () => this.clearCanvas())
    }

    #changeToolType(type) {
        this.toolType = type

        if (type === 'record') {
            this.handleRecord()
            return
        }

        this.tools.forEach(tool => {
            if (tool.name === type) {
                tool.bindDrawing()
            } else {
                tool.unbindDrawing()
            }
        })
    }

    handleUtilTypeChange(newType) {
        this.#changeToolType(newType)
    }
    
    handleRecord() {
        recorder.classList.toggle("record-on")

        this.isRecording = !this.isRecording

        if (this.isRecording) {
            this.#startRecording()
            return
        }

        this.#stopRecording()
    }

    #startRecording() {
        this.#destroyDownload()

        const handCanvas = new HandCanvas()

        const mainStream = this.canvas.captureStream(30)
        const handStream = handCanvas.getCanvas().captureStream(30)

        console.log(MediaRecorder.isTypeSupported('video/webm; codecs=vp9'));


        const mainRecorder = new MediaRecorder(mainStream)
        mainRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                this.mainChunks.push(e.data)
            }
        }
        mainRecorder.start(1000 / 30)

        const handRecorder = new MediaRecorder(handStream, {mimeType: "video/webm; codecs=vp9"})
        handRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                this.handChunks.push(e.data)
            }
        }
        handRecorder.start(1000 / 30)

        this.mainRecorder = mainRecorder
        this.handRecorder = handRecorder

    }

    #stopRecording() {
        const mainBlob = new Blob(this.mainChunks, { type: 'video/webm' })
        const mainUrl = URL.createObjectURL(mainBlob)

        const handBlob = new Blob(this.handChunks, { type: 'video/webm; codecs=vp9' })
        const handUrl = URL.createObjectURL(handBlob)

        this.mainChunks = []
        this.handChunks = []

        this.handRecorder.stop()
        this.mainRecorder.stop()

        this.#generateDownload(mainUrl, "main")
        this.#generateDownload(handUrl, "hand")
    }

    #generateDownload(url, name) {
        const utilDiv = document.createElement('div')
        utilDiv.classList.add('util')
    
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = `${name}.webm`
    
        const icon = document.createElement('i')
        icon.classList.add('fa-solid', 'fa-download')
    
        downloadLink.appendChild(icon)
        utilDiv.appendChild(downloadLink)

        this.downloadable = document.querySelector('.utils').appendChild(utilDiv)
    }

    
    #destroyDownload() {
        if (this.downloadable) {
            this.downloadable.remove()
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
