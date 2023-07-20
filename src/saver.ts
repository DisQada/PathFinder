import { SearchOptions } from "./helper/interfaces";
import { storePaths } from "./storage";
import { readFolderPaths, readWorkspaceFolderNames } from "./utilities";

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
