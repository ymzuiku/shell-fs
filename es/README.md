# shell-fs

Run fs in shell

## Install

```sh
$ npm i -g shell-fs
```

## Like: mkdir -p

```sh
$ sfs -mkdir ./fist/cat/dog
```

## Like: cp -rf

```sh
$ sfs -cp dog.js -out dist
# multiple：
$ sfs -cp 'dog.js, cat.js ./fish' -out dist
```

## Like: mv

```sh
$ sfs -mv dog.js -out dist
# multiple：
$ sfs -mv 'dog.js, cat.js ./fish' -out dist
```

## Like: rm -rf

```sh
$ sfs -rm dog.js
# multiple：
$ sfs -rm 'dog.js, cat.js ./fish'
```
