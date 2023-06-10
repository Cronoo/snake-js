import {Vector2} from "./gameMath.js";

export type lineInfo = {
  lineColor: string;
  lineWidth: number;
  lineJoin: CanvasLineJoin | undefined;
  enableJoinLine: boolean;
  shadowColor: string;
  shadowBlur: number;
};

export abstract class Shape {
  protected position :Vector2 = {x: 0, y: 0}
  protected lastPosition :Vector2 = {x: 0, y: 0}
  protected dimension : Vector2 = {x: 0, y: 0};
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

  protected constructor(
    fillColor: string | null,
    lineInfo?: lineInfo
  ) {
    this.fillColor = fillColor !== null ? fillColor : this.noColor;
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
  }
  
  abstract draw(context: CanvasRenderingContext2D): void;
  public getDimensions() : Vector2{
    return this.dimension
  };
  
  public getCurrentPosition() : Vector2{
    return this.position;
  }
  
  public getLastPosition() : Vector2{
    return this.lastPosition;
  }

  public setCurrentPosition(position : Vector2){
    if (this.lastPosition.y !== this.position.y ||
        this.lastPosition.x !== this.position.x){
      this.lastPosition = this.position;
    }
    this.position = position;
  }
  
  public setLineInfo(lineInfo: lineInfo) {
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
  }
  public setFillColor(fillColor: string) {
    this.fillColor = fillColor;
  }
}

export class Rect extends Shape {
  
  constructor(
      position : Vector2,
      dimension : Vector2,
      fillColor: string | null,
      lineInfo?: lineInfo
  )
  {
    super( fillColor, lineInfo);
    this.setCurrentPosition({
      x: position.x * dimension.x,
      y: position.y * dimension.y
    })
    
    this.dimension = dimension;
  }
  
  draw(context: CanvasRenderingContext2D): void {
    if (context === undefined) {
      console.log("ERROR NO CANVAS CONTEXT ON SHAPE");
      return;
    }

    this.drawFillRect(context);
    this.drawStrokeRect(context);
  }
  
  private drawStrokeRect(context: CanvasRenderingContext2D) {
    if (this.lineInfo.lineColor !== this.noColor) {
      context.beginPath();

      context.shadowColor = this.lineInfo.shadowColor;
      context.shadowBlur = this.lineInfo.shadowBlur;
      this.lineInfo.lineJoin !== undefined
        ? (context.lineJoin = this.lineInfo.lineJoin)
        : 0;
      context.lineWidth = this.lineInfo.lineWidth;
      context.strokeStyle = this.lineInfo.lineColor;

      context.strokeRect(
        this.position.x,
        this.position.y,
          this.dimension.x,
          this.dimension.y
      );

      context.closePath();
      context.stroke();
    }
  }

  private drawFillRect(context: CanvasRenderingContext2D) {
    if (this.fillColor !== this.noColor) {
      context.fillStyle = this.fillColor;

      context.beginPath();
      context.rect(
        this.position.x,
        this.position.y,
          this.dimension.x,
          this.dimension.y
      );
      context.closePath();
      context.fill();
    }
  }
}

export class Circle extends Shape {
  
  constructor(
      position : Vector2,
      size : number,
      fillColor: string | null,
      lineInfo?: lineInfo
  )
  {
    super(fillColor, lineInfo);
    this.setCurrentPosition({
      x: position.x,
      y: position.y
    })
    this.dimension.x = size / 2;
    this.dimension.y = size / 2;
  }

  draw(context: CanvasRenderingContext2D): void{
    this.drawStrokeArc(context);
  }
  
  private drawStrokeArc(context: CanvasRenderingContext2D) {
    if (this.lineInfo.lineColor !== this.noColor) {
      context.beginPath();

      context.shadowColor = this.lineInfo.shadowColor;
      context.shadowBlur = this.lineInfo.shadowBlur;
      this.lineInfo.lineJoin !== undefined
        ? (context.lineJoin = this.lineInfo.lineJoin)
        : 0;
      context.lineWidth = this.lineInfo.lineWidth;
      context.strokeStyle = this.lineInfo.lineColor;

      context.arc(
        this.position.x + this.dimension.x,
        this.position.y + this.dimension.x,
          this.dimension.x,
        0,
        2 * Math.PI
      );

      context.fillStyle = this.fillColor;
      context.fill();
      context.closePath();
      context.stroke();
    }
  }
}
