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

// Start the game
function startGame() {
    snake = [{ x: 250, y: 250 }];
    direction = "RIGHT";
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = "Score: " + score;
    modal.style.display = "none";
    generateFood();
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
    }, 100); // Adjusted speed (100ms)
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = "#fff"; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    let head = { ...snake[0] };

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

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = "Score: " + score;
        generateFood();
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = "#00FF00"; // Green color for the snake
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, 10, 10); // Snake block size: 10x10
    });
}

// Generate random food position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    };
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "#FF0000"; // Red color for the food
    ctx.fillRect(food.x, food.y, 10, 10); // Food block size: 10x10
}

// Check collisions
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

// Keyboard controls
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            if (direction !== "RIGHT") direction = "LEFT";
            break;
        case "ArrowUp":
            if (direction !== "DOWN") direction = "UP";
            break;
        case "ArrowRight":
            if (direction !== "LEFT") direction = "RIGHT";
            break;
        case "ArrowDown":
            if (direction !== "UP") direction = "DOWN";
            break;
    }
});

// Mobile controls
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
