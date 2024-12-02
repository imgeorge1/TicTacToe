let boardState = ["", "", "", "", "", "", "", "", ""];  // 9 spaces
let turn = 'X'; // Player X starts
let gameOver = false; // Track if the game is over

// Win conditions
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

// Check if there's a winner
function checkWinnerState(board) {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a - 1] && board[a - 1] === board[b - 1] && board[a - 1] === board[c - 1]) {
      return board[a - 1]; // Return 'X' or 'O' as the winner
    }
  }
  return null;
}

// Minimax algorithm to calculate the best move for AI (O)
function minimax(board, depth, isMaximizingPlayer) {
  let winner = checkWinnerState(board);
  if (winner === 'X') return -10 + depth;  // Player X wins, AI loses
  if (winner === 'O') return 10 - depth;  // Player O wins, AI wins
  if (board.indexOf("") === -1) return 0;  // Draw

  if (isMaximizingPlayer) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";  // AI move
        best = Math.max(best, minimax(board, depth + 1, false));  // Minimize opponent's move
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";  // Player X move
        best = Math.min(best, minimax(board, depth + 1, true));  // Maximize AI's move
        board[i] = "";
      }
    }
    return best;
  }
}

// AI's best move
function aiMove() {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === "") {
      boardState[i] = "O";  // AI move
      let moveVal = minimax(boardState, 0, false);  // Evaluate move
      boardState[i] = "";

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
}

// Function to check if the game has ended (Win or Draw)
function checkWinner() {
  const winner = checkWinnerState(boardState);
  if (winner) {
    setTimeout(() => alert(`${winner} Wins!`), 100);
    gameOver = true;
    return true;
  }
  if (boardState.indexOf("") === -1) {
    setTimeout(() => alert("It's a draw!"), 100);
    gameOver = true;
    return true;
  }
  return false;
}

// Event listener for board clicks
document.getElementById("board").addEventListener("mousedown", (e) => {
  if (gameOver) return; // Don't allow move if the game is over

  const id = e.target.id;
  const index = id - 1; // Convert to 0-based index

  // Player move
  if (boardState[index] === "") {
    boardState[index] = turn;
    e.target.textContent = turn;
    e.target.disabled = true;

    if (checkWinner()) return; // Check for winner after player's move

    turn = "O"; // Switch to AI
    setTimeout(() => {
      let aiIndex = aiMove(); // AI makes its move
      boardState[aiIndex] = "O";
      document.getElementById(aiIndex + 1).textContent = "O";
      document.getElementById(aiIndex + 1).disabled = true;
      if (checkWinner()) return; // Check for winner after AI's move
      turn = "X"; // Switch back to player
    }, 500); // AI moves after a small delay
  }
});

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