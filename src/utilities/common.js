/**
 * Shorten a string.
 * @function shorten
 * @param {string} text - Text to shorten.
 * @param {number} n - Length to shorten it to (+ ...).
 */
export const shorten = (text, n) => {
  return text.length > n ? ''.concat(text.substr(0, n - 1), '..') : text
}
