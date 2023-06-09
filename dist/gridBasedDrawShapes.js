export class Shape {
    position = { x: 0, y: 0 };
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
        this.position.x = x * gridCellSize;
        this.position.y = y * gridCellSize;
        this.gridCellSize = gridCellSize;
        this.context = ctx;
        this.fillColor = fillColor !== null ? fillColor : this.noColor;
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
        if (this.isOutOfBounds(x, y)) {
            this.position.x = 0;
            this.position.y = 0;
            console.log("Shape Out of Bounds Setting to x:0 y:0");
        }
    }
    getPosition() {
        return this.position;
    }
    setLineInfo(lineInfo) {
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    setFillColor(fillColor) {
        this.fillColor = fillColor;
    }
    isOutOfBounds(x, y) {
        return ((x * this.gridCellSize) + this.position.x) > (this.context.canvas.width - this.gridCellSize) ||
            (x * this.gridCellSize) + this.position.x < 0 ||
            ((y * this.gridCellSize) + this.position.y) > (this.context.canvas.height - this.gridCellSize) ||
            (y * this.gridCellSize) + this.position.y < 0;
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
    move(x, y) {
        if (this.isOutOfBounds(x, y)) {
            return;
        }
        this.position.x += x * this.gridCellSize;
        this.position.y += y * this.gridCellSize;
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
            this.context.strokeRect(this.position.x, this.position.y, this.gridCellSize, this.gridCellSize);
            this.context.closePath();
            this.context.stroke();
        }
    }
    drawFillRect() {
        if (this.fillColor !== this.noColor) {
            this.context.fillStyle = this.fillColor;
            this.context.beginPath();
            this.context.rect(this.position.x, this.position.y, this.gridCellSize, this.gridCellSize);
            this.context.closePath();
            this.context.fill();
        }
    }
}
export class Circle extends Shape {
    posOffset = this.gridCellSize / 2;
    gridCellSizeOffset = this.gridCellSize / 2;
    draw() {
        this.drawStrokeArc();
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
            this.context.arc(this.position.x + this.posOffset, this.position.y + this.posOffset, this.gridCellSizeOffset, 0, 2 * Math.PI);
            this.context.fillStyle = this.fillColor;
            this.context.fill();
            this.context.closePath();
            this.context.stroke();
        }
    }
}
//# sourceMappingURL=gridBasedDrawShapes.js.map