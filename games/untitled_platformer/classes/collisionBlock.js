class CollisionBlock {
    constructor({ position }) {
        this.position = position
        this.height = 32 
        this.width = 32
    }

    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x,this.position.y,this.height,this.width)
    }
}