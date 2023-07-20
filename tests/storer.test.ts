import type { SearchOptions } from "../src/helper/interfaces";

import { resolve } from "path";
import { describe, expect, test } from "vitest";
import { storeFolderPaths, storePaths, storedPath } from "../dist/storer";

const folderNames = ["dist", "tests"];
const myPath = resolve("tests/safe.test.ts");

describe("storeFolderPaths functions", () => {
    test("", async () => {
        expect(async () => {
            await storeFolderPaths([]);
        }).not.toThrow();
    });

    test("", async () => {
        expect(async () => {
            await storeFolderPaths(folderNames);
        }).not.toThrow();
    });

    test("", async () => {
        expect(async () => {
            const options: SearchOptions = {
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
