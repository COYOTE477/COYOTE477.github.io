window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
        
            break
        case 'e':
            level++
            talking = false
            levels[level].init()
            player.preventInput = false
        
            break
        case 'a':
            keys.a.pressed = true

            break
        case 'd':
            keys.d.pressed = true
            break

        case 'r':
            levels[level].init()
            player.preventInput = false
            talking = false
            break
            
        case 'ArrowUp':
            keys.w.pressed = true
            
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
        case 'e':
            keys.e.pressed = false
        
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