'use strict';

const fs = require('fs');
const Point = require('./Utils').Point2d;
const Vector = require('./Utils').Vector2d;
const range = require('./Utils').range;
const sum = require('./Utils').sum;

const decode = (instr) => {
    const direction = instr.charAt(0);
    const distance = parseInt(instr.substr(1));
    switch (direction) {
        case 'U' : return new Vector(0, -distance);
        case 'D' : return new Vector(0, distance);
	case 'R' : return new Vector(distance, 0);
        case 'L' : return new Vector(-distance, 0);
    }
    return new Vector(0, 0);
};
const updateBoardDims = (board, point) => {
    if (point.x < board.minX) board.minX = point.x;
    if (point.x > board.maxX) board.maxX = point.x;

    if (point.y < board.minY) board.minY = point.y;
    if (point.y > board.maxY) board.maxY = point.y;
};

const walk = (board, instr, wIdx) => {
    const vector = decode(instr);
    const nPos = board.pos.move(vector);
    updateBoardDims(board, nPos);
    
    const rx = range(board.pos.x, nPos.x);
    if (rx.length === 0) rx.push(nPos.x);
    const ry = range(board.pos.y, nPos.y);
    if (ry.length === 0) ry.push(nPos.y);
    board.pos = nPos;
//    console.log('range x ' + rx);
//    console.log('range y ' + ry);

    ry.forEach((y, yIdx, yArr) => {
        if (yArr.length > 1 && yIdx === 0) return;
        if (!board.grid[y]) board.grid[y] = {};
        rx.forEach((x, xIdx, xArr) => {
            if (xArr.length > 1 && xIdx === 0) return;
            if (!board.grid[y][x]) {
                board.grid[y][x] = { w: wIdx, s: vector.symbol(), steps: []};
            } else {
                if (board.grid[y][x].w === wIdx) board.grid[y][x].s = '+';
                else board.grid[y][x].s = 'X';
            }
            board.grid[y][x].steps[wIdx] = board.totalSteps[wIdx]++;
	});
    });
	
}

const input = fs.readFileSync(process.argv[2]);
const board = {
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    pos: new Point(0, 0),
    grid: {},
    totalSteps: {}
};

const wires = input.toString().split('\n');
for(let wIdx=0; wIdx < wires.length; wIdx += 1) {
    board.totalSteps[wIdx] = 1;
    const parts = wires[wIdx].split(',');
    for (let pIdx=0; pIdx < parts.length; pIdx += 1) {
//        console.log(parts[pIdx]);
        walk(board, parts[pIdx], wIdx);
    }
    board.pos = new Point(0, 0);
}
board.grid[0][0] = { s: 'o' };
//console.log(board);
let minDist = -1;
let minSteps = -1;
Object.keys(board.grid).forEach(y => {
    Object.keys(board.grid[y]).forEach(x => {
        if (board.grid[y][x].s === 'X') {
            const dist = Math.abs(x) + Math.abs(y);
            const steps = sum(board.grid[y][x].steps);
	    if (minSteps < 0 || steps < minSteps) {
                minDist = dist;
                minSteps = steps;
            }
//            console.log(x + '+' + y + '=' + dist);
//            console.log(board.grid[y][x].steps + '=>' + sum(board.grid[y][x].steps));
        }
    });
});
console.log('Min dist: ' + minDist);
console.log('Min steps: ' + minSteps);

process.exit(0);
for (let y = board.minY; y <= board.maxY; y += 1) {
    let line = '';
    for (let x = board.minX; x <= board.maxX; x += 1) {
        if (!board.grid[y]) line += '.';
        else if (!board.grid[y][x]) line += '.';
        else line += board.grid[y][x].s;
    }
    console.log(line);
}
