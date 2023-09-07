/**
 * Set of functions for storing paths.
 * @file
 * @ignore
 */

const { readWorkspaceFolderNames, readFolderPaths } = require("./readers");
const { getPaths, setPaths } = require("../safe");
const { FilePath } = require("../class/filePath");
const { SearchOptions } = require("../interface/options");

/**
 * Set of functions for storing paths.
 * @module storer
 */

/**
 * Check if a file path saved.
 * @param {string} path - The path string to check for.
 * @returns {boolean} True if saved, false otherwise.
 * @example
 * if (storedPath(".../example.js")) { ... }
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|String}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean|Boolean}
 * @private
 */
function storedPath(path) {
    return getPaths().some((fp) => fp.fullPath === path);
}

/**
 * Add file paths to the saved ones if not saved already.
 * @param {string[]} paths - Paths to add.
 * @returns {void}
 * @example
 * storePaths(["example1.js", "src/example2.js"]);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|String}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array|Array}
 * @see {@link https://www.typescriptlang.org/docs/handbook/basic-types.html#void|Void}
 * @private
 */
function storePaths(paths) {
    const newPaths = [];

    const length = paths.length;
    for (let i = 0; i < length; i++) {
        const path = paths[i];

        if (storedPath(path)) {
            continue;
        }

        const filePath = new FilePath(path);
        newPaths.push(filePath);
    }

    setPaths(newPaths);
}

/**
 * Save all file paths in specific folder.
 * @param {string[]} [folderPaths] - Folder path to search in.
 * @param {SearchOptions} options - Whether to search subfolders.
 * @returns {Promise<void>}
 * @example
 * storeFolderPaths();
 * @example
 * storeFolderPaths(["src"]);
 * @example
 * storeFolderPaths(["src", "src/main"], { deepSearch: false });
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|String}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array|Array}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * @see {@link https://www.typescriptlang.org/docs/handbook/basic-types.html#void|Void}
 */
async function storeFolderPaths(
    folderPaths,
    options = {
        deepSearch: true
    }
) {
    if (!folderPaths) {
        folderPaths = await readWorkspaceFolderNames();
    }

    if (folderPaths.length === 1) {
        const filePaths = await readFolderPaths(folderPaths[0], options);
        storePaths(filePaths);
        return;
    }

    const filePaths = await Promise.all(
        folderPaths.map(async (path) => await readFolderPaths(path, options))
    );

    storePaths(filePaths.flat());
}

module.exports = {
    storedPath,
    storePaths,
    storeFolderPaths
};
