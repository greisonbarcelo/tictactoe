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


    return { board, dropMarker, printBoard };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = GameBoard();
    
    const players = [ // define player's name and marker
        {
            name: playerOneName,
            marker: 'X'
        },
        {
            name: playerTwoName,
            marker: 'O'
        }
    ];

    let activePlayer = players[0]; // default first player is playerOne = x

    const switchPlayerTurn = () => { // function to switch turns
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer; // get who is the latest turn it is

    const printNewRound = () => {
        board.printBoard();

        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const checkWinner = (player) => {
        console.log("Checking for winner..."); // Debugging log
        // horizontal win checking -
        for (let row = 0; row < board.board.length; row++) {
            if (board.board[row].every(cell => cell === board.board[row][0] && cell !== null)) {
                console.log( `${getActivePlayer().name} '${board.board[row][0]}' wins in row ${row}!`);
            }
        }
        // vertical win checking
        for (let column = 0; column < board.board.length; column++) {
            if (board.board.every(row => row[column] === board.board[0][column] && row[column] !== null)) {
                console.log(`${getActivePlayer().name} '${board.board[0][column]}' wins in column ${column}!`);
            }
        }
    }

    // placing the marker on the empty available cell
    const playRound = (row, column, activePlayer) => {
        console.log(`Placing ${getActivePlayer().name}'s token at (${row}, ${column})...`);

        // calls GameBoard drop marker function to add a marker on active player's chosen cell
        board.dropMarker(row, column, getActivePlayer().marker);

        // check if someone won function here ...
        checkWinner();

        switchPlayerTurn(); // switch player turn
        printNewRound();
    }
    printNewRound();


    return { playRound, getActivePlayer }
}


const game = GameController();
game.getActivePlayer();

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
// game.playRound(0, 0); // Player X moves (Top-left)
// game.playRound(1, 2); // Player O moves
// game.playRound(1, 1); // Player X moves (Center)
// game.playRound(2, 2); // Player O moves
// game.playRound(2, 0); // Player X moves (Bottom-left, diagonal win)

// win condition testing before putting inside gamecontroller
// const board = [
//     ['X', 'X', null],
//     ['O', 'X', 'O'],
//     ['X', 'X', 'O']
// ];
// // horizontal
// for (let row = 0; row < board.length; row++) {
//     if (board[row].every(cell => cell === board[row][0] && cell !== null)) {
//         console.log( `Player '${board[row][0]}' wins in row ${row}!`);
//     }
// }
// // vertical
// for (let column = 0; column < board.length; column++) {
//     if (board.every(row => row[column] === board[0][column] && row[column] !== null)) {
//         console.log(`Player '${board[0][column]}' wins in column ${column}!`);
//     }
// }