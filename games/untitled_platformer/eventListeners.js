window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':

            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]

                if (player.position.x + player.width <= door.position.x + door.width &&
                    player.position.x >= door.position.x &&
                    player.position.y >= door.position.y &&
                    player.position.y + player.height  <= door.position.y + door.width
                ) {
                    console.log("le open")
                    return
                }
            }

            if (player.velocity.y === 0) player.velocity.y = -15

            break
        case 'a':
            keys.a.pressed = true

            break
        case 'd':
            keys.d.pressed = true

            break
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
    }
})