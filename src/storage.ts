import { FilePath } from "./types/filePath";

let paths: FilePath[] = [];

export function getPaths(): FilePath[] {
    return paths;
}

export function setPaths(newPaths: FilePath[]): void {
    paths = newPaths;
}
