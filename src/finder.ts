import { getPaths } from "./storage";
import { FilePath } from "./types/filePath";

export function allFilePaths(): FilePath[] | undefined {
    const values = [...getPaths().values()];

    if (values.length > 0) {
        return values.flat();
    }

    return undefined;
}

export function aFilePath(fileName: string): FilePath | FilePath[] | undefined {
    const value = getPaths().get(fileName);
    if (value?.length === 1) {
        return value[0];
    } else {
        return value;
    }
}
