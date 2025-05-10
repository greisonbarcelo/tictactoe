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
        if (!board[row] || !board[row][column]) {
            console.error("Invalid cell reference: row or column is out of bounds.");
            return false;
        }
        
        if (board[row][column].getValue() === null) {
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
    let value = null;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMarker, getValue
    };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two", updateScreen) {
    const board = Gameboard();
    let gameOver = false;
    let winningCells = []; // Store winning cell positions
    const updateBoardScreen = updateScreen;

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

    const disableBoard = () => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.disabled = true;
        });
    };

    function drawWinningLine(boardDiv, winningCells) {
        let startX, startY, endX, endY;
      
        // Get the first winning cell and compute its center using offsets
        const firstCell = boardDiv.querySelector(
          `[data-row="${winningCells[0][0]}"][data-column="${winningCells[0][1]}"]`
        );
        const centerFirstX = firstCell.offsetLeft + firstCell.offsetWidth / 2;
        const centerFirstY = firstCell.offsetTop + firstCell.offsetHeight / 2;
      
        if (
          winningCells[0][0] === winningCells[1][0] &&
          winningCells[1][0] === winningCells[2][0]
        ) {
          // Horizontal win
          startX = 0;
          endX = boardDiv.offsetWidth;
          startY = centerFirstY;
          endY = centerFirstY;
        } else if (
          winningCells[0][1] === winningCells[1][1] &&
          winningCells[1][1] === winningCells[2][1]
        ) {
          // Vertical win
          startY = 0;
          endY = boardDiv.offsetHeight;
          startX = centerFirstX;
          endX = centerFirstX;
        } else {
          // Diagonals
          if (winningCells[0][1] < winningCells[2][1]) {
            startX = 0;
            startY = 0;
            endX = boardDiv.offsetWidth;
            endY = boardDiv.offsetHeight;
          } else {
            startX = boardDiv.offsetWidth;
            startY = 0;
            endX = 0;
            endY = boardDiv.offsetHeight;
          }
        }
      
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX);
      
        const line = document.createElement("div");
        line.classList.add("winning-line");
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}rad) scaleX(0)`;
      
        boardDiv.appendChild(line);
      
        setTimeout(() => {
          line.style.transform = `rotate(${angle}rad) scaleX(1)`;
        }, 50);
      }
      
      

    // winner condition logic
    // winner condition logic
const checkWinner = (playerTurnDiv) => {
    const boardArray = board.getBoard();
    const playerToken = getActivePlayer().token;

    // Check rows
    for (let row = 0; row < 3; row++) {
        if (boardArray[row].every(cell => cell.getValue() === playerToken)) {
            winningCells = boardArray[row].map((_, col) => [row, col]);
            playerTurnDiv.textContent = `${getActivePlayer().name} wins horizontally!`;
            gameOver = true;
            updateBoardScreen();
            return;
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if ([0, 1, 2].every(row => boardArray[row][col].getValue() === playerToken)) {
            winningCells = [0, 1, 2].map(row => [row, col]);
            playerTurnDiv.textContent = `${getActivePlayer().name} wins vertically!`;
            gameOver = true;
            updateBoardScreen();
            return;
        }
    }

    // Check diagonals
    if ([0, 1, 2].every(i => boardArray[i][i].getValue() === playerToken)) {
        winningCells = [0, 1, 2].map(i => [i, i]);
        playerTurnDiv.textContent = `${getActivePlayer().name} wins diagonally!`;
        gameOver = true;
        updateBoardScreen();
        return;
    }
    if ([0, 1, 2].every(i => boardArray[i][2 - i].getValue() === playerToken)) {
        winningCells = [0, 1, 2].map(i => [i, 2 - i]);
        playerTurnDiv.textContent = `${getActivePlayer().name} wins diagonally!`;
        gameOver = true;
        updateBoardScreen();
        return;
    }
};


    const playRound = (row, column, playerTurnDiv) => {
        console.log(`Placing ${getActivePlayer().name}'s token at (${row}, ${column})...`);
        
        // If the move is invalid, let the same player try again
        if (!board.dropMarker(row, column, getActivePlayer().token)) {
            console.log(`${getActivePlayer().name}, try a different cell.`);
            return; // Exit without switching turns
        }
        
        checkWinner(playerTurnDiv);        

        // If the move is successful, switch player
        switchPlayerTurn();
        printNewRound();
    };

  printNewRound();  

  return {
    playRound, getActivePlayer, getBoard: board.getBoard, isGameOver: () => gameOver, getWinningCells: () => winningCells
  };       
}

