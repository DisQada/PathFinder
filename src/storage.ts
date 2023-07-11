import { FilePath } from "./types/filePath";

const filePaths = new Map<string, FilePath[]>();

export function getPaths(): Map<string, FilePath[]> {
    return filePaths;
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
