import {Vector2} from "./gameMath.js";
import {Shape} from "./drawShapes.js";

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
});

export const enum Dir {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export function moveObject(shape: Shape, gridCellSize: number) {
    switch (moveDir) {
        case Dir.UP:
            forceMovePosition({x: 0, y: -1}, shape, gridCellSize);
            break;
        case Dir.DOWN:
            forceMovePosition({x: 0, y: 1}, shape, gridCellSize);
            break;
        case Dir.LEFT:
            forceMovePosition({x: -1, y: 0}, shape, gridCellSize);
            break;
        case Dir.RIGHT:
            forceMovePosition({x: 1, y: 0}, shape, gridCellSize);
            break;
    }
}

export function forceMovePosition(position: Vector2, shape: Shape, gridCellSize: number) {
    // if (shape.isOutOfBounds(position.x, position.y)){
    //     return
    // }

    shape.setPosition({
        x: shape.getPosition().x += position.x * gridCellSize,
        y: shape.getPosition().y += position.y * gridCellSize
    });
}

// isOutOfBounds(x: number, y: number): boolean {
//     return ((x * this.width) + this.position.x) > (this.context.canvas.width - this.width) ||
//         (x * this.width) + this.position.x < 0 ||
//         ((y * this.height) + this.position.y) > (this.context.canvas.height - this.height) ||
//         (y * this.height) + this.position.y < 0;
// }

