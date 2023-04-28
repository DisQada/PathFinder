import { expect, test } from "vitest";
import { workspaceFolders } from "../dist/utilities";

test("getWorkspaceFolders function", async () => {
    const folderPaths = await workspaceFolders();

    expect(folderPaths).to.be.an("array");
    expect(folderPaths).toEqual(["dist", "src", "tests", "types"]);
});
