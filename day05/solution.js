'use strict';

const fs = require('fs');

const cmdDecode = (mem, ip) => {
    const cmd = mem[ip].toString().padStart(5, '0');
    return {
        tMode: parseInt(cmd[0]),
        p2Mode: parseInt(cmd[1]),
        p1Mode: parseInt(cmd[2]),
        op: cmd.substring(3),
        ip: ip,
        next: 0
    };
};

const getData = (mem, idx, mode) => {
    let v;
    if (mode === 1) v = mem[idx];
    else v = mem[mem[idx]];
    return parseInt(v);
}

const iExecute = (mem, cmd) => {
    if (cmd.op === '01') {
        mem[mem[cmd.ip + 3]] = getData(mem, cmd.ip + 1, cmd.p1Mode) + getData(mem, cmd.ip + 2, cmd.p2Mode);
        cmd.next = cmd.ip + 4;
    }
    
    if (cmd.op === '02') {
        mem[mem[cmd.ip + 3]] = getData(mem, cmd.ip + 1, cmd.p1Mode) * getData(mem, cmd.ip + 2, cmd.p2Mode);
        cmd.next = cmd.ip + 4;
    }

    if (cmd.op === '03') {
        mem[mem[cmd.ip + 1]] = parseInt(process.argv[3]);
        cmd.next = cmd.ip + 2;
    }

    if (cmd.op === '04') {
        console.log(getData(mem, cmd.ip + 1, cmd.p1Mode));
        cmd.next = cmd.ip + 2;
    }

    if (cmd.op === '05') {
        const val = getData(mem, cmd.ip + 1, cmd.p1Mode);
        cmd.next = (val !== 0) ? getData(mem, cmd.ip + 2, cmd.p2Mode) : cmd.ip + 3;
    }

    if (cmd.op === '06') {
        const val = getData(mem, cmd.ip + 1, cmd.p1Mode);
        cmd.next = (val === 0) ? getData(mem, cmd.ip + 2, cmd.p2Mode) : cmd.ip + 3;
    }

    if (cmd.op === '07') {
        const p1 = getData(mem, cmd.ip + 1, cmd.p1Mode);
        const p2 = getData(mem, cmd.ip + 2, cmd.p2Mode);
        const target = mem[cmd.ip + 3];
        mem[target] = (p1 < p2) ? 1 : 0;
        cmd.next = cmd.ip + 4;
    }

    if (cmd.op === '08') {
        const p1 = getData(mem, cmd.ip + 1, cmd.p1Mode);
        const p2 = getData(mem, cmd.ip + 2, cmd.p2Mode);
        const target = mem[cmd.ip + 3];
        mem[target] = (p1 === p2) ? 1 : 0;
        cmd.next = cmd.ip + 4;
    }
}

const input = fs.readFileSync(process.argv[2]);

const mem = input.toString().split(',').map(x => parseInt(x, 10));
let ip = 0;
while (true) {
    const cmd = cmdDecode(mem, ip);
//console.log(cmd);
    iExecute(mem, cmd);
//console.log('['+mem.join(', ')+']');
    ip = cmd.next;
    if (cmd.op === '99') break;
}
console.log('Finished');
