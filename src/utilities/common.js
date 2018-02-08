const { parse } = require('cookie')
const { get } = require('js-cookie')
const www = require('../../.www.json')

/**
 * Get client or server fetching host.
 * @function getHost
 * @param {boolean} isServer - Calling from server or client.
 * @return {string} Server or client host.
 */
const getHost = isServer => {
  return isServer === true ? www.server : www.client
}

/**
 * Get available languages.
 * @function languages
 * @return {array} Available languages.
 */
const languages = [
  { language: 'en-US', name: 'English' },
  { language: 'sl-SI', name: 'Slovenian' }
]

/**
 * Get available locales.
 * @function locales
 * @return {array} Available locales.
 */
const locales = languages.reduce((locales, locale) => {
  locales.push(locale.language)
  return locales
}, [])

/**
 * Read language cookie from req headers on server or directly on client.
 * @function readCookie
 * @param {boolean} isServer - Calling from server or client.
 * @param {object} req - Request.
 * @return {string} Language.
 */
const readCookie = (isServer, req) => {
  const language =
    isServer === true
      ? 'headers' in req === true
        ? parse(req.headers.cookie || 'language=en-US').language || 'en-US'
        : 'en-US'
      : get('language') || 'en-US'

  /** Return default language if the one in cookie doesn't exist. */
  return locales.includes(language) === true ? language : 'en-US'
}

/**
 * Shorten a string.
 * @function shorten
 * @param {string} text - Text to shorten.
 * @param {number} n - Length to shorten it to (+ ...).
 * @return {string} Shortened string.
 */
const shorten = (text, n) => {
  return text.length > n ? ''.concat(text.substr(0, n - 1), '..') : text
}

/**
 * Get a 4-character alphanumeric unique sequence.
 * For N unique IDs, out of X possibilities,
 * call at most 1 / (1 − N / X) times on average to ensure uniqueness.
 * @function shortUid
 * @return {string} Unique 4-character uid.
 * @see {@link http://stackoverflow.com/a/6248722|StackOverflow}
 */
const shortUid = () => {
  return ('0000' + ((Math.random() * 1679616) | 0).toString(36)).slice(-4)
}

/**
 * Sort object keys alphabetically.
 * @function sortObject
 * @param {object} unsorted - Unsorted object.
 * @return {object} Sorted object.
 * @see {@link https://stackoverflow.com/a/31102605|StackOverflow}
 */
const sortObject = unsorted => {
  return Object.keys(unsorted)
    .sort()
    .reduce((sorted, key) => {
      /** Handle nested objects recursively. */
      if (typeof unsorted[key] === 'object') {
        sorted[key] = sortObject(unsorted[key])
      } else {
        sorted[key] = unsorted[key]
      }

      return sorted
    }, {})
}

/** Export the common functions. */
module.exports = {
  getHost,
  languages,
  locales,
  readCookie,
  shorten,
  shortUid,
  sortObject
}
