const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9
//thank you chris courses

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 1,
            y: 1
        }
        this.width = 100
        this.height = 100
        this.sides = {
            bottom: this.position.y + this.height
        }
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        if (this.sides.bottom < canvas.height) {
            this.velocity.y++
            this.position.y += this.velocity.y
            this.sides.bottom = this.position.y + this.height
        }
    }

}

const player = new Player()

// let bottom = y + 100

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.draw()
}


animate()