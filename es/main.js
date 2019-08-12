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
const cp = (params = defParams) => {
    const list = params.cp.split(',');
    list.forEach(value => {
        const inPath = value.trim();
        const fileString = inPath.split('/');
        const file = fileString[fileString.length - 1];
        const outPath = inputs_1.pwd(params.out);
        if (fs.existsSync(outPath)) {
            const stat = fs.statSync(outPath);
            if (stat && stat.isDirectory()) {
                fs.copySync(inputs_1.pwd(inPath), inputs_1.pwd(params.out, file));
            }
            else if (stat && stat.isFile()) {
                fs.copySync(inputs_1.pwd(inPath), inputs_1.pwd(params.out));
            }
        }
        else {
            fs.copySync(inputs_1.pwd(inPath), inputs_1.pwd(params.out));
        }
    });
};
const mv = (params = defParams) => {
    const list = params.mv.split(',');
    list.forEach(value => {
        const inPath = value.trim();
        const fileString = inPath.split('/');
        const file = fileString[fileString.length - 1];
        const outPath = inputs_1.pwd(params.out);
        if (params.file) {
            fs.moveSync(inputs_1.pwd(inPath), inputs_1.pwd(params.out, file));
        }
        else {
            fs.moveSync(inputs_1.pwd(inPath), inputs_1.pwd(params.out));
        }
    });
};
const mkdir = (params = defParams) => {
    fs.mkdirpSync(inputs_1.pwd(params.mdkir));
};
const rm = (params = defParams) => {
    const list = params.rm.split(',');
    list.forEach(value => {
        const file = value.trim();
        const target = inputs_1.pwd(file);
        if (fs.existsSync(target)) {
            fs.removeSync(target);
        }
    });
};
const logic = (params = defParams) => {
    if (params.cp) {
        if (!params.out) {
            console.log('Throw! params is error');
            process.exit(1);
        }
        cp(params);
        return;
    }
    if (params.mdkir) {
        mkdir(params);
        return;
    }
    if (params.rm) {
        rm(params);
        return;
    }
    if (params.mv) {
        mv(params);
        return;
    }
};
inputs_1.inputs(defParams, logic).then();
//# sourceMappingURL=main.js.map