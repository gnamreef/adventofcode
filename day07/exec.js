'use strict';
const begin = 5;
const end = 9;
//console.log(process.argv[2]);
const combinations = [];
for (let i0 = begin; i0 < end; i0 += 1) {
    const u0 = [i0];
    for (let i1 = begin; i1 < end; i1 += 1) {
        if (u0.includes(i1)) continue;
        const u1 = u0.concat([i1]);
        for (let i2 = begin; i2 < end; i2 += 1) {
            if (u1.includes(i2)) continue;
            const u2 = u1.concat([i2]);
            for (let i3 = begin; i3 < end; i3 += 1) {
                if (u2.includes(i3)) continue;
                const u3 = u2.concat([i3]);
                for (let i4 = begin; i4 < end; i4 += 1) {
                    if (u3.includes(i4)) continue;
                    combinations.push('' + i0 + ',' + i1 + ',' + i2 + ',' + i3 + ',' + i4);
                }
            }
        }
    }
}
//console.log(combinations);

const proc = require('child_process');
let max = -1;
let comb = -1;
combinations.forEach(entry => {
    const val = parseInt(proc.execSync('node solution.js ' + process.argv[2] + ' ' + entry));
    if (val > max) {
        max = val;
        comb = entry;
    }
});

console.log(max);
console.log(comb);
