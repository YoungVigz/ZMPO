
import { UtilsConfig } from "./UtilsConfig.js"
import { Pen } from "./Pen.js"
import { Eraser } from "./Eraser.js"

const utils = document.querySelectorAll(".util")
const utilsConfig = new UtilsConfig(utils)

export class Canvas {
    canvas = null
    ctx = null
    toolType = null

    constructor(canvas, ctx) {
        this.ctx = ctx
        this.canvas = canvas
        this.ctx.lineCap = 'round'

        this.pen = new Pen(canvas, ctx)
        this.eraser = new Eraser(canvas, ctx)

        this.#changeToolType(utilsConfig.currentUtilType)
        utilsConfig.addObserver(this.handleUtilTypeChange.bind(this))
    }

    #changeToolType(type) {
        this.toolType = type

        if(type === 'pen') {
            this.eraser.unbindDrawing()
            this.pen.bindDrawing()
        } else if(type === 'eraser') {
            this.pen.unbindDrawing()
            this.eraser.bindDrawing()
        } else {
            this.eraser.unbindDrawing()
            this.pen.unbindDrawing()
        }
    }

    /**
    * Function called whenever `currentUtilType` changes.
    * @param {string} newType - The new type of the active tool.
    */
    handleUtilTypeChange(newType) {
        console.log("Current tool type:", newType)
        this.#changeToolType(newType)
    }
    
}
