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
let parsedCollisions
let collisionBlocks
let background
let doors

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.position.x = 64
            player.position.y = 396
            player.collisionBlocks = collisionBlocks

            background = new Sprite({
                imageSrc: './art/background.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })
            
            doors = [
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
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.position.x = 64
            player.position.y = 96
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation = false

            background = new Sprite({
                imageSrc: './art/background.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })
            
            doors = [
                new Sprite({
                    position: {
                        x: 928,
                        y: 160
                    },
                    imageSrc: './art/door/open.png',
                    frameCount:5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}

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
        },
        EnterDoor: {
            frameCount: 8,
            frameBuffer: 10,
            loop: false,
            imageSrc: './art/player/Enter.png',
            onComplete: () => {
                console.log('completed animated')
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        levels[level].init(),
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            },
        },
    }
})

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

const overlay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate)

	now = Date.now();
	delta = now - then;
	if (delta > interval) {
    then = now - (delta % interval);    
    
    background.draw()
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.draw()
    })
    doors.forEach(door => {
        door.draw()
    })
    //player.velocity.x = 0
    player.handleInput(keys)
    player.update()
    player.draw()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}
}
levels[level].init()
animate()
