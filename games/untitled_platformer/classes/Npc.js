class Npc extends Sprite{
    constructor({imageSrc, frameCount, animations, position, dialog, characters}) {
        super({ imageSrc, frameCount, animations, position})
        this.position = position
        this.dialog = dialog
        this.characters = characters
        this.dialogNumber = 0
        this.dialogDone = false
    }
    
    
    update() {
        if (talking){
            c.fillStyle = 'black'
            c.fillRect(160,416,704,128)
            c.fillStyle = 'white'
            c.font="45px sans-serif";
            c.fillText(this.dialog[this.dialogNumber], 300, 480)
            faces[this.characters[this.dialogNumber]].draw()
        }
        if (player.position.x > this.position.x) {
            this.switchSprite('idleRight')
         } else {this.switchSprite('idleLeft')}
    }

    updateDialog() {
        console.log(this.dialog.length, talking, this.dialogNumber)
        if (this.dialogNumber >= this.dialog.length-1) {
            talking = false
            player.preventInput = false
            this.dialogDone = true
            console.log(player, player.preventInput)
        } else this.dialogNumber++
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