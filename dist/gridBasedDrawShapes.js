export class Shape {
    xPos = 0;
    yPos = 0;
    gridCellSize = 0;
    context;
    noColor = "";
    fillColor = this.noColor;
    lineInfo = {
        lineColor: this.noColor,
        lineWidth: 1,
        lineJoin: undefined,
        enableJoinLine: false,
        shadowBlur: 0,
        shadowColor: this.noColor,
    };
    constructor(x, y, gridCellSize, ctx, fillColor, lineInfo) {
        this.xPos = x;
        this.yPos = y;
        this.gridCellSize = gridCellSize;
        this.context = ctx;
        this.fillColor = fillColor !== null ? fillColor : this.noColor;
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    setLineInfo(lineInfo) {
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    setFillColor(fillColor) {
        this.fillColor = fillColor;
    }
    setMove(dir) {
        switch (dir) {
            case 0 /* Dir.UP */:
                this.move(0, -1);
                break;
            case 1 /* Dir.DOWN */:
                this.move(0, 1);
                break;
            case 2 /* Dir.LEFT */:
                this.move(-1, 0);
                break;
            case 3 /* Dir.RIGHT */:
                this.move(1, 0);
                break;
        }
    }
}
export class Rect extends Shape {
    draw() {
        if (this.context === undefined) {
            console.log("ERROR NO CANVAS CONTEXT ON SHAPE");
            return;
        }
        this.drawFillRect();
        this.drawStrokeRect();
    }
    move(x, y) {
        this.xPos += x;
        this.yPos += y;
    }
    drawStrokeRect() {
        if (this.lineInfo.lineColor !== this.noColor) {
            this.context.beginPath();
            this.context.shadowColor = this.lineInfo.shadowColor;
            this.context.shadowBlur = this.lineInfo.shadowBlur;
            this.lineInfo.lineJoin !== undefined
                ? (this.context.lineJoin = this.lineInfo.lineJoin)
                : 0;
            this.context.lineWidth = this.lineInfo.lineWidth;
            this.context.strokeStyle = this.lineInfo.lineColor;
            this.context.strokeRect(this.xPos, this.yPos, this.gridCellSize, this.gridCellSize);
            this.context.closePath();
            this.context.stroke();
        }
    }
    drawFillRect() {
        if (this.fillColor !== this.noColor) {
            this.context.fillStyle = this.fillColor;
            this.context.beginPath();
            this.context.rect(this.xPos, this.yPos, this.gridCellSize, this.gridCellSize);
            this.context.closePath();
            this.context.fill();
        }
    }
}
export class Circle extends Shape {
    xPosOffset = this.gridCellSize / 2;
    yPosOffset = this.gridCellSize / 2;
    gridCellSizeOffset = this.gridCellSize / 2;
    draw() {
        this.drawStrokeArc();
    }
    move(x, y) {
        this.xPos += x;
        this.yPos += y;
    }
    drawStrokeArc() {
        if (this.lineInfo.lineColor !== this.noColor) {
            this.context.beginPath();
            this.context.shadowColor = this.lineInfo.shadowColor;
            this.context.shadowBlur = this.lineInfo.shadowBlur;
            this.lineInfo.lineJoin !== undefined
                ? (this.context.lineJoin = this.lineInfo.lineJoin)
                : 0;
            this.context.lineWidth = this.lineInfo.lineWidth;
            this.context.strokeStyle = this.lineInfo.lineColor;
            this.context.arc((this.xPos = this.xPos * this.gridCellSize + this.xPosOffset), (this.yPos = this.yPos * this.gridCellSize + this.yPosOffset), this.gridCellSizeOffset, 0, 2 * Math.PI);
            this.context.fillStyle = this.fillColor;
            this.context.fill();
            this.context.closePath();
            this.context.stroke();
            console.log(`${this.xPos} / ${this.yPos}`);
        }
    }
}
//# sourceMappingURL=gridBasedDrawShapes.js.map