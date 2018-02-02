import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { i18n, fetchTranslation } from '../src/utilities/i18next.js'
import { readCookie } from '../src/utilities/common.js'
import fetch from 'isomorphic-unfetch'
import www from '../.www.json'

/** Required components. */
import Layout from '../src/components/Layout.js'
import Network from '../src/components/Network.js'

/** Required stores. */
import { initNetwork } from '../src/stores/network.js'
import { initRewardCalculator } from '../src/stores/rewardCalculator.js'

class NetworkPage extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = typeof window === 'undefined'
    const host = isServer === true ? www.server : www.client
    const language = readCookie(isServer, req)

    /** Fetch the translation files for the language found in the cookie. */
    const translation = await fetchTranslation(
      language,
      ['common', 'network'],
      host
    )

    /** Fetch the peers. */
    let peers = await fetch(''.concat(host, '/api/peers'))
    peers = await peers.json()

    /** Return initial properties. */
    return { isServer, language, translation, peers }
  }

  constructor(props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
    this.network = initNetwork(props.isServer, props.peers)
    this.rewardCalculator = initRewardCalculator(
      props.isServer,
      this.network,
      this.i18n
    )
  }

  render() {
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
