import { resolve, sep } from "node:path";
import { describe, expect, test } from "vitest";
import { FilePath } from "../../dist/types/filePath";

describe("Instantiation with an invalid path", () => {
    test("Absolute invalid file path", () => {
        const myPath = "tests/fake.test.ts";

        expect(() => {
            new FilePath(myPath);
        }).toThrow();
    });

    test("Relative invalid file path", () => {
        const myPath = "../saver.test.ts";

        expect(() => {
            new FilePath(myPath);
        }).toThrow();
    });

    test("Absolute valid directory path", () => {
        const myPath = "tests/types";

        expect(() => {
            new FilePath(myPath);
        }).toThrow();
    });
});

describe("Instantiation with a valid absolute path", () => {
    test("Deep file path", () => {
        const myPath = "tests/types/filePath.test.ts";
        const resolved = resolve(myPath);
        const filePath = new FilePath(myPath);

        expect(typeof filePath).toBe("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("filePath.test.ts");

        const index = resolved.indexOf("types");
        const root = resolved.substring(0, index - 1);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("types");
        expect(filePath.name).toEqual("filePath");
        expect(filePath.extension).toEqual("test.ts");
    });

    test("Workspace file path", () => {
        const myPath = "LICENSE";
        const resolved = resolve(myPath);
        const filePath = new FilePath(myPath);

        expect(typeof filePath).toBe("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("LICENSE");

        const parts = resolved.split(sep);
        const root = parts.slice(0, -2).join(sep);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("pathfinder");
        expect(filePath.name).toEqual("LICENSE");
        expect(filePath.extension).toEqual("");
    });
});

describe("Instantiation with a valid relative path", () => {
    function innerTest(filePath: FilePath, resolved: string) {
        expect(typeof filePath).toBe("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("safe.test.ts");

        const index = resolved.indexOf("tests");
        const root = resolved.substring(0, index - 1);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("tests");
        expect(filePath.name).toEqual("safe");
        expect(filePath.extension).toEqual("test.ts");
    }

    const myPath = "../safe.test.ts";
    const resolved = resolve(__dirname, myPath);

    test("Relative path", () => {
        const filePath = new FilePath(resolved);
        innerTest(filePath, resolved);
    });

    test("Relative path", () => {
        const filePath = new FilePath(myPath, __dirname);
        innerTest(filePath, resolved);
    });
});
