import { FilePath } from "./types/filePath";

const filePaths: FilePath[] = [];

export function getPaths(): FilePath[] {
    return filePaths;
}

export function storedPath(path: string): boolean {
    return filePaths.some((fp) => fp.fullPath === path);
}

export function storePaths(paths: string[]): void {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        if (storedPath(path)) {
            continue;
        }

        const filePath = new FilePath(path);
        filePaths.push(filePath);
    }
}
