import { Circle, Rect, Shape } from "./gridBasedDrawShapes.js";
import { Dir } from "./dir.js";

const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");
const gridCellSize = 25;

const renderTime = 1000;

const snakeBody: Shape[] = [];
const apple: Shape = new Circle(1, 1, gridCellSize, ctx!, "red", {
  enableJoinLine: false,
  lineColor: "red",
  lineJoin: undefined,
  lineWidth: 2,
  shadowBlur: 0,
  shadowColor: "blue",
});

const r = new Rect(gridCellSize, gridCellSize, gridCellSize, ctx!, "green", {
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
  console.log("Render");
  // apple.setMove(Dir.RIGHT);
  apple.draw();
  // r.draw();
  // setTimeout(render, renderTime);
}

render();
