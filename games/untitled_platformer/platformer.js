const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

canvas.width = 64 * 16
canvas.height = 64 * 9
//thank you chris courses


const background = new Sprite({
    imageSrc: './art/background.png',
    position: {
        x: 0,
        y: 0,
    },
})

const player = new Player()

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

background.draw()

function animate() {
    window.requestAnimationFrame(animate)

	now = Date.now();
	delta = now - then;
	if (delta > interval) {
    then = now - (delta % interval);    



    c.clearRect
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.draw()
    //player.velocity.x = 0
    if (keys.d.pressed){
        player.velocity.x = 10
    } else if (keys.a.pressed) {
        player.velocity.x = -10
    }
    player.update()
    player.draw()
}
}

animate()
