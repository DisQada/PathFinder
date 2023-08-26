const { resolve } = require("path");
const {
    storeFolderPaths,
    storePaths,
    storedPath
} = require("../../src/func/storer");

const folderNames = ["src", "tests"];
const myPath = resolve("tests/safe.test.js");

describe("storeFolderPaths functions", () => {
    test("Empty array", async () => {
        expect(async () => {
            await storeFolderPaths([]);
        }).not.toThrow();
    });

    test("Folder names", async () => {
        expect(async () => {
            await storeFolderPaths(folderNames);
        }).not.toThrow();
    });

    test("Folder names with options", async () => {
        expect(async () => {
            /** @type {import("../../src/class/interfaces").SearchOptions} */
            const options = {
                deepSearch: true
            };

            // @ts-expect-error
            await storeFolderPaths(folderNames, options);
        }).not.toThrow();
    });
});

describe("storePaths functions", () => {
    test("String path array", () => {
        const nothing = storePaths([myPath]);
        expect(nothing).toBeUndefined();
    });
});

describe("storedPath functions", () => {
    test("Check if paths are stored", () => {
        expect(storedPath(myPath)).toBeTruthy();
        expect(storedPath("fake path")).toBeFalsy();
    });
});
