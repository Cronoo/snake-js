export function random(maxRandom) {
    return Math.floor(Math.random() * maxRandom) + 1;
}
export function canvasGridCellCount(context, gridCellSize) {
    const numberOfGridCellsX = (context.canvas.width - gridCellSize) / gridCellSize;
    const numberOfGridCellsY = (context.canvas.height - gridCellSize) / gridCellSize;
    return { x: numberOfGridCellsX, y: numberOfGridCellsY };
}
export function canvasGridCellToWorldPos(gridCellPosition, gridCellSize) {
    const xPos = gridCellSize * gridCellPosition.x;
    const yPos = gridCellSize * gridCellPosition.y;
    return { x: xPos, y: yPos };
}
//# sourceMappingURL=gameMath.js.map