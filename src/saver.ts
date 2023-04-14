import { readdirSync, statSync } from "fs";
import { sep } from "path";
import { saveFilePaths } from "./storage";
import { workspaceFolders } from "./utilities";

export function getFilePathsInFolder(
	folderPath: string,
	deepSearch?: boolean
): string[] {
	if (!statSync(folderPath).isDirectory()) {
		throw new Error("Folder path is invalid: " + folderPath);
	}

	const allFiles: string[] = [];

	for (const name of readdirSync(folderPath)) {
		const fullPath = folderPath + sep + name;
		if (name.includes(".") && statSync(fullPath).isFile()) {
			allFiles.push(fullPath);
		} else if (deepSearch && statSync(fullPath).isDirectory()) {
			allFiles.push(...getFilePathsInFolder(fullPath, deepSearch));
		}
	}

	return allFiles;
}

export async function storeFilePathsInFolders(
	folderPaths?: string[],
	deepSearch?: boolean
): Promise<void> {
	if (!folderPaths) {
		folderPaths = await workspaceFolders();
	}

	const filePaths = folderPaths.flatMap((path) =>
		getFilePathsInFolder(path, deepSearch)
	);

	saveFilePaths(filePaths);
}
