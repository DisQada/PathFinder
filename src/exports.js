/**
 * Exporting the modules of the package.
 * @file
 * @ignore
 */

const { FilePath } = require("./class/filePath");
const { findPath, findPaths } = require("./func/finder");
const { readFolderPaths, readWorkspaceFolderNames } = require("./func/readers");

module.exports = {
    FilePath,
    findPath,
    findPaths,
    readFolderPaths,
    readWorkspaceFolderNames
};
