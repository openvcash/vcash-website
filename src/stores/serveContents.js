const { extendObservable, reaction } = require('mobx')
const { set, unset } = require('lodash')
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
   * @prop {object} contents - Read and parsed contents files.
   * @prop {array} updatedItems - Items marked as updated or new by watch().
   * @prop {boolean} updated - Indicating if update() ran or is running.
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
      updated: false,
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

        /** Return news sorted by datetime DESC */
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

    /** Auto-update the contents 10s after changes have been detected. */
    reaction(
      () => this.updatedItems.length,
      updatedItems => {
        if (updatedItems > 0) this.update(true)
      },
      { delay: 10 * 1000 }
    )

    /** Auto-set the contents 5s after the update was indicated. */
    reaction(
      () => this.updated,
      updated => {
        if (updated === true) this.setContents()
      },
      { delay: 5 * 1000 }
    )

    /** Recursively watch the static/contents/ directory for changes. */
    watch(this.contentsDir, { recursive: true }, (eventType, filePath) => {
      /** Skip duplicate items. */
      if (this.updatedItems.includes(filePath) === false) {
        this.updatedItems.push(filePath)
      }
    })

    /** Update files on initialization. */
    this.update()
  }

  /**
   * Set contents.
   * @function setContents
   */
  setContents() {
    this.contents = this.items

    /** Reset the updated indicator. */
    this.updated = false
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

          /** Parse markdown and JSON files. */
          if (itemExt === '.md') file = frontMatter(file)
          if (itemExt === '.json') file = JSON.parse(file)

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
        /** Unset removed or moved files and folders. */
        unset(this.items, itemRel)
      }
    }

    /** Set the updated indicator. */
    this.updated = true

    /** Reset the updated items. */
    if (this.updatedItems.length > 0) this.updatedItems = []
  }
}

/** Initialize a new globally used store. */
const serveContents = new ServeContents()

/** Export initialized store. */
module.exports = serveContents
