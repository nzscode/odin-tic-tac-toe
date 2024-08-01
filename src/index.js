import "./style.css";

let main = document.getElementById("main");
let restartBtn = document.querySelector("#restartBtn");
let statusDisplay = document.querySelector("#status");
let winPage = document.getElementById("winPage");
let winMessage = document.getElementById("winMsg");
let reloadBtn = document.getElementById("reloadBtn");
makeGameBoard(9);

let gameOn = true;

let turn = true;

let gameBoard = ["", "", "", "", "", "", "", "", ""];

let winConditions = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

let activePlayer = "X";
statusDisplay.textContent = `It is X's Turn`;
let winMsg = () => `Player ${activePlayer} has won`;
let drawMsg = () => `It was a draw!`;

function makeGameBoard(cellCount) {
    let gameboardDiv = document.createElement("div");
    gameboardDiv.setAttribute("id", "gameboardDiv");
    main.appendChild(gameboardDiv);
    for (let i = 0; i < cellCount; i++) {
        let tile = document.createElement("div");
        tile.setAttribute("cellIndex", i);
        tile.setAttribute("class", "cell");
        gameboardDiv.appendChild(tile);
    }
}

function restartGame() {
    restartBtn.addEventListener("click", () => {
        document.location.reload();
    });
}
restartGame();

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    turnSwitch(cell);
});

function turnSwitch(cell) {
    cell.addEventListener(
        "click",
        (e) => {
            if (turn == true) {
                // console.log(true);
                // cell.textContent = "X";
                cell.classList.add("x");
                activePlayer = "X";
                statusDisplay.textContent = `It is O's Turn`;
                let cIndex = cell.getAttribute("cellindex");
                // console.log(cIndex);
                gameBoard[cIndex] = "X";
                turn = false;
                // console.log(gameBoard);
                printMsg(checkWin(gameBoard, "X"));
                // checkWin(gameBoard, "X"); Using Giant Function
            } else {
                // console.log(false);
                // cell.textContent = "O";
                cell.classList.add("o");
                turn = true;
                activePlayer = "O";
                statusDisplay.textContent = `It is X's Turn`;
                let cIndex = cell.getAttribute("cellindex");
                // console.log(cIndex);
                gameBoard[cIndex] = "O";
                // console.log(gameBoard);
                printMsg(checkWin(gameBoard, "O"));
                // checkWin(gameBoard, "O"); Using Giant Function
            }
        },
        { once: true }
    );
}

function checkWin(board, mark) {
    for (let i = 0; i < winConditions.length; i++) {
        const wC1 = winConditions[i];
        // console.log("wC1" + wC1);
        // console.log("wC1[0]" + wC1[0]);
        // console.log("gameBoard: wC1[0]:" + board[wC1[0]]);
        if (
            board[wC1[0]] === mark &&
            board[wC1[1]] === mark &&
            board[wC1[2]] === mark
        ) {
            // console.log(`${mark} Wins`);
            statusDisplay.textContent = `Game Over`;
            return mark;
        } else if (!board.includes("")) {
            statusDisplay.textContent = `Game Over`;
            return "draw";
        }
    }
}

function printMsg(cb) {
    let winner = cb;
    if (winner == "X") {
        winPage.setAttribute("class", "show");
        winMessage.innerText = winMsg();
    } else if (winner == "O") {
        winPage.setAttribute("class", "show");
        winMessage.innerText = winMsg();
    } else if (winner == "draw") {
        winPage.setAttribute("class", "show");
        winMessage.innerText = drawMsg();
    }
}

reloadBtn.addEventListener("click", () => {
    document.location.reload();
});
/*Giant Function 
function checkWin(board, mark) {
    if (board[0] === mark && board[4] === mark && board[8] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[2] === mark && board[4] === mark && board[6] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[0] === mark && board[1] === mark && board[2] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[3] === mark && board[4] === mark && board[5] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[6] === mark && board[7] === mark && board[8] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[0] === mark && board[3] === mark && board[6] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[1] === mark && board[4] === mark && board[7] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (board[2] === mark && board[5] === mark && board[8] === mark) {
        console.log(`${mark} Wins!`);
        return mark;
    } else if (!board.includes("")) {
        return "draw";
    }
}
*/
