'use strict';

const fs = require('fs');

const iDecode = (mem, ip) => {
    const pos = ip * 4;
    return {
        cmd: mem[pos],
        op1: parseInt(mem[mem[pos + 1]], 10),
        op2: parseInt(mem[mem[pos + 2]], 10),
        target: mem[pos + 3]
    };
}

const iExecute = (mem, i) => {
    if (i.cmd == 1) {
        mem[i.target] = i.op1 + i.op2;
    }
    
    if (i.cmd == 2) {
        mem[i.target] = i.op1 * i.op2;
    }
}

const input = fs.readFileSync('int_computer.txt');

for(let noun=0; noun < 100; noun += 1) {
    for (let verb=0; verb < 100; verb += 1) {
        const mem = input.toString().split(',');
        mem[1] = noun;
        mem[2] = verb;
        let ip = 0;
        while (true) {
            const instr = iDecode(mem, ip++);
            if (instr.cmd == 99) {
                if (mem[0] == 19690720) {
                    console.log(noun*100+verb);
                    process.exit(0);
                }
                break;
	    }
            iExecute(mem, instr);
        }
    }
}
