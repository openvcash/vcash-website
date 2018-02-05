const { autorunAsync, extendObservable } = require('mobx')
const { join } = require('path')
const { promisify } = require('util')
const fs = require('fs')

/** Promisify file system operations. */
const readFile = promisify(fs.readFile)

class ServePeers {
  constructor() {
    this.peersDir = join(__dirname, '..', '..', 'static', 'contents')

    /** Extend with observable properties. */
    extendObservable(this, { json: '{"peers":[]}', updated: false })

    /** Begin monitoring static/ directory on initialization. */
    fs.watch(this.peersDir, (eventType, filename) => {
      if (filename === 'peers.json') {
        this.updated = true
      }
    })

    /** Auto-refresh file contents 5s after changes have been detected. */
    autorunAsync(() => {
      if (this.updated === true) this.refresh()
    }, 5 * 1000)

    /** Refresh file on initialization. */
    this.refresh()
  }

  /**
   * Refresh peers file.
   * @function refresh
   */
  async refresh() {
    try {
      const peers = await readFile(join(this.peersDir, 'peers.json'), 'utf-8')
      this.json = peers
    } catch (e) {
      this.json = '{"peers":[]}'
    }

    this.updated = false
  }
}

/** Initialize a new globally used store. */
const servePeers = new ServePeers()

/** Export initialized store. */
module.exports = servePeers
