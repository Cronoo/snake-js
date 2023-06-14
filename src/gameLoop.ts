import {initObjects, apple, snake, createSnakeSection, startGameText, endGameText} from "./gameObjects.js";
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
const renderUpdateTimer = 50;

let logicUpdateTimer = 500; // decrees for more difficulty

const minLogicUpdateTimer = 10;
const maxLogicUpdateTimer = 500;
const logicUpdateTimerDecrementAmount = 10;

let gameOverAnimationCounter = 0;
let gameOver = false;
let snakeCollidedWithSelf = false;
let snakeOutOfBounds = false;

function initGame() {
    if (context === undefined || context === null) {
        return;
    }
    logicUpdateTimer = maxLogicUpdateTimer;
    initObjects(context);
    renderUpdate(context);
    moveApple(context);
    logicUpdate(context);
}

function logicUpdate(context: CanvasRenderingContext2D) {
    if (snakeOutOfBounds || snakeCollidedWithSelf) {
        gameOver = true;
    }

    if (!gameOver) {
        snakeCollidedWithSelf = checkForSnakeOutOfBounds(context);
        moveObject(snake, gridCellSize, context);
        snakeOutOfBounds = checkForSnakeSelfCollision();
        checkForApplePickup(context);
        setTimeout(() => {
            logicUpdate(context);
        }, logicUpdateTimer);
    } else {
        GameOver(context);
    }
}

function renderUpdate(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = snake.length - 1; i >= 0; i--) {
        snake[i].draw(context);
    }
    startGameText?.draw(context);
    endGameText?.draw(context);
    apple?.draw(context);
    setTimeout(() => {
        renderUpdate(context);
    }, renderUpdateTimer);
}

function checkForSnakeOutOfBounds(context: CanvasRenderingContext2D): boolean {
    const snakeHead = snake[0];
    let outOfBounds: boolean;

    switch (moveDir) { // check if snake head hit wall
        case Dir.UP:
            outOfBounds = isOutOfBoundsOnGrid({x: 0, y: -1}, snakeHead, context);
            break;
        case Dir.DOWN:
            outOfBounds = isOutOfBoundsOnGrid({x: 0, y: 1}, snakeHead, context);
            break;
        case Dir.LEFT:
            outOfBounds = isOutOfBoundsOnGrid({x: -1, y: 0}, snakeHead, context);
            break;
        case Dir.RIGHT:
            outOfBounds = isOutOfBoundsOnGrid({x: 1, y: 0}, snakeHead, context);
            break;
    }

    return outOfBounds;
}

function checkForSnakeSelfCollision(): boolean {
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

function checkForApplePickup(context: CanvasRenderingContext2D) {
    if (snake[0].getCurrentPosition().x === apple.getCurrentPosition().x &&
        snake[0].getCurrentPosition().y === apple.getCurrentPosition().y) {
        createSnakeSection("#254d17", snake[0].getLastPosition());
        increaseDifficulty();
        moveApple(context);
    }
}

function moveApple(context: CanvasRenderingContext2D) {
    if (canvas !== undefined && canvas !== null) {
        const gridCount: Vector2 = canvasGridCellCount(context, gridCellSize);

        let canSpawn = false;
        const xPos = random(gridCount.x);
        const yPos = random(gridCount.y);

        for (let i = 0; i < snake.length; i++) {
            const snakePos = snake[i].getCurrentPosition();
            if (snakePos.x !== xPos && snakePos.y !== yPos) {
                canSpawn = true;
                console.log(`SPos x/y:${snakePos.x}/${snakePos.y} - AppPos x/y:${xPos}/${yPos}`);
            }
        }

        if (canSpawn) {
            apple.setCurrentPosition(canvasGridCellToWorldPos({x: xPos, y: yPos}, gridCellSize));
        }
    }
}

function increaseDifficulty() {
    if (logicUpdateTimer > minLogicUpdateTimer) {
        logicUpdateTimer -= logicUpdateTimerDecrementAmount;
    }
}

export function GameOver(context: CanvasRenderingContext2D) {

    gameOverAnimation();
}

function gameOverAnimation() {
    if (gameOverAnimationCounter < snake.length - 1) {
        snake[gameOverAnimationCounter].setColors("#910303", "#5d0000");
        gameOverAnimationCounter++;
        setTimeout(GameOver, 50);
    } else {
        snake[gameOverAnimationCounter].setColors("#910303", "#5d0000");
    }
}

initGame();
