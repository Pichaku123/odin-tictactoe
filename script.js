    //
    function GameBoard(){
        let board=[];
        const n=3;
        const status= document.querySelector(".status");

        //NOTE- moving to a DOM approach instead of using Cell() object, so updated most of the methods here

        for(let i=0; i<n; i++)
        {
            board[i]=[];
            for(let j=0; j<n; j++)
            {
                board[i].push(" ");  //pushes empty string in each cell
            }
        }

        const getBoard= () => (board);  //encapsulate board itself

        const printBoard= () => {
            console.log(board);
        }

        const markMove= (symbol, moveRow, moveCol) => {
            //to mark move on the board itself
            //0 means invalid move, 1 means valid
            
            if(board[moveRow][moveCol] !== " "){
                status.textContent="Invalid move, already occupied";
                console.log("Invalid move, already occupied");
                return false;   
            }
            //if valid move, use setMove to edit the cell's properties
            board[moveRow][moveCol]= symbol; 
            status.textContent=" ";
            return true;
        };

        //here, 0- unfinished, 1- p1, 2- p2, -1 means tied. 
        const endOrNot= (currentSymbol, currentPlayer, roundNo) => {
            //updated function so that printing of win/lose/tie happens here itself.
            //made this a boolean function to show whether game is over or not, it also handles printing.

            let winner={    
                name: "unfinished",
                playerID: 0,
            };  //winner and currentPlayer are objects

            //checking for rows
            const symbol= currentSymbol;
            for(let row=0; row<n; row++)
            {
                if(
                    board[row][0] === symbol &&
                    board[row][1] === symbol &&
                    board[row][2] === symbol
                ){
                    winner= currentPlayer;
                }
            }
            
            //checking for columns
            for(let col=0; col<n; col++)
            {
                if(
                    board[0][col] === symbol &&
                    board[1][col] === symbol &&
                    board[2][col] === symbol
                ){
                    winner= currentPlayer;
                }
            }
            //checking for diagonals
            if(
                board[0][0] === symbol && 
                board[1][1] === symbol && 
                board[2][2] === symbol
            ){
                winner= currentPlayer;
            }
            if(
                board[0][2] === symbol && 
                board[1][1] === symbol && 
                board[2][0] === symbol
            ){
                winner= currentPlayer;
            }
            //all of these were wincons before this
            //checking for tie
            if(roundNo>=9 && winner.playerID == 0){
                winner= {
                    name: "tied",
                    playerID: -1,
                }
            }

            if(winner.playerID === -1) {
                status.textContent= `Game Tied.`;
                return true;
            }
            else if(winner.playerID === 1) {
                status.textContent= `${currentPlayer.name} wins!`;
                return true;
            }
            else if(winner.playerID === 2) {
                status.textContent= `${currentPlayer.name} wins!`;
                return true;
            }
            else return false;
            
        };

        return {getBoard, printBoard, markMove, endOrNot};
    }

    //REMOVED CELL OBJECT CUZ WE'RE MANIPULATING DOM NOW, NOT THE ORIGINAL OBJECT ARRAY

    function GameController(name1, name2){
        const playerList=[      //only 2 players, so i'm using array rn
            {
                name: name1 || "player 1",
                playerID: 1,
            }, 
            {
                name: name2 || "player 2",
                playerID: 2,
            }
        ]

        let currentPlayer=playerList[0];    //p1 by default
        const getPlayer = () => currentPlayer;

        const swapPlayer= () =>{
            currentPlayer = (currentPlayer === playerList[0]) ?
            (playerList[1]) : (playerList[0]);
        }

        //removed trackrounds() and the loop in it, as we're using clicks to check wincons, not loop.

        return {getPlayer, swapPlayer};   
    }

    function DisplayController(){
        const gameContainer= document.querySelector(".game-container");
        const board= GameBoard();
        //moving gamePlay() to start button.
        const n=3;
        let roundNo=1;  //moved outside cuz it doesn't matter which cell its in
        const status=document.querySelector(".status");
        let gameOver=false;   //just to ensure players can't click after its over, thanks chatgpt
        let gameStart=false;
        const start=document.querySelector("#start");

        let gamePlay;
        //declare but don't initialise gamePlay
        //so that it's still accessible inside displayBoard and cell
        //while not being actually usable till we click start
        

        start.addEventListener("click", () => {
            let name1=document.querySelector("#player-1").value;
            let name2=document.querySelector("#player-2").value;
            gamePlay= GameController(name1, name2);
            //acutal definition of gamePlay here
            //so gamecontroller isn't called without clicking start.
            gameStart=true;
        });

        const displayBoard= () => {
            for(let i=0; i<n; i++)
            {
                for(let j=0; j<n; j++)
                {
                    let cell= document.createElement("div");
                    cell.classList.add("cell");
                    cell.setAttribute("data-row", i);
                    cell.setAttribute("data-col", j);

                    cell.addEventListener("click", () => {  //handle clicks
                        if(!gameStart || gameOver) return;

                        const row= cell.getAttribute("data-row");   //for coordinates
                        const col= cell.getAttribute("data-col");

                        let currentPlayer=gamePlay.getPlayer();   //brought logic from trackRounds() here
                        let currentSymbol;
                        switch(currentPlayer.playerID)
                        {
                            case 1: currentSymbol= "o"; break;
                            case 2: currentSymbol= "x"; break;
                            default: currentSymbol= " ";
                        }

                        //mark move on "board" array
                        let valid= board.markMove(currentSymbol, +row, +col);
                        if(!valid) return;

                        //display on UI as well, helps update DOM and array
                        cell.textContent=currentSymbol;     

                        //each cell has this condition so no need for while loop
                        if(!board.endOrNot(currentSymbol, currentPlayer, roundNo)){    
                            roundNo++;
                            gamePlay.swapPlayer();
                            //so swap wasn't working cuz when we called gamecontroller, the value of 
                            //currentplayer was set, so we couldn't change it
                            //so we can use some other function to getPlayer().
                            //eg- currentPlayer= {"p1", 1}; so now that value is fixed.
                        }
                        else{
                            gameOver=true;
                            return;
                        }

                        //testing
                        console.log(`Row no- ${row}, Col no- ${col} by ${currentPlayer.name}`);
                    })

                    gameContainer.appendChild(cell);
                }
            }
        }
        displayBoard();
        
        
        
    }

    const display=DisplayController();