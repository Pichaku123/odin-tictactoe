    //
    function GameBoard(){
        let board=[];
        const n=3;
        for(let i=0; i<n; i++)
        {
            board[i]=[];
            for(let j=0; j<n; j++)
            {
                board[i].push(Cell());  //pushes cell() object in each cell
                //each cell has its own symbol and playerID now.
            }
        }

        const getBoard= () => (board);  //encapsulate board itself

        const printBoard= () => {
            console.log(board);
        }

        const markMove= (symbol, playerID, moveRow, moveCol) => {
            //to mark move on the board itself
            //0 means invalid move, 1 means valid
            const position=board[moveRow][moveCol];
            if(position.getSymbol() != " "){
                console.log("Invalid move, already occupied");
                printBoard();
                return false;   
            }
            //if valid move, use setMove to edit the cell's properties
            position.setMove(symbol, playerID);
            return true;
        };

        //here, 0- unfinished, 1- p1, 2- p2, -1 means tied. 
        const checkWin= (currentPlayer, roundNo) => {
            let winner={
                name: "unfinished",
                playerID: 0,
            };  //winner is an object

            //checking for rows
            for(let row=0; row<n; row++)
            {
                if(
                    board[row][0].getSymbol() === board[row][1].getSymbol() &&
                    board[row][1].getSymbol() === board[row][2].getSymbol() &&
                    board[row][0].getSymbol() != " "
                ){
                    winner= currentPlayer;
                }
            }
            
            //checking for columns
            for(let col=0; col<n; col++)
            {
                if(
                    board[0][col].getSymbol() === board[1][col].getSymbol() &&
                    board[1][col].getSymbol() === board[2][col].getSymbol() &&
                    board[0][col].getSymbol() != " "
                ){
                    winner= currentPlayer;
                }
            }
            //checking for diagonals
            if(
                board[0][0].getSymbol() === board[1][1].getSymbol() && 
                board[1][1].getSymbol() === board[2][2].getSymbol() && 
                board[1][1].getSymbol() != " "
            ){
                winner= currentPlayer;
            }
            if(
                board[0][2].getSymbol() === board[1][1].getSymbol() && 
                board[1][1].getSymbol() === board[2][0].getSymbol() && 
                board[1][1].getSymbol() != " "
            ){
                winner= currentPlayer;
            }
            //all of these were wincons before this
            //checking for tie
            if(roundNo>=9){
                winner= {
                    name: "tied",
                    playerID: -1,
                }
            }

            printBoard();
            return winner;
        };

        return {getBoard, printBoard, markMove, checkWin};
    }

    function Cell(){
        let symbol= " ";
        let playerID= 0;

        const setMove= (currentSymbol, currentPlayerID) => {
            symbol= currentSymbol;
            playerID= currentPlayerID;
        }

        const getSymbol= () => symbol;

        return {playerID, getSymbol, setMove};
    }

    function GameController(){
        const board= GameBoard();
        const maxRounds= 9;

        const playerList=[      //only 2 players, so i'm using array rn
            {
                name: "player 1",
                playerID: 1,
            }, 
            {
                name: "player 2",
                playerID: 2,
            }
        ]

        let currentPlayer=playerList[0];    //p1 by default

        const swapPlayer= () =>{
            currentPlayer = (currentPlayer === playerList[0]) ?
            (playerList[1]) : (playerList[0]);
        }

        // dummy testing data
        // board.markMove("x", currentPlayer, 1, 2);
        // console.log(board.checkWin(currentPlayer));
        // swapPlayer();

        // board.markMove("o", currentPlayer, 0, 0);
        // console.log(board.checkWin(currentPlayer));
        // swapPlayer();

        // board.markMove("x", currentPlayer, 0, 2);
        // console.log(board.checkWin(currentPlayer));
        // swapPlayer();

        // board.markMove("o", currentPlayer, 2, 0);
        // console.log(board.checkWin(currentPlayer));
        // swapPlayer();

        // board.markMove("x", currentPlayer, 2, 2);
        // console.log(board.checkWin(currentPlayer));
        // swapPlayer();

        const trackRounds= function (){

            let currentWinner= board.checkWin(currentPlayer);
            let roundNo= 1;

            while(currentWinner.playerID === 0)
            {
                let moveRow= Number(prompt("Enter number")),
                moveCol= Number(prompt("Enter number"));

                let currentSymbol= currentPlayer.playerID === 1 ? "o" : "x";

                let validity= board.markMove(currentSymbol, currentPlayer, moveRow, moveCol);
                if(!validity) continue;
                //for invalid move

                currentWinner= board.checkWin(currentPlayer, roundNo);
                
                console.log(currentWinner);
                roundNo++;
                swapPlayer();
            }

            console.log(currentWinner.playerID);

        };

        return {currentPlayer, trackRounds, swapPlayer};   
    }

    function DisplayController(){
        const gameContainer= document.querySelector(".game-container");
        const cell= document.querySelectorAll(".cell");
        const board= GameBoard();
        const gamePlay= GameController();

        const makeBoard= () => {
            board.getBoard().forEach((box) => {
                
            });
        }
    }

    const game=GameController();