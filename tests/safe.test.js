const assert = require('assert')
const { resolve } = require('path')
const { FilePath } = require('../src/class/filePath')
const { getPaths, setPaths } = require('../src/safe')

const myPath = resolve('tests/safe.test.js')

describe('Setting and getting new paths', function () {
  it('directly', function () {
    assert.doesNotThrow(() => setPaths([new FilePath(myPath)]))

    const paths = getPaths()
    assert(Array.isArray(paths))
    assert.strictEqual(paths.length, 1)

    const p = paths[0]
    assert(p instanceof FilePath)
    assert.strictEqual(p.fullPath, myPath)
  })
})
