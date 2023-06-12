import {initObjects, apple, snake, createSnakeSection} from "./gameObjects.js";
import {Dir, moveDir, moveObject, segmentedMovement} from "./gameMovment.js";
import {Shape} from "./drawShapes.js";
import {isOutOfBoundsOffGrid, isOutOfBoundsOnGrid} from "./canvasUtility.js";
import {
    convertObjectWorldPosToGrid,
    canvasGridCellCount,
    random,
    Vector2,
    canvasGridCellToWorldPos
} from "./gameMath.js";

const canvas = document.querySelector("canvas");
const context = canvas?.getContext("2d");

export const gridCellSize = 25;
const renderUpdateTimer = 100;
const logicUpdateTimer = 800; // decrees for more difficulty
let gameOverAnimationCounter = 0;
let gameOver = false;

function initGame() {
    if (context === undefined || context === null) {
        return;
    }

    initObjects(context);
    renderUpdate(context);
    moveApple(context);
    logicUpdate(context);
}

function logicUpdate(context: CanvasRenderingContext2D) {

    if (!gameOver) {
        checkForGameOver(context);
        checkForApplePickup(context);
        moveObject(snake, gridCellSize, context);
        setTimeout(() => {
            logicUpdate(context);
        }, logicUpdateTimer);
    } else {
        GameOver();
    }
}

function renderUpdate(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = snake.length - 1; i >= 0; i--) {
        snake[i].draw(context);
    }
    apple?.draw(context);
    setTimeout(() => {
        renderUpdate(context);
    }, renderUpdateTimer);
}

function checkForGameOver(context: CanvasRenderingContext2D) {

    const snakeHead = snake[0];
    switch (moveDir) { // check if snake head hit wall
        case Dir.UP:
            gameOver = isOutOfBoundsOnGrid({x: 0, y: -1}, snakeHead, context);
            break;
        case Dir.DOWN:
            gameOver = isOutOfBoundsOnGrid({x: 0, y: 1}, snakeHead, context);
            break;
        case Dir.LEFT:
            gameOver = isOutOfBoundsOnGrid({x: -1, y: 0}, snakeHead, context);
            break;
        case Dir.RIGHT:
            gameOver = isOutOfBoundsOnGrid({x: 1, y: 0}, snakeHead, context);
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

function checkForApplePickup(context: CanvasRenderingContext2D) {
    if (snake[0].getCurrentPosition().x === apple.getCurrentPosition().x &&
        snake[0].getCurrentPosition().y === apple.getCurrentPosition().y) {
        createSnakeSection("#254d17", snake[0].getLastPosition());
        moveApple(context)
    }
}

function moveApple(context: CanvasRenderingContext2D) {
    if (canvas !== undefined && canvas !== null) {
        const gridCount: Vector2 = canvasGridCellCount(context, gridCellSize);

        const xPos = random(gridCount.x);
        const yPos = random(gridCount.y);

        apple.setCurrentPosition(canvasGridCellToWorldPos({x: xPos, y: yPos}, gridCellSize));
    }
}

export function GameOver() {
    console.log("GAME OVER!!!");
    gameOverAnimation();
}

function gameOverAnimation() {
    if (gameOverAnimationCounter < snake.length - 1) {
        snake[gameOverAnimationCounter].setColors("#910303", "#5d0000");
        gameOverAnimationCounter++;
        setTimeout(GameOver, 500);
    } else {
        snake[gameOverAnimationCounter].setColors("#910303", "#5d0000");
    }
}

initGame();
