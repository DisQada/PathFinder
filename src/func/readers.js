/** @import {SearchOptions} from '../options.js' */
import { sep } from 'path'
import { readdir, stat } from 'fs/promises'

/**
 * Get all folder names in the root directory of the workspace.
 * The function will automatically ignore all directories with `.` (dot) or `_` (underscore).
 * @returns {Promise<string[]>} - An array of the folder names.
 * @example <caption>If the top level folders are 'src', 'dist', 'node_modules' and '.git', then it will return ['src', 'dist']</caption>
 * const folderNames = readWorkspaceFolderNames()
 */
export async function readWorkspaceFolderNames() {
  const invalidNameRegExp = /[._]/
  const folderNames = await readdir(process.cwd(), { withFileTypes: true })
  const validFolderNames = folderNames.filter((fn) => !invalidNameRegExp.test(fn.name) && fn.isDirectory())
  return validFolderNames.map((fn) => fn.name)
}

/**
 * Get all paths inside a folder path.
 * @param {string} folderPath - The path of the folder to read.
 * @param {SearchOptions} options - Whether to read subfolders or not.
 * @returns {Promise<string[]>} An array of paths.
 * @example
 * const paths = readFolderPaths(['src'])
 * @example
 * const paths = readFolderPaths(['src'], { deepSearch = true })
 */
export async function readFolderPaths(folderPath, options) {
  const stats = await stat(folderPath)
  if (!stats.isDirectory()) throw new Error('Folder path is invalid: ' + folderPath)

  const allFiles = []

  for (const name of await readdir(folderPath)) {
    const fullPath = folderPath + sep + name
    const stats = await stat(fullPath)

    if (stats.isFile()) allFiles.push(fullPath)
    else if (options.deepSearch && stats.isDirectory()) {
      const deepPaths = await readFolderPaths(fullPath, options)
      allFiles.push(...deepPaths)
    }
  }

  return allFiles
}
