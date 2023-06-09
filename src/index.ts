import {Circle, Rect, Shape} from "./gridBasedDrawShapes.js";
import {Dir} from "./dir.js";

const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

const gridCellSize = 25;
const renderTime = 1000;
let moveDir : Dir = Dir.RIGHT;

document.addEventListener("keypress", (e) =>{
  if (e.key === "a"){
    moveDir = Dir.LEFT;
  }
  if (e.key === "d"){
    moveDir = Dir.RIGHT;
  }
  if (e.key === "w"){
    moveDir = Dir.UP;
  }
  if (e.key === "s"){
    moveDir = Dir.DOWN;
  }

})

let snakeBody: Shape[] = [];
const apple: Shape = new Circle(-1, -1, gridCellSize, ctx!, "red", {
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
  
  apple.setMove(moveDir);
  apple.draw();

  setTimeout(render, renderTime);
}

render();
