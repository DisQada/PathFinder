import { FilePath } from "./types/filePath";

const filePaths = new Map<string, FilePath[]>();

export function allFilePaths(): FilePath[] | undefined {
    const values = [...filePaths.values()];

    if (values.length > 0) {
        return values.flat();
    }

    return undefined;
}

export function aFilePath(fileName: string): FilePath | FilePath[] | undefined {
    const value = filePaths.get(fileName);
    if (value?.length === 1) {
        return value[0];
    } else {
        return value;
    }
}

export function saveFilePaths(paths: string[]): void {
    for (let i = 0; i < paths.length; i++) {
        const filePath = new FilePath(paths[i]);

        let exists = false;
        let arr = filePaths.get(filePath.name);

        if (arr) {
            exists = arr.some((path) => path.fullPath === filePath.fullPath);
            if (exists) {
                continue;
            }
        } else {
            arr = [];
        }

        arr.push(filePath);
        filePaths.set(filePath.name, arr);
    }
}
