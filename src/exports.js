const { FilePath } = require('./class/filePath')
const { findPath, findPaths } = require('./func/finder')
const { readFolderPaths, readWorkspaceFolderNames } = require('./func/readers')
const { storeFolderPaths } = require('./func/storer')

module.exports = {
  FilePath,

  findPath,
  findPaths,

  readFolderPaths,
  readWorkspaceFolderNames,

  storeFolderPaths
}
