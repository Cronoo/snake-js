import {Vector2} from "./gameMath.js";
import {Rect, Shape} from "./drawShapes.js";
import {gridCellSize} from "./gameLoop.js";
import {createSnakeSection, snake} from "./gameObjects.js";
import {isOutOfBoundsOffGrid, isOutOfBoundsOnGrid} from "./canvasUtility.js";
import {isDeepStrictEqual} from "util";

export let moveDir = Dir.RIGHT;

document.addEventListener("keypress", (e) => {
    if (e.key === "a") {
        moveDir = Dir.LEFT;
    }
    if (e.key === "d") {
        moveDir = Dir.RIGHT;
    }
    if (e.key === "w") {
        moveDir = Dir.UP;
    }
    if (e.key === "s") {
        moveDir = Dir.DOWN;
    }

    if (e.key === "i") {
        createSnakeSection("green");
        console.log(snake);
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
    forceMovePositionByGrid(position, shape[0], gridCellSize, context);
    console.log(shape[0].getPositionChanged());

    if (shape.length < 2) {
        return;
    }

    for (let i = 1; i < shape.length; i++) {
        // if new position != current pos change pos
        if (shape[0].getPositionChanged()) {
            shape[i].setCurrentPosition(shape[i - 1].getLastPosition());
        }
    }
}

export function forceMovePositionByGrid(position: Vector2, shape: Shape, gridCellSize: number, context: CanvasRenderingContext2D) {
    if (isOutOfBoundsOnGrid(position, shape, context)) {
        shape.setPositionChanged(false);
        return;
    }
    shape.setPositionChanged(true);
    shape.setCurrentPosition({
        x: shape.getCurrentPosition().x + position.x * gridCellSize,
        y: shape.getCurrentPosition().y + position.y * gridCellSize
    });
}