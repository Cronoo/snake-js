import { Circle, Rect } from "./drawShapes.js";
import { gridCellSize } from "./gameLoop.js";
export let apple;
export const snake = [];
export function initObjects() {
    createApple({ x: 200, y: 200 });
}
export function createApple(position) {
    apple = new Circle(position, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}
export function createSnakeSection(position) {
    snake.push(new Rect(position, { x: gridCellSize, y: gridCellSize }, "green", {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    }));
}
//# sourceMappingURL=gameObjects.js.map