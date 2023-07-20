import { resolve } from "path";
import { describe, expect, test } from "vitest";
import {
    readFolderPaths,
    readWorkspaceFolderNames
} from "../../dist/func/readers";
import { SearchOptions } from "../../src/class/interfaces";

describe("readWorkspaceFolderNames function", async () => {
    test("Return array of valid folder names", async () => {
        const validFolderNames = await readWorkspaceFolderNames();

        expect(Array.isArray(validFolderNames)).toBe(true);

        validFolderNames.forEach((folderName) => {
            expect(typeof folderName).toBe("string");
            expect(folderName).not.toMatch(/[._]/);
        });

        expect(validFolderNames).toEqual(["dist", "src", "tests", "types"]);
    });
});

describe("readFolderPaths function", async () => {
    test("Without deepSearch", async () => {
        const options: SearchOptions = {};
        const myFolderPath = resolve("tests");

        const paths: string[] = await readFolderPaths(myFolderPath, options);

        expect(Array.isArray(paths)).toBe(true);

        paths.forEach((folderName) => {
            expect(typeof folderName).toBe("string");
        });

        expect(paths).toEqual([resolve("tests", "safe.test.ts")]);
    });

    test("With deepSearch", async () => {
        const options: SearchOptions = {
            deepSearch: true
        };
        const myFolderPath = resolve("tests");

        const paths: string[] = await readFolderPaths(myFolderPath, options);

        expect(Array.isArray(paths)).toBe(true);

        paths.forEach((folderName) => {
            expect(typeof folderName).toBe("string");
        });

        expect(paths).toEqual([
            resolve("tests", "class", "filePath.test.ts"),
            resolve("tests", "func", "finder.test.ts"),
            resolve("tests", "func", "readers.test.ts"),
            resolve("tests", "func", "storer.test.ts"),
            resolve("tests", "safe.test.ts")
        ]);
    });
});
