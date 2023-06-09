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
  
  public getPosition() : Vector2{
    return this.position;
  } 
  
  public setPosition(position : Vector2){
    this.position.x = position.x;
    this.position.y = position.y;
  }
  
  public setLineInfo(lineInfo: lineInfo) {
    this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
  }
  public setFillColor(fillColor: string) {
    this.fillColor = fillColor;
  }
}

export class Rect extends Shape {
  private width = 0;
  private height = 0;
  
  constructor(
      xPos: number,
      yPos: number,
      width : number,
      height : number,
      fillColor: string | null,
      lineInfo?: lineInfo
  )
  {
    super( fillColor, lineInfo);
    this.position.x = xPos * width;
    this.position.y = yPos * height;
    this.width = width;
    this.height = height;
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
        this.width,
        this.height
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
          this.width,
          this.height
      );
      context.closePath();
      context.fill();
    }
  }

}

export class Circle extends Shape {
  private size = 0; 
  constructor(
      xPos: number,
      yPos: number,
      size : number,
      fillColor: string | null,
      lineInfo?: lineInfo
  )
  {
    super(fillColor, lineInfo);
    this.position.x = xPos;// * size;
    this.position.y = yPos;// * size;
    this.size = size / 2;
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
      console.log(this.position);
      context.arc(
        this.position.x + this.size,
        this.position.y + this.size,
        this.size,
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
