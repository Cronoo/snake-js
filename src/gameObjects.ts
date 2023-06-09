import {Circle, Rect, Shape} from "./drawShapes.js";
import {gridCellSize} from "./gameRender.js";
import {forceMovePosition} from "./gameMovment.js";

export let apple: Shape;
export const snake: Shape[] = [];

export function initObjects(): void {
    apple = new Circle(0, 0, gridCellSize, "red", {
        enableJoinLine: false,
        lineColor: "red",
        lineJoin: undefined,
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: "blue"
    });
    forceMovePosition({x: 1, y: 1},apple, gridCellSize);
    
    snake.push(
        new Rect(0, 0, gridCellSize, gridCellSize, "green", {
            enableJoinLine: false,
            lineColor: "#47ff00",
            lineJoin: undefined,
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: "blue"
        })
    );
}