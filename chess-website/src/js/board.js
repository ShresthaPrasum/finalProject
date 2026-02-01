const boardSize = 8;
const boardElement = document.getElementById('chessboard');

function createBoard() {
    for (let row = 0; row < boardSize; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let col = 0; col < boardSize; col++) {
            const squareElement = document.createElement('div');
            squareElement.classList.add('square');
            squareElement.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            squareElement.dataset.position = `${row}-${col}`;
            rowElement.appendChild(squareElement);
        }
        boardElement.appendChild(rowElement);
    }
}

function resetBoard() {
    boardElement.innerHTML = '';
    createBoard();
}

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});