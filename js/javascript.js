(function(){
    const gameBoard = {
        playerOne: 'x', 
        playerTwo: 'o',

        // empty board setup 2d array with 3 rows, 3 columns
        boardArray: [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ],
        // initializes the control flow
        init: function(){
            this.cacheDom();
        },
        // storing the dom for one time selecting and reusability
        cacheDom: function(){
            this.container = document.querySelector(".container");
            // console.log(this.container.textContent)
        },
        // for displaying the starting / updated board
        renderBoard: function(){
        },
        // checking who won the game for three consecutive token (x/o)
        checkWinner: function(player){
            // diagonal wins
            if (this.boardArray[0][0] === player && 
                this.boardArray[1][1] === player && 
                this.boardArray[2][2] === player) {
                    return `${player} wins diagonal!`;
                }
            // row wins
            for (let i = 0; i <= 2; i++){
                if (this.boardArray[i][0] === player && 
                    this.boardArray[i][1] === player && 
                    this.boardArray[i][2] === player) {
                        return `${player} wins row!`;
                    }
            }

            // column wins
            for (let i = 0; i <= 2; i++){
                if (this.boardArray[0][i] === player && 
                    this.boardArray[1][i] === player && 
                    this.boardArray[2][i] === player) {
                        return `${player} wins column!`;
                    }
            }
        }
    }

    // // for visualizing gameBoard
    // // console.log(gameBoard.init());
    // console.log(gameBoard)
    gameBoard.boardArray[2][0] = gameBoard.playerOne;
    gameBoard.boardArray[2][1] = gameBoard.playerOne;
    gameBoard.boardArray[2][2] = gameBoard.playerOne;

    console.table(gameBoard.boardArray);

    console.log(gameBoard.checkWinner("x"))

})()

// console.log(items[2][2]);

