const tiles = document.querySelectorAll(".tile");
const Player_X = "X";
const Player_O = "O";
let turn = Player_X;


const board = Array(tiles.length);
board.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-Over-Area");
const gameOver = document.getElementById("game-Over");
const resetBtn = document.getElementById("reset-Btn");
resetBtn.addEventListener("click", resetGame);

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

// This function allows for turns to switch
function tileClick(event) {
    if (gameOverArea.classList.contains("visible")) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") {
        return;
    }

    if (turn == Player_X) {
        tile.innerText = Player_X;
        board[tileNumber-1] = Player_X;
        turn = Player_O;
    }
    else {
        tile.innerText = Player_O;
        board[tileNumber-1] = Player_O;
        turn = Player_X;
    }

    hoverText();
    winner();
}

// Allows whosever turn it is to see where they are placing their mark
function hoverText() {
    tiles.forEach(tile => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
}

hoverText();

// Function to check who wins the game
function winner() {
    for (const winningCombination of winningCombinations) {
        const combo = winningCombination.combo;
        const strikeClass = winningCombination.strikeClass;

        const tileValue1 = board[combo[0] - 1];
        const tileValue2 = board[combo[1] - 1];
        const tileValue3 = board[combo[2] - 1];

        if (tileValue1 != null && 
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }

    const allTileFilledIn = board.every((tile) => tile !== null);
    if (allTileFilledIn) {
        gameOverScreen(null);
    }
}


// An array to store the winning combinations
const winningCombinations = [
    { combo: [1, 2, 3], strikeClass: "strike-row-1"},
    { combo: [4, 5, 6], strikeClass: "strike-row-2"},
    { combo: [7, 8, 9], strikeClass: "strike-row-3"},
    { combo: [1, 4, 7], strikeClass: "strike-column-1"},
    { combo: [2, 5, 8], strikeClass: "strike-column-2"},
    { combo: [3, 6, 9], strikeClass: "strike-column-3"},
    { combo: [1, 5, 9], strikeClass: "strike-diagonal-1"},
    { combo: [3, 5, 7], strikeClass: "strike-diagonal-2"},
];

// Function for the winner text and reset button to show up
function gameOverScreen(winnerText) {
    let text = 'It is a Draw :(';
    if (winnerText != null) {
        text = ` The Winner is ${winnerText}`;
    }
    gameOverArea.className = "visible";
    gameOver.innerText = text;
}

// To reset the game
function resetGame() {
    strike.className = "strike"
    gameOverArea.className = "hidden";
    board.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = Player_X;
    hoverText();
}

