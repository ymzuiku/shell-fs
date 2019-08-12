#!/usr/bin/env node
import * as fs from 'fs-extra';

import { argv, inputs, md5, pwd, resolve } from './inputs';

// tslint:disable no-console

const defParams = {
  file: null,
  config: null,
  rm: null as string,
  mdkir: null as string,
  cp: null as string,
  mv: null as string,
  // cp 输出的文件路径
  out: null as string,
  // 获取 package.json 中的版本号
  package: null as string,
};

const cp = (params = defParams) => {
  const list = params.cp.split(',');
  list.forEach(value => {
    const inPath = value.trim();
    const fileString = inPath.split('/');
    const file = fileString[fileString.length - 1];
    const outPath = pwd(params.out);

    if (fs.existsSync(outPath)) {
      const stat = fs.statSync(outPath);
      if (stat && stat.isDirectory()) {
        fs.copySync(pwd(inPath), pwd(params.out, file));
      } else if (stat && stat.isFile()) {
        fs.copySync(pwd(inPath), pwd(params.out));
      }
    } else {
      fs.copySync(pwd(inPath), pwd(params.out));
    }
  });
};

const mv = (params = defParams) => {
  const list = params.mv.split(',');
  list.forEach(value => {
    const inPath = value.trim();
    const fileString = inPath.split('/');
    const file = fileString[fileString.length - 1];
    const outPath = pwd(params.out);

    if (params.file) {
      fs.moveSync(pwd(inPath), pwd(params.out, file));
    } else {
      fs.moveSync(pwd(inPath), pwd(params.out));
    }
  });
};

const mkdir = (params = defParams) => {
  fs.mkdirpSync(pwd(params.mdkir));
};

const rm = (params = defParams) => {
  const list = params.rm.split(',');
  list.forEach(value => {
    const file = value.trim();
    const target = pwd(file);
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

inputs(defParams, logic).then();
