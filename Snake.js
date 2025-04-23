//The variable declarations for the project
let points =0;
let highscore =0;
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
//This function draws the board, I added stroke lines to give the board a grid
function drawBoard() {
    ctx.strokeStyle = "#dddddd";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
    ctx.strokeRect( i * tileSize, j * tileSize, tileSize, tileSize);}   
      } 
}
//This function draws the snake, changed the color of the snake to light blue
function drawSnake() {
    ctx.fillStyle = "#33ccff";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}
//This draws the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

}
//This moves the snake, stored and displayed the direction for the user to see
function moveSnake() {
    const head = { ...snake[0] };
    const log = document.getElementById("direction");
        log.innerHTML = direction;
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
        generateFood(); points ++;
    } else {
        snake.pop();
    }
}
//This generates a new piece of food
function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}
//This checks to see if the head of the snake ran into its body or if it went out of bounds
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
//This shows the end stats of a lost run
function resetGame() {
    const log = document.getElementById("start");
    log.innerHTML = "You lose";
    isrunning = false;
    snake = [{ x: 5, y: 5 }];
    direction = "right";
    //Your calculating to see if your current score beat the highschore
    if (highscore < points) {
    highscore = points    
    }
    
    generateFood();
    const h = document.getElementById("highscore");
    h.innerHTML = highscore;
}
//This takes the difficulty as a number and takes it as a string 
function getdifficultyname() {
    if (difficulty == 100)
        return "hard"
    if (difficulty == 200)
        return "normal"
    if (difficulty == 300)
        return "easy"
}
//This runs the functions for the game
function updateGame() {
    if (isrunning == false) return;
    const log = document.getElementById("difficulty");
    log.innerHTML = getdifficultyname();
    drawBoard();
    drawSnake();
    drawFood();
    moveSnake();
    checkCollisions();
    const p = document.getElementById("point");
    p.innerHTML = points;
}
//This starts the game
function begingame() {
    isrunning = true;
    const log = document.getElementById("start");
    log.innerHTML = "Game is running";
    points=0;
}
//This allows changing the difficulty
function setdifficulty(speed) {
    difficulty = speed; 
    clearInterval(interval);
    interval = setInterval(updateGame, difficulty);
}
//This allows you to control the snake
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
// This is the game loop
interval = setInterval(updateGame, difficulty); 
