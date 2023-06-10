import {Circle, Rect, Shape} from "./drawShapes.js";
import {gridCellSize} from "./gameLoop.js";
import {forceMovePosition} from "./gameMovment.js";
import {Vector2} from "./gameMath.js";

export let apple: Shape;
export const snake: Shape[] = [];

export function initObjects(): void {
    createApple({x: 200, y: 200});
}

export function createApple(position : Vector2) {
    apple = new Circle(position, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
}

export function createSnakeSection(position : Vector2) {
    snake.push(
        new Rect(position, {x: gridCellSize, y: gridCellSize}, "green", {
            enableJoinLine: false,
            lineColor: "#47ff00",
            lineJoin: undefined,
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: "blue"
        })
    );
}