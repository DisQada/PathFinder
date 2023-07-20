import { SearchOptions } from "./helper/interfaces";
import { readFolderPaths, readWorkspaceFolderNames } from "./readers";
import { getPaths, setPaths } from "./safe";
import { FilePath } from "./types/filePath";

export function storedPath(path: string): boolean {
    return getPaths().some((fp) => fp.fullPath === path);
}

export function storePaths(paths: string[]): void {
    const newPaths: FilePath[] = getPaths();

    const length = paths.length;
    for (let i = 0; i < length; i++) {
        const path = paths[i];

        if (storedPath(path)) {
            continue;
        }

        const filePath = new FilePath(path);
        newPaths.push(filePath);
    }

    setPaths(newPaths);
}

export async function storeFolderPaths(
    folderPaths?: string[],
    options: SearchOptions = {
        deepSearch: true
    }
): Promise<void> {
    if (!folderPaths) {
        folderPaths = await readWorkspaceFolderNames();
    }

    if (folderPaths.length === 1) {
        const filePaths = await readFolderPaths(folderPaths[0], options);
        storePaths(filePaths);
        return;
    }

    const filePaths = await Promise.all(
        folderPaths.map(async (path) => await readFolderPaths(path, options))
    );

    storePaths(filePaths.flat());
}
