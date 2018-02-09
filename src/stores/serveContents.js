const { extendObservable, reaction } = require('mobx')
const { debounce, set, unset } = require('lodash')
const { extname, join } = require('path')
const { promisify } = require('util')
const { sortObject } = require('../utilities/common.js')
const frontMatter = require('front-matter')
const fs = require('fs')
const watch = require('node-watch')

/** Promisify file system operations. */
const lstat = promisify(fs.lstat)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

class ServeContents {
  /**
   * @prop {string} contentsDir - Absolute path of the static/contents/ dir.
   * @prop {object} items - Non-observed version of contents.
   * @prop {object} contents - Read and parsed static/contents/ files.
   * @prop {array} updatedItems - Items marked as updated or new by watch().
   * @prop {boolean} updateInProgress - File update is in progress.
   * @prop {boolean} updateAgain - Update again after the one in progress.
   * @prop {function} docs - Docs computed function.
   * @prop {function} news - News computed function.
   * @prop {function} n - Hard-coded bootstrap contacts computed function.
   * @prop {function} peers - Network crawler data computed function.
   */
  constructor() {
    this.contentsDir = join(__dirname, '..', '..', 'static', 'contents')
    this.items = {}

    /** Extend the store with observable and computed properties. */
    extendObservable(this, {
      contents: {},
      updatedItems: [],
      updateInProgress: false,
      updateAgain: false,
      get docs() {
        if ('docs' in this.contents === false) return '{}'
        return JSON.stringify(sortObject(this.contents['docs']))
      },
      get news() {
        if ('news' in this.contents === false) return '[]'

        /** Get the news posts. */
        const news = this.contents['news']

        /** Format the news posts. */
        let newsPosts = Object.keys(news).reduce((posts, post) => {
          posts.push({
            id: post.split('.md')[0],
            title: news[post].attributes.title,
            author: news[post].attributes.author,
            timestamp: new Date(news[post].attributes.date).getTime(),
            tags: news[post].attributes.tags,
            body: news[post].body
          })

          return posts
        }, [])

        /** Return news sorted by timestamp DESC. */
        return JSON.stringify(
          newsPosts.sort((a, b) => {
            if (a.timestamp > b.timestamp) return -1
            if (a.timestamp < b.timestamp) return 1
            return 0
          })
        )
      },
      get n() {
        if ('n.json' in this.contents === false) return '{ "peers": [] }'
        return JSON.stringify(this.contents['n.json'])
      },
      get peers() {
        if ('peers.json' in this.contents === false) return '{ "peers": [] }'
        return JSON.stringify(this.contents['peers.json'])
      }
    })

    /** Use computeds in the reaction so they're not re-run on every request. */
    reaction(
      () => [this.docs, this.news, this.n, this.peers],
      (docs, news, n, peers) => console.log('> Updated static/contents/ cache')
    )

    /** Auto-update the contents after changes have been detected. */
    reaction(
      () => this.updatedItems.length,
      debounce(updatedItems => {
        if (updatedItems > 0) this.updateStart(true)
      }, 3 * 1000)
    )

    /** Update again if the items changed during the previous update. */
    reaction(
      () => this.updateInProgress,
      updateInProgress => {
        if (updateInProgress === true) return
        if (this.updateAgain === true) this.updateStart(true)
      }
    )

    /** Recursively watch the static/contents/ directory for changes. */
    watch(this.contentsDir, { recursive: true }, (eventType, filePath) => {
      if (this.updatedItems.includes(filePath) === true) return
      this.updatedItems.push(filePath)
    })

    /** Debounce contents setting for 2s until the update is completed. */
    this.setContentsDebounce = debounce(() => {
      this.setContents()
      this.updateInProgress = false
    }, 2 * 1000)

    /** Update files on initialization. */
    this.updateStart()
  }

  /**
   * Set the contents.
   * @function setContents
   */
  setContents() {
    this.contents = this.items
  }

  /**
   * Recursively update the static/contents/ directory or only updated items.
   * @param {boolean} onlyUpdated - Only updated files.
   * @param {string} subDir - Sub-directory relative path.
   * @function update
   */
  async update(onlyUpdated = false, subDir = '') {
    let dir = subDir === '' ? this.contentsDir : join(this.contentsDir, subDir)
    let items = onlyUpdated === true ? this.updatedItems : await readdir(dir)

    /** Reset the updated items on first pass. */
    if (onlyUpdated === true) this.updatedItems = []

    /** Set update in progress flag. */
    if (this.updateInProgress === false) this.updateInProgress = true

    for (let item of items) {
      const itemPath = onlyUpdated === true ? item : join(dir, item)
      const itemRel = itemPath.substr(this.contentsDir.length + 1).split('/')
      const itemExt = extname(itemPath)
      const itemRoot = itemRel[0]

      /** Removed or moved items will throw an error on lstat, handled below. */
      try {
        /** Get the file information. */
        const itemStat = await lstat(itemPath)

        /** Handle directories recursively and files sequentially. */
        if (itemStat.isDirectory() === true) {
          this.update(false, itemRel.join('/'))
        } else {
          /** Read the file. */
          let file = await readFile(itemPath, 'utf-8')

          /** Parse JSON and markdown files. */
          if (itemExt === '.json') file = JSON.parse(file)
          if (itemExt === '.md') file = frontMatter(file)

          /** Create the keys for docs while the relative path is present. */
          if (itemRoot === 'docs') {
            /** Remove itemRoot, join on _ and remove the .md extension. */
            file.key = itemRel
              .slice(1)
              .join('_')
              .split(itemExt)[0]
          }

          /** Set the file. */
          set(this.items, itemRel, file)
        }
      } catch (e) {
        /** Unset removed or moved files and directories. */
        unset(this.items, itemRel)
      }
    }

    /** Continue debouncing contents setting until the update is completed. */
    this.setContentsDebounce()
  }

  /**
   * Start the update or set another if one is already in progress.
   * @function updateStart
   * @param {boolean} onlyUpdated - Only updated files.
   */
  updateStart(onlyUpdated = false) {
    if (this.updateAgain === true) return
    if (this.updateInProgress === true) this.updateAgain = true
    if (this.updateInProgress === false) this.update(onlyUpdated)
  }
}

/** Initialize a new globally used store. */
const serveContents = new ServeContents()

/** Export initialized store. */
module.exports = serveContents
