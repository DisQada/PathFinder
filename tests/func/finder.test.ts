import type { filterOptions } from "../../src/class/interfaces";

import { describe, expect, test } from "vitest";
import { FilePath } from "../../dist/class/filePath";
import { findPath, findPaths } from "../../dist/func/finder";
import { storeFolderPaths } from "../../dist/func/storer";

describe("findPath function", async () => {
    await storeFolderPaths(["dist", "tests"]);

    test("find first match", () => {
        const options: filterOptions = { name: "finder" };
        const result = findPath(options);
        expect(result).toBeInstanceOf(FilePath);
    });

    test("find js file", () => {
        const options: filterOptions = { name: "finder", extension: "js" };
        const result = findPath(options);
        expect(result).toBeInstanceOf(FilePath);
    });

    test("find test.ts file", () => {
        const options: filterOptions = { name: "finder", extension: "test.ts" };
        const result = findPath(options);
        expect(result).toBeInstanceOf(FilePath);
    });

    test("find non-existing file", () => {
        const options: filterOptions = { name: "finder", extension: "png" };
        const result = findPath(options);
        expect(result).toBeUndefined();
    });
});

describe("findPaths function", async () => {
    test("No filter search", () => {
        const options: filterOptions = {};

        const result = findPaths(options);

        expect(result).toBeInstanceOf(Array<FilePath>);
        expect(result.length).toEqual(12);
    });

    test("Existing filter options search", () => {
        const options: filterOptions = {
            name: "finder"
        };

        const result = findPaths(options);

        expect(result).toBeInstanceOf(Array<FilePath>);
        expect(result.length).toEqual(2);
    });

    test("Non-existing filter options search", () => {
        const options: filterOptions = {
            name: "fake name"
        };

        const result = findPaths(options);

        expect(result).toBeInstanceOf(Array<FilePath>);
        expect(result.length).toEqual(0);
    });
});
