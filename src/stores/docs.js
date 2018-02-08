import { action, computed, extendObservable } from 'mobx'
import { has, get } from 'lodash'

class Docs {
  /**
   * @constructor
   * @param {object} docs - Docs.
   */
  constructor(docs) {
    /** Extend the store with observable properties. */
    extendObservable(this, { contents: docs, viewingDoc: '' })
  }

  /**
   * Get viewing document id (path).
   * @function id
   * @return {string} Document path.
   */
  @computed
  get id() {
    return this.viewingDoc === ''
      ? 'Configuration_File-definitions'
      : this.viewingDoc
  }

  /**
   * Get the viewing document.
   * @function viewing
   * @return {object} Viewing document.
   */
  @computed
  get viewing() {
    const id = ''.concat(this.id, '.md').split('_')
    return has(this.contents, id) === true
      ? get(this.contents, id)
      : { key: '', body: '' }
  }

  /**
   * Set viewing document path.
   * @function setViewingDoc
   * @param {string} doc - Document path.
   */
  @action
  setViewingDoc(doc) {
    this.viewingDoc = doc
  }
}

/**
 * Initialize a new store or return an existing one.
 * @function initDocs
 * @param {boolean} isServer - Calling from server or client.
 * @param {object} docs - Docs.
 */
export const initDocs = (isServer, docs) => {
  if (isServer && typeof window === 'undefined') {
    return new Docs(docs)
  } else {
    if (docsStore === null) {
      docsStore = new Docs(docs)
    }

    return docsStore
  }
}

/** Keep a global reference of the docs store. */
let docsStore = null
