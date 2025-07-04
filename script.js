//3 main objects here, GameBoard, Cell, and GamePlay
function GameBoard(){
    const board=[];
    const n=3;
    
    const getBoard= () => {     //uses closure to print the board
        console.log(board);
        return board;
    }; 

    for(let i=0; i<n; i++)
    {
        board[i]=[];
        for(let j=0; j<n; j++)
        {
            board[i].push(Cell());
        }
    }
    
    const printBoard= (board) => {
        board.forEach(cell => {
            console.log(cell);
        })
    };

    const playMove=() => {
        
    }

    return {getBoard, printBoard, playMove};
} 

//cell can have 3 values, 0 mean empty, 1 means p1, 2 means p2.
//it has properties like player, move
function Cell(){
    const player=0;
    const move="";
    return {player, move};
}


function GamePlay(){
    const board=GameBoard();
    const p1="player 1";
    const p2="player 2";

    const players=[
        {
            name : playerOne,
            player : 1,
        },
        {
            name: playerTwo,
            player: 2,
        }
    ]

    let currentPlayer=players[0];

    const swapPlayer= () =>{
        currentPlayer=(currentPlayer === players[0]) ?
        (players[1]) : (players[0]);
    }

    
    
    
} 

const play=GameBoard();
play.getBoard();