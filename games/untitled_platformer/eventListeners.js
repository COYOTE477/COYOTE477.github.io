window.addEventListener('keydown', (event) => {
    
    console.log(event.key);
    switch (event.key) {
        case 'w':
            if (player.velocity.y === 0 && player.onGround === true) player.velocity.y = -15
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]

                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.position.y >= door.position.y &&
                    player.position.y + player.height  <= door.position.y + door.width
                ) {
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('EnterDoor')
                    door.play()
                }
            }
            break
        case 'a':
            keys.a.pressed = true

            break
        case 'd':
            keys.d.pressed = true
            break

        case 'r':
            levels[level].init()
            break
            
        case 'ArrowUp':
            keys.w.pressed = true
            if (player.velocity.y === 0) player.velocity.y = -15
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]

                if (player.position.x + player.width <= door.position.x + door.width &&
                    player.position.x >= door.position.x &&
                    player.position.y >= door.position.y &&
                    player.position.y + player.height  <= door.position.y + door.width
                ) {
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('EnterDoor')
                    door.play()
                }
            }
            break

            break
        case 'ArrowLeft':
            keys.a.pressed = true

            break
        case 'ArrowRight':
            keys.d.pressed = true

            break
        case ' ':
            keys.w.pressed = true
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false

            break
        case 'a':
            keys.a.pressed = false

            break
        case 'd':
            keys.d.pressed = false

            break
        case 'ArrowUp':
            keys.w.pressed = false

            break
        case 'ArrowLeft':
            keys.a.pressed = false

            break
        case 'ArrowRight':
            keys.d.pressed = false

            break
        case ' ':
            keys.w.pressed = false
    }
})