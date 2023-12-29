/**
 * Used to filter the search logic | Options to control how path saving is performed.
 * @typedef {object} SearchOptions
 * @property {boolean} [deepSearch] - Whether to search subfolders or not.
 */

/**
 * Options to control how paths search is performed.
 * @typedef {object} FilterOptions
 * @property {string | RegExp} [root] - The rest of the path before the file folder.
 * @property {string | RegExp} [folder] - The folder the file is in.
 * @property {string | RegExp} [name] - The file name before the first dot.
 * @property {string | RegExp} [extension] - The file extension after the first dot.
 */

module.exports = {}
