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

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModalIcon = document.getElementById("closeModalIcon");

function drawGame() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawFood();
    drawSnake();
}

function startGame() {
    resetGame();
    gameInterval = setInterval(drawGame, speed);
}

function clearCanvas() {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#FF01FB';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = '#21FA90';
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
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(gameInterval);
    showModal();
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    generateFood();
    clearInterval(gameInterval);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

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

document.getElementById('startGameJimin').addEventListener('click', startGame);
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    resetGame();
});
closeModalIcon.addEventListener('click', () => {
    modal.style.display = 'none';
    resetGame();
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

generateFood();

// Function to show modal
function showModal() {
    modal.style.display = 'block';
}
