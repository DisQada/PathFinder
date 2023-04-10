import { test, expect } from "vitest";
import {
	workspaceFolders,
	getFilePathsInFolder
} from "../../src/helpers/saver";

const folderPaths = await workspaceFolders();

test("getWorkspaceFolders function", async () => {
	expect(folderPaths).to.be.an("array");
	if (folderPaths.length === 2) {
		expect(folderPaths).toEqual(["src", "tests"]);
	} else {
		expect(folderPaths).toEqual(["dist", "src", "tests"]);
	}
});

test("getFilePathsInFolder function", async () => {
	for (let i = 0; i < folderPaths.length; i++) {
		const paths = getFilePathsInFolder(folderPaths[i]);
		expect(paths).to.be.an("array");
	}

	for (let i = 0; i < folderPaths.length; i++) {
		const paths = getFilePathsInFolder(folderPaths[i], true);
		expect(paths).to.be.an("array");
	}

	try {
		getFilePathsInFolder(__filename);
	} catch (err) {
		expect(err).toBeInstanceOf(Error);
	}
});
