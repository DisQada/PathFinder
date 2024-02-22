const assert = require('assert')
const { resolve, sep } = require('node:path')
const { FilePath } = require('../../src/class/filePath')

describe('Instantiation with an invalid path', function () {
  it('Absolute invalid file path', function () {
    const myPath = 'tests/fake.test.js'
    assert.throws(() => new FilePath(myPath))
  })

  it('Relative invalid file path', function () {
    const myPath = '../saver.test.js'
    assert.throws(() => new FilePath(myPath))
  })

  it('Absolute valid directory path', function () {
    const myPath = 'tests/class'
    assert.throws(() => new FilePath(myPath))
  })
})

describe('Instantiation with a valid absolute path', function () {
  it('Deep file path', function () {
    const myPath = 'tests/class/filePath.test.js'
    const resolved = resolve(myPath)
    const p = new FilePath(myPath)

    assert.strictEqual(typeof p, 'object')

    assert.strictEqual(p.fullPath, resolved)
    assert.strictEqual(p.fullName, 'filePath.test.js')

    const index = resolved.indexOf('class')
    const root = resolved.substring(0, index - 1)

    assert.strictEqual(p.root, root)
    assert.strictEqual(p.folder, 'class')
    assert.strictEqual(p.name, 'filePath')
    assert.strictEqual(p.extension, 'test.js')
  })

  it('Workspace file path', function () {
    const myPath = 'LICENSE.txt'
    const resolved = resolve(myPath)
    const p = new FilePath(myPath)

    assert.strictEqual(typeof p, 'object')

    assert.strictEqual(p.fullPath, resolved)
    assert.strictEqual(p.fullName, 'LICENSE.txt')

    const parts = resolved.split(sep)
    const root = parts.slice(0, -2).join(sep)

    assert.strictEqual(p.root, root)
    assert.strictEqual(p.folder, 'PathFinder')
    assert.strictEqual(p.name, 'LICENSE')
    assert.strictEqual(p.extension, 'txt')
  })
})

const myPath = '../safe.test.js'
const resolved = resolve(__dirname, myPath)

describe('Instantiation with a valid relative path', function () {
  /**
   * A shortcut for repeated code.
   * @param {FilePath} p - The string path of the file.
   * @param {string} resolved - The resolved path of the original file.
   * @example
   * innerTest('./example.js', path.resolve(__dirname))
   */
  function innerTest(p, resolved) {
    assert.strictEqual(typeof p, 'object')

    assert.strictEqual(p.fullPath, resolved)
    assert.strictEqual(p.fullName, 'safe.test.js')

    const index = resolved.indexOf('tests')
    const root = resolved.substring(0, index - 1)

    assert.strictEqual(p.root, root)
    assert.strictEqual(p.folder, 'tests')
    assert.strictEqual(p.name, 'safe')
    assert.strictEqual(p.extension, 'test.js')
  }

  it('Absolute path', function () {
    const p = new FilePath(resolved)
    innerTest(p, resolved)
  })

  it('Relative path', function () {
    const p = new FilePath(myPath, __dirname)
    innerTest(p, resolved)
  })
})
