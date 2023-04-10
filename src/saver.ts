import { workspaceFolders, getFilePathsInFolder } from "./helpers/saver";
import { saveFilePaths } from "./storage";

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
