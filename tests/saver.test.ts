import { expect, test } from "vitest";
import { storeFilePathsInFolders } from "../src/saver";

test("filePath class initialising", async () => {
	expect(await storeFilePathsInFolders()).not.toBeInstanceOf(Error);
});
