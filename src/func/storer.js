const { readFolderPaths } = require("./readers");
const { getPaths, setPaths } = require("../safe");
const { FilePath } = require("../class/filePath");
const { readWorkspaceFolderNames } = require("./readers");

/**
 * Check if a file path saved
 * @param {string} path
 * @return {boolean} True if saved, false otherwise
 */
function storedPath(path) {
    return getPaths().some((fp) => fp.fullPath === path);
}

/**
 * Add file paths to the saved ones if not saved already
 * @param {string[]} paths paths to add
 * @return {void}
 */
function storePaths(paths) {
    const newPaths = [];

    const length = paths.length;
    for (let i = 0; i < length; i++) {
        const path = paths[i];

        if (storedPath(path)) {
            continue;
        }

        const filePath = new FilePath(path);
        newPaths.push(filePath);
    }

    setPaths(newPaths);
}

/**
 * Save all file paths in specific folder
 * @param {string[]} [folderPaths] Folder path to search in
 * @param {module:interfaces.SearchOptions} options Whether to search subfolders
 * @return {Promise<void>}
 */
async function storeFolderPaths(
    folderPaths,
    options = {
        deepSearch: true
    }
) {
    if (!folderPaths) {
        folderPaths = await readWorkspaceFolderNames();
    }

    if (folderPaths.length === 1) {
        const filePaths = await readFolderPaths(folderPaths[0], options);
        storePaths(filePaths);
        return;
    }

    const filePaths = await Promise.all(
        folderPaths.map(async (path) => await readFolderPaths(path, options))
    );

    storePaths(filePaths.flat());
}

module.exports = {
    storedPath,
    storePaths,
    storeFolderPaths
};
