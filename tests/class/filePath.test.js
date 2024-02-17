const assert = require('assert')
const { resolve, sep } = require('node:path')
const { FilePath } = require('../../src/class/filePath')

describe('Instantiation with an invalid path', function () {
  it('Absolute invalid file path', function () {
    const myPath = 'tests/fake.test.js'

    assert.throws(() => {
      new FilePath(myPath)
    })
  })

  it('Relative invalid file path', function () {
    const myPath = '../saver.test.js'

    assert.throws(() => {
      new FilePath(myPath)
    })
  })

  it('Absolute valid directory path', function () {
    const myPath = 'tests/class'

    assert.throws(() => {
      new FilePath(myPath)
    })
  })
})

describe('Instantiation with a valid absolute path', function () {
  it('Deep file path', function () {
    const myPath = 'tests/class/filePath.test.js'
    const resolved = resolve(myPath)
    const filePath = new FilePath(myPath)

    assert.strictEqual(typeof filePath, 'object')

    assert.strictEqual(filePath.fullPath, resolved)
    assert.strictEqual(filePath.fullName, 'filePath.test.js')

    const index = resolved.indexOf('class')
    const root = resolved.substring(0, index - 1)

    assert.strictEqual(filePath.root, root)
    assert.strictEqual(filePath.folder, 'class')
    assert.strictEqual(filePath.name, 'filePath')
    assert.strictEqual(filePath.extension, 'test.js')
  })

  it('Workspace file path', function () {
    const myPath = 'LICENSE.txt'
    const resolved = resolve(myPath)
    const filePath = new FilePath(myPath)

    assert.strictEqual(typeof filePath, 'object')

    assert.strictEqual(filePath.fullPath, resolved)
    assert.strictEqual(filePath.fullName, 'LICENSE.txt')

    const parts = resolved.split(sep)
    const root = parts.slice(0, -2).join(sep)

    assert.strictEqual(filePath.root, root)
    assert.strictEqual(filePath.folder, 'PathFinder')
    assert.strictEqual(filePath.name, 'LICENSE')
    assert.strictEqual(filePath.extension, 'txt')
  })
})

const myPath = '../safe.test.js'
const resolved = resolve(__dirname, myPath)

describe('Instantiation with a valid relative path', function () {
  /**
   * A shortcut for repeated code.
   * @param {FilePath} filePath - The string path of the file.
   * @param {string} resolved - The resolved path of the original file.
   * @example
   * innerTest("./example.js", path.resolve(__dirname))
   */
  function innerTest(filePath, resolved) {
    assert.strictEqual(typeof filePath, 'object')

    assert.strictEqual(filePath.fullPath, resolved)
    assert.strictEqual(filePath.fullName, 'safe.test.js')

    const index = resolved.indexOf('tests')
    const root = resolved.substring(0, index - 1)

    assert.strictEqual(filePath.root, root)
    assert.strictEqual(filePath.folder, 'tests')
    assert.strictEqual(filePath.name, 'safe')
    assert.strictEqual(filePath.extension, 'test.js')
  }

  it('Absolute path', function () {
    const filePath = new FilePath(resolved)
    innerTest(filePath, resolved)
  })

  it('Relative path', function () {
    const filePath = new FilePath(myPath, __dirname)
    innerTest(filePath, resolved)
  })
})
