// This file contains the logic for validating and executing moves in the chess game.

const pieces = {
    'P': { name: 'Pawn', direction: 1, initialPosition: [1, 6], move: (x, y) => [[x, y + 1], [x, y + 2]], capture: (x, y) => [[x - 1, y + 1], [x + 1, y + 1]] },
    'R': { name: 'Rook', direction: 1, move: (x, y) => generateLinearMoves(x, y, 1, 0).concat(generateLinearMoves(x, y, 0, 1)) },
    'N': { name: 'Knight', move: (x, y) => [[x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2], [x - 1, y - 2], [x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1], [x - 2, y - 1]] },
    'B': { name: 'Bishop', move: (x, y) => generateLinearMoves(x, y, 1, 1).concat(generateLinearMoves(x, y, 1, -1)).concat(generateLinearMoves(x, y, -1, 1)).concat(generateLinearMoves(x, y, -1, -1)) },
    'Q': { name: 'Queen', move: (x, y) => generateLinearMoves(x, y, 1, 0).concat(generateLinearMoves(x, y, 0, 1)).concat(generateLinearMoves(x, y, 1, 1)).concat(generateLinearMoves(x, y, 1, -1)).concat(generateLinearMoves(x, y, -1, 1)).concat(generateLinearMoves(x, y, -1, -1)) },
    'K': { name: 'King', move: (x, y) => [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x + 1, y + 1], [x + 1, y - 1], [x - 1, y + 1], [x - 1, y - 1]] }
};

function generateLinearMoves(x, y, dx, dy) {
    const moves = [];
    for (let i = 1; i < 8; i++) {
        const newX = x + dx * i;
        const newY = y + dy * i;
        if (isInBounds(newX, newY)) {
            moves.push([newX, newY]);
        } else {
            break;
        }
    }
    return moves;
}

function isInBounds(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function isMoveLegal(piece, from, to, board) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    // Check if the destination square is occupied by a piece of the same color
    if (board[toY][toX] && board[toY][toX].color === board[fromY][fromX].color) {
        return false;
    }

    // Validate the move based on the piece type
    const validMoves = piece.move(fromX, fromY);
    return validMoves.some(move => move[0] === toX && move[1] === toY);
}

function executeMove(from, to, board) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    if (isMoveLegal(board[fromY][fromX], from, to, board)) {
        board[toY][toX] = board[fromY][fromX];
        board[fromY][fromX] = null; // Clear the original square
        return true;
    }
    return false;
}