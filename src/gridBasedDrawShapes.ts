import { Dir } from "./dir.js";

export type lineInfo = {
  lineColor: string;
  lineWidth: number;
  lineJoin: CanvasLineJoin | undefined;
  enableJoinLine: boolean;
  shadowColor: string;
  shadowBlur: number;
};

export abstract class Shape {
  protected xPos = 0;
  protected yPos = 0;
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
    this.xPos = x;
    this.yPos = y;
    this.gridCellSize = gridCellSize;
    this.context = ctx;
    this.fillColor = fillColor !== null ? fillColor : this.noColor;
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
  }

  protected abstract move(x: number, y: number): void;
  abstract draw(): void;
  public setLineInfo(lineInfo: lineInfo) {
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
  }
  public setFillColor(fillColor: string) {
    this.fillColor = fillColor;
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

  protected move(x: number, y: number) {
    this.xPos += x;
    this.yPos += y;
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
        this.xPos,
        this.yPos,
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
        this.xPos,
        this.yPos,
        this.gridCellSize,
        this.gridCellSize
      );
      this.context.closePath();
      this.context.fill();
    }
  }
}

export class Circle extends Shape {
  private xPosOffset = this.gridCellSize / 2;
  private yPosOffset = this.gridCellSize / 2;
  private gridCellSizeOffset = this.gridCellSize / 2;
  draw(): void {
    this.drawStrokeArc();
  }

  protected move(x: number, y: number) {
    this.xPos += x;
    this.yPos += y;
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
        (this.xPos = this.xPos * this.gridCellSize + this.xPosOffset),
        (this.yPos = this.yPos * this.gridCellSize + this.yPosOffset),
        this.gridCellSizeOffset,
        0,
        2 * Math.PI
      );

      this.context.fillStyle = this.fillColor;
      this.context.fill();
      this.context.closePath();
      this.context.stroke();
      console.log(`${this.xPos} / ${this.yPos}`);
    }
  }
}
