/** @import {FilterOptions} from '../../src/options.js' */
const { ok, equal } = require('assert/strict')
const { FilePath } = require('../../src/class/filePath.js')
const { findPath, findPaths } = require('../../src/func/finder.js')
const { storeFolderPaths } = require('../../src/func/storer.js')

describe('func', function () {
  describe('finder', function () {
    describe('findPath()', function () {
      it('find first match', async function () {
        await storeFolderPaths(['src', 'test'])

        /** @type {FilterOptions} */
        const options = { name: 'finder' }
        const result = findPath(options)
        ok(result instanceof FilePath)
      })

      it('find js file', async function () {
        await storeFolderPaths(['src', 'test'])

        /** @type {FilterOptions} */
        const options = { name: 'finder', extension: 'js' }
        const result = findPath(options)
        ok(result instanceof FilePath)
      })

      it('find test.js file', async function () {
        await storeFolderPaths(['src', 'test'])

        /** @type {FilterOptions} */
        const options = { name: 'finder', extension: 'test.js' }
        const result = findPath(options)
        ok(result instanceof FilePath)
      })

      it('find non-existing file', async function () {
        await storeFolderPaths(['src', 'test'])

        /** @type {FilterOptions} */
        const options = { name: 'finder', extension: 'png' }
        const result = findPath(options)
        equal(result, undefined)
      })
    })

    describe('findPaths()', function () {
      it('Without parameter', async function () {
        await storeFolderPaths()

        const result = findPaths()

        ok(Array.isArray(result))
        ok(result[0] instanceof FilePath)
        equal(result.length, 13)
      })

      it('Only one folder name', async function () {
        await storeFolderPaths(['src'])

        const result = findPaths()

        ok(Array.isArray(result))
        ok(result[0] instanceof FilePath)
        equal(result.length, 8)
      })

      it('No filter search', async function () {
        await storeFolderPaths(['src', 'test'])

        const result = findPaths()

        ok(Array.isArray(result))
        ok(result[0] instanceof FilePath)
        equal(result.length, 13)
      })

      it('Not storing duplicates', async function () {
        await storeFolderPaths(['src', 'test'])
        await storeFolderPaths(['src', 'test'])
        await storeFolderPaths(['src', 'test'])

        const result = findPaths()

        ok(Array.isArray(result))
        ok(result[0] instanceof FilePath)
        equal(result.length, 13)
      })

      it('Existing filter string options search', async function () {
        await storeFolderPaths(['src', 'test'])

        /** @type {FilterOptions} */
        const options = { name: 'finder' }
        const result = findPaths(options)

        ok(Array.isArray(result))
        ok(result[0] instanceof FilePath)
        equal(result.length, 2)
      })

      it('Existing filter regex options search', async function () {
        await storeFolderPaths(['src', 'test'])

        /** @type {FilterOptions} */
        const options = { name: /finder/ }
        const result = findPaths(options)

        ok(Array.isArray(result))
        ok(result[0] instanceof FilePath)
        equal(result.length, 2)
      })

      it('Non-existing filter options search', function () {
        /** @type {FilterOptions} */
        const options = { name: 'fake name' }
        const result = findPaths(options)

        ok(Array.isArray(result))
        equal(result[0], undefined)
        equal(result.length, 0)
      })
      it('Double chain', async function () {
        await storeFolderPaths()

        /** @type {FilterOptions} */
        const options = { extension: 'js' }
        const result = findPaths(options)

        /** @type {FilterOptions} */
        const options2 = { name: 'safe' }
        const result2 = findPaths(options2, result)

        ok(result2.length < result.length)
      })

      it('Triple chain', async function () {
        await storeFolderPaths()

        /** @type {FilterOptions} */
        const options = { extension: 'js' }
        const result = findPaths(options)

        /** @type {FilterOptions} */
        const options2 = { name: /[_a-zA-Z0-9]+/ }
        const result2 = findPaths(options2, result)

        equal(result2.length, result.length)
      })
    })
  })
})
