'use strict';

const fs = require('fs');

class MassObject {
    constructor(name, com) {
        this.name = name;
        this.com = com;
    }

    isCoM() {
        return (this.com === undefined);
    }

    orbitCount(moName) {
        if ((moName && moName === this.name) || (!moName && this.isCoM())) return 0;
        else return this.com.orbitCount(moName) + 1;
    }

    transferToCoM(massObjArray) {
        if (this.isCoM()) return massObjArray;
        massObjArray.push(this.name);
        return this.com.transferToCoM(massObjArray);
    }
}

const hashMap = {};

const input = fs.readFileSync(process.argv[2]);

input.toString().split('\n').forEach(entry => {
    if (!entry) return;
    const mass = entry.split(')');
    const comName = mass[0];
    const orbName = mass[1];
    if (!hashMap[comName]) hashMap[comName] = new MassObject(comName);
    if (!hashMap[orbName]) hashMap[orbName] = new MassObject(orbName, hashMap[comName]);
    else hashMap[orbName].com = hashMap[comName];
});
//console.log(hashMap);
let solutionPart1 = 0;
Object.keys(hashMap).forEach(entry => {
    solutionPart1 += hashMap[entry].orbitCount();
});
//console.log(solutionPart1);

const myWayToCoM = hashMap['YOU'].transferToCoM([]).reverse();
const sanWayToCoM = hashMap['SAN'].transferToCoM([]).reverse();
let lastCommonMO;
for (let idx = 0; idx < myWayToCoM.length; idx += 1) {
    if (myWayToCoM[idx] !== sanWayToCoM[idx]) {
        lastCommonMO = myWayToCoM[idx-1];
        break;
    }
}
if (lastCommonMO) {
    const myTransfers = hashMap['YOU'].orbitCount(lastCommonMO);
    const sanTransfers = hashMap['SAN'].orbitCount(lastCommonMO);
    console.log(myTransfers + sanTransfers - 2);
} else console.log('No common mass object');
