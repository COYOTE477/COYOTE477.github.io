// GET ME MY CANVAS
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// thingies for ze game that decide what ze game uses
let bird, pipes, gravity, score, gameRunning;

// start ze gane !!!
function startGame() {
    bird = { x: 50, y: canvas.height / 2, width: 20, height: 20, velocity: 0 };
    pipes = [];
    gravity = 0.6;
    score = 0;
    gameRunning = true;
    gameLoop();
}

// The main game loop
function gameLoop() {
    if (!gameRunning) {
        return; // stop ze game if going!!
    }

    updateGameState();
    renderGame();
    requestAnimationFrame(gameLoop); // Do this again ASAP
}

function updateGameState() {
    // Update the bird's position
    bird.velocity += gravity; 
    bird.y += bird.velocity;

    
}

function renderGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the bird
    ctx.fillStyle = 'yellow'; // this bird will hmmm... yellow!
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

}

// dis checks for da space bar
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        bird.velocity = -10; // make da bird flap
    }
});

// Start the game
startGame();