import { createSnakeSection, snake } from "./gameObjects.js";
import { isOutOfBoundsOnGrid } from "./canvasUtility.js";
export let moveDir = 3 /* Dir.RIGHT */;
document.addEventListener("keypress", (e) => {
    if (e.key === "a" && moveDir !== 3 /* Dir.RIGHT */) {
        moveDir = 2 /* Dir.LEFT */;
    }
    if (e.key === "d" && moveDir !== 2 /* Dir.LEFT */) {
        moveDir = 3 /* Dir.RIGHT */;
    }
    if (e.key === "w" && moveDir !== 1 /* Dir.DOWN */) {
        moveDir = 0 /* Dir.UP */;
    }
    if (e.key === "s" && moveDir !== 0 /* Dir.UP */) {
        moveDir = 1 /* Dir.DOWN */;
    }
    if (e.key === "i") {
        createSnakeSection("#254d17", snake[0].getLastPosition());
    }
});
export function moveObject(shape, gridCellSize, context) {
    if (shape.length === 0) {
        return;
    }
    switch (moveDir) {
        case 0 /* Dir.UP */:
            segmentedMovement({ x: 0, y: -1 }, shape, gridCellSize, context);
            break;
        case 1 /* Dir.DOWN */:
            segmentedMovement({ x: 0, y: 1 }, shape, gridCellSize, context);
            break;
        case 2 /* Dir.LEFT */:
            segmentedMovement({ x: -1, y: 0 }, shape, gridCellSize, context);
            break;
        case 3 /* Dir.RIGHT */:
            segmentedMovement({ x: 1, y: 0 }, shape, gridCellSize, context);
            break;
    }
}
export function segmentedMovement(position, shape, gridCellSize, context) {
    forceMovePositionByGrid(position, shape[0], gridCellSize, context);
    if (shape.length < 2) {
        return;
    }
    for (let i = 1; i < shape.length; i++) {
        if (shape[0].getPositionChanged()) {
            shape[i].setCurrentPosition(shape[i - 1].getLastPosition());
        }
    }
}
export function forceMovePositionByGrid(position, shape, gridCellSize, context) {
    if (isOutOfBoundsOnGrid(position, shape, context)) {
        return;
    }
    shape.setPositionChanged(true);
    shape.setCurrentPosition({
        x: shape.getCurrentPosition().x + position.x * gridCellSize,
        y: shape.getCurrentPosition().y + position.y * gridCellSize
    });
    // console.log(`${shape.getCurrentPosition().x} / ${shape.getCurrentPosition().y}`);
}
//# sourceMappingURL=gameMovment.js.map