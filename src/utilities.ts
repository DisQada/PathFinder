import { readdirSync, statSync } from "fs";
import { resolve } from "path";

export async function workspaceFolders(): Promise<string[]> {
    let folderNames: string[] = readdirSync(resolve());
    folderNames = folderNames.filter(
        (folderName: string) =>
            !folderName.includes(".") &&
            !folderName.includes("_") &&
            statSync(folderName).isDirectory()
    );

    return folderNames;
}
