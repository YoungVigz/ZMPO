
export class DrawTool {
    canvas = null
    isDrawing = false
    isBinded = false 

    constructor(canvas, settingDOM) {
        this.canvas = canvas

        this.name = settingDOM

        this.startDrawing = this.startDrawing.bind(this)
        this.drawing = this.drawing.bind(this)
        this.stopDrawing = this.stopDrawing.bind(this)

        this.settingDOM = document.getElementById(settingDOM) ? document.getElementById(settingDOM).children : undefined

        for(let setting of this.settingDOM) {
            if(setting.nodeName == "INPUT") {
                setting.addEventListener('change', this.changeSettings.bind(this))
            }
        }
    }

    changeSettings() {}

    startDrawing(e) {}

    drawing(e) {}

    stopDrawing(e) {}
    
    bindDrawing() {
        this.canvas.addEventListener('mousedown', this.startDrawing)
        this.canvas.addEventListener('mousemove', this.drawing)
        this.canvas.addEventListener('mouseup', this.stopDrawing)
        this.canvas.addEventListener('mouseout', this.stopDrawing)

        this.isBinded = true
    }

    unbindDrawing() {
        this.canvas.removeEventListener('mousedown', this.startDrawing)
        this.canvas.removeEventListener('mousemove', this.drawing)
        this.canvas.removeEventListener('mouseup', this.stopDrawing)
        this.canvas.removeEventListener('mouseout', this.stopDrawing)

        this.isBinded = false
    }

}