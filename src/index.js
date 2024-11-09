import { Canvas } from "./Canvas.js";

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const drawingCanvas = new Canvas(ctx)



let isDrawing = false

function startDrawing(e) {
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = 50
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
