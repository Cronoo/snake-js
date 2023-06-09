import { Circle, Rect } from "./gridBasedDrawShapes.js";
const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");
const gridCellSize = 25;
const renderTime = 1000;
let moveDir = 3 /* Dir.RIGHT */;
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
let snakeBody = [];
const apple = new Circle(-1, -1, gridCellSize, ctx, "red", {
    enableJoinLine: false,
    lineColor: "red",
    lineJoin: undefined,
    lineWidth: 2,
    shadowBlur: 0,
    shadowColor: "blue",
});
const r = new Rect(gridCellSize, gridCellSize, gridCellSize, ctx, "green", {
    enableJoinLine: false,
    lineColor: "#47ff00",
    lineJoin: undefined,
    lineWidth: 2,
    shadowBlur: 0,
    shadowColor: "blue",
});
function render() {
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // for (let i = 0; i < snakeBody.length; i++) {
    //   snakeBody[i].draw();
    // }
    apple.setMove(moveDir);
    apple.draw();
    setTimeout(render, renderTime);
}
render();
//# sourceMappingURL=index.js.map