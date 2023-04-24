import { expect, test } from "vitest";
import { workspaceFolders } from "../src/utilities";

const folderPaths = await workspaceFolders();

test("getWorkspaceFolders function", async () => {
    expect(folderPaths).to.be.an("array");
    if (folderPaths.length === 2) {
        expect(folderPaths).toEqual(["src", "tests"]);
    } else {
        expect(folderPaths).toEqual(["dist", "src", "tests"]);
    }
});
