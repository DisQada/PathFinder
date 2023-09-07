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
const {findPaths} = require('@disqada/pathfinder');

const filePaths = findPaths({name: 'example1'});
const {...} = require(filePaths[1].fullPath);
```

This will solve the problem, for now, what if we then added another file named `example1.js` somewhere in our project or the order of the files changed (files order in the workspace or the order of storing)?

## Filtering by different properties

> More than filtering property can be used at the same time

### Extension difference

The best way to work around the problem of file name conflict is by adding more details to the `FilterOptions` object parameter

Both files have the same file name and path except for only the extension, so we can specify the `extension` property in the `FilterOptions` parameter to get our desired file

```js
const {findPath} = require('@disqada/pathfinder');

const filePath = findPath({extension: 'json'});
const {...} = require(filePath.fullPath);
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
const {findPath} = require('@disqada/pathfinder');

const filePath = findPath({folder: 'data'});
const {...} = require(filePath.fullPath);
```
