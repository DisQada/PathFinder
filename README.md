# PathFinder

## Badges

[![github](https://img.shields.io/badge/DisQada/PathFinder-000000?logo=github&logoColor=white)](https://www.github.com/DisQada/PathFinder)
[![npm](https://img.shields.io/badge/@disqada/pathfinder-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/package/@disqada/pathfinder)

![version](https://img.shields.io/npm/v/@disqada/pathfinder.svg?label=latest&logo=npm)
![monthly downloads](https://img.shields.io/npm/dm/@disqada/pathfinder.svg?logo=npm)

![test](https://github.com/DisQada/PathFinder/actions/workflows/test.yml/badge.svg)
[![Generate and Deploy documentation](https://github.com/DisQada/PathFinder/actions/workflows/docs.yml/badge.svg)](https://github.com/DisQada/PathFinder/actions/workflows/docs.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Table of Contents

- [PathFinder](#pathfinder)
  - [Badges](#badges)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Learn](#learn)
  - [License](#license)
- [Getting started](#getting-started)
  - [Store paths](#store-paths)
  - [Find paths](#find-paths)
- [Same file names](#same-file-names)
  - [Renaming files](#renaming-files)
  - [Receiving all matches](#receiving-all-matches)
  - [Filtering by different properties](#filtering-by-different-properties)
    - [Extension difference](#extension-difference)
    - [Folder difference](#folder-difference)

## About

This tool was made to be able to find file paths using only their names, or getting all the paths of files with "hello" word in their names.
The file paths you want to get later must be stored first, this will usually be done at the beginning of the program.

## Learn

Check the [Getting started](#getting-started) guide for first time usage.

## License

Copyright &copy; 2023 [DisQada](https://github.com/DisQada)

This tool is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
See the [LICENSE](LICENSE) file for more information.

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
const { storeFolderPaths } = require('@disqada/pathfinder')
storeFolderPaths(['src', 'data'])
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
const { findPath } = require('@disqada/pathfinder')

const filePath = findPath({ name: 'example2' })
const { ... } = require(filePath.fullPath)
```

With that we successfully required the module and used it just like normal but without the need to know it's full path

If you have multiple files with the same name, then check [Same file names](#same-file-names) guide

# Same file names

Let's say that this is out workspace

```bash
<root>
  ├── package.json
  └── src
        ├── example1.js
        └── example1.json
```

Now let's say we've written some code and we want to require the file `src/example1.json`, we can use the same code, but there is a problem, the function is returning the path of `src/example1.js` instead of `src/example1.json` because it was stored before and the function will return the first match

To work around this, we have couple of choices

## Renaming files

Renaming one of the files to another name will solve this problem, but it's not always something we can do

## Receiving all matches

Instead of getting one file path, we can get an array of all the file paths of that name by changing the function from `findPath()` to `findPaths()`

```js
const { findPaths } = require('@disqada/pathfinder')

const filePaths = findPaths({ name: 'example1' })
const { ... } = require(filePaths[1].fullPath)
```

This will solve the problem, for now, what if we then added another file named `example1.js` somewhere in our project or the order of the files changed (files order in the workspace or the order of storing)?

## Filtering by different properties

> More than filtering property can be used at the same time

### Extension difference

The best way to work around the problem of file name conflict is by adding more details to the `FilterOptions` object parameter

Both files have the same file name and path except for only the extension, so we can specify the `extension` property in the `FilterOptions` parameter to get our desired file

```js
const { findPath } = require('@disqada/pathfinder')

const filePath = findPath({ extension: 'json' })
const { ... } = require(filePath.fullPath)
```

### Folder difference

If our workspace was instead like this, where both the files' name and extension are identical, but they're in different folder

```bash
<root>
  ├── package.json
  ├── src
  │     └── example1.js
  └── data
        └── example1.js
```

Then the way we'll get the correct path is as follows

```js
const { findPath } = require('@disqada/pathfinder')

const filePath = findPath({ folder: 'data' })
const { ... } = require(filePath.fullPath)
```
