/**
 * The main paths array.
 * @type {import('./class/filePath').FilePath[]}
 * @default []
 */
let paths = []

/**
 * Get all saved paths.
 * @returns {import('./class/filePath').FilePath[]} All saved paths.
 * @example
 * const paths = getPaths()
 */
export function getPaths() {
  return paths
}

/**
 * Set the new paths as the saved paths.
 * @param {import('./class/filePath').FilePath[]} newPaths - The new paths assigned to the global variable.
 * @returns {void}
 * @example
 * const newPaths = [new FilePath(...)]
 * setPaths(newPaths)
 */
export function setPaths(newPaths) {
  paths = newPaths
}
