const { getPaths } = require("../safe");

/**
 * set of functions for finding paths using filtering options
 * @module Finder
 */

/**
 * test - see {@link FilterOptions} yes
 * test - don't forget to check {@tutorial example-tutorial} yes
 * @param {module:interfaces.FilterOptions} options if options is null, all the paths will be returned
 * @return {import("../class/filePath").FilePath[]} if no paths found, an empty array will be returned
 */
function findPaths(options) {
    /**
     * @param {import("../class/filePath").FilePath} path
     * @param {string} propertyName
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
 * Search for the first stored FilePath matching the given filter options
 * @param {module:interfaces.FilterOptions} options Path's search filter options
 * @return {import("../class/filePath").FilePath | undefined} The FilePath if found, otherwise undefined
 */
function findPath(options) {
    return findPaths(options)[0];
}

module.exports = {
    findPath,
    findPaths
};
