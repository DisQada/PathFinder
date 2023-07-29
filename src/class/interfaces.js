/**
 * @module interfaces
 */

/**
 * Used to filter the search logic | Options to control how path saving is performed
 * @typedef {Object} SearchOptions
 * @property {boolean} [deepSearch] - Search subfolders
 */

/**
 * Options to control how paths search is performed
 * @typedef {Object} FilterOptions
 * @property {string|RegExp} [name] The exact or a regex of the file name
 * @property {string|RegExp} [extension] The exact or a regex of the file extension
 * @property {string|RegExp} [folder] The exact or a regex of the file folder
 * @property {string|RegExp} [root] The exact or a regex of the file root
 */
