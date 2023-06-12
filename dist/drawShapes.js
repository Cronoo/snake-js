export class Shape {
    positionChanged = false;
    position = { x: 0, y: 0 };
    lastPosition = { x: 0, y: 0 };
    dimension = { x: 0, y: 0 };
    noColor = "";
    fillColor = this.noColor;
    lineInfo = {
        lineColor: this.noColor,
        lineWidth: 1,
        lineJoin: undefined,
        enableJoinLine: false,
        shadowBlur: 0,
        shadowColor: this.noColor
    };
    constructor(fillColor, lineInfo) {
        this.fillColor = fillColor !== null ? fillColor : this.noColor;
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    getDimensions() {
        return { ...this.dimension };
    }
    ;
    getCurrentPosition() {
        return { ...this.position };
    }
    getLastPosition() {
        return { ...this.lastPosition };
    }
    getPositionChanged() {
        return this.positionChanged;
    }
    setColors(lineColor, fillColor) {
        if (lineColor.length !== 0) {
            this.lineInfo.lineColor = lineColor;
        }
        if (fillColor.length !== 0) {
            this.fillColor = fillColor;
        }
    }
    setPositionChanged(changed) {
        this.positionChanged = changed;
    }
    setCurrentPosition(position) {
        if (this.lastPosition.y !== this.position.y ||
            this.lastPosition.x !== this.position.x) {
            this.lastPosition = { ...this.position };
        }
        if (this.position.y !== position.y ||
            this.position.x !== position.x) {
            this.position = { ...position };
            this.setPositionChanged(true);
            return;
        }
        this.setPositionChanged(false);
    }
    setLineInfo(lineInfo) {
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    setFillColor(fillColor) {
        this.fillColor = fillColor;
    }
}
export class Rect extends Shape {
    constructor(position, dimension, fillColor, lineInfo) {
        super(fillColor, lineInfo);
        this.setCurrentPosition({
            x: position.x,
            y: position.y // * dimension.y
        });
        this.dimension = dimension;
    }
    draw(context) {
        if (context === undefined) {
            console.log("ERROR NO CANVAS CONTEXT ON SHAPE");
            return;
        }
        this.drawFillRect(context);
        this.drawStrokeRect(context);
    }
    drawStrokeRect(context) {
        if (this.lineInfo.lineColor !== this.noColor) {
            context.beginPath();
            context.shadowColor = this.lineInfo.shadowColor;
            context.shadowBlur = this.lineInfo.shadowBlur;
            this.lineInfo.lineJoin !== undefined
                ? (context.lineJoin = this.lineInfo.lineJoin)
                : 0;
            context.lineWidth = this.lineInfo.lineWidth;
            context.strokeStyle = this.lineInfo.lineColor;
            context.strokeRect(this.position.x, this.position.y, this.dimension.x, this.dimension.y);
            context.closePath();
            context.stroke();
        }
    }
    drawFillRect(context) {
        if (this.fillColor !== this.noColor) {
            context.fillStyle = this.fillColor;
            context.beginPath();
            context.rect(this.position.x, this.position.y, this.dimension.x, this.dimension.y);
            context.closePath();
            context.fill();
        }
    }
}
export class Circle extends Shape {
    constructor(position, size, fillColor, lineInfo) {
        super(fillColor, lineInfo);
        this.setCurrentPosition({
            x: position.x,
            y: position.y
        });
        this.dimension.x = size / 2;
        this.dimension.y = size / 2;
    }
    draw(context) {
        this.drawStrokeArc(context);
    }
    drawStrokeArc(context) {
        if (this.lineInfo.lineColor !== this.noColor) {
            context.beginPath();
            context.shadowColor = this.lineInfo.shadowColor;
            context.shadowBlur = this.lineInfo.shadowBlur;
            this.lineInfo.lineJoin !== undefined
                ? (context.lineJoin = this.lineInfo.lineJoin)
                : 0;
            context.lineWidth = this.lineInfo.lineWidth;
            context.strokeStyle = this.lineInfo.lineColor;
            context.arc(this.position.x + this.dimension.x, this.position.y + this.dimension.x, this.dimension.x, 0, 2 * Math.PI);
            context.fillStyle = this.fillColor;
            context.fill();
            context.closePath();
            context.stroke();
        }
    }
}
//# sourceMappingURL=drawShapes.js.map