const pieces = {
    white:{
        king: "chess-website/src/assets/pieces-basic-svg/White/king-w.svg",
        queen: "chess-website/src/assets/pieces-basic-svg/White/queen-w.svg",
        rook: "chess-website/src/assets/pieces-basic-svg/White/rook-w.svg",
        bishop: "chess-website/src/assets/pieces-basic-svg/White/bishop-w.svg",
        knight: "chess-website/src/assets/pieces-basic-svg/White/knight-w.svg",
        pawn: "chess-website/src/assets/pieces-basic-svg/White/pawn-w.svg"
    }
    ,black:{
        king: "chess-website/src/assets/pieces-basic-svg/Black/king-b.svg",
        queen: "chess-website/src/assets/pieces-basic-svg/Black/queen-b.svg",
        rook: "chess-website/src/assets/pieces-basic-svg/Black/rook-b.svg",
        bishop: "chess-website/src/assets/pieces-basic-svg/Black/bishop-b.svg",
        knight: "chess-website/src/assets/pieces-basic-svg/Black/knight-b.svg",
        pawn: "chess-website/src/assets/pieces-basic-svg/Black/pawn-b.svg"
    }
};

const Board_Setup = [
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
let SS = null;
const representation = {
    'K': 'king',
    'Q': 'queen',
    'R': 'rook',
    'B': 'bishop',
    'N': 'knight',
    'P': 'pawn'
}
const movehistory = [];

const cLetters = ['a','b','c','d','e','f','g','h'];

const restartBtn = document.querySelector(".resetbtn")

const movehistoryContainer = document.querySelector(".moves-container");

function getpiececor(pieceCode){
    return pieceCode[0] ==='w' ? 'white' : 'black';
}

function getPieceImage(pieceCode) {
    const cor = pieceCode[0] === 'w' ? 'white' : 'black';

    const type = representation[pieceCode[1]]

    return pieces[cor][type];
}

function startBoard(){
    for(let r=0;r<8;r++){
        board[r] = [];
        for(let c=0;c<8;c++){
            board[r][c] = Board_Setup[r][c];        
        }
    }
}

function render(){
    const boardContainer = document.querySelector(".board")
    
    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
            let square = document.createElement("div")
            square.className = "square"

            let img = document.createElement("img")
            square.append(img)
            
            if((r+c)%2 ===0){
                square.className = 'square light'
            }
            else{
                square.className = 'square dark'
            }

            square.dataset.r = r;
            square.dataset.c = c;

            const piece = board[r][c];
            if(piece){
                img.src = getPieceImage(piece)
            }

            square.addEventListener('click', highlightSquareDot)
            boardContainer.appendChild(square);
        }
    }
}

