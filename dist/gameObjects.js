import { Circle, Rect } from "./drawShapes.js";
import { gridCellSize } from "./gameRender.js";
export let apple;
export const snake = [];
export function initObjects() {
    apple = new Circle(1, 1, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
    snake.push(new Rect(0, 0, gridCellSize, gridCellSize, "green", {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    }));
}
//# sourceMappingURL=gameObjects.js.map