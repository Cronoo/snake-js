import {Vector2} from "./gameMath.js";
import {Shape} from "./drawShapes.js";

export function isOutOfBounds(positon : Vector2, shape : Shape, context : CanvasRenderingContext2D): boolean {
    return ((positon.x * shape.getDimensions().x) + shape.getCurrentPosition().x) > 
        (context.canvas.width - shape.getDimensions().x) ||
        (positon.x * shape.getDimensions().x) + shape.getCurrentPosition().x < 0 ||
        ((positon.y * shape.getDimensions().y) + shape.getCurrentPosition().y) > 
        (context.canvas.height - shape.getDimensions().y) ||
        (positon.y * shape.getDimensions().y) + shape.getCurrentPosition().y < 0;
}
