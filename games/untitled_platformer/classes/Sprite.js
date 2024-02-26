class Sprite {
    constructor({position, imageSrc, frameCount = 1, animations }) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            console.log('awesome')
            this.loaded = true
            this.width = this.image.width / this.frameCount
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.loaded = false
        // in the tutorial he calls the total frames the "framerate"
        // i dont like that so im making it frame count
        // because i love myself
        this.frameCount = frameCount
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 10
        this.loop = true
        this.animations = animations
        if (this.animations) {
            for(let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
            console.log(this.animations)
        }
    }
    draw() {
        if (!this.loaded) return
        const cropbox = {
            position: {
                x:this.width * this.currentFrame,
                y:0
            },
            width: this.width,
            height: this.height
        }
        c.drawImage(this.image, 
            cropbox.position.x, 
            cropbox.position.y, 
            cropbox.width, 
            cropbox.height, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
        this.updateFrames()
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0){
            if (this.currentFrame < this.frameCount - 1) this.currentFrame++
                else if (this.loop === true) this.currentFrame = 0
        }
    }
}
// this loads an image ^^