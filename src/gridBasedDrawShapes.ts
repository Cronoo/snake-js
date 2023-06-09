import { Dir } from "./dir.js";

export type lineInfo = {
  lineColor: string;
  lineWidth: number;
  lineJoin: CanvasLineJoin | undefined;
  enableJoinLine: boolean;
  shadowColor: string;
  shadowBlur: number;
};

export type Vector2 = {
  x:number; 
  y:number;
}

export abstract class Shape {
  protected position :Vector2 = {x: 0, y: 0}
  protected readonly gridCellSize: number = 0;
  protected readonly context;
  protected noColor = "";
  protected fillColor = this.noColor;

  protected lineInfo: lineInfo = {
    lineColor: this.noColor,
    lineWidth: 1,
    lineJoin: undefined,
    enableJoinLine: false,
    shadowBlur: 0,
    shadowColor: this.noColor,
  };

  constructor(
    x: number,
    y: number,
    gridCellSize: number,
    ctx: CanvasRenderingContext2D,
    fillColor: string | null,
    lineInfo?: lineInfo
  ) {
    this.position.x = x * gridCellSize;
    this.position.y = y * gridCellSize;
    this.gridCellSize = gridCellSize;
    this.context = ctx;
    this.fillColor = fillColor !== null ? fillColor : this.noColor;
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    
    if (this.isOutOfBounds(x, y)){
      this.position.x = 0;
      this.position.y = 0;
      console.log("Shape Out of Bounds Setting to x:0 y:0");
    }
  }
  
  abstract draw(): void;
  
  public getPosition() : Vector2{
    return this.position;
  } 
  
  public setLineInfo(lineInfo: lineInfo) {
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
  }
  public setFillColor(fillColor: string) {
    this.fillColor = fillColor;
  }

  isOutOfBounds(x: number, y: number): boolean {
    return ((x * this.gridCellSize) + this.position.x) > (this.context.canvas.width - this.gridCellSize) ||
        (x * this.gridCellSize) + this.position.x < 0 ||
        ((y * this.gridCellSize) + this.position.y) > (this.context.canvas.height - this.gridCellSize) ||
        (y * this.gridCellSize) + this.position.y < 0;
  }
  
  public setMove(dir: Dir) {
    switch (dir) {
      case Dir.UP:
        this.move(0, -1);
        break;
      case Dir.DOWN:
        this.move(0, 1);
        break;
      case Dir.LEFT:
        this.move(-1, 0);
        break;
      case Dir.RIGHT:
        this.move(1, 0);
        break;
    }
  }

  protected move(x: number, y: number) {
    if (this.isOutOfBounds(x, y)){
      return
    }

    this.position.x += x * this.gridCellSize;
    this.position.y += y * this.gridCellSize;
  }
}

export class Rect extends Shape {
  public draw() {
    if (this.context === undefined) {
      console.log("ERROR NO CANVAS CONTEXT ON SHAPE");
      return;
    }

    this.drawFillRect();
    this.drawStrokeRect();
  }
  
  private drawStrokeRect() {
    if (this.lineInfo.lineColor !== this.noColor) {
      this.context.beginPath();

      this.context.shadowColor = this.lineInfo.shadowColor;
      this.context.shadowBlur = this.lineInfo.shadowBlur;
      this.lineInfo.lineJoin !== undefined
        ? (this.context.lineJoin = this.lineInfo.lineJoin)
        : 0;
      this.context.lineWidth = this.lineInfo.lineWidth;
      this.context.strokeStyle = this.lineInfo.lineColor;

      this.context.strokeRect(
        this.position.x,
        this.position.y,
        this.gridCellSize,
        this.gridCellSize
      );

      this.context.closePath();
      this.context.stroke();
    }
  }

  private drawFillRect() {
    if (this.fillColor !== this.noColor) {
      this.context.fillStyle = this.fillColor;

      this.context.beginPath();
      this.context.rect(
        this.position.x,
        this.position.y,
        this.gridCellSize,
        this.gridCellSize
      );
      this.context.closePath();
      this.context.fill();
    }
  }
}

export class Circle extends Shape {
  private posOffset = this.gridCellSize / 2;
  private gridCellSizeOffset = this.gridCellSize / 2;
  draw(): void {
    this.drawStrokeArc();
  }
  
  private drawStrokeArc() {
    if (this.lineInfo.lineColor !== this.noColor) {
      this.context.beginPath();

      this.context.shadowColor = this.lineInfo.shadowColor;
      this.context.shadowBlur = this.lineInfo.shadowBlur;
      this.lineInfo.lineJoin !== undefined
        ? (this.context.lineJoin = this.lineInfo.lineJoin)
        : 0;
      this.context.lineWidth = this.lineInfo.lineWidth;
      this.context.strokeStyle = this.lineInfo.lineColor;
      
      this.context.arc(
        this.position.x + this.posOffset,
        this.position.y + this.posOffset,
        this.gridCellSizeOffset,
        0,
        2 * Math.PI
      );

      this.context.fillStyle = this.fillColor;
      this.context.fill();
      this.context.closePath();
      this.context.stroke();
    }
  }
}
