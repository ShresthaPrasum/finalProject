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
    const piececode = board[row][col];
    const piececolor = getpiececolor(piece);
    const moves = [];
    switch(piececode[1]){

        case 'P': {
            const direction = piececolor === 'white' ? -1 : 1;
            const startRow = piececolor === 'white' ? 6 : 1;
            const nextRow = row + direction;

            // Single move forward
            if (nextRow >= 0 && nextRow < 8 && !board[nextRow][col]) {
                moves.push([nextRow, col]);

                // Double move from starting position
                if (row === startRow && !board[row + 2 * direction][col]) {
                    moves.push([row + 2 * direction, col]);
                }
            }

            // Diagonal captures
            for (const dc of [-1, 1]) {
                const captureCol = col + dc;
                if (captureCol >= 0 && captureCol < 8 && nextRow >= 0 && nextRow < 8) {
                    const target = board[nextRow][captureCol];
                    if (target && getpiececolor(target) !== piececolor) {
                        moves.push([nextRow, captureCol]);
                    }
                }
            }
            break;
        }
        case 'R':{

        
            const Rdirections = [[1,0],[-1,0],[0,1],[0,-1]];
            for(const [dx,dy] of Rdirections){
                let r = row + dx;
                let c = col + dy;
                while(r >=0 && r<8 && c>=0 && c<8){
                    if(!board[r][c]){
                        moves.push([r,c]);
                    }
                    else{
                        if(getpiececolor(board[r][c]) !== piececolor){
                            moves.push([r,c]);
                        }
                        break;
                    }
                    r+=dx;
                    c+=dy;
                }
            }
            break;
        }
        case 'N':{

        
            const Ndirection = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
            for(const [dx,dy] of Ndirection){
                let r = row + dx;
                let c = col + dy;
            
                if(r >=0 && r<8 && c>=0 && c<8){
                    if(!board[r][c]){
                        moves.push([r,c]);

                    }   
                    else{
                        if(getpiececolor(board[r][c]) !== piececolor){
                            moves.push([r,c]);
                        }
                    }
                }
            }
            break;
        }
        case 'B':{

       
            const Bdirections = [[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const [dx,dy] of Bdirections){
                let r = row + dx;
                let c = col + dy;
                while(r >=0 && r<8 && c>=0 && c<8){
                    if(!board[r][c]){
                        moves.push([r,c]);
                    }
                    else{
                        if(getpiececolor(board[r][c]) !== piececolor){
                            moves.push([r,c]);
                        }
                        break;
                    }
                    r+=dx;
                    c+=dy;
                }
            }
            break;
         }
        case 'Q':{

       
            const Qdirections = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const [dx,dy] of Qdirections){
                let r = row+dx;
                let c =col+dy;
                while(r >=0 && r<8 && c>=0 && c<8){
                    if(!board[r][c]){
                        moves.push([r,c]);
                    }
                    else{
                        if(getpiececolor(board[r][c]) !== piececolor){
                            moves.push([r,c]);
                        }
                        break;
                    }
                    r+=dx;
                    c+=dy;
            }
        }
        break;
        }
        case 'K':{
            const Kdirections = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const[dx,dy] of Kdirections){
                const r = row+dx;
                const c = col+dy;
                if(r>=0 &&r<8 && c>=0 && c<8){
                    if(!board[r][c]){
                        moves.push([r,c]);
                    }
                    else{
                        if(getpiececolor(board[r][c]) !== piececolor){
                            moves.push([r,c]);
                        }
                    }
                }
            }
            break;
        }


 
    }
    return moves;
}

function clearHighlightSquares(){
    document.querySelectorAll(".square").forEach(square=>{
        square.classList.remove("selected",'valid-moves')
    })
}

function movePiece(fr,fc,tr,tc){
    board[tr][tc] = board[fr][fc];
    board[fr][fc] = null;

    currentTurn = currentTurn ==='white'? "black":"white";

    updateBoard();

}

function updateBoard(){
    for(let row = 0; row<8;row++){
        for(let col = 0;col<8;col++){
            const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
            const img =square.querySelector("img");
            const piece = board[row][col]
            if(piece){
                img.src = getPieceImage(piece);
            }
            else{
                img.src = "";
            }
        }
    }
    clearHighlightSquares();
}

function highlightSquareDot(event){
    const square = event.currentTarget;

    const row = Number(square.dataset.row);
    const col = Number(square.dataset.col);

    const piece = board[row][col]

    clearHighlightSquares();

    if(selectedSquare){
        const moves = getValidMoves(selectedSquare.row,selectedSquare.col,board[selectedSquare.row][selectedSquare.col])
    
        const isValidMoves = moves.some(([r,c])=> r===row && c===col);

        if(isValidMoves){
            movePiece(selectedSquare.row,selectedSquare.col,row,col);
            selectedSquare = null;
            return;
        }
    }

    if(!piece){
        return;
    }

    const piececolor = getpiececolor(piece);

    if(piececolor !== currentTurn){
        selectedSquare =null;
        return;
    }

    square.classList.add("selected")
    selectedSquare = {row,col};

    const moves = getValidMoves(row,col,piece);
    moves.forEach(([r,c])=>{
        const targetSquare = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        if(targetSquare){
            targetSquare.classList.add('valid-moves')
        }
    })
    

    // }
}





initBoard()
render();
