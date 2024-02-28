class Npc extends Sprite{
    constructor({imageSrc, frameCount, animations, position, dialog}) {
        super({ imageSrc, frameCount, animations, position})
        this.position = position
        this.dialog = dialog
    }
    update(talking) {
        if (talking){
            c.fillStyle = 'black'
            c.fillRect(160,416,704,128)
            c.fillStyle = 'white'
            c.fillText(this.dialog, 200, 480)
        }
        if (player.position.x > this.position.x) {
            this.switchSprite('idleRight')
         } else {this.switchSprite('idleLeft')}
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
}