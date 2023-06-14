import {
    initPlayObjects,
    apple,
    snake,
    createSnakeSection,
    startGameText,
    endGameText,
    InitTextObjects
} from "./gameObjects.js";
import {Dir, moveDir, moveObject, resetMoveDir} from "./gameMovment.js";
import {isOutOfBoundsOnGrid} from "./canvasUtility.js";
import {
    canvasGridCellCount,
    random,
    Vector2,
    canvasGridCellToWorldPos
} from "./gameMath.js";

const canvas = document.querySelector("canvas");
const context = canvas?.getContext("2d");
const startBtn = document.querySelector("button");
const scoreCounter = document.querySelector("#score");

const timeOutIDs: NodeJS.Timeout[] = [];

export const gridCellSize = 25;
const renderUpdateTimer = 50;

let logicUpdateTimer = 500; // decrees for more difficulty

const minLogicUpdateTimer = 10;
const maxLogicUpdateTimer = 500;
const logicUpdateTimerDecrementAmount = 10;

let gameOverAnimationCounter = 0;
let currentGameStat: gameState = gameState.waitingToStart;
let score  = 0;
const enum gameState {
    waitingToStart,
    playing,
    gameOver
}

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
    currentGameStat = gameState.waitingToStart;
    InitTextObjects(context);
}

function reset(context: CanvasRenderingContext2D) {
    timeOutIDs.forEach((timer) => {
        clearTimeout(timer);
    });

    for (let i = timeOutIDs.length - 1; i >= 0; i--) {
        timeOutIDs.pop();
    }
    
    resetMoveDir();
    currentGameStat = gameState.playing;
    logicUpdateTimer = maxLogicUpdateTimer;
    initPlayObjects(context);
}

function logicUpdate(context: CanvasRenderingContext2D) {
    if (currentGameStat === gameState.playing) {
        if (checkForSnakeOutOfBounds(context)) {
            currentGameStat = gameState.gameOver;
        }
        moveObject(snake, gridCellSize, context);
        if (checkForSnakeSelfCollision()) {
            currentGameStat = gameState.gameOver;
        }
        checkForApplePickup(context);

        timeOutIDs.push(setTimeout(() => {
            logicUpdate(context);
        }, logicUpdateTimer));
    } else {
        GameOver();
    }
}

function renderUpdate() {
    if (context === undefined || context === null) {
        return;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (currentGameStat === gameState.playing || currentGameStat === gameState.gameOver) {
        for (let i = snake.length - 1; i >= 0; i--) {
            snake[i]?.draw(context);
        }
        apple?.draw(context);
    }

    if (currentGameStat === gameState.waitingToStart) {
        startGameText?.draw(context);
    }

    if (currentGameStat === gameState.gameOver) {
        endGameText?.draw(context);
    }

    setTimeout(() => {
        renderUpdate();
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
        updateScore(snake.length)
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

export function GameOver() {
    currentGameStat = gameState.gameOver;
    gameOverAnimation();
}

function gameOverAnimation() {
    if (currentGameStat !== gameState.gameOver) {
        return;
    }
    
    if (gameOverAnimationCounter < snake.length) {
        snake[gameOverAnimationCounter].setColors("#910303", "#5d0000");
        gameOverAnimationCounter++;
        setTimeout(gameOverAnimation, 50);
    } else {
        snake[0].setColors("#910303", "#5d0000");
    }
}

function updateScore(add : number) {
    score += add;
    if (scoreCounter !== null){
        scoreCounter.textContent = `Score: ${score}`;
    }
}

initPreGameObjects();
renderUpdate();
