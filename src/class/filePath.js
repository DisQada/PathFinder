const { statSync } = require("fs");
const { isAbsolute, resolve, sep } = require("path");

class FilePath {
    name;
    folder;
    extension;
    root;

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

    get fullName() {
        if (this.extension === "") {
            return this.name;
        }

        return this.name + "." + this.extension;
    }
    get fullPath() {
        return this.root + sep + this.folder + sep + this.fullName;
    }
}

module.exports = {
    FilePath
};
