import { test, expect } from "vitest";
import { storeFilePathsInFolders } from "../src/saver";

test("filePath class initialising", () => {
	expect(storeFilePathsInFolders()).not.toBeInstanceOf(Error);
});
