import { Canvas } from "./Canvas.js";

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const drawingCanvas = new Canvas(canvas, ctx)

