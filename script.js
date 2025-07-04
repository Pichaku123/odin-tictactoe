//3 main objects here, GameBoard, Cell, and GamePlay
function GameBoard(){
    const board=[];
    const n=3;
    for(let i=0; i<n; i++)
    {
        board[i]=[];
        for(let j=0; j<n; j++)
        {
            board[i].push("x");
        }
    }
    
    const printBoard= (board) => {
        board.forEach(cell => {
            console.log(cell);
        })
    };
    return {board, printBoard};
} 
const play=GameBoard();
console.log(play.board)