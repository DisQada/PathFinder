import { expect, test } from "vitest";
import { getFilePathsInFolder } from "../src/saver";
import { aFilePath, allFilePaths, saveFilePaths } from "../src/storage";
import { FilePath } from "../src/types/filePath";

const folders = ["src", "tests"];

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

    let path = aFilePath("storage");
    expect(path).to.be.an("array");

    path = aFilePath("index");
    expect(path).toBeInstanceOf(FilePath);
});
