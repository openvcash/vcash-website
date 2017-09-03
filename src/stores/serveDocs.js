const { extendObservable, observable } = require('mobx')
const { join } = require('path')
const { promisify } = require('util')
const { has, set } = require('lodash')
const fs = require('fs')
const frontMatter = require('front-matter')

/** Promisify file system operations. */
const lstat = promisify(fs.lstat)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

/**
 * TODO: Implement directory watching with docsTree dynamic updating.
 *
 * For now documents updates require a restart of the Next.js website. Goal is
 * for this store to behave like serveNews.js, which watches the directory for
 * changes and updates observable contents of changed files.
 */
class ServeDocs {
  constructor () {
    this.docsDir = join(__dirname, '..', '..', 'content', 'docs')

    /** Extend with observable properties and computed property json. */
    extendObservable(this, {
      docsTree: observable.object({}),
      get json () {
        return JSON.stringify(this.docsTree)
      }
    })

    /** Traverse docs directory and parse markdown files on initialization. */
    this.traverseDir()
  }

  /**
   * Recursively traverse the /docs directory and parse markdown files.
   * @function traverseDir
   * @param {string} subDir - Sub directory path.
   */
  async traverseDir (subDir = '') {
    const dir = subDir === '' ? this.docsDir : join(this.docsDir, subDir)
    const entries = await readdir(dir)
    const subSplit = subDir.split('/')

    /** Skip initial empty string, but add all subsequent directories. */
    if (subDir.length !== 0 && has(this.docsTree, subSplit) === false) {
      /** Setting of missing nested properties is handled by lodash's set. */
      set(this.docsTree, subSplit, {})
    }

    /** Loop over entries in the directory. */
    for (let item of entries) {
      const itemPath = join(dir, item)
      const itemStat = await lstat(itemPath)

      /** Handle directories recursively. */
      if (itemStat.isDirectory() === true) {
        this.traverseDir(join(subDir, item))
      } else {
        const pathSplit = [...subSplit, item.split('.md')[0]]
        const markdown = await readFile(itemPath, 'utf-8')

        /** Set file's parsed markdown and id (object's nested path). */
        set(this.docsTree, pathSplit, {
          key: pathSplit.join('_'),
          body: frontMatter(markdown).body
        })
      }
    }
  }
}

/** Initialize a new globally used store. */
const serveDocs = new ServeDocs()

/** Export initialized store. */
module.exports = serveDocs
