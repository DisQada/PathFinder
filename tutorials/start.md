# Getting started

## Store paths

The first thing to do when using this tool is to store all the paths that will be required later on in some other file

To store the wanted file paths, use the function `storeFolderPaths()` and specify the array of directories to store their file paths.

> Store all the paths (once) at the beginning of the discord bot (or application)

Let's say that this is out workspace

```bash
<root>
  ├── package.json
  ├── src
  │     ├── example1.js
  │     └── example2.js
  └── data
        └── example1.json
```

We use this code to store the paths of all files in the `src` and `data` folder

```js
const {storeFolderPaths} = require('@disqada/pathfinder');
storeFolderPaths(['src', 'data']);
```

Now we'll have the following paths stored successfully

> The file paths are stored in order

```bash
.../src/example1.js
.../src/example2.js
.../data/example1.json
```

## Find paths

In another file in the middle of some function, you want to require a module of one of the files stored earlier, you remember it's name but you don't remember it's location and you don't want to modify the path in the require function every time you move one of the files

Here is where this tools comes to help, if you only know the name of the file then you can easily fetch it's full path using the function `findPath()` or `findPaths()`

> Both functions work the same, it's just that `filePath()` returns the first match while `filePaths()` returns them all in an array

Let's say that we want to require the file `src/example2.js`, we use the following code for that

```js
const {findPath} = require('@disqada/pathfinder');

const filePath = findPath({name: 'example2'});
const {...} = require(filePath.fullPath);
```

With that we successfully required the module and used it just like normal but without the need to know it's full path

If you have multiple files with the same name, then check {@tutorial same} guide
