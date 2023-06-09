import {initObjects, apple, snake} from "./gameObjects.js";

const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

export const gridCellSize = 25;
const renderTime = 600;

initObjects();

function render() {
  if (ctx === undefined || ctx === null){
    return;
  }
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < snake.length; i++) {
    snake[i].draw(ctx);
  }
  
  apple.draw(ctx);

  setTimeout(render, renderTime);
}

// render();
