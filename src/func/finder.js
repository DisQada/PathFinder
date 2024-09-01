/** @import {FilterOptions} from '../options.js' */
/** @import {FilePath} from '../class/filePath.js' */
import { getPaths } from '../safe.js'

/**
 * Find all stored paths with filtering.
 * @param {FilterOptions} [options] - If options is null, all the paths will be returned.
 * @param {FilePath[]} [toSearchIn] - If not provided, the search will be performed on the stored paths.
 * @returns {FilePath[]} - If no paths found, an empty array will be returned.
 * @example <caption>will return all stored js files</caption>
 * findPaths({ extension: 'js' })
 * @example <caption>will return all stored js and json files</caption>
 * findPaths({ extension: /^js(on)?$/ })
 */
export function findPaths(options, toSearchIn) {
  /**
   * Check if the given `p` matches the filter options on a single property level.
   * @param {FilePath} p - The FilePath to check it's property.
   * @param {string} propName - The level in `p` to check.
   * @returns {boolean} - True if matches, false otherwise.
   * @example
   * test('src/example.js', 'name')
   */
  function test(p, propName) {
    const prop = options?.[propName] || undefined
    if (!prop) {
      return true
    }

    if (typeof prop === 'string') {
      return prop === p[propName]
    } else {
      return prop.test(p[propName])
    }
  }
  const paths = toSearchIn || getPaths()

  if (!options) {
    return paths
  }

  return paths.filter((p) => {
    return (
      test(p, 'name') &&
      test(p, 'extension') &&
      test(p, 'folders') &&
      test(p, 'root')
    )
  })
}

/**
 * Search for the first stored FilePath matching the given filter options.
 * @param {FilterOptions} options - FilePath's search filter options.
 * @param {FilePath[]} [otherPaths] - If not provided, the search will be performed on the stored paths.
 * @returns {FilePath | void} - The FilePath if found, otherwise undefined.
 * @example <caption>will return the first file called 'example'</caption>
 * const p = findPath({ name: 'example' })
 * const { ... } = require(p.fullPath)
 */
export function findPath(options, otherPaths) {
  return findPaths(options, otherPaths)[0]
}
