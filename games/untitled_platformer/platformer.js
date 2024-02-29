const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
let backgroundscroll = 20
document.documentElement.style.overflow = 'hidden';
canvas.width = 64 * 16
canvas.height = 64 * 9
//thank you chris courses for the tutorial
let parsedCollisions
let collisionBlocks
let background
let map
let doors
let npcs
let talking = false
let faces = [
    new Sprite({
        imageSrc: './art/faces/player.png',
        position: {
            x: 160,
            y: 416,
        },
        frameCount:2,
        frameBuffer: 5,
        loop: true,
    }),
    new Sprite({
        imageSrc: './art/faces/crocodile.png',
        position: {
            x: 160,
            y: 416,
        },
        frameCount:2,
        frameBuffer: 5,
        loop: true,
    }),
    new Sprite({
        imageSrc: './art/faces/traveler.png',
        position: {
            x: 160,
            y: 416,
        },
        frameCount:2,
        frameBuffer: 2,
        loop: true,
    }),]
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
                imageSrc: './art/levels/backgroundtemplate.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })

            map = new Sprite({
                imageSrc: './art/levels/level1.png',
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

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                imageSrc: './art/levels/backgroundtemplate.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })

            map = new Sprite({
                imageSrc: './art/levels/level2.png',
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
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.position.x = 64
            player.position.y = 512
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                imageSrc: './art/levels/backgroundtemplate.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })

            map = new Sprite({
                imageSrc: './art/levels/level3.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })
            
            doors = [
                new Sprite({
                    position: {
                        x: 32,
                        y: 352
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
    4: {
        init: () => {
            parsedCollisions = collisionsLevel4.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.position.x = 64
            player.position.y = 288
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                imageSrc: './art/levels/backgroundtemplate.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })

            map = new Sprite({
                imageSrc: './art/levels/level4.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })
            
            doors = [
                new Sprite({
                    position: {
                        x: 928,
                        y: 256
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
    5: {
        init: () => {
            parsedCollisions = collisionsLevel5.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.position.x = 160
            player.position.y = 352
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                imageSrc: './art/levels/backgroundtemplate.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })

            map = new Sprite({
                imageSrc: './art/levels/level5.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })
            
            npcs = [
                new Npc({
                    position: {
                        x: 480,
                        y: 352
                    },
                    imageSrc: './art/NPC/crocodile/idleRight.png',
                    frameCount:2,
                    frameBuffer: 20,
                    dialog: ["hi,", "hi", "my name is crocodile.", "you have made it pretty far!", "appreciate that man.", "btw, dont expect a lot.", "this is just a demo."],
                    characters: [0, 1, 1, 1, 1, 1, 1],
                    animations: {
                        idleRight: {
                            frameCount: 2,
                            frameBuffer: 10,
                            loop: true,
                            imageSrc: './art/NPC/crocodile/idleRight.png',
                        },
                        idleLeft: {
                            frameCount: 2,
                            frameBuffer: 10,
                            loop: true, 
                            imageSrc: './art/NPC/crocodile/idleLeft.png',
                        }
                    }
                })
            ]

            doors = [
                new Sprite({
                    position: {
                        x: 800,
                        y: 320
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
    6: {
        init: () => {
            parsedCollisions = collisionsLevel6.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.position.x = 32
            player.position.y = 96
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                imageSrc: './art/levels/backgroundneptune.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })

            map = new Sprite({
                imageSrc: './art/levels/level6.png',
                position: {
                    x: 0,
                    y: 0,
                },
            })
            
            npcs = [
                new Npc({
                    position: {
                        x: 448,
                        y: 256
                    },
                    imageSrc: './art/NPC/traveler/idleRight.png',
                    frameCount:2,
                    frameBuffer: 20,
                    dialog: ["are we on neptune", "yeah"],
                    characters: [2, 0],
                    animations: {
                        idleRight: {
                            frameCount: 2,
                            frameBuffer: 10,
                            loop: true,
                            imageSrc: './art/NPC/traveler/idleRight.png',
                        },
                        idleLeft: {
                            frameCount: 2,
                            frameBuffer: 10,
                            loop: true, 
                            imageSrc: './art/NPC/traveler/idleLeft.png',
                        }
                    }
                })
            ]

            doors = [
                new Sprite({
                    position: {
                        x: 0,
                        y: 352
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
    },
    e: {
        pressed: false
    },
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
    
    if (background.position.x < -8192) background.position.x = 0
    background.position.x = background.position.x - 1
    background.draw()
    map.draw()
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.draw()
    })
    doors.forEach(door => {
        door.draw()
    })
    if (npcs) {
    npcs.forEach(npc => {
        npc.update()
        npc.draw()
    })}
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
