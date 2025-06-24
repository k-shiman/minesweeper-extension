document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("easyBtn").addEventListener("click", () => startGame(9, 9, 10));
    document.getElementById("mediumBtn").addEventListener("click", () => startGame(16, 16, 40));
    document.getElementById("hardBtn").addEventListener("click", () => startGame(16, 30, 99));
    document.getElementById("smiley").addEventListener("click", restartGame);
  
    startGame(9, 9, 10); // запускаем игру по умолчанию
  });
  
let rows, cols, mines;
let board = [];
let started = false;
let timer = 0;
let interval;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button[data-diff]').forEach(btn => {
    btn.addEventListener('click', () => {
      const diff = btn.dataset.diff;
      if (diff === 'easy') startGame(9, 9, 10);
      if (diff === 'medium') startGame(16, 16, 40);
      if (diff === 'hard') startGame(16, 30, 99);
    });
  });

  document.getElementById('smiley').addEventListener('click', () => restartGame());

  startGame(9, 9, 10);
});

function startGame(r, c, m) {
  rows = r;
  cols = c;
  mines = m;
  timer = 0;
  document.getElementById("message").textContent = "";
  document.getElementById('timer').textContent = '0';
  document.getElementById('bombCount').textContent = mines;
  clearInterval(interval);
  started = false;
  createBoard();
}

function restartGame() {
  startGame(rows, cols, mines);
}

function createBoard() {
  board = [];
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  boardDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  boardDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let y = 0; y < rows; y++) {
    board[y] = [];
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.oncontextmenu = (e) => {
        e.preventDefault();
        toggleFlag(x, y);
      };
      cell.onclick = () => revealCell(x, y);
      boardDiv.appendChild(cell);
      board[y][x] = {
        el: cell,
        mine: false,
        flagged: false,
        revealed: false,
        adjacent: 0
      };
    }
  }
}

function placeMines(ex, ey) {
  let placed = 0;
  while (placed < mines) {
    let x = Math.floor(Math.random() * cols);
    let y = Math.floor(Math.random() * rows);
    if ((x === ex && y === ey) || board[y][x].mine) continue;
    board[y][x].mine = true;
    placed++;
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x].mine) continue;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          let nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && board[ny][nx].mine) count++;
        }
      }
      board[y][x].adjacent = count;
    }
  }
}

function revealCell(x, y) {
  if (!started) {
    placeMines(x, y);
    started = true;
    interval = setInterval(() => {
      timer++;
      document.getElementById('timer').textContent = timer;
    }, 1000);
  }
  const cell = board[y][x];
  if (cell.revealed || cell.flagged) return;
  cell.revealed = true;
  cell.el.classList.add('revealed');

  if (cell.mine) {
    cell.el.classList.add('mine');
    cell.el.textContent = 'X';
    gameOver(false);
    return;
  }

  if (cell.adjacent > 0) {
    cell.el.style.color = getColor(cell.adjacent);
    cell.el.textContent = cell.adjacent;
  } else {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        let nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          if (!board[ny][nx].revealed) revealCell(nx, ny);
        }
      }
    }
  }
  checkWin();
}

function toggleFlag(x, y) {
  const cell = board[y][x];
  if (cell.revealed) return;
  cell.flagged = !cell.flagged;
  cell.el.classList.toggle('flag');
  document.getElementById('bombCount').textContent = mines - countFlags();
  checkWin();
}

function countFlags() {
  return board.flat().filter(cell => cell.flagged).length;
}

function checkWin() {
  const allCells = board.flat();
  const allSafeRevealed = allCells.every(cell =>
    (cell.mine && cell.flagged) || (!cell.mine && cell.revealed)
  );
  if (allSafeRevealed) gameOver(true);
}

function gameOver(win) {
    clearInterval(interval);
    board.flat().forEach(cell => {
      if (cell.mine && !cell.flagged) {
        cell.el.textContent = 'X';
        cell.el.classList.add('mine');
      }
    });
  
    const msg = document.getElementById("message");
    msg.textContent = win ? "🎉 You Win!" : "💥 Game Over!";
  }
  

function getColor(num) {
  return [null, 'blue', 'green', 'red', 'navy', 'maroon', 'turquoise', 'black', 'gray'][num];
}
