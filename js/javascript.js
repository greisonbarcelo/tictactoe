function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 1; i <= rows; i++) {
        board[i] = [];
        for(let j = 1; j <= columns; j++) {
            board[i][j] = [];
        }
    }

    return board
}
console.table(GameBoard());
