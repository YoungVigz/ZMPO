import { DrawTool } from "./DrawTool.js"

export class Line extends DrawTool {
    lineSize = 5
    lineColor = "#000000"

    constructor(canvas, ctx) {
        super(canvas, 'line')

        this.ctx = ctx
    }

    changeSettings(e) {
        if(e.target.id == "line-size") {
            this.lineSize = e.target.value
        } else if (e.target.id == "line-color") {
            this.lineColor = e.target.value
        }
    }

    startDrawing(e) {
        this.isDrawing = true
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.lineColor
        this.ctx.lineWidth = this.lineSize

        this.startX = e.offsetX
        this.startY = e.offsetY
    }

    drawing(e) {
        
    }

    stopDrawing(e) {
        if (!this.isDrawing) return 
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(e.offsetX, e.offsetY)
        this.ctx.stroke()
        this.isDrawing = false
    }
}