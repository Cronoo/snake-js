export let moveDir = 3 /* Dir.RIGHT */;
document.addEventListener("keypress", (e) => {
    if (e.key === "a") {
        moveDir = 2 /* Dir.LEFT */;
    }
    if (e.key === "d") {
        moveDir = 3 /* Dir.RIGHT */;
    }
    if (e.key === "w") {
        moveDir = 0 /* Dir.UP */;
    }
    if (e.key === "s") {
        moveDir = 1 /* Dir.DOWN */;
    }
});
export function moveObject(shape, gridCellSize) {
    switch (moveDir) {
        case 0 /* Dir.UP */:
            move({ x: 0, y: -1 }, shape, gridCellSize);
            break;
        case 1 /* Dir.DOWN */:
            move({ x: 0, y: 1 }, shape, gridCellSize);
            break;
        case 2 /* Dir.LEFT */:
            move({ x: -1, y: 0 }, shape, gridCellSize);
            break;
        case 3 /* Dir.RIGHT */:
            move({ x: 1, y: 0 }, shape, gridCellSize);
            break;
    }
}
function move(position, shape, gridCellSize) {
    // if (shape.isOutOfBounds(position.x, position.y)){
    //     return
    // }
    shape.setPosition({
        x: shape.getPosition().x += position.x * gridCellSize,
        y: shape.getPosition().y += position.y * gridCellSize
    });
}
// isOutOfBounds(x: number, y: number): boolean {
//     return ((x * this.width) + this.position.x) > (this.context.canvas.width - this.width) ||
//         (x * this.width) + this.position.x < 0 ||
//         ((y * this.height) + this.position.y) > (this.context.canvas.height - this.height) ||
//         (y * this.height) + this.position.y < 0;
// }
//# sourceMappingURL=gameMovment.js.map