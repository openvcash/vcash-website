import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'
import { i18n, fetchTranslation } from '../src/utilities/i18next.js'
import { getHost, readCookie } from '../src/utilities/common.js'

/** Required components. */
import Features from '../src/components/Features.js'
import GetStarted from '../src/components/GetStarted.js'
import Layout from '../src/components/Layout.js'

class HomePage extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = typeof window === 'undefined'
    const host = getHost(isServer)
    const language = readCookie(isServer, req)

    /** Fetch the translation files for the language found in the cookie. */
    const translation = await fetchTranslation(language, ['common'], host)

    /** Return initial properties. */
    return { language, translation }
  }

  constructor(props) {
    super(props)
    this.i18n = i18n(props.translation, props.language)
  }

  render() {
    return (
      <Provider>
        <I18nextProvider i18n={this.i18n}>
          <Layout>
            <GetStarted />
            <Features />
          </Layout>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default HomePage
