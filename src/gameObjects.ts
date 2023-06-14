import {Circle, Rect, Shape, Text} from "./drawShapes.js";
import {gridCellSize} from "./gameLoop.js";
import {forceMovePositionByGrid} from "./gameMovment.js";
import {canvasGridCellCount, canvasGridCellToWorldPos, Vector2} from "./gameMath.js";

export let apple: Shape;
export const snake: Shape[] = [];
export let startGameText: Shape;
export let endGameText: Shape;


export function initPlayObjects(context: CanvasRenderingContext2D): void {
    for (let i = snake.length -1; i >= 0 ; i--) {
        snake.pop()
    }
    const gridCellCount = canvasGridCellCount(context, gridCellSize)

    createApple();
    createSnakeSection("green", canvasGridCellToWorldPos({x: Math.trunc(gridCellCount.x / 2), y: Math.trunc(gridCellCount.y /2) }, gridCellSize));
    apple.setCurrentPosition({x: 200, y: 20});
}

export function InitTextObjects(context: CanvasRenderingContext2D) {
    startGameText = createText({x: context.canvas.width / 2, y: context.canvas.height / 2 - 60}, "bold 60px Arial", "Ready");
    endGameText = createText({x: context.canvas.width / 2, y: context.canvas.height / 2 - 60}, "bold 60px Arial", "GAME OVER");
}

export function createApple() {
    apple = new Circle({x: 0, y: 0}, gridCellSize, "#5d0000", {
        enableJoinLine: false,
        lineColor: "#910303",
        lineJoin: "round",
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}

export function createSnakeSection(color: string, position: Vector2) {
    snake.push(new Rect(position, {x: gridCellSize, y: gridCellSize}, color, {
        enableJoinLine: false,
        lineColor: "#47ff00",
        lineJoin: "round",
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    }));
}

export function createText(position: Vector2, font: string, text: string): Shape {
    return new Text(position, "black",
        {
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