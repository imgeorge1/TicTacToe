let boardState = ["", "", "", "", "", "", "", "", ""];
let drawArray = []
let winConditions = [
  [1, 2, 3], // Top row
  [4, 5, 6], // Middle row
  [7, 8, 9], // Bottom row
  [1, 4, 7], // Left column
  [2, 5, 8], // Middle column
  [3, 6, 9], // Right column
  [1, 5, 9], // Top-left to bottom-right diagonal
  [3, 5, 7], // Top-right to bottom-left diagonal
];
let turn = 'X'
let gameOver = false

function checkWinner(){
  for (let condition of winConditions){
    const [a, b, c] = condition
    if (boardState[a - 1] && boardState[a - 1] === boardState[b - 1] && boardState[a - 1] === boardState[c - 1]) {
      setTimeout(overFunction, 100)
      function overFunction(){
        alert(`${boardState[a - 1]} Wins!`);
        gameOver = true;
      }
      return true;
    }
  }
  return false
}

document.getElementById("board").addEventListener("mousedown", (e)=>{
  if(gameOver) return

  const id = e.target.id
  const index = id - 1

  if(boardState[index] === ""){
    boardState[index] = turn
    e.target.textContent = turn
    e.target.disabled = true
    drawArray.push(e.target.id)
  }
  
  if (!checkWinner()) {
    turn = turn === "X" ? "O" : "X";  // Switch turns
  }
  if(drawArray.length === 9){
    setTimeout(drawMessage, 100)
    function drawMessage(){
      alert("It's a draw!")
    }
  }
})

let cells = document.getElementsByClassName("cell")

function restart(){
  boardState = ["", "", "", "", "", "", "", "", ""];
  drawArray = []
  gameOver = false

  for (let cell of cells){
    cell.textContent = ""
    cell.disabled = false
  }

}
