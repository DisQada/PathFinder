/**
 * The container of the main paths array, can be accessed via a getter and a setter.
 * @file
 * @ignore
 */

/**
 * The container of the main paths array, can be accessed via a getter and a setter.
 * @module
 */

/**
 * The main paths array.
 * @type {FilePath[]}
 * @default {Array}
 */
let paths = [];

/**
 * Get all saved paths.
 * @returns {FilePath[]} All saved paths.
 * @example
 * const paths = getPaths();
 */
function getPaths() {
    return paths;
}

/**
 * Set the new paths as the saved paths.
 * @param {FilePath[]} newPaths
 * @returns {void}
 * @example
 * const newPaths = [new FilePath(...)];
 * setPaths(newPaths);
 */
function setPaths(newPaths) {
    paths = newPaths;
}

module.exports = {
    getPaths,
    setPaths
};
