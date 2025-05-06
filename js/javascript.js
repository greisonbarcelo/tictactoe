function Cell() {
    return null
}

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 1; i <= rows; i++) {
        board[i] = [];
        for(let j = 1; j <= columns; j++) {
            board[i].push(Cell());
        }
    }

    return board
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    return GameBoard();
}
console.table(GameController());
