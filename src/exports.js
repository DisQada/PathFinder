const { FilePath } = require("./class/filePath");
const { findPath, findPaths } = require("./func/finder");
const { readFolderPaths, readWorkspaceFolderNames } = require("./func/readers");
const { storeFolderPaths } = require("./func/storer");

module.exports.Class = { FilePath };
module.exports.Finder = {
    findPath,
    findPaths
};
module.exports.Reader = {
    readFolderPaths,
    readWorkspaceFolderNames
};
module.exports.Storer = { storeFolderPaths };
