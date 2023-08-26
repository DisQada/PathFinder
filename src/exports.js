/**
 * Exporting the modules of the package.
 * @file
 * @ignore
 */

const { FilePath } = require("./class/filePath");
const { FilterOptions, SearchOptions } = require("./interface/options");
const { findPath, findPaths } = require("./func/finder");
const { readFolderPaths, readWorkspaceFolderNames } = require("./func/readers");

module.exports = {
    FilePath,

    FilterOptions,
    SearchOptions,

    findPath,
    findPaths,

    readFolderPaths,
    readWorkspaceFolderNames
};
