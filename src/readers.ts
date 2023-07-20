import { readdir, stat } from "fs/promises";
import { sep } from "path";
import { SearchOptions } from "./helper/interfaces";

export async function readWorkspaceFolderNames(): Promise<string[]> {
    const invalidNameRegExp = /[._]/;

    const folderNames = await readdir(process.cwd(), {
        withFileTypes: true
    });

    const validFolderNames = folderNames.filter(
        (folderName) =>
            !invalidNameRegExp.test(folderName.name) && folderName.isDirectory()
    );

    return validFolderNames.map((folderName) => folderName.name);
}

export async function readFolderPaths(
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
