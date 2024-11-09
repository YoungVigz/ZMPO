import { UtilsConfig } from "./UtilsConfig.js";

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const utils = document.querySelectorAll(".util")
const utilsConfig = new UtilsConfig(utils)

let test = UtilsConfig.getInstance()

console.log(test)

ctx.strokeStyle = 'black'
ctx.lineWidth = 50
ctx.lineCap = 'round'

let isDrawing = false

function startDrawing(e) {
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = 2
}

function draw(e) {
    if (!isDrawing) return 
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}

function stopDrawing() {
    isDrawing = false
}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', stopDrawing)
canvas.addEventListener('mouseout', stopDrawing)
