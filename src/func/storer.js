/** @import {SearchOptions} from '../options.js' */
import { readWorkspaceFolderNames, readFolderPaths } from './readers.js'
import { getPaths, setPaths } from '../safe.js'
import { FilePath } from '../class/filePath.js'

/**
 * Check if a file path saved.
 * @param {string} strP - The path string to check for.
 * @returns {boolean} True if saved, false otherwise.
 * @example
 * if (storedPath('.../example.js')) { ... }
 */
export function storedPath(strP) {
  return getPaths().some((p) => p.fullPath === strP)
}

/**
 * Add file paths to the saved ones if not saved already.
 * @param {string[]} strPs - Paths to add.
 * @returns {void}
 * @example
 * storePaths(['example1.js', 'src/example2.js'])
 */
export function storePaths(strPs) {
  const newPaths = []

  const length = strPs.length
  for (let i = 0; i < length; i++) {
    const strP = strPs[i]

    if (storedPath(strP)) {
      continue
    }

    newPaths.push(new FilePath(strP))
  }

  setPaths(newPaths)
}

/**
 * Save all file paths in specific folder.
 * @param {string[]} [folderPaths] - Folder path to search in.
 * @param {SearchOptions} [options] - Whether to search subfolders. @defaultValue { deepSearch: true }
 * @returns {Promise<void>}
 * @example
 * storeFolderPaths()
 * @example
 * storeFolderPaths(['src'])
 * @example
 * storeFolderPaths(['src', 'src/main'], { deepSearch: false })
 */
export async function storeFolderPaths(
  folderPaths,
  options = {
    deepSearch: true
  }
) {
  if (!folderPaths) {
    folderPaths = await readWorkspaceFolderNames()
  }

  if (folderPaths.length === 1) {
    const paths = await readFolderPaths(folderPaths[0], options)
    storePaths(paths)
    return
  }

  const paths = await Promise.all(
    folderPaths.map(async (p) => await readFolderPaths(p, options))
  )

  storePaths(paths.flat())
}
