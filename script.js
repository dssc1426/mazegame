const col = 10;
const row = 5;

const grid = document.getElementById('grid');
const winBanner = document.getElementById('winBanner');
const playerTurnMessage = document.getElementById('playerTurnMessage');

const cells = [];

// Initialize the grid
for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        grid.appendChild(cell);
    }
}

// Set player positions
let player1 = 0; // Player 1 starts at the top-left corner
let player2 = col * row - 1; // Player 2 starts at the bottom-right corner
cells[player1].classList.add('player1');
cells[player2].classList.add('player2');

// Start the game with player1's turn
let currentPlayer = 'player1';
updatePlayerTurnMessage(); // Display the initial player turn message


// Event listener for Player 1's key controls
document.addEventListener('keydown', function(event) {
    if (currentPlayer === 'player1' && isArrowKey(event.key)) {
        handlePlayer1Move(event);
    }
});

//(if second player is also humna)
// Event listener for Player 2's key controls
document.addEventListener('keydown', function(event) {
    if (currentPlayer === 'player2' && iswasdKey(event.key)) {
        handlePlayer2Move(event);
    }
});

// Function to check if a key is an arrow key
function isArrowKey(key) {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
}
function iswasdKey(key) {
    return ['w', 's', 'a', 'd'].includes(key);
}

// Function to handle keydown events
function handleKeyDown(event) {
    if (currentPlayer === 'player1') {
        handlePlayer1Move(event);
    } else {
        handlePlayer2Move(event);
    }
}
// Handle arrow key presses for Player 1
function handlePlayer1Move(event) {
    if (currentPlayer !== 'player1') return; // Skip if it's not player1's turn

    // Your existing code for player1's move handling goes here...
    const key = event.key;
    const directions = {
        ArrowUp: -col,
        ArrowDown: col,
        ArrowLeft: -1,
        ArrowRight: 1,
    };

    if (key in directions) {
        const move = directions[key];
        const newPlayer1 = player1 + move;

        if (newPlayer1 >= 0 && newPlayer1 < col * row && !cells[newPlayer1].classList.contains('wall') &&
        !(player1 % col === 0 && newPlayer1 % col === col - 1) &&
        !(player1 % col === col - 1 && newPlayer1 % col === 0)
        ){
            const currentPlayerCell = cells[player1];

            // Get the computed style of the player's cell
            const currentPlayerComputedStyle = window.getComputedStyle(currentPlayerCell);

            // Get the border styles of the player's cell
            const borderTopStyle = currentPlayerComputedStyle.getPropertyValue('border-top-style');
            const borderBottomStyle = currentPlayerComputedStyle.getPropertyValue('border-bottom-style');
            const borderLeftStyle = currentPlayerComputedStyle.getPropertyValue('border-left-style');
            const borderRightStyle = currentPlayerComputedStyle.getPropertyValue('border-right-style');

            if(key =='ArrowUp'){
                border=borderTopStyle;
            }else if(key =='ArrowDown'){
                border=borderBottomStyle;
            }else if(key =='ArrowLeft'){
                border=borderLeftStyle;
            }else if(key =='ArrowRight'){
                border=borderRightStyle;
            }
            if(border != 'solid'){
                cells[player1].classList.remove('player1');
                player1 = newPlayer1;
                cells[player1].classList.add('player1');
                checkWin();

                if (player1 === player2) {
                    winBanner.textContent = 'Player 1 captures Player 2! Player 1 wins!';
                    winBanner.style.display = 'block';
                    // Disable further player movement
                    document.removeEventListener('keydown', handlePlayer1Move);
                    document.removeEventListener('keydown', handlePlayer2Move);
                }
                switchTurn();   
            }   
        }
    }
}

