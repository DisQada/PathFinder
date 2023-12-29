const { resolve, sep } = require("node:path");
const { FilePath } = require("../../src/class/filePath");

describe("Instantiation with an invalid path", () => {
    test("Absolute invalid file path", () => {
        const myPath = "tests/fake.test.js";

        expect(() => {
            new FilePath(myPath);
        }).toThrow();
    });

    test("Relative invalid file path", () => {
        const myPath = "../saver.test.js";

        expect(() => {
            new FilePath(myPath);
        }).toThrow();
    });

    test("Absolute valid directory path", () => {
        const myPath = "tests/class";

        expect(() => {
            new FilePath(myPath);
        }).toThrow();
    });
});

describe("Instantiation with a valid absolute path", () => {
    test("Deep file path", () => {
        const myPath = "tests/class/filePath.test.js";
        const resolved = resolve(myPath);
        const filePath = new FilePath(myPath);

        expect(typeof filePath).toBe("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("filePath.test.js");

        const index = resolved.indexOf("class");
        const root = resolved.substring(0, index - 1);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("class");
        expect(filePath.name).toEqual("filePath");
        expect(filePath.extension).toEqual("test.js");
    });

    test("Workspace file path", () => {
        const myPath = "LICENSE.txt";
        const resolved = resolve(myPath);
        const filePath = new FilePath(myPath);

        expect(typeof filePath).toBe("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("LICENSE.txt");

        const parts = resolved.split(sep);
        const root = parts.slice(0, -2).join(sep);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("PathFinder");
        expect(filePath.name).toEqual("LICENSE");
        expect(filePath.extension).toEqual("txt");
    });
});

describe("Instantiation with a valid relative path", () => {
    /**
     * A shortcut for repeated code.
     * @param {FilePath} filePath - The string path of the file.
     * @param {string} resolved - The resolved path of the original file.
     * @example
     * innerTest("./example.js", path.resolve(__dirname))
     */
    function innerTest(filePath, resolved) {
        expect(typeof filePath).toBe("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("safe.test.js");

        const index = resolved.indexOf("tests");
        const root = resolved.substring(0, index - 1);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("tests");
        expect(filePath.name).toEqual("safe");
        expect(filePath.extension).toEqual("test.js");
    }

    const myPath = "../safe.test.js";
    const resolved = resolve(__dirname, myPath);

    // eslint-disable-next-line jest/expect-expect
    test("Absolute path", () => {
        const filePath = new FilePath(resolved);
        innerTest(filePath, resolved);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Relative path", () => {
        const filePath = new FilePath(myPath, __dirname);
        innerTest(filePath, resolved);
    });
});
