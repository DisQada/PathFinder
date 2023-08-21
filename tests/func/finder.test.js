const { FilePath } = require("../../src/class/filePath");
const { findPath, findPaths } = require("../../src/func/finder");
const { storeFolderPaths } = require("../../src/func/storer");

describe("findPath function", () => {
    test("find first match", async () => {
        await storeFolderPaths(["src", "tests"]);

        /** @type {import("../../src/class/interfaces").filterOptions} */
        const options = { name: "finder" };
        const result = findPath(options);
        expect(result).toBeInstanceOf(FilePath);
    });

    test("find js file", async () => {
        await storeFolderPaths(["src", "tests"]);

        /** @type {import("../../src/class/interfaces").filterOptions} */
        const options = { name: "finder", extension: "js" };
        const result = findPath(options);
        expect(result).toBeInstanceOf(FilePath);
    });

    test("find test.js file", async () => {
        await storeFolderPaths(["src", "tests"]);

        /** @type {import("../../src/class/interfaces").filterOptions} */
        const options = { name: "finder", extension: "test.js" };
        const result = findPath(options);
        expect(result).toBeInstanceOf(FilePath);
    });

    test("find non-existing file", async () => {
        await storeFolderPaths(["src", "tests"]);

        /** @type {import("../../src/class/interfaces").filterOptions} */
        const options = { name: "finder", extension: "png" };
        const result = findPath(options);
        expect(result).toBeUndefined();
    });
});

describe("findPaths function", () => {
    test("Without parameter", async () => {
        await storeFolderPaths();

        const result = findPaths();

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeInstanceOf(FilePath);
        expect(result.length).toEqual(22);
    });

    test("Only one folder name", async () => {
        await storeFolderPaths(["src"]);

        const result = findPaths();

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeInstanceOf(FilePath);
        expect(result.length).toEqual(7);
    });

    test("No filter search", async () => {
        await storeFolderPaths(["src", "tests"]);

        const result = findPaths();

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeInstanceOf(FilePath);
        expect(result.length).toEqual(13);
    });

    test("Not storing duplicates", async () => {
        await storeFolderPaths(["src", "tests"]);
        await storeFolderPaths(["src", "tests"]);
        await storeFolderPaths(["src", "tests"]);

        const result = findPaths();

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeInstanceOf(FilePath);
        expect(result.length).toEqual(13);
    });

    test("Existing filter string options search", async () => {
        await storeFolderPaths(["src", "tests"]);

        /** @type {import("../../src/class/interfaces").FilterOptions} */
        const options = {
            name: "finder"
        };

        const result = findPaths(options);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeInstanceOf(FilePath);
        expect(result.length).toEqual(2);
    });

    test("Existing filter regex options search", async () => {
        await storeFolderPaths(["src", "tests"]);

        /** @type {import("../../src/class/interfaces").FilterOptions} */
        const options = {
            name: /finder/
        };

        const result = findPaths(options);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeInstanceOf(FilePath);
        expect(result.length).toEqual(2);
    });

    test("Non-existing filter options search", () => {
        /** @type {import("../../src/class/interfaces").filterOptions} */
        const options = {
            name: "fake name"
        };

        const result = findPaths(options);

        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0]).toBeUndefined();
        expect(result.length).toEqual(0);
    });
});
