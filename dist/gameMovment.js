import { createSnakeSection } from "./gameObjects.js";
import { isOutOfBounds } from "./canvasUtility.js";
export let moveDir = 3 /* Dir.RIGHT */;
document.addEventListener("keypress", (e) => {
    if (e.key === "a") {
        moveDir = 2 /* Dir.LEFT */;
    }
    if (e.key === "d") {
        moveDir = 3 /* Dir.RIGHT */;
    }
    if (e.key === "w") {
        moveDir = 0 /* Dir.UP */;
    }
    if (e.key === "s") {
        moveDir = 1 /* Dir.DOWN */;
    }
    if (e.key === "i") {
        createSnakeSection({ x: 5, y: 5 });
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
    forceMovePosition(position, shape[0], gridCellSize, context);
    if (shape.length === 1) {
        // console.log(shape.length);
        return;
    }
    for (let i = 1; i < shape.length; i++) {
        // forceMovePosition(shape[i-1].getLastPosition(),shape[i],gridCellSize)
    }
}
export function forceMovePosition(position, shape, gridCellSize, context) {
    if (isOutOfBounds(position, shape, context)) {
        return;
    }
    shape.setCurrentPosition({
        x: shape.getCurrentPosition().x += position.x * gridCellSize,
        y: shape.getCurrentPosition().y += position.y * gridCellSize
    });
}
//# sourceMappingURL=gameMovment.js.map