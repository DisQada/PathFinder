import { FilePath } from "./types/filePath";

const filePaths: FilePath[] = [];

export function getPaths(): FilePath[] {
    return filePaths;
}

export function savedFilePath(path: string): boolean {
    return filePaths.some((fp) => fp.fullPath === path);
}

export function saveFilePaths(paths: string[]): void {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        if (savedFilePath(path)) {
            continue;
        }

        const filePath = new FilePath(path);
        filePaths.push(filePath);
    }
}
