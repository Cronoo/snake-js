import {Circle, Rect, Shape} from "./drawShapes.js";
import {gridCellSize} from "./gameLoop.js";
import {forceMovePositionByGrid} from "./gameMovment.js";
import {Vector2} from "./gameMath.js";

export let apple: Shape;
export const snake: Shape[] = [];
export let objectSpawnPool : Shape;

export function initObjects(context : CanvasRenderingContext2D): void {
    createApple();
    createSnakeSection("green");
    snake[0].setCurrentPosition({x: 50, y: 50});
}

export function createApple() {
    apple = new Circle({x: -500, y: -500}, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}

export function createSnakeSection(color : string) {
    snake.push(new Rect({x: -500, y: -500}, {x: gridCellSize, y: gridCellSize}, color, {
            enableJoinLine: false,
            lineColor: "#47ff00",
            lineJoin: undefined,
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: "blue"
        }))
}