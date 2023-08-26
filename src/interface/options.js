/**
 * Custom objects to use as parameters.
 * @file
 * @ignore
 */

/**
 * Used to filter the search logic | Options to control how path saving is performed.
 * @typedef {object} SearchOptions
 * @property {boolean} [deepSearch] - Search subfolders.
 * @interface
 */

/**
 * Options to control how paths search is performed.
 * @typedef {object} FilterOptions
 * @property {string|RegExp} [name] The exact or a pattern regex.
 * @property {string|RegExp} [extension] The exact or a pattern regex.
 * @property {string|RegExp} [folder] The exact or a pattern regex.
 * @property {string|RegExp} [root] The exact or a pattern regex.
 * @interface
 */

module.exports = {
    /** @type {SearchOptions} */
    SearchOptions: {},
    /** @type {FilterOptions} */
    FilterOptions: {},
}
