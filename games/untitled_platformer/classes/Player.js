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
        this.velocity.x *= 0.4
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
        this.velocity.x += 10
        this.lastDirection = 'right'
    } else if (keys.a.pressed) {
        this.switchSprite('runLeft')
        this.velocity.x += -10
        this.lastDirection = 'left'
    } else {
        if (this.lastDirection === 'left'){
            this.switchSprite('idleLeft')}
        else this.switchSprite('idleRight')
    }
    if (keys.w.pressed){
        if (this.velocity.y === 0 && this.onGround === true) this.velocity.y = -15
        this.interact()
    }
    if (keys.e.pressed) {}
    }

    interact() {
        for (let i = 0; i < doors.length; i++) {
            const door = doors[i]
            if (this.hitbox.position.x + this.hitbox.width <= door.position.x + door.width &&
                this.hitbox.position.x >= door.position.x &&
                this.position.y >= door.position.y &&
                this.position.y + this.height  <= door.position.y + door.width
            ) {
                this.velocity.x = 0
                this.velocity.y = 0
                this.preventInput = true
                this.switchSprite('EnterDoor')
                door.play()
            }
        }
        if (npcs) {
        for (let i = 0; i < npcs.length; i++) {
            const npc = npcs[i]
            if (this.hitbox.position.x <= npc.position.x + npc.width &&
                this.hitbox.position.x + this.hitbox.width >= npc.position.x &&
                this.hitbox.position.y + this.hitbox.height >= npc.position.y &&
                this.hitbox.position.y <= npc.position.y + npc.width
            ) {
                this.velocity.x = 0
                this.velocity.y = 0
                this.preventInput = true
                if (this.lastDirection === 'left'){
                    this.switchSprite('idleLeft')}
                else this.switchSprite('idleRight')
                talking = true
            }
        }}
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
                    collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.onGround = true
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = 
                    collisionBlock.position.y - offset - 0.01
                    break
                }
            } else this.onGround = false
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