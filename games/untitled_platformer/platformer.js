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
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x *= 0.6
        this.sides.bottom = this.position.y + this.height
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y++
        } else this.velocity.y = 0
    }
}

class Sprite {
    constructor({position}) {
        this.position = position
        this.image = new Image()
    }
}

const player = new Player()

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// let bottom = y + 100



function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.velocity.x = 0
    if (keys.d.pressed){
        player.velocity.x = 5
    } else if (keys.a.pressed) {
        player.velocity.x = -5
    }
    player.update()
    player.draw()
}

animate()
