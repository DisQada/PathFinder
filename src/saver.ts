import { readdir, stat } from "fs/promises";
import { sep } from "path";
import { saveFilePaths } from "./storage";
import { workspaceFolders } from "./utilities";

export interface SearchOptions {
    deepSearch?: boolean;
}

async function getFilePathsInFolder(
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
            const deepPaths = await getFilePathsInFolder(fullPath, options);
            allFiles.push(...deepPaths);
        }
    }

    return allFiles;
}

export async function storeFilePathsInFolders(
    folderPaths?: string[],
    options: SearchOptions = {
        deepSearch: true
    }
): Promise<void> {
    if (!folderPaths) {
        folderPaths = await workspaceFolders();
    }

    if (folderPaths.length === 1) {
        const filePaths = await getFilePathsInFolder(folderPaths[0], options);
        saveFilePaths(filePaths);
        return;
    }

    const filePaths = await Promise.all(
        folderPaths.map(
            async (path) => await getFilePathsInFolder(path, options)
        )
    );

    saveFilePaths(filePaths.flat());
}
