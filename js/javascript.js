function Gameboard() {
    const rows = 2;
    const columns = 2;
    const board = [];

    for(let i = 0; i <= rows; i++) {
        board[i] = [];
        for(let j = 0; j <= columns; j++) {
            board[i].push(Cell());
        } 
    }
    const getBoard = () => board;

    const dropMarker = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

        if(!availableCells) return;

        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addMarker(player);
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
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${column}...`
        );
        board.dropMarker(column, getActivePlayer().token);

        /*  This is where we would check for a winner and handle that logic,
          such as a win message. */

        switchPlayerTurn();
        printNewRound();
    };
  printNewRound();  

  return {
    playRound, getActivePlayer
  };       
}

const game = GameController();

// game.playRound(1);
// console.table(game.getBoard())
