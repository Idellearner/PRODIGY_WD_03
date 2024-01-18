let currentPlayer = 'X';
let gameActive = false;
const board = document.getElementById('board');
const message = document.getElementById('message');

const cells = Array.from({ length: 9 });

function startGame() {
  cells.forEach((cell, index) => {
    cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;
    cell.addEventListener('click', cellClicked);
    board.appendChild(cell);
    cells[index] = cell;
  });

  message.innerText = `Player ${currentPlayer}'s turn`;
  gameActive = true;
}

function cellClicked(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.id);

  if (cells[cellIndex].innerText !== '' || !gameActive) return;

  cells[cellIndex].innerText = currentPlayer;
  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.innerText = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      cells[a].innerText !== '' &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      message.innerText = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }

  if (cells.every((cell) => cell.innerText !== '')) {
    message.innerText = 'It\'s a tie!';
    gameActive = false;
    return;
  }
}
