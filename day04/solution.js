'use strict';

const isAdjacent = (number) => {
    const s = number.toString();
    for (let idx = s.length; idx > 0; idx -= 1) {
//        console.log(s[idx] === s[idx-1]);
        if (s[idx] === s[idx-1]) {
            if (s[idx-1] === s[idx-2]) break;
            return true;
        }        
    }
    for (let idx = 0; idx < s.length-1; idx += 1) {
//        console.log(s[idx] === s[idx+1]);
        if (s[idx] === s[idx+1]) {
            if (s[idx+1] === s[idx+2]) break;
            return true;
        }
    }
    return false;
};

const isIncreasing = (number) => {
    const s = number.toString();
    for (let idx = 0; idx < s.length; idx += 1) {
//        console.log(s[idx] < s[idx+1]);
        if (s[idx] > s[idx+1]) return false;
    }
    return true;
};

console.log(isAdjacent(112233));
console.log(isAdjacent(111122));
console.log(isAdjacent(123444));
console.log(isAdjacent(444567));
console.log(isAdjacent(122345));
console.log(isAdjacent(779999));
//console.log(isIncreasing(122345));

//process.exit(0);

const from = parseInt(process.argv[2]);
const to = parseInt(process.argv[3]);

let cnt = 0;
for (let i = from; i <= to; i += 1) {
    if (isAdjacent(i) && isIncreasing(i)) {
        cnt += 1;
        console.log(i);
    }
}
console.log('Count: ' + cnt);
