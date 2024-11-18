import penUrl from './img/hand-pen.png'
import eraserUrl from './img/hand-eraser.png'
import { UtilsConfig } from './UtilsConfig.js'

let utilsConfig

export class HandCanvas {
    penImg = null
    eraserImg = null
    currentHand = null

    offsetY = 0
    mouseX = 0
    mouseY = 0

    constructor() {
        utilsConfig = UtilsConfig.getInstance()

        utilsConfig.addObserver(this.handleUtilTypeChange.bind(this))

        const canvas = document.getElementById("drawing-hand")
        const ctx = canvas.getContext("2d", { alpha: true })

        canvas.width = 960
        canvas.height = 540

        this.canvas = canvas
        this.ctx = ctx

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#00FF00"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const penImage = new Image()
        penImage.src = penUrl

        const eraserImage = new Image()
        eraserImage.src = eraserUrl

        penImage.onload = () => {
            this.penImg = penImage
        }
        
        eraserImage.onload = () => {
            this.eraserImg = eraserImage
        }
        
        this.handleUtilTypeChange(utilsConfig.currentUtilType)
        
        document.getElementById('drawing-space').addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect()
            this.mouseX = event.clientX - rect.left
            this.mouseY = event.clientY - rect.top

            this.drawHand()
        })
    }


    handleUtilTypeChange(type) {
        if(type === 'eraser') {
            this.currentHand = this.eraserImg
            this.offsetY = 130
            return
        }

        this.currentHand = this.penImg
        this.offsetY = 165
    }

    drawHand() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) 
        this.ctx.fillStyle = "#00FF00"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        if (this.currentHand) {
            this.ctx.drawImage(
                this.currentHand, 
                this.mouseX, 
                this.mouseY - this.offsetY, 
                this.currentHand.width, 
                this.currentHand.height
            )
        }
    }

    getCanvas() {
        return this.canvas
    }
}
