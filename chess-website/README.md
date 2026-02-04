# Chess Website

## Overview
A web-based interactive chess game built with vanilla JavaScript, HTML, and CSS. This project provides a fully functional chess experience with support for two-player gameplay, complete chess rule validation, and beautiful SVG-based chess piece graphics.

## Features
- ♟️ **Full Chess Rule Implementation** - Complete move validation including special moves

- 🎮 **Two-Player Mode** - Play against a friend on the same device

- 🎨 **Professional Graphics** - SVG-based chess pieces for clear, scalable rendering

- 📱 **Responsive Design** - Works seamlessly on desktop and tablet devices

- ♻️ **Game Reset** - Quick restart button to begin a new game

- 📝 **Move History** - Track all moves made during the game

## Project Structure
```
chess-website/
├── src/
│   ├── index.html                 # Main HTML document
│   ├── css/
│   │   └── styles.css            # Stylesheet for the chess board and UI
│   ├── js/
│   │   └── board.js              # Core game logic and board management
│   └── assets/
│       └── pieces-basic-svg/
│           ├── Black/            # Black piece SVG files
│           └── White/            # White piece SVG files
├── package.json                   # Project metadata and dependencies
└── README.md                      # This file
```

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Node.js and npm (optional, for running a local development server)

### Quick Start
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd chess-website
   ```

2. **Install dependencies (optional):**
   ```bash
   npm install
   ```

3. **Run the application:**

   - **Option 1:** https://sigma-chess.netlify.app/
     

## How to Play

### Basic Rules
1. **Starting Position** - The board begins in the standard chess setup with white pieces on the bottom and black pieces on the top
2. **Turn-Based Gameplay** - White always moves first, then players alternate
3. **Moving Pieces** - Click on a piece to select it, then click on a highlighted valid square to move it
4. **Piece Movements:**
   - **Pawn** - Moves forward one square (or two squares on first move)
   - **Rook** - Moves any number of squares horizontally or vertically
   - **Knight** - Moves in an L-shape (2 squares in one direction, 1 square perpendicular)
   - **Bishop** - Moves any number of squares diagonally
   - **Queen** - Moves any number of squares horizontally, vertically, or diagonally
   - **King** - Moves one square in any direction

### Special Moves
- **Castling** - Move your king and rook together under specific conditions
- **En Passant** - Capture an opponent's pawn that has just moved two squares forward
- **Pawn Promotion** - When a pawn reaches the opposite end of the board

### Game Controls
- **Reset Game** - Click the "Reset" button to start a new game at any time
- **Move History** - View all previous moves in the game history panel

## Game Architecture

### board.js
The main game engine handling:
- Board state management using a 2D array
- Piece positioning and movement validation
- Turn management
- Move history tracking
- SVG rendering of pieces
- User interaction handling

### Key Components
- **INITIAL_SETUP** - Standard chess starting position
- **pieces** - Object mapping piece types to their SVG asset paths
- **board** - Current game state (8x8 array of pieces)
- **currentTurn** - Tracks whose turn it is (white/black)
- **moveHistory** - Array of all moves made in the game

## Technologies Used
- **HTML5** - Semantic markup for game interface
- **CSS3** - Responsive styling and layout
- **JavaScript (ES6+)** - Pure vanilla JS, no frameworks
- **SVG** - Vector graphics for chess pieces

## Browser Support
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- AI opponent with difficulty levels
- Online multiplayer support
- Game analysis and notation (PGN format)
- Undo/redo moves functionality
- Timer for timed games
- Game saving and loading

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request


## Author
Prasum Shrestha

## Support
For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

Enjoy playing chess! ♟️♚
- The game will notify you of check, checkmate, or stalemate conditions.

## Future Enhancements
- Implement an AI opponent with varying difficulty levels.
- Add user authentication for online play.
- Create a leaderboard to track player scores.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.