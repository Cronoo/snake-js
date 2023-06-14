import {convertObjectWorldPosToGrid, Vector2} from "./gameMath.js";
import {Rect, Shape} from "./drawShapes.js";
import {GameOver, gridCellSize} from "./gameLoop.js";
import {createSnakeSection, snake} from "./gameObjects.js";
import {isOutOfBoundsOffGrid, isOutOfBoundsOnGrid} from "./canvasUtility.js";

export let moveDir = Dir.RIGHT;
let lastMoveDir: Dir;

document.addEventListener("keypress", (e) => {
    lastMoveDir = moveDir;

    if (e.key === "a" && moveDir !== Dir.RIGHT) {
        moveDir = Dir.LEFT;
    }
    if (e.key === "d" && moveDir !== Dir.LEFT) {
        moveDir = Dir.RIGHT;
    }
    if (e.key === "w" && moveDir !== Dir.DOWN) {
        moveDir = Dir.UP;
    }
    if (e.key === "s" && moveDir !== Dir.UP) {
        moveDir = Dir.DOWN;
    }

    if (e.key === "i") {
        createSnakeSection("#254d17", snake[0].getLastPosition());
    }
});

export const enum Dir {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export function moveObject(shape: Shape[], gridCellSize: number, context: CanvasRenderingContext2D) {
    if (shape.length === 0) {
        return;
    }

    switch (moveDir) {
        case Dir.UP:
            segmentedMovement({x: 0, y: -1}, shape, gridCellSize, context);
            break;
        case Dir.DOWN:
            segmentedMovement({x: 0, y: 1}, shape, gridCellSize, context);
            break;
        case Dir.LEFT:
            segmentedMovement({x: -1, y: 0}, shape, gridCellSize, context);
            break;
        case Dir.RIGHT:
            segmentedMovement({x: 1, y: 0}, shape, gridCellSize, context);
            break;
    }
}

export function segmentedMovement(position: Vector2, shape: Shape[], gridCellSize: number, context: CanvasRenderingContext2D) {
    if (!(forceMovePositionByGrid(position, shape[0], gridCellSize, context))){
        return;
    }
    

    if (shape.length < 2) {
        return;
    }
    for (let i = 1; i < shape.length; i++) {
        if (shape[0].getPositionChanged()) {
            shape[i].setCurrentPosition(shape[i - 1].getLastPosition());
        }
    }
}

export function forceMovePositionByGrid(position: Vector2, shape: Shape, gridCellSize: number, context: CanvasRenderingContext2D):boolean {
    if (isOutOfBoundsOnGrid(position, shape, context)) {
        return false;
    }

    if (snake.length > 1) {
        const firstNonHeadSnakeSegment = snake[1].getCurrentPosition();
        if (firstNonHeadSnakeSegment.x === shape.getCurrentPosition().x + position.x * gridCellSize &&
            firstNonHeadSnakeSegment.y === shape.getCurrentPosition().y + position.y * gridCellSize) {
            moveDir = lastMoveDir;
            return false;
        }
    }

    shape.setPositionChanged(true);
    shape.setCurrentPosition({
        x: shape.getCurrentPosition().x + position.x * gridCellSize,
        y: shape.getCurrentPosition().y + position.y * gridCellSize
    });

    return true;
    // console.log(`${shape.getCurrentPosition().x} / ${shape.getCurrentPosition().y}`);
}

