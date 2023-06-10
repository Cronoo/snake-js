import {Vector2} from "./gameMath.js";
import {Rect, Shape} from "./drawShapes.js";
import {gridCellSize} from "./gameLoop.js";
import {createSnakeSection, snake} from "./gameObjects.js";
import {isOutOfBounds} from "./canvasUtility.js";

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
    
    if (e.key === "i"){
        createSnakeSection({x: 5, y: 5})
    }
});

export const enum Dir {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export function moveObject(shape: Shape[], gridCellSize: number, context : CanvasRenderingContext2D) {
    if (shape.length === 0){
        return
    }
    
    switch (moveDir) {
        case Dir.UP:
            segmentedMovement({x: 0, y: -1}, shape, gridCellSize,context);
            break;
        case Dir.DOWN:
            segmentedMovement({x: 0, y: 1}, shape, gridCellSize,context);
            break;
        case Dir.LEFT:
            segmentedMovement({x: -1, y: 0}, shape, gridCellSize,context);
            break;
        case Dir.RIGHT:
            segmentedMovement({x: 1, y: 0}, shape, gridCellSize,context);
            break;
    }
}

export function segmentedMovement(position: Vector2, shape: Shape[], gridCellSize: number, context : CanvasRenderingContext2D){
    forceMovePosition(position,shape[0],gridCellSize,context)
    
    if (shape.length === 1){
        // console.log(shape.length);
        return
    }
    
    for (let i = 1; i < shape.length; i++) {
        // forceMovePosition(shape[i-1].getLastPosition(),shape[i],gridCellSize)
    }
}

export function forceMovePosition(position: Vector2, shape: Shape, gridCellSize: number, context : CanvasRenderingContext2D) {
    if (isOutOfBounds(position,shape,context)){
        return;
    }

    shape.setCurrentPosition({
        x: shape.getCurrentPosition().x += position.x * gridCellSize,
        y: shape.getCurrentPosition().y += position.y * gridCellSize
    });
}

