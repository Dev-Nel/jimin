let lastDirection = '';
let score = 0;
const scoreElement = document.getElementById('score');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let dx = 1;
let dy = 0;
let food = { x: 15, y: 15 };
let speed = 400; // Speed in milliseconds

// Function to draw the game
function drawGame() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawFood();
    drawSnake();
    setTimeout(drawGame, speed);
}

// Function to clear the canvas
function clearCanvas() {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to draw the snake
function drawSnake() {
    ctx.fillStyle = '#FF01FB';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = '#21FA90';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 4, gridSize - 2);
}

// Function to move the snake
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

// Function to check for collisions
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        showGameOverModal();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            showGameOverModal();
        }
    }
}

// Function to show the game over modal
function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'block';
    resetGame();
}

// Function to reset the game state
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
}

// Function to generate food at random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize),
        y: Math.floor(Math.random() * canvas.height / gridSize)
    };
}

// Event listener for keyboard controls
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

// Event listener for the "Close Modal" button
document.getElementById('closeModalBtn').addEventListener('click', () => {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
    document.getElementById('startGameJimin').style.display = 'inline-block'; // Show start button again
    document.getElementById('controls').style.display = 'none'; // Hide controls again
});

// Event listeners for mobile controls
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

document.getElementById('leftBtn').addEventListener('click', () => {
    if (dx === 0) {
        dx = -1;
        dy = 0;
    }
});

document.getElementById('rightBtn').addEventListener('click', () => {
    if (dx === 0) {
        dx = 1;
        dy = 0;
    }
});

// Event listener for the "Start Game" button
document.getElementById('startGameJimin').addEventListener('click', () => {
    // Reset the game state before starting
    resetGame();
    
    // Hide the start button and show controls
    document.getElementById('startGameJimin').style.display = 'none';
    document.getElementById('controls').style.display = 'block';
    
    // Start the game
    drawGame();
    alert("Game is starting");
});
