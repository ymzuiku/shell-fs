# shell-fs

Run fs in shell

## Install

```sh
$ npm i -g shell-fs
```

## Like: mkdir -p

```sh
$ sfs mkdir ./fist/cat/dog
```

## Like: cp -r

```sh
$ sfs cp dog.js dist
# multiple：
$ sfs cp 'dog.js, cat.js ./fish' dist
```

## Like: mv

```sh
$ sfs mv dog.js dist
# multiple：
$ sfs mv 'dog.js, cat.js ./fish' dist
```

## Like: rm -r

```sh
$ sfs rm dog.js
# multiple：
$ sfs rm 'dog.js, cat.js ./fish'
```
