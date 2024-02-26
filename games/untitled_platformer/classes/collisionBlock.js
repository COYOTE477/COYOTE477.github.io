class CollisionBlock {
    constructor({ position }) {
        this.position = position
        this.height = 32 
        this.width = 32
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5'
        c.fillRect(this.position.x,this.position.y,this.height,this.width)
    }
}