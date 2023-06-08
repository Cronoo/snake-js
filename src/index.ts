import { Rect, Circle } from "./drawShapes.js";
import { Dir } from "./dir.js";

const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");
const gridCellSize = 25;

if (ctx != undefined) {
  ctx.strokeStyle = "white";
}

const c = new Circle(50, 50, gridCellSize, ctx!, "", {
  enableJoinLine: false,
  lineColor: "#00a2fc",
  lineJoin: undefined,
  lineWidth: 2,
  shadowBlur: 0,
  shadowColor: "blue",
});

const r = new Rect(100, 50, gridCellSize, ctx!, "", {
  enableJoinLine: false,
  lineColor: "#47ff00",
  lineJoin: undefined,
  lineWidth: 2,
  shadowBlur: 0,
  shadowColor: "blue",
});

function testDraw() {
  // for (let i = 0; i < 100; i++) {

  r.setFillColor("white");
  r.draw();

  c.setFillColor("white");
  c.draw();
  // }
}

testDraw();
