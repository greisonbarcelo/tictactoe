// generate, read, update board inside the GameBoard() function
function GameBoard() {
    // board dimension
    const rows = 2;
    const columns = 2;
    // board 2d array variable
    const board = [];

    // nested array, outer loop is for rows
    for (let i = 0; i <= rows; i++) {
        board[i] = [];
        // inner loop is for columns
        for (let j = 0; j <= columns; j++) {
            board[i].push(null);
        }
    } 

    const getBoard = () => board;

    // // checks a cell if the cell is availbale to drop a mark on
    // function availableCells(row, column) {
    //     // returns true if a cell is null
    //     return board[row][column] === null;
    // }
    
    // when a player takes turn, place their marker on the cell
    const dropMarker =(row, column, player) => {
        // check if the cell is empty
        if (board[row][column] !== null) {
            console.log(`There's a marker on ${row},${column}`);
            return;
        }
        // if the cell is empty, place players marker: x/o
        board[row][column] = player;
        console.table(board);
        return board
    }
    

    // // when a player takes turn, place their marker on the cell
    // function dropMarker(row, column, player) {
    //     // check if the cell is empty
    //     if (board[row][column] !== null) {
    //         console.log(`There's a marker on ${row},${column}`);
    //         return;
    //     }
    //     // if the cell is empty, place players marker: x/o
    //     board[row][column] = player;
    //     console.table(board);
    //     return board
    // }

    

    return { board, dropMarker };
}



const game = GameBoard();
console.table(game.board);
game.dropMarker(0, 0, 'x');
