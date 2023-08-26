/**
 * Set of functions for finding paths using filtering options.
 * @file
 * @ignore
 */

const { getPaths } = require("../safe");
const { FilePath } = require("../class/filePath");
const { FilterOptions } = require("../interface/options");

/**
 * Set of functions for finding paths using filtering options.
 * @module finder
 */

/**
 * Find all stored paths with filtering.
 * @param {FilterOptions} options - If options is null, all the paths will be returned.
 * @returns {FilePath[]} - If no paths found, an empty array will be returned.
 * @example <caption>will return all stored js files</caption>
 * findPaths({ extension: "js" });
 * @example <caption>will return all stored js and jsx files</caption>
 * findPaths({ extension: /^jsx?$/ });
 */
function findPaths(options) {
    /**
     * Check if the given path matches the filter options on a single property level.
     * @param {FilePath} path - The path to check it's property.
     * @param {string} propertyName - The level in the path to check.
     * @returns {boolean} - True if matches, false otherwise.
     * @example
     * test("src/example.js", "name");
     */
    function test(path, propertyName) {
        const property = options?.[propertyName] || undefined;
        if (!property) {
            return true;
        }

        if (typeof property === "string") {
            return property === path[propertyName];
        } else {
            return property.test(path[propertyName]);
        }
    }
    const filePaths = getPaths();

    if (!options) {
        return filePaths;
    }

    return filePaths.filter((path) => {
        return (
            test(path, "name") &&
            test(path, "extension") &&
            test(path, "folder") &&
            test(path, "root")
        );
    });
}

/**
 * Search for the first stored FilePath matching the given filter options.
 * @param {FilterOptions} options - Path's search filter options.
 * @returns {FilePath | undefined} - The FilePath if found, otherwise undefined.
 * @example <caption>will return the first file called "example"</caption>
 * const filePath = findPath({ name: "example" });
 * const { ... } = require(filePath);
 */
function findPath(options) {
    return findPaths(options)[0];
}

module.exports = {
    findPath,
    findPaths
};
