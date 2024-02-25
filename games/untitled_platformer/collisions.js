const collisionsLevel1 = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]

Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i+16))
    }
    return rows
}
class CollisionBlock {
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }


    draw() {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const collisionBlocks = []

const parsedCollisions = collisionsLevel1.parse2D()
parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 7) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }
                })
            )
        }
    })
})