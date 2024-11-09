import { DrawTool } from "./DrawTool.js"

export class Eraser extends DrawTool {
    penSize = 5
    penColor = "#FFFFFF"

    constructor(canvas, ctx) {
        super(canvas, 'eraser')

        this.ctx = ctx
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