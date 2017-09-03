import { action, computed, observable } from 'mobx'
import { has, get } from 'lodash'
import fetch from 'isomorphic-unfetch'

class Docs {
  /**
   * Observable properties.
   * @property {object} contents - Documents contents with nested paths as keys.
   * @property {string} viewingDoc - Viewing document path.
   */
  @observable contents = observable.object({})
  @observable viewingDoc = ''

  /**
   * Fetch documents.
   * @constructor
   */
  constructor () {
    this.fetchDocs()
  }

  /**
   * Get viewing document id (path).
   * @function id
   * @return {string} Document path.
   */
  @computed
  get id () {
    return this.viewingDoc === '' ? 'Configuration_config.dat' : this.viewingDoc
  }

  /**
   * Get the viewing document.
   * @function viewing
   * @return {object} Viewing document.
   */
  @computed
  get viewing () {
    const id = this.id.split('_')

    return has(this.contents, id) === true
      ? get(this.contents, id)
      : { key: '', body: '' }
  }

  /**
   * Set parsed markdown documents.
   * @function setContents
   * @param {object} docs - Parsed markdown documents.
   */
  @action
  setContents (docs) {
    this.contents = docs
  }

  /**
   * Set viewing document path.
   * @function setViewingDoc
   * @param {string} doc - Document path.
   */
  @action
  setViewingDoc (doc) {
    this.viewingDoc = doc
  }

  /**
   * Fetch docs.
   * @function fetchDocs
   */
  async fetchDocs () {
    try {
      let docs = await fetch('http://localhost:3000/api/docs')
      docs = await docs.json()

      /** Set documents contents. */
      this.setContents(docs)
    } catch (e) {
      console.error('Failed to fetch docs.json\n\n', e)
    }
  }
}

/**
 * Initialize a new store or return an existing one.
 * @function initDocs
 * @param {boolean} isServer - Calling from server or client.
 */
export const initDocs = isServer => {
  if (isServer && typeof window === 'undefined') {
    return new Docs()
  } else {
    if (docsStore === null) {
      docsStore = new Docs()
    }

    return docsStore
  }
}

/** Keep a global reference of the docs store. */
let docsStore = null
