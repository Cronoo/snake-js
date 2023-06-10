export function isOutOfBoundsOnGrid(positon, shape, context) {
    return ((positon.x * shape.getDimensions().x) + shape.getCurrentPosition().x) >
        (context.canvas.width - shape.getDimensions().x) ||
        (positon.x * shape.getDimensions().x) + shape.getCurrentPosition().x < 0 ||
        ((positon.y * shape.getDimensions().y) + shape.getCurrentPosition().y) >
            (context.canvas.height - shape.getDimensions().y) ||
        (positon.y * shape.getDimensions().y) + shape.getCurrentPosition().y < 0;
}
export function isOutOfBoundsOffGrid(shape, context) {
    return ((shape.getDimensions().x) + shape.getCurrentPosition().x) >
        (context.canvas.width - shape.getDimensions().x) ||
        (shape.getDimensions().x) + shape.getCurrentPosition().x < 0 ||
        ((shape.getDimensions().y) + shape.getCurrentPosition().y) >
            (context.canvas.height - shape.getDimensions().y) ||
        (shape.getDimensions().y) + shape.getCurrentPosition().y < 0;
}
//# sourceMappingURL=canvasUtility.js.map