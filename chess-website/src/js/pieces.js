const pieces = {
  pawn: {
    name: 'Pawn',
    value: 1,
    image: 'assets/pieces/pawn.svg',
    moves: function(position) {
      // Logic for pawn movement
      // Pawns move forward one square, but capture diagonally
    }
  },
  rook: {
    name: 'Rook',
    value: 5,
    image: 'assets/pieces/rook.svg',
    moves: function(position) {
      // Logic for rook movement
      // Rooks move horizontally or vertically any number of squares
    }
  },
  knight: {
    name: 'Knight',
    value: 3,
    image: 'assets/pieces/knight.svg',
    moves: function(position) {
      // Logic for knight movement
      // Knights move in an L-shape: two squares in one direction and then one square perpendicular
    }
  },
  bishop: {
    name: 'Bishop',
    value: 3,
    image: 'assets/pieces/bishop.svg',
    moves: function(position) {
      // Logic for bishop movement
      // Bishops move diagonally any number of squares
    }
  },
  queen: {
    name: 'Queen',
    value: 9,
    image: 'assets/pieces/queen.svg',
    moves: function(position) {
      // Logic for queen movement
      // Queens move horizontally, vertically, or diagonally any number of squares
    }
  },
  king: {
    name: 'King',
    value: 0,
    image: 'assets/pieces/king.svg',
    moves: function(position) {
      // Logic for king movement
      // Kings move one square in any direction
    }
  }
};

export default pieces;