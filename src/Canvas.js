import { UtilsConfig } from "./UtilsConfig.js";

const utils = document.querySelectorAll(".util")
const utilsConfig = new UtilsConfig(utils)

export class Canvas {
    ctx = null

    constructor(ctx) {
        this.ctx = ctx
        ctx.lineCap = 'round'

        utilsConfig.addObserver(this.handleUtilTypeChange.bind(this))
    }

    /**
    * Function called whenever `currentUtilType` changes.
    * @param {string} newType - The new type of the active tool.
    */
    handleUtilTypeChange(newType) {
        console.log("Current tool type:", newType)
       
    }
    
}