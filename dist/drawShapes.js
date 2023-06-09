export class Shape {
    position = { x: 0, y: 0 };
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
    constructor(fillColor, lineInfo) {
        this.fillColor = fillColor !== null ? fillColor : this.noColor;
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    getPosition() {
        return this.position;
    }
    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    setLineInfo(lineInfo) {
        this.lineInfo = lineInfo !== undefined ? lineInfo : this.lineInfo;
    }
    setFillColor(fillColor) {
        this.fillColor = fillColor;
    }
}
export class Rect extends Shape {
    width = 0;
    height = 0;
    constructor(xPos, yPos, width, height, fillColor, lineInfo) {
        super(fillColor, lineInfo);
        this.position.x = xPos * width;
        this.position.y = yPos * height;
        this.width = width;
        this.height = height;
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
            context.strokeRect(this.position.x, this.position.y, this.width, this.height);
            context.closePath();
            context.stroke();
        }
    }
    drawFillRect(context) {
        if (this.fillColor !== this.noColor) {
            context.fillStyle = this.fillColor;
            context.beginPath();
            context.rect(this.position.x, this.position.y, this.width, this.height);
            context.closePath();
            context.fill();
        }
    }
}
export class Circle extends Shape {
    size = 0;
    constructor(xPos, yPos, size, fillColor, lineInfo) {
        super(fillColor, lineInfo);
        this.position.x = xPos; // * size;
        this.position.y = yPos; // * size;
        this.size = size / 2;
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
            console.log(this.position);
            context.arc(this.position.x + this.size, this.position.y + this.size, this.size, 0, 2 * Math.PI);
            context.fillStyle = this.fillColor;
            context.fill();
            context.closePath();
            context.stroke();
        }
    }
}
//# sourceMappingURL=drawShapes.js.map