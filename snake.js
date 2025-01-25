let startButton = document.getElementById("startGameJimin");
let modal = document.getElementById("modal");
let closeModalBtn = document.getElementById("closeModalBtn");
let closeModalIcon = document.getElementById("closeModalIcon");
let scoreDisplay = document.getElementById("score");
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let gameOver = false;
let snake;
let direction;
let food;
let score;

startButton.addEventListener("click", function () {
    alert("Game Starting!");
    startGame();
});

closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
    startGame();
});

closeModalIcon.addEventListener("click", function () {
    modal.style.display = "none";
    startGame();
});

let speed = 100; // Speed of the game loop

// Start the game
function startGame() {
    snake = [{ x: 250, y: 250 }];
    direction = "RIGHT";
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = "Score: " + score;
    modal.style.display = "none";
    gameLoop();
}

// Game loop
function gameLoop() {
    if (gameOver) {
        showModal();
        return;
    }

    setTimeout(function () {
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFood();
        checkCollisions();
        gameLoop();
    }, speed);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    let head = Object.assign({}, snake[0]);

    switch (direction) {
        case "LEFT":
            head.x -= 10;
            break;
        case "RIGHT":
            head.x += 10;
            break;
        case "UP":
            head.y -= 10;
            break;
        case "DOWN":
            head.y += 10;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = "Score: " + score;
        generateFood();
    } else {
        snake.pop();
    }
}

// Draw the snake on canvas
function drawSnake() {
    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}

// Draw food on canvas
function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Generate random food position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * 50) * 10,
        y: Math.floor(Math.random() * 50) * 10
    };
}

// Check for collisions
function checkCollisions() {
    let head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

// Show modal when the game is over
function showModal() {
    modal.style.display = "flex";
}

// Handle arrow button controls
document.getElementById("leftBtn").addEventListener("click", function () {
    if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("upBtn").addEventListener("click", function () {
    if (direction !== "DOWN") direction = "UP";
});
document.getElementById("rightBtn").addEventListener("click", function () {
    if (direction !== "LEFT") direction = "RIGHT";
});
document.getElementById("downBtn").addEventListener("click", function () {
    if (direction !== "UP") direction = "DOWN";
});
