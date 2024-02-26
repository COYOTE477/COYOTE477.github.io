const collisionBlocks = parsedCollisions.createObjectsFrom2D()

const parsedCollisions = collisionsLevel1.parse2D()

parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 7) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }
                })
            )
        }
    })
})

//i dont remember what this class was supposed to ne
