import { initObjects, apple, snake } from "./gameObjects.js";
import { moveDir, moveObject } from "./gameMovment.js";
import { isOutOfBoundsOnGrid } from "./canvasUtility.js";
const canvas = document.querySelector("canvas");
const context = canvas?.getContext("2d");
export const gridCellSize = 25;
const renderUpdateTimer = 100;
const logicUpdateTimer = 1000; // decrees for more difficulty
let gameOverAnimtationCounter = 0;
let gameOver = false;
function initGame() {
    if (context === undefined || context === null) {
        return;
    }
    initObjects(context);
    renderUpdate(context);
    logicUpdate(context);
}
function logicUpdate(context) {
    if (!gameOver) {
        moveObject(snake, gridCellSize, context);
        checkForGameOver(context);
        setTimeout(() => {
            logicUpdate(context);
        }, logicUpdateTimer);
    }
    else {
        GameOver();
    }
}
function renderUpdate(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = snake.length - 1; i >= 0; i--) {
        snake[i].draw(context);
    }
    apple?.draw(context);
    setTimeout(() => {
        renderUpdate(context);
    }, renderUpdateTimer);
}
function checkForGameOver(context) {
    const snakeHead = snake[0];
    switch (moveDir) { // check if snake head hit wall
        case 0 /* Dir.UP */:
            gameOver = isOutOfBoundsOnGrid({ x: 0, y: -1 }, snakeHead, context);
            break;
        case 1 /* Dir.DOWN */:
            gameOver = isOutOfBoundsOnGrid({ x: 0, y: 1 }, snakeHead, context);
            break;
        case 2 /* Dir.LEFT */:
            gameOver = isOutOfBoundsOnGrid({ x: -1, y: 0 }, snakeHead, context);
            break;
        case 3 /* Dir.RIGHT */:
            gameOver = isOutOfBoundsOnGrid({ x: 1, y: 0 }, snakeHead, context);
            break;
    }
    if (snake.length === 1) {
        return;
    }
    for (let i = 1; i < snake.length; i++) { // check if snake head hit tail
        if (snake[0].getCurrentPosition().x === snake[i].getCurrentPosition().x &&
            snake[0].getCurrentPosition().y === snake[i].getCurrentPosition().y) {
            gameOver = true;
        }
    }
}
export function GameOver() {
    console.log("GAME OVER!!!");
    gameOverAnimation();
}
function gameOverAnimation() {
    if (gameOverAnimtationCounter < snake.length - 1) {
        snake[gameOverAnimtationCounter].setColors("#910303", "#5d0000");
        gameOverAnimtationCounter++;
        setTimeout(GameOver, 500);
    }
    else {
        snake[gameOverAnimtationCounter].setColors("#910303", "#5d0000");
    }
}
initGame();
//# sourceMappingURL=gameLoop.js.map