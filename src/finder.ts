import { getPaths } from "./storage";
import { FilePath } from "./types/filePath";

export function aFilePath(fileName: string): FilePath | FilePath[] | undefined {
    const paths = getPaths();
    const values = paths.filter((fp) => fp.name === fileName);
    return values.length === 1 ? values[0] : values;
}
