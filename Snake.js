const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;

let isrunning = true;
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = "right";
let difficulty =100;
var interval;

function drawBoard() {
    ctx.strokeStyle = "#dddddd";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
    ctx.strokeRect( i * tileSize, j * tileSize, tileSize, tileSize);}   
      }
}
function drawSnake() {
    ctx.fillStyle = "#33ccff";
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
console.log (direction)
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
    //alert("Game over! Restarting...");
    const log = document.getElementById("start");
    log.innerHTML = "You lose";
    isrunning = false;
    snake = [{ x: 5, y: 5 }];
    direction = "right";
    generateFood();
}
function getdifficultyname() {
    if (difficulty == 100)
        return "hard"
    if (difficulty == 200)
        return "normal"
    if (difficulty == 300)
        return "easy"
}
function updateGame() {
    if (isrunning == false) return;
    const log = document.getElementById("difficulty");
    log.innerHTML = getdifficultyname();
    drawBoard();
    drawSnake();
    drawFood();
    moveSnake();
    checkCollisions();
}

function begingame() {
    isrunning = true;
}

function setdifficulty(speed) {
    difficulty = speed; 
    clearInterval(interval);
    interval = setInterval(updateGame, difficulty);
}

document.addEventListener("keydown", (event) => {
    const log = document.getElementById("direction");
        log.innerHTML = event.key;
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

interval = setInterval(updateGame, difficulty); // Add game loop