function getValidMoves(r,c,piece){
    const piececode = board[r][c];
    const piececor = getpiececor(piece);
    const moves = [];
    switch(piececode[1]){

        case 'P': {
            const direction = piececor === 'white' ? -1 : 1;
            const startr = piececor === 'white' ? 6 : 1;
            const nextr = r + direction;

            if (nextr >= 0 && nextr < 8 && !board[nextr][c]) {
                moves.push([nextr, c]);

                if (r === startr && !board[r + 2 * direction][c]) {
                    moves.push([r + 2 * direction, c]);
                }
            }

            for (const dc of [-1, 1]) {
                const capturec = c + dc;
                if (capturec >= 0 && capturec < 8 && nextr >= 0 && nextr < 8) {
                    const target = board[nextr][capturec];
                    if (target && getpiececor(target) !== piececor) {
                        moves.push([nextr, capturec]);
                    }
                }
            }
            break;
        }
        case 'R':{
            const Rdirections = [[1,0],[-1,0],[0,1],[0,-1]];
            for(const [dx,dy] of Rdirections){
                let newR = r + dx;
                let newC = c + dy;
                while(newR >=0 && newR<8 && newC>=0 && newC<8){
                    if(!board[newR][newC]){
                        moves.push([newR,newC]);
                    }
                    else{
                        if(getpiececor(board[newR][newC]) !== piececor){
                            moves.push([newR,newC]);
                        }
                        break;
                    }
                    newR+=dx;
                    newC+=dy;
                }
            }
            break;
        }
        case 'N':{
            const Ndirection = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
            for(const [dx,dy] of Ndirection){
                let newR = r + dx;
                let newC = c + dy;
            
                if(newR >=0 && newR<8 && newC>=0 && newC<8){
                    if(!board[newR][newC]){
                        moves.push([newR,newC]);
                    }   
                    else{
                        if(getpiececor(board[newR][newC]) !== piececor){
                            moves.push([newR,newC]);
                        }
                    }
                }
            }
            break;
        }
        case 'B':{
            const Bdirections = [[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const [dx,dy] of Bdirections){
                let newR = r + dx;
                let newC = c + dy;
                while(newR >=0 && newR<8 && newC>=0 && newC<8){
                    if(!board[newR][newC]){
                        moves.push([newR,newC]);
                    }
                    else{
                        if(getpiececor(board[newR][newC]) !== piececor){
                            moves.push([newR,newC]);
                        }
                        break;
                    }
                    newR+=dx;
                    newC+=dy;
                }
            }
            break;
         }
        case 'Q':{
            const Qdirections = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const [dx,dy] of Qdirections){
                let newR = r+dx;
                let newC = c+dy;
                while(newR >=0 && newR<8 && newC>=0 && newC<8){
                    if(!board[newR][newC]){
                        moves.push([newR,newC]);
                    }
                    else{
                        if(getpiececor(board[newR][newC]) !== piececor){
                            moves.push([newR,newC]);
                        }
                        break;
                    }
                    newR+=dx;
                    newC+=dy;
            }
        }
        break;
        }
        case 'K':{
            const Kdirections = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
            for(const[dx,dy] of Kdirections){
                const newR = r+dx;
                const newC = c+dy;
                if(newR>=0 &&newR<8 && newC>=0 && newC<8){
                    if(!board[newR][newC]){
                        moves.push([newR,newC]);
                    }
                    else{
                        if(getpiececor(board[newR][newC]) !== piececor){
                            moves.push([newR,newC]);
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
        square.classList.remove("selected",'valid-move')
    })
}

function kingInCheck(cor){
    let kingr = null;
    let kingc = null;
        for(let r = 0;r<8;r++){
            for(let c= 0;c<8;c++){
                const piece = board[r][c];
                if(piece && piece[1]==='K' && getpiececor(piece)===cor){
                    kingr = r;
                    kingc = c;
                    break;
                }
            }
        }
        
        for(let r = 0;r<8;r++){
            for(let c = 0;c <8;c++){
                const piece = board[r][c];
                if(piece && getpiececor(piece)!==cor){
                    const moves = getValidMoves(r,c,piece)
                    if(moves.some(([moveR,moveC])=>moveR===kingr && moveC===kingc)){
                        return true;
                    }
                }
            }
        }
        return false;
}

function updateBoard(){
    for(let r = 0; r<8;r++){
        for(let c = 0;c<8;c++){
            const square = document.querySelector(`[data-r="${r}"][data-c="${c}"]`)
            const img =square.querySelector("img");
            const piece = board[r][c]
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

function movePiece(fr,fc,tr,tc,length){
    const movingPiece = board[fr][fc]
    const targetPiece = board[tr][tc]

    board[tr][tc] = board[fr][fc];
    board[fr][fc] = null;

    if(kingInCheck(currentTurn)){
            board[fr][fc]=movingPiece
            board[tr][tc]=targetPiece
            alert(currentTurn+" King is in Check")
            return;
        }

    movehistory.push(`${cLetters[fc]}${8-fr}`);
    movehistory.push(`${cLetters[tc]}${8-tr}`);
    
    let div = document.createElement('div')
    div.className = 'move-entry'
    movehistoryContainer.append(div)
    let a = document.createElement('p')
    div.append(a)
    a.innerHTML = movehistory[length]
    let b = document.createElement('p')
    div.append(b)
    b.innerHTML = ' to '
    let c = document.createElement('p')
    div.append(c)
    c.innerHTML = movehistory[length + 1]

    currentTurn = currentTurn ==='white'? "black":"white";

    const turnIndicator = document.getElementById("turn-indicator");
    turnIndicator.textContent = currentTurn + " turn";
    updateBoard()

    if(kingInCheck(currentTurn)){
        if(isCheckmate(currentTurn)){
            alert("CHECKMATE! "+ (currentTurn ==='white' ? "BLACK":"WHITE") + " wins!");
            restartBtn.style.display = 'block'
            restartBtn.addEventListener('click',restart)
            return
        }
        else{
            alert(currentTurn+" King is in Check")
        }
    }

}

function isCheckmate(cor){
    for(let r = 0;r<8;r++){
        for(let c = 0;c<8;c++){
            const piece = board[r][c]

            if(piece && getpiececor(piece)=== cor){
                let validMoves = getValidMoves(r,c,piece)

                for(let i = 0; i < validMoves.length; i++){
                    const move = validMoves[i]
                    const tr = move[0];
                    const tc = move[1];
        
                    const savePiece = board[tr][tc]
        
                    board[tr][tc] = board[r][c]
                    board[r][c] = null;

                    const stillInCheck = kingInCheck(cor);

                    board[r][c] = board[tr][tc];
                    board[tr][tc] = savePiece

                    if(!stillInCheck){
                        return false
                    }
                }
            } 
        }
        
    }
    return true;
}

function highlightSquareDot(event){
    const square = event.currentTarget

    const r = Number(square.dataset.r)
    const c = Number(square.dataset.c)

    const piece = board[r][c]

    clearHighlightSquares()

    if(SS){
        const moves = getValidMoves(SS.r,SS.c,board[SS.r][SS.c])

        const isValidMoves = moves.some(([moveR,moveC])=> moveR===r && moveC===c)

        if(isValidMoves){
            movePiece(SS.r,SS.c,r,c,movehistory.length)
            SS = null
            return;
        }
    }

    if(!piece){
        SS = null
        return
    }

    const piececor = getpiececor(piece);

    if(piececor !== currentTurn){
        SS =null
        return
    }

    square.classList.add("selected")
    SS = {r,c}

    const moves = getValidMoves(r,c,piece)
    moves.forEach(([moveR,moveC])=>{
        const targetSquare = document.querySelector(`[data-r="${moveR}"][data-c="${moveC}"]`)
        if(targetSquare){
            targetSquare.classList.add('valid-move')
        }
    })
}

function restart(){
    board = []
    currentTurn = "white"
    SS= null;

    const boardContainer = document.querySelector(".board")
    boardContainer.innerHTML = '';
    movehistoryContainer.innerHTML = ''
    
    const turnIndicator = document.getElementById("turn-indicator")
    turnIndicator.textContent = "white turn"
    
    startBoard()
    render()
    
    restartBtn.style.display = 'none'

}

document.addEventListener('DOMContentLoaded', function() {
    startBoard();
    render()
    restartBtn.addEventListener('click', restart);
});
