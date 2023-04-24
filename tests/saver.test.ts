import { expect, test } from "vitest";
import { getFilePathsInFolder, storeFilePathsInFolders } from "../src/saver";

test("getFilePathsInFolder function", async () => {
    const folderPaths = ["src", "tests"];

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

test("filePath class initialising", async () => {
    expect(await storeFilePathsInFolders()).not.toBeInstanceOf(Error);
});
