const assert = require('assert')
const { resolve } = require('path')
const {
  readFolderPaths,
  readWorkspaceFolderNames
} = require('../../src/func/readers')

describe('readWorkspaceFolderNames function', function () {
  it('Return array of valid folder names', async function () {
    const validFolderNames = await readWorkspaceFolderNames()

    assert(Array.isArray(validFolderNames))

    validFolderNames.forEach((folderName) => {
      assert.strictEqual(typeof folderName, 'string')
      assert(!/[._]/.test(folderName))
    })

    assert.deepStrictEqual(validFolderNames, ['src', 'tests'])
  })
})

describe('readFolderPaths function', function () {
  it('Without deepSearch', async function () {
    /** @type {import('../../src/options').SearchOptions} */
    const options = {}
    const myFolderPath = resolve('tests')

    /** @type {string[]} */
    const paths = await readFolderPaths(myFolderPath, options)

    assert(Array.isArray(paths))

    paths.forEach((folderName) => {
      assert.strictEqual(typeof folderName, 'string')
    })

    assert.deepStrictEqual(paths, [resolve('tests', 'safe.test.js')])
  })

  it('With deepSearch', async function () {
    /** @type {import('../../src/options').SearchOptions} */
    const options = {
      deepSearch: true
    }
    const myFolderPath = resolve('tests')

    /** @type {string[]} */
    const paths = await readFolderPaths(myFolderPath, options)

    assert(Array.isArray(paths))

    paths.forEach((folderName) => {
      assert.strictEqual(typeof folderName, 'string')
    })

    assert.deepStrictEqual(paths, [
      resolve('tests', 'class', 'filePath.test.js'),
      resolve('tests', 'func', 'finder.test.js'),
      resolve('tests', 'func', 'readers.test.js'),
      resolve('tests', 'func', 'storer.test.js'),
      resolve('tests', 'safe.test.js')
    ])
  })
})
