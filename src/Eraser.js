import { DrawTool } from "./DrawTool.js"

export class Eraser extends DrawTool {
    eraserSize = 5
    eraserColor = "#FFFFFF"

    constructor(canvas, ctx) {
        super(canvas, 'eraser')

        this.ctx = ctx
    }

    changeSettings(e) {
        this.eraserSize = e.target.value
    }

    startDrawing(e) {
        this.isDrawing = true
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.eraserColor
        this.ctx.lineWidth = this.eraserSize
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