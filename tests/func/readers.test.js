const { resolve } = require("path");
const {
    readFolderPaths,
    readWorkspaceFolderNames
} = require("../../src/func/readers");

describe("readWorkspaceFolderNames function", () => {
    test("Return array of valid folder names", async () => {
        const validFolderNames = await readWorkspaceFolderNames();

        expect(Array.isArray(validFolderNames)).toBe(true);

        validFolderNames.forEach((folderName) => {
            expect(typeof folderName).toBe("string");
            expect(folderName).not.toMatch(/[._]/);
        });

        expect(validFolderNames).toEqual([
            "src",
            "tests",
            "tutorials",
            "types"
        ]);
    });
});

describe("readFolderPaths function", () => {
    test("Without deepSearch", async () => {
        /** @type {import("../../src/class/interfaces").SearchOptions} */
        const options = {};
        const myFolderPath = resolve("tests");

        /** @type {string[]} */
        const paths = await readFolderPaths(myFolderPath, options);

        expect(Array.isArray(paths)).toBe(true);

        paths.forEach((folderName) => {
            expect(typeof folderName).toBe("string");
        });

        expect(paths).toEqual([resolve("tests", "safe.test.js")]);
    });

    test("With deepSearch", async () => {
        /** @type {import("../../src/class/interfaces").SearchOptions} */
        const options = {
            deepSearch: true
        };
        const myFolderPath = resolve("tests");

        /** @type {string[]} */
        const paths = await readFolderPaths(myFolderPath, options);

        expect(Array.isArray(paths)).toBe(true);

        paths.forEach((folderName) => {
            expect(typeof folderName).toBe("string");
        });

        expect(paths).toEqual([
            resolve("tests", "class", "filePath.test.js"),
            resolve("tests", "func", "finder.test.js"),
            resolve("tests", "func", "readers.test.js"),
            resolve("tests", "func", "storer.test.js"),
            resolve("tests", "safe.test.js")
        ]);
    });
});
