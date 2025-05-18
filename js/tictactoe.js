// generate, read, update board inside the GameBoard() function
function GameBoard() {
    // board dimension
    const rows = 2;
    const columns = 2;
    const board = []; // board 2d array variable

    for (let i = 0; i <= rows; i++) { // nested array, outer loop is for rows
        board[i] = [];
        for (let j = 0; j <= columns; j++) { // inner loop is for columns
            board[i].push(null);
        }
    } 

    const getBoard = () => board;
    
    // when a player takes turn, place their marker on the cell
    const dropMarker = (row, column, player) => {
        // check if the cell is empty
        if (board[row][column] !== null) {
            console.log(`There's a marker on ${row},${column}`);
            return;
        }
        // if the cell is empty, place players marker: x/o
        board[row][column] = player;
        // console.table(board);
        return board;
    }

    const printBoard = () => { // for rendering into the DOM later
        console.table(board);
    }


    return { board, dropMarker, printBoard, getBoard };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = GameBoard();
    let gameOver = false; // Keep track of game state

    const players = [
        { name: playerOneName, marker: "X" },
        { name: playerTwoName, marker: "O" }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const checkWinner = () => {
        let winner = null;

        // Horizontal win check
        for (let row = 0; row < board.board.length; row++) {
            if (board.board[row].every(cell => cell === board.board[row][0] && cell !== null)) {
                winner = activePlayer.name;
            }
        }

        // Vertical win check
        for (let column = 0; column < board.board.length; column++) {
            if (board.board.every(row => row[column] === board.board[0][column] && row[column] !== null)) {
                winner = activePlayer.name;
            }
        }

        // Diagonal win check
        if (
            board.board.every((row, index) => row[index] === board.board[0][0] && row[index] !== null) ||
            board.board.every((row, index) => row[board.board.length - 1 - index] === board.board[0][board.board.length - 1] && row[board.board.length - 1 - index] !== null)
        ) {
            winner = activePlayer.name;
        }

        // Draw check
        if (!winner && board.board.every(row => row.every(cell => cell !== null))) {
            winner = "Draw";
        }

        if (winner) {
            gameOver = true;
        }

        return winner;
    };

    // Play a round for both console and UI versions
    const playRound = (row, column, renderBoardCallback = null, turnDisplay = null) => {
        if (gameOver) return; // Stop moves if game has ended
    
        board.dropMarker(row, column, getActivePlayer().marker);
    
        const winner = checkWinner();
    
        // Live console update per turn
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    
        if (renderBoardCallback) {
            renderBoardCallback();
        }
    
        if (winner) {
            gameOver = true;
            if (turnDisplay) {
                turnDisplay.textContent = winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
            }
    
            // Console log winner
            console.log(winner === "Draw" ? "It's a draw!" : `${winner} wins!`);
           } else {
            switchPlayerTurn();
        }
    };
    
    

    const restartGame = () => {
        board.board.forEach(row => row.fill(null)); // Reset board state
        gameOver = false;
        activePlayer = players[0]; // Reset player turn
    
        console.clear(); // Clear console for fresh game start
        console.log("Game restarted.");
        board.printBoard();
    };
    

    return { playRound, getActivePlayer, checkWinner, getBoard: board.getBoard, restartGame };
}





// const game = GameController();
// game.getActivePlayer();

// // horizontal win -
// game.playRound(0, 0);
// game.playRound(1, 2);
// game.playRound(0, 2);
// game.playRound(1, 1);
// game.playRound(0, 1);

// // vertical win |
// game.playRound(0, 1); // Player X moves (Top-center)
// game.playRound(1, 2); // Player O moves
// game.playRound(1, 1); // Player X moves (Middle-center)
// game.playRound(2, 2); // Player O moves
// game.playRound(2, 1); // Player X moves (Bottom-center, vertical win)

// // diagonal win /\
// game.playRound(0, 2); // Player X moves (Top-right)
// game.playRound(1, 0); // Player O moves
// game.playRound(1, 1); // Player X moves (Center)
// game.playRound(2, 2); // Player X moves (Bottom-right, diagonal win)
// game.playRound(2, 0); // Player O moves

// // Test play for no winner (draw)
// game.playRound(0, 0); // Move 1: X moves at (0,0)
// game.playRound(0, 1); // Move 2: O moves at (0,1)
// game.playRound(0, 2); // Move 3: X moves at (0,2)
// game.playRound(1, 2); // Move 4: O moves at (1,2)
// game.playRound(1, 0); // Move 5: X moves at (1,0)
// game.playRound(2, 0); // Move 6: O moves at (2,0)
// game.playRound(1, 1); // Move 7: X moves at (1,1)
// game.playRound(2, 2); // Move 8: O moves at (2,2)
// game.playRound(2, 1); // Move 9: X moves at (2,1) – Final move (board full)


document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.querySelector(".board");
    const turnDisplay = document.querySelector(".turn");
    const resetButton = document.getElementById("reset"); // Add restart button
    const game = GameController(); 

    const renderBoard = () => {
        boardElement.innerHTML = ""; 
        const board = game.getBoard();

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.column = colIndex;
                cellElement.textContent = cell !== null ? cell : "";
                cellElement.addEventListener("click", handleCellClick);
                boardElement.appendChild(cellElement);
            });
        });

        turnDisplay.textContent = `${game.getActivePlayer().name}'s turn (${game.getActivePlayer().marker})`;
    };

    // Handle cell clicks
    const handleCellClick = (event) => {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;

        if (event.target.textContent !== "") return;

        game.playRound(Number(row), Number(column), renderBoard, turnDisplay);

        if (game.checkWinner()) {
            boardElement.removeEventListener("click", handleCellClick); 
        }
    };

    resetButton.addEventListener("click", () => {
        game.restartGame();
        renderBoard();
    });

    renderBoard();
});

