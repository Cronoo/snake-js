import {initObjects, apple, snake} from "./gameObjects.js";
import {moveObject} from "./gameMovment.js";

const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

export const gridCellSize = 25;
const refreshTime = 600;

initObjects();
gameLoop();

function gameLoop(){
  if (ctx === undefined || ctx === null){
    return;
  }
  
  moveObject(snake,gridCellSize, ctx);
  render();
  setTimeout(gameLoop, refreshTime);
}

function render() {
  if (ctx === undefined || ctx === null){
    return;
  }
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < snake.length; i++) {
    snake[i]?.draw(ctx);
  }
  
  apple?.draw(ctx);
}

