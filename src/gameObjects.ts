import {Circle, Rect, Shape} from "./drawShapes.js";
import {gridCellSize} from "./gameLoop.js";
import {forceMovePositionByGrid} from "./gameMovment.js";
import {Vector2} from "./gameMath.js";

export let apple: Shape;
export const snake: Shape[] = [];
export let objectSpawnPool : Shape;

export function initObjects(context : CanvasRenderingContext2D): void {
    createApple();
    createSnakeSection("green", {x: 0, y: 0});
}

export function createApple() {
    apple = new Circle({x: 0, y: 0}, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}

export function createSnakeSection(color : string, position : Vector2) {
    snake.push(new Rect(position, {x: gridCellSize, y: gridCellSize}, color, {
            enableJoinLine: false,
            lineColor: "#47ff00",
            lineJoin: undefined,
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: "blue"
        }))
}