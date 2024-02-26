class Sprite {
    constructor({position, imageSrc, frameCount = 1}) {
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
    }
    draw() {
        if (!this.loaded) return
        const cropbox = {
            position: {
                x:0,
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
    }
}
// this loads an image ^^