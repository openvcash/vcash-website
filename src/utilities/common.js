/**
 * Shorten a string.
 * @function shorten
 * @param {string} text - Text to shorten.
 * @param {number} n - Length to shorten it to (+ ...).
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
