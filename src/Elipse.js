import { DrawTool } from "./DrawTool.js"

export class Ellipse extends DrawTool {
    innerColor = "#000000"
    outerColor = "#000000"
    lineWidth = 5

    constructor(canvas, ctx) {
        super(canvas, 'ellipse')
        this.ctx = ctx
        this.startX = 0
        this.startY = 0
    }

    changeSettings(e) {
        if (e.target.id === "ellipse-outer-color") {
            this.outerColor = e.target.value
        } else if (e.target.id === "ellipse-inner-color") {
            this.innerColor = e.target.value
        }
    }

    startDrawing(e) {
        this.isDrawing = true
        this.startX = e.offsetX
        this.startY = e.offsetY
    }

    drawing(e) {
    }

    stopDrawing(e) {
        if (!this.isDrawing) return
        this.isDrawing = false

        const endX = e.offsetX
        const endY = e.offsetY
        const width = endX - this.startX
        const height = endY - this.startY

        const centerX = this.startX + width / 2
        const centerY = this.startY + height / 2
        const radiusX = Math.abs(width / 2)
        const radiusY = Math.abs(height / 2)

        this.ctx.beginPath()
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)

        this.ctx.fillStyle = this.innerColor
        this.ctx.fill()

        this.ctx.strokeStyle = this.outerColor
        this.ctx.lineWidth = this.lineWidth
        this.ctx.stroke()

        this.ctx.closePath()
    }
}
