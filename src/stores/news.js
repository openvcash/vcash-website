const { autorunAsync, extendObservable, observable } = require('mobx')
const { join } = require('path')
const { promisify } = require('util')
const fs = require('fs')
const frontMatter = require('front-matter')

/** Promisify file system operations. */
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

class News {
  constructor () {
    this.newsDir = join(__dirname, '..', '..', 'content', 'news')

    /** Extend with observable properties and computed property json. */
    extendObservable(this, {
      contents: observable.map({}),
      changedFiles: observable.array([]),
      get json () {
        const contents = this.contents
          .entries()
          .reduce((news, [key, value]) => {
            news.push({
              filename: key,
              title: value.attributes.title,
              author: value.attributes.author,
              timestamp: new Date(value.attributes.date).getTime(),
              tags: value.attributes.tags,
              body: value.body
            })

            return news
          }, [])

        /** Return contents sorted by datetime DESC. */
        return JSON.stringify(
          contents.sort((a, b) => {
            if (a.timestamp > b.timestamp) return -1
            if (a.timestamp < b.timestamp) return 1
            return 0
          })
        )
      }
    })

    /** Begin monitoring content/news/ directory on initialization. */
    fs.watch(this.newsDir, (eventType, filename) => {
      /** Do not allow pushing duplicates. */
      if (this.changedFiles.includes(filename) === false) {
        this.changedFiles.push(filename)
      }
    })

    /** Auto-refresh file contents 5s after changes have been detected. */
    autorunAsync(() => {
      /** Exit on the trigger caused by changedFiles.clear() in refresh(). */
      if (this.changedFiles.length === 0) return

      /** Refresh contents of changed files. */
      this.refresh(this.changedFiles)
    }, 5 * 1000)

    /** Refresh files on initialization. */
    this.refresh()
  }

  /**
   * Refresh contents of markdown files.
   * @function refresh
   */
  async refresh (checkedFiles = null) {
    let newsFiles = await readdir(this.newsDir)

    if (checkedFiles !== null) {
      newsFiles = checkedFiles.reduce((files, filename) => {
        /** Remove deleted files from the contents map. */
        if (newsFiles.includes(filename) === true) {
          files.push(filename)
        } else {
          this.contents.delete(filename)
        }

        return files
      }, [])
    }

    /** Read the files and save parsed markdown. */
    for (let filename of newsFiles) {
      const markdown = await readFile(join(this.newsDir, filename), 'utf-8')
      this.contents.set(filename, frontMatter(markdown))
    }

    /** Clear changed files. */
    this.changedFiles.clear()
  }
}

/** Initialize a new globally used store. */
const news = new News()

/** Export initialized store. */
module.exports = news
