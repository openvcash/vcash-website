/**
 * Set a cookie, which by default expires in 1 year.
 * @function setCookie
 * @param {string} key - Assign value to this key.
 * @param {string|number} value - Value to be stored.
 * @param {number} days - Number of days before expiring.
 */
export const setCookie = (key, value, days = 365) => {
  document.cookie = ''.concat(
    key,
    '=',
    value,
    '; expires=',
    new Date(Date.now() + (1000 * 60 * 60 * 24 * days)).toGMTString(),
    '; path=/'
  )
}
