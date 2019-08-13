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

const cp = (input: string, out: string) => {
  const list = input.split(',');
  list.forEach(value => {
    const inPath = value.trim();
    const fileString = inPath.split('/');
    const file = fileString[fileString.length - 1];
    const outPath = pwd(out);

    if (fs.existsSync(outPath)) {
      const stat = fs.statSync(outPath);
      if (stat && stat.isDirectory()) {
        fs.copySync(pwd(inPath), pwd(out, file));
      } else if (stat && stat.isFile()) {
        fs.copySync(pwd(inPath), pwd(out));
      }
    } else {
      fs.copySync(pwd(inPath), pwd(out));
    }
  });
};

const mv = (input: string, out: string, params = defParams) => {
  const list = input.split(',');
  list.forEach(value => {
    const inPath = value.trim();
    const fileString = inPath.split('/');
    const file = fileString[fileString.length - 1];
    const outPath = pwd(out);

    if (params.file) {
      fs.moveSync(pwd(inPath), pwd(out, file));
    } else {
      fs.moveSync(pwd(inPath), pwd(out));
    }
  });
};

const mkdir = (input: string) => {
  fs.mkdirpSync(pwd(input));
};

const rm = (input: string) => {
  const list = input.split(',');
  list.forEach(value => {
    const file = value.trim();
    const target = pwd(file);
    if (fs.existsSync(target)) {
      fs.removeSync(target);
    }
  });
};

const logic = (params = defParams) => {
  if (argv[0] === 'cp') {
    cp(argv[1], argv[2]);

    return;
  }
  if (argv[0] === 'mkdir') {
    mkdir(argv[1]);

    return;
  }
  if (argv[0] === 'rm') {
    rm(argv[1]);

    return;
  }
  if (argv[0] === 'mv') {
    mv(argv[1], argv[2], params);

    return;
  }
};

inputs(defParams, logic).then();