const ScreenController = () => {
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    // Define updateScreen first
    const updateScreen = () => {
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const gameOver = game.isGameOver();
        const winningCells = game.getWinningCells();

        if (!gameOver) {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn..`;
        }
        
        board.forEach((row, rowIndex) => {  
            row.forEach((cell, columnIndex) => { 
              const cellButton = document.createElement("button");
              cellButton.classList.add("cell");
              cellButton.dataset.row = rowIndex;
              cellButton.dataset.column = columnIndex;
              cellButton.textContent = cell.getValue();
          
              // Add marker color class based on the token
              if(cell.getValue() === "x"){
                cellButton.classList.add("x-marker");
              } else if(cell.getValue() === "o"){
                cellButton.classList.add("o-marker");
              }
          
              if (gameOver) {
                cellButton.disabled = true;
              }
              boardDiv.appendChild(cellButton);
            });
          });
          

        // Remove any previous winning line if it exists
        const existingLine = document.querySelector(".winning-line");
        if (existingLine) existingLine.remove();

        // If game over and winningCells are defined, draw the winning line
        if (gameOver && winningCells.length) {
            drawWinningLine(boardDiv, winningCells);
        }
    };

    // Function to compute and draw the winning line element
    function drawWinningLine(boardDiv, winningCells) {
        // Get the first and last winning cell buttons
        const firstCell = boardDiv.querySelector(
            `[data-row="${winningCells[0][0]}"][data-column="${winningCells[0][1]}"]`
        );
        const lastCell = boardDiv.querySelector(
            `[data-row="${winningCells[2][0]}"][data-column="${winningCells[2][1]}"]`
        );

        if (!firstCell || !lastCell) return;

        const boardRect = boardDiv.getBoundingClientRect();
        const firstRect = firstCell.getBoundingClientRect();
        const lastRect = lastCell.getBoundingClientRect();

        // Compute the centers of the first and last cells relative to boardDiv
        const x1 = (firstRect.left + firstRect.width / 2) - boardRect.left;
        const y1 = (firstRect.top + firstRect.height / 2) - boardRect.top;
        const x2 = (lastRect.left + lastRect.width / 2) - boardRect.left;
        const y2 = (lastRect.top + lastRect.height / 2) - boardRect.top;

        // Calculate the distance (line length) and the angle
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX); // in radians

        // Create the winning line element
        const line = document.createElement("div");
        line.classList.add("winning-line");

        // Position the line at the starting point (first cell center)
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        // Set its full length
        line.style.width = `${length}px`;
        // Initially, apply a scaleX(0) so that it appears undisplayed
        line.style.transform = `rotate(${angle}rad) scaleX(0)`;

        boardDiv.appendChild(line);

        // Trigger the animation by changing the transform to scaleX(1)
        // (Using a short timeout to allow the initial style to render)
        setTimeout(() => {
            line.style.transform = `rotate(${angle}rad) scaleX(1)`;
        }, 50);
    }

    // Call GameController after updateScreen is defined
    const game = GameController("Player One", "Player Two", updateScreen);

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedRow || !selectedColumn) return;

        game.playRound(Number(selectedRow), Number(selectedColumn), playerTurnDiv);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
};

ScreenController();

// const game = GameController();

// game.playRound(0, 0);

