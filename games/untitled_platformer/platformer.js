const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

canvas.width = 64 * 16
canvas.height = 64 * 9
//thank you chris courses for the tutorial
const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()


const background = new Sprite({
    imageSrc: './art/background.png',
    position: {
        x: 0,
        y: 0,
    },
})

const player = new Player({
    collisionBlocks,
    imageSrc: './art/player/idleRight.png',
    frameCount: 2,
    animations: {
        idleRight: {
            frameCount: 2,
            frameBuffer: 10,
            loop: true,
            imageSrc: './art/player/idleRight.png',
        },
        idleLeft: {
            frameCount: 2,
            frameBuffer: 10,
            loop: true,
            imageSrc: './art/player/idleLeft.png',
        },
        runRight: {
            frameCount: 2,
            frameBuffer: 2,
            loop: true,
            imageSrc: './art/player/runRight.png',
        },
        runLeft: {
            frameCount: 2,
            frameBuffer: 2,
            loop: true,
            imageSrc: './art/player/runLeft.png',
        }
    }
})

const doors = [
    new Sprite({
        position: {
            x: 928,
            y: 192
        },
        imageSrc: './art/door/open.png',
        frameCount:5,
        frameBuffer: 5,
        loop: false,
        autoplay: false
    })
]
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
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.draw()
    })
    doors.forEach(door => {
        door.draw()
    })
    //player.velocity.x = 0
    if (keys.d.pressed){
        player.switchSprite('runRight')
        player.velocity.x = 10
        player.lastDirection = 'right'
    } else if (keys.a.pressed) {
        player.switchSprite('runLeft')
        player.velocity.x = -10
        player.lastDirection = 'left'
    } else {
        if (player.lastDirection === 'left'){
            player.switchSprite('idleLeft')}
        else player.switchSprite('idleRight')

    }
    player.update()
    player.draw()
}
}

animate()
