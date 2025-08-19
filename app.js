let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#restart");
let winner=document.querySelector(".winner-tab");
let st=document.querySelector("#status");
let newGameBtn=document.querySelector("#new-game");
let winnerText = document.querySelector("#winner-text");
let chooseXBtn = document.querySelector("#choose-x");
let chooseOBtn = document.querySelector("#choose-o");
let playerSymbol = null;
let turnO = true;
let count=0;
newGameBtn.disabled=true;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableCells=()=>{
  for(let cell of cells){
    cell.style.pointerEvents="none";
  }
}

const enableCells=()=>{
  for(let cell of cells){
    cell.style.pointerEvents="auto";
    cell.innerHTML="";
  }
}

chooseXBtn.addEventListener("click", () => {
  playerSymbol = "X";
  turnO = false; // If player is X, X goes first
  startGame();
});

chooseOBtn.addEventListener("click", () => {
  playerSymbol = "O";
  turnO = true; // If player is O, O goes first
  startGame();
});

function startGame() {
  chooseXBtn.disabled = true;
  chooseOBtn.disabled = true;
  st.innerHTML = `Player <b>${turnO ? "O" : "X"}</b>'s turn`;
}


const resetGame = () => {
  playerSymbol = null;
  turnO = true;
  enableCells();
  winnerText.innerHTML = "";
  winnerText.style.visibility = "hidden";
  st.innerHTML = "Choose your symbol to start";
  newGameBtn.disabled = true;
  newGameBtn.style.backgroundColor = "#F2F4F8";
  newGameBtn.innerText = "";

  chooseXBtn.disabled = false;
  chooseOBtn.disabled = false;
};


let showWinner=(winnerP)=>{
  winnerText.innerHTML = `Congratulations...!<br>🏆 The Winner is <b>${winnerP}</b> 🏆`;
  winnerText.style.visibility = "visible";
  st.innerText="";
  newGameBtn.disabled=false
  newGameBtn.style.backgroundColor="#6366F1";
  newGameBtn.innerText="New Game";
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = cells[pattern[0]].innerText;
    let pos2 = cells[pattern[1]].innerText;
    let pos3 = cells[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        disableCells();
        showWinner(pos1);
        return;
      }
    }
  }
  let isDraw = true;
  cells.forEach(cell => {
    if (cell.innerText === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    disableCells();
    winnerText.innerHTML = `It's a Draw!`;
    winnerText.style.visibility = "visible";
    st.innerText = "";
    newGameBtn.disabled=false;
    newGameBtn.style.backgroundColor = "#6366F1";
    newGameBtn.innerText = "New Game";
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

cells.forEach((box) => {
  box.addEventListener("click", () => {
    if (!playerSymbol) return alert("Please choose your symbol first!");

    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      box.style.color = "#EF4444";
      turnO = false;
      st.innerHTML = "Player <b>X</b>'s turn";
    } else {
      box.innerText = "X";
      box.style.color = "#3B82F6";
      turnO = true;
      st.innerHTML = "Player <b>O</b>'s turn";
    }
    checkWinner();
  });
});




















