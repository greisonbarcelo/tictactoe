function GameBoard() {
    // define board size 3x3 and initial board array
    // that will be converted to 2d array
    let rows = 3;
    let columns = 3;
    let board = [];

    // for loop for generating the board 2d array
    // rows on outer for loop, columns on inside loop
    for(let i = 0; i < rows; i++) {
        board[i] = []
        for(let j = 0; j < columns; j++) {
            // Cell function is for generating what the user inputs, 
            // initial value will be null
            board[i].push(boxValue().getValue());
        }
    }
    
    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;

    // markBox function is for adding marker into the box in our board
    function markBox(row, column, player) {
        // if a box is empty, add a x/o marker on the box
        if(board[row][column].getValue() === null ) {
            board[row][column].addMarker(player);
        }
    }

    // testing purposes if the board work
    console.table(board)
}

// modify later to return what item to return, default is null 
// however, it can return player object array's marker (x/o)
function boxValue() {
    let value = null;

    const addMarker = (player) => {
        value = 'player';
    }
    // return the value using getValue function after 
    // addMarker function alters it when a user (x/o) inputs a marker
    const getValue = () => value;
    return {addMarker, getValue};

}

// testing purposes
GameBoard();