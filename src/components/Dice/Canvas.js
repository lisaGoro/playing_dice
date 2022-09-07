class Canvas {
    constructor({ WIN,
        id,
        width = 400,
        height = 400,
    }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }
    sx(x) {
        return x * this.WIN.WIDTH / this.canvas.width;
    }
    sy(y) {
        return -y * this.WIN.HEIGHT / this.canvas.height;
    }

    xs(x) {
        return (x - this.WIN.LEFT) * this.canvas.width / this.WIN.WIDTH;
    }
    ys(y) {
        return this.canvas.height - ((y - this.WIN.BOTTOM) * this.canvas.height / this.WIN.HEIGHT);
    }

    clear() {
        this.context.fillStyle = '#FFF';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    line(
        x1, y1, x2, y2,
        color = '#808080', width = 2, isDash
    ) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        if (isDash) {
            this.context.setLineDash([5, 3]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    point(x, y, color = 'black', r = 2.5) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(this.xs(x), this.ys(y), r, 0, 2 * Math.PI, true);
        this.context.fill();
    }

    polygon(points, color = '#FF800055') {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }

    text(str, x, y, size = 18, color = 'black') {
        this.context.beginPath();
        this.context.font = `italic ${size}pt cursive`;
        this.context.fillStyle = color;
        this.context.fillText(str, this.xs(x), this.ys(y));
        this.context.closePath();
    }
}

export default Canvas;