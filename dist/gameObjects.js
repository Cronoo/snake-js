import { Circle, Rect } from "./drawShapes.js";
import { gridCellSize } from "./gameLoop.js";
export let apple;
export const snake = [];
export let objectSpawnPool;
export function initObjects(context) {
    createApple();
    createSnakeSection("green");
    snake[0].setCurrentPosition({ x: 50, y: 50 });
}
export function createApple() {
    apple = new Circle({ x: -500, y: -500 }, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}
export function createSnakeSection(color) {
    snake.push(new Rect({ x: -500, y: -500 }, { x: gridCellSize, y: gridCellSize }, color, {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    }));
}
//# sourceMappingURL=gameObjects.js.map