'use strict';

class Point2d {
    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    move (vector) {
        return new Point2d(this.x + vector.dx, this.y + vector.dy);
    }
}

class Vector2d {
    constructor (dx = 0, dy = 0) {
        this.dx = dx;
        this.dy = dy;
    }

    symbol () {
        if (this.dx === 0) return '|';
	if (this.dy === 0) return '-';
    }

    scalarProd(v = new Vector2d(1,1)) {
        return v.dx * this.dx + v.dy * this.dy;
    }
}

function range(start, stop, step = 1) {
    let reverse = false;
    if (start > stop) {
        const tmp = start;
        start = stop;
        stop = tmp;
        reverse = true;
    }
    const r = [start];
    let i = start;
    while ((i += step) <= stop) {
        r.push(i);
    }
    return (reverse) ? r.reverse() : r;
}

function sum(args) {
    return args.reduce((acc, cur) => (acc + cur));
}

module.exports = {
    Point2d,
    Vector2d,
    range,
    sum
};
