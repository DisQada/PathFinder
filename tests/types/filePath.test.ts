import { resolve, sep } from "path";
import { expect, test } from "vitest";
import { FilePath } from "../../src/types/filePath";

test("Invalid path", () => {
    let myPath = "tests/fake.test.ts";

    try {
        new FilePath(myPath);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }

    myPath = "../saver.test.ts";

    try {
        new FilePath(myPath);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});

test("Class instantiating", () => {
    {
        const myPath = "tests/types/filePath.test.ts";
        const resolved = resolve(myPath);
        const filePath = new FilePath(myPath);

        expect(filePath).to.be.an("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("filePath.test.ts");

        const index = resolved.indexOf("types");
        const root = resolved.substring(0, index - 1);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("types");
        expect(filePath.name).toEqual("filePath");
        expect(filePath.extension).toEqual("test.ts");
    }

    {
        const myPath = "LICENSE";
        const resolved = resolve(myPath);
        const filePath = new FilePath(myPath);

        expect(filePath).to.be.an("object");

        expect(filePath.fullPath).toEqual(resolved);
        expect(filePath.fullName).toEqual("LICENSE");

        const parts = resolved.split(sep);
        const root = parts.slice(0, -2).join(sep);

        expect(filePath.root).toEqual(root);
        expect(filePath.folder).toEqual("pathfinder");
        expect(filePath.name).toEqual("LICENSE");
        expect(filePath.extension).toEqual("");
    }
});

test("Relative path", () => {
    const myPath = "../saver.test.ts";
    const resolved = resolve(__dirname, myPath);
    const filePath = new FilePath(resolved);

    expect(filePath).to.be.an("object");

    expect(filePath.fullPath).toEqual(resolved);
    expect(filePath.fullName).toEqual("saver.test.ts");

    const index = resolved.indexOf("tests");
    const root = resolved.substring(0, index - 1);
    expect(filePath.root).toEqual(root);
    expect(filePath.folder).toEqual("tests");
    expect(filePath.name).toEqual("saver");
    expect(filePath.extension).toEqual("test.ts");
});

test("Directory path", () => {
    const myPath = "tests/types";

    try {
        new FilePath(myPath);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});
