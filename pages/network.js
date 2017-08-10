import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { parse as parseCookie } from 'cookie'
import { get as getCookie } from 'js-cookie'
import { i18n, fetchTranslation } from '../src/utilities/i18next'

/** Required components. */
import Layout from '../src/components/Layout'
import Network from '../src/components/Network'

/** Required stores. */
import { initNetwork } from '../src/stores/network'
import { initRewardCalculator } from '../src/stores/rewardCalculator'

class NetworkPage extends React.Component {
  static async getInitialProps ({ req }) {
    const initProps = {
      isServer: typeof window === 'undefined',
      language: 'en-US',
      translation: {}
    }

    /**
     * Read the language cookie from the request headers if on the server,
     * or read the cookie directly if on the client.
     */
    if (initProps.isServer === true) {
      const cookie = parseCookie(req.headers.cookie)
      initProps.language = cookie.language
    } else {
      initProps.language = getCookie('language')
    }

    /** Fetch the translation files for the language found in the cookie. */
    initProps.translation = await fetchTranslation(
      initProps.language,
      ['common', 'network'],
      'http://localhost:3000/static/locales/'
    )

    /** Return initial properties. */
    return initProps
  }

  constructor (props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
    this.network = initNetwork(props.isServer)
    this.rewardCalculator = initRewardCalculator(
      props.isServer,
      this.network,
      this.i18n
    )
  }

  render () {
    return (
      <Provider network={this.network} rewardCalculator={this.rewardCalculator}>
        <I18nextProvider i18n={this.i18n}>
          <Layout>
            <Network />
          </Layout>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default NetworkPage
