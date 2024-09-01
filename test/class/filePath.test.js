const { equal, throws } = require('assert/strict')
const { resolve, sep } = require('node:path')
const { FilePath } = require('../../src/class/filePath')

const myPath = '../safe.test.js'
const resolved = resolve(__dirname, myPath)

describe('class', function () {
  describe('FilePath', function () {
    it('Instantiation with an invalid path', function () {
      let myPath = 'test/fake.test.js'
      throws(() => new FilePath(myPath))

      myPath = '../saver.test.js'
      throws(() => new FilePath(myPath))

      myPath = 'test/class'
      throws(() => new FilePath(myPath))
    })

    it('Deep valid file path', function () {
      const name = 'filePath'
      const extensions = 'test.js'
      const classPath = 'class'

      const myPath = `test/${classPath}/${name}.${extensions}`
      const resolved = resolve(myPath)
      const p = new FilePath(myPath)

      equal(typeof p, 'object')

      equal(p.fullPath, resolved)
      equal(p.fullName, `${name}.${extensions}`)

      const index = resolved.indexOf(classPath)
      const root = resolved.substring(0, index - 1)

      equal(p.root, root)
      equal(p.folder, classPath)
      equal(p.name, name)
      equal(p.extension, extensions)
    })

    it('Workspace valid file path', function () {
      const myPath = 'LICENSE'
      const resolved = resolve(myPath)
      const p = new FilePath(myPath)

      equal(typeof p, 'object')

      equal(p.fullPath, resolved)
      equal(p.fullName, myPath)

      const parts = resolved.split(sep)
      const root = parts.slice(0, -2).join(sep)

      equal(p.root, root)
      equal(p.folder, 'PathFinder')
      equal(p.name, myPath)
      equal(p.extension, '')
    })

    it('Instantiation with a valid relative path', function () {
      const folder = 'test'
      const name = 'safe'
      const extension = 'test.js'

      let p = new FilePath(resolved)
      innerTest(p, resolved)

      p = new FilePath(myPath, __dirname)
      innerTest(p, resolved)

      /**
       * A shortcut for repeated code.
       * @param {FilePath} p - The string path of the file.
       * @param {string} resolved - The resolved path of the original file.
       * @example
       * innerTest('./example.js', path.resolve(__dirname))
       */
      function innerTest(p, resolved) {
        equal(typeof p, 'object')

        equal(p.fullPath, resolved)
        equal(p.fullName, `${name}.${extension}`)

        const index = resolved.indexOf(folder)
        const root = resolved.substring(0, index - 1)

        equal(p.root, root)
        equal(p.folder, folder)
        equal(p.name, name)
        equal(p.extension, extension)
      }
    })
  })
})
