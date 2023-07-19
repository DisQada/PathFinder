import { readdir, stat } from "fs/promises";
import { sep } from "path";
import { storePaths } from "./storage";
import { readWorkspaceFolderNames } from "./utilities";

export interface SearchOptions {
    deepSearch?: boolean;
}

async function readFolderPaths(
    folderPath: string,
    options: SearchOptions
): Promise<string[]> {
    const stats = await stat(folderPath);
    if (!stats.isDirectory()) {
        throw new Error("Folder path is invalid: " + folderPath);
    }

    const allFiles: string[] = [];

    for (const name of await readdir(folderPath)) {
        const fullPath = folderPath + sep + name;
        const stats = await stat(fullPath);

        if (stats.isFile()) {
            allFiles.push(fullPath);
        } else if (options.deepSearch && stats.isDirectory()) {
            const deepPaths = await readFolderPaths(fullPath, options);
            allFiles.push(...deepPaths);
        }
    }

    return allFiles;
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
