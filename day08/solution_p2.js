'use strict';

const fs = require('fs');

const data = fs.readFileSync(process.argv[2]).toString();

const img = [];
const width = parseInt(process.argv[3]);
const height = parseInt(process.argv[4]);

const incDigitCnt = (layer, digit) => {
    if (!layer.counts[digit]) layer.counts[digit] = 1;
    else layer.counts[digit] += 1;
};

let layerIdx = -1;
for (let idx = 0; idx < data.length; idx += 1) {
    if (idx % (width*height) === 0) {
        layerIdx += 1;
        img[layerIdx] = {id: layerIdx, pixels: [], counts: {}};
    }
    const digit = parseInt(data.charAt(idx));
    img[layerIdx].pixels.push(digit);
    incDigitCnt(img[layerIdx], digit);
}

let result = [];
const layerSize = width*height;
for (let idx = 0; idx < layerSize; idx += 1) {
    for (let layer = 0; layer < img.length; layer += 1) {
        const pixel = img[layer].pixels[idx];
        if (pixel !== 2) {
            result.push((pixel === 0) ? ' ' : '*');
            break;
        }
    }
    if (idx % width === 24) {
        console.log(result.join(''));
        result = [];
    }
}


