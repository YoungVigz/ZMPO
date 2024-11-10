import { DrawTool } from "./DrawTool.js"

export class Pen extends DrawTool {
    penSize = 5
    penColor = "#000000"

    constructor(canvas, ctx) {
        super(canvas, 'pen')

        this.ctx = ctx

        for(let setting of this.settingDOM) {
            if(setting.nodeName == "INPUT") {
                setting.addEventListener('change', this.changeSettings.bind(this))
            }
        }
    }

    changeSettings(e) {
        if(e.target.id == "pen-size") {
            this.penSize = e.target.value
        } else if (e.target.id == "pen-color") {
            this.penColor = e.target.value
        }

    }

    startDrawing(e) {
        this.isDrawing = true
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.penColor
        this.ctx.lineWidth = this.penSize
    }

    drawing(e) {
        if (!this.isDrawing) return 
        this.ctx.lineTo(e.offsetX, e.offsetY)
        this.ctx.stroke()
    }

    stopDrawing() {
        this.isDrawing = false
    }
}