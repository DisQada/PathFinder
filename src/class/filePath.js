import { statSync } from 'fs'
import { isAbsolute, resolve, sep } from 'path'

/**
 * The class of file paths in the tool.
 * @class
 */
export class FilePath {
  /**
   * File name without extension.
   * @type {string}
   * @example
   * const p = new FilePath('example.test.js')
   * // p.name = 'example'
   */
  name

  /**
   * File's parent folder/directory name.
   * @type {string}
   * @example
   * const p = new FilePath('main/example.js')
   * // p.folder = 'main'
   */
  folder

  /**
   * File extension after the first dot.
   * @type {string}
   * @example
   * const p = new FilePath('example.test.js')
   * // p.extension = 'test.js'
   */
  extension

  /**
   * File's absolute path before the parent folder/directory.
   * @type {string}
   * @example
   * const p = new FilePath('C:/users/someone/main/example.js')
   * // p.root = 'C:/users/someone'
   */
  root

  /**
   * Defining the initial values of the class instance.
   * @param {string} strP - An absolute or relative to workspace path, if not, the `relativeTo` parameter must have a value.
   * @param {string} [relativeTo] - The path relative to the location of the `strP` parameter if wasn't relative to the workspace.
   * @throws {Error} If `strP` is not absolute or relative to workspace path.
   */
  constructor(strP, relativeTo) {
    if (!isAbsolute(strP)) {
      if (relativeTo) {
        strP = resolve(relativeTo, strP)
      } else {
        strP = resolve(strP)
      }
    }

    const stat = statSync(strP)
    if (!stat?.isFile()) {
      throw new Error('The path is not pointing to a file: ' + strP)
    }

    const parts = strP.split(sep)

    const fullName = parts.pop() || '.'
    const index = fullName.indexOf('.')

    if (index === -1) {
      this.name = fullName
      this.extension = ''
    } else {
      this.name = fullName.substring(0, index)
      this.extension = fullName.substring(index + 1)
    }

    this.folder = parts.pop() || ''
    this.root = parts.join(sep)
  }

  /**
   * @returns {string} - File name with extension
   * @public
   */
  get fullName() {
    if (this.extension === '') {
      return this.name
    }

    return this.name + '.' + this.extension
  }

  /**
   * @returns {string} - Absolute file path
   * @public
   */
  get fullPath() {
    return this.root + sep + this.folder + sep + this.fullName
  }
}
