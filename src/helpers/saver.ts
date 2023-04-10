import { readdirSync, statSync } from "fs";
import { resolve, sep } from "path";

export async function workspaceFolders(): Promise<string[]> {
	// const ignoredFolders: string[] = (await import("../ignoredFolders"))
	// 	.default;

	let folderNames: string[] = readdirSync(resolve());
	folderNames = folderNames.filter(
		// (folderName: string) =>
		// 	!ignoredFolders.some((name: string) => folderName === name) &&
		//     statSync(folderName).isDirectory()

		(folderName: string) =>
			!folderName.includes(".") &&
			!folderName.includes("_") &&
			statSync(folderName).isDirectory()
	);

	return folderNames;
}

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
