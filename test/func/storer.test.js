/** @import {SearchOptions} from '../../src/options.js' */
import { equal, doesNotReject } from 'assert/strict'
import { resolve } from 'path'
import { storeFolderPaths, storePaths, storedPath } from '../../src/func/storer.js'

const folderNames = ['src', 'test']
const myPath = resolve('test/safe.test.js')

describe('func', function () {
  describe('storer', function () {
    describe('storeFolderPaths()', function () {
      it('Empty array', async function () {
        doesNotReject(async () => {
          await storeFolderPaths([])
        })
      })

      it('Folder names', async function () {
        doesNotReject(async () => {
          await storeFolderPaths(folderNames)
        })
      })

      it('Folder names with options', async function () {
        doesNotReject(async () => {
          /** @type {SearchOptions} */
          const options = {
            deepSearch: true
          }

          await storeFolderPaths(folderNames, options)
        })
      })
    })

    describe('storePaths()', function () {
      it('String path array', function () {
        const nothing = storePaths([myPath])
        equal(nothing, undefined)
      })
    })

    describe('storedPath()', function () {
      it('Check if paths are stored', function () {
        equal(storedPath(myPath), true)
        equal(storedPath('fake path'), false)
      })
    })
  })
})
