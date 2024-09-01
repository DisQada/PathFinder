/** @import {SearchOptions} from '../../src/options.js' */
import { ok, equal, deepEqual } from 'assert/strict'
import { resolve } from 'path'
import { readFolderPaths, readWorkspaceFolderNames } from '../../src/func/readers.js'

describe('func', function () {
  describe('readers', function () {
    describe('readWorkspaceFolderNames()', function () {
      it('Return array of valid folder names', async function () {
        const validFolderNames = await readWorkspaceFolderNames()

        ok(Array.isArray(validFolderNames))

        validFolderNames.forEach((folderName) => {
          equal(typeof folderName, 'string')
          ok(!/[._]/.test(folderName))
        })

        deepEqual(validFolderNames, ['src', 'test'])
      })
    })

    describe('readFolderPaths()', function () {
      it('Without deepSearch', async function () {
        /** @type {SearchOptions} */
        const options = {}
        const myFolderPath = resolve('test')

        /** @type {string[]} */
        const paths = await readFolderPaths(myFolderPath, options)

        ok(Array.isArray(paths))

        paths.forEach((folderName) => {
          equal(typeof folderName, 'string')
        })

        deepEqual(paths, [resolve('test', 'safe.test.js')])
      })

      it('With deepSearch', async function () {
        /** @type {SearchOptions} */
        const options = {
          deepSearch: true
        }
        const myFolderPath = resolve('test')

        /** @type {string[]} */
        const paths = await readFolderPaths(myFolderPath, options)

        ok(Array.isArray(paths))

        paths.forEach((folderName) => {
          equal(typeof folderName, 'string')
        })

        deepEqual(paths, [
          resolve('test', 'class', 'filePath.test.js'),
          resolve('test', 'func', 'finder.test.js'),
          resolve('test', 'func', 'readers.test.js'),
          resolve('test', 'func', 'storer.test.js'),
          resolve('test', 'safe.test.js')
        ])
      })
    })
  })
})
