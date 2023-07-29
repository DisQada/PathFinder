const { readdir, stat } = require("fs/promises");
const { sep } = require("path");

/**
 * Get all folder names in the root directory of the workspace
 * @return An array of the folder names
 */
async function readWorkspaceFolderNames() {
    const invalidNameRegExp = /[._]/;

    const folderNames = await readdir(process.cwd(), {
        withFileTypes: true
    });

    const validFolderNames = folderNames.filter(
        (folderName) =>
            !invalidNameRegExp.test(folderName.name) && folderName.isDirectory()
    );

    return validFolderNames.map((folderName) => folderName.name);
}

/**
 * Get all paths inside a folder path
 * @param {string} folderPath The path of the folder to read
 * @param {module:interfaces.SearchOptions} options Whether to read subfolders or not
 * @return {Promise<string[]>} An array of paths
 */
async function readFolderPaths(folderPath, options) {
    const stats = await stat(folderPath);
    if (!stats.isDirectory()) {
        throw new Error("Folder path is invalid: " + folderPath);
    }

    const allFiles = [];

    for (const name of await readdir(folderPath)) {
        const fullPath = folderPath + sep + name;
        const stats = await stat(fullPath);

        if (stats.isFile()) {
            allFiles.push(fullPath);
        } else if (options.deepSearch && stats.isDirectory()) {
            const deepPaths = await readFolderPaths(fullPath, options);
            allFiles.push(...deepPaths);
        }
    }

    return allFiles;
}

module.exports = {
    readWorkspaceFolderNames,
    readFolderPaths
};
