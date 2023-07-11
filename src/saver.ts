import { readdirSync, statSync } from "fs";
import { sep } from "path";
import { saveFilePaths } from "./storage";
import { workspaceFolders } from "./utilities";

export interface SearchOptions {
    deepSearch?: boolean;
}

export function getFilePathsInFolder(
    folderPath: string,
    options: SearchOptions
): string[] {
    if (!statSync(folderPath).isDirectory()) {
        throw new Error("Folder path is invalid: " + folderPath);
    }

    const allFiles: string[] = [];

    for (const name of readdirSync(folderPath)) {
        const fullPath = folderPath + sep + name;
        if (name.includes(".") && statSync(fullPath).isFile()) {
            allFiles.push(fullPath);
        } else if (options.deepSearch && statSync(fullPath).isDirectory()) {
            allFiles.push(...getFilePathsInFolder(fullPath, options));
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

    const filePaths = folderPaths.flatMap((path) =>
        getFilePathsInFolder(path, options)
    );

    saveFilePaths(filePaths);
}
