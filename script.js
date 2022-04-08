const gameBoard = (function() {
    let boardSquareArray = [];
    let markerPlaceObj = {};
    let gameCreated = false;
    let messageBoardDiv = document.getElementById('messageBoard');
    let gameBoardDiv = document.getElementById('gameBoard');
    let turnMessage = document.createElement('div');
    turnMessage.setAttribute('id', 'turnMessage')
    messageBoardDiv.appendChild(turnMessage);
    let startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        if(gameCreated === false) {
            gameControl();
            gameCreated = true;
        } else {
            alert('To start a new game, click "Restart game"');
        };
    });
    for (let i = 0; i < 9; i++) {
        const boardSquare = document.createElement('div');
        boardSquare.setAttribute('id', `${i}`);
        boardSquare.classList.add('gameSquare');
        gameBoardDiv.appendChild(boardSquare);
        boardSquareArray.push(document.getElementById(`${i}`));
    };
    return {
        boardSquareArray: boardSquareArray,
        markerPlaceObj: markerPlaceObj,
    } 
})();

const gameControl = function createGameState() {
    let markerPlaceObjVar = gameBoard.markerPlaceObj
    let turnMessage = document.getElementById('turnMessage');
    turnMessage.textContent = 'To start a game, please click Start Game.';
    let turnToggle = 1;
    let possibleMoves = 9;
    turnMessage.textContent = 'It\'s Player One\'s turn.';
    gameBoard.boardSquareArray.forEach((square) => {
        markerPlaceObjVar[square.id] = undefined; 
        square.addEventListener('click', (e) => {
            if (turnToggle === 1 && markerPlaceObjVar[e.target.id] === undefined) {
                markerPlaceObjVar[e.target.id] = 'X';
                e.target.textContent = 'X';
                turnToggle = 0;
                turnMessage.textContent = 'It\'s Player Two\'s turn.';
                possibleMoves -= 1;
                checkGameState('X');
                console.log(markerPlaceObjVar);
            } else if (turnToggle === 0 && markerPlaceObjVar[e.target.id] === undefined) {
                markerPlaceObjVar[e.target.id] = 'O';
                e.target.textContent = 'O';
                turnToggle = 1;
                turnMessage.textContent = 'It\'s Player One\'s turn.';
                possibleMoves -= 1;
                checkGameState('O');
                console.log(markerPlaceObjVar);
            } else if (turnToggle === 2) {
                alert('Please start a new game to continue playing!')
            } else {
                alert('A marker has already been placed here!')
            }
        })
    });
    const checkGameState = function(marker) {
        if (markerPlaceObjVar[0] === marker 
        && markerPlaceObjVar[1] === marker
        && markerPlaceObjVar[2] === marker 
        || markerPlaceObjVar[3] === marker 
        && markerPlaceObjVar[4] === marker
        && markerPlaceObjVar[5] === marker
        || markerPlaceObjVar[6] === marker 
        && markerPlaceObjVar[7] === marker
        && markerPlaceObjVar[8] === marker) {
            declareResult(marker);
        } else if (markerPlaceObjVar[0] === marker 
        && markerPlaceObjVar[3] === marker 
        && markerPlaceObjVar[6] === marker
        || markerPlaceObjVar[1] === marker 
        && markerPlaceObjVar[4] === marker
        && markerPlaceObjVar[7] === marker
        || markerPlaceObjVar[2] === marker 
        && markerPlaceObjVar[5] === marker
        && markerPlaceObjVar[8] === marker) {
            declareResult(marker);
        } else if (markerPlaceObjVar[0] === marker 
        && markerPlaceObjVar[4] === marker 
        && markerPlaceObjVar[8] === marker) {
            declareResult(marker);
        } else if (markerPlaceObjVar[2] === marker 
        && markerPlaceObjVar[4] === marker 
        && markerPlaceObjVar[6] === marker) {
            declareResult(marker);
        } else if (possibleMoves === 0) {
            marker = 'draw';
            declareResult(marker);
        }
    };
    const declareResult = function(marker) {
        if(marker === 'O') {
            turnMessage.textContent = 'Player Two is the winner! To play another game, click "play again".';
            gameStart = false;
            turnToggle = 2;
        } else if (marker === 'X') {
            turnMessage.textContent = 'Player One is the winner! To play another game, click "play again".';
            gameStart = false;
            turnToggle = 2;
        } else if (marker === 'draw') {
            turnMessage.textContent = 'The result is a draw. To play another game, click "play again".';
            gameStart = false;
            turnToggle = 2;
        };
    };
    const resetGameBoard = function() {
        for (const position in markerPlaceObjVar) {
            markerPlaceObjVar[position] = undefined;
        };
        gameBoard.boardSquareArray.forEach((e) => {
            e.textContent = '';
        });
        turnToggle = 1;
        possibleMoves = 9;
        turnMessage.textContent = 'A new game has been declared! Player one starts.'
    };
    let restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        resetGameBoard();
    })
    return {
        createGameState: createGameState,
        markerPlaceObjVar: markerPlaceObjVar
    }
};


/*
Enable selection of marker for the first player.
Change all 'player one' references to be equal to the input value.
 */

// markerPlaceObjVar.forEach((square) => {
//     markerPlaceObjVar[square.id] = undefined;
//     markerPlaceObjVar[square.textContent] = "T"
//     turnToggle = 1;
// });