import { readdir } from "fs/promises";

export async function workspaceFolders(): Promise<string[]> {
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
