
import { UtilsConfig } from "./UtilsConfig.js"
import { Pen } from "./Pen.js"
import { Eraser } from "./Eraser.js"
import { Line } from "./Line.js"
import { Ellipse } from "./Elipse.js"

const utils = document.querySelectorAll(".util")
const utilsConfig = new UtilsConfig(utils)

export class Canvas {
    canvas = null
    ctx = null
    toolType = null

    tools = []

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
    

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
