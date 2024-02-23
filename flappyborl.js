
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; // lets hmm.. make the bird..
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //how about... the pipes!!
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //illusion of movement
let velocityY = 0; //bird velocity
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw flappy bird
    context.fillStyle = "green";
    context.fillRect(bird.x, bird.y, bird.width, bird.height);

    context.fillStyle = "brown"; // lets make this pipe... BROWN!
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    }

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // lets add a pipe hm.. every uhhh 1.5 seconds!!!
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    context.fillStyle = "green";
    context.fillRect(bird.x, bird.y, bird.width, bird.height);

    context.fillStyle = "brown"; // lets make this pipe... BROWN!
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    }

    //bird
    velocityY += gravity; //illusion of earthly mechanics
    bird.y = Math.max(bird.y + velocityY, 0); //No GOING OUTSIDE OF THE PIPE!!

    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; // lets do 0.5 for each pipe i know there is a better way to do this but im not going to
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //kill first pipes
    }

    //score
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    var validKeys = ["Space", "ArrowUp", "KeyX"];
    if (validKeys.includes(e.code) || e.type === "mousedown") {
        velocityY = -6; // jump

        // WELCOME THE NEW GAME ORDER
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}
// this checks for mouse clicks
document.addEventListener("mousedown", moveBird);

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}