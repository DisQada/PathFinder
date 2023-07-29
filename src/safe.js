/**
 * @type {import("./class/filePath").FilePath[]} The main paths array
 */
let paths = [];

/**
 * Get all saved paths
 * @return {import("./class/filePath").FilePath[]} All saved paths
 */
function getPaths() {
    return paths;
}

/**
 * Set the new paths as the saved paths
 * @param {import("./class/filePath").FilePath[]} newPaths
 * @return {void}
 */
function setPaths(newPaths) {
    paths = newPaths;
}

module.exports = {
    getPaths,
    setPaths
};
