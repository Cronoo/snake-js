import {initObjects, apple, snake} from "./gameObjects.js";
import {moveObject} from "./gameMovment.js";

const canvas = document.querySelector("canvas");
const context = canvas?.getContext("2d");

export const gridCellSize = 25;
const renderUpdateTimer = 100;
const logicUpdateTimer = 1000; // decrees for more difficulty

function initGame() {
    if (context === undefined || context === null) {
        return;
    }

    initObjects(context);
    renderUpdate(context);
    logicUpdate(context);
}

function logicUpdate(context: CanvasRenderingContext2D) {
    moveObject(snake, gridCellSize, context);
    setTimeout(() => {
        logicUpdate(context);
    }, logicUpdateTimer);
}

function renderUpdate(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = snake.length-1; i >= 0; i--) {
        snake[i].draw(context);
    }

    setTimeout(() => {
        renderUpdate(context);
    }, renderUpdateTimer);
}

initGame();
