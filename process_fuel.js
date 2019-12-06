'use strict';

const fs = require('fs');

const computeFuel = (mass) => {
    let total = 0;
    let massfuel = Math.floor(mass / 3) - 2;
    total += massfuel;
    while (true) {
        let extrafuel = Math.floor(massfuel / 3) - 2;
        if (extrafuel < 0) break;
	massfuel = extrafuel;
	total += extrafuel;
    }
    return total;
};

const input = fs.readFileSync('module_mass.txt');
//console.log(input);
let fuel = 0;
input.toString().split('\n').forEach(entry => {
    if (entry) {
//        console.log(entry);
        const i = parseInt(entry, 10);
        fuel += computeFuel(i);
    }
});
console.log('Fuel: ' + fuel);
