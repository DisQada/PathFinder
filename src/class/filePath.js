const { statSync } = require("fs");
const { isAbsolute, resolve, sep } = require("path");

/**
 * The class of file paths in the tool.
 * @class
 */
class FilePath {
    /**
     * File name without extension.
     * @type {string}
     * @example
     * const fp = new FilePath("example.test.js");
     * // fp.name = "example"
     */
    name;

    /**
     * File's parent folder/directory name.
     * @type {string}
     * @example
     * const fp = new FilePath("main/example.js");
     * // fp.folder = "main"
     */
    folder;

    /**
     * File extension after the first dot.
     * @type {string}
     * @example
     * const fp = new FilePath("example.test.js");
     * // fp.extension = "test.js"
     */
    extension;

    /**
     * File's absolute path before the parent folder/directory.
     * @type {string}
     * @example
     * const fp = new FilePath("C:/users/someone/main/example.js");
     * // fp.root = "C:/users/someone"
     */
    root;

    /**
     * Defining the initial values of the class instance.
     * @param {string} filePath - An absolute or relative to workspace path, if not, the `relativeTo` parameter must have a value.
     * @param {string} [relativeTo] - The path relative to the location of the `filePath` parameter if wasn't relative to the workspace.
     * @throws {Error} If `filePath` is not absolute or relative to workspace path.
     */
    constructor(filePath, relativeTo) {
        if (!isAbsolute(filePath)) {
            if (relativeTo) {
                filePath = resolve(relativeTo, filePath);
            } else {
                filePath = resolve(filePath);
            }
        }

        const stat = statSync(filePath);
        if (!stat?.isFile()) {
            throw new Error("The path is not pointing to a file: " + filePath);
        }

        const parts = filePath.split(sep);

        const fullName = parts.pop();
        const index = fullName.indexOf(".");

        if (index === -1) {
            this.name = fullName;
            this.extension = "";
        } else {
            this.name = fullName.substring(0, index);
            this.extension = fullName.substring(index + 1);
        }

        this.folder = parts.pop();
        this.root = parts.join(sep);
    }

    /**
     * File name with extension.
     * @returns {string}
     * @public
     */
    get fullName() {
        if (this.extension === "") {
            return this.name;
        }

        return this.name + "." + this.extension;
    }

    /**
     * Absolute file path.
     * @returns {string}
     * @public
     */
    get fullPath() {
        return this.root + sep + this.folder + sep + this.fullName;
    }
}

module.exports = {
    FilePath
};
