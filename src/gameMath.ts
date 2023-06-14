export type Vector2 = {
    x: number;
    y: number;
}

export function random(maxRandom: number): number {
    return Math.floor(Math.random() * maxRandom) + 1;
}

export function canvasGridCellCount(context: CanvasRenderingContext2D, gridCellSize: number): Vector2 {
    const numberOfGridCellsX = (context.canvas.width - gridCellSize) / gridCellSize;
    const numberOfGridCellsY = (context.canvas.height - gridCellSize) / gridCellSize;

    return {x: numberOfGridCellsX, y: numberOfGridCellsY};
}

export function canvasGridCellToWorldPos(gridCellPosition: Vector2, gridCellSize: number): Vector2 {
    const xPos = gridCellSize * gridCellPosition.x;
    const yPos = gridCellSize * gridCellPosition.y;

    return {x: xPos, y: yPos};
}