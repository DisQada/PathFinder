import { resolve } from "path";
import { describe, expect, test } from "vitest";
import { FilePath } from "../dist/class/filePath";
import { getPaths, setPaths } from "../dist/safe";

const myPath = resolve("tests/safe.test.ts");

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
        expect(paths).toBeInstanceOf(Array<FilePath>);

        const fp = paths[0];
        expect(fp.fullPath).toEqual(myPath);
    });
});
