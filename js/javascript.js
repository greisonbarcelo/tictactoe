function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        } 
    }
    const getBoard = () => board;

    const dropMarker = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addMarker(player);
            return true; 
        } else {
            console.log("Cell already occupied! Choose another one.");
            return false; 
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.table(boardWithCellValues);
    };



    return {
        getBoard, dropMarker, printBoard
    };
}

function Cell() {
    let value = 0;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMarker, getValue
    };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    let gameOver = false;

    const players = [
        {
            name: playerOneName,
            token: 'x'
        },
        {
            name: playerTwoName,
            token: 'o'
        }
    ];

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();

        if (gameOver) return;
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // winner condition logic
    const checkWinner = () => {
        if ([0, 1, 2].every(i => board.getBoard()[i][i].getValue() === getActivePlayer().token)) {
            console.log(`${getActivePlayer().name} wins diagonal!`);
            gameOver = true;
            printNewRound();
            return; 
        }
    }

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().name}'s token at (${row}, ${column})...`);
        
        // If the move is invalid, let the same player try again
        if (!board.dropMarker(row, column, getActivePlayer().token)) {
            console.log(`${getActivePlayer().name}, try a different cell.`);
            return; // Exit without switching turns
        }
        
        checkWinner();
        

        // If the move is successful, switch player
        switchPlayerTurn();
        printNewRound();
    };

  printNewRound();  

  return {
    playRound, getActivePlayer
  };       
}

const game = GameController();

game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(1, 0);
game.playRound(2, 2);
// console.table(game.getBoard()) 
