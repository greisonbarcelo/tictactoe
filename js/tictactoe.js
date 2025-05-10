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
            board[i].push(null);
        }
    }

    // testing purposes if the board works
    console.table(board)
}






// testing purposes
GameBoard();