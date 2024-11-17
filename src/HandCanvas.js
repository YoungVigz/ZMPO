import penUrl from './img/hand-pen.png'

export class HandCanvas {
    tools = []

    constructor() {
        const canvas = document.getElementById("drawing-hand")
        const ctx = canvas.getContext("2d", { alpha: true })

        this.canvas = canvas
        this.ctx = ctx

        canvas.width = 960
        canvas.height = 540

        this.ctx.lineCap = 'round'

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const penImage = new Image()
        penImage.src = penUrl

        penImage.onload = () => {
            this.penImage = penImage
        }

        /*
        let mouseX = 0
        let mouseY = 0

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height) 
            const offsetY = 165

            ctx.drawImage(penImage, mouseX, mouseY - offsetY, penImage.width, penImage.height)
        }

        document.getElementById('drawing-space').addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = event.clientX - rect.left
            mouseY = event.clientY - rect.top

            draw()
        })

        */
    }


    startReconstruction(data) {
        this.data = data

        this.reconstruct()
    }

    reconstruct() {
        setInterval(() => {
            
        }, 1000/60)
    }
}