import { action, computed, extendObservable } from 'mobx'

class News {
  /**
   * @constructor
   * @param {array} posts - News posts.
   * @property {number} perPage - News posts per page.
   */
  constructor(posts) {
    this.perPage = 3

    /** Extend the store with observable properties. */
    extendObservable(this, {
      page: 1,
      posts,
      search: { value: '', keywords: [], timeoutId: null }
    })
  }

  /**
   * Get an object with news posts ids as keys.
   * @function byId
   * @return {object} News posts.
   */
  @computed
  get byId() {
    return this.posts.reduce((posts, post) => {
      posts[post.id] = post
      return posts
    }, {})
  }

  /**
   * Get paginated and filtered news posts.
   * @function filtered
   * @return {object} News posts and count.
   */
  @computed
  get filtered() {
    let filtered = this.posts

    /** Search for keywords in news posts titles and bodies. */
    if (this.search.keywords.length !== 0) {
      filtered = this.posts.reduce((posts, post) => {
        const matches = this.search.keywords.reduce((matches, keyword) => {
          if (
            post.body.indexOf(keyword) !== -1 ||
            post.title.indexOf(keyword) !== -1
          ) {
            matches += 1
          }

          return matches
        }, 0)

        /** Push news posts with match count equal to the number of keywords. */
        if (matches === this.search.keywords.length) {
          posts.push(post)
        }

        return posts
      }, [])
    }

    /** Paginate filtered news posts. */
    return {
      count: filtered.length,
      posts: filtered.slice(
        this.page === 1 ? 0 : (this.page - 1) * this.perPage,
        this.page === 1
          ? this.perPage
          : (this.page - 1) * this.perPage + this.perPage
      )
    }
  }

  /**
   * Set current page.
   * @function setPage
   * @param {number} page - Current page.
   */
  @action
  setPage(page) {
    this.page = page
  }

  /**
   * Set searching keywords.
   * @function setSearch
   * @param {string} keywords - Keywords to search by.
   */
  @action
  setSearch(keywords) {
    /** Clear previous timeout id. */
    clearTimeout(this.search.timeoutId)

    /** Update search string. */
    this.search.value = keywords

    /** Update keywords array in 1s, unless canceled before. */
    this.search.timeoutId = setTimeout(
      action('setSearch', () => {
        this.search.keywords = keywords.match(/[^ ]+/g) || []

        /** If not on the first page of news posts, go back to it. */
        if (this.page !== 1) {
          this.setPage(1)
        }
      }),
      1 * 1000
    )
  }
}

/**
 * Initialize a new store or return an existing one.
 * @function initNews
 * @param {boolean} isServer - Calling from server or client.
 * @param {array} posts - News posts.
 */
export const initNews = (isServer, posts) => {
  if (isServer && typeof window === 'undefined') {
    return new News(posts)
  } else {
    if (newsStore === null) {
      newsStore = new News(posts)
    }

    return newsStore
  }
}

/** Keep a global reference of the news store. */
let newsStore = null
