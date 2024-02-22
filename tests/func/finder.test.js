const assert = require('assert')
const { FilePath } = require('../../src/class/filePath')
const { findPath, findPaths } = require('../../src/func/finder')
const { storeFolderPaths } = require('../../src/func/storer')

describe('findPath function', function () {
  it('find first match', async function () {
    await storeFolderPaths(['src', 'tests'])

    /** @type {import('../../src/options').FilterOptions} */
    const options = { name: 'finder' }
    const result = findPath(options)
    assert(result instanceof FilePath)
  })

  it('find js file', async function () {
    await storeFolderPaths(['src', 'tests'])

    /** @type {import('../../src/options').FilterOptions} */
    const options = { name: 'finder', extension: 'js' }
    const result = findPath(options)
    assert(result instanceof FilePath)
  })

  it('find test.js file', async function () {
    await storeFolderPaths(['src', 'tests'])

    /** @type {import('../../src/options').FilterOptions} */
    const options = { name: 'finder', extension: 'test.js' }
    const result = findPath(options)
    assert(result instanceof FilePath)
  })

  it('find non-existing file', async function () {
    await storeFolderPaths(['src', 'tests'])

    /** @type {import('../../src/options').FilterOptions} */
    const options = { name: 'finder', extension: 'png' }
    const result = findPath(options)
    assert.strictEqual(result, undefined)
  })
})

describe('findPaths function', function () {
  it('Without parameter', async function () {
    await storeFolderPaths()

    const result = findPaths()

    assert(Array.isArray(result))
    assert(result[0] instanceof FilePath)
    assert.strictEqual(result.length, 13)
  })

  it('Only one folder name', async function () {
    await storeFolderPaths(['src'])

    const result = findPaths()

    assert(Array.isArray(result))
    assert(result[0] instanceof FilePath)
    assert.strictEqual(result.length, 8)
  })

  it('No filter search', async function () {
    await storeFolderPaths(['src', 'tests'])

    const result = findPaths()

    assert(Array.isArray(result))
    assert(result[0] instanceof FilePath)
    assert.strictEqual(result.length, 13)
  })

  it('Not storing duplicates', async function () {
    await storeFolderPaths(['src', 'tests'])
    await storeFolderPaths(['src', 'tests'])
    await storeFolderPaths(['src', 'tests'])

    const result = findPaths()

    assert(Array.isArray(result))
    assert(result[0] instanceof FilePath)
    assert.strictEqual(result.length, 13)
  })

  it('Existing filter string options search', async function () {
    await storeFolderPaths(['src', 'tests'])

    /** @type {import('../../src/options').FilterOptions} */
    const options = {
      name: 'finder'
    }

    const result = findPaths(options)

    assert(Array.isArray(result))
    assert(result[0] instanceof FilePath)
    assert.strictEqual(result.length, 2)
  })

  it('Existing filter regex options search', async function () {
    await storeFolderPaths(['src', 'tests'])

    /** @type {import('../../src/options').FilterOptions} */
    const options = {
      name: /finder/
    }

    const result = findPaths(options)

    assert(Array.isArray(result))
    assert(result[0] instanceof FilePath)
    assert.strictEqual(result.length, 2)
  })

  it('Non-existing filter options search', function () {
    /** @type {import('../../src/options').FilterOptions} */
    const options = {
      name: 'fake name'
    }

    const result = findPaths(options)

    assert(Array.isArray(result))
    assert.strictEqual(result[0], undefined)
    assert.strictEqual(result.length, 0)
  })
})
