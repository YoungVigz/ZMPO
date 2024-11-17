
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
    recordData = []
    isMouseDown = false

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
            if(tool.name === type) {
                tool.bindDrawing()
            } else {
                tool.unbindDrawing()
            }
        })
    }

    /**
    * Function called whenever `currentUtilType` changes.
    * @param {string} newType - The new type of the active tool.
    */
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
        this.canvas.addEventListener("mousedown", (event) => {
            this.isMouseDown = true
        
            const rect = this.canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            this.recordData.push({ x, y, tool: this.toolType })
        
        })


        this.canvas.addEventListener("mousemove", (event) => {
            if (!this.isMouseDown) return
        
            const rect = this.canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            this.recordData.push({ x, y, tool: this.toolType })
        
        })


        this.canvas.addEventListener("mouseup", (event) => {
            this.isMouseDown = false
        
            const rect = this.canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            this.recordData.push({ x, y, tool: this.toolType })
        
        })
        
        this.canvas.addEventListener("mouseleave", () => {
            if (this.isMouseDown) {
                this.isMouseDown = false
            }
        })
    }


    #stopRecording() {
        this.canvas.style = "display: none;"
        recorder.style = "display: none;"

        const handCanvas = new HandCanvas()

        handCanvas.startReconstruction(this.recordData)
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
