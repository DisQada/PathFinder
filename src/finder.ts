import { filterOptions } from "./helper/interfaces";
import { getPaths } from "./safe";
import { FilePath } from "./types/filePath";

export function findPaths(options?: filterOptions): FilePath[] {
    function test(path: FilePath, propertyName: string) {
        // @ts-expect-error
        const property = options?.[propertyName] || undefined;
        if (!property) {
            return true;
        }

        if (typeof property === "string") {
            // @ts-expect-error
            return property === path[propertyName];
        } else {
            // @ts-expect-error
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

export function findPath(options: filterOptions): FilePath | undefined {
    return findPaths(options)[0];
}
