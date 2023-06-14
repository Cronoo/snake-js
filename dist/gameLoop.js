import { initPlayObjects, apple, snake, createSnakeSection, startGameText, endGameText, InitTextObjects } from "./gameObjects.js";
import { moveDir, moveObject, resetMoveDir } from "./gameMovment.js";
import { isOutOfBoundsOnGrid } from "./canvasUtility.js";
import { canvasGridCellCount, random, canvasGridCellToWorldPos } from "./gameMath.js";
const canvas = document.querySelector("canvas");
const context = canvas?.getContext("2d");
const startBtn = document.querySelector("button");
const scoreCounter = document.querySelector("#score");
const timeOutIDs = [];
export const gridCellSize = 25;
const renderUpdateTimer = 50;
let logicUpdateTimer = 500; // decrees for more difficulty
const minLogicUpdateTimer = 10;
const maxLogicUpdateTimer = 500;
const logicUpdateTimerDecrementAmount = 10;
let gameOverAnimationCounter = 0;
let currentGameStat = 0 /* gameState.waitingToStart */;
let score = 0;
startBtn?.addEventListener("mousedown", (e) => {
    playGame();
});
function playGame() {
    if (context === undefined || context === null) {
        return;
    }
    reset(context);
    moveApple(context);
    logicUpdate(context);
}
function initPreGameObjects() {
    if (context === undefined || context === null) {
        return;
    }
    currentGameStat = 0 /* gameState.waitingToStart */;
    InitTextObjects(context);
}
function reset(context) {
    timeOutIDs.forEach((timer) => {
        clearTimeout(timer);
    });
    for (let i = timeOutIDs.length - 1; i >= 0; i--) {
        timeOutIDs.pop();
    }
    resetMoveDir();
    currentGameStat = 1 /* gameState.playing */;
    logicUpdateTimer = maxLogicUpdateTimer;
    initPlayObjects(context);
}
function logicUpdate(context) {
    if (currentGameStat === 1 /* gameState.playing */) {
        if (checkForSnakeOutOfBounds(context)) {
            currentGameStat = 2 /* gameState.gameOver */;
        }
        moveObject(snake, gridCellSize, context);
        if (checkForSnakeSelfCollision()) {
            currentGameStat = 2 /* gameState.gameOver */;
        }
        checkForApplePickup(context);
        timeOutIDs.push(setTimeout(() => {
            logicUpdate(context);
        }, logicUpdateTimer));
    }
    else {
        GameOver();
    }
}
function renderUpdate() {
    if (context === undefined || context === null) {
        return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (currentGameStat === 1 /* gameState.playing */ || currentGameStat === 2 /* gameState.gameOver */) {
        for (let i = snake.length - 1; i >= 0; i--) {
            snake[i]?.draw(context);
        }
        apple?.draw(context);
    }
    if (currentGameStat === 0 /* gameState.waitingToStart */) {
        startGameText?.draw(context);
    }
    if (currentGameStat === 2 /* gameState.gameOver */) {
        endGameText?.draw(context);
    }
    setTimeout(() => {
        renderUpdate();
    }, renderUpdateTimer);
}
function checkForSnakeOutOfBounds(context) {
    const snakeHead = snake[0];
    let outOfBounds;
    switch (moveDir) { // check if snake head hit wall
        case 0 /* Dir.UP */:
            outOfBounds = isOutOfBoundsOnGrid({ x: 0, y: -1 }, snakeHead, context);
            break;
        case 1 /* Dir.DOWN */:
            outOfBounds = isOutOfBoundsOnGrid({ x: 0, y: 1 }, snakeHead, context);
            break;
        case 2 /* Dir.LEFT */:
            outOfBounds = isOutOfBoundsOnGrid({ x: -1, y: 0 }, snakeHead, context);
            break;
        case 3 /* Dir.RIGHT */:
            outOfBounds = isOutOfBoundsOnGrid({ x: 1, y: 0 }, snakeHead, context);
            break;
    }
    return outOfBounds;
}
function checkForSnakeSelfCollision() {
    if (snake.length === 1) {
        return false;
    }
    for (let i = 1; i < snake.length; i++) { // check if snake head hit tail
        if (snake[0].getCurrentPosition().x === snake[i].getCurrentPosition().x &&
            snake[0].getCurrentPosition().y === snake[i].getCurrentPosition().y) {
            return true;
        }
    }
    return false;
}
function checkForApplePickup(context) {
    if (snake[0].getCurrentPosition().x === apple.getCurrentPosition().x &&
        snake[0].getCurrentPosition().y === apple.getCurrentPosition().y) {
        createSnakeSection("#254d17", snake[0].getLastPosition());
        increaseDifficulty();
        updateScore(snake.length);
        moveApple(context);
    }
}
function moveApple(context) {
    if (canvas !== undefined && canvas !== null) {
        const gridCount = canvasGridCellCount(context, gridCellSize);
        let canSpawn = false;
        const xPos = random(gridCount.x);
        const yPos = random(gridCount.y);
        for (let i = 0; i < snake.length; i++) {
            const snakePos = snake[i].getCurrentPosition();
            if (snakePos.x !== xPos && snakePos.y !== yPos) {
                canSpawn = true;
            }
        }
        if (canSpawn) {
            apple.setCurrentPosition(canvasGridCellToWorldPos({ x: xPos, y: yPos }, gridCellSize));
        }
    }
}
function increaseDifficulty() {
    if (logicUpdateTimer > minLogicUpdateTimer) {
        logicUpdateTimer -= logicUpdateTimerDecrementAmount;
    }
}
export function GameOver() {
    currentGameStat = 2 /* gameState.gameOver */;
    gameOverAnimation();
}
function gameOverAnimation() {
    if (currentGameStat !== 2 /* gameState.gameOver */) {
        return;
    }
    if (gameOverAnimationCounter < snake.length) {
        snake[gameOverAnimationCounter].setColors("#910303", "#5d0000");
        gameOverAnimationCounter++;
        setTimeout(gameOverAnimation, 50);
    }
    else {
        snake[0].setColors("#910303", "#5d0000");
    }
}
function updateScore(add) {
    score += add;
    if (scoreCounter !== null) {
        scoreCounter.textContent = `Score: ${score}`;
    }
}
initPreGameObjects();
renderUpdate();
//# sourceMappingURL=gameLoop.js.map