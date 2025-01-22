let lastDirection = '';
let score = 0;
const scoreElement = document.getElementById('score');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0; // Start with no movement
let food = { x: 15, y: 15 };
let speed = 200; // Speed in milliseconds
let gameInterval;

// Get modal element
const modal = document.getElementById('modal');
// Get the close modal button and close icon
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalIcon = document.getElementById('closeModalIcon');

// Get the start game button
const startGameBtn = document.getElementById('startGameJimin');

// Add event listener to start the game when clicked
startGameBtn.addEventListener('click', startGame);

// Start the game
function startGame() {
    resetGame();
    gameInterval = setInterval(drawGame, speed);
}

// Draw the game
function drawGame() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawFood();
    drawSnake();
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = '#FF01FB';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = '#21FA90';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }
}

// Check for collision (wall or snake's own body)
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        endGame(); // Collision with wall
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame(); // Collision with tail
        }
    }
}

// End the game by showing the modal
function endGame() {
    clearInterval(gameInterval); // Stop the game loop
    showModal(); // Show the modal when the game ends
}

// Reset the game state
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    generateFood();
    clearInterval(gameInterval);
}

// Generate new food position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

// Display the modal
function showModal() {
    modal.style.display = 'block';
}

// Close the modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    resetGame();
});

// Close the modal when the close icon (×) is clicked
closeModalIcon.addEventListener('click', () => {
    modal.style.display = 'none';
    resetGame();
});

// Close the modal if the user clicks anywhere outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        resetGame();
    }
});

// Handle keyboard inputs for the snake movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
});

// Handle mobile controls
document.getElementById('upBtn').addEventListener('click', () => {
    if (dy === 0) {
        dx = 0;
        dy = -1;
    }
});
document.getElementById('downBtn').addEventListener('click', () => {
    if (dy === 0) {
        dx = 0;
        dy = 1;
    }
});
document.getElementById('leftBtn').addEventListene
