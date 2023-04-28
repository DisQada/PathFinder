import { expect, test } from "vitest";
import { getFilePathsInFolder } from "../dist/saver";
import { aFilePath, allFilePaths, saveFilePaths } from "../dist/storage";
import { FilePath } from "../dist/types/filePath";

const folders = ["dist", "tests"];

test("Retrieve paths without saving", async () => {
    const path1 = allFilePaths();
    expect(path1).to.be.an("undefined");

    const path2 = aFilePath("anything");
    expect(path2).to.be.an("undefined");
});

test("saveFilePaths & allFilePaths functions", async () => {
    for (const folder of folders) {
        const paths = getFilePathsInFolder(folder);
        saveFilePaths(paths);
    }

    const path = allFilePaths();
    expect(path).to.be.an("array");
});

test("saveFilePaths & aFilePath functions", async () => {
    for (const folder of folders) {
        const paths = getFilePathsInFolder(folder);
        saveFilePaths(paths);
    }

    const path = aFilePath("storage");
    expect(path).toBeInstanceOf(Array<FilePath>);

    // path = aFilePath("index.js");
    // expect(path).toBeInstanceOf(FilePath);
});
