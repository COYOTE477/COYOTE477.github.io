class Player extends Sprite{
    constructor({collisionBlocks = [], imageSrc, frameCount, animations}) {
        super({ imageSrc, frameCount, animations})
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 1,
            y: 1
        }
        this.sides = {
            bottom: this.position.y + this.height
        }

        this.collisionBlocks = collisionBlocks
        console.log(this.collisionBlocks)
    }

    update() {
        this.velocity.x *= 0.8
        this.position.x += this.velocity.x
        //for somereasn i have to update the y velocity AFTER checking the x velocity btdubs
        this.HorizontalCollision()
        this.velocity.y++
        this.position.y += this.velocity.y
        this.VerticleCollision()
    }

    VerticleCollision(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.width
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = 
                    collisionBlock.position.y + collisionBlock.height + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = 
                    collisionBlock.position.y - this.height - 0.01
                    break
                }
            }
        }
    }

    HorizontalCollision(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            //if collision exists
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.width
            ) {
                if (this.velocity.x < 0) {
                    this.position.x = 
                    collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    this.position.x = 
                    collisionBlock.position.x - this.width - 0.01
                    break
                }
            }
        }
    }
}