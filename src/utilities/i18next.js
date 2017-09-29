import i18next from 'i18next'
import fetch from 'isomorphic-unfetch'
import { wwwHost } from '../../package'

/**
 * Initialize a i18next instance.
 * @function i18n
 * @param {object} resources - Translation.
 * @param {string} lng - Language.
 * @return {object} i18next instance.
 */
export const i18n = (resources, lng) => {
  return i18next.init({
    debug: false,
    defaultNS: 'common',
    fallbackLng: 'en-US',
    lng,
    ns: ['common'],
    resources
  })
}

/**
 * Fetch translation file(s).
 * @function fetchTranslation
 * @param {string} language - Language to fetch.
 * @param {array} files - Translation files to fetch.
 * @param {boolean} isServer - Request origination (client / server).
 */
export async function fetchTranslation (language, files, isServer) {
  const host = isServer === true ? wwwHost.server : wwwHost.client
  let translation = {}

  console.log(
    'Fetching locale from',
    isServer === true ? 'server' : 'client',
    host
  )

  for (let file of files) {
    const response = await fetch(
      ''.concat(host, '/static/locales/', language, '/', file, '.json')
    )
    translation[file] = await response.json()
  }

  return { [language]: translation }
}
