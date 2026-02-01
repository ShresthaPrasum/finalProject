// This file serves as the entry point for the JavaScript code. 
// It initializes the chess game, sets up event listeners, and manages the overall game flow.

document.addEventListener('DOMContentLoaded', () => {
    const board = new Board();
    const game = new Game();

    const renderBoard = () => {
        board.render();
    };

    const updateGameStatus = () => {
        const status = document.getElementById('game-status');
        status.innerText = game.getStatus();
    };

    const handleSquareClick = (square) => {
        const move = game.makeMove(square);
        if (move) {
            renderBoard();
            updateGameStatus();
        }
    };

    const setupEventListeners = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', () => handleSquareClick(square));
        });
    };

    const init = () => {
        renderBoard();
        updateGameStatus();
        setupEventListeners();
    };

    init();
});