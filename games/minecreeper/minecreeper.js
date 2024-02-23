
document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('minesweeperCanvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');
    const flagtext = document.getElementById('FlagsLeft');
    let boardSize = 10;
    let cellSize = 800 / boardSize; // width divided by cell for perfect scaling
    let mines = 10;
    let fail = false;
    let flagsleft = mines;
    restartButton.addEventListener('click', function() {
        restartGame();
        drawBoard(board, ctx, cellSize); // restarts board after you press the restart button
    });


function initializeBoard(width, height) {
    let board = new Array(height);

    for (let i = 0; i < height; i++) {
        board[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            // set up da cell things and variabls
            board[i][j] = {
                mine: false,
                adjacentMines: 0,
                revealed: false,
                flagged: false
            };
        }
    }

    return board;
}

function placeMines(board, numMines) {
    let height = board.length;
    let width = board[0].length;
    let placedMines = 0;

    while (placedMines < numMines) {
        let row = Math.floor(Math.random() * height);
        let col = Math.floor(Math.random() * width);

        if (!board[row][col].mine) {
            board[row][col].mine = true;
            placedMines++;
        }
    }
}

function calculateAdjacency(board) {
    let height = board.length;
    let width = board[0].length;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            // Skip mine cells as they don't get a number.. fuck those mine cells!!!
            if (board[row][col].mine) continue;

            let mineCount = 0;

            // check who you surround yourself with
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue; // do NOT include yourself
                    
                    let newRow = row + i;
                    let newCol = col + j;

                    // Check if new row and column are within the board boundaries
                    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
                        if (board[newRow][newCol].mine) {
                            mineCount++;
                        }
                    }
                }
            }

            // yup.. thats how much mines you have..
            board[row][col].adjacentMines = mineCount;
        }
    }
}

function checkWin(board) {
    let cellCount = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let cell = board[i][j];
            if (cell.revealed === false) {
                cellCount++; //this checks if how much cells you have are equal to the mine..
            }
        }
    }
    if (cellCount === mines){
        console.log('whin')
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let cell = board[i][j];
                if (cell.revealed === false) {
                    ctx.fillStyle = '#0f0'; // make all mines green wen you w in
                    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }
            }
        }
    }   
}


function drawBoard(board, ctx, cellSize) {
    console.log('Draw')
    flagtext.textContent = "flags left: " + flagsleft;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let cell = board[i][j];
            ctx.strokeStyle = '#000';
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);

            if (cell.revealed) {
                ctx.fillStyle = cell.mine ? '#f00' : '#ddd';
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);

                if (!cell.mine && cell.adjacentMines > 0) {
                    ctx.fillStyle = '#000';
                    ctx.fillText(
                        cell.adjacentMines.toString(), //NUMBERS
                        j * cellSize + cellSize / 2,
                        i * cellSize + cellSize / 2
                    );
                }
            } else{
                ctx.fillStyle = cell.flagged ? '#00f' : '#888'; // <- i think im a genius for this
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}

function revealCell(board, row, col) {
    // these cells better be whithin does boundaries...
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return;
    }

    const cell = board[row][col];

    // do nuthin when cell is nothin
    if (cell.revealed || cell.flagged) {
        return;
    }

    // Reveal the cell
    cell.revealed = true;


    // FLOOD FILL... TAP IN...
    if (cell.adjacentMines === 0 && !cell.mine) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                revealCell(board, row + i, col + j);
            }
        }
    }
}

function restartGame() {
    mines = parseFloat(document.getElementById('mines').value);
    boardSize = parseFloat(document.getElementById('size').value);
    fail = false;
    flagsleft = mines;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = { //yup... restart that game!
                mine: false,
                adjacentMines: 0,
                revealed: false,
                flagged: false
            };
        }
    }
    cellSize = 800 / boardSize; // Adjust this 800 if you want a different canvas size

    // Update the canvas size to match the new board
    canvas.width = cellSize * boardSize;
    canvas.height = cellSize * boardSize;
    // restart everything
    board = initializeBoard(boardSize, boardSize)
    placeMines(board, mines);
    calculateAdjacency(board);
    
    drawBoard(board, ctx, cellSize);
}

function cellFlagged(board, gridX, gridY) {
    let cell = board[gridY][gridX];
    if (fail === false && cell.revealed === false) {
        if (cell.flagged === false) {
            cell.flagged = true;
            flagsleft -= 1;
        }else{
            cell.flagged = false;
            flagsleft += 1;
        }
    }
}

function cellClicked(board, gridX, gridY) {
    // If the clicked cell is a mine... rest in penits...\
    if (fail === false) {
        if (board[gridY][gridX].mine) {
            fail = true
            revealMines(board)  
        } else {
            // If not a mine, reveal the cell! yay!!
            revealCell(board, gridY, gridX);
        }
    } 
}

// start ze board!
let board = initializeBoard(boardSize, boardSize);
placeMines(board, mines);
calculateAdjacency(board);

// first drawing.. tapn...
drawBoard(board, ctx, cellSize);

function revealMines(board) { //you know what this does it says it
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].mine) {
                board[i][j].revealed = true;
            }
        }
    }
}


// left click or... right click!!
canvas.addEventListener('mousedown', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const gridX = Math.floor(x / cellSize);
    const gridY = Math.floor(y / cellSize);
    if (event.button === 0) {
        cellClicked(board, gridX, gridY);
        drawBoard(board, ctx, cellSize);
        checkWin(board);
    }else{
        cellFlagged(board, gridX, gridY);
        drawBoard(board, ctx, cellSize);
    }
});

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault(); //no leftt click menu (THANK YOU GOOGLE)
});


});