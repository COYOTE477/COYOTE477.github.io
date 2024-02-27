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
        this.updateHitbox()
        this.HorizontalCollision()
        this.velocity.y++
        this.position.y += this.velocity.y
        this.updateHitbox()
        this.VerticleCollision()
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x+4,
                y: this.position.y+2,
            },
            width: 24,
            height: 30,
        }
    }

    handleInput(keys) {
    if (this.preventInput) return
    if (keys.d.pressed){
        this.switchSprite('runRight')
        this.velocity.x = 10
        this.lastDirection = 'right'
    } else if (keys.a.pressed) {
        this.switchSprite('runLeft')
        this.velocity.x = -10
        this.lastDirection = 'left'
    } else {
        if (this.lastDirection === 'left'){
            this.switchSprite('idleLeft')}
        else this.switchSprite('idleRight')

    }
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameCount = this.animations[name].frameCount
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    VerticleCollision(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.width
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = 
                    collisionBlock.position.y + collisionBlock.height + offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = 
                    collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }
    }

    HorizontalCollision(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            //if collision exists
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.width
            ) {
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = 
                    collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = 
                    collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        }
    }
}