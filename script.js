//
function GameBoard(){
    let board=[];
    const n=3;
    for(let i=0; i<n; i++)
    {
        board[i]=[];
        for(let j=0; j<n; j++)
        {
            board[i].push(Player());
        }
    }

    const getBoard= () => (board);

    const printBoard= () => {
        console.log(board);
    }

    const markMove= (symbol, playerID, moveRow, moveCol) => {
        //let's just work on controller first
        const position=board[moveRow][moveCol];
        position.symbol=symbol;
        position.setPlayer(playerID);
    };

    const checkWin= (currentPlayer) => {
        let winner=" ";
        //checking for rows
        for(let row=0; row<n; row++)
        {
            if(
                board[row][0].symbol === board[row][1].symbol &&
                board[row][1].symbol === board[row][2].symbol &&
                board[row][0].symbol!= " "
            ){
                winner= currentPlayer;
            }
        }
        
        //checking for columns
        for(let col=0; col<n; col++)
        {
            if(
                board[0][col].symbol === board[1][col].symbol&&
                board[1][col].symbol=== board[2][col].symbol &&
                board[0][col].symbol != " "
            ){
                winner= currentPlayer;
            }
        }

        return winner;
    };

    return {getBoard, printBoard, markMove, checkWin};
}

function Player(){
    //default player is noone, 1- p1's move and 2- p2's move.
    let value=0;
    
    const setPlayer= (playerID) => {
        value= playerID;
    }

    const symbol= (value) => {
        if(value === 0){
            return " ";
        }
        else if(value === 1) return "o";
        else return "x";
    }
    return {value, symbol, setPlayer};
}

function GameController(){
    const board= GameBoard();

    const playerList=[
        {
            name: "player 1",
            playerID: 1,
        }, 
        {
            name: "player 2",
            playerID: 2,
        }
    ]

    let currentPlayer=playerList[0];

    const swapPlayer= () =>{
        currentPlayer = (currentPlayer === playerList[0]) ?
        (playerList[1]) : (playerList[0]);
    }

    let moveRow=1, moveCol=2;

    board.markMove("x", currentPlayer, moveRow, moveCol);
    board.printBoard();
    console.log(board.checkWin(currentPlayer));
    swapPlayer();
    board.markMove("o", currentPlayer, 0, 0);
    board.printBoard();
    console.log(board.checkWin(currentPlayer));
    swapPlayer();
    board.markMove("x", currentPlayer, 0, 2);
    board.printBoard();
    console.log(board.checkWin(currentPlayer));
    swapPlayer();
    board.markMove("o", currentPlayer, 2, 0);
    board.printBoard();
    console.log(board.checkWin(currentPlayer));
    swapPlayer();
    board.markMove("x", currentPlayer, 2, 2);
    board.printBoard();
    console.log(board.checkWin(currentPlayer));
    swapPlayer();
    
    
    
}

const game=GameController();