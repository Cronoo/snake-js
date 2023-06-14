import { Circle, Rect, Text } from "./drawShapes.js";
import { gridCellSize } from "./gameLoop.js";
export let apple;
export const snake = [];
export let startGameText;
export let endGameText;
export function initObjects(context) {
    createApple();
    createSnakeSection("green", { x: 0, y: 0 });
    apple.setCurrentPosition({ x: 200, y: 20 });
    startGameText = createText({ x: context.canvas.width / 2, y: context.canvas.height / 2 - 40 }, "bold 30px Arial", "Ready");
    endGameText = createText({ x: context.canvas.width / 2, y: context.canvas.height / 2 - 40 }, "bold 30px Arial", "GAME OVER");
}
export function createApple() {
    apple = new Circle({ x: 0, y: 0 }, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}
export function createSnakeSection(color, position) {
    snake.push(new Rect(position, { x: gridCellSize, y: gridCellSize }, color, {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    }));
}
export function createText(position, font, text) {
    return new Text(position, "black", {
        text: `${text}`,
        textBaselines: "alphabetic",
        font: font,
        textAlign: "center"
    }, {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: undefined,
        lineWidth: 1,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}
//# sourceMappingURL=gameObjects.js.map