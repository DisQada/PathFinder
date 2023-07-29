const { resolve } = require("path");
const { FilePath } = require("../src/class/filePath");
const { getPaths, setPaths } = require("../src/safe");

const myPath = resolve("tests/safe.test.js");

describe("Set stored paths", () => {
    test("", () => {
        try {
            setPaths([new FilePath(myPath)]);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});

describe("Get stored paths", () => {
    test("", () => {
        const paths = getPaths();
        expect(Array.isArray(paths)).toBeTruthy();

        const fp = paths[0];
        expect(fp).toBeInstanceOf(FilePath);
        expect(fp.fullPath).toEqual(myPath);
    });
});
