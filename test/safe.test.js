const { ok, equal, doesNotThrow } = require('assert/strict')
const { resolve } = require('path')
const { FilePath } = require('../src/class/filePath.js')
const { getPaths, setPaths } = require('../src/safe.js')

const myPath = resolve('test/safe.test.js')

describe('safe', function () {
  describe('getPaths()', function () {
    it('should return an array', function () {
      const paths = getPaths()
      ok(Array.isArray(paths))
    })
  })

  describe('setPaths()', function () {
    it('should set a new path', function () {
      doesNotThrow(() => setPaths([new FilePath(myPath)]))

      const paths = getPaths()
      equal(paths.length, 1)

      const p = paths[0]
      ok(p instanceof FilePath)
      equal(p.fullPath, myPath)
    })
  })
})
