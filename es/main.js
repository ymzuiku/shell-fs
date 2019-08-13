#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const inputs_1 = require("./inputs");
const defParams = {
    file: null,
    config: null,
    rm: null,
    mdkir: null,
    cp: null,
    mv: null,
    out: null,
    package: null,
};
const cp = (input, out) => {
    const list = input.split(',');
    list.forEach(value => {
        const inPath = value.trim();
        const fileString = inPath.split('/');
        const file = fileString[fileString.length - 1];
        const outPath = inputs_1.pwd(out);
        if (fs.existsSync(outPath)) {
            const stat = fs.statSync(outPath);
            if (stat && stat.isDirectory()) {
                fs.copySync(inputs_1.pwd(inPath), inputs_1.pwd(out, file));
            }
            else if (stat && stat.isFile()) {
                fs.copySync(inputs_1.pwd(inPath), inputs_1.pwd(out));
            }
        }
        else {
            fs.copySync(inputs_1.pwd(inPath), inputs_1.pwd(out));
        }
    });
};
const mv = (input, out, params = defParams) => {
    const list = input.split(',');
    list.forEach(value => {
        const inPath = value.trim();
        const fileString = inPath.split('/');
        const file = fileString[fileString.length - 1];
        const outPath = inputs_1.pwd(out);
        if (params.file) {
            fs.moveSync(inputs_1.pwd(inPath), inputs_1.pwd(out, file));
        }
        else {
            fs.moveSync(inputs_1.pwd(inPath), inputs_1.pwd(out));
        }
    });
};
const mkdir = (input) => {
    fs.mkdirpSync(inputs_1.pwd(input));
};
const rm = (input) => {
    const list = input.split(',');
    list.forEach(value => {
        const file = value.trim();
        const target = inputs_1.pwd(file);
        if (fs.existsSync(target)) {
            fs.removeSync(target);
        }
    });
};
const logic = (params = defParams) => {
    if (inputs_1.argv[0] === 'cp') {
        cp(inputs_1.argv[1], inputs_1.argv[2]);
        return;
    }
    if (inputs_1.argv[0] === 'mkdir') {
        mkdir(inputs_1.argv[1]);
        return;
    }
    if (inputs_1.argv[0] === 'rm') {
        rm(inputs_1.argv[1]);
        return;
    }
    if (inputs_1.argv[0] === 'mv') {
        mv(inputs_1.argv[1], inputs_1.argv[2], params);
        return;
    }
};
inputs_1.inputs(defParams, logic).then();
//# sourceMappingURL=main.js.map