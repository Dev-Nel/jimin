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
let speed = 600; // Speed in milliseconds
let gameInterval; // Interval to control the game loop

function startGame() {
    alert('Game Starting!');
    resetGame(); // Reset the game to its initial state
    clearInterval(gameInterval); // Clear any existing intervals
    gameInterval = setInterval(() => {
        drawGame();
    }, speed); // Start the game loop
}

function drawGame() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawFood();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = '#393D3F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#06BA63';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = '#D30C7B';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

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

function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'block';
    clearInterval(gameInterval); // Stop the game loop
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize),
        y: Math.floor(Math.random() * canvas.height / gridSize)
    };
}

// Keyboard controls
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

// Close game over modal
document.getElementById('closeModalBtn').addEventListener('click', () => {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
});

// Mobile controls
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

// Add event listener to Start Game button
document.querySelector('button').addEventListener('click', startGame);
