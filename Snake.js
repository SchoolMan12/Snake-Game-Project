const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;

let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = "right";

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;

    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}

function checkCollisions() {
    const head = snake[0];

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y < 0 || head.y >= gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    alert("Game over! Restarting...");
    snake = [{ x: 5, y: 5 }];
    direction = "right";
    generateFood();
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    checkCollisions();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
});

setInterval(updateGame, 100); // Add game loop