// Handle arrow key presses for Player 2
function handlePlayer2Move(event) {
    if (currentPlayer !== 'player2') return; // Skip if it's not player2's turn

    // Your existing code for player2's move handling goes here...
    const key = event.key;
    const directions = {
        w: -col, // W key for up
        s: col, // S key for down
        a: -1, // A key for left
        d: 1, // D key for right
    };

    if (key in directions) {
        const move = directions[key];
        const newPlayer2 = player2 + move;

        if (newPlayer2 >= 0 && newPlayer2 < col * row && !cells[newPlayer2].classList.contains('wall') &&
        !(player2 % col === 0 && newPlayer2 % col === col - 1) && !(player2 % col === col - 1 && newPlayer2 % col === 0)
        ){
            const currentPlayerCell = cells[player2];

            // Get the computed style of the player's cell
            const currentPlayerComputedStyle = window.getComputedStyle(currentPlayerCell);

            // Get the border styles of the player's cell
            const borderTopStyle = currentPlayerComputedStyle.getPropertyValue('border-top-style');
            const borderBottomStyle = currentPlayerComputedStyle.getPropertyValue('border-bottom-style');
            const borderLeftStyle = currentPlayerComputedStyle.getPropertyValue('border-left-style');
            const borderRightStyle = currentPlayerComputedStyle.getPropertyValue('border-right-style');

            if(key =='w'){
                border=borderTopStyle;
            }else if(key =='s'){
                border=borderBottomStyle;
            }else if(key =='a'){
                border=borderLeftStyle;
            }else if(key =='d'){
                border=borderRightStyle;
            }
            if(border != 'solid'){
                cells[player2].classList.remove('player2');
                player2 = newPlayer2;
                cells[player2].classList.add('player2');
                checkWin();
                if (player2=== player1) {
                    winBanner.textContent = 'Player 2 captures Player 1! Player 2 wins!';
                    winBanner.style.display = 'block';
                    // Disable further player movement
                    document.removeEventListener('keydown', handlePlayer1Move);
                    document.removeEventListener('keydown', handlePlayer2Move);
                }
                switchTurn();   
            }                 
            
        }
    }            
    // After player2's move, switch to player1's turn
    
}

// Function to switch turns between players
function switchTurn() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    updatePlayerTurnMessage(); // Display the initial player turn message
    if (currentPlayer === 'player1') {
        document.removeEventListener('keydown', handlePlayer2Move);
        document.addEventListener('keydown', handlePlayer1Move);
    } else {
        document.removeEventListener('keydown', handlePlayer1Move);
        document.addEventListener('keydown', handlePlayer2Move);
    }
}

function restartGame() {
    // Reset player positions
    player1 = 0;
    player2 = col * row - 1;
    cells.forEach((cell) => cell.classList.remove('player1', 'player2'));
    cells[player1].classList.add('player1');
    cells[player2].classList.add('player2');

    // Hide the win banner
    winBanner.style.display = 'none';

    // Re-enable player movement
    document.addEventListener('keydown', handlePlayer1Move);
    document.addEventListener('keydown', handlePlayer2Move);
}
//Add event listener for the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

// Function to update the message indicating the current player's turn
function updatePlayerTurnMessage() {
    playerTurnMessage.textContent = `Current Turn: ${currentPlayer === 'player1' ? 'Player 1 (Blue)(Arrow keys)' : 'Player 2 (Red)(wasd)'}`;
}

// Check for win condition
function checkWin() {
    if (player1 === col * row - 1) {
        winBanner.textContent = 'Player 1 wins! They reached the opposite end.';
        winBanner.style.display = 'block';
        
        // Disable further player movement
        document.removeEventListener('keydown', handlePlayer1Move);
        document.removeEventListener('keydown', handlePlayer2Move);
    } else if (player2 === 0) {
        winBanner.textContent = 'Player 2 wins! They reached the opposite end.';
        winBanner.style.display = 'block';
        
        document.removeEventListener('keydown', handlePlayer1Move);
        document.removeEventListener('keydown', handlePlayer2Move);
    }else{
        winBanner.style.display = 'none'; // Hide the win banner
    }
}