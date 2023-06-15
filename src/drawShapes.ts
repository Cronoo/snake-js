import {Vector2} from "./gameMath.js";

export type LineInfo = {
    lineColor: string;
    lineWidth: number;
    lineJoin: CanvasLineJoin;
    enableJoinLine: boolean;
    shadowColor: string;
    shadowBlur: number;
};

export type TextInfo = {
    font: string;
    textAlign: "left" | "center" | "right" | "start" | "end";
    textBaselines: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";
    text:string;
};

export abstract class Shape {
    protected positionChanged = false;
    protected position: Vector2 = {x: 0, y: 0};
    protected lastPosition: Vector2 = {x: 0, y: 0};
    protected dimension: Vector2 = {x: 0, y: 0};
    protected noColor = "";
    protected fillColor = this.noColor;

    protected lineInfo: LineInfo = {
        lineColor: this.noColor,
        lineWidth: 1,
        lineJoin: "round",
        enableJoinLine: false,
        shadowBlur: 0,
        shadowColor: this.noColor
    };

    protected constructor(
        fillColor: string | null,
        lineInfo?: LineInfo
    ) {
        this.fillColor = fillColor !== null ? fillColor : this.noColor;
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }

    abstract draw(context: CanvasRenderingContext2D): void;

    public getDimensions(): Vector2 {
        return {...this.dimension};
    };

    public getCurrentPosition(): Vector2 {
        return {...this.position};
    }

    public getLastPosition(): Vector2 {
        return {...this.lastPosition};
    }

    public getPositionChanged(): boolean {
        return this.positionChanged;
    }

    public setColors(lineColor: string, fillColor: string) {
        if (lineColor.length !== 0) {
            this.lineInfo.lineColor = lineColor;
        }

        if (fillColor.length !== 0) {
            this.fillColor = fillColor;
        }
    }

    public setPositionChanged(changed: boolean) {
        this.positionChanged = changed;
    }

    public setCurrentPosition(position: Vector2) {
        if (this.lastPosition.y !== this.position.y ||
            this.lastPosition.x !== this.position.x) {
            this.lastPosition = {...this.position};
        }

        if (this.position.y !== position.y ||
            this.position.x !== position.x) {
            this.position = {...position};
            this.setPositionChanged(true);
            return;
        }

        this.setPositionChanged(false);
    }

    public setLineInfo(lineInfo: LineInfo) {
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }

    public setFillColor(fillColor: string) {
        this.fillColor = fillColor;
    }
}

export class Rect extends Shape {

    constructor(
        position: Vector2,
        dimension: Vector2,
        fillColor: string | null,
        lineInfo?: LineInfo
    ) {
        super(fillColor, lineInfo);
        this.setCurrentPosition({
            x: position.x,// * dimension.x,
            y: position.y// * dimension.y
        });

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
            context.lineJoin = this.lineInfo.lineJoin;
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
        position: Vector2,
        size: number,
        fillColor: string | null,
        lineInfo?: LineInfo
    ) {
        super(fillColor, lineInfo);
        this.setCurrentPosition({
            x: position.x,
            y: position.y
        });
        this.dimension.x = size / 2;
        this.dimension.y = size / 2;
    }

    draw(context: CanvasRenderingContext2D): void {
        this.drawStrokeArc(context);
    }

    private drawStrokeArc(context: CanvasRenderingContext2D) {
        if (this.lineInfo.lineColor !== this.noColor) {
            context.beginPath();

            context.shadowColor = this.lineInfo.shadowColor;
            context.shadowBlur = this.lineInfo.shadowBlur;
            context.lineJoin = this.lineInfo.lineJoin;
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
            context.stroke();
            context.closePath();
        }
    }
}

export class Text extends Shape {
    private textInfo: TextInfo = {
        text: "NO TEXT",
        textBaselines: "alphabetic",
        font: "serif 24pt",
        textAlign: "left"
    };

    constructor(
        position: Vector2,
        fillColor: string | null,
        textInfo: TextInfo,
        lineInfo?: LineInfo
    ) {
        super(fillColor, lineInfo);
        this.textInfo = textInfo !== undefined? textInfo : this.textInfo;
        this.setCurrentPosition({
            x: position.x,// * dimension.x,
            y: position.y// * dimension.y
        });
        
    }

    draw(context: CanvasRenderingContext2D): void {
        if (context === undefined || context === null) {
            console.log("ERROR NO CANVAS CONTEXT ON SHAPE");
            return;
        }

        this.drawFillText(context);
        this.drawStrokeText(context);
    }

    private drawStrokeText(context: CanvasRenderingContext2D) {
        if (this.lineInfo.lineColor !== this.noColor) {
            context.beginPath();

            context.shadowColor = this.lineInfo.shadowColor;
            context.shadowBlur = this.lineInfo.shadowBlur;
            context.lineJoin = this.lineInfo.lineJoin;
            context.lineWidth = this.lineInfo.lineWidth;
            context.strokeStyle = this.lineInfo.lineColor;

            context.textBaseline = this.textInfo.textBaselines;
            context.textAlign = this.textInfo.textAlign;
            context.font = `${this.textInfo.font}`;
            context.strokeText(this.textInfo.text, this.position.x, this.position.y);
            
            context.closePath();
            context.stroke();
        }
    }

    private drawFillText(context: CanvasRenderingContext2D) {
        if (this.fillColor !== this.noColor) {
            context.beginPath();
            context.fillStyle = this.fillColor;
            
           context.textBaseline = this.textInfo.textBaselines;
            context.textAlign = this.textInfo.textAlign;
            context.font = `${this.textInfo.font}`;
            context.fillText(this.textInfo.text, this.position.x, this.position.y);

            context.closePath();
            context.fill();
        }
    }
}
