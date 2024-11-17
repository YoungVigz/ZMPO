import { Canvas } from "./Canvas.js";

const canvas = document.getElementById("drawing-space")
const ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const drawingCanvas = new Canvas(canvas, ctx)