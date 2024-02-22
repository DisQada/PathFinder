const assert = require('assert')
const { resolve } = require('path')
const {
  storeFolderPaths,
  storePaths,
  storedPath
} = require('../../src/func/storer')

const folderNames = ['src', 'tests']
const myPath = resolve('tests/safe.test.js')

describe('storeFolderPaths functions', function () {
  it('Empty array', async function () {
    assert.doesNotReject(async () => {
      await storeFolderPaths([])
    })
  })

  it('Folder names', async function () {
    assert.doesNotReject(async () => {
      await storeFolderPaths(folderNames)
    })
  })

  it('Folder names with options', async function () {
    assert.doesNotReject(async () => {
      /** @type {import('../../src/options').SearchOptions} */
      const options = {
        deepSearch: true
      }

      await storeFolderPaths(folderNames, options)
    })
  })
})

describe('storePaths functions', function () {
  it('String path array', function () {
    const nothing = storePaths([myPath])
    assert.strictEqual(nothing, undefined)
  })
})

describe('storedPath functions', function () {
  it('Check if paths are stored', function () {
    assert.strictEqual(storedPath(myPath), true)
    assert.strictEqual(storedPath('fake path'), false)
  })
})
