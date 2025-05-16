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

    // placing the marker on the empty available cell
    const playRound = (row, column, activePlayer) => {
        console.log(`Placing ${getActivePlayer().name}'s token at (${row}, ${column})...`);

        // calls GameBoard drop marker function to add a marker on active player's chosen cell
        board.dropMarker(row, column, getActivePlayer().marker);

        // check if someone won function here ...

        switchPlayerTurn(); // switch player turn
        printNewRound();
    }
    printNewRound();

    
    return { playRound, getActivePlayer }
}


const game = GameController();
game.getActivePlayer();
game.playRound(0, 0);


// console.table(game.board);
// game.dropMarker(0, 0, 'x');
