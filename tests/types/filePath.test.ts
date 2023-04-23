import path, { sep } from "path";
import { expect, test } from "vitest";
import { FilePath } from "../../src/types/filePath";

test("filePath class initialising", () => {
	const myPath = "./tests/types/filePath.test.ts";
	const resolved = path.resolve(myPath);
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
});

test("filePath class initialising", () => {
	const myPath = "./LICENSE";
	const resolved = path.resolve(myPath);
	const filePath = new FilePath(myPath);

	const parts = resolved.split(sep);
	const root = parts.slice(0, -2).join(sep);

	expect(filePath).to.be.an("object");

	expect(filePath.fullPath).toEqual(resolved);
	expect(filePath.fullName).toEqual("LICENSE");

	expect(filePath.root).toEqual(root);
	expect(filePath.folder).toEqual("pathfinder");
	expect(filePath.name).toEqual("LICENSE");
	expect(filePath.extension).toEqual("");
});

test("filePath throwing error to dir path", () => {
	const myPath = "./tests/types";

	try {
		new FilePath(myPath);
	} catch (err) {
		expect(err).toBeInstanceOf(Error);
	}
});
