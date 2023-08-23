const { resolve } = require("path");
const { FilePath } = require("../src/class/filePath");
const { getPaths, setPaths } = require("../src/safe");

const myPath = resolve("tests/safe.test.js");

describe("storing new paths", () => {
    test("directly", () => {
        const result = setPaths([new FilePath(myPath)]);
        expect(result).toBeUndefined();
    });
});

describe("Get stored paths", () => {
    test("directly", () => {
        const paths = getPaths();
        expect(Array.isArray(paths)).toBeTruthy();

        const fp = paths[0];
        expect(fp).toBeInstanceOf(FilePath);
        expect(fp.fullPath).toEqual(myPath);
    });
});
