import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'
import www from '../../.www.json'

/**
 * Get client or server fetching host.
 * @function getHost
 * @param {boolean} isServer - Calling from server or client.
 * @return {string} Server or client host.
 */
export const getHost = isServer => {
  return isServer === true ? www.server : www.client
}

/**
 * Get available languages.
 * @function languages
 * @return {array} Available languages.
 */
export const languages = [
  { language: 'en-US', name: 'English' },
  { language: 'sl-SI', name: 'Slovenian' }
]

/**
 * Get available locales.
 * @function locales
 * @return {array} Available locales.
 */
export const locales = languages.reduce((locales, locale) => {
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
export const readCookie = (isServer, req) => {
  const language =
    isServer === true
      ? 'headers' in req === true
        ? parseCookie(req.headers.cookie || 'language=en-US').language ||
          'en-US'
        : 'en-US'
      : getCookie('language') || 'en-US'

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
export const shorten = (text, n) => {
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
export const shortUid = () => {
  return ('0000' + ((Math.random() * 1679616) | 0).toString(36)).slice(-4)
}
