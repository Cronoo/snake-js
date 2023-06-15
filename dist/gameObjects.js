import { Circle, Rect, Text } from "./drawShapes.js";
import { gridCellSize } from "./gameLoop.js";
import { canvasGridCellCount, canvasGridCellToWorldPos } from "./gameMath.js";
export let apple;
export const snake = [];
export let startGameText;
export let endGameText;
export function initPlayObjects(context) {
    for (let i = snake.length - 1; i >= 0; i--) {
        snake.pop();
    }
    const gridCellCount = canvasGridCellCount(context, gridCellSize);
    createApple();
    createSnakeSection("green", canvasGridCellToWorldPos({ x: Math.trunc(gridCellCount.x / 2), y: Math.trunc(gridCellCount.y / 2) }, gridCellSize));
    apple.setCurrentPosition({ x: 200, y: 20 });
}
export function InitTextObjects(context) {
    startGameText = createText({ x: context.canvas.width / 2, y: context.canvas.height / 2 }, "bold 60px serif", "Ready");
    endGameText = createText({ x: context.canvas.width / 2, y: context.canvas.height / 2 }, "bold 60px serif", "GAME OVER");
}
export function createApple() {
    apple = new Circle({ x: 0, y: 0 }, gridCellSize, "#5d0000", {
        enableJoinLine: false,
        lineColor: "#910303",
        lineJoin: "round",
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}
export function createSnakeSection(color, position) {
    snake.push(new Rect(position, { x: gridCellSize, y: gridCellSize }, color, {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: "round",
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
        lineJoin: "round",
        lineWidth: 1,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}
//# sourceMappingURL=gameObjects.js.map