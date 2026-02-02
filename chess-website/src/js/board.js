const pieces = {
    white:{
        king: "assets/pieces-basic-svg/White/king-w.svg",
        queen: "assets/pieces-basic-svg/White/queen-w.svg",
        rook: "assets/pieces-basic-svg/White/rook-w.svg",
        bishop: "assets/pieces-basic-svg/White/bishop-w.svg",
        knight: "assets/pieces-basic-svg/White/knight-w.svg",
        pawn: "assets/pieces-basic-svg/White/pawn-w.svg"
    }
    ,black:{
        king: "assets/pieces-basic-svg/Black/king-b.svg",
        queen: "assets/pieces-basic-svg/Black/queen-b.svg",
        rook: "assets/pieces-basic-svg/Black/rook-b.svg",
        bishop: "assets/pieces-basic-svg/Black/bishop-b.svg",
        knight: "assets/pieces-basic-svg/Black/knight-b.svg",
        pawn: "assets/pieces-basic-svg/Black/pawn-b.svg"
    }
};

const INITIAL_SETUP = [
      ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
      ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
      ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
    ];

let board = [];
let currentTurn = "white";
let selectedSquare = null;
const Map = {
    'K': 'king',
    'Q': 'queen',
    'R': 'rook',
    'B': 'bishop',
    'N': 'knight',
    'P': 'pawn'
}

function getpiececolor(pieceCode){
    return pieceCode[0] ==='w' ? 'white' : 'black';
}

function getPieceImage(pieceCode) {
    const color = pieceCode[0] === 'w' ? 'white' : 'black';

    const type = Map[pieceCode[1]]

    return pieces[color][type];
}

function initBoard(){
    for(let row=0;row<8;row++){
        board[row] = [];
        for(let col=0;col<8;col++){
            board[row][col] = INITIAL_SETUP[row][col];        
        }
    }
}

function render(){
    const boardContainer = document.querySelector(".board")
    
    for(let row=0;row<8;row++){
        for(let col=0;col<8;col++){
            let square = document.createElement("div")
            square.className = "square"

            let img = document.createElement("img")
            square.append(img)
            
            if((row+col)%2 ===0){
                square.className = 'square light'
            }
            else{
                square.className = 'square dark'
            }

            square.dataset.row = row;
            square.dataset.col = col;

            const piece = board[row][col];
            if(piece){
                img.src = getPieceImage(piece)
            }

            square.addEventListener('click', highlightSquareDot)
            boardContainer.appendChild(square);
        }
    }
}

function getValidMoves(row,col,piece){
    const pieces = board[row][col];
    const piececolor = getpiececolor(piece);
    const moves = [];
    switch(pieces[1]){
        case 'P':
            if(piececolor === 'white' && row === 6){
                if(!board[row-1][col] && !board[row-2][col]){
                    moves.push([row-2,col]);
                }
            }
            else if(piececolor === 'black' && row ===1){
                if(!board[row+1][col] && !board[row+2][col]){
                    moves.push([row+2,col]);
                }
            }
            else{
                const Rdirection = piececolor === 'white' ? -1 : 1;
                const nextRow = row + Rdirection;
                if(nextRow >=0 && nextRow <8 && !board[nextRow][col]){
                moves.push([nextRow,col]);
                
            }
            break
        }
        case 'R':
            const Rdirections = [[1,0],[-1,0],[0,1],[0,-1]];
            for(const [dx,dy] of Rdirections){
                let r = row + dx;
                let c = col + dy;
                while(r >=0 && r<8 && c>=0 && c<8){
                    moves.push([r,c]);
                }
            break
        }
        case 'N':
            const Ndirection = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
            for(const [dx,dy] of Ndirection){
                const r = row + dx;
                const c = col + dy;
                if(r >=0 && r<8 && c>=0 && c<8){
                    moves.push([r,c]);
                }
            break
        }
        case 'B':
            const Bdirections = [[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const [dx,dy] of Bdirections){
                let r = row + dx;
                let c = col + dy;
                if(r >=0 && r<8 && c>=0 && c<8){
                    moves.push([r,c]);
                }
            break
        }


 
    }
    console.log(moves)
}

function highlightSquareDot(event){
    const square = event.currentTarget;

    const row = Number(square.dataset.row);
    const col = Number(square.dataset.col);

    const piece = board[row][col]

    const piececolor = getpiececolor(piece);

    if(piececolor === currentTurn){
        getValidMoves(row,col,piece)

    }
}


function handleClick(row,col){
    const piece = board[row][col];
    const piececolor = getpiececolor(piece);
}




initBoard()
render();
