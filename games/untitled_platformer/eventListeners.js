window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'w':
            player.velocity.y = -15

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
    console.log(event)
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