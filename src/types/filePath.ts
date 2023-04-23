import { statSync } from "fs";
import { isAbsolute, resolve, sep } from "path";

export default class FilePath {
    name: string;
    folder: string;
    extension: string;
    root: string;

    public constructor(filePath: string) {
        if (!isAbsolute(filePath)) {
            filePath = resolve(filePath);
        }

        const stat = statSync(filePath);
        if (!stat?.isFile()) {
            throw new Error("The path is not pointing to a file: " + filePath);
        }

        const parts = filePath.split(sep);

        const fullName = parts.pop() || "";
        const index = fullName.indexOf(".");

        if (index === -1) {
            this.name = fullName;
            this.extension = "";
        } else {
            this.name = fullName.substring(0, index);
            this.extension = fullName.substring(index + 1);
        }

        this.folder = parts.pop() || "";
        this.root = parts.join(sep);
    }

    public get fullName(): string {
        if (this.extension === "") {
            return this.name;
        }

        return this.name + "." + this.extension;
    }
    public get fullPath(): string {
        return this.root + sep + this.folder + sep + this.fullName;
    }
}
